import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

// Coordinator readiness flag; isolated public contexts block HTTP writes.
if (!process.argv.includes('--preview-ready')) throw new Error('Wait for the integrated Session 1 preview, then pass --preview-ready.');
const profile = (process.env.SESSION1_TEST_PROFILE || 'strategy-timelines-local').replace(/[^\w-]/g, '-');
const output = `artifacts/session1-resources/${profile}`;
await mkdir(output, { recursive: true });
const publicDirectory = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const baseline = await readFile('artifacts/session1-resources/session1-before-timelines.html', 'utf8').catch(error => {
  if (error.code === 'ENOENT') return null;
  throw error;
});
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
const caseIds = ['timeline-youtube', 'timeline-starbucks', 'timeline-nano', 'timeline-pfizer'];
const expectedAnswers = [1, 2, 0, 1, 2, 0, 1, 2];
const resourceIds = ['note-mintzberg', 'note-fit', 'note-positioning', 'note-modern-positioning', 'session1-folder'];
const existingIds = ['learning-outcomes', 'q1', 'activity-system', 'authors', 'cases', 'q2', 'q3', 'strategy-stream', 'tesla', 'oeSorter', 'emClassifier', 'activityChecks', 'story-apple', 'story-ikea', 'story-slack', 'story-dmart', 'story-nykaa', 'story-zomato', ...resourceIds];

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

async function structure(page) {
  for (const id of [...existingIds, 'strategy-timeline-cases', ...caseIds, 'timelineChecks', 'timelineScore', 'timelineChecksReset']) assert.equal(await page.locator(`#${id}`).count(), 1, `${id} has one mount`);
  const result = await page.evaluate(previous => {
    const ids = [...document.querySelectorAll('[id]')].map(element => element.id);
    const previousDocument = previous ? new DOMParser().parseFromString(previous, 'text/html') : null;
    const originalIds = previousDocument ? [...previousDocument.querySelectorAll('[id]')].map(element => element.id) : [];
    const preservedLinks = previousDocument ? ['note-mintzberg', 'note-fit', 'note-positioning', 'note-modern-positioning', 'session1-folder'].every(id => previousDocument.getElementById(id)?.getAttribute('href') === document.getElementById(id)?.getAttribute('href')) : null;
    return {
      duplicates: [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))],
      missingAnchors: [...new Set([...document.querySelectorAll('a[href^="#"]')].map(link => link.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))))],
      missingOriginalIds: originalIds.filter(id => !document.getElementById(id)),
      preservedLinks,
      position: document.getElementById('q3').nextElementSibling?.id === 'strategy-timeline-cases' && document.getElementById('strategy-timeline-cases').nextElementSibling?.id === 'tesla',
    };
  }, baseline);
  assert.deepEqual(result.duplicates, []);
  assert.deepEqual(result.missingAnchors, []);
  assert.deepEqual(result.missingOriginalIds, [], 'Existing ID set is preserved');
  if (baseline) assert.equal(result.preservedLinks, true, 'Existing approved resource links are preserved');
  assert.equal(result.position, true, 'New standalone section follows Q3 and precedes Tesla');
  for (const rel of ['icon', 'shortcut icon']) assert.equal(await page.locator(`head link[rel="${rel}"]`).getAttribute('href'), 'https://www.swapnilsahoo.com/icon.svg?v=superman');
  return result;
}

async function caseStories(page) {
  assert.equal(await page.locator('#timeline-youtube').evaluate(detail => detail.open), true, 'First case opens by default');
  const stories = [];
  for (const id of caseIds) {
    const detail = page.locator(`#${id}`), summary = detail.locator('summary');
    assert.ok((await summary.innerText()).length > 8, `${id} has a meaningful native summary`);
    if (!(await detail.evaluate(element => element.open))) await summary.click();
    assert.equal(await detail.locator('.s1tc-terms > div').count(), 5, `${id} has all five terms`);
    const terms = await detail.locator('.s1tc-terms dt').allTextContents();
    for (const term of [/\bintended\b/i, /\bdeliberate\b/i, /\bunreali[sz]ed\b/i, /\bemergent\b/i, /\breali[sz]ed\b/i]) assert.ok(terms.some(text => term.test(text)), `${id} explains ${term}`);
    for (const explanation of await detail.locator('.s1tc-terms dd').allTextContents()) assert.ok(explanation.trim().length > 35, `${id} has written explanations`);
    const dates = await detail.locator('.s1tc-dates li').allTextContents();
    assert.ok(dates.length >= 3, `${id} has an evidence timeline`);
    assert.match(dates.join(' '), /(?:19|20)\d{2}/);
    stories.push({ id, terms: terms.length, datedSteps: dates.length });
  }
  const first = page.locator('#timeline-youtube');
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await first.evaluate(detail => detail.open), false, 'Native summary closes with Enter');
  await page.keyboard.press('Enter');
  assert.equal(await first.evaluate(detail => detail.open), true, 'Native summary reopens with Enter');
  return stories;
}

async function practice(page) {
  const questions = page.locator('#timelineChecks > li[data-question]');
  assert.equal(await questions.count(), 8);
  assert.equal(await page.locator('#timelineScore').innerText(), '0');
  const branches = [];
  for (let question = 0; question < 8; question++) {
    for (let choice = 0; choice < 3; choice++) {
      await page.locator('#timelineChecksReset').click();
      assert.equal(await questions.locator('button:disabled').count(), 0);
      assert.equal(await questions.locator('.verdict:not([hidden])').count(), 0);
      const row = questions.nth(question), buttons = row.locator('button.opt');
      assert.equal(await buttons.count(), 3);
      const correctLabel = await buttons.nth(expectedAnswers[question]).innerText();
      await buttons.nth(choice).click();
      const correct = choice === expectedAnswers[question];
      assert.equal(await row.locator('button:disabled').count(), 3);
      assert.equal(await row.locator('button[aria-pressed="true"]').count(), 1);
      assert.equal(await buttons.nth(choice).getAttribute('aria-pressed'), 'true');
      assert.ok((await buttons.nth(expectedAnswers[question]).innerText()).includes(`${correctLabel} · Correct answer`));
      if (!correct) assert.match(await buttons.nth(choice).innerText(), /Your choice/);
      const feedback = row.locator('.verdict');
      assert.equal(await feedback.isVisible(), true);
      assert.equal(await feedback.getAttribute('aria-live'), 'polite');
      assert.equal(await feedback.getAttribute('aria-atomic'), 'true');
      assert.ok((await feedback.innerText()).length > 60, 'Every answer branch explains the reasoning');
      assert.equal((await feedback.innerText()).startsWith('Correct.'), correct);
      assert.equal(await page.locator('#timelineScore').innerText(), correct ? '1' : '0');
      await buttons.nth(choice).dispatchEvent('click');
      assert.equal(await page.locator('#timelineScore').innerText(), correct ? '1' : '0', 'Answer locking prevents repeat scoring');
      branches.push({ question: question + 1, choice: choice + 1, correct });
    }
  }
  await page.locator('#timelineChecksReset').click();
  assert.equal(await questions.first().locator('button').first().evaluate(button => button === document.activeElement), true, 'Reset returns focus to first choice');
  for (let question = 0; question < 8; question++) await questions.nth(question).locator('button').nth(question % 2 === 0 ? expectedAnswers[question] : (expectedAnswers[question] + 1) % 3).click();
  assert.equal(await page.locator('#timelineScore').innerText(), '4', 'Mixed responses score independently');
  await page.locator('#timelineChecksReset').click();
  await questions.first().locator('button').nth(expectedAnswers[0]).focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.locator('#timelineScore').innerText(), '1', 'Keyboard Enter selects an answer');
  for (let question = 1; question < 8; question++) await questions.nth(question).locator('button').nth(expectedAnswers[question]).click();
  assert.equal(await page.locator('#timelineScore').innerText(), '8');
  assert.equal(await page.locator('#oeScore').innerText(), '0');
  assert.equal(await page.locator('#activityScore').innerText(), '0');
  assert.equal(await page.locator('#emScore').innerText(), '0', 'Existing practice scores are independent');
  await page.locator('#timelineChecksReset').click();
  return { branches, fullScore: '8/8', mixedScore: '4/8', resetFocus: true, independentExistingScores: true };
}

async function noOverflow(page, width, mode) {
  const sizes = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(sizes.document <= sizes.viewport + 1 && sizes.body <= sizes.viewport + 1, `${width}px ${mode}: no horizontal overflow`);
  return sizes;
}
async function screenshot(page, name) {
  await page.locator('#timeline-youtube summary').evaluate(element => element.blur());
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    const section = document.getElementById('strategy-timeline-cases');
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY - 120);
  });
  const path = `${output}/${name}.png`;
  await page.screenshot({ path });
  report.screenshots.push(path);
}

try {
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 600]]) {
    const { page, context } = await fresh(width, height);
    assert.equal(await page.locator('html').evaluate(html => html.classList.contains('dark')), false, 'Light default despite stored and OS dark');
    const preserved = await structure(page);
    const stories = await caseStories(page);
    const checks = await practice(page);
    const light = await noOverflow(page, width, 'light');
    await screenshot(page, `timeline-light-${width}`);
    await page.locator('#themeBtn').click();
    assert.equal(await page.locator('html').evaluate(html => html.classList.contains('dark')), true, 'Dark theme requires manual switch');
    const dark = await noOverflow(page, width, 'dark');
    if ([1440, 390].includes(width)) await screenshot(page, `timeline-dark-${width}`);
    report.checks.push({ viewport: { width, height }, lightDefault: true, manualDark: true, preserved, stories, checks, light, dark });
    await context.close();
  }
  const noScript = await fresh(390, 844, true);
  const staticStories = await caseStories(noScript.page);
  assert.match(await noScript.page.locator('#strategy-timeline-cases').innerText(), /JavaScript/i, 'No-script practice availability is explained');
  report.checks.push({ noScript: { readableCaseStories: staticStories, nativeSummaryKeyboard: true } });
  await screenshot(noScript.page, 'timeline-no-script-390');
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
