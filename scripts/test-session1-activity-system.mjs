import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Coordinator readiness flag; this uses fresh public contexts and blocks HTTP writes.
if (!process.argv.includes('--preview-ready')) throw new Error('Confirm integrated preview readiness, then pass --preview-ready.');
const profile = (process.env.SESSION1_TEST_PROFILE || 'activity-system-local').replace(/[^\w-]/g, '-');
const output = `artifacts/session1-resources/${profile}`;
await mkdir(output, { recursive: true });
const publicDirectory = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const mime = { '.html': 'text/html;charset=utf-8', '.js': 'text/javascript;charset=utf-8', '.css': 'text/css;charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
let server;
let base = process.env.SESSION1_TEST_BASE_URL?.replace(/\/$/, '');
if (!base) {
  server = createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
      const file = resolve(publicDirectory, `.${decodeURIComponent(new URL(request.url, 'http://localhost').pathname)}`);
      if (!file.startsWith(publicDirectory + sep)) { response.writeHead(403).end(); return; }
      if (!(await stat(file)).isFile()) { response.writeHead(404).end(); return; }
      const body = await readFile(file);
      response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store', 'Content-Length': body.length });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(listen => server.listen(0, '127.0.0.1', listen));
  base = `http://127.0.0.1:${server.address().port}`;
}
assert.match(base, /^https?:\/\//);
const origin = new URL(base).origin;
const browser = await chromium.launch({ headless: true, channel: process.env.SESSION1_TEST_BROWSER_CHANNEL || undefined });
const contexts = [];
const report = { base, profile, checkedAt: new Date().toISOString(), publicReadOnly: true, checks: [], screenshots: [], writes: [], pageErrors: [], consoleErrors: [], blockedFrames: [] };
const expectedAnswers = [2, 1, 0, 2, 0, 1];
const expectedNodes = ['price', 'freq', 'util', 'crew', 'fleet', 'nomeal', 'noseat', 'nobag', 'point', 'auto'];
const expectedNames = ['Very low ticket prices', 'Frequent, reliable departures', 'High aircraft utilisation', 'Lean, productive ground crews', 'Standard 737 fleet', 'No meals', 'No seat assignments', 'No baggage transfers', 'Point-to-point short haul', 'Automated ticketing'];
const resourceIds = ['note-mintzberg', 'note-fit', 'note-positioning', 'note-modern-positioning', 'session1-folder'];

async function fresh(width, height, noScript = false) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark', permissions: [], javaScriptEnabled: !noScript, reducedMotion: 'reduce' });
  contexts.push(context);
  if (!noScript) await context.addInitScript(() => {
    for (const key of ['theme', 'pgpm-course-theme', 's1-theme']) localStorage.setItem(key, 'dark');
  });
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) {
      report.writes.push({ method: request.method(), path: url.pathname }); return route.abort();
    }
    if (request.resourceType() === 'document' && request.frame().parentFrame() && url.origin !== origin) {
      report.blockedFrames.push(`${url.origin}${url.pathname}`); return route.fulfill({ status: 204, body: '' });
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', error => report.pageErrors.push({ width, message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error' && message.location().url.startsWith(origin)) report.consoleErrors.push({ width, message: message.text().slice(0, 400) });
  });
  const response = await page.goto(`${base}/teaching/1-year-mba/session1.html`, { waitUntil: 'load', timeout: 90000 });
  assert.equal(response.status(), 200);
  await page.evaluate(() => document.fonts.ready);
  return { page, context };
}
async function screenshot(locator, name) {
  const file = `${output}/${name}.png`;
  await locator.screenshot({ path: file }); report.screenshots.push(file);
}
async function noOverflow(page, width, mode) {
  const sizes = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(sizes.document <= sizes.viewport + 1 && sizes.body <= sizes.viewport + 1, `${width}px ${mode}: no document horizontal overflow`);
  return sizes;
}
async function staticStructure(page) {
  for (const id of ['activity-system', 'porterMap', 'porterNodes', 'porterEdges', 'activityChecks', 'oeSorter', ...resourceIds]) assert.equal(await page.locator(`#${id}`).count(), 1, `${id} unique`);
  const structure = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
    return {
      duplicates: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
      missingAnchors: [...new Set([...document.querySelectorAll('a[href^="#"]')].map(link => link.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))))],
      graphInAuthorPanel: Boolean(document.getElementById('porterMap').closest('.author-panel')),
    };
  });
  assert.deepEqual(structure.duplicates, []);
  assert.deepEqual(structure.missingAnchors, []);
  assert.equal(structure.graphInAuthorPanel, false, 'Map is independent of reading tabs');
  const icon = 'https://www.swapnilsahoo.com/icon.svg?v=superman';
  for (const rel of ['icon', 'shortcut icon']) {
    const link = page.locator(`head link[rel="${rel}"]`);
    assert.equal(await link.count(), 1);
    assert.equal(await link.getAttribute('href'), icon, 'Canonical shared site icon');
  }
  assert.equal(await page.locator('#porterMap').getAttribute('role'), 'group');
  for (const id of ['porterNodeInfo', 'porterCopyMsg']) assert.equal(await page.locator(`#${id}`).getAttribute('aria-live'), 'polite');
  const edges = await page.locator('#porterEdges line').evaluateAll(lines => lines.map(line => [line.dataset.a, line.dataset.b].sort().join('|')));
  assert.equal(edges.length, 15);
  assert.equal(new Set(edges).size, 15, 'Undirected links contain no duplicates');
  assert.equal(await page.locator('#porterNodes > g').count(), 10);
  const geometry = await page.locator('#porterMap').evaluate(svg => {
    const box = svg.viewBox.baseVal;
    return [...svg.querySelectorAll('#porterNodes > g > circle')].every(circle => {
      const x = circle.cx.baseVal.value, y = circle.cy.baseVal.value, radius = circle.r.baseVal.value;
      return x - radius >= box.x && y - radius >= box.y && x + radius <= box.x + box.width && y + radius <= box.y + box.height;
    });
  });
  assert.equal(geometry, true, 'All nodes and focus rings fit within the SVG viewBox');
  return { ...structure, nodeCount: 10, uniqueEdges: 15, canonicalIcon: icon, focusRingsContained: true };
}
async function nodeChoices(page) {
  const chooser = page.locator('#porterActivitySelect');
  assert.equal(await chooser.locator('option').count(), 11);
  for (let index = 0; index < expectedNodes.length; index++) {
    const id = expectedNodes[index];
    const node = page.locator(`#porterNodes > g[data-id="${id}"]`);
    assert.equal(await node.getAttribute('role'), 'button');
    assert.equal(await node.getAttribute('tabindex'), '0');
    assert.ok((await node.getAttribute('aria-label')).includes(expectedNames[index]));
    await chooser.selectOption(id);
    assert.equal(await node.getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#porterNodes [aria-pressed="true"]').count(), 1);
    assert.ok((await page.locator('#porterNodeInfo').innerText()).includes(`Selected: ${expectedNames[index]}.`));
    assert.match(await page.locator('#porterNodeInfo').innerText(), /Direct links shown in this simplified map:/);
    const readable = await page.locator('#porterNodes > g').evaluateAll(groups => groups.every(group => getComputedStyle(group).opacity === '1' && [...group.querySelectorAll('text')].every(text => getComputedStyle(text).opacity === '1')));
    assert.equal(readable, true, 'Selecting connections never fades labels');
  }
  for (const [id, key] of [['crew', 'Enter'], ['fleet', ' ']]) {
    const node = page.locator(`#porterNodes > g[data-id="${id}"]`);
    await node.focus();
    assert.equal(await node.locator('circle').first().getAttribute('visibility'), 'visible', 'Visible SVG focus ring');
    await node.press(key);
    assert.equal(await chooser.inputValue(), id, 'Keyboard selection synchronizes dropdown');
    assert.equal(await node.getAttribute('aria-pressed'), 'true');
  }
  await page.locator('#porterNodes > g[data-id="crew"]').click();
  assert.equal(await chooser.inputValue(), 'crew', 'Pointer selection synchronizes dropdown');
  const crewText = await page.locator('#porterNodeInfo').innerText();
  for (const connected of ['Very low ticket prices', 'Frequent, reliable departures', 'High aircraft utilisation', 'No baggage transfers', 'No seat assignments', 'Standard 737 fleet']) assert.ok(crewText.includes(connected), `Written crew connection: ${connected}`);
  for (const [button, ids] of [['porterCopyOne', ['nomeal']], ['porterCopyThree', ['nomeal', 'noseat', 'auto']]]) {
    await page.locator(`#${button}`).click();
    assert.equal(await chooser.inputValue(), '');
    assert.equal(await page.locator('#porterNodes [aria-pressed="true"]').count(), 0);
    assert.deepEqual((await page.locator('#porterNodes [data-state="copied"]').evaluateAll(nodes => nodes.map(node => node.dataset.id))).sort(), [...ids].sort());
    assert.match(await page.locator('#porterCopyMsg').innerText(), /may|possible/i);
    assert.match(await page.locator('#porterCopyMsg').innerText(), /evidence|does not demonstrate/i);
  }
  await page.locator('#porterReset').click();
  assert.equal(await chooser.inputValue(), '');
  assert.equal(await page.locator('#porterNodes [aria-pressed="true"], #porterNodes [data-state="copied"]').count(), 0);
  assert.equal(await page.locator('#porterCopyMsg').innerText(), '');
  assert.match(await page.locator('#porterNodeInfo').innerText(), /Select any activity/);
  return { allNamedNodes: expectedNodes, keyboard: ['Enter', 'Space'], pointer: 'crew', copySubsets: [1, 3], reset: true, labelsNeverFaded: true };
}
async function quizzes(page) {
  const questions = page.locator('#activityChecks > li');
  assert.equal(await questions.count(), 6);
  assert.equal(await page.locator('#activityScore').innerText(), '0');
  const oe = page.locator('#oeSorter > li');
  await oe.nth(0).locator('[data-v="oe"]').click();
  assert.equal(await page.locator('#oeScore').innerText(), '1');
  const branches = [];
  for (let question = 0; question < 6; question++) {
    for (let choice = 0; choice < 3; choice++) {
      await page.locator('#activityChecksReset').click();
      assert.equal(await page.locator('#activityScore').innerText(), '0');
      assert.equal(await page.locator('#oeScore').innerText(), '1', 'New quiz reset leaves OE score unchanged');
      assert.equal(await questions.locator('button:disabled').count(), 0);
      assert.equal(await questions.locator('button[aria-pressed="true"]').count(), 0);
      const row = questions.nth(question), buttons = row.locator('button');
      assert.equal(await buttons.count(), 3);
      const originalCorrect = await buttons.nth(expectedAnswers[question]).innerText();
      await buttons.nth(choice).click();
      assert.equal(await buttons.locator(':scope').count(), 3);
      assert.equal(await row.locator('button:disabled').count(), 3, 'One answer locks all choices');
      assert.equal(await row.locator('button[aria-pressed="true"]').count(), 1);
      assert.equal(await buttons.nth(choice).getAttribute('aria-pressed'), 'true');
      assert.ok((await buttons.nth(expectedAnswers[question]).innerText()).includes(`${originalCorrect} · Correct answer`));
      assert.equal(await page.locator('#activityScore').innerText(), choice === expectedAnswers[question] ? '1' : '0');
      const verdict = row.locator('.verdict');
      assert.equal(await verdict.isVisible(), true);
      assert.equal(await verdict.getAttribute('aria-live'), 'polite');
      const feedback = await verdict.innerText();
      assert.ok(feedback.length > 70, 'Each branch gives explanatory feedback');
      assert.equal(feedback.startsWith('Correct.'), choice === expectedAnswers[question], 'Independent expected answer matches correctness');
      const score = await page.locator('#activityScore').innerText();
      await buttons.nth(choice).dispatchEvent('click');
      assert.equal(await page.locator('#activityScore').innerText(), score, 'Repeated event cannot count the same answer twice');
      branches.push({ question: question + 1, choice: choice + 1, correct: choice === expectedAnswers[question] });
    }
  }
  await page.locator('#activityChecksReset').click();
  assert.equal(await questions.first().locator('button').first().evaluate(button => button === document.activeElement), true, 'Reset restores question focus');
  assert.equal(await questions.locator('.verdict:not([hidden])').count(), 0);
  for (let question = 0; question < 6; question++) await questions.nth(question).locator('button').nth(expectedAnswers[question]).click();
  assert.equal(await page.locator('#activityScore').innerText(), '6');
  assert.equal(await questions.locator('button:disabled').count(), 18);
  for (const [question, value] of [[1, 'strategy'], [2, 'oe'], [3, 'strategy'], [4, 'oe'], [5, 'strategy']]) await oe.nth(question).locator(`[data-v="${value}"]`).click();
  assert.equal(await page.locator('#oeScore').innerText(), '6');
  assert.equal(await page.locator('#activityScore').innerText(), '6', 'OE score and new score are independent');
  assert.equal(await oe.locator('button:disabled').count(), 12);
  return { expectedAnswers, branches, fullScore: '6/6', repeatCannotCount: true, resetAllChoices: true, independentOEScore: '6/6' };
}

try {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 600]]) {
    const { context, page } = await fresh(width, height);
    assert.equal(await page.locator('html').evaluate(html => html.classList.contains('dark')), false, 'Light default despite OS/stored dark');
    const structure = await staticStructure(page);
    const selections = await nodeChoices(page);
    const practice = await quizzes(page);
    for (const tab of ['collis', 'mintzberg']) {
      await page.locator(`[data-author="${tab}"]`).click();
      assert.equal(await page.locator('#porterMap').isVisible(), true, `Map remains visible with ${tab} tab`);
    }
    await page.locator('#porterReset').click();
    const light = await noOverflow(page, width, 'light');
    await screenshot(page.locator('#activity-system > .grid').first(), `map-light-${width}`);
    if ([1440, 320].includes(width)) await screenshot(page.locator('#activity-system-practice'), `practice-light-${width}`);
    await page.locator('#themeBtn').click();
    assert.equal(await page.locator('html').evaluate(html => html.classList.contains('dark')), true);
    assert.equal(await page.locator('#themeBtn').getAttribute('aria-label'), 'Switch to light mode');
    const dark = await noOverflow(page, width, 'dark');
    await page.locator('#porterActivitySelect').selectOption('crew');
    await screenshot(page.locator('#activity-system > .grid').first(), `map-dark-${width}`);
    report.checks.push({ viewport: { width, height }, lightDefault: true, manualDark: true, light, dark, structure, selections, practice, mapIndependentOfTabs: true });
    await context.close();
  }
  const noScript = await fresh(390, 844, true);
  const story = noScript.page.locator('#activity-system details');
  await story.locator('summary').click();
  assert.equal(await story.locator('ul').isVisible(), true);
  const written = await story.innerText();
  for (const term of ['low fares', 'standard 737 fleet', 'no meals', 'no seat assignments', 'no baggage transfers', 'coordinated turnarounds', 'Fit alone does not guarantee profit']) assert.ok(written.includes(term), `No-script map text: ${term}`);
  assert.match(await noScript.page.locator('#activity-system-practice').innerText(), /interactive questions require JavaScript/);
  assert.equal(await noScript.page.locator('#activity-system-practice a[href="#s1rl-fit"]').count(), 1);
  await screenshot(story, 'written-map-no-script-390');
  report.checks.push({ noScript: { writtenMapReadable: true, reflectionAvailable: true } });
  const iconResponse = await noScript.context.request.get('https://www.swapnilsahoo.com/icon.svg?v=superman');
  assert.equal(iconResponse.status(), 200, 'Canonical shared icon is publicly available');
  assert.match(await iconResponse.text(), /<svg[\s>]/);
  report.checks.push({ canonicalIconHTTP: 200, svg: true });
  assert.deepEqual(report.writes, []);
  assert.deepEqual(report.pageErrors, []);
  assert.deepEqual(report.consoleErrors, []);
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.message;
  report.stack = error.stack?.slice(0, 2000);
  process.exitCode = 1;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ passed: report.passed, failure: report.failure, checks: report.checks.length, pageErrors: report.pageErrors.length, writes: report.writes.length, report: `${output}/report.json` }));
  for (const context of contexts) await context.close().catch(() => {});
  await browser.close();
  if (server) await new Promise(close => server.close(close));
}
