import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { programmes } from "../src/features/learning-lab/programmes.ts";
import { labPolicies } from "../src/features/learning-lab/policies.ts";

// Run: node --import tsx scripts/test-learning-lab-browser.mjs
// LAB_TEST_BASE_URL selects an explicitly local development/production preview.
// This suite intercepts the enquiry failure request: no enquiries are persisted.
const base = process.env.LAB_TEST_BASE_URL || process.env.LAB_BASE_URL || "http://localhost:3110";
if (!["localhost", "127.0.0.1"].includes(new URL(base).hostname)) {
  throw new Error(
    "Run this browser suite against an explicitly local preview, not a public domain."
  );
}
const artifacts = "artifacts/learning-lab";
const output = `${artifacts}/screenshots`;
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const report = {
  status: "RUNNING",
  base,
  profile: process.env.LAB_BROWSER_PROFILE || "local-preview",
  runAt: new Date().toISOString(),
  routes: [],
  demonstrations: [],
  enquiry: {},
  academicRegression: [],
  performance: [],
  performanceMethod:
    "One warm reload per page and viewport in local Chromium, with no CPU or network throttling. Encoded-body bytes are the browser's compressed-body accounting; transfer bytes include headers and are zero for cached resources. These local measurements do not represent field performance or Lighthouse scores.",
  errors,
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const routes = [
  "/learning-lab",
  "/learning-lab/programmes",
  ...programmes.map((p) => `/learning-lab/programmes/${p.slug}`),
  ...[
    "for-colleges",
    "for-professionals",
    "founder",
    "resources",
    "faq",
    "contact",
    "policies",
  ].map((s) => `/learning-lab/${s}`),
  ...labPolicies.map((p) => `/learning-lab/policies/${p.slug}`),
];

try {
  for (const route of routes) {
    const response = await page.goto(`${base}${route}`, {
      waitUntil: "networkidle",
      timeout: 120000,
    });
    assert(response?.status() === 200, `${route}: HTTP ${response?.status()}`);
    await page.locator(".lab h1").waitFor();
    const structure = await page.evaluate(() => {
      const ids = Array.from(document.querySelectorAll("[id]"), (e) => e.id);
      return {
        duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
        mains: document.querySelectorAll("main").length,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
        h1: document.querySelector(".lab h1")?.textContent,
      };
    });
    assert(
      structure.duplicateIds.length === 0,
      `${route}: duplicate IDs ${structure.duplicateIds}`
    );
    assert(structure.mains === 1, `${route}: ${structure.mains} mains`);
    assert(structure.canonical?.endsWith(route), `${route}: canonical ${structure.canonical}`);
    const widths = [];
    for (const width of [320, 360, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const overflow = await page.evaluate(
        () =>
          Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) -
          window.innerWidth
      );
      assert(overflow <= 1, `${route} ${width}: overflow ${overflow}`);
      const clipped = await page
        .locator(".lab-masthead")
        .evaluate((e) =>
          Array.from(e.children).some((c) => c.getBoundingClientRect().right > window.innerWidth)
        );
      assert(!clipped, `${route} ${width}: masthead clipping`);
      widths.push({ width, overflow });
    }
    report.routes.push({ route, status: response.status(), ...structure, widths });
  }
  console.log(`PASS ${report.routes.length} public routes at 320/360/768/1440px`);
  await page.goto(`${base}/learning-lab`, { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: `${output}/home-desktop.png`, fullPage: true });
  await page.getByRole("button", { name: "Switch to dark theme" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Switch to light theme" }).waitFor();
  await page.screenshot({
    path: `${output}/home-dark.png`,
    fullPage: true,
    animations: "disabled",
  });
  assert(
    await page
      .locator("html")
      .getAttribute("class")
      .then((c) => c.includes("dark")),
    "theme did not switch"
  );
  await page.reload({ waitUntil: "networkidle" });
  assert(
    await page
      .locator("html")
      .getAttribute("class")
      .then((c) => c.includes("dark")),
    "theme did not persist"
  );
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.getByRole("button", { name: "Switch to dark theme" }).waitFor();
  await page.setViewportSize({ width: 360, height: 1000 });
  await page.screenshot({ path: `${output}/home-mobile.png`, fullPage: true });

  for (const programme of programmes) {
    await page.goto(`${base}/learning-lab/programmes/${programme.slug}`, {
      waitUntil: "networkidle",
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    const demo = page.locator(".lab-demo");
    const groups = demo.locator("fieldset");
    for (let i = 0; i < 2; i++) {
      await groups.nth(i).getByRole("radio").nth(0).check();
      const before = await groups.nth(i).locator(".lab-feedback").innerText();
      await groups.nth(i).getByRole("radio").nth(1).check();
      const after = await groups.nth(i).locator(".lab-feedback").innerText();
      assert(before !== after, `${programme.slug}: feedback unchanged`);
    }
    await groups
      .nth(2)
      .getByRole("radio")
      .nth((programme.demo.checkpoint.answer + 1) % programme.demo.checkpoint.options.length)
      .check();
    await demo.getByRole("button", { name: "Check my reasoning" }).click();
    assert(
      (await demo
        .getByText("Revisit the decision criteria and try again.", { exact: false })
        .count()) === 1,
      "wrong answer retry missing"
    );
    await groups.nth(2).getByRole("radio").nth(programme.demo.checkpoint.answer).check();
    await demo.getByRole("button", { name: "Check my reasoning" }).click();
    assert(
      (await demo.getByText("This is the strongest choice.", { exact: false }).count()) === 1,
      "correct answer feedback missing"
    );
    await demo
      .getByRole("textbox")
      .nth(0)
      .fill("Synthetic local UI test: compare evidence and state a stop rule.");
    await demo.getByRole("button", { name: "Save in this browser" }).click();
    await demo.getByRole("textbox").nth(0).fill("Edited note");
    await demo.getByRole("button", { name: "Restore saved notes" }).click();
    assert(
      (await demo.getByRole("textbox").nth(0).inputValue()).startsWith("Synthetic local"),
      "notes restore failed"
    );
    const download = page.waitForEvent("download");
    await demo.getByRole("button", { name: "Download worksheet" }).click();
    assert(
      (await download).suggestedFilename() === `${programme.slug}-demo-worksheet.txt`,
      "download name mismatch"
    );
    await demo.getByRole("button", { name: "Clear notes" }).click();
    assert((await demo.getByRole("textbox").nth(0).inputValue()) === "", "clear notes failed");
    await demo.getByRole("button", { name: "Reset checkpoint" }).click();
    assert((await groups.nth(2).locator("input:checked").count()) === 0, "checkpoint reset failed");
    await demo.scrollIntoViewIfNeeded();
    await demo.screenshot({ path: `${output}/${programme.slug}-demo.png` });
    await page.setViewportSize({ width: 360, height: 1000 });
    await demo.screenshot({ path: `${output}/${programme.slug}-demo-mobile.png` });
    report.demonstrations.push({
      slug: programme.slug,
      choiceFeedback: true,
      retry: true,
      checkpoint: true,
      notes: true,
      download: true,
      reset: true,
    });
  }

  await page.goto(`${base}/learning-lab/contact`, { waitUntil: "networkidle" });
  const form = page.getByRole("form", { name: "Programme interest enquiry" });
  await form.getByRole("button", { name: "Save my enquiry" }).click();
  assert(
    (await page.evaluate(() => document.activeElement?.getAttribute("name"))) === "name",
    "first invalid name not focused"
  );
  assert(
    (await form.locator('[aria-invalid="true"]').count()) === 5,
    "expected five required field errors"
  );
  await form.getByLabel("Your name *", { exact: true }).fill("Synthetic UI Tester");
  await form.getByLabel("Email address *", { exact: true }).fill("ui-tester@example.test");
  await form.getByLabel("Programme of interest *", { exact: true }).selectOption("ai-for-managers");
  await form.locator('input[name="adultConfirmed"]').check();
  await form.locator('input[name="privacyAccepted"]').check();
  await page.route("**/api/learning-lab/enquiries", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        ok: false,
        error: "Synthetic unavailable-storage test: your enquiry was not saved.",
      }),
    })
  );
  await form.getByRole("button", { name: "Save my enquiry" }).click();
  await form.getByRole("alert").waitFor();
  assert(
    (await page.getByText("Enquiry saved", { exact: true }).count()) === 0,
    "failure incorrectly reported saved"
  );
  assert(
    (await form.getByLabel("Your name *", { exact: true }).inputValue()) === "Synthetic UI Tester",
    "failure lost entered values"
  );
  await page.unroute("**/api/learning-lab/enquiries");
  await form.screenshot({ path: `${output}/enquiry-mobile-error.png` });
  report.enquiry = {
    requiredValidation: true,
    firstInvalidFocus: true,
    serverFailureHonest: true,
    entriesPreserved: true,
    marketingDefaultUnchecked:
      (await form.locator('input[name="marketingConsent"]').isChecked()) === false,
  };
  console.log("PASS three demonstration lessons and honest enquiry validation/failure states");

  for (const route of ["/", "/teaching/1-year-mba"]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(`${base}${route}`, {
      waitUntil: "networkidle",
      timeout: 120000,
    });
    assert(response?.status() === 200, `${route}: academic page unavailable`);
    assert(
      (await page.getByRole("navigation", { name: "Primary navigation", exact: true }).count()) ===
        1,
      `${route}: academic primary navigation missing`
    );
    assert(
      (await page.locator(".lab").count()) === 0,
      `${route}: Lab chrome leaked into academic page`
    );
    report.academicRegression.push({
      route,
      status: 200,
      academicNavigation: true,
      labChromeAbsent: true,
    });
  }
  const session = await context.request.get(`${base}/teaching/1-year-mba/session1.html`);
  assert(session.status() === 200, "existing Session 1 HTML is unavailable");
  assert((await session.text()).includes("Session 1"), "Session 1 response content is missing");
  report.academicRegression.push({
    route: "/teaching/1-year-mba/session1.html",
    status: session.status(),
    sessionContent: true,
  });

  const timingContext = await browser.newContext();
  const timingPage = await timingContext.newPage();
  const timingRoutes = [
    "/learning-lab",
    ...programmes.map((p) => `/learning-lab/programmes/${p.slug}`),
  ];
  for (const width of [1440, 360]) {
    await timingPage.setViewportSize({ width, height: 1000 });
    for (const route of timingRoutes) {
      await timingPage.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 120000 });
      const response = await timingPage.reload({ waitUntil: "networkidle", timeout: 120000 });
      assert(response?.status() === 200, `${route}: performance reload unavailable`);
      const measurement = await timingPage.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        if (!navigation) throw new Error("Navigation Timing is not available");
        const round = (value) => Math.round(value * 10) / 10;
        return {
          domContentLoadedMs: round(navigation.domContentLoadedEventEnd),
          loadMs: round(navigation.loadEventEnd),
          responseMs: round(navigation.responseEnd),
          documentEncodedBodyBytes: navigation.encodedBodySize,
          documentDecodedBodyBytes: navigation.decodedBodySize,
          documentTransferredBytes: navigation.transferSize,
          totalEncodedBodyBytes:
            navigation.encodedBodySize +
            resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
          totalTransferredBytes:
            navigation.transferSize +
            resources.reduce((sum, resource) => sum + resource.transferSize, 0),
          resourceCount: resources.length,
        };
      });
      report.performance.push({
        route,
        viewport: width === 1440 ? "desktop" : "mobile",
        width,
        contentEncoding: response.headers()["content-encoding"] || "none",
        ...measurement,
      });
    }
  }
  await timingContext.close();
  console.log("PASS academic regression; collected eight warm navigation measurements");
  assert(errors.length === 0, `browser errors: ${errors.join(" | ")}`);
  report.status = "PASS";
  console.log(
    JSON.stringify({
      status: report.status,
      routes: report.routes.length,
      widths: [320, 360, 768, 1440],
      demonstrations: report.demonstrations.length,
      academicRegression: report.academicRegression.length,
      performanceMeasurements: report.performance.length,
      enquiry: report.enquiry,
      errors,
    })
  );
} catch (error) {
  report.status = "FAIL";
  report.failure = error instanceof Error ? error.message : String(error);
  throw error;
} finally {
  await writeFile(`${artifacts}/browser-results.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
