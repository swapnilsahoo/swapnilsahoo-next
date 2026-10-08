import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { request, type APIRequestContext } from "playwright";
import { getDatabase } from "../src/features/learning-lab/server/database";
import { createMember, csv } from "../src/features/learning-lab/server/service";
import { seedProgrammeContent } from "../src/features/learning-lab/store";
import { programmes } from "../src/features/learning-lab/programmes";

// Explicitly local only. Every created participant/enquiry is marked synthetic.
const base = process.env.LAB_BASE_URL || "http://localhost:3110";
if (
  process.env.LAB_LOCAL_MODE !== "true" ||
  !process.env.LAB_DATABASE_URL?.startsWith("file:") ||
  !["localhost", "127.0.0.1"].includes(new URL(base).hostname)
)
  throw new Error("Use an explicitly local preview and file database for this integration suite.");
const db = await getDatabase(),
  run = randomUUID().slice(0, 8),
  password = randomBytes(24).toString("base64url"),
  newPassword = randomBytes(24).toString("base64url");
const results: { test: string; passed: boolean }[] = [],
  contexts: APIRequestContext[] = [],
  leadIds: string[] = [];
const origin = { Origin: new URL(base).origin };
async function check(name: string, runTest: () => Promise<void> | void) {
  await runTest();
  results.push({ test: name, passed: true });
  console.log(`PASS ${name}`);
}
async function ctx() {
  const c = await request.newContext({ baseURL: base, extraHTTPHeaders: origin });
  contexts.push(c);
  return c;
}
async function post(c: APIRequestContext, path: string, data: unknown, status = 200) {
  if (
    path === "admin/review" &&
    data &&
    typeof data === "object" &&
    "submissionId" in data &&
    !("expectedRevision" in data)
  ) {
    const revision = (
      await db.execute({
        sql: "SELECT revision FROM lab_submission WHERE id=?",
        args: [String(data.submissionId)],
      })
    ).rows[0]?.revision;
    data = { ...data, expectedRevision: Number(revision || 1) };
  }
  const r = await c.post(`/api/learning-lab/${path}`, { data });
  assert.equal(r.status(), status, `${path}: ${await r.text()}`);
  return r.json();
}
async function login(c: APIRequestContext, email: string, pw: string) {
  return post(c, "auth/sign-in/email", { email, password: pw });
}
await seedProgrammeContent();
// Clear throttles only in the synthetic local test preview for reproducible runs.
assert.equal(
  Number(
    (
      await db.execute(
        "SELECT COUNT(*) AS n FROM lab_enrolment e JOIN lab_member m ON m.user_id=e.user_id WHERE m.is_demo=0"
      )
    ).rows[0].n
  ),
  0,
  "Do not run integration tests against a real pilot database."
);
await db.execute("DELETE FROM lab_rate_limit");
await db.execute("DELETE FROM lab_auth_rate_limit");
const adminEmail = `admin-${run}@demo.invalid`,
  aEmail = `learner-a-${run}@demo.invalid`,
  bEmail = `learner-b-${run}@demo.invalid`;
const adminId = await createMember(
  {
    name: "Synthetic preview administrator",
    email: adminEmail,
    password,
    role: "admin",
    isDemo: true,
  },
  true
);
const aId = await createMember({
  name: "Synthetic Learner A",
  email: aEmail,
  password,
  role: "learner",
  isDemo: true,
});
const bId = await createMember({
  name: "Synthetic Learner B",
  email: bEmail,
  password,
  role: "learner",
  isDemo: true,
});
const anonymous = await ctx(),
  admin = await ctx(),
  a = await ctx(),
  b = await ctx();
try {
  await check("Anonymous admin and learner access denied", async () => {
    assert.equal((await anonymous.get("/api/learning-lab/admin")).status(), 401);
    assert.equal((await anonymous.get("/api/learning-lab/learner")).status(), 401);
  });
  await check("Public signup disabled", async () => {
    await post(
      anonymous,
      "auth/sign-up/email",
      { name: "No", email: "no@demo.invalid", password },
      404
    );
  });
  await check("Forged sessions denied", async () => {
    assert.equal(
      (
        await anonymous.get("/api/learning-lab/admin", {
          headers: { Cookie: "sahoo-lab.session_token=fake" },
        })
      ).status(),
      401
    );
  });
  await check("Cross-origin changes denied", async () => {
    const r = await anonymous.post("/api/learning-lab/enquiries", {
      headers: { Origin: "https://example.invalid" },
      data: {},
    });
    assert.equal(r.status(), 403);
  });
  await check("Admin and provisioned learners authenticate", async () => {
    await login(admin, adminEmail, password);
    await login(a, aEmail, password);
    await login(b, bEmail, password);
  });
  await check("Malformed JSON and unsupported content types are rejected", async () => {
    const malformed = await anonymous.post("/api/learning-lab/enquiries", {
      headers: { "Content-Type": "application/json" },
      data: Buffer.from("{"),
    });
    assert.equal(malformed.status(), 400);
    const wrongType = await anonymous.post("/api/learning-lab/enquiries", {
      headers: { "Content-Type": "text/plain" },
      data: "{}",
    });
    assert.equal(wrongType.status(), 415);
  });
  await check("Oversized request bodies are rejected", async () => {
    const oversized = await anonymous.post("/api/learning-lab/enquiries", {
      data: { message: "x".repeat(81000) },
    });
    assert.equal(oversized.status(), 413);
  });
  await check("Authentication responses cannot be cached", async () => {
    const session = await admin.get("/api/learning-lab/auth/get-session");
    assert.equal(session.status(), 200);
    assert.match(session.headers()["cache-control"], /no-store/);
  });
  await check("Temporary learner password must change before records access", async () => {
    assert.equal((await a.get("/api/learning-lab/learner")).status(), 403);
    await post(a, "change-password", { currentPassword: password, newPassword });
    await post(b, "change-password", { currentPassword: password, newPassword });
    assert.equal((await a.get("/api/learning-lab/learner")).status(), 200);
  });
  await check("Password change revokes prior sessions and preserves new session", async () => {
    const old = await ctx();
    await post(old, "auth/sign-in/email", { email: aEmail, password }, 401);
    await login(old, aEmail, newPassword);
    assert.equal((await old.get("/api/learning-lab/learner")).status(), 200);
  });
  await check("Learner cannot use admin or admin exports", async () => {
    assert.equal((await a.get("/api/learning-lab/admin")).status(), 403);
    assert.equal((await a.get("/api/learning-lab/admin/export?kind=leads")).status(), 403);
    await post(a, "admin/cohort", {}, 403);
  });
  const cohort = (
    await post(admin, "admin/cohort", {
      programmeSlug: "ai-for-managers",
      title: `Synthetic test cohort ${run}`,
      status: "active",
      isDemo: true,
    })
  ).id;
  const aEnrol = (
    await post(admin, "admin/enrolment", {
      userId: aId,
      programmeSlug: "ai-for-managers",
      cohortId: cohort,
    })
  ).id;
  const bEnrol = (
    await post(admin, "admin/enrolment", {
      userId: bId,
      programmeSlug: "ai-for-managers",
      cohortId: cohort,
    })
  ).id;
  await check("Duplicate enrolment rejected", async () => {
    await post(
      admin,
      "admin/enrolment",
      { userId: aId, programmeSlug: "ai-for-managers", cohortId: cohort },
      409
    );
  });
  await check("Learner records contain only that learner's enrolments", async () => {
    const records = await (await a.get("/api/learning-lab/learner")).json();
    assert.equal(records.programmes.length, 1);
    assert.equal(records.programmes[0].enrolment.id, aEnrol);
    assert.ok(!JSON.stringify(records).includes(bId));
  });
  await check("Cross-learner progress, submissions and certificate privacy denied", async () => {
    await post(a, "progress", { enrolmentId: bEnrol, lessonIndex: 0, completed: true }, 404);
    await post(a, "submissions", { enrolmentId: bEnrol, body: "Synthetic work. ".repeat(12) }, 404);
    await post(a, "certificate-privacy", { enrolmentId: bEnrol, publishName: true }, 404);
  });
  await check("Programme JSON validates weights and persists before enrolment", async () => {
    const p = structuredClone(programmes.find((p) => p.slug === "strategy-case-thinking")!);
    p.rubric[0].weight += 1;
    await post(admin, "admin/programme", p, 422);
    p.rubric[0].weight -= 1;
    await post(admin, "admin/programme", p);
  });
  await check("Curriculum locked after enrolment", async () => {
    await post(admin, "admin/programme", programmes[0], 409);
  });
  await check("Unapproved dates, fees and availability blocked", async () => {
    await post(
      admin,
      "admin/availability",
      {
        slug: "ai-for-managers",
        status: "pilot-open",
        startsAt: "2027-01-01",
        feeInr: 8000,
        capacity: 12,
      },
      409
    );
    await post(admin, "admin/availability", {
      slug: "ai-for-managers",
      status: "register-interest",
      startsAt: null,
      feeInr: null,
      capacity: null,
    });
  });
  await check("Payment and webhook endpoints explicitly disabled", async () => {
    await post(anonymous, "checkout", {}, 409);
    await post(anonymous, "payments/webhook", {}, 409);
  });
  const lead = {
    kind: "learner",
    name: "Synthetic enquiry",
    email: `enquiry-${run}@demo.invalid`,
    programmeSlug: "ai-for-managers",
    organisation: "",
    message: "Synthetic test only",
    adultConfirmed: true,
    privacyAccepted: true,
    marketingConsent: false,
    website: "",
    startedAt: Date.now() - 5000,
    source: "/learning-lab/contact?source=test",
  };
  await check("Enquiry validates adult consent, privacy, honeypot and elapsed time", async () => {
    await post(anonymous, "enquiries", { ...lead, adultConfirmed: false }, 422);
    await post(anonymous, "enquiries", { ...lead, privacyAccepted: false }, 422);
    await post(anonymous, "enquiries", { ...lead, website: "spam" }, 422);
    await post(anonymous, "enquiries", { ...lead, startedAt: Date.now() }, 422);
  });
  const nextActionAt = Date.now() + 86400000;
  await check("Enquiry persists with an unassigned workflow", async () => {
    const saved = await post(anonymous, "enquiries", lead);
    leadIds.push(saved.id);
    await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=1 WHERE id=?", args: [saved.id] });
    const row = (
      await db.execute({ sql: "SELECT * FROM lab_enquiry WHERE id=?", args: [saved.id] })
    ).rows[0];
    assert.equal(row.status, "new");
    assert.equal(row.owner_user_id, null);
    assert.equal(row.next_action, null);
    assert.equal(row.next_action_at, null);
    assert.match(saved.message, /No confirmation email/);
  });
  await check(
    "Admin assigns an enquiry workflow and rejects invalid owners or missing leads",
    async () => {
      const workflow = {
        id: leadIds[0],
        status: "proposal-sent",
        ownerUserId: adminId,
        nextAction: "Confirm the institutional pilot scope",
        nextActionAt,
      };
      await post(admin, "admin/lead", workflow);
      await post(a, "admin/lead", workflow, 403);
      await post(admin, "admin/lead", { ...workflow, ownerUserId: aId }, 422);
      await post(admin, "admin/lead", { ...workflow, ownerUserId: randomUUID() }, 422);
      await post(admin, "admin/lead", { ...workflow, id: randomUUID() }, 404);
      await post(admin, "admin/lead", { ...workflow, nextAction: "x".repeat(501) }, 422);
      await post(admin, "admin/lead", { ...workflow, nextActionAt: -1 }, 422);
      await post(admin, "admin/lead", { ...workflow, status: "payment-confirmed" }, 422);
      const records = await (await admin.get("/api/learning-lab/admin")).json();
      const saved = records.data.leads.find((record: { id: string }) => record.id === leadIds[0]);
      assert.equal(saved.status, workflow.status);
      assert.equal(saved.owner_user_id, adminId);
      assert.equal(saved.next_action, workflow.nextAction);
      assert.equal(Number(saved.next_action_at), nextActionAt);
      assert.equal(
        Number(
          (
            await db.execute({
              sql: "SELECT COUNT(*) AS n FROM lab_audit WHERE entity_id=? AND action='enquiry.workflow'",
              args: [leadIds[0]],
            })
          ).rows[0].n
        ),
        1
      );
    }
  );
  await check("Duplicate enquiry updates the same record and preserves its workflow", async () => {
    const second = await post(anonymous, "enquiries", {
      ...lead,
      message: "Updated synthetic message",
    });
    assert.equal(second.id, leadIds[0]);
    const rows = (
      await db.execute({ sql: "SELECT * FROM lab_enquiry WHERE id=?", args: [leadIds[0]] })
    ).rows;
    assert.equal(rows.length, 1);
    assert.equal(rows[0].message, "Updated synthetic message");
    assert.equal(rows[0].marketing_consent, 0);
    assert.equal(rows[0].consent_at, null);
    assert.equal(rows[0].source, lead.source);
    assert.equal(rows[0].status, "proposal-sent");
    assert.equal(rows[0].owner_user_id, adminId);
    assert.equal(rows[0].next_action, "Confirm the institutional pilot scope");
    assert.equal(Number(rows[0].next_action_at), nextActionAt);
  });
  await check(
    "All enquiry stages remain manual; legacy payloads preserve and explicit nulls clear workflow",
    async () => {
      for (const status of [
        "new",
        "contacted",
        "qualified",
        "proposal-sent",
        "booked",
        "delivered",
        "lost",
        "closed",
      ])
        await post(admin, "admin/lead", { id: leadIds[0], status });
      let row = (
        await db.execute({ sql: "SELECT * FROM lab_enquiry WHERE id=?", args: [leadIds[0]] })
      ).rows[0];
      assert.equal(row.status, "closed");
      assert.equal(row.owner_user_id, adminId);
      assert.equal(row.next_action, "Confirm the institutional pilot scope");
      assert.equal(Number(row.next_action_at), nextActionAt);
      await post(admin, "admin/lead", {
        id: leadIds[0],
        status: "lost",
        ownerUserId: null,
        nextAction: null,
        nextActionAt: null,
      });
      row = (await db.execute({ sql: "SELECT * FROM lab_enquiry WHERE id=?", args: [leadIds[0]] }))
        .rows[0];
      assert.equal(row.owner_user_id, null);
      assert.equal(row.next_action, null);
      assert.equal(row.next_action_at, null);
    }
  );
  await check("Separate optional marketing consent persists", async () => {
    await post(anonymous, "enquiries", { ...lead, marketingConsent: true });
    const row = (
      await db.execute({
        sql: "SELECT marketing_consent,consent_at FROM lab_enquiry WHERE id=?",
        args: [leadIds[0]],
      })
    ).rows[0];
    assert.equal(row.marketing_consent, 1);
    assert.ok(Number(row.consent_at) > 0);
  });
  await check("Enquiry spam rate limit enforced", async () => {
    await post(anonymous, "enquiries", lead);
    await post(anonymous, "enquiries", lead);
    await post(anonymous, "enquiries", lead, 429);
  });
  await check("Invalid lesson index and unsafe attachments rejected", async () => {
    await post(a, "progress", { enrolmentId: aEnrol, lessonIndex: 29, completed: true }, 422);
    await post(a, "submissions", { enrolmentId: aEnrol, body: "Too short" }, 422);
    await post(
      a,
      "submissions",
      {
        enrolmentId: aEnrol,
        body: "Synthetic original work. ".repeat(12),
        attachmentName: "../escape.txt",
      },
      422
    );
    await post(
      a,
      "submissions",
      {
        enrolmentId: aEnrol,
        body: "Synthetic original work. ".repeat(12),
        attachmentName: "code.html",
      },
      422
    );
  });
  await check(
    "Certificate blocked before required lessons, attendance and assessment",
    async () => {
      await post(admin, "admin/certificate", { enrolmentId: aEnrol }, 409);
    }
  );
  await check("Valid text submission persists", async () => {
    await post(a, "submissions", {
      enrolmentId: aEnrol,
      body: "Synthetic original work. ".repeat(12),
      attachmentName: "capstone.txt",
    });
    assert.equal(
      (
        await db.execute({
          sql: "SELECT attachment_name FROM lab_submission WHERE enrolment_id=?",
          args: [aEnrol],
        })
      ).rows[0].attachment_name,
      "capstone.txt"
    );
  });
  const submission = (
    await db.execute({ sql: "SELECT id FROM lab_submission WHERE enrolment_id=?", args: [aEnrol] })
  ).rows[0].id;
  const scores = programmes[0].rubric.map(() => 3);
  await check("Rubric approval below threshold and incomplete scoring rejected", async () => {
    await post(
      admin,
      "admin/review",
      {
        submissionId: submission,
        rubricScores: [1],
        feedback: "Synthetic feedback for testing only.",
        approved: true,
      },
      422
    );
    await post(
      admin,
      "admin/review",
      {
        submissionId: submission,
        rubricScores: scores.map(() => 1),
        feedback: "Synthetic feedback for testing only.",
        approved: true,
      },
      422
    );
  });
  await check("Weighted instructor feedback persists; revision resets approval", async () => {
    const r = await post(admin, "admin/review", {
      submissionId: submission,
      rubricScores: scores,
      feedback: "Synthetic feedback for testing only.",
      approved: true,
    });
    assert.equal(r.score, 75);
    await post(a, "submissions", {
      enrolmentId: aEnrol,
      body: "Revised synthetic original work. ".repeat(12),
    });
    const s = (
      await db.execute({
        sql: "SELECT approved,score,feedback FROM lab_submission WHERE id=?",
        args: [submission],
      })
    ).rows[0];
    assert.equal(s.approved, 0);
    assert.equal(s.score, null);
    assert.equal(s.feedback, null);
    await post(admin, "admin/review", {
      submissionId: submission,
      rubricScores: scores,
      feedback: "Synthetic feedback: judgement and evidence satisfy the configured rubric.",
      approved: true,
    });
  });
  await check("Stale instructor review rejected instead of grading changed text", async () => {
    await post(
      admin,
      "admin/review",
      {
        submissionId: submission,
        expectedRevision: 1,
        rubricScores: scores,
        feedback: "This would grade the prior text, so must be rejected.",
        approved: true,
      },
      409
    );
  });
  for (let i = 0; i < programmes[0].sessions.length; i++)
    await post(a, "progress", { enrolmentId: aEnrol, lessonIndex: i, completed: true });
  await check("Attendance independently gates certificate", async () => {
    await post(admin, "admin/certificate", { enrolmentId: aEnrol }, 409);
    await post(admin, "admin/attendance", { enrolmentId: aEnrol, attendancePercent: 85 });
  });
  let verification = "";
  await check("Eligible certificate issues random identifier and is idempotent", async () => {
    verification = (await post(admin, "admin/certificate", { enrolmentId: aEnrol })).verificationId;
    assert.match(verification, /^[A-Za-z0-9_-]{43}$/);
    assert.equal(
      (await post(admin, "admin/certificate", { enrolmentId: aEnrol })).verificationId,
      verification
    );
  });
  await check("Public verification is minimal and name opt-in is separate", async () => {
    const r = await (await anonymous.get(`/api/learning-lab/verify/${verification}`)).json();
    assert.equal(r.certificate.displayName, null);
    assert.equal(r.certificate.isDemo, true);
    assert.ok(!JSON.stringify(r).includes(aEmail));
    assert.deepEqual(
      Object.keys(r.certificate).sort(),
      ["displayName", "isDemo", "issuedAt", "programme", "status", "type"].sort()
    );
    await post(a, "certificate-privacy", { enrolmentId: aEnrol, publishName: true });
    assert.equal(
      (await (await anonymous.get(`/api/learning-lab/verify/${verification}`)).json()).certificate
        .displayName,
      "Synthetic Learner A"
    );
    await post(a, "certificate-privacy", { enrolmentId: aEnrol, publishName: false });
  });
  await check("Issued certificate protects submitted work and lesson completion", async () => {
    await post(a, "progress", { enrolmentId: aEnrol, lessonIndex: 0, completed: false }, 409);
    await post(
      a,
      "submissions",
      { enrolmentId: aEnrol, body: "Synthetic revision. ".repeat(12) },
      409
    );
  });
  await check("Changed attendance revokes verification; reissue resets name consent", async () => {
    await post(admin, "admin/attendance", { enrolmentId: aEnrol, attendancePercent: 20 });
    assert.equal(
      (await (await anonymous.get(`/api/learning-lab/verify/${verification}`)).json()).certificate
        .status,
      "revoked"
    );
    await post(admin, "admin/certificate", { enrolmentId: aEnrol }, 409);
    await post(admin, "admin/attendance", { enrolmentId: aEnrol, attendancePercent: 90 });
    const reissue = await post(admin, "admin/certificate", { enrolmentId: aEnrol });
    assert.notEqual(reissue.verificationId, verification);
    assert.equal((await anonymous.get(`/api/learning-lab/verify/${verification}`)).status(), 404);
    verification = reissue.verificationId;
    assert.equal(
      (await (await anonymous.get(`/api/learning-lab/verify/${verification}`)).json()).certificate
        .displayName,
      null
    );
  });
  await check("Concurrent certificate issuance and revision preserve eligibility", async () => {
    await post(admin, "admin/revoke", { verificationId: verification });
    const race = await Promise.all([
      admin.post("/api/learning-lab/admin/certificate", { data: { enrolmentId: aEnrol } }),
      a.post("/api/learning-lab/submissions", {
        data: { enrolmentId: aEnrol, body: "Concurrent synthetic revision. ".repeat(12) },
      }),
    ]);
    for (const response of race) assert.ok([200, 409, 503].includes(response.status()));
    assert.ok(race.some((response) => response.status() === 200));
    const row = (
      await db.execute({
        sql: "SELECT c.revoked_at,s.approved,s.score FROM lab_certificate c JOIN lab_submission s ON s.enrolment_id=c.enrolment_id WHERE c.enrolment_id=?",
        args: [aEnrol],
      })
    ).rows[0];
    assert.ok(
      row.revoked_at !== null ||
        (Boolean(row.approved) && Number(row.score) >= programmes[0].certificate.minScore)
    );
    await post(admin, "admin/review", {
      submissionId: submission,
      rubricScores: scores,
      feedback: "Latest synthetic revision reviewed against the configured rubric.",
      approved: true,
    });
    verification = (await post(admin, "admin/certificate", { enrolmentId: aEnrol })).verificationId;
  });
  await check("Concurrent issuance and completion removal preserve eligibility", async () => {
    await post(admin, "admin/revoke", { verificationId: verification });
    const race = await Promise.all([
      admin.post("/api/learning-lab/admin/certificate", { data: { enrolmentId: aEnrol } }),
      a.post("/api/learning-lab/progress", {
        data: { enrolmentId: aEnrol, lessonIndex: 0, completed: false },
      }),
    ]);
    for (const response of race) assert.ok([200, 409, 503].includes(response.status()));
    assert.ok(race.some((response) => response.status() === 200));
    const certificate = (
      await db.execute({
        sql: "SELECT revoked_at FROM lab_certificate WHERE enrolment_id=?",
        args: [aEnrol],
      })
    ).rows[0];
    const count = Number(
      (
        await db.execute({
          sql: "SELECT COUNT(*) AS n FROM lab_progress WHERE enrolment_id=?",
          args: [aEnrol],
        })
      ).rows[0].n
    );
    assert.ok(certificate.revoked_at !== null || count === programmes[0].sessions.length);
    await post(a, "progress", { enrolmentId: aEnrol, lessonIndex: 0, completed: true });
    verification = (await post(admin, "admin/certificate", { enrolmentId: aEnrol })).verificationId;
  });
  await check("Synthetic data excluded from CSV and outcome reporting", async () => {
    const records = await (await admin.get("/api/learning-lab/admin")).json();
    assert.equal(records.data.outcomes.enrolments, 0);
    assert.equal(records.data.outcomes.certificates, 0);
    assert.equal(records.data.outcomes.enquiries, 0);
    for (const kind of ["leads", "enrolments", "submissions"]) {
      const exportResponse = await admin.get(`/api/learning-lab/admin/export?kind=${kind}`);
      assert.equal(exportResponse.status(), 200);
      assert.ok(!(await exportResponse.text()).includes("@demo.invalid"));
    }
    assert.match(csv([{ name: "=SUM(1,2)" }], ["name"]), /"'=SUM/);
    assert.match(csv([{ next_action: "=SUM(1,2)" }], ["next_action"]), /"'=SUM/);
  });
  await mkdir(".data", { recursive: true });
  await writeFile(
    ".data/learning-lab-preview-access.json",
    JSON.stringify(
      {
        baseURL: base,
        admin: { email: adminEmail, password },
        learners: [
          { email: aEmail, password: newPassword },
          { email: bEmail, password: newPassword },
        ],
        verificationId: verification,
      },
      null,
      2
    ),
    { mode: 0o600 }
  );
  await mkdir("artifacts/learning-lab", { recursive: true });
  await writeFile(
    "artifacts/learning-lab/integration-results.json",
    JSON.stringify({ at: new Date().toISOString(), base, tests: results }, null, 2)
  );
  console.log(
    `${results.length} integration checks passed. Local synthetic preview access is in the ignored .data/learning-lab-preview-access.json file; no credentials printed.`
  );
} finally {
  // Prevent even interrupted tests from appearing as real enquiries.
  for (const id of leadIds)
    await db.execute({ sql: "UPDATE lab_enquiry SET is_demo=1 WHERE id=?", args: [id] });
  await Promise.all(contexts.map((c) => c.dispose()));
  db.close();
}
