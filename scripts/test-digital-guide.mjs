import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

// Read-only public UI checks. Guided questions run locally in the browser;
// block all HTTP writes so this cannot create accounts, video sessions or charges.
const base = (process.env.GUIDE_TEST_BASE_URL || "http://localhost:3112").replace(/\/$/, "");
const profile = (process.env.GUIDE_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const dir = "artifacts/learning-lab/digital-guide";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: "dark" });
await context.addInitScript(() => {
  // Older saved preferences and a dark OS must not change the new light default.
  try {
    localStorage.setItem("theme", "dark");
    localStorage.setItem("pgpm-course-theme", "dark");
    for (let i = 1; i <= 13; i++) localStorage.setItem(`s${i}-theme`, "dark");
  } catch { /* Browser storage may be unavailable. */ }
});
const page = await context.newPage();
const errors = [], blockedWrites = [], isolatedEmbeds = [], checks = [];
page.on("pageerror", (error) => errors.push(error.message));
await context.route("**/*", (route) => {
  const request = route.request();
  const resource = new URL(request.url());
  const address = `${resource.origin}${resource.pathname}`;
  // Teaching decks contain existing YouTube embeds. They are outside this
  // guide check; isolate them so their telemetry cannot obscure guide writes.
  if (request.resourceType() === "document" && request.frame().parentFrame() && resource.origin !== new URL(base).origin) {
    isolatedEmbeds.push(address);
    return route.abort("blockedbyclient");
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
    blockedWrites.push(address);
    return route.abort("blockedbyclient");
  }
  return route.continue();
});
const assert = (value, message) => { if (!value) throw new Error(message); };
const testId = (name) => page.getByTestId(`digital-guide-${name}`);
const chooseText = async () => {
  const button = page.getByRole("button", { name: "Use text instead", exact: true });
  if (await button.isVisible()) await button.click();
  await testId("input").waitFor({ state: "visible" });
};
const visit = async (path) => {
  const response = await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 90000 });
  // CDN-backed static decks can still be parsing when there are no network
  // requests. Their deferred shared navigation requires a completed document.
  await page.waitForLoadState("load", { timeout: 90000 });
  return response;
};
const report = { base, profile, runAt: new Date().toISOString(), checks, errors, blockedWrites, isolatedEmbeds };
try {
  for (const path of ["/", "/learning-lab", "/learning-lab/free-courses", "/digital-guide"]) {
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      assert((await visit(path))?.status() === 200, `${path}: HTTP failure`);
      assert(!(await page.evaluate(() => document.documentElement.classList.contains("dark"))), `${path}: did not default to light with dark OS/saved preferences`);
      await (path === "/digital-guide" ? page.getByRole("button", { name: "Open my digital guide" }) : testId("launcher")).click();
      await testId("dialog").waitFor({ state: "visible" });
      const dimensions = await testId("dialog").evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom,
          viewportWidth: innerWidth, viewportHeight: innerHeight,
          overflow: document.documentElement.scrollWidth - innerWidth,
          modal: element.matches(":modal") };
      });
      assert(!dimensions.modal, `${path}: expected a nonmodal floating popup`);
      assert(dimensions.right - dimensions.left <= 400, `${path} ${width}: popup is wider than 400px`);
      assert(dimensions.left >= -1 && dimensions.right <= width + 1 && dimensions.top >= -1 && dimensions.bottom <= 901, `${path} ${width}: dialog outside viewport`);
      assert(dimensions.overflow <= 1, `${path} ${width}: horizontal page overflow`);
      assert(await testId("dialog").getByRole("img", { name: "Digitally created likeness of Dr. Swapnil Sahoo", exact: true }).isVisible(), "Generated avatar likeness is missing");
      assert(await testId("dialog").getByText("AI-created likeness", { exact: true }).isVisible(), "Generated likeness disclosure is missing");
      assert(await testId("dialog").locator("iframe").count() === 0, "Guided mode should not start a video connection");
      assert(await page.locator("dialog:modal").count() === 0, "Floating guide created a modal backdrop");
      assert(await page.getByRole("button", { name: "Use text instead", exact: true }).isVisible(), "The local voice guide should retain a text alternative");
      if (path === "/digital-guide" && [390, 1440].includes(width)) await page.screenshot({ path: `${dir}/${profile}-${width}.png` });
      await page.keyboard.press("Escape");
      assert(!(await testId("dialog").isVisible()), "Escape did not close guide");
      checks.push({ path, width, ...dimensions });
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit("/learning-lab");
  await testId("launcher").click();
  await testId("close").focus();
  let focusLeftPopup = false;
  for (let i = 0; i < 35; i++) {
    await page.keyboard.press("Tab");
    if (!(await testId("dialog").evaluate((dialog) => dialog.contains(document.activeElement)))) {
      focusLeftPopup = true;
      break;
    }
  }
  assert(focusLeftPopup, "Keyboard focus was trapped in the nonmodal popup");
  // Clicking the underlying site must remain possible and must not have its
  // focus stolen by popup cleanup after an outside dismissal.
  const backgroundTheme = page.getByRole("button", { name: "Switch to dark theme" });
  assert(!(await backgroundTheme.evaluate((element) => element.closest("[inert]") !== null)), "Underlying website is inert");
  await backgroundTheme.click();
  await page.waitForFunction(() => document.documentElement.classList.contains("dark"));
  assert(await page.getByRole("button", { name: "Switch to light theme" }).evaluate((element) => document.activeElement === element), "Closing from outside stole focus from the background control");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  if (!(await testId("dialog").isVisible())) await testId("launcher").click();
  await testId("close").focus();
  await page.keyboard.press("Escape");
  assert(!(await testId("dialog").isVisible()), "Escape did not dismiss the focused popup");
  assert(await testId("launcher").evaluate((element) => document.activeElement === element), "Focus did not return to launcher");
  // Intercept device speech locally: verify explicit playback/cancellation
  // without sending text to a speech service or claiming audiovisual quality.
  await page.evaluate(() => {
    window.guideSpeechCheck = { spoken: [], cancelled: 0 };
    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      value: {
        speak: (utterance) => window.guideSpeechCheck.spoken.push(utterance.text),
        cancel: () => window.guideSpeechCheck.cancelled++,
      },
    });
  });
  await testId("launcher").click();
  await chooseText();
  assert(await page.evaluate(() => window.guideSpeechCheck.spoken.length) === 0, "Speech started automatically");
  const visibleWelcome = await testId("messages").locator(".avatar-guide-message-guide .avatar-guide-message-text").first().innerText();
  await page.getByRole("button", { name: "Read answer using standard device voice" }).first().click();
  assert(await page.evaluate((answer) => window.guideSpeechCheck.spoken[0] === answer, visibleWelcome), "Read aloud did not use the visible answer");
  const cancellationsBeforeClose = await page.evaluate(() => window.guideSpeechCheck.cancelled);
  await testId("close").click();
  await page.waitForFunction((previous) => window.guideSpeechCheck.cancelled > previous, cancellationsBeforeClose);
  checks.push({ deviceSpeech: "Explicit read-aloud and close cancellation passed with a local mock" });
  await testId("launcher").click();
  await chooseText();
  const questions = [
    ["Help me write an AI task brief", "write-an-ai-task-brief"],
    ["How do I evaluate an AI workflow?", "test-ai-before-adoption"],
    ["Help me make a strategic trade-off", "make-a-strategic-tradeoff"],
    ["How do I calculate unit economics?", "read-your-unit-economics"],
    ["How do I set an affordable loss?", "set-an-affordable-loss"],
    ["How do I interview customers?", "ask-better-customer-questions"],
    ["Show me the 13-session MBA course", "/teaching/1-year-mba#course-map"],
    ["Are paid courses open?", "/learning-lab/programmes"],
    ["Is a payment QR available?", "/learning-lab/support#donate"],
    ["What is the weather on Mars?", "/learning-lab/contact"],
  ];
  for (const [question, href] of questions) {
    await testId("input").fill(question);
    await testId("send").click();
    assert(await testId("messages").getByText(question, { exact: true }).count() > 0, `Question not shown: ${question}`);
    assert(await testId("messages").locator(".avatar-guide-message-guide").last().locator(`a[href*="${href}"]`).count() > 0, `Expected grounded resource for ${question}`);
    checks.push({ question, href });
  }
  await testId("input").fill("<img src=x onerror=alert(1)>");
  await testId("send").click();
  assert(await testId("messages").locator("img").count() === 0, "Input was interpreted as HTML");
  assert(await testId("input").getAttribute("maxlength") === "500", "Input length is not bounded");
  await testId("reset").click();
  await chooseText();
  assert(await testId("messages").getByText("What is the weather on Mars?", { exact: true }).count() === 0, "Reset left previous messages");
  await testId("input").fill("Privacy check unique message");
  await testId("send").click();
  await page.reload({ waitUntil: "networkidle" });
  await testId("launcher").click();
  await chooseText();
  assert(await testId("messages").getByText("Privacy check unique message", { exact: true }).count() === 0, "Conversation survived reload");
  await testId("close").click();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.waitForFunction(() => document.documentElement.classList.contains("dark"));
  await testId("launcher").click();
  await page.screenshot({ path: `${dir}/${profile}-dark.png` });
  await testId("close").click();

  await visit("/digital-guide");
  await page.getByRole("button", { name: "Ask the guide" }).first().click();
  await chooseText();
  assert(await testId("messages").getByText("Where should I start with AI?", { exact: true }).count() > 0, "Learning-path CTA did not prefill question");
  await testId("close").click();
  for (const path of ["/learning-lab/login", "/learning-lab/admin", "/learning-lab/learner"]) {
    await visit(path);
    assert(await testId("launcher").count() === 0, `${path}: assistant should be hidden in private access flows`);
  }
  for (const session of Array.from({ length: 13 }, (_, i) => i + 1)) {
    await visit(`/teaching/1-year-mba/session${session}.html`);
    assert(await page.locator('.course-guide-link[href="/digital-guide"]').count() === 1, `Session ${session}: guide entry missing`);
    assert(!(await page.evaluate(() => document.documentElement.classList.contains("dark"))), `Session ${session}: dark was the default`);
    await page.locator("#themeBtn").click();
    await page.waitForFunction(() => document.documentElement.classList.contains("dark"));
    await page.reload({ waitUntil: "load" });
    assert(!(await page.evaluate(() => document.documentElement.classList.contains("dark"))), `Session ${session}: reload did not return to light`);
  }
  for (const file of ["diversification-strategies.html", "sustaining-competitive-advantage.html", "vertical-integration.html", "session1/ai-models-productivity-frontier.html"]) {
    await visit(`/teaching/1-year-mba/${file}`);
    assert(!(await page.evaluate(() => document.documentElement.classList.contains("dark"))), `${file}: dark was the default`);
  }
  await visit("/teaching/1-year-mba/Session8_Corporate%20Strategy_v0.8.html");
  assert(await page.evaluate(() => getComputedStyle(document.body).backgroundColor) === "rgb(241, 245, 249)", "Linked corporate-strategy deck did not start light");
  await page.locator("#deck-theme-toggle").click();
  assert(await page.evaluate(() => document.documentElement.classList.contains("dark")), "Linked deck dark toggle failed");
  await page.reload({ waitUntil: "load" });
  assert(!(await page.evaluate(() => document.documentElement.classList.contains("dark"))), "Linked deck did not return to light after reload");
  checks.push({ linkedCorporateDeck: "Light default, explicit dark toggle and reload passed" });
  assert(errors.length === 0, `Browser errors: ${errors.join("; ")}`);
  assert(blockedWrites.length === 0, `Guided mode attempted HTTP writes: ${blockedWrites.join("; ")}`);
  report.status = "PASS";
  console.log("PASS compact guide: 16 route/viewport combinations, nonmodal keyboard/background access, grounded text answers, reset/reload privacy, dark mode, path CTAs, private-route suppression and MBA entry links; no HTTP writes");
} catch (error) {
  report.status = "FAIL";
  report.failure = error.message;
  await page.screenshot({ path: `${dir}/${profile}-failure.png` }).catch(() => {});
  console.error(error);
  process.exitCode = 1;
} finally {
  await writeFile(`${dir}/${profile}-results.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
