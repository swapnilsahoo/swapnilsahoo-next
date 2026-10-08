import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { freeCourses } from "../src/features/learning-lab/free-courses.ts";

// Run: node --import tsx scripts/test-learning-lab-free-courses.mjs
// Local practice only: safe to point LAB_TEST_BASE_URL at the live site.
// Every HTTP write request is blocked; no enquiries, accounts or payments are created.
const base = (process.env.LAB_TEST_BASE_URL || "http://localhost:3112").replace(/\/$/, "");
const profile = (process.env.LAB_BROWSER_PROFILE || "local-preview").replace(/[^\w-]/g, "-");
const artifacts = "artifacts/learning-lab";
const screenshots = `${artifacts}/screenshots`;
await mkdir(screenshots, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
const blockedWrites = [];
page.on("pageerror", (error) => errors.push(error.message));
await context.route("**/*", (route) => {
  const request = route.request();
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
    blockedWrites.push({ method: request.method(), url: request.url() });
    return route.abort("blockedbyclient");
  }
  return route.continue();
});
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const report = {
  status: "RUNNING",
  base,
  profile,
  runAt: new Date().toISOString(),
  routes: [],
  library: {},
  courses: [],
  errors,
  blockedWrites,
};
const libraryRoute = "/learning-lab/free-courses";
const routes = [libraryRoute, ...freeCourses.map((course) => `${libraryRoute}/${course.slug}`)];
const visit = (route) =>
  page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 120000 });
async function cardCount(expected) {
  await page.waitForFunction(
    (count) => document.querySelectorAll(".lab-course-card").length === count,
    expected
  );
}

try {
  assert(freeCourses.length === 6, "Expected six original free courses");
  for (const route of routes) {
    const widths = [];
    for (const width of [320, 360, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await visit(route);
      assert(response?.status() === 200, `${route} ${width}: HTTP ${response?.status()}`);
      await page.locator(".lab h1").waitFor();
      const structure = await page.evaluate(() => {
        const ids = [...document.querySelectorAll("[id]")].map((element) => element.id);
        return {
          duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
          mains: document.querySelectorAll("main").length,
          h1s: document.querySelectorAll("main h1").length,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
          overflow:
            Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) -
            window.innerWidth,
        };
      });
      assert(
        structure.mains === 1 && structure.h1s === 1,
        `${route} ${width}: invalid main/headings`
      );
      assert(
        !structure.duplicateIds.length,
        `${route} ${width}: duplicate IDs ${structure.duplicateIds}`
      );
      assert(
        structure.canonical?.endsWith(route),
        `${route}: incorrect canonical ${structure.canonical}`
      );
      assert(structure.overflow <= 1, `${route} ${width}: overflow ${structure.overflow}`);
      widths.push({ width, status: response.status(), ...structure });
    }
    report.routes.push({ route, widths });
  }
  console.log("PASS seven free-learning routes at 320/360/768/1440px");

  await visit(libraryRoute);
  await cardCount(6);
  const filters = page.getByRole("group", { name: "Filter courses by topic" });
  for (const topic of ["Applied AI", "Strategy", "Entrepreneurship"]) {
    const button = filters.getByRole("button", { name: topic, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await cardCount(2);
    assert(
      (await button.getAttribute("aria-pressed")) === "true",
      `${topic}: active filter missing`
    );
    const displayed = await page.locator(".lab-course-meta").allTextContents();
    assert(
      displayed.every((text) => text.includes(topic)),
      `${topic}: unrelated course displayed`
    );
  }
  await filters.getByRole("button", { name: "All topics", exact: true }).click();
  await cardCount(6);
  const search = page.getByRole("searchbox", { name: "Find a skill", exact: true });
  await search.fill(freeCourses[0].title);
  await cardCount(1);
  assert(
    (await page.locator(".lab-course-card h3").innerText()) === freeCourses[0].title,
    "Search returned the wrong course"
  );
  await search.fill("zz-no-such-skill-2918");
  await cardCount(0);
  await page.getByRole("heading", { name: "No courses match yet.", exact: true }).waitFor();
  await page.getByRole("button", { name: "Show all courses", exact: true }).focus();
  await page.keyboard.press("Enter");
  await cardCount(6);
  assert((await search.inputValue()) === "", "Reset did not clear search");
  assert(
    (await filters
      .getByRole("button", { name: "All topics", exact: true })
      .getAttribute("aria-pressed")) === "true",
    "Reset did not restore all topics"
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `${screenshots}/free-courses-${profile}-desktop.png`,
    fullPage: true,
  });
  await page.setViewportSize({ width: 360, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `${screenshots}/free-courses-${profile}-mobile.png`,
    fullPage: true,
  });
  await page.screenshot({
    path: `${screenshots}/free-courses-${profile}-mobile-viewport.png`,
    fullPage: false,
  });
  await page.getByRole("button", { name: "Switch to dark theme", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("button", { name: "Switch to light theme", exact: true }).waitFor();
  await page.reload({ waitUntil: "networkidle" });
  assert(
    (await page.locator("html").getAttribute("class"))?.includes("dark"),
    "Dark theme did not persist"
  );
  await page.screenshot({
    path: `${screenshots}/free-courses-${profile}-dark.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme", exact: true }).click();
  await page.getByRole("button", { name: "Switch to dark theme", exact: true }).waitFor();
  report.library = {
    categoryFilters: 3,
    search: true,
    noResults: true,
    reset: true,
    keyboard: true,
    persistedTheme: true,
  };
  console.log(
    "PASS category filters, search, empty state, keyboard reset and persisted dark theme"
  );

  for (const course of freeCourses) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await visit(`${libraryRoute}/${course.slug}`);
    const demo = page.locator(".lab-demo");
    const decisions = course.demo.decisions;
    assert(decisions?.length === 2, `${course.slug}: expected two decision groups`);
    const groups = demo.locator("fieldset");
    assert(
      (await groups.count()) === 3,
      `${course.slug}: expected two branches and one checkpoint`
    );
    for (let index = 0; index < decisions.length; index++) {
      const group = groups.nth(index);
      await group.getByRole("radio").nth(0).check();
      const firstFeedback = await group.locator(".lab-feedback").innerText();
      assert(
        firstFeedback.includes(decisions[index].choices[0].feedback),
        `${course.slug}: first branch guidance missing`
      );
      await group.getByRole("radio").nth(1).check();
      const secondFeedback = await group.locator(".lab-feedback").innerText();
      assert(
        secondFeedback.includes(decisions[index].choices[1].feedback) &&
          firstFeedback !== secondFeedback,
        `${course.slug}: alternate branch guidance missing`
      );
    }
    const checkpoint = groups.nth(2);
    const wrong = (course.demo.checkpoint.answer + 1) % course.demo.checkpoint.options.length;
    await checkpoint.getByRole("radio").nth(wrong).check();
    await demo.getByRole("button", { name: "Check my reasoning", exact: true }).click();
    await demo
      .getByText("Revisit the decision criteria and try again.", { exact: false })
      .waitFor();
    await checkpoint.getByRole("radio").nth(course.demo.checkpoint.answer).focus();
    await page.keyboard.press("Space");
    await demo.getByRole("button", { name: "Check my reasoning", exact: true }).focus();
    await page.keyboard.press("Enter");
    await demo.getByText("This is the strongest choice.", { exact: false }).waitFor();
    const notes = demo.getByRole("textbox");
    const reflections = course.demo.prompts.map(
      (_, index) =>
        `Synthetic free-course check: ${course.slug}; reflection ${index + 1}; evidence and a stopping rule.`
    );
    for (let index = 0; index < reflections.length; index++)
      await notes.nth(index).fill(reflections[index]);
    await demo.getByRole("button", { name: "Save in this browser", exact: true }).click();
    await demo
      .getByText("Notes saved in this browser. They have not been sent to the Lab.", {
        exact: true,
      })
      .waitFor();
    await notes.nth(0).fill("Unsaved edit");
    await demo.getByRole("button", { name: "Restore saved notes", exact: true }).click();
    for (let index = 0; index < reflections.length; index++)
      assert(
        (await notes.nth(index).inputValue()) === reflections[index],
        `${course.slug}: note restoration failed`
      );
    await page.reload({ waitUntil: "networkidle" });
    assert(
      (await notes.nth(0).inputValue()) === "",
      `${course.slug}: notes restored without choosing Restore`
    );
    await demo.getByRole("button", { name: "Restore saved notes", exact: true }).click();
    for (let index = 0; index < reflections.length; index++)
      assert(
        (await notes.nth(index).inputValue()) === reflections[index],
        `${course.slug}: saved notes lost after navigation`
      );
    for (let index = 0; index < decisions.length; index++)
      await groups.nth(index).getByRole("radio").nth(1).check();
    await checkpoint.getByRole("radio").nth(course.demo.checkpoint.answer).check();
    await demo.getByRole("button", { name: "Check my reasoning", exact: true }).click();
    const downloadEvent = page.waitForEvent("download");
    await demo.getByRole("button", { name: "Download worksheet", exact: true }).click();
    const download = await downloadEvent;
    const expectedFilename = `${course.slug}-course-worksheet.txt`;
    assert(
      download.suggestedFilename() === expectedFilename,
      `${course.slug}: worksheet filename mismatch`
    );
    const downloadPath = await download.path();
    assert(downloadPath, `${course.slug}: worksheet download incomplete`);
    const worksheet = await readFile(downloadPath, "utf8");
    for (const text of [
      course.title,
      course.demo.title,
      course.demo.scenario,
      ...reflections,
      ...decisions.map((decision) => decision.choices[1].title),
      course.demo.checkpoint.options[course.demo.checkpoint.answer],
    ]) {
      assert(
        worksheet.includes(text),
        `${course.slug}: worksheet lost expected content: ${text.slice(0, 80)}`
      );
    }
    assert(
      worksheet.includes("Self-practice only; not an assessed submission or certificate record."),
      `${course.slug}: worksheet self-practice boundary missing`
    );
    await demo.getByRole("button", { name: "Reset checkpoint", exact: true }).click();
    assert(
      (await checkpoint.locator("input:checked").count()) === 0,
      `${course.slug}: checkpoint reset failed`
    );
    assert(
      await demo.getByRole("button", { name: "Check my reasoning", exact: true }).isDisabled(),
      `${course.slug}: empty checkpoint still checkable`
    );
    await demo.getByRole("button", { name: "Clear notes", exact: true }).click();
    for (let index = 0; index < reflections.length; index++)
      assert(
        (await notes.nth(index).inputValue()) === "",
        `${course.slug}: page notes not cleared`
      );
    await page.reload({ waitUntil: "networkidle" });
    await demo.getByRole("button", { name: "Restore saved notes", exact: true }).click();
    await demo
      .getByText("There are no saved notes for this lesson in this browser.", { exact: true })
      .waitFor();
    await demo.locator("summary").focus();
    await page.keyboard.press("Enter");
    assert(
      (await demo.locator("details").getAttribute("open")) !== null,
      `${course.slug}: worked response inaccessible by keyboard`
    );
    if (course.slug === freeCourses[0].slug) {
      await demo.screenshot({ path: `${screenshots}/free-course-practice-${profile}-desktop.png` });
      await page.setViewportSize({ width: 360, height: 1000 });
      await demo.screenshot({ path: `${screenshots}/free-course-practice-${profile}-mobile.png` });
    }
    report.courses.push({
      slug: course.slug,
      branchFeedback: 4,
      wrongCorrectReset: true,
      keyboardCheckpoint: true,
      savedNotesPersisted: true,
      clearedNotesRemoved: true,
      worksheet: {
        filename: expectedFilename,
        bytes: Buffer.byteLength(worksheet),
        contentsVerified: true,
      },
      workedResponseKeyboard: true,
    });
    console.log(`PASS ${course.slug}: branches, checkpoint, notes and actual worksheet contents`);
  }
  const unknownResponse = await visit(`${libraryRoute}/unknown-free-course`);
  assert(unknownResponse?.status() === 404, "Unknown free course did not return 404");
  const sitemap = await context.request.get(`${base}/sitemap.xml`);
  assert(sitemap.status() === 200, "Sitemap unavailable");
  const sitemapText = await sitemap.text();
  for (const route of routes)
    assert(sitemapText.includes(`${route}</loc>`), `Sitemap missing ${route}`);
  assert(
    !blockedWrites.some((request) => request.url.includes("/api/learning-lab/")),
    "Practice attempted to write to the Lab API"
  );
  assert(!errors.length, `Browser errors: ${errors.join(" | ")}`);
  report.status = "PASS";
  report.unknownCourse404 = true;
  report.sitemap = true;
  console.log(
    JSON.stringify({
      status: report.status,
      routes: report.routes.length,
      viewports: 28,
      courses: report.courses.length,
      blockedWrites: blockedWrites.length,
      errors,
    })
  );
} catch (error) {
  report.status = "FAIL";
  report.failure = error instanceof Error ? error.message : String(error);
  throw error;
} finally {
  await writeFile(
    `${artifacts}/free-courses-results-${profile}.json`,
    JSON.stringify(report, null, 2)
  );
  await browser.close();
}
