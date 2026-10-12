import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile, mkdir, stat, writeFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// Run only after the coordinator confirms the integrated preview ready.
// Isolated contexts and public GET/HEAD only; no account, message or submission.
if (!process.argv.includes("--preview-ready")) {
  throw new Error("Wait for the integrated Session 1 preview; then pass --preview-ready.");
}
const profile = (process.env.SESSION1_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const output = `artifacts/session1-resources/${profile}`;
await mkdir(output, { recursive: true });
const publicDirectory = resolve(fileURLToPath(new URL("../public/", import.meta.url)));
const mime = { ".html": "text/html;charset=utf-8", ".js": "text/javascript;charset=utf-8", ".css": "text/css;charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".pdf": "application/pdf" };
let server;
let base = process.env.SESSION1_TEST_BASE_URL?.replace(/\/$/, "");
if (!base) {
  server = createServer(async (request, response) => {
    try {
      if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
      const path = resolve(publicDirectory, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
      if (!path.startsWith(publicDirectory + sep)) { response.writeHead(403).end(); return; }
      if (!(await stat(path)).isFile()) { response.writeHead(404).end(); return; }
      const body = await readFile(path);
      response.writeHead(200, { "Content-Type": mime[extname(path)] || "application/octet-stream", "Cache-Control": "no-store", "Content-Length": body.length });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolveListen => server.listen(0, "127.0.0.1", resolveListen));
  base = `http://127.0.0.1:${server.address().port}`;
}
assert.match(base, /^https?:\/\//);
const origin = new URL(base).origin;
const path = "/teaching/1-year-mba/session1.html";
const browser = await chromium.launch({ headless: true, channel: process.env.SESSION1_TEST_BROWSER_CHANNEL || undefined });
const contexts = [];
const report = { base, profile, checkedAt: new Date().toISOString(), method: "Fresh public browser contexts; HTTP writes blocked", checks: [], screenshots: [], pageErrors: [], consoleErrors: [], writes: [], blockedFrames: [] };
const links = {
  "note-mintzberg": "https://drive.google.com/file/d/1VZSnQwiIC7ED8bPV77rPy2G_77510chu/view?usp=sharing",
  "note-fit": "https://drive.google.com/file/d/1NXGk0YlJ1YYGIUBsKGzWrSlOyOvkKUi2/view?usp=sharing",
  "note-positioning": "https://drive.google.com/file/d/1QJoeKLMCh_HEsi9oYrjSY0JhbDaB2uy3/view?usp=sharing",
  "session1-folder": "https://drive.google.com/drive/folders/1FKvvfGngQwrSTkGfXB4K-oD7CHASaPw0",
};
const storyIds = ["story-apple", "story-ikea", "story-slack", "story-dmart", "story-nykaa", "story-zomato"];
async function contextFor(width, height, extra = {}) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: "dark", permissions: [], ...extra });
  contexts.push(context);
  if (extra.javaScriptEnabled !== false) await context.addInitScript(() => {
    for (const key of ["theme", "pgpm-course-theme", "s1-theme"]) localStorage.setItem(key, "dark");
    window.__session1Injected = false;
  });
  await context.route("**/*", route => {
    const request = route.request(), url = new URL(request.url());
    if (!["GET", "HEAD"].includes(request.method())) {
      report.writes.push({ method: request.method(), path: url.pathname }); return route.abort();
    }
    if (request.resourceType() === "document" && request.frame().parentFrame() && url.origin !== origin) {
      report.blockedFrames.push(`${url.origin}${url.pathname}`); return route.fulfill({ status: 204, body: "" });
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.on("pageerror", error => report.pageErrors.push({ viewport: width, message: error.message, stack: error.stack?.slice(0, 900) }));
  page.on("console", message => {
    if (message.type() === "error" && (!message.location().url || message.location().url.startsWith(origin))) report.consoleErrors.push({ viewport: width, message: message.text().slice(0, 500), source: message.location().url });
  });
  return { context, page };
}
async function visit(page) {
  const response = await page.goto(base + path, { waitUntil: "load", timeout: 90000 });
  assert.equal(response.status(), 200, "Session 1 HTTP status");
  await page.evaluate(() => document.fonts.ready);
  return response;
}
async function screenshot(page, name) {
  const destination = `${output}/${name}.png`;
  await page.screenshot({ path: destination }); report.screenshots.push(destination);
}
async function noOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(dimensions.document <= dimensions.viewport + 1 && dimensions.body <= dimensions.viewport + 1, `${label}: horizontal overflow`);
  return dimensions;
}
async function resources(page, context) {
  await page.locator("#resource-guides").waitFor();
  for (const [id, href] of Object.entries(links)) {
    assert.equal(await page.locator(`#${id}`).getAttribute("href"), href, `Approved ${id} URL`);
    assert.ok((await page.locator(`#${id}`).innerText()).trim().length > 3, "Meaningful resource label");
  }
  for (const id of [...storyIds, "strategy-stream", "positioning-prompts", "s1-resource-lab"]) assert.equal(await page.locator(`#${id}`).count(), 1, `${id} unique mount`);
  for (const id of storyIds) {
    assert.ok((await page.locator(`#${id}`).innerText()).length > 100, `${id} has explanatory story content`);
    assert.ok(await page.locator(`#${id} img`).count() >= 1, `${id} has a contextual photo`);
  }
  const patternDiagram = await page.locator("#strategy-stream").innerText();
  for (const concept of [/intended/i, /deliberate/i, /emergent/i, /unreali[sz]ed/i, /reali[sz]ed/i]) assert.match(patternDiagram, concept, "Diagram explains the strategy-pattern distinctions in accessible text");
  const html = await page.locator("html").evaluate(el => {
    const ids = [...el.querySelectorAll("[id]")].map(node => node.id);
    const duplicates = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
    const missingAnchors = [...el.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute("href")).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1))));
    return { duplicates, missingAnchors: [...new Set(missingAnchors)] };
  });
  assert.deepEqual(html.duplicates, [], "No duplicate live IDs");
  assert.deepEqual(html.missingAnchors, [], "All same-page anchors resolve");
  const localImages = page.locator('img[src^="/images/teaching/session1/"]');
  assert.ok(await localImages.count() >= 6, "At least six contextual Session 1 photographs");
  const images = [];
  for (const image of await localImages.all()) {
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(el => el.decode());
    const state = await image.evaluate(el => ({ path: new URL(el.currentSrc || el.src).pathname, loaded: el.complete && el.naturalWidth > 0, alt: el.alt, width: el.naturalWidth, height: el.naturalHeight }));
    assert.ok(state.loaded && state.alt.trim(), "Local image loads with alt text"); images.push(state);
  }
  assert.ok(new Set(images.map(image => image.path)).size >= 6, "At least six distinct contextual photographs");
  for (const asset of ["course-ui.js", "course-ui.css", "session1-resource-lab.js", "session1-resource-lab.css"]) {
    const response = await context.request.get(`${base}/teaching/1-year-mba/${asset}`);
    assert.equal(response.status(), 200, `Core asset ${asset}`);
    assert.ok((await response.body()).length > 100, `Nonempty ${asset}`);
  }
  return { approvedResourceURLs: Object.keys(links), externalDriveFilesOpened: false, images, ...html };
}
async function phoenix(page) {
  const simulation = page.locator("#simulation-container");
  const outcomes = [
    { steps: [2, 5], title: "STAGNATION: The Niche Player" },
    { steps: [3, 6], title: "FAILURE: Brand Confusion" },
    { steps: [3, 7], title: "FAILURE: The Inevitable End" },
    { steps: [2, 4, 8], title: "HIGH RISK/REWARD: Production Hell" },
    { steps: [2, 4, 9], title: "SLOW & STEADY: Sustainable Growth" },
  ];
  for (const outcome of outcomes) {
    assert.match(await simulation.locator("h4").innerText(), /Step 1/);
    for (const next of outcome.steps) {
      const choice = simulation.locator(`button[data-next="${next}"]`);
      assert.equal(await choice.getAttribute("type"), "button");
      await choice.focus(); await choice.press("Enter");
    }
    assert.equal(await simulation.locator("h4").innerText(), outcome.title);
    const reset = simulation.getByRole("button", { name: "Restart Simulation", exact: true });
    await reset.focus(); await reset.press("Enter");
    assert.match(await simulation.locator("h4").innerText(), /Step 1/);
    assert.equal(await simulation.locator("button[data-next]").count(), 2);
  }
  return { keyboardBranches: outcomes.map(item => item.title), resetToFirstStep: true };
}
async function safeStatement(page) {
  const payload = '<svg id="session1-injected" onload="window.__session1Injected=true"></svg>';
  await page.locator("#sObj").fill(payload);
  await page.locator("#sScope").fill("Serve the pilot segment only, not everyone");
  await page.locator("#sAdv").fill("A coherent delivery activity system");
  await page.waitForTimeout(100);
  assert.equal(await page.locator("#session1-injected").count(), 0, "Learner input must not create markup");
  assert.equal(await page.evaluate(() => window.__session1Injected), false, "No untrusted event handler executes");
  assert.ok((await page.locator("#sOut").innerText()).includes(payload), "Statement retains literal learner text");
  for (const id of ["sObj", "sScope", "sAdv"]) await page.locator(`#${id}`).fill("");
  return { literalLearnerText: true, injectedMarkup: false };
}
async function workshopAndTabs(page) {
  const opener = page.locator("#workshop .workshop-button").first();
  await opener.focus(); await opener.press("Enter");
  const modal = page.locator("#modal");
  await modal.waitFor({ state: "visible" });
  assert.ok(await page.getByRole("dialog").isVisible(), "Workshop exposes dialog semantics");
  assert.match(await page.locator("#modal-title").innerText(), /Operational Excellence/);
  assert.ok(await modal.evaluate(el => el.contains(document.activeElement)), "Workshop focus moves inside dialog");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => document.getElementById("modal").classList.contains("hidden"));
  assert.equal(await opener.evaluate(el => el === document.activeElement), true, "Workshop closing restores focus");
  const tabs = page.getByRole("tablist", { name: "The three articles", exact: true });
  await tabs.locator('[data-author="porter"]').focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await tabs.locator('[data-author="collis"]').getAttribute("aria-selected"), "true");
  await page.keyboard.press("Home");
  assert.equal(await tabs.locator('[data-author="porter"]').getAttribute("aria-selected"), "true");
  return { workshopKeyboardOpenEscapeFocusRestore: true, readingTabArrowHome: true };
}

// The three new resource labs are exercised below using their public controls.
async function keyboardClick(locator) {
  await locator.focus(); await locator.press("Enter");
}
async function metric(article, kind, name) {
  const text = (await article.locator(`[data-${kind}-metric="${name}"]`).innerText()).replaceAll("−", "-");
  if (/no finite/i.test(text)) return null;
  const match = text.match(/-?\s*₹?\s*[\d,]+(?:\.\d+)?/);
  assert.ok(match, `Readable numeric ${kind}/${name}`);
  return Number(match[0].replace(/[₹,\s]/g, ""));
}
async function metrics(article, kind, expected) {
  const actual = {};
  for (const name of Object.keys(expected)) actual[name] = await metric(article, kind, name);
  assert.deepEqual(actual, expected, `${kind}: independently expected model outputs`);
  return actual;
}
async function resourceLabs(page, width) {
  const mount = page.locator("#s1-resource-lab");
  for (const key of ["pattern", "fit", "position"]) await mount.locator(`[data-s1rl="${key}"]`).waitFor();
  const pattern = mount.locator('[data-s1rl="pattern"]'), fit = mount.locator('[data-s1rl="fit"]'), position = mount.locator('[data-s1rl="position"]');
  for (const article of [pattern, fit, position]) assert.match(await article.innerText(), /fictional/i, "Cases identify their fictional assumptions");
  assert.match(await fit.innerText(), /one unit = one meal; period = one day/i);
  assert.match(await fit.innerText(), /not a demand prediction/i);
  const classifications = {
    learn: [["intended", "deliberate", "realized"], ["emergent", "realized"], ["intended", "unrealized"]],
    freeze: [["intended", "deliberate", "realized"], ["intended", "deliberate", "realized"]],
    rush: [["intended", "unrealized"], ["intended"], ["trial"]],
  };
  const patternBranches = [];
  for (const branch of width === 1440 ? ["learn", "freeze", "rush"] : ["learn"]) {
    await pattern.locator('[data-s1rl-control="pattern-route"]').selectOption(branch);
    await keyboardClick(pattern.locator('[data-s1rl-action="pattern-run"]'));
    assert.ok(await pattern.locator("[data-pattern-aftermath]").isVisible());
    assert.equal(await pattern.locator("[data-pattern-classifier] fieldset").count(), classifications[branch].length);
    const check = pattern.locator('[data-s1rl-action="pattern-check"]'), feedback = pattern.locator('[data-s1rl-output="pattern"]');
    await keyboardClick(check);
    assert.match(await feedback.innerText(), /reconsider the evidence/i, "Empty labels give evidence-based correction");
    for (const [strand, keys] of classifications[branch].entries()) {
      for (const key of keys) {
        const choice = pattern.locator(`[data-strand="${strand}"][value="${key}"]`);
        await choice.focus(); await choice.press("Space"); assert.equal(await choice.isChecked(), true);
      }
    }
    await keyboardClick(check);
    assert.doesNotMatch(await feedback.innerText(), /reconsider the evidence/i);
    assert.equal((await feedback.innerText()).match(/supported by the record/g)?.length, classifications[branch].length);
    if (branch === "rush") assert.match(await feedback.innerText(), /insufficient to establish an emergent/i, "Single reaction is not equated to emergence");
    patternBranches.push({ branch, supportedStrands: classifications[branch].length });
    await keyboardClick(pattern.locator('[data-s1rl-action="reset"]'));
    assert.equal(await pattern.locator('[data-s1rl-control="pattern-route"]').inputValue(), "learn");
    assert.equal(await pattern.locator("[data-pattern-aftermath]").isVisible(), false);
    assert.equal(await pattern.locator("[data-pattern-classifier] input").count(), 0);
  }
  const baseline = await metrics(fit, "fit", { variable: 115, contribution: 5, fixed: 2400, capacity: 150, breakeven: 480, quantity: 140, remaining: -1700 });
  for (const key of ["menu", "preorder", "routes", "coord"]) {
    const choice = fit.locator(`[data-fit="${key}"]`); await choice.focus(); await choice.press("Space"); assert.equal(await choice.isChecked(), true);
  }
  const coherent = await metrics(fit, "fit", { variable: 87, contribution: 33, fixed: 2700, capacity: 200, breakeven: 82, quantity: 140, remaining: 1920 });
  assert.match(await fit.locator("[data-fit-connections]").innerText(), /reinforc|optim/i, "Numerical change has a written causal connection");
  const extra = fit.locator('[data-fit="extra"]'); await extra.focus(); await extra.press("Space");
  const conflicting = await metrics(fit, "fit", { variable: 126, contribution: -6, fixed: 2700, capacity: 120, breakeven: null, quantity: 120, remaining: -3420 });
  assert.match(await fit.locator('[data-s1rl-output="fit"]').innerText(), /20.*orders|20.*unserved/i);
  await fit.locator("[data-fit-table]").scrollIntoViewIfNeeded(); await screenshot(page, `fit-consequences-light-${width}`);
  await keyboardClick(fit.locator('[data-s1rl-action="reset"]'));
  assert.equal(await fit.locator("[data-fit]:checked").count(), 0);
  await metrics(fit, "fit", baseline);
  const positionRuns = [];
  const focusedCases = width === 1440 ? [
    ["variety", { price: 100, variable: 70, contribution: 30, fixed: 1800, capacity: 140, breakeven: 60, remaining: 600 }],
    ["needs", { price: 130, variable: 90, contribution: 40, fixed: 2400, capacity: 100, breakeven: 60, remaining: 800 }],
    ["access", { price: 110, variable: 75, contribution: 35, fixed: 2400, capacity: 130, breakeven: 69, remaining: 400 }],
  ] : [["access", { price: 110, variable: 75, contribution: 35, fixed: 2400, capacity: 130, breakeven: 69, remaining: 400 }]];
  const control = name => position.locator(`[data-s1rl-control="position-${name}"]`);
  const positionFeedback = position.locator('[data-s1rl-output="position"]');
  for (const [scenario, expected] of focusedCases) {
    await control("scenario").selectOption(scenario);
    for (const field of ["lens", "design", "boundary"]) assert.equal(await control(field).inputValue(), "", "Changing scenario clears earlier decisions");
    assert.equal((await positionFeedback.innerText()).trim(), "");
    await control("lens").selectOption(scenario); await control("design").selectOption("focused"); await control("boundary").selectOption("refuse");
    await keyboardClick(position.locator('[data-s1rl-action="position-run"]'));
    const outputMetrics = await metrics(position, "position", expected);
    assert.match(await positionFeedback.innerText(), /primary lens fits the stated trigger/i);
    assert.match(await positionFeedback.innerText(), /not a business forecast/i);
    positionRuns.push({ scenario, design: "focused", boundary: "refuse", metrics: outputMetrics });
  }
  if (width === 1440) {
    await control("scenario").selectOption("needs"); await control("lens").selectOption("variety"); await control("design").selectOption("broad"); await control("boundary").selectOption("refuse");
    await keyboardClick(position.locator('[data-s1rl-action="position-run"]'));
    assert.equal(await metric(position, "position", "contribution"), 62);
    assert.match(await positionFeedback.innerText(), /revisit your primary lens/i);
    assert.match(await positionFeedback.innerText(), /omits delivery timing and labeling/i);
    assert.match(await positionFeedback.innerText(), /arithmetic cannot establish/i, "Higher contribution does not certify a complete customer bundle");
    positionRuns.push({ scenario: "needs", design: "broad", misleadingArithmeticCorrected: true });
    await control("scenario").selectOption("access"); await control("lens").selectOption("access"); await control("design").selectOption("broad"); await control("boundary").selectOption("refuse");
    await keyboardClick(position.locator('[data-s1rl-action="position-run"]'));
    await metrics(position, "position", { contribution: -20, capacity: 50, breakeven: null, remaining: -3400 });
    const refusalText = (await positionFeedback.innerText()).split('Refusal and cost:')[1].split('Position check:')[0];
    assert.doesNotMatch(refusalText, /preserve.*consolidated|complete bundle|standardized prep/i, "Declining an extra does not repair an unsuitable base design");
    positionRuns.push({ scenario: "access", design: "broad", contribution: -20, capacity: 50 });
    await control("boundary").selectOption("accept");
    await keyboardClick(position.locator('[data-s1rl-action="position-run"]'));
    await metrics(position, "position", { price: 110, variable: 170, contribution: -60, fixed: 2400, capacity: 0, breakeven: null, remaining: -2400 });
    assert.match(await positionFeedback.innerText(), /at 0 feasible assumed orders/);
    positionRuns.push({ scenario: "access", design: "broad", boundary: "accept", zeroCapacity: true, remaining: -2400 });
  }
  await control("scenario").selectOption("access"); await control("lens").selectOption("access"); await control("design").selectOption("focused"); await control("boundary").selectOption("accept");
  await keyboardClick(position.locator('[data-s1rl-action="position-run"]'));
  const expanded = await metrics(position, "position", { price: 110, variable: 115, contribution: -5, fixed: 2400, capacity: 80, breakeven: null, remaining: -2800 });
  assert.match(await positionFeedback.innerText(), /extra reduces capacity and changes the cost structure/i);
  await positionFeedback.scrollIntoViewIfNeeded(); await screenshot(page, `position-consequences-light-${width}`);
  positionRuns.push({ scenario: "access", design: "focused", boundary: "accept", metrics: expanded });
  await keyboardClick(position.locator('[data-s1rl-action="reset"]'));
  assert.equal(await control("scenario").inputValue(), "variety");
  for (const field of ["lens", "design", "boundary"]) assert.equal(await control(field).inputValue(), "");
  assert.equal((await positionFeedback.innerText()).trim(), "");
  assert.equal(await mount.locator("input[type='text'], textarea").count(), 0, "New labs use bounded fixed choices, not echoed untrusted text");
  return { mounted: ["pattern", "fit", "position"], patternBranches, patternReset: true,
    fixedFictionalAssumptions: true, fit: { baseline, coherent, conflicting, reset: true }, positionRuns, positionReset: true };
}

try {
  for (const [width, height] of [[1440, 900], [390, 844], [320, 600]]) {
    const { context, page } = await contextFor(width, height);
    await visit(page);
    assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), false, "Light is default despite OS/stored dark");
    const resourceCheck = await resources(page, context);
    if ([1440,320].includes(width)) {
      await screenshot(page.locator('.s1-story-grid'), `business-stories-${width}`);
      await screenshot(page.locator('#strategy-stream'), `strategy-stream-${width}`);
      await screenshot(page.locator('#positioning-prompts'), `positioning-prompts-${width}`);
    }
    await page.locator("#resource-guides").scrollIntoViewIfNeeded();
    const light = await noOverflow(page, `${width} light`);
    await screenshot(page, `resources-light-${width}`);
    const labs = await resourceLabs(page, width);
    await page.locator("#s1-resource-lab").scrollIntoViewIfNeeded();
    await screenshot(page, `labs-light-${width}`);
    let existing;
    if (width === 1440) existing = { phoenix: await phoenix(page), statement: await safeStatement(page), controls: await workshopAndTabs(page) };
    const theme = page.locator("#themeBtn");
    await theme.focus(); await theme.press("Enter");
    assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), true);
    assert.equal(await theme.getAttribute("aria-label"), "Switch to light mode");
    await page.locator("#s1-resource-lab").scrollIntoViewIfNeeded();
    const dark = await noOverflow(page, `${width} dark`);
    await screenshot(page, `labs-dark-${width}`);
    await theme.focus(); await theme.press("Enter");
    assert.equal(await page.locator("html").evaluate(el => el.classList.contains("dark")), false);
    report.checks.push({ viewport: { width, height }, lightDefault: true, manualDark: true, light, dark, resources: resourceCheck, labs, existing });
    await context.close();
  }
  const { context, page } = await contextFor(390, 844, { javaScriptEnabled: false });
  await visit(page);
  assert.ok(await page.locator("h1").isVisible());
  assert.ok((await page.locator("#q1").innerText()).length > 500, "No-script lesson remains useful");
  assert.ok((await page.locator("#readings").innerText()).includes("Porter"), "No-script readings remain available");
  for (const id of Object.keys(links)) assert.equal(await page.locator(`#${id}`).getAttribute("href"), links[id], "Static resource links survive no-script");
  for (const id of storyIds) assert.ok((await page.locator(`#${id}`).innerText()).length > 100, "Static stories survive no-script");
  await page.locator("#resource-guides").scrollIntoViewIfNeeded();
  await screenshot(page, "resources-no-script-390");
  report.checks.push({ noScript: { lesson: true, readings: true, resourceLinks: true, sixStories: true } });
  await context.close();
  const missingChart = await contextFor(1440, 900);
  await missingChart.context.route("https://cdn.jsdelivr.net/npm/chart.js", route => route.fulfill({
    status: 200, contentType: "text/javascript", body: "/* Controlled unavailable Chart.js transport for dependency isolation check. */",
  }));
  await visit(missingChart.page);
  assert.equal(await missingChart.page.evaluate(() => typeof window.Chart), "undefined");
  await phoenix(missingChart.page); await workshopAndTabs(missingChart.page);
  report.checks.push({ missingChartUIMock: { chartAvailable: false, legacyPhoenixAndWorkshopsStillWork: true, notAnActualCDNOutage: true } });
  await missingChart.context.close();
  assert.deepEqual(report.writes, []);
  assert.deepEqual(report.pageErrors, []);
  assert.deepEqual(report.consoleErrors, []);
  report.passed = true;
} catch (error) {
  report.passed = false; report.failure = error.message; process.exitCode = 1;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  for (const context of contexts) await context.close().catch(() => {});
  await browser.close();
  if (server) await new Promise(resolveClose => server.close(resolveClose));
}
