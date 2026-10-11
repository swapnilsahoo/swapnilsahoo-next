import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import Module from "node:module";

// Entirely isolated local DB and mocked transport. Never load an env file or
// reach an actual mailbox/provider; all fetches below are refused or mocked.
await mkdir(path.resolve(".data"), { recursive: true });
process.env.LAB_DATABASE_URL = `file:${path.resolve(".data", `email-test-${randomUUID()}.db`).replaceAll("\\", "/")}`;
delete process.env.LAB_DATABASE_AUTH_TOKEN;
delete process.env.VERCEL;
process.env.LAB_LOCAL_MODE = "true";
process.env.LAB_AUTH_SECRET = "isolated-email-test-secret-which-is-not-used-in-production";
process.env.LAB_BASE_URL = "http://localhost:3110";
process.env.LAB_LAUNCH_APPROVED = "false";
process.env.LAB_EMAIL_ENABLED = "false";
process.env.RESEND_API_KEY = "re_mock_transport_only_never_send";
process.env.LAB_EMAIL_FROM = "confirmations@mail.lab-fixture.edu";
process.env.LAB_EMAIL_VERIFIED_DOMAIN = "mail.lab-fixture.edu";
process.env.LAB_EMAIL_DOMAIN_VERIFIED = "true";
process.env.LAB_EMAIL_OPERATOR_TO = "operator@lab-fixture.edu";
process.env.LAB_EMAIL_REPLY_TO = "operator@lab-fixture.edu";
process.env.LAB_EMAIL_DAILY_LIMIT = "100";
const { getDatabase } = await import("../src/features/learning-lab/server/database");
const { saveEnquiry, createMember } = await import("../src/features/learning-lab/server/service");
const {
  drainEmailOutbox,
  enqueueEnquiryEmails,
  enquiryEmailState,
  getEmailReadiness,
  sendOperatorEmailTest,
  EMAIL_RETRY_WINDOW_MS,
} = await import("../src/features/learning-lab/server/email");
const db = await getDatabase();
const checks: string[] = [];
type RequestSnapshot = { key: string; payload: string };
let requests: RequestSnapshot[] = [];
let respond: () => Promise<Response> = async () => Response.json({ id: randomUUID() });
globalThis.fetch = async (url, init) => {
  assert.equal(
    String(url),
    "https://api.resend.com/emails",
    "Only the mocked provider URL is accepted"
  );
  assert.equal(init?.method, "POST");
  assert.equal(
    (init?.headers as Record<string, string>)?.Authorization,
    `Bearer ${process.env.RESEND_API_KEY}`
  );
  requests.push({
    key: (init?.headers as Record<string, string>)["Idempotency-Key"],
    payload: String(init?.body),
  });
  return respond();
};
const enquiryInput = (email: string) => ({
  kind: "learner",
  name: "Synthetic email test",
  email,
  programmeSlug: "ai-for-managers",
  message: "Synthetic private text must never appear in operator email.",
  adultConfirmed: true,
  privacyAccepted: true,
  marketingConsent: false,
  startedAt: Date.now() - 2000,
});
async function rowFor(enquiryId: string, event = "receipt") {
  return (
    await db.execute({
      sql: "SELECT * FROM lab_email_outbox WHERE enquiry_id=? AND event_type=?",
      args: [enquiryId, event],
    })
  ).rows[0];
}
async function fixture(email = `${randomUUID()}@learner-fixture.edu`, isDemo = false) {
  const id = randomUUID();
  const tx = await db.transaction("write");
  try {
    await tx.execute({
      sql: "INSERT INTO lab_enquiry(id,kind,name,email,programme_slug,is_demo,created_at,updated_at,dedup_key) VALUES(?,'learner','Synthetic email test',?,'ai-for-managers',?,?,?,?)",
      args: [id, email, Number(isDemo), Date.now(), Date.now(), randomUUID()],
    });
    const requested = await enqueueEnquiryEmails(tx, {
      id,
      email,
      programmeSlug: "ai-for-managers",
      kind: "learner",
    });
    await tx.commit();
    return { id, email, requested };
  } catch (error) {
    await tx.rollback();
    throw error;
  } finally {
    tx.close();
  }
}
try {
  const disabled = await saveEnquiry(
    enquiryInput("disabled@learner-fixture.edu"),
    "isolated-disabled-test"
  );
  assert.match(disabled.message, /No confirmation email has been sent/);
  assert.equal(disabled.emailStatus, "not-requested");
  assert.equal((await db.execute("SELECT COUNT(*) AS n FROM lab_email_outbox")).rows[0].n, 0);
  assert.equal(requests.length, 0);
  checks.push(
    "Disabled configuration preserves saved enquiry/no-email behavior and queues nothing"
  );

  process.env.LAB_EMAIL_ENABLED = "true";
  process.env.LAB_EMAIL_DOMAIN_VERIFIED = "false";
  assert.equal((await fixture()).requested, false);
  assert.deepEqual(getEmailReadiness(), {
    provider: "resend",
    configured: false,
    reason: "unverified-domain",
    deliveryVerified: false,
    automaticRetryWindowHours: 23,
  });
  process.env.LAB_EMAIL_DOMAIN_VERIFIED = "true";
  process.env.LAB_EMAIL_FROM = "confirmations@resend.dev";
  assert.equal((await fixture()).requested, false);
  process.env.LAB_EMAIL_FROM = "confirmations@mail.lab-fixture.edu";
  checks.push("Unverified/mismatched sender queues nothing; readiness reveals no credentials");

  const lead = await fixture();
  assert.equal(lead.requested, true);
  const original = await rowFor(lead.id);
  const tx = await db.transaction("write");
  await enqueueEnquiryEmails(tx, { ...lead, programmeSlug: "ai-for-managers", kind: "learner" });
  await tx.commit();
  tx.close();
  assert.equal(
    (
      await db.execute({
        sql: "SELECT COUNT(*) AS n FROM lab_email_outbox WHERE enquiry_id=?",
        args: [lead.id],
      })
    ).rows[0].n,
    2
  );
  assert.equal((await rowFor(lead.id)).payload, original.payload);
  const ownerPayload = JSON.parse(String((await rowFor(lead.id, "operator")).payload)) as {
    text: string;
  };
  assert.equal(ownerPayload.text.includes(lead.email), false);
  assert.equal(ownerPayload.text.includes("Synthetic private text"), false);
  checks.push(
    "One immutable receipt and one operator event per deduplicated enquiry; operator alert omits visitor text/email"
  );

  const rollback = await db.transaction("write");
  const rolledId = randomUUID();
  await rollback.execute({
    sql: "INSERT INTO lab_enquiry(id,kind,name,email,programme_slug,created_at,updated_at,dedup_key) VALUES(?,'learner','Rollback','rollback@learner-fixture.edu','ai-for-managers',?,?,?)",
    args: [rolledId, Date.now(), Date.now(), randomUUID()],
  });
  await enqueueEnquiryEmails(rollback, {
    id: rolledId,
    email: "rollback@learner-fixture.edu",
    programmeSlug: "ai-for-managers",
    kind: "learner",
  });
  await rollback.rollback();
  rollback.close();
  assert.equal(
    (
      await db.execute({
        sql: "SELECT COUNT(*) AS n FROM lab_email_outbox WHERE enquiry_id=?",
        args: [rolledId],
      })
    ).rows[0].n,
    0
  );
  checks.push("Lead and its email events roll back atomically");

  requests = [];
  assert.equal((await drainEmailOutbox({ enquiryId: lead.id })).accepted, 2);
  assert.equal(await enquiryEmailState(lead.id), "accepted");
  assert.equal((await drainEmailOutbox({ enquiryId: lead.id })).accepted, 0);
  assert.equal(requests.length, 2);
  checks.push("Accepted events persist provider IDs and repeated drains do not resend");

  const activeInput = enquiryInput("active@learner-fixture.edu");
  const active = await saveEnquiry(activeInput, "isolated-active-test");
  assert.equal(active.emailStatus, "accepted");
  assert.match(active.message, /accepted by our email service; inbox delivery is not guaranteed/);
  const beforeDuplicate = requests.length;
  const duplicate = await saveEnquiry(
    { ...activeInput, name: "Updated synthetic name" },
    "isolated-active-test"
  );
  assert.equal(active.id, duplicate.id);
  assert.equal(requests.length, beforeDuplicate);
  checks.push(
    "Actual service integrates optional confirmations and deduplicates retries without claiming inbox delivery"
  );

  const concurrent = await fixture();
  requests = [];
  await Promise.all([
    drainEmailOutbox({ enquiryId: concurrent.id }),
    drainEmailOutbox({ enquiryId: concurrent.id }),
  ]);
  assert.equal(requests.length, 2);
  assert.equal(new Set(requests.map((request) => request.key)).size, 2);
  checks.push("Concurrent workers claim distinct atomic leases");

  const retry = await fixture();
  const retryRow = await rowFor(retry.id);
  const base = Date.now();
  requests = [];
  respond = async () => {
    throw new Error("private test email and fake key must not be logged or stored");
  };
  assert.equal((await drainEmailOutbox({ outboxId: String(retryRow.id), now: base })).retry, 1);
  assert.equal((await rowFor(retry.id)).last_error_code, "ambiguous-network-response");
  respond = async () => Response.json({ id: randomUUID() });
  assert.equal(
    (await drainEmailOutbox({ outboxId: String(retryRow.id), now: base + 60001 })).accepted,
    1
  );
  assert.deepEqual(requests[0], requests[1]);
  checks.push(
    "Ambiguous response retries reuse exactly the same provider key and payload; errors contain no PII"
  );

  const old = await fixture();
  const oldRow = await rowFor(old.id);
  const oldNow = Date.now();
  respond = async () => {
    throw new Error("Mock lost response");
  };
  await drainEmailOutbox({ outboxId: String(oldRow.id), now: oldNow });
  const oldCalls = requests.length;
  await drainEmailOutbox({ outboxId: String(oldRow.id), now: oldNow + EMAIL_RETRY_WINDOW_MS });
  assert.equal(requests.length, oldCalls);
  assert.equal((await rowFor(old.id)).status, "review");
  assert.equal((await rowFor(old.id)).last_error_code, "retry-window-ended");
  checks.push(
    "Automatic retries stop at23h instead of duplicating an ambiguous send after provider expiry"
  );

  const recovered = await fixture();
  const recoveredRow = await rowFor(recovered.id);
  await db.execute({
    sql: "UPDATE lab_email_outbox SET status='processing',attempts=1,first_attempt_at=?,lease_token='expired-test-lease',lease_expires_at=? WHERE id=?",
    args: [base, base, String(recoveredRow.id)],
  });
  respond = async () => Response.json({ id: randomUUID() });
  assert.equal(
    (await drainEmailOutbox({ outboxId: String(recoveredRow.id), now: base + 30001 })).accepted,
    1
  );
  checks.push("Expired worker lease can recover safely within the idempotency window");

  for (const [status, body, expected] of [
    [401, { message: "private provider body" }, "failed"],
    [409, { name: "invalid_idempotent_request", message: "private provider body" }, "review"],
    [429, { message: "private provider body" }, "pending"],
    [200, { invalid: "private provider body" }, "pending"],
  ] as const) {
    const event = await fixture();
    const row = await rowFor(event.id);
    respond = async () => Response.json(body, { status });
    await drainEmailOutbox({ outboxId: String(row.id) });
    const stored = await rowFor(event.id);
    assert.equal(stored.status, expected);
    assert.equal(String(stored.last_error_code).includes("private provider body"), false);
  }
  checks.push(
    "Permanent credential failure, payload conflict, rate limit and malformed acceptance have distinct safe states"
  );

  const unavailable = await fixture();
  const unavailableRow = await rowFor(unavailable.id);
  await db.execute({
    sql: "UPDATE lab_email_outbox SET attempts=6,status='processing',first_attempt_at=?,lease_expires_at=? WHERE id=?",
    args: [base, base, String(unavailableRow.id)],
  });
  const maxCalls = requests.length;
  await drainEmailOutbox({ outboxId: String(unavailableRow.id), now: base + 30001 });
  assert.equal(requests.length, maxCalls);
  assert.equal((await rowFor(unavailable.id)).status, "review");
  checks.push("Maximum-attempt expired lease is reviewed rather than stranded or resent");

  const demo = await fixture();
  await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=1 WHERE id=?", args: [demo.id] });
  const demoCalls = requests.length;
  await drainEmailOutbox({ enquiryId: demo.id });
  assert.equal(requests.length, demoCalls);
  assert.equal(await enquiryEmailState(demo.id), "needs-review");
  assert.equal((await fixture("activation-test@demo.invalid")).requested, false);
  assert.equal((await fixture("demo@learner-fixture.edu", true)).requested, false);
  checks.push("Demo marking and reserved synthetic addresses suppress both emails");

  const quota = await fixture();
  const nextDay = Math.floor(Date.now() / 86400000) * 86400000 + 86400000 + 10000;
  process.env.LAB_EMAIL_DAILY_LIMIT = "1";
  respond = async () => Response.json({ id: randomUUID() });
  assert.equal((await drainEmailOutbox({ enquiryId: quota.id, now: nextDay })).accepted, 1);
  assert.equal((await drainEmailOutbox({ enquiryId: quota.id, now: nextDay })).accepted, 0);
  assert.equal(
    (await drainEmailOutbox({ enquiryId: quota.id, now: nextDay + 86400000 })).accepted,
    1
  );
  process.env.LAB_EMAIL_DAILY_LIMIT = "100";
  checks.push(
    "Persistent UTC-day first-attempt limit caps sends and releases only never-attempted events next day"
  );

  const changed = await fixture();
  const changedRow = await rowFor(changed.id);
  process.env.LAB_EMAIL_FROM = "confirmations@new.lab-fixture.edu";
  process.env.LAB_EMAIL_VERIFIED_DOMAIN = "new.lab-fixture.edu";
  const changedCalls = requests.length;
  await drainEmailOutbox({ outboxId: String(changedRow.id) });
  assert.equal(requests.length, changedCalls);
  assert.equal((await rowFor(changed.id)).last_error_code, "sender-config-changed");
  process.env.LAB_EMAIL_FROM = "confirmations@mail.lab-fixture.edu";
  process.env.LAB_EMAIL_VERIFIED_DOMAIN = "mail.lab-fixture.edu";
  checks.push("Changed sender configuration never mutates/reuses an old provider payload");

  requests = [];
  assert.equal((await sendOperatorEmailTest()).accepted, 1);
  assert.equal(requests.length, 1);
  assert.deepEqual(JSON.parse(requests[0].payload).to, ["operator@lab-fixture.edu"]);
  checks.push("Operational test sends only to the fixed configured owner and creates no enquiry");
  // Ensure actual service failure still acknowledges its committed lead.
  respond = async () => {
    throw new Error("Mock untrusted provider failure");
  };
  const savedDuringFailure = await saveEnquiry(
    enquiryInput("failure@learner-fixture.edu"),
    "isolated-failure-test"
  );
  assert.equal(savedDuringFailure.ok, true);
  assert.equal(savedDuringFailure.emailStatus, "queued");
  assert.match(savedDuringFailure.message, /do not need to submit this enquiry again/);
  assert.equal(
    (
      await db.execute({
        sql: "SELECT id FROM lab_enquiry WHERE id=?",
        args: [savedDuringFailure.id],
      })
    ).rows.length,
    1
  );
  checks.push("Provider outage leaves the lead saved with an honest queued acknowledgement");

  // Exercise the coordinating developer's real route against isolated accounts.
  // This invokes handlers in process; no website/login network request is sent.
  process.env.LAB_EMAIL_ENABLED = "false";
  // Page-only Next APIs are unused by these HTTP handlers. Avoid pulling the
  // client navigation runtime into Node's react-server condition; all actual
  // authentication/session/role checks below still use Better Auth and the DB.
  const loader = Module as unknown as {
    _load: (specifier: string, ...args: unknown[]) => unknown;
  };
  const originalLoad = loader._load;
  loader._load = (specifier, ...args) => {
    if (specifier === "next/navigation")
      return {
        redirect: () => {
          throw new Error("Unused page redirect called in route test");
        },
      };
    if (specifier === "next/headers") return { headers: async () => new Headers() };
    return originalLoad.call(Module, specifier, ...args);
  };
  let authModule: typeof import("../src/features/learning-lab/server/auth");
  let route: typeof import("../src/app/api/learning-lab/[...action]/route");
  try {
    authModule = await import("../src/features/learning-lab/server/auth");
    route = await import("../src/app/api/learning-lab/[...action]/route");
  } finally {
    loader._load = originalLoad;
  }
  const { getLabAuth } = authModule;
  const origin = "http://localhost:3110";
  async function invoke(
    method: "GET" | "POST",
    action: string,
    cookie = "",
    body: unknown = {},
    requestOrigin = origin
  ) {
    const request = new Request(`${origin}/api/learning-lab/${action}`, {
      method,
      headers: { Origin: requestOrigin, Cookie: cookie, "Content-Type": "application/json" },
      ...(method === "POST" ? { body: JSON.stringify(body) } : {}),
    });
    return route[method](request, { params: Promise.resolve({ action: action.split("/") }) });
  }
  async function actorCookie(role: "admin" | "learner", isDemo: boolean, temporary = false) {
    const email = `${randomUUID()}@demo.invalid`;
    const password = `${randomUUID()}-isolated-fixture-password`;
    const id = await createMember(
      {
        name: "Synthetic isolated email route actor",
        email,
        password,
        role,
        isDemo,
      },
      role === "admin"
    );
    if (temporary)
      await db.execute({
        sql: "UPDATE lab_member SET must_change_password=1 WHERE user_id=?",
        args: [id],
      });
    const response = await (
      await getLabAuth()
    ).api.signInEmail({
      body: { email, password },
      headers: new Headers({ Origin: origin }),
      asResponse: true,
    });
    assert.equal(response.status, 200);
    return response.headers
      .getSetCookie()
      .map((cookie) => cookie.split(";")[0])
      .join("; ");
  }
  const learnerCookie = await actorCookie("learner", true);
  const temporaryCookie = await actorCookie("admin", false, true);
  const demoCookie = await actorCookie("admin", true);
  const adminCookie = await actorCookie("admin", false);
  assert.equal((await invoke("GET", "admin/email")).status, 401);
  assert.equal((await invoke("POST", "admin/email/test")).status, 401);
  checks.push("Email readiness and mutation deny anonymous actors (401)");
  for (const [label, cookie] of [
    ["learner", learnerCookie],
    ["temporary administrator", temporaryCookie],
    ["demo administrator", demoCookie],
  ] as const) {
    assert.equal((await invoke("GET", "admin/email", cookie)).status, 403);
    assert.equal((await invoke("POST", "admin/email/test", cookie)).status, 403);
    checks.push(`Email operations deny ${label} (403)`);
  }
  assert.equal(
    (await invoke("POST", "admin/email/test", adminCookie, {}, "https://cross-origin.invalid"))
      .status,
    403
  );
  assert.equal(
    (await invoke("POST", "admin/email/test", adminCookie, { to: "arbitrary@demo.invalid" }))
      .status,
    422
  );
  checks.push(
    "Origin and strict empty-body checks forbid cross-origin sending and arbitrary recipient (403/422)"
  );
  const routeCalls = requests.length;
  const routeEvents = Number(
    (await db.execute("SELECT COUNT(*) AS n FROM lab_email_outbox")).rows[0].n
  );
  const safeStatus = await invoke("GET", "admin/email", adminCookie);
  assert.equal(safeStatus.status, 200);
  const metadata = await safeStatus.json();
  assert.equal(metadata.email.configured, false);
  assert.equal(JSON.stringify(metadata).includes("re_mock"), false);
  assert.equal(JSON.stringify(metadata).includes("operator@"), false);
  assert.equal((await invoke("POST", "admin/email/test", adminCookie)).status, 503);
  assert.equal((await invoke("POST", "admin/email/retry", adminCookie)).status, 503);
  assert.equal(requests.length, routeCalls);
  assert.equal(
    Number((await db.execute("SELECT COUNT(*) AS n FROM lab_email_outbox")).rows[0].n),
    routeEvents
  );
  checks.push(
    "Disabled protected test/retry returns honest503 with no fetch or new event; readiness contains no PII/key"
  );
  console.log(
    JSON.stringify(
      {
        passed: true,
        checks: checks.length,
        evidence: checks,
        transport: "mocked only",
        database: "isolated local file",
        realEmailsSent: 0,
      },
      null,
      2
    )
  );
} finally {
  db.close();
}
