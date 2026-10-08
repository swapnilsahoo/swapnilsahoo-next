import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import { createClient } from "@libsql/client";

// Every provider request is intercepted below. This suite creates no real calls,
// uploads no likeness or voice, and uses a new disposable local database.
delete process.env.VERCEL;
process.env.LAB_LOCAL_MODE = "true";
process.env.LAB_DATABASE_URL = `file:.data/digital-avatar-test-${randomUUID()}.db`;
delete process.env.LAB_DATABASE_AUTH_TOKEN;
process.env.DIGITAL_AVATAR_ENABLED = "true";
process.env.DIGITAL_AVATAR_PROVIDER = "tavus";
process.env.DIGITAL_AVATAR_BASE_URL = "https://www.swapnilsahoo.com";
process.env.DIGITAL_AVATAR_SESSION_SECRET = "synthetic-test-secret-with-at-least-32-characters";
process.env.DIGITAL_AVATAR_DAILY_SESSION_LIMIT = "10";
process.env.TAVUS_API_KEY = "synthetic-provider-key-never-sent";
process.env.TAVUS_FACE_ID = "face_test";
process.env.TAVUS_PAL_ID = "pal_test";
await mkdir(".data", { recursive: true });

let sequence = 0;
let mode: "good" | "unavailable" | "malformed" | "no-token" | "end-failure" = "good";
const calls: { url: string; body?: Record<string, unknown> }[] = [];
globalThis.fetch = async (input, init) => {
  const url = String(input);
  assert.ok(url.startsWith("https://tavusapi.com/v2/conversations"), "No unexpected network request");
  assert.equal(init?.method, "POST");
  assert.equal(new Headers(init?.headers).get("x-api-key"), process.env.TAVUS_API_KEY);
  calls.push({ url, body: typeof init?.body === "string" ? JSON.parse(init.body) : undefined });
  if (url.endsWith("/end")) return new Response(null, { status: mode === "end-failure" ? 503 : 200 });
  if (mode === "unavailable") return new Response("raw upstream error synthetic-private", { status: 401 });
  const id = `c_test_${++sequence}`;
  return Response.json({
    conversation_id: id,
    conversation_url: mode === "malformed" ? "https://attacker.example/private" : `https://tavus.daily.co/${id}`,
    meeting_token: mode === "no-token" ? undefined : "synthetic.participant.token-for-this-session",
    status: "active",
  });
};

const { getAvatarAvailability } = await import("../src/features/digital-avatar/server");
const { getAvatarFrameOrigins } = await import("../src/features/digital-avatar/embed-config");
const { POST, DELETE } = await import("../src/app/api/digital-avatar/session/route");
const database = createClient({ url: process.env.LAB_DATABASE_URL });
const origin = process.env.DIGITAL_AVATAR_BASE_URL;
const request = (method = "POST", body: unknown = { consent: true }, cookie?: string, overrides: Record<string, string> = {}) =>
  new Request(`${origin}/api/digital-avatar/session`, {
    method,
    headers: { origin, "content-type": "application/json", ...(cookie ? { cookie } : {}), ...overrides },
    ...(body === undefined ? {} : { body: typeof body === "string" ? body : JSON.stringify(body) }),
  });
const end = (cookie: string, body?: unknown) => DELETE(request("DELETE", body === undefined ? "" : body, cookie));
const cookieFrom = (response: Response) => response.headers.get("set-cookie")!.split(";")[0];
let passed = 0;
async function test(name: string, work: () => Promise<void> | void) {
  await work();
  passed++;
  console.log(`PASS ${name}`);
}
async function clear() {
  await database.batch(["DELETE FROM digital_avatar_rate", "DELETE FROM digital_avatar_session"], "write");
  mode = "good";
  process.env.DIGITAL_AVATAR_DAILY_SESSION_LIMIT = "10";
}

await test("1mind requires owner approval and a provider-issued HTTPS deployment URL", () => {
  assert.deepEqual(getAvatarFrameOrigins({}), []);
  assert.deepEqual(getAvatarFrameOrigins(), ["https://tavus.daily.co"]);
  process.env.DIGITAL_AVATAR_PROVIDER = "1mind";
  process.env.ONEMIND_EMBED_URL = "https://deployment-swapniltest.1mind.com/?access-code=public-test";
  assert.equal(getAvatarAvailability().liveVideo, false);
  assert.deepEqual(getAvatarFrameOrigins(), []);
  process.env.ONEMIND_DEPLOYMENT_APPROVED = "true";
  assert.equal(getAvatarAvailability().providerLabel, "1mind");
  assert.deepEqual(getAvatarFrameOrigins(), ["https://deployment-swapniltest.1mind.com"]);
  for (const url of ["https://attacker.example/", "http://deployment-test.1mind.com/", "https://deployment-test.1mind.com/?api_key=private", "https://deployment-test.1mind.com.evil.example/"]) {
    process.env.ONEMIND_EMBED_URL = url;
    assert.equal(getAvatarAvailability().liveVideo, false);
    assert.deepEqual(getAvatarFrameOrigins(), []);
  }
  delete process.env.ONEMIND_EMBED_URL;
  delete process.env.ONEMIND_DEPLOYMENT_APPROVED;
  process.env.DIGITAL_AVATAR_PROVIDER = "tavus";
  assert.equal(calls.length, 0);
});
await test("readiness fails closed for missing budget, secret, provider IDs and remote storage", () => {
  assert.equal(getAvatarAvailability().liveVideo, true);
  for (const key of ["DIGITAL_AVATAR_DAILY_SESSION_LIMIT", "DIGITAL_AVATAR_SESSION_SECRET", "TAVUS_FACE_ID", "TAVUS_PAL_ID", "TAVUS_API_KEY", "LAB_DATABASE_URL"]) {
    const previous = process.env[key];
    delete process.env[key];
    assert.equal(getAvatarAvailability().liveVideo, false, key);
    process.env[key] = previous;
  }
  process.env.VERCEL = "1";
  assert.equal(getAvatarAvailability().liveVideo, false, "Local storage never activates on Vercel");
  delete process.env.VERCEL;
  assert.equal(calls.length, 0, "Readiness performs no provider requests");
});
await test("unconfigured POST is honest and never contacts provider", async () => {
  process.env.DIGITAL_AVATAR_ENABLED = "false";
  assert.equal((await POST(request())).status, 503);
  assert.equal(calls.length, 0);
  process.env.DIGITAL_AVATAR_ENABLED = "true";
});
await test("origin, JSON, strict explicit consent and streaming body limits are enforced", async () => {
  assert.equal((await POST(request("POST", { consent: true }, undefined, { origin: "https://attacker.example" }))).status, 403);
  assert.equal((await POST(request("POST", { consent: true }, undefined, { "content-type": "text/plain" }))).status, 415);
  for (const invalid of [{ consent: false }, {}, [], { consent: true, pal_id: "unapproved" }, "invalid-json"])
    assert.equal((await POST(request("POST", invalid))).status, 422);
  assert.equal((await POST(request("POST", "x".repeat(1025)))).status, 413);
  assert.equal(calls.length, 0);
});
let firstCookie = "";
let firstId = "";
await test("private real API contract has hard limits, no recording, disclosure and no secret leakage", async () => {
  const response = await POST(request());
  assert.equal(response.status, 201);
  const session = await response.json();
  firstCookie = cookieFrom(response);
  firstId = session.conversationId;
  const url = new URL(session.conversationUrl);
  assert.equal(url.origin, "https://tavus.daily.co");
  assert.ok(url.searchParams.get("t"));
  const remaining = Date.parse(session.expiresAt) - Date.now();
  assert.ok(remaining > 295000 && remaining <= 300000);
  assert.deepEqual(Object.keys(session).sort(), ["conversationId", "conversationUrl", "expiresAt"]);
  assert.ok(!JSON.stringify(session).includes(process.env.TAVUS_API_KEY!));
  assert.match(response.headers.get("cache-control")!, /no-store/);
  assert.match(response.headers.get("set-cookie")!, /HttpOnly; SameSite=Strict; Secure/);
  assert.ok(!firstCookie.includes(firstId), "Cookie does not expose provider ID");
  const body = calls[0].body!;
  assert.equal(body.face_id, "face_test");
  assert.equal(body.pal_id, "pal_test");
  assert.equal(body.require_auth, true);
  assert.equal(body.max_participants, 2);
  assert.notEqual(body.audio_only, true);
  assert.deepEqual(body.participant_tags, []);
  assert.match(String(body.custom_greeting), /AI video guide.*not Dr. Sahoo speaking live/);
  assert.match(String(body.conversational_context), /not approved[\s\S]*no active checkout/);
  assert.deepEqual(body.properties, { max_call_duration: 300, participant_left_timeout: 10, participant_absent_timeout: 45, enable_recording: false, auto_start_recording: false, enable_closed_captions: true });
});
await test("current browser cannot silently create a second call", async () => {
  assert.equal((await POST(request("POST", { consent: true }, firstCookie))).status, 409);
  assert.equal(calls.length, 1);
});
await test("DELETE requires signed session ownership and rejects arbitrary upstream identifiers", async () => {
  assert.equal((await end("")).status, 401);
  assert.equal((await end(`${firstCookie.slice(0, -1)}!`)).status, 401);
  assert.equal((await end(firstCookie, { conversationId: "someone_else" })).status, 422);
  assert.equal(calls.length, 1);
  const response = await end(firstCookie);
  assert.equal(response.status, 200);
  assert.equal(calls[1].url, `https://tavusapi.com/v2/conversations/${firstId}/end`);
  assert.match(response.headers.get("set-cookie")!, /Max-Age=0/);
  assert.equal((await end(firstCookie)).status, 200, "End is idempotent without a second provider call");
  assert.equal(calls.length, 2);
});
await test("shared atomic concurrency limit admits only two simultaneous requests", async () => {
  await clear();
  const responses = await Promise.all([POST(request()), POST(request()), POST(request())]);
  assert.deepEqual(responses.map((r) => r.status).sort(), [201, 201, 429]);
  for (const response of responses.filter((r) => r.status === 201)) await end(cookieFrom(response));
});
await test("shared daily budget is enforced independently of sessions ending", async () => {
  await clear();
  process.env.DIGITAL_AVATAR_DAILY_SESSION_LIMIT = "1";
  const response = await POST(request());
  assert.equal(response.status, 201);
  await end(cookieFrom(response));
  const before = calls.length;
  assert.equal((await POST(request())).status, 429);
  assert.equal(calls.length, before);
});
await test("untrusted forwarded headers cannot evade the three-per-hour limit", async () => {
  await clear();
  for (let i = 0; i < 3; i++) {
    const response = await POST(request("POST", { consent: true }, undefined, { "x-forwarded-for": `203.0.113.${i}` }));
    assert.equal(response.status, 201);
    await end(cookieFrom(response));
  }
  assert.equal((await POST(request("POST", { consent: true }, undefined, { "x-forwarded-for": "198.51.100.99" }))).status, 429);
});
await test("provider failures return honest sanitized errors and retain ambiguous reservation", async () => {
  await clear();
  mode = "unavailable";
  const response = await POST(request());
  assert.equal(response.status, 503);
  const error = JSON.stringify(await response.json());
  assert.ok(!error.includes("synthetic-private"));
  assert.ok(!error.includes(process.env.TAVUS_API_KEY!));
  const pending = (await database.execute("SELECT * FROM digital_avatar_session")).rows[0];
  assert.equal(pending.ended_at, null);
  assert.ok(Number(pending.expires_at) > Date.now());
});
await test("malformed or tokenless private room is not returned and is ended upstream", async () => {
  for (const failure of ["malformed", "no-token"] as const) {
    await clear();
    mode = failure;
    const before = calls.length;
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.equal(calls.length, before + 2);
    assert.ok(calls.at(-1)!.url.endsWith("/end"));
    assert.ok((await database.execute("SELECT ended_at FROM digital_avatar_session")).rows[0].ended_at);
  }
});
await test("failed end is not reported as confirmed, and remains retryable", async () => {
  await clear();
  const created = await POST(request());
  const sessionCookie = cookieFrom(created);
  mode = "end-failure";
  const response = await end(sessionCookie);
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("set-cookie"), null);
  assert.equal((await database.execute("SELECT ended_at FROM digital_avatar_session")).rows[0].ended_at, null);
  mode = "good";
  assert.equal((await end(sessionCookie)).status, 200);
});
await test("expired slots release concurrency and old minimal session records are purged", async () => {
  await clear();
  await database.execute({ sql: "INSERT INTO digital_avatar_session(id,created_at,expires_at) VALUES(?,?,?)", args: [randomUUID(), 1, 2] });
  const response = await POST(request());
  assert.equal(response.status, 201);
  assert.equal(Number((await database.execute("SELECT COUNT(*) AS count FROM digital_avatar_session")).rows[0].count), 1);
  await end(cookieFrom(response));
});
database.close();
console.log(`${passed} digital-avatar integration checks passed; all Tavus requests were mocked.`);
