import { chromium } from "playwright";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import assert from "node:assert/strict";

const access = JSON.parse(await readFile(".data/learning-lab-preview-access.json", "utf8"));
const base = process.env.LAB_TEST_BASE_URL || access.baseURL;
assert(
  ["localhost", "127.0.0.1"].includes(new URL(base).hostname),
  "Only a local synthetic test service may be used"
);
const tag = Date.now().toString(36);
const name = `Synthetic UI learner ${tag}`;
const email = `lab-ui-${tag}@example.com`;
const temporary = randomBytes(20).toString("base64url");
const password = randomBytes(24).toString("base64url");
const cohortTitle = `Synthetic UI cohort ${tag}`;
const output = "artifacts/learning-lab/screenshots";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = {
  status: "RUNNING",
  base,
  adminSections: [],
  learner: {},
  verification: {},
  errors: [],
};
const adminContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const learnerContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const admin = await adminContext.newPage();
const learner = await learnerContext.newPage();
for (const page of [admin, learner])
  page.on("pageerror", (error) => report.errors.push(error.message));
async function postByButton(page, locator, action) {
  const pending = page.waitForResponse(
    (response) =>
      response.url().endsWith(`/api/learning-lab/${action}`) &&
      response.request().method() === "POST"
  );
  await locator.click();
  const response = await pending;
  const payload = await response.json();
  assert.equal(response.status(), 200, payload.error || `Action ${action} failed`);
  assert.equal(payload.ok, true);
  return payload;
}
async function section(label) {
  await admin
    .getByRole("navigation", { name: "Administration sections" })
    .getByRole("button", { name: label, exact: true })
    .click();
  await admin.getByRole("region", { name: label, exact: true }).waitFor();
}
async function login(page, account) {
  await page.goto(`${base}/learning-lab/login`, { waitUntil: "networkidle", timeout: 120000 });
  await page.getByLabel("Email", { exact: true }).fill(account.email);
  await page.getByLabel("Password", { exact: true }).fill(account.password);
  async function attempt() {
    const response = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/learning-lab/auth/sign-in/email") &&
        response.request().method() === "POST"
    );
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    return response;
  }
  let response = await attempt();
  if (response.status() === 429) {
    console.log("Local sign-in throttle active; waiting for its minute window.");
    await new Promise((resolve) => setTimeout(resolve, 61000));
    response = await attempt();
  }
  assert.equal(response.status(), 200, "Synthetic UI sign-in failed; no credentials printed.");
  await page.waitForURL(/\/learning-lab\/(admin|learner)$/, { timeout: 60000 });
}
async function assertWidth(page, width) {
  await page.setViewportSize({ width, height: 900 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  assert.equal(overflow, 0, `Overflow at ${width}px`);
  return { width, overflow };
}
try {
  const noScriptContext = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(`${base}/learning-lab/login`);
  assert.equal(await noScriptPage.locator("form").getAttribute("method"), "post");
  assert.equal(await noScriptPage.locator("form button").isDisabled(), true);
  await noScriptContext.close();
  report.learner.preHydrationPasswordGuard = true;
  await login(admin, access.admin);
  assert.match(admin.url(), /\/admin$/);
  await admin.getByRole("navigation", { name: "Administration sections" }).waitFor();
  for (const label of [
    "Overview",
    "Enquiries",
    "Accounts",
    "Cohorts",
    "Enrolments",
    "Reviews",
    "Content",
    "Certificates",
  ]) {
    await section(label);
    await admin.getByRole("region", { name: label, exact: true }).locator("h2").first().waitFor();
    const widths = [await assertWidth(admin, 1280), await assertWidth(admin, 375)];
    await admin.screenshot({
      path: `${output}/admin-${label.toLowerCase()}-mobile.png`,
      fullPage: true,
    });
    report.adminSections.push({ label, widths });
  }
  await admin.setViewportSize({ width: 1280, height: 900 });
  await section("Accounts");
  await admin.getByLabel("Learner name", { exact: true }).fill(name);
  await admin.getByLabel("Learner email", { exact: true }).fill(email);
  await admin.getByLabel("Temporary password (at least 12 characters)").fill(temporary);
  await admin.getByLabel("Synthetic demo account; exclude from real outcomes.").check();
  await admin.getByLabel(/I have confirmed the recipient/).check();
  await postByButton(
    admin,
    admin.getByRole("button", { name: "Create learner account" }),
    "admin/user"
  );
  await section("Cohorts");
  await admin.getByLabel("Programme", { exact: true }).selectOption("ai-for-managers");
  await admin.getByLabel("Internal cohort title").fill(cohortTitle);
  await admin.getByLabel("Cohort status").selectOption("active");
  await admin.getByLabel("Synthetic demo cohort; keep separate from real participants.").check();
  await postByButton(admin, admin.getByRole("button", { name: "Create cohort" }), "admin/cohort");
  await section("Enrolments");
  await admin
    .getByLabel("Provisioned learner")
    .selectOption({ label: `${name} · ${email} · demo` });
  await admin.getByLabel("Programme", { exact: true }).selectOption("ai-for-managers");
  await admin
    .getByLabel("Matching cohort (optional)")
    .selectOption({ label: `${cohortTitle} · active` });
  await postByButton(
    admin,
    admin.getByRole("button", { name: "Assign programme", exact: true }),
    "admin/enrolment"
  );

  await login(learner, { email, password: temporary });
  await learner.getByRole("heading", { name: "Replace your temporary password" }).waitFor();
  await learner.getByLabel("Current temporary password").fill(temporary);
  await learner.getByLabel("New password", { exact: true }).fill(password);
  await learner.getByLabel("Confirm new password").fill(password);
  await postByButton(
    learner,
    learner.getByRole("button", { name: "Change password", exact: true }),
    "change-password"
  );
  await learner
    .getByRole("heading", { name: "Assigned lessons and exercises" })
    .waitFor({ timeout: 60000 });
  report.learner.passwordChange = true;
  const lessonSection = learner
    .getByRole("heading", { name: "Assigned lessons and exercises" })
    .locator("..");
  for (let index = 0; index < 6; index++) {
    const lesson = lessonSection.locator("details").nth(index);
    await lesson.locator("summary").click();
    await postByButton(
      learner,
      lesson.getByLabel("I have completed this lesson exercise."),
      "progress"
    );
  }
  const text =
    "Synthetic capstone for UI verification. This is not real learner work. The task is a draft-only workflow using de-identified messages and an approved policy, with human approval and net-time measurement. Risks and stopping conditions must be documented. The evidence here is explicitly synthetic.";
  await learner.getByLabel("Or import a UTF-8 .txt file (up to 20 KB)").setInputFiles({
    name: "synthetic-capstone.txt",
    mimeType: "text/plain",
    buffer: Buffer.from(text, "utf8"),
  });
  assert.equal(
    await learner.getByLabel("Your capstone text (100–20,000 characters)").inputValue(),
    text
  );
  await postByButton(
    learner,
    learner.getByRole("button", { name: "Submit capstone", exact: true }),
    "submissions"
  );
  report.learner.textImportAndSubmission = true;

  await section("Enrolments");
  const enrolmentCard = admin.locator("article").filter({
    has: admin.getByRole("heading", { name: `${name} · AI for Managers`, exact: true }),
  });
  await enrolmentCard.getByLabel("Attendance percentage (0–100)").fill("85");
  await postByButton(
    admin,
    enrolmentCard.getByRole("button", { name: "Save verified attendance" }),
    "admin/attendance"
  );
  await section("Reviews");
  const review = admin.locator("article").filter({
    has: admin.getByRole("heading", { name: `${name} · AI for Managers`, exact: true }),
  });
  await review.waitFor();
  const scoreFields = review.locator("input[type=number]");
  assert.equal(await scoreFields.count(), 5);
  for (let index = 0; index < 5; index++) await scoreFields.nth(index).fill("3");
  await review
    .getByLabel("Feedback (20–5,000 characters)")
    .fill(
      "Synthetic UI assessment: the submission addresses the defined workflow, but the evaluation should include difficult policy exceptions and actual reviewer time. This is test feedback only."
    );
  await review.getByLabel(/I approve this original capstone/).check();
  const reviewed = await postByButton(
    admin,
    review.getByRole("button", { name: "Save instructor review" }),
    "admin/review"
  );
  assert.equal(reviewed.score, 75);
  await section("Certificates");
  await admin
    .getByLabel("Learner programme record")
    .selectOption({ label: `${name} · ai-for-managers · demo` });
  const issued = await postByButton(
    admin,
    admin.getByRole("button", { name: "Check eligibility and issue certificate" }),
    "admin/certificate"
  );
  const token = issued.verificationId;
  assert.equal(typeof token, "string");
  await learner.reload({ waitUntil: "domcontentloaded" });
  await learner.getByText("Score: 75/100", { exact: false }).waitFor();
  await learner.getByLabel(/I choose to show my name on the public verification page/).check();
  await postByButton(
    learner,
    learner.getByRole("button", { name: "Save certificate privacy preference" }),
    "certificate-privacy"
  );
  report.learner.instructorFeedbackAndCertificate = true;
  report.learner.progress = "6/6";
  report.learner.widths = [await assertWidth(learner, 1280), await assertWidth(learner, 375)];
  await learner.screenshot({ path: `${output}/learner-mobile.png`, fullPage: true });
  await learner.setViewportSize({ width: 1280, height: 900 });
  await learner.screenshot({ path: `${output}/learner-desktop.png`, fullPage: true });

  const publicPage = await (
    await browser.newContext({ viewport: { width: 375, height: 900 } })
  ).newPage();
  await publicPage.goto(`${base}/learning-lab/verify/${token}`, { waitUntil: "domcontentloaded" });
  const visible = await publicPage.locator("body").innerText();
  assert.match(visible, /verification record is valid/);
  assert.match(visible, /Synthetic demonstration record/i);
  assert(visible.includes(name));
  assert(!visible.includes(email));
  assert(!visible.includes("Synthetic capstone for UI verification"));
  await assertWidth(publicPage, 375);
  await publicPage.screenshot({ path: `${output}/verification-mobile.png`, fullPage: true });
  report.verification = { minimalPublicFields: true, nameOptIn: true, demoLabel: true };
  const certificateCard = admin.locator("article").filter({
    has: admin.getByRole("heading", { name: `${name} · ai-for-managers`, exact: true }),
  });
  await postByButton(
    admin,
    certificateCard.getByRole("button", { name: "Revoke this certificate" }),
    "admin/revoke"
  );
  await publicPage.reload({ waitUntil: "domcontentloaded" });
  assert.match(await publicPage.locator("body").innerText(), /certificate has been revoked/);
  report.verification.revocationReflectsImmediately = true;
  assert.deepEqual(report.errors, []);
  report.status = "PASS";
  await writeFile(
    ".data/learning-lab-ui-test-access.json",
    JSON.stringify({ baseURL: base, email, password }, null, 2)
  );
  await writeFile(
    "artifacts/learning-lab/workspace-ui-results.json",
    JSON.stringify(report, null, 2)
  );
  console.log(JSON.stringify(report, null, 2));
} catch (error) {
  report.status = "FAIL";
  report.failure = error.message;
  throw error;
} finally {
  await writeFile(
    "artifacts/learning-lab/workspace-ui-results.json",
    JSON.stringify(report, null, 2)
  );
  await browser.close();
}
