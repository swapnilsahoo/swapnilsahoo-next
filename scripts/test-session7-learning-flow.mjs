import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// Start only after the coordinator confirms the integrated Session 7 preview.
// Fresh public contexts: no accounts, messages, submissions or media permission.
if (!process.argv.includes("--preview-ready")) throw new Error("Wait for the integrated Session 7 preview; then pass --preview-ready.");
const profile = (process.env.SESSION7_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const captureOnly = process.argv.includes("--screenshots-only");
const output = `artifacts/session1-resources/session7-${profile}`;
await mkdir(output, { recursive: true });
const publicDirectory = resolve(fileURLToPath(new URL("../public/", import.meta.url)));
const mime = { ".html": "text/html;charset=utf-8", ".js": "text/javascript;charset=utf-8", ".css": "text/css;charset=utf-8", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png" };
let server, base = process.env.SESSION7_TEST_BASE_URL?.replace(/\/$/, "");
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
const origin = new URL(base).origin, lesson = "/teaching/1-year-mba/session7.html";
const progressKey = "pgpm-v02-session7-progress", icon = "https://www.swapnilsahoo.com/icon.svg?v=superman";
const browser = await chromium.launch({ headless: true, channel: process.env.SESSION7_TEST_BROWSER_CHANNEL || undefined });
const contexts = [];
const report = { base, profile, captureOnly, checkedAt: new Date().toISOString(), method: "Fresh public browser contexts; HTTP writes and external iframe documents blocked", checks: [], screenshots: [], pageErrors: [], writes: [], blockedFrames: [] };
async function freshPage(width, height, javaScriptEnabled = true) {
  const context = await browser.newContext({ viewport: { width, height }, javaScriptEnabled, colorScheme: "dark", permissions: [] });
  contexts.push(context);
  if (javaScriptEnabled) await context.addInitScript(() => {
    ["theme", "pgpm-course-theme", "s7-theme"].forEach(key => localStorage.setItem(key, "dark"));
    localStorage.removeItem("pgpm-v02-session7-progress");
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
  assert.equal(response.status(), 200, "Session 7 returns HTTP 200");
  if (javaScriptEnabled) await page.evaluate(() => document.fonts.ready);
  return { page, context };
}
async function screenshot(page, name, selector) {
  const destination = `${output}/${name}.png`;
  await page.evaluate(() => document.activeElement?.blur());
  if (selector) await page.locator(selector).evaluate(el => el.scrollIntoView({ block: "start", behavior: "instant" }));
  await page.screenshot({ path: destination });
  report.screenshots.push(destination);
}
async function noOverflow(page, label) {
  const size = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(size.document <= size.viewport + 1 && size.body <= size.viewport + 1, `${label}: document must not scroll horizontally: ${JSON.stringify(size)}`);
  return size;
}
async function staticContent(page) {
  const outcomes = page.locator("#learning-outcomes");
  assert.equal(await outcomes.count(), 1);
  assert.equal(await outcomes.locator("li").count(), 5, "Five assessable outcomes");
  assert.ok(await outcomes.evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("q1")) & Node.DOCUMENT_POSITION_FOLLOWING)), "Outcomes precede teaching content");
  for (const link of await outcomes.locator('a[href^="#"]').all()) assert.equal(await page.locator(await link.getAttribute("href")).count(), 1, "Outcome practice anchor resolves");
  for (const rel of ["icon", "shortcut icon"]) assert.equal(await page.locator(`link[rel="${rel}"]`).getAttribute("href"), icon, "Canonical website favicon");
  assert.ok((await page.locator("#readings").textContent()).length > 200, "Static reading and preparation guidance remains available");
  const ids = await page.locator("[id]").evaluateAll(nodes => nodes.map(node => node.id));
  assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [], "Unique live IDs");
  assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), false, "Light default despite OS and stored dark theme");
  return { outcomes: 5, practiceLinks: await outcomes.locator('a[href^="#"]').count(), favicon: icon };
}
async function keyboardRange(page, selector, key) { const input = page.locator(selector); await input.focus(); await input.press(key); }
async function rangeValue(page, selector, value) { await page.locator(selector).evaluate((el, next) => { el.value = String(next); el.dispatchEvent(new Event("input", { bubbles: true })); }, value); }
async function progress(page) { return page.evaluate(key => JSON.parse(localStorage.getItem(key) || "{}"), progressKey); }
async function tracking(page) {
  assert.equal(await page.locator("#doneCount").innerText(), "0");
  for (const selector of ["#decayBox", "#errcBox", "#mapBox"]) await page.locator(selector).locator("p").first().click();
  assert.deepEqual(await progress(page), {}, "Prose clicks are not practice");
  await keyboardRange(page, "#dcRange", "ArrowRight");
  assert.equal((await progress(page)).decay, true, "Keyboard range change marks decay practice");
  await keyboardRange(page, "#errcPrice", "ArrowRight");
  assert.equal((await progress(page)).errc, true, "Keyboard range change marks four-actions practice");
  await page.locator("#resetProg").click();
  await page.locator("#errcReset").click(); await page.locator("#mapListReset").click();
  assert.deepEqual(await progress(page), {}, "Fresh-attempt and model reset controls are not practice");
  const create = page.locator("#cvCreate"); await create.selectOption("rent");
  assert.equal((await progress(page)).canvas, true, "Changing a model select marks practice");
  await page.locator("#errcActions input").first().focus(); await page.locator("#errcActions input").first().press("Space");
  assert.equal((await progress(page)).errc, true, "Keyboard checkbox changes mark practice");
  await page.locator("#resetProg").click();
  return { proseAndResetsExcluded: true, keyboardRangesCheckboxesAndSelectsIncluded: true };
}
async function economics(page) {
  // Independent classroom arithmetic: baseline (cost,WTP)=(60,90).
  // E removes (12,4); R removes (8,3); R raises (7,15); C creates (5,12).
  const fixtures = [
    { actions: [], price: 65, cost: 60, wtp: 90, verdict: /baseline economics work/ },
    { actions: [0, 1], price: 65, cost: 40, wtp: 83, verdict: /Cost falls/ },
    { actions: [2, 3], price: 80, cost: 72, wtp: 117, verdict: /this is differentiation/ },
    { actions: [0, 1, 2, 3], price: 65, cost: 52, wtp: 110, verdict: /candidate for value innovation/ },
    { actions: [0, 1, 2, 3], price: 120, cost: 52, wtp: 110, verdict: /price exceeds.*willingness to pay/ },
    { actions: [0, 1, 2, 3], price: 30, cost: 52, wtp: 110, verdict: /price does not cover/ },
    { actions: [0, 1, 2, 3], price: 52, cost: 52, wtp: 110, verdict: /candidate for value innovation/ },
    { actions: [0, 1, 2, 3], price: 110, cost: 52, wtp: 110, verdict: /candidate for value innovation/ },
  ];
  for (const fixture of fixtures) {
    await page.locator("#errcReset").click();
    for (const index of fixture.actions) await page.locator("#errcActions input").nth(index).check();
    await rangeValue(page, "#errcPrice", fixture.price);
    const expected = { errcWtp: fixture.wtp, errcCost: fixture.cost, errcSur: fixture.wtp - fixture.price, errcMar: fixture.price - fixture.cost };
    for (const [id, value] of Object.entries(expected)) assert.equal(await page.locator(`#${id}`).innerText(), String(value), `Independent economics fixture ${id}`);
    assert.equal((fixture.wtp - fixture.price) + (fixture.price - fixture.cost), fixture.wtp - fixture.cost, "Buyer surplus and contribution reconcile");
    assert.match(await page.locator("#errcVerdict").innerText(), fixture.verdict, "Model separates differentiation, new-value hypothesis and economic viability");
  }
  await page.locator("#errcReset").click();
  assert.equal(await page.locator("#errcActions input:checked").count(), 0); assert.equal(await page.locator("#errcPrice").inputValue(), "65");
  assert.equal(await page.locator("#errcMar").innerText(), "5");
  return { fixtures: fixtures.length, absentDemandAndLossChecked: true, bothZeroBoundaries: true, modelReset: true };
}
async function canvasAndDecay(page) {
  // Curated classroom curves, not measured company ratings.
  const patagonia = [9, 2, 10, 9, 9, 10];
  for (const { preset, values } of [{ preset: "ff", values: [2, 10, 2, 0, 2, 1] }, { preset: "od", values: [8, 5, 6, 3, 4, 3] }, { preset: "own", values: patagonia }]) {
    await page.locator(`#canvasBox [data-cv="${preset}"]`).click();
    const shown = await page.locator("#cvRows .tabular-nums").allTextContents();
    assert.deepEqual(shown.map(Number), values, "Independent comparator fixture");
    const gap = values.reduce((total, value, index) => total + Math.abs(value - patagonia[index]), 0);
    assert.match(await page.locator("#cvVerdict").innerText(), new RegExp(`gap from Patagonia’s curve: ${gap} points`));
  }
  assert.match(await page.locator("#cvVerdict").innerText(), /Imitation:/);
  await page.locator("#cvCreate").selectOption("rent");
  assert.match(await page.locator("#cvC").innerText(), /Rental of technical gear/);
  assert.equal(await page.locator("#cvPlot .cv-d-rv").count(), 7, "New factor appears on the curve");
  assert.match(await page.locator("#cvVerdict").innerText(), /Creating alone is not value innovation/);
  await page.locator('#canvasBox [data-cv="ff"]').click();
  await page.locator("#cvCreate").selectOption("rent");
  assert.match(await page.locator("#cvVerdict").innerText(), /shape of value innovation.*Now test it:/s);
  await page.locator("#dcReveal").click();
  for (const [guess, expected] of [[0, /stickier than most/], [40, /between a third and a half/], [60, /Closer than most/], [95, /You were right/]]) {
    await rangeValue(page, "#dcRange", guess);
    assert.equal(await page.locator("#dcVal").innerText(), `${guess}%`);
    assert.match(await page.locator("#dcRead").innerText(), expected);
    assert.match(await page.locator("#dcRead").innerText(), /36-point gap shrank to less than 3\.6 points/);
  }
  return { independentComparatorCurves: 3, newFactorAndDemandCaveat: true, decayGuesses: 4 };
}
async function cleanReset(page, id) {
  const list = page.locator(`#${id}`);
  await page.locator(`#${id}Reset`).click();
  assert.equal(await list.locator("button:disabled, [data-pick], .s7-right, .s7-wrong").count(), 0, `${id}: fresh attempt clears prior choices`);
  assert.equal(await list.locator("button[aria-pressed=true]").count(), 0, `${id}: fresh attempt clears pressed state`);
  assert.equal(await list.locator("button").first().evaluate(el => el === document.activeElement), true, `${id}: reset restores focus`);
}
async function classification(page) {
  const fixtures = [
    { id: "mapList", score: "mapScore", answers: ["diff", "cl", "diff", "dfocus", "cfocus", "stuck", "dfocus", "cl"], finished: /8 of 8 placed, 8 where Porter puts them/ },
    { id: "drvList", score: "drvScore", answers: ["u", "u", "u", "b", "u", "u", "u", "b", "c", "u"], finished: /10 of 10 sorted; 10 defensible/ },
    { id: "dpList", score: "dpScore", answers: ["d", "p", "b", "d", "p", "b", "d", "p"], finished: /8 of 8 right/ },
  ];
  for (const fixture of fixtures) {
    const cards = page.locator(`#${fixture.id} > div`), score = page.locator(`#${fixture.score}`);
    assert.equal(await cards.count(), fixture.answers.length + (fixture.id === "mapList" ? 1 : 0));
    const buttons = cards.first().locator("button");
    await buttons.filter({ hasText: fixture.id === "dpList" ? /^Preemption$/ : fixture.id === "mapList" ? /^Cost leadership$/ : /^Lowers cost$/ }).click();
    const wrongScore = await score.innerText();
    const correction = fixture.id === "dpList" ? cards.first().locator("button").filter({ hasText: /^Deterrence\b/ }) : cards.first().locator(`button[data-k="${fixture.answers[0]}"]`);
    await correction.dispatchEvent("click"); assert.equal(await score.innerText(), wrongScore, "Locked classifier cannot award repeat credit");
    await cleanReset(page, fixture.id);
    for (const [index, answer] of fixture.answers.entries()) {
      // DP has natural labels; map and driver cards expose data-k.
      const card = cards.nth(index), option = fixture.id === "dpList" ? card.getByRole("button", { name: { d: "Deterrence", p: "Preemption", b: "Both" }[answer], exact: true }) : card.locator(`button[data-k="${answer}"]`);
      await option.focus(); await option.press("Enter");
      assert.equal(await card.locator("button:enabled").count(), 0, "Scored classifier locks after the first answer");
    }
    assert.match(await score.innerText(), fixture.finished);
    if (fixture.id === "mapList") {
      const open = cards.last(), scoreBefore = await score.innerText();
      for (const answer of ["diff", "dfocus"]) { await open.locator(`button[data-k="${answer}"]`).click(); assert.match(await open.locator('[aria-live="polite"]').innerText(), /Arguable.*Defensible/s); }
      assert.equal(await score.innerText(), scoreBefore, "Patagonia's alternative positioning is unscored and revisable");
    }
    await cleanReset(page, fixture.id);
    if (fixture.id === "mapList") assert.equal(await page.locator("#mapBox .s7-pin").count(), 0, "Positioning-map reset clears pins");
    if (fixture.id === "drvList") {
      for (const [index, answers] of [[3, ["u", "b"]], [7, ["c", "b"]]]) {
        for (const answer of answers) {
          await cleanReset(page, fixture.id); const card = cards.nth(index);
          await card.locator(`button[data-k="${answer}"]`).click();
          assert.match(await score.innerText(), /1 of 10 sorted; 1 defensible/, "Alternate defensible driver classification receives credit");
        }
      }
      await cleanReset(page, fixture.id);
      for (const tally of ["drvU", "drvC", "drvB"]) assert.equal(await page.locator(`#${tally}`).innerText(), "0");
    }
  }
  const irreversible = page.locator("#irrevList > div");
  const choices = [["Sunk cost"], ["Lock-out"], ["Lock-out"], ["Time lag"], ["Time lag"], [], ["Sunk cost", "Lock-out"], []];
  const scored = [1, 1, 2, 1, 1, 2, 2, 3];
  assert.equal(await irreversible.count(), 8);
  for (const [index, labels] of choices.entries()) {
    const card = irreversible.nth(index);
    for (const label of labels) await card.getByRole("button", { name: label, exact: true }).click();
    await card.getByRole("button", { name: "Compare", exact: true }).click();
    assert.match(await card.innerText(), new RegExp(`Matched this page’s reading on ${scored[index]} of ${scored[index]} scored indicator`));
  }
  assert.match(await page.locator("#irrevScore").innerText(), /8 of 8 compared/);
  await cleanReset(page, "irrevList");
  // Boeing's time-lag and lock-out readings are intentionally unscored/arguable.
  const boeing = irreversible.first();
  for (const label of ["Sunk cost", "Lock-out", "Time lag"]) await boeing.getByRole("button", { name: label, exact: true }).click();
  await boeing.getByRole("button", { name: "Compare", exact: true }).click();
  assert.match(await boeing.innerText(), /Matched this page’s reading on 1 of 1/);
  await cleanReset(page, "irrevList"); assert.match(await page.locator("#irrevScore").innerText(), /0 of 8 compared/);
  const ocean = page.locator("#ocList > div"), oceanAnswers = ["Won existing demand", "The case cannot tell", "Won existing demand", "Won existing demand", "The case cannot tell", "Won existing demand", "The case cannot tell", "Created new demand"];
  assert.equal(await ocean.count(), oceanAnswers.length);
  for (const [index, label] of oceanAnswers.entries()) await ocean.nth(index).getByRole("button", { name: label, exact: true }).click();
  assert.match(await page.locator("#ocSummary").innerText(), /8 of 8 judged; 8 match/);
  await ocean.first().getByRole("button", { name: "Created new demand", exact: true }).click();
  assert.match(await page.locator("#ocSummary").innerText(), /8 of 8 judged; 7 match/, "Revisable judgment recomputes, without accumulating credit");
  await cleanReset(page, "ocList"); assert.match(await page.locator("#ocSummary").innerText(), /0 of 8 judged/);
  return { freshAttempts: 5, fixedItemsChecked: 42, driverAlternatives: 4, unscoredPositioningAlternatives: 2, arguableIrreversibility: true, revisableOceanJudgment: true };
}
// Reviewed concept answers, independent of runtime quiz arrays/answer indexes.
const quizFixtures = [
  { id: "fQuiz", answers: [/inconsistent activities|incompatible.*activities|activities.*incompatible/, /Tesla mainly raises V/, /Complements/, /process innovation jumps/, /virtual and home try-ons/, /moves pulled in opposite directions/, /coupons and clearance racks/, /buyers stop valuing the uniqueness/, /one primary strategy, differentiation/, /absorb price cuts/, /proprietary process learned/, /Ends \(goals/, /Mont Blanc/, /public markets drive short-term/, /invest in the business and its employees/] },
  { id: "sQuiz", answers: [/competitive advantage sought.*competitive scope/, /discount well below rivals/, /segment was not different enough/, /exploiting linkages among activities/, /added frills, new services and new routes/, /serves every segment/, /firms do not all face the same efficiency frontier/, /limited growth to pre-set targets/, /value innovation and new demand still need evidence/, /incumbents often created them/, /How hard it is to reverse/, /Holdup by the players/] },
];
async function quizzes(page) {
  for (const { id, answers } of quizFixtures) {
    const host = page.locator(`#${id}`), rows = host.locator("[data-question]"), score = page.locator(`#${id}Score`);
    assert.equal(await rows.count(), answers.length);
    if (id === "sQuiz") assert.match(await rows.nth(7).innerText(), /refusing growth at all costs, but does not by itself establish a narrow target segment/i, "Growth discipline alone does not prove focused differentiation");
    for (const [index, answer] of answers.entries()) {
      const row = rows.nth(index), options = row.locator(".quiz-option"), correct = options.filter({ hasText: answer });
      assert.equal(await correct.count(), 1, `Independent answer concept ${id} ${index + 1}`);
      const correctKey = await correct.getAttribute("data-k"), choice = index === 0 ? options.filter({ hasNotText: answer }).first() : correct;
      await choice.focus(); await choice.press("Enter");
      const feedback = row.locator(".quiz-explanation");
      assert.equal(await feedback.getAttribute("aria-live"), "polite");
      assert.match(await feedback.innerText(), index === 0 ? /Your choice:[\s\S]*Correct answer:/i : /^Correct\./i);
      assert.match(await correct.innerText(), /Correct answer/i); assert.match(await choice.innerText(), /Your choice/i);
      assert.equal(await choice.getAttribute("aria-pressed"), "true"); assert.equal(await row.locator(".quiz-option:enabled").count(), 0);
      await row.locator(`button[data-k="${correctKey}"]`).dispatchEvent("click"); assert.equal(await score.innerText(), String(index), "Score locks after one choice");
    }
    assert.equal(await score.innerText(), String(answers.length - 1));
    await page.locator(`#${id}Reset`).click(); assert.equal(await score.innerText(), "0");
    assert.equal(await host.locator("button:disabled, [data-answered], .correct, .incorrect").count(), 0);
    assert.equal(await rows.first().locator("button").first().evaluate(el => el === document.activeElement), true, "Quiz reset restores first-choice focus");
    assert.equal(await rows.first().locator(".quiz-explanation").textContent(), "");
  }
  return { questions: 27, explicitLabelsAndLiveFeedback: true, scoreOnce: true, resetAndFocus: true };
}
async function representativeControls(page) {
  const tabs = page.locator("#authors .author-tab");
  assert.ok(await tabs.count() > 1); await tabs.nth(1).click(); assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
  const panel = await tabs.nth(1).getAttribute("data-author");
  assert.equal(await page.locator(`#authors [data-panel="${panel}"]`).evaluate(el => el.classList.contains("hidden")), false); await tabs.first().click();
  await page.locator("#ws-next .workshop-button").nth(1).click(); assert.match(await page.locator("#ws-next").innerText(), /Outcome: differentiation deepened, cost up/);
  assert.equal((await progress(page)).ws2, true, "Real workshop choices mark practice");
  for (const { id, choices, outcome, key } of [
    { id: "sim-airline", choices: [/Cost leader:/, /Stay lean:/, /Reinvest:/], outcome: /CLEAR COST LEADER/, key: "sim1" },
    { id: "sim-focus", choices: [/Local Artisan Coffee:/, /Differentiation focus:/, /Deepen the offer:/, /Deepen:/], outcome: /NICHE LEADER/, key: "sim2" },
  ]) {
    const simulation = page.locator(`#${id}`);
    for (const choice of choices) await simulation.getByRole("button", { name: choice }).click();
    assert.match(await simulation.innerText(), outcome); assert.equal((await progress(page))[key], true, "Branch replacement still marks actual practice");
    await simulation.getByRole("button", { name: "Start again", exact: true }).click();
    assert.equal(await simulation.locator(".simulation-button").count(), id === "sim-airline" ? 3 : 2);
  }
  return { authorTabs: true, workshop: true, twoRepresentativeBranchesAndRestarts: true, actualChoiceProgress: true };
}

try {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 600]]) {
    const { page, context } = await freshPage(width, height), content = await staticContent(page), geometry = await noOverflow(page, `${width}px light`);
    if (captureOnly) report.checks.push({ viewport: width, content, geometry, captureOnly: true });
    else if (width === 1440) {
      report.checks.push({ viewport: width, content, tracking: await tracking(page), economics: await economics(page), models: await canvasAndDecay(page), classifiers: await classification(page), quizzes: await quizzes(page), controls: await representativeControls(page), geometry });
    } else {
      await keyboardRange(page, "#errcPrice", "ArrowRight"); assert.equal((await progress(page)).errc, true);
      await page.locator("#sQuiz .quiz-option").first().click(); assert.match(await page.locator("#sQuiz [data-question]").first().innerText(), /Your choice[\s\S]*Correct answer/i);
      await page.locator("#sQuizReset").click(); report.checks.push({ viewport: width, content, keyboardRangeAndQuizReset: true, geometry });
    }
    await page.locator("#canvasBox").scrollIntoViewIfNeeded(); await noOverflow(page, `${width}px canvas`); await screenshot(page, `canvas-${width}`);
    await screenshot(page, `outcomes-${width}`, "#learning-outcomes");
    await page.locator("#themeBtn").click(); assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), true);
    await noOverflow(page, `${width}px manual dark`); await screenshot(page, `manual-dark-outcomes-${width}`, "#learning-outcomes");
    await page.locator("#themeBtn").click(); assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), false);
    console.log(`Session 7 ${width}px checks passed.`); await context.close();
  }
  const { page, context } = await freshPage(390, 844, false);
  report.checks.push({ noJavaScript: await staticContent(page), staticOutcomesAndReadingsAvailable: true });
  await screenshot(page, "no-js-outcomes-390", "#learning-outcomes"); await context.close();
  assert.deepEqual(report.pageErrors, []); assert.deepEqual(report.writes, []); report.passed = true;
} catch (error) {
  report.passed = false; report.failure = { message: error.message, stack: error.stack }; console.error(error.stack); process.exitCode = 1;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await Promise.allSettled(contexts.map(context => context.close())); await browser.close();
  if (server) await new Promise(done => server.close(done));
}
console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, pageErrors: report.pageErrors.length, writes: report.writes.length, report: `${output}/report.json` }));
