import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
// Read-only public teaching workflow: device audio is mocked and HTTP writes
// are blocked. No real microphone, avatar session, enquiry or payment is used.
const profile = (process.env.GUIDE_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const directory = "artifacts/learning-lab/digital-guide";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 390, height: 900 } });
const errors = [],
  writes = [],
  checks = [];
await context.addInitScript(() => {
  window.mentorAudioCheck = { spoken: [], cancelled: 0, micCalls: 0 };
  Object.defineProperty(window, "SpeechRecognition", { configurable: true, value: undefined });
  Object.defineProperty(window, "webkitSpeechRecognition", {
    configurable: true,
    value: undefined,
  });
  Object.defineProperty(window, "SpeechSynthesisUtterance", {
    configurable: true,
    value: class {
      constructor(text) {
        this.text = text;
      }
    },
  });
  Object.defineProperty(window, "speechSynthesis", {
    configurable: true,
    value: {
      speak(utterance) {
        window.mentorAudioCheck.spoken.push(utterance.text);
        window.mentorAudioCheck.utterance = utterance;
        queueMicrotask(() => utterance.onstart?.());
      },
      cancel() {
        window.mentorAudioCheck.cancelled++;
      },
    },
  });
});
await context.route("**/*", (route) => {
  if (!["GET", "HEAD"].includes(route.request().method())) {
    writes.push(route.request().url());
    return route.abort();
  }
  return route.continue();
});
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
const base = (process.env.GUIDE_TEST_BASE_URL || "http://localhost:3112").replace(/\/$/, "");
const guide = page.getByTestId("digital-guide-dialog");
const panel = page.getByTestId("mentor-panel");
const button = (name) => guide.getByRole("button", { name, exact: true });
async function arithmetic(value) {
  await panel.getByTestId("mentor-number").fill(String(value));
  await panel.getByRole("button", { name: "Check calculation", exact: true }).click();
}
async function next() {
  await panel.getByRole("button", { name: "Next question", exact: true }).click();
}
try {
  await page.goto(`${base}/learning-lab/free-courses/read-your-unit-economics`, {
    waitUntil: "networkidle",
  });
  await page.getByTestId("digital-guide-launcher").click();
  await guide.getByRole("heading", { name: "Dr. Swapnil Sahoo AI Mentor", exact: true }).waitFor();
  for (const action of [
    "Find my path",
    "Explain this lesson",
    "Practise a case",
    "Review my reasoning",
  ])
    assert.ok(await button(action).isVisible());
  assert.ok((await guide.innerText()).includes("published teaching materials"));
  await button("Explain this lesson").click();
  assert.ok((await panel.innerText()).includes("Current lesson:"));
  assert.equal(
    await panel.getByRole("link", { name: "Open the original lesson ↗" }).getAttribute("href"),
    "/learning-lab/free-courses/read-your-unit-economics"
  );
  await panel.getByRole("button", { name: "Read this explanation", exact: true }).click();
  await page.waitForFunction(() => window.mentorAudioCheck.spoken.length === 1);
  await page.waitForFunction(
    () =>
      document.querySelector('[data-testid="digital-guide-animated-avatar"]').dataset.speaking ===
      "true"
  );
  await button("Practise a case").click();
  assert.equal(
    await guide.getByTestId("digital-guide-animated-avatar").getAttribute("data-speaking"),
    "false"
  );
  checks.push(
    "Four actions, validated current-lesson source, explicit stock read-aloud and action cleanup"
  );
  assert.ok(!(await panel.innerText()).includes("400 whole units"));
  await arithmetic(90);
  assert.ok((await panel.innerText()).includes("Try again"));
  await panel.getByRole("button", { name: "Give me a hint", exact: true }).click();
  assert.ok((await panel.innerText()).includes("not profit"));
  await panel.getByRole("button", { name: "Give me a hint (1/2)", exact: true }).click();
  assert.ok((await panel.innerText()).includes("₹150 − ₹90"));
  await arithmetic(60);
  await next();
  await arithmetic(200);
  await next();
  await arithmetic(30);
  await next();
  await arithmetic(400);
  await next();
  await panel.getByTestId("mentor-decision").selectOption("demand");
  await panel.getByRole("button", { name: "Check decision", exact: true }).click();
  assert.ok((await panel.innerText()).includes("Capacity does not guarantee demand"));
  await panel.getByTestId("mentor-decision").selectOption("not-feasible");
  await panel.getByRole("button", { name: "Check decision", exact: true }).click();
  assert.ok((await panel.innerText()).includes("400 whole units exceed capacity 300"));
  await panel.getByRole("button", { name: "Explain and revise my reasoning", exact: true }).click();
  checks.push(
    "Original-case arithmetic, progressive hints, revenue/profit and capacity/demand misconceptions"
  );
  const first =
    "The blanket discount needs 400 lunches but capacity is 300. I need evidence of customer value.";
  await panel.getByTestId("mentor-reasoning").fill(first);
  await panel.getByRole("checkbox").nth(0).check();
  await panel.getByRole("button", { name: "Review my checklist", exact: true }).click();
  assert.ok((await panel.innerText()).includes("2 prompts open"));
  assert.ok((await panel.innerText()).includes("What remains at 250 lunches"));
  await panel
    .getByTestId("mentor-reasoning")
    .fill(first + " At 250 lunches, discount leaves -4500; I would test a bounded offer instead.");
  await panel.getByRole("checkbox").nth(1).check();
  await panel.getByRole("checkbox").nth(2).check();
  await panel.getByRole("button", { name: "Review my revision", exact: true }).click();
  assert.ok((await panel.innerText()).includes("You changed your attempt"));
  await panel.getByText("My first submitted version", { exact: true }).click();
  assert.equal(await panel.locator("details p").innerText(), first);
  checks.push(
    "Voluntary reasoning self-check, specific rubric gap, revision opportunity and retained first attempt"
  );
  await panel
    .getByRole("button", { name: "Try a fresh case with new figures", exact: true })
    .click();
  assert.ok((await panel.innerText()).includes("₹16,000"));
  assert.ok(!(await panel.innerText()).includes("267"));
  await arithmetic(80);
  await next();
  await arithmetic(200);
  await next();
  await arithmetic(60);
  await next();
  await arithmetic(266);
  assert.ok((await panel.innerText()).includes("Try again"));
  await panel.getByRole("button", { name: "Give me a hint", exact: true }).click();
  await panel.getByRole("button", { name: "Give me a hint (1/2)", exact: true }).click();
  assert.ok((await panel.innerText()).includes("round up"));
  await arithmetic(267);
  await next();
  await panel.getByTestId("mentor-decision").selectOption("not-feasible");
  await panel.getByRole("button", { name: "Check decision", exact: true }).click();
  assert.ok((await panel.innerText()).includes("267 whole units exceed capacity 250"));
  checks.push(
    "Fresh transfer with changed figures, answers initially withheld, ceil267 and capacity250 decision"
  );
  await page.getByTestId("digital-guide-close").click();
  await page.getByTestId("digital-guide-launcher").click();
  await button("Practise a case").click();
  assert.ok((await panel.innerText()).includes("TiffinTrail"));
  assert.equal(await panel.getByTestId("mentor-number").inputValue(), "");
  await page.getByTestId("digital-guide-reset").click();
  assert.equal(await panel.count(), 0);
  await button("Review my reasoning").click();
  assert.equal(await panel.getByTestId("mentor-reasoning").inputValue(), "");
  checks.push("Closing and Reset clear transient practice and reasoning state");
  await page.getByTestId("digital-guide-close").click();
  await page.goto(`${base}/learning-lab`, { waitUntil: "networkidle" });
  await page.getByTestId("digital-guide-launcher").click();
  await button("Find my path").click();
  await panel.getByRole("combobox").nth(0).selectOption("applied-ai-for-managers");
  await panel.getByRole("combobox").nth(1).selectOption("practised");
  assert.equal(
    await panel.getByRole("link", { name: "Follow this learning path ↗" }).getAttribute("href"),
    "/learning-lab/paths/applied-ai-for-managers"
  );
  assert.ok((await panel.innerText()).includes("not an assessment"));
  checks.push(
    "Goal and self-selected starting-point recommendation links to verified learning path"
  );
  await page.setViewportSize({ width: 320, height: 600 });
  await button("Practise a case").click();
  await panel.getByTestId("mentor-number").fill("60");
  await panel.getByRole("button", { name: "Check calculation", exact: true }).click();
  await page.screenshot({ path: `${directory}/${profile}-mentor-mobile.png` });
  const dimensions = await guide.evaluate((element) => ({
    rect: element.getBoundingClientRect().toJSON(),
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
  }));
  assert.ok(dimensions.rect.x >= 0 && dimensions.rect.right <= 320.5);
  assert.equal(dimensions.scrollWidth, dimensions.clientWidth);
  assert.ok(!((await page.locator("html").getAttribute("class")) || "").includes("dark"));
  await page.getByTestId("digital-guide-close").click();
  checks.push(
    "320x600 light layout keeps learning controls and pointer-close operable with no horizontal overflow"
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(writes, []);
  console.log(JSON.stringify({ checks, errors, writes }, null, 2));
  await writeFile(
    `${directory}/${profile}-mentor-browser-report.json`,
    JSON.stringify({ base, profile, checks, errors, writes }, null, 2)
  );
} finally {
  await browser.close();
}
