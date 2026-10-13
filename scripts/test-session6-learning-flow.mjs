import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// The coordinator must confirm the integrated preview before browser execution.
// These fresh contexts never submit a form, enter an account or grant media access.
if (!process.argv.includes("--preview-ready")) throw new Error("Wait for the integrated Session 6 preview; then pass --preview-ready.");
const profile = (process.env.SESSION6_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const output = `artifacts/session1-resources/session6-${profile}`;
await mkdir(output, { recursive: true });
const publicDirectory = resolve(fileURLToPath(new URL("../public/", import.meta.url)));
const mime = { ".html": "text/html;charset=utf-8", ".js": "text/javascript;charset=utf-8", ".css": "text/css;charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png" };
let server, base = process.env.SESSION6_TEST_BASE_URL?.replace(/\/$/, "");
if (!base) {
  server = createServer(async (request, response) => {
    try {
      if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
      const file = resolve(publicDirectory, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
      if (!file.startsWith(publicDirectory + sep)) { response.writeHead(403).end(); return; }
      if (!(await stat(file)).isFile()) { response.writeHead(404).end(); return; }
      const body = await readFile(file);
      response.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-store", "Content-Length": body.length });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(done => server.listen(0, "127.0.0.1", done));
  base = `http://127.0.0.1:${server.address().port}`;
}
assert.match(base, /^https?:\/\//);
const origin = new URL(base).origin;
const lesson = "/teaching/1-year-mba/session6.html";
const progressKey = "pgpm-v02-session6-progress";
const icon = "https://www.swapnilsahoo.com/icon.svg?v=superman";
const browser = await chromium.launch({ headless: true, channel: process.env.SESSION6_TEST_BROWSER_CHANNEL || undefined });
const contexts = [];
const report = { base, profile, checkedAt: new Date().toISOString(), method: "Fresh public browser contexts; HTTP writes and external iframe documents blocked", checks: [], screenshots: [], pageErrors: [], writes: [], blockedFrames: [] };

async function freshPage(width, height, javaScriptEnabled = true) {
  const context = await browser.newContext({ viewport: { width, height }, javaScriptEnabled, colorScheme: "dark", permissions: [] });
  contexts.push(context);
  if (javaScriptEnabled) await context.addInitScript(() => {
    ["theme", "pgpm-course-theme", "s6-theme"].forEach(key => localStorage.setItem(key, "dark"));
    localStorage.removeItem("pgpm-v02-session6-progress");
  });
  await context.route("**/*", route => {
    const request = route.request(), url = new URL(request.url());
    if (!["GET", "HEAD"].includes(request.method())) { report.writes.push({ method: request.method(), path: url.pathname }); return route.abort(); }
    if (request.resourceType() === "document" && request.frame().parentFrame() && url.origin !== origin) {
      report.blockedFrames.push(url.origin + url.pathname); return route.fulfill({ status: 204, body: "" });
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.on("pageerror", error => report.pageErrors.push({ viewport: width, message: error.message }));
  const response = await page.goto(base + lesson, { waitUntil: "load", timeout: 90000 });
  assert.equal(response.status(), 200, "Session 6 returns HTTP 200");
  if (javaScriptEnabled) await page.evaluate(() => document.fonts.ready);
  return { context, page };
}
async function screenshot(page, name) {
  const destination = `${output}/${name}.png`;
  await page.screenshot({ path: destination }); report.screenshots.push(destination);
}
async function noOverflow(page, label) {
  const size = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(size.document <= size.viewport + 1 && size.body <= size.viewport + 1, `${label}: document must not scroll horizontally: ${JSON.stringify(size)}`);
  return size;
}
async function staticContent(page) {
  const outcomes = page.locator("#learning-outcomes");
  assert.equal(await outcomes.count(), 1, "One Learning Outcomes section");
  assert.equal(await outcomes.locator("li").count(), 5, "Five assessable outcomes");
  assert.ok(await outcomes.evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("q1")) & Node.DOCUMENT_POSITION_FOLLOWING)), "Outcomes precede the teaching content");
  for (const link of await outcomes.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute("href");
    assert.equal(await page.locator(href).count(), 1, `Outcome practice anchor ${href}`);
  }
  for (const rel of ["icon", "shortcut icon"]) assert.equal(await page.locator(`link[rel="${rel}"]`).getAttribute("href"), icon, "Same canonical website favicon");
  const readings = page.locator("#readings");
  assert.ok((await readings.textContent()).length > 200 && await readings.locator('a[href^="/teaching/"]').count() > 0, "Static course-pack guidance and earlier resource links remain available");
  const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(node => node.id));
  assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [], "No duplicate live IDs");
  assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), false, "Light starts by default despite OS and stored dark theme");
  return { outcomes: 5, outcomePracticeLinks: await outcomes.locator('a[href^="#"]').count(), favicon: icon };
}
async function keyboardRange(page, selector, key) {
  const range = page.locator(selector);
  await range.focus(); await range.press(key);
}
async function rangeValue(page, selector, value) {
  await page.locator(selector).evaluate((el, next) => { el.value = String(next); el.dispatchEvent(new Event("input", { bubbles: true })); }, value);
}
async function progress(page) { return page.evaluate(key => JSON.parse(localStorage.getItem(key) || "{}"), progressKey); }
async function tracking(page) {
  assert.equal(await page.locator("#doneCount").innerText(), "0", "Fresh context has no practice progress");
  for (const selector of ["#valueStick h3", "#ledgerBox h3", "#testBox h3"]) await page.locator(selector).click();
  assert.deepEqual(await progress(page), {}, "Clicking teaching prose does not count as practice");
  await keyboardRange(page, "#vs-wtp", "ArrowRight");
  assert.equal((await progress(page)).stick, true, "Keyboard range change marks the value-stick practice");
  await keyboardRange(page, "#lgCost", "ArrowRight");
  assert.equal((await progress(page)).ledger, true, "Keyboard range change marks the two-ledger practice");
  await page.locator("#resetProg").click();
  assert.deepEqual(await progress(page), {}, "Progress reset clears only practice tracking");
  await page.locator("#testListReset").click();
  assert.deepEqual(await progress(page), {}, "Starting a fresh attempt does not itself count as practice");
  return { textClicksExcluded: true, keyboardRangesIncluded: true, progressReset: true };
}
async function valueStick(page) {
  // Independent classroom inputs. The rival is (WTP, price, cost, outside option)=(200,160,100,80).
  const fixtures = [
    { name: "Baseline", values: [300, 230, 120, 90] },
    { name: "Switch to organic cotton", values: [330, 230, 135, 105] },
    { name: "Offer free repairs", values: [325, 230, 130, 90] },
    { name: "Mission-aligned staff", values: [300, 230, 120, 70] },
    { name: "Raise the price", values: [300, 260, 120, 90] },
  ];
  for (const { name, values: [wtp, price, cost, outside] } of fixtures) {
    await page.locator("#vsPresets").getByRole("button", { name, exact: true }).click();
    const expected = [wtp, price, cost, outside, wtp - outside, wtp - price, price - cost, cost - outside];
    const rival = [200, 160, 100, 80, 120, 40, 60, 20];
    const rows = await page.locator("#vsTable tr").evaluateAll(nodes => nodes.map(node => [...node.querySelectorAll("td")].map(cell => Number(cell.textContent.replace(/[^\d.-]/g, "")))));
    assert.deepEqual(rows, expected.map((value, index) => [value, rival[index]]), `${name}: correct value creation and distribution`);
    assert.match(await page.locator("#vsRead").innerText(), new RegExp(`Competitive advantage: \\$${wtp - outside - 120} per jacket`), `${name}: added wedge relative to rival`);
    assert.equal((wtp - price) + (price - cost) + (cost - outside), wtp - outside, "Value slices reconcile");
  }
  await page.locator("#vsPresets").getByRole("button", { name: "Baseline", exact: true }).click();
  await keyboardRange(page, "#vs-wtp", "Home");
  assert.equal(await page.locator("#vs-wtp").inputValue(), "230", "WTP clamps at price in the classroom model");
  assert.match(await page.locator("#vsHint").innerText(), /cannot fall below the price/i);
  await keyboardRange(page, "#vs-oc", "End");
  assert.equal(await page.locator("#vs-oc").inputValue(), "120", "Outside option clamps at the cost paid");
  return { presets: fixtures.length, creationAndCaptureReconcile: true, keyboardConstraintChecks: 2 };
}
async function ledgers(page) {
  // ₹500 service price; 100 repairs add 200 kg; each displaced purchase avoids 10 kg.
  const fixtures = [
    { cost: 650, future: 200, displacement: 50, verdict: /Both ledgers improve/ },
    { cost: 800, future: 0, displacement: 50, verdict: /environment may gain/ },
    { cost: 200, future: 0, displacement: 10, verdict: /business may gain/ },
    { cost: 800, future: 0, displacement: 10, verdict: /Neither ledger improves/ },
    { cost: 650, future: 150, displacement: 20, verdict: /Neither ledger improves/ },
    { cost: 500, future: 0, displacement: 100, verdict: /environment may gain/ },
  ];
  for (const fixture of fixtures) {
    for (const [id, value] of [["lgCost", fixture.cost], ["lgRet", fixture.future], ["lgDisp", fixture.displacement]]) await rangeValue(page, `#${id}`, value);
    const money = 500 - fixture.cost + fixture.future, emissions = fixture.displacement * 10 - 100 * 2;
    assert.equal((await page.locator("#lgBiz").innerText()).replace(/[₹,]/g, "").replace("−", "-"), String(money), "Business contribution uses future contribution, not revenue");
    assert.equal((await page.locator("#lgEnv").innerText()).replace("−", "-"), `${emissions} kg`, "Environmental ledger includes added repair emissions");
    assert.match(await page.locator("#lgRead").innerText(), fixture.verdict, "Zero is break-even, not improvement");
  }
  return { independentFixtures: fixtures.length, bothBreakEvenBoundaries: true };
}
const sorters = [
  { list: "testList", score: "testScore", count: 9, first: "y", wrong: "n" },
  { list: "csvList", score: "csvScore", count: 8, first: "csr", wrong: "csv", alternatives: [[6, ["csr", "csv"]], [7, ["csr", "csv"]]] },
  { list: "leverList", score: "leverScore", count: 10, first: "pm", wrong: "cl", alternatives: [[9, ["vc", "cl"]]] },
  { list: "srtList", score: "srtScore", count: 11, first: "ext", wrong: "int", alternatives: [[8, ["ext", "int"]], [10, ["int", "ext"]]] },
];
async function sorting(page) {
  let alternativeChecks = 0;
  for (const fixture of sorters) {
    const list = page.locator(`#${fixture.list}`), cards = list.locator(":scope > div"), score = page.locator(`#${fixture.score}`);
    const reset = page.locator(`#${fixture.list}Reset`);
    assert.equal(await cards.count(), fixture.count, `${fixture.list}: original exercises retained`);
    await cards.first().locator(`button[data-k="${fixture.wrong}"]`).click();
    assert.match(await score.innerText(), new RegExp(`1 of ${fixture.count} sorted, 0 defensible`));
    assert.match(await cards.first().locator('[aria-live="polite"]').innerText(), /Not quite/);
    await cards.first().locator(`button[data-k="${fixture.first}"]`).dispatchEvent("click");
    assert.match(await score.innerText(), /0 defensible/, "Locked attempts cannot change the score");
    await reset.click();
    assert.match(await score.innerText(), new RegExp(`0 of ${fixture.count} sorted, 0 defensible`));
    assert.equal(await list.locator("button:disabled, [data-done], .s6-right, .s6-wrong").count(), 0, "Fresh attempt removes all answer state");
    assert.equal(await cards.first().locator("button").first().evaluate(el => el === document.activeElement), true, "Reset restores keyboard focus to first choice");
    const right = cards.first().locator(`button[data-k="${fixture.first}"]`);
    await right.focus(); await right.press("Enter");
    assert.match(await score.innerText(), /1 defensible/, "Keyboard answer receives credit");
    for (const [index, alternatives] of fixture.alternatives || []) {
      for (const answer of alternatives) {
        await reset.click();
        const card = cards.nth(index);
        await card.locator(`button[data-k="${answer}"]`).click();
        assert.match(await score.innerText(), /1 defensible/, "Alternate reasoned classification gets equal credit");
        assert.match(await card.locator('[aria-live="polite"]').innerText(), /Defensible, and so is/);
        alternativeChecks++;
      }
    }
    await reset.click();
  }
  return { freshAttempts: sorters.length, lockedScoring: true, alternativeChecks };
}
// Reviewed answer concepts, independent of the runtime FQUIZ/SQUIZ arrays or their answer indexes.
const quizFixtures = [
  { id: "fQuiz", answers: [/wider wedge/, /\$5\.5M/, /falls to \$0/, /raised the price buyers are willing/, /protected by a patent/, /A core product/, /redistributes existing value/, /spread of fast-fashion/, /internal source: culture/i, /Maximise the cash/, /Excess-holding limits/, /Purpose Trust holds all the voting/, /one-time \$17\.5 million/, /public markets drive short-term/, /Trust could direct.*sell some or all/] },
  { id: "sQuiz", answers: [/Willingness to pay minus supplier opportunity cost/, /unchanged.*customers to Patagonia/, /affects firms differently/, /Anticipation and agility/, /sourcing innovation/, /regained its previous sales/, /disappear.*ceased to exist/, /Lowers supplier opportunity cost/, /private.*did not share/, /measured social improvement/i, /−100 kg/, /price, rivals and bargaining/] },
];
async function quizzes(page) {
  for (const { id, answers } of quizFixtures) {
    const host = page.locator(`#${id}`), rows = host.locator("[data-question]"), score = page.locator(`#${id}Score`);
    assert.equal(await rows.count(), answers.length, `${id}: all original questions remain`);
    for (const [index, answer] of answers.entries()) {
      const row = rows.nth(index), options = row.locator(".quiz-option"), correct = options.filter({ hasText: answer });
      assert.equal(await correct.count(), 1, `Independent answer concept resolves: ${id} ${index + 1}`);
      const correctKey = await correct.getAttribute("data-k");
      const choice = index === 0 ? options.filter({ hasNotText: answer }).first() : correct;
      await choice.focus(); await choice.press("Enter");
      const feedback = row.locator(".quiz-explanation");
      assert.equal(await feedback.getAttribute("aria-live"), "polite", "Answer feedback is announced");
      assert.match(await feedback.innerText(), index === 0 ? /Your choice:[\s\S]*Correct answer:/i : /^Correct\./i, "Correctness is explicit in text");
      assert.match(await correct.innerText(), /Correct answer/i, "Correct choice is labelled without relying on colour");
      assert.match(await choice.innerText(), /Your choice/i, "Student selection is explicit");
      assert.equal(await choice.getAttribute("aria-pressed"), "true");
      assert.equal(await row.locator(".quiz-option:enabled").count(), 0, "Answered choices lock");
      await row.locator(`button[data-k="${correctKey}"]`).dispatchEvent("click");
      assert.equal(await score.innerText(), String(index), "A locked repeat event cannot award extra credit");
    }
    assert.equal(await score.innerText(), String(answers.length - 1), "Mixed correct/incorrect attempt totals correctly");
    await page.locator(`#${id}Reset`).click();
    assert.equal(await score.innerText(), "0");
    assert.equal(await host.locator("button:disabled, [data-answered], .correct, .incorrect").count(), 0, "Quiz reset clears answer and scoring state");
    assert.equal(await rows.first().locator("button").first().evaluate(el => el === document.activeElement), true, "Quiz reset restores first-answer focus");
    assert.equal(await rows.first().locator(".quiz-explanation").textContent(), "", "Fresh attempt has no stale explanation");
  }
  return { questions: 27, mixedScoreAndLock: true, resets: 2, explicitAnswerLabels: true };
}
async function representativeControls(page) {
  const tabs = page.locator("#authors .author-tab");
  assert.ok(await tabs.count() > 1);
  await tabs.nth(1).click(); assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  const panel = await tabs.nth(1).getAttribute("data-author");
  assert.equal(await page.locator(`#authors [data-panel="${panel}"]`).evaluate(el => el.classList.contains("hidden")), false);
  await tabs.first().click();
  await page.locator("#ws-vests .workshop-button").nth(1).click();
  assert.match(await page.locator("#ws-vests").innerText(), /Outcome: the policy the textbook reports/);
  const simulation = page.locator("#sim-chacabuco");
  for (const choice of [/Give it away:/, /Neither:/, /Split them:/]) await simulation.getByRole("button", { name: choice }).click();
  assert.match(await simulation.innerText(), /WHAT PATAGONIA DID/);
  await simulation.getByRole("button", { name: "Start again", exact: true }).click();
  assert.match(await simulation.innerText(), /Step 1:/);
  return { authorTabs: true, workshopOutcome: true, simulationActualEndingAndRestart: true };
}

try {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 600]]) {
    const { page, context } = await freshPage(width, height);
    const content = await staticContent(page);
    const geometry = await noOverflow(page, `${width}px light`);
    if (width === 1440) {
      const asset = await context.request.get(base + "/teaching/1-year-mba/course-ui.js"); assert.equal(asset.status(), 200);
      report.checks.push({ viewport: width, content, tracking: await tracking(page), valueStick: await valueStick(page), ledgers: await ledgers(page), sorting: await sorting(page), quizzes: await quizzes(page), controls: await representativeControls(page), geometry });
    } else {
      await keyboardRange(page, "#lgDisp", "ArrowLeft");
      assert.equal((await progress(page)).ledger, true, "Responsive keyboard range interaction works");
      await page.locator("#sQuiz .quiz-option").first().click();
      assert.match(await page.locator("#sQuiz [data-question]").first().innerText(), /Correct answer.*Your choice|Your choice[\s\S]*Correct answer/i);
      await page.locator("#sQuizReset").click();
      report.checks.push({ viewport: width, content, keyboardRangeAndQuizReset: true, geometry });
    }
    await page.locator("#valueStick").scrollIntoViewIfNeeded(); await noOverflow(page, `${width}px value-stick`); await screenshot(page, `value-stick-${width}`);
    await page.locator("#learning-outcomes").scrollIntoViewIfNeeded(); await screenshot(page, `outcomes-${width}`);
    await page.locator("#themeBtn").click(); assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), true, "Manual dark remains available");
    await noOverflow(page, `${width}px manual dark`); await screenshot(page, `manual-dark-${width}`);
    await page.locator("#themeBtn").click(); assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), false);
    await context.close();
  }
  const { page, context } = await freshPage(390, 844, false);
  report.checks.push({ noJavaScript: await staticContent(page), staticOutcomesAndResourcesAvailable: true });
  await page.locator("#learning-outcomes").scrollIntoViewIfNeeded(); await screenshot(page, "no-js-outcomes-390");
  await context.close();
  assert.deepEqual(report.pageErrors, [], "No browser script errors");
  assert.deepEqual(report.writes, [], "No HTTP writes attempted");
  report.passed = true;
} catch (error) {
  report.passed = false; report.failure = { message: error.message, stack: error.stack };
  console.error(error.stack); process.exitCode = 1;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await Promise.allSettled(contexts.map(context => context.close()));
  await browser.close();
  if (server) await new Promise(done => server.close(done));
}
console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, pageErrors: report.pageErrors.length, writes: report.writes.length, report: `${output}/report.json` }));
