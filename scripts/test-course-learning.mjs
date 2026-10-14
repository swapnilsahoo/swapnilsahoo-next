import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Public, read-only QA. The flag coordinates the shared preview; it is not an approval request.
if (!process.argv.includes('--preview-ready')) throw new Error('Wait for the integrated course preview, then pass --preview-ready.');
const profile = (process.env.COURSE_TEST_PROFILE || 'local').replace(/[^\w-]/g, '-');
const output = `artifacts/session1-resources/course-rollout/test-${profile}`;
await mkdir(output, { recursive: true });
const publicDirectory = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const mime = { '.html': 'text/html;charset=utf-8', '.js': 'text/javascript;charset=utf-8', '.css': 'text/css;charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.vtt': 'text/vtt;charset=utf-8' };
const modules = [3, 4, 5, 8, 9, 10, 11, 12, 13];
// Reviewed pedagogical fixtures, independent of the renderer's implementation.
const answers = { 3: [1, 0, 2, 1], 4: [2, 0, 1, 2], 5: [0, 2, 1, 0], 8: [1, 0, 2, 1], 9: [2, 0, 1, 2], 10: [0, 2, 1, 0], 11: [1, 2, 0, 1], 12: [2, 0, 1, 2], 13: [0, 2, 1, 0] };
const icon = 'https://www.swapnilsahoo.com/icon.svg?v=superman';
const viewports = [[1440, 900], [768, 1024], [390, 844], [320, 600]];
const report = { profile, checkedAt: new Date().toISOString(), method: 'Fresh public contexts; HTTP writes and external iframe documents blocked', checks: [], screenshots: [], pageErrors: [], writes: [], blockedFrames: [], limitations: ['No real phone, assistive-technology, account, message, enrolment, payment or private learner operation.', 'Existing numerical engines and all old question banks are preserved, not exhaustively retested by this rollout check.', 'No-JavaScript geometry checks cover the new additions. Pre-existing Session 1, 6 and 7 outcomes and whole legacy no-JavaScript page layout are outside that geometry scope.'] };
let server, base = process.env.COURSE_TEST_BASE_URL?.replace(/\/$/, '');
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
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  base = `http://127.0.0.1:${server.address().port}`;
}
assert.match(base, /^https?:\/\//);
report.base = base;
const origin = new URL(base).origin;
const browser = await chromium.launch({ headless: true, channel: process.env.COURSE_TEST_BROWSER_CHANNEL || undefined });
const contexts = new Set();
async function openLesson(session, width, height, javaScriptEnabled = true) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'dark', javaScriptEnabled, permissions: [] });
  contexts.add(context);
  if (javaScriptEnabled) await context.addInitScript(() => {
    ['theme', 'pgpm-course-theme', ...Array.from({ length: 13 }, (_, n) => `s${n + 1}-theme`)].forEach(key => localStorage.setItem(key, 'dark'));
    for (let n = 1; n <= 13; n++) localStorage.removeItem(`pgpm-v02-session${n}-progress`);
  });
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (!['GET', 'HEAD'].includes(request.method())) { report.writes.push({ session, method: request.method(), path: url.pathname }); return route.abort(); }
    if (request.resourceType() === 'document' && request.frame().parentFrame() && url.origin !== origin) {
      report.blockedFrames.push({ session, url: url.origin + url.pathname });
      return route.fulfill({ status: 204, body: '' });
    }
    return route.continue();
  });
  const page = await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror', error => report.pageErrors.push({ session, width, message: error.message }));
  const response = await page.goto(`${base}/teaching/1-year-mba/session${session}.html`, { waitUntil: 'load', timeout: 90000 });
  assert.equal(response.status(), 200, `Session ${session} renders HTTP 200`);
  if (javaScriptEnabled) await page.evaluate(() => document.fonts.ready);
  return { page, context };
}
async function capture(page, name, selector) {
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator(selector).evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  const destination = `${output}/${name}.png`;
  await page.screenshot({ path: destination });
  report.screenshots.push(destination);
}
async function staticChecks(page, session, javaScriptEnabled) {
  const outcomes = page.locator('#learning-outcomes');
  assert.equal(await outcomes.count(), 1, `S${session}: one outcomes section`);
  assert.equal(await outcomes.locator('li').count(), 5, `S${session}: five learning outcomes`);
  assert.ok(await outcomes.evaluate(el => {
    const first = [...document.querySelectorAll('section')].find(node => !['top', 'learning-outcomes', 'session-practice-lab'].includes(node.id));
    return first && Boolean(el.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING);
  }), `S${session}: outcomes precede the first teaching section`);
  assert.equal(await outcomes.locator('#learning-outcomes-title').count(), 1);
  for (const anchor of await outcomes.locator('a[href^="#"]').all()) assert.equal(await page.locator(await anchor.getAttribute('href')).count(), 1, `S${session}: outcome anchor resolves`);
  for (const rel of ['icon', 'shortcut icon']) assert.equal(await page.locator(`link[rel="${rel}"]`).getAttribute('href'), icon, `S${session}: shared favicon`);
  assert.equal(await page.locator('html').evaluate(el => el.classList.contains('dark')), false, `S${session}: light default with OS/stored dark`);
  const ids = await page.locator('[id]').evaluateAll(nodes => nodes.map(node => node.id));
  assert.deepEqual(ids.filter((id, index) => ids.indexOf(id) !== index), [], `S${session}: unique ${javaScriptEnabled ? 'live' : 'static'} IDs`);
  assert.ok((await page.locator('#readings').textContent()).trim().length > 150, `S${session}: reading guidance is available`);
  const newSections = await page.locator('#learning-outcomes, #session-practice-lab').evaluateAll(nodes => nodes.map(node => ({ id: node.id, left: node.getBoundingClientRect().left, right: node.getBoundingClientRect().right, clientWidth: node.clientWidth, scrollWidth: node.scrollWidth, viewport: innerWidth })));
  const checkGeometry = javaScriptEnabled || ![1, 6, 7].includes(session);
  if (checkGeometry) for (const box of newSections) assert.ok(box.left >= -1 && box.right <= box.viewport + 1 && box.scrollWidth <= box.clientWidth + 1, `S${session}: new section containment ${JSON.stringify(box)}`);
  return { session, javaScriptEnabled, outcomes: 5, anchors: 'resolve', sharedIcon: true, lightDefault: true, geometryChecked: checkGeometry, containment: newSections };
}
async function preservedSource(page, session) {
  let baseline;
  try { baseline = await readFile(`artifacts/session1-resources/course-rollout/baseline/session${session}.html`, 'utf8'); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { session, baseline: 'not available in this checkout; preservation was checked during the rollout' };
  }
  const original = baseline.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const response = await page.request.get(page.url());
  assert.equal(response.status(), 200);
  const current = (await response.text()).replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  const oldIDs = [...original.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const currentIDs = [...current.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  for (const id of oldIDs) assert.ok(currentIDs.includes(id), `S${session}: original source ID ${id} remains`);
  const originalHref = await page.evaluate(original => [...new Set([...new DOMParser().parseFromString(original, 'text/html').querySelectorAll('[href]')].map(node => node.getAttribute('href')))], original);
  const liveHref = await page.evaluate(current => [...new DOMParser().parseFromString(current, 'text/html').querySelectorAll('[href]')].map(node => node.getAttribute('href')), current);
  for (const href of originalHref) assert.ok(liveHref.includes(href), `S${session}: original resource/navigation link remains: ${href}`);
  // Paragraph text is compared after parsing, so additions to surrounding navigation cannot hide a deletion.
  const lost = await page.evaluate(({ original, current, session }) => {
    const normalise = text => text.replace(/\s+/g, ' ').trim();
    const parsed = new DOMParser().parseFromString(original, 'text/html');
    const before = [...parsed.querySelectorAll('p')].map(p => normalise(p.textContent)).filter(text => text.length > 30);
    const live = [...new DOMParser().parseFromString(current, 'text/html').querySelectorAll('p')].map(p => normalise(p.textContent));
    return before.filter(text => !live.includes(text) && !(session === 13 && /90 minutes|1\.5 hours|1\.5 h/.test(text)));
  }, { original, current, session });
  assert.deepEqual(lost, [], `S${session}: original source paragraphs remain`);
  return { session, originalIDs: oldIDs.length, originalLinks: originalHref.length, originalParagraphs: 'preserved; Session 13 duration corrected separately' };
}
async function moduleChecks(page, session) {
  const lab = page.locator('#session-practice-lab');
  assert.equal(await lab.count(), 1);
  assert.ok(await lab.evaluate(el => el.classList.contains('course-learning')));
  assert.equal(await lab.locator('.course-learning-cases > article').count(), 3, `S${session}: hypothetical, global and Indian illustrations`);
  const caseText = await lab.locator('.course-learning-cases').innerText();
  assert.match(caseText, /hypothetical/i); assert.match(caseText, /global/i); assert.match(caseText, /Indian/i);
  assert.ok((await lab.locator('details').count()) >= 2, `S${session}: native discussion or reading disclosures`);
  assert.match(await lab.innerText(), /reading|resource|course.pack/i, `S${session}: reading-to-practice map`);
  assert.ok((await lab.locator('ol.course-learning-steps, ul.course-learning-steps').count()) >= 1, `S${session}: visible diagram text equivalent`);
  const svg = lab.locator('svg[role="img"]').first();
  assert.equal(await svg.count(), 1);
  assert.ok((await svg.locator('title').textContent()).trim().length > 5);
  assert.ok((await svg.locator('desc').textContent()).trim().length > 40);
  const labelled = (await svg.getAttribute('aria-labelledby')).split(/\s+/);
  assert.equal(labelled.length, 2);
  for (const id of labelled) assert.equal(await lab.locator(`[id="${id}"]`).count(), 1);
  const data = await page.locator('#course-learning-data').evaluate(el => JSON.parse(el.textContent));
  assert.equal(data.session, session);
  assert.deepEqual(data.questions.map(q => q.a), answers[session], `S${session}: independent reviewed answer fixtures`);
  assert.equal(await page.locator('#course-learning-checks > li').count(), 4);
  assert.equal(await page.locator('#course-learning-checks button').count(), 12);
  assert.ok(await page.locator('#course-learning-reset').isVisible());
  for (const anchor of await lab.locator('a[href^="#"]').all()) assert.equal(await page.locator(await anchor.getAttribute('href')).count(), 1, `S${session}: lab anchor resolves`);
  return data.questions;
}
async function resetChecks(page) {
  await page.locator('#course-learning-reset').click();
  assert.equal(await page.locator('#course-learning-score').innerText(), '0');
  assert.equal(await page.locator('#course-learning-checks button:disabled').count(), 0);
  assert.equal(await page.locator('#course-learning-checks button[aria-pressed=true]').count(), 0);
  assert.equal(await page.locator('#course-learning-checks .course-learning-feedback:visible').count(), 0);
  assert.equal(await page.locator('#course-learning-checks button').first().evaluate(el => el === document.activeElement), true, 'Reset restores first-choice keyboard focus');
}
async function branchChecks(page, session, questions) {
  let branches = 0;
  for (let index = 0; index < questions.length; index++) {
    for (let choice = 0; choice < 3; choice++) {
      await resetChecks(page);
      const row = page.locator('#course-learning-checks > li').nth(index), button = row.locator('button').nth(choice);
      await button.click();
      assert.equal(await page.locator('#course-learning-score').innerText(), String(Number(choice === answers[session][index])));
      assert.equal(await row.locator('button:disabled').count(), 3);
      assert.match(await button.innerText(), /Your choice/);
      assert.match(await row.locator('button').nth(answers[session][index]).innerText(), /Correct answer/);
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      assert.equal(await row.locator('.course-learning-feedback').innerText(), questions[index].feedback[choice]);
      assert.equal(await row.locator('.course-learning-feedback').getAttribute('aria-live'), 'polite');
      const previous = await page.locator('#course-learning-score').innerText();
      await row.locator('button').nth(answers[session][index]).dispatchEvent('click');
      assert.equal(await page.locator('#course-learning-score').innerText(), previous, 'Locked choices cannot award repeat credit');
      branches++;
    }
  }
  await resetChecks(page);
  return branches;
}
async function keyboardAndMixedChecks(page, session) {
  await resetChecks(page);
  let expectedScore = 0;
  for (let index = 0; index < 4; index++) {
    const choice = index % 2 === 0 ? answers[session][index] : (answers[session][index] + 1) % 3;
    if (index % 2 === 0) expectedScore++;
    const row = page.locator('#course-learning-checks > li').nth(index), button = row.locator('button').nth(choice);
    await button.focus(); await button.press(index % 2 === 0 ? 'Enter' : 'Space');
    assert.equal(await page.locator('#course-learning-score').innerText(), String(expectedScore));
    assert.equal(await row.locator('button:enabled').count(), 0);
    assert.ok(await row.locator('.course-learning-feedback').isVisible());
  }
  assert.equal(expectedScore, 2);
  const disclosure = page.locator('#session-practice-lab details').first();
  const summary = disclosure.locator('summary');
  await summary.focus(); await summary.press('Enter');
  assert.equal(await disclosure.evaluate(el => el.open), true, 'Native discussion opens by keyboard');
  await summary.press('Space');
  assert.equal(await disclosure.evaluate(el => el.open), false, 'Native discussion closes by keyboard');
  await page.locator('#themeBtn').click();
  assert.equal(await page.locator('html').evaluate(el => el.classList.contains('dark')), true, 'Manual dark remains available');
  const contrast = await page.locator('#session-practice-lab').evaluate(el => ({ ink: getComputedStyle(el).color, paper: getComputedStyle(el).backgroundColor }));
  assert.notEqual(contrast.ink, contrast.paper, 'Dark mode text differs from its background');
  await page.locator('#themeBtn').click();
  assert.equal(await page.locator('html').evaluate(el => el.classList.contains('dark')), false);
  await resetChecks(page);
  return { mixedScore: '2/4', locked: true, resetFocus: true, keyboardChoices: true, nativeDiscussion: true, manualDark: true };
}
try {
  for (const [width, height] of viewports) {
    for (let session = 1; session <= 13; session++) {
      const { page, context } = await openLesson(session, width, height);
      const checked = await staticChecks(page, session, true);
      checked.width = width;
      if (width === 1440) checked.preservation = await preservedSource(page, session);
      if (modules.includes(session)) {
        const questions = await moduleChecks(page, session);
        if (width === 1440) checked.answerBranches = await branchChecks(page, session, questions);
        checked.interaction = await keyboardAndMixedChecks(page, session);
        await capture(page, `session${session}-lab-${width}`, '#session-practice-lab');
      }
      if (width === 1440 || width === 390) await capture(page, `session${session}-outcomes-${width}`, '#learning-outcomes');
      report.checks.push(checked);
      console.log(`PASS Session ${session}, ${width}px${checked.answerBranches ? `, ${checked.answerBranches} answer branches` : ''}`);
      await context.close(); contexts.delete(context);
    }
  }
  for (let session = 1; session <= 13; session++) {
    const { page, context } = await openLesson(session, 390, 844, false);
    report.checks.push(await staticChecks(page, session, false));
    if (modules.includes(session)) {
      assert.equal(await page.locator('#session-practice-lab svg[role="img"]').count(), 1);
      assert.equal(await page.locator('#session-practice-lab .course-learning-cases > article').count(), 3);
      assert.ok((await page.locator('#session-practice-lab details').count()) >= 2);
    }
    console.log(`PASS Session ${session}, no JavaScript`);
    await context.close(); contexts.delete(context);
  }
  assert.deepEqual(report.pageErrors, [], 'No browser page errors');
  assert.deepEqual(report.writes, [], 'No HTTP writes attempted');
  report.status = 'PASS';
  report.answerBranches = report.checks.reduce((sum, check) => sum + (check.answerBranches || 0), 0);
  assert.equal(report.answerBranches, 108, 'All new answer branches exercised');
} catch (error) {
  report.status = 'FAIL'; report.failure = { message: error.message, stack: error.stack };
  throw error;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  for (const context of contexts) await context.close();
  await browser.close();
  if (server) await new Promise(done => server.close(done));
}
console.log(`PASS: ${report.checks.length} public contexts, ${report.answerBranches} answer branches. Report: ${output}/report.json`);
