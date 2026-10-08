import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = "http://localhost:3112";
const results = [];
for (const path of [
  "/learning-lab/contact",
  "/learning-lab/for-colleges",
  "/learning-lab/programmes/ai-for-managers",
  "/learning-lab/programmes/strategy-case-thinking",
  "/learning-lab/programmes/entrepreneurship-under-constraint",
  "/learning-lab/login",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, path.endsWith("/login") ? /Workspace opening soon/ : /Email the Lab/);
  assert.match(html, /mailto:swapnil.s@greatlakes.edu.in/);
  assert.doesNotMatch(html, /name="(?:email|password)"/);
  results.push({ path, status: 200, noUnusableForm: true });
}
for (const path of [
  "/learning-lab",
  "/learning-lab/programmes",
  "/learning-lab/programmes/ai-for-managers",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  results.push({ path, status: response.status, publicFallback: true });
}
const enquiry = await fetch(base + "/api/learning-lab/enquiries", {
  method: "POST",
  headers: { Origin: base, "Content-Type": "application/json" },
  body: JSON.stringify({
    kind: "learner",
    name: "Synthetic unavailable-service test",
    email: "unavailable@demo.invalid",
    programmeSlug: "ai-for-managers",
    adultConfirmed: true,
    privacyAccepted: true,
    marketingConsent: false,
    website: "",
    startedAt: Date.now() - 5000,
  }),
});
assert.equal(enquiry.status, 503);
const payload = await enquiry.json();
assert.equal(payload.ok, false);
assert.match(payload.error, /Nothing has been submitted/);
results.push({ path: "/api/learning-lab/enquiries", status: 503, honestFailure: true });
for (const path of [
  "/api/learning-lab/admin",
  "/api/learning-lab/learner",
  "/api/learning-lab/verify/" + "A".repeat(43),
  "/api/learning-lab/auth/get-session",
]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.match(response.headers.get("vary") || "", /cookie/i);
  results.push({ path: path.replace(/A{43}/, "<random-token>"), status: 503, failClosed: true });
}
const disabledSignup = await fetch(base + "/api/learning-lab/auth/sign-up/email");
assert.equal(disabledSignup.status, 404);
assert.equal(disabledSignup.headers.get("cache-control"), "no-store");
assert.match(disabledSignup.headers.get("vary") || "", /cookie/i);
results.push({ path: "/api/learning-lab/auth/sign-up/email", status: 404, noStore: true });
const payment = await fetch(base + "/api/learning-lab/checkout", { method: "POST" });
assert.equal(payment.status, 409);
results.push({ path: "/api/learning-lab/checkout", status: 409, disabled: true });
await mkdir("artifacts/learning-lab", { recursive: true });
await writeFile(
  "artifacts/learning-lab/unconfigured-results.json",
  JSON.stringify({ at: new Date().toISOString(), status: "PASS", base, results }, null, 2)
);
console.log(
  "PASS unconfigured production preview: public pages remain readable; persistence/authentication fail closed; payments disabled."
);
