import { writeFile } from "node:fs/promises";
import { request } from "playwright";

// Operator task only. Fixed production origin and authenticated admin action;
// no caller-selected recipient, payload or email/provider credentials.
const origin = "https://www.swapnilsahoo.com";
const password = process.env.LAB_EMAIL_RETRY_ADMIN_PASSWORD || "";
const report = {
  checkedAt: new Date().toISOString(),
  passed: false,
  administratorAuthenticated: false,
  providerConfigured: false,
  accepted: 0,
  retry: 0,
  failed: 0,
  review: 0,
  signedOut: false,
};
if (!process.argv.includes("--run") || password.length < 32) {
  console.log(JSON.stringify({ ...report, failure: "private-owner-task-required" }));
  process.exit(1);
}
const client = await request.newContext({ baseURL: origin, timeout: 30000, maxRedirects: 0 });
const post = (path, data) =>
  client.post(`/api/learning-lab/${path}`, {
    data,
    headers: { Origin: origin, "Content-Type": "application/json" },
  });
let stage = "sign-in";
try {
  const login = await post("auth/sign-in/email", {
    email: "swapnil.s@greatlakes.edu.in",
    password,
    rememberMe: false,
  });
  if (login.status() !== 200) throw new Error("operator-authentication-failed");
  report.administratorAuthenticated = true;
  stage = "provider-readiness";
  const readiness = await client.get("/api/learning-lab/admin/email");
  if (readiness.status() !== 200) throw new Error("protected-readiness-failed");
  const ready = await readiness.json();
  if (ready.ok !== true || typeof ready.email?.configured !== "boolean")
    throw new Error("readiness-shape-invalid");
  report.providerConfigured = ready.email.configured;
  if (!report.providerConfigured) {
    report.skipped = "provider-unconfigured-no-email-attempted";
  } else {
    stage = "bounded-retry";
    const retry = await post("admin/email/retry", {});
    if (retry.status() !== 200) throw new Error("protected-retry-failed");
    const result = await retry.json();
    if (result.ok !== true || result.result?.configured !== true)
      throw new Error("retry-shape-invalid");
    for (const key of ["accepted", "retry", "failed", "review"]) {
      if (!Number.isSafeInteger(result.result[key]) || result.result[key] < 0)
        throw new Error("retry-count-invalid");
      report[key] = result.result[key];
    }
    report.inboxDeliveryVerified = false;
  }
  report.passed = true;
} catch {
  report.failedStage = stage;
  process.exitCode = 1;
} finally {
  try {
    report.signedOut = (await post("auth/sign-out", {})).status() === 200;
  } catch {
    report.signedOut = false;
  }
  if (report.administratorAuthenticated && !report.signedOut) {
    report.passed = false;
    report.failedStage = "sign-out";
    process.exitCode = 1;
  }
  await client.dispose();
  const target = process.env.LAB_EMAIL_RETRY_STATUS_FILE;
  if (target) await writeFile(target, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report));
}
