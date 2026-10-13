import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

// Run after the integrated hub and media are ready. Read-only browser contexts;
// native video is muted and no forms, accounts or publisher checkouts are used.
if (!process.argv.includes("--preview-ready")) throw new Error("Wait for the integrated Session 2 resource hub, then pass --preview-ready.");
const profile = (process.env.SESSION2_TEST_PROFILE || "local").replace(/[^\w-]/g, "-");
const illustrationsOnly = process.argv.includes("--illustrations-only");
const output = `artifacts/session1-resources/session2-resources-${profile}`;
const publicDirectory = resolve(fileURLToPath(new URL("../public/", import.meta.url)));
const lesson = "/teaching/1-year-mba/session2.html";
const media = "/teaching/1-year-mba/resources/session2-core-ideology-envisioned-future.mp4";
const baselinePath = "artifacts/session1-resources/session2-before-resource-hub.html";
const sourceNames = [
  "Session 2 _Core Ideology and Envisioned Future.mp4",
  "Mandatory Reading1_Session 2_ Developing the Strategy Vision_Kaplan & Norton.pdf",
  "Mandatory Reading2_Session 2_Building Your Company_Vision_by Collins & Porras.PDF",
];
const mime = { ".html": "text/html;charset=utf-8", ".js": "text/javascript;charset=utf-8", ".css": "text/css;charset=utf-8", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".mp4": "video/mp4" };
await mkdir(output, { recursive: true });
let baseline;
try { baseline = await readFile(baselinePath, "utf8"); } catch (error) { if (error.code !== "ENOENT") throw error; }
let server, base = process.env.SESSION2_TEST_BASE_URL?.replace(/\/$/, "");
if (!base) {
  server = createServer(async (request, response) => {
    try {
      if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405).end(); return; }
      const file = resolve(publicDirectory, `.${decodeURIComponent(new URL(request.url, "http://localhost").pathname)}`);
      if (!file.startsWith(publicDirectory + sep)) { response.writeHead(403).end(); return; }
      const information = await stat(file);
      if (!information.isFile()) { response.writeHead(404).end(); return; }
      const headers = { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-store", "Accept-Ranges": "bytes" };
      let start = 0, end = information.size - 1, status = 200;
      if (request.headers.range) {
        const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
        if (!match || (!match[1] && !match[2])) { response.writeHead(416, { "Content-Range": `bytes */${information.size}` }).end(); return; }
        if (match[1]) { start = Number(match[1]); if (match[2]) end = Math.min(Number(match[2]), end); }
        else start = Math.max(0, information.size - Number(match[2]));
        if (start >= information.size || end < start) { response.writeHead(416, { "Content-Range": `bytes */${information.size}` }).end(); return; }
        status = 206; headers["Content-Range"] = `bytes ${start}-${end}/${information.size}`;
      }
      headers["Content-Length"] = end - start + 1;
      response.writeHead(status, headers);
      if (request.method === "HEAD") { response.end(); return; }
      const stream = createReadStream(file, { start, end });
      stream.on("error", () => response.destroy());
      response.on("close", () => stream.destroy());
      stream.pipe(response);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(done => server.listen(0, "127.0.0.1", done));
  base = `http://127.0.0.1:${server.address().port}`;
}
assert.match(base, /^https?:\/\//);
const origin = new URL(base).origin;
const report = { base, profile, illustrationsOnly, browserChannel: process.env.SESSION2_TEST_BROWSER_CHANNEL || "bundled-chromium", checkedAt: new Date().toISOString(), method: "Fresh public contexts; HTTP writes and third-party iframe documents blocked; native video muted", checks: [], screenshots: [], pageErrors: [], writes: [], blockedFrames: [] };
const browser = await chromium.launch({ headless: true, channel: process.env.SESSION2_TEST_BROWSER_CHANNEL || undefined });
const contexts = [];
async function freshPage(width, height, javaScriptEnabled = true) {
  const context = await browser.newContext({ viewport: { width, height }, colorScheme: "dark", javaScriptEnabled, permissions: [] });
  contexts.push(context);
  if (javaScriptEnabled) await context.addInitScript(() => {
    for (const key of ["theme", "pgpm-course-theme", "s2-theme"]) localStorage.setItem(key, "dark");
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
  page.on("pageerror", error => report.pageErrors.push({ width, message: error.message }));
  page.on("response", response => {
    if (new URL(response.url()).pathname === media) {
      (report.nativeMediaResponses ||= []).push({ width, status: response.status(), range: response.headers()["content-range"] || null, type: response.headers()["content-type"] });
    }
  });
  const response = await page.goto(base + lesson, { waitUntil: "load", timeout: 90000 });
  assert.equal(response.status(), 200);
  if (javaScriptEnabled) await page.evaluate(() => document.fonts.ready);
  return { page, context };
}
async function screenshot(page, name, selector) {
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator(selector).evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
  const destination = `${output}/${name}.png`;
  await page.screenshot({ path: destination }); report.screenshots.push(destination);
}
async function noOverflow(page, label) {
  const size = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  assert.ok(size.document <= size.viewport + 1 && size.body <= size.viewport + 1, `${label}: horizontal overflow ${JSON.stringify(size)}`);
  return size;
}
async function staticHubGeometry(page, selector = "#session2-resources") {
  const geometry = await page.locator(selector).evaluate(element => {
    const rect = element.getBoundingClientRect();
    const parent = element.parentElement, parentRect = parent.getBoundingClientRect(), style = getComputedStyle(element), parentStyle = getComputedStyle(parent);
    const overflowingDescendants = [...element.querySelectorAll("*")].map(child => ({ tag: child.tagName, id: child.id, rect: child.getBoundingClientRect() })).filter(child => child.rect.width > 0 && (child.rect.left < -1 || child.rect.right > innerWidth + 1)).map(child => ({ tag: child.tag, id: child.id, left: child.rect.left, right: child.rect.right }));
    return { viewport: innerWidth, left: rect.left, right: rect.right, client: element.clientWidth, scroll: element.scrollWidth, overflowingDescendants, boxSizing: style.boxSizing, transform: style.transform, width: style.width, padding: style.padding, parent: { tag: parent.tagName, id: parent.id, left: parentRect.left, right: parentRect.right, width: parentStyle.width, padding: parentStyle.padding, transform: parentStyle.transform }, pageDocument: document.documentElement.scrollWidth, pageBody: document.body.scrollWidth };
  });
  assert.ok(geometry.left >= -1 && geometry.right <= geometry.viewport + 1 && geometry.scroll <= geometry.client + 1, `${selector} fits the static viewport: ${JSON.stringify(geometry)}`);
  assert.deepEqual(geometry.overflowingDescendants, [], `${selector}: every visible descendant fits the no-JS viewport`);
  return geometry;
}
async function sourceDelivery() {
  const complete = await fetch(base + media);
  assert.equal(complete.status, 200, "Unranged native video returns HTTP 200");
  assert.match(complete.headers.get("content-type"), /^video\/mp4(?:;|$)/);
  const bytes = Number(complete.headers.get("content-length"));
  assert.ok(bytes > 1000000, "Actual MP4, not an HTML fallback");
  await complete.body.cancel();
  const partial = await fetch(base + media, { headers: { Range: "bytes=0-1023" } });
  assert.equal(partial.status, 206, "Native seek supports partial retrieval");
  assert.equal(partial.headers.get("content-range"), `bytes 0-1023/${bytes}`);
  const body = new Uint8Array(await partial.arrayBuffer());
  assert.equal(body.length, 1024);
  assert.equal(new TextDecoder().decode(body.slice(4, 8)), "ftyp", "MP4 container header is served");
  return { status: 200, contentType: complete.headers.get("content-type"), bytes, rangeStatus: 206, partialBytes: 1024 };
}
async function structure(page, javaScriptEnabled = true) {
  for (const id of ["session2-resources", "session2-resource-video", "session2-video-notes", "session2-reading-kaplan", "session2-reading-collins", "session2-issue-extensions"]) assert.equal(await page.locator(`#${id}`).count(), 1, `${id} exists exactly once`);
  assert.ok(await page.locator("#session2-resources").evaluate(element => Boolean(element.compareDocumentPosition(document.getElementById("readings")) & Node.DOCUMENT_POSITION_FOLLOWING)), "New hub precedes existing readings");
  const text = await page.locator("#session2-resources").textContent();
  for (const name of sourceNames) assert.ok(text.includes(name), `Supplied resource indexed: ${name}`);
  assert.ok((await page.locator("#session2-video-notes").textContent()).trim().length > 200, "Written companion is available without media playback");
  const video = page.locator("#session2-resource-video");
  assert.equal(await video.getAttribute("controls") !== null, true);
  assert.equal(await video.getAttribute("autoplay"), null, "Video does not autoplay");
  assert.equal(await video.getAttribute("playsinline") !== null, true);
  assert.equal(await video.locator("source").getAttribute("src"), media);
  assert.equal(await video.locator("source").getAttribute("type"), "video/mp4");
  assert.ok(await page.locator(`#session2-resources a[href="${media}"]`).count() > 0, "Direct video fallback/download route exists");
  assert.equal(await page.locator("details#session2-issue-extensions").count(), 1, "Optional extensions use one native disclosure");
  assert.equal(await page.locator("#session2-issue-extensions article").count(), 4, "All four extra issue articles are indexed");
  assert.equal(await page.locator("#session2-issue-extensions > summary").count(), 1, "Optional article disclosure uses a native summary");
  assert.equal(await page.locator('#session2-reading-kaplan a[href="https://store.hbr.org/product/developing-the-strategy-vision-value-gaps-and-analysis/B0801A"]').count(), 1);
  assert.equal(await page.locator('#session2-reading-collins a[href="https://hbr.org/1996/09/building-your-companys-vision"]').count(), 1);
  const diagnostics = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("[id]")].map(element => element.id);
    return { duplicates: ids.filter((id, index) => ids.indexOf(id) !== index), missing: [...document.querySelectorAll('a[href^="#"]')].map(link => link.getAttribute("href").slice(1)).filter(id => id && !document.getElementById(id)) };
  });
  assert.deepEqual(diagnostics, { duplicates: [], missing: [] }, "Unique IDs and working internal links");
  assert.equal(await page.locator("html").evaluate(element => element.classList.contains("dark")), false, "Light is the default despite OS and stored dark preferences");
  if (javaScriptEnabled) await page.locator("#session2-issue-extensions > summary").focus();
  return { suppliedFiles: 3, optionalArticles: 4, nativeVideoControls: true, writtenCompanion: true, internalAnchors: true, lightDefault: true };
}
async function preservation(page) {
  if (!baseline) return { baselineAvailable: false, note: "Preservation comparison requires the coordinator's ignored pre-edit HTML snapshot." };
  const result = await page.evaluate(previous => {
    const old = new DOMParser().parseFromString(previous, "text/html");
    const normalize = value => value.replace(/\s+/g, " ").trim();
    const currentText = new Set([...document.querySelectorAll("section p, section li, section h1, section h2, section h3, section h4, section h5, section h6")].map(element => normalize(element.textContent)).filter(Boolean));
    const oldText = [...old.querySelectorAll("section p, section li, section h1, section h2, section h3, section h4, section h5, section h6")].map(element => normalize(element.textContent)).filter(Boolean);
    const links = new Set([...document.querySelectorAll("a[href]")].map(element => element.getAttribute("href")));
    const missingIDs = [...old.querySelectorAll("[id]")].map(element => element.id).filter(id => !document.getElementById(id));
    const missingLinks = [...old.querySelectorAll("a[href]")].map(element => element.getAttribute("href")).filter(href => !links.has(href));
    const references = element => `${element.tagName}:${element.getAttribute("src")}`;
    const currentResources = new Set([...document.querySelectorAll("script[src], source[src], iframe[src], img[src]")].map(references));
    const missingResources = [...old.querySelectorAll("script[src], source[src], iframe[src], img[src]")].map(references).filter(item => !currentResources.has(item));
    return { baselineIDs: old.querySelectorAll("[id]").length, baselineLinks: old.querySelectorAll("a[href]").length, baselineParagraphsAndHeadings: oldText.length, missingIDs, missingLinks, missingResources, missingText: oldText.filter(text => !currentText.has(text)) };
  }, baseline);
  for (const key of ["missingIDs", "missingLinks", "missingResources", "missingText"]) assert.deepEqual(result[key], [], `Additive resource hub preserves ${key}`);
  return { baselineAvailable: true, ...result };
}
async function visionIllustrations(page, keyboard = true) {
  const vision = page.locator("#vision-illustration");
  assert.equal(await vision.count(), 1);
  assert.equal(await vision.locator("svg").count(), 5, "One framework diagram and four original illustrations");
  const labels = await vision.locator("svg").evaluateAll(elements => elements.map(element => ({
    role: element.getAttribute("role"),
    labels: (element.getAttribute("aria-labelledby") || "").split(/\s+/).filter(Boolean).map(id => {
      const label = document.getElementById(id);
      return { id, inside: Boolean(label && element.contains(label)), text: label?.textContent.trim() || "" };
    }),
  })));
  for (const svg of labels) {
    assert.equal(svg.role, "img");
    assert.ok(svg.labels.length > 0);
    for (const label of svg.labels) assert.ok(label.inside && label.text.length > 10, "Each SVG has a meaningful, resolving accessible label");
  }
  assert.equal(labels[0].labels.length, 2, "Framework diagram has both title and detailed description");
  const text = await vision.textContent();
  for (const term of ["Core ideology", "Core values", "Core purpose", "Envisioned future", "Vivid description", "10–30", "3–10", "Sony", "Tata Nano", "Nila Mobility", "2040"]) assert.ok(text.includes(term), `Vision vocabulary and examples: ${term}`);
  assert.match(text, /complementarity, not a 50\/50 allocation/);
  assert.match(text, /historical reading examples, not Sony's current official statements/);
  assert.match(text, /numeric target is not automatically audacious/);
  assert.equal(await vision.locator('.s2vi-stories > article').count(), 4);
  assert.equal(await vision.locator('.s2vi-stories > article > details').count(), 4);
  assert.equal(await vision.locator('a[href="/teaching/1-year-mba/session1.html#timeline-nano"]').count(), 1);
  assert.equal(await vision.locator('a[href="#session2-video-notes"]').count(), 1);
  assert.equal(await page.locator('#session2-reading-collins a[href="#vision-illustration"]').count(), 1, "Reading card reaches the visible illustrations");
  if (keyboard) for (const summary of await vision.locator('.s2vi-stories > article > details > summary').all()) {
    await summary.focus(); await summary.press("Enter");
    assert.equal(await summary.evaluate(element => element.parentElement.open), true, "Every illustration disclosure opens by keyboard");
    assert.ok((await summary.evaluate(element => element.parentElement.textContent)).trim().length > 100);
    await noOverflow(page, "Open illustration disclosure");
    await summary.press("Enter"); assert.equal(await summary.evaluate(element => element.parentElement.open), false);
  }
  return { accessibleSVGs: 5, labelledFrameworkDescription: true, storyCards: 4, distinctReadingHorizons: true, keyboardDisclosures: keyboard ? 4 : 0 };
}
async function nativeVideo(page) {
  const video = page.locator("#session2-resource-video");
  await video.scrollIntoViewIfNeeded();
  const initial = await video.evaluate(element => ({ readyState: element.readyState, networkState: element.networkState, currentSrc: element.currentSrc, error: element.error?.message || null, h264AacSupport: element.canPlayType('video/mp4; codecs="avc1.64001f, mp4a.40.2"') }));
  (report.videoInitialStates ||= []).push(initial);
  console.log(`Native video initial readiness: ${JSON.stringify(initial)}`);
  assert.ok(initial.h264AacSupport, "This browser lacks H.264/AAC decoding. Rerun with SESSION2_TEST_BROWSER_CHANNEL=chrome (or msedge); native playback verification is required.");
  await page.waitForFunction(() => {
    const element = document.getElementById("session2-resource-video");
    return Boolean(element.error) || (element.readyState >= 1 && Number.isFinite(element.duration) && element.duration > 0);
  }, null, { timeout: 60000 });
  const metadata = await video.evaluate(element => ({ duration: element.duration, width: element.videoWidth, height: element.videoHeight, paused: element.paused, error: element.error?.message || null, errorCode: element.error?.code || null, networkState: element.networkState, currentSrc: element.currentSrc, h264AacSupport: element.canPlayType('video/mp4; codecs="avc1.64001f, mp4a.40.2"') }));
  assert.equal(metadata.error, null, `Native media readiness: ${JSON.stringify(metadata)}`);
  assert.ok(metadata.duration > 60 && metadata.duration < 1200);
  assert.equal(metadata.width, 1280); assert.equal(metadata.height, 720);
  assert.equal(metadata.paused, true, "Video waits for visitor playback"); assert.equal(metadata.error, null);
  await video.evaluate(element => { element.muted = true; element.currentTime = 17; });
  await page.waitForFunction(() => {
    const element = document.getElementById("session2-resource-video");
    return !element.seeking && Math.abs(element.currentTime - 17) < 0.25;
  }, null, { timeout: 60000 });
  await video.evaluate(element => element.play());
  await page.waitForFunction(() => {
    const element = document.getElementById("session2-resource-video");
    return !element.paused && element.currentTime > 17.2;
  }, null, { timeout: 30000 });
  await video.evaluate(element => element.pause());
  assert.equal(await video.evaluate(element => element.paused), true, "Visitor can pause playback");
  return { ...metadata, seek: 17, mutedPlaybackAdvanced: true, pause: true };
}
try {
  if (!illustrationsOnly) report.media = await sourceDelivery();
  for (const [width, height] of [[1440, 900], [768, 1024], [390, 844], [320, 600]]) {
    const { page, context } = await freshPage(width, height);
    const content = await structure(page), geometry = await noOverflow(page, `${width}px light`);
    const summary = page.locator("#session2-issue-extensions > summary");
    await summary.focus(); await summary.press("Enter");
    assert.equal(await summary.evaluate(element => element.parentElement.open), true, "Native article disclosure opens by keyboard");
    await summary.press("Enter"); assert.equal(await summary.evaluate(element => element.parentElement.open), false);
    report.checks.push({ width, content, geometry, illustrations: await visionIllustrations(page), nativeVideo: illustrationsOnly ? "Unchanged media; previously verified independently" : await nativeVideo(page), keyboardDisclosure: true });
    await screenshot(page, `vision-diagram-light-${width}`, "#vision-illustration");
    await screenshot(page, `vision-stories-light-${width}`, "#vision-illustration .s2vi-stories");
    if (!illustrationsOnly) {
      await screenshot(page, `hub-light-${width}`, "#session2-resources");
      await screenshot(page, `video-light-${width}`, "#session2-video-title");
      await screenshot(page, `notes-light-${width}`, "#session2-video-notes");
      await screenshot(page, `readings-light-${width}`, "#session2-reading-kaplan");
    }
    await page.locator("#themeBtn").click();
    assert.equal(await page.locator("html").evaluate(element => element.classList.contains("dark")), true, "Dark remains an explicit manual choice");
    await noOverflow(page, `${width}px manual dark`); await screenshot(page, `vision-diagram-manual-dark-${width}`, "#vision-illustration");
    await screenshot(page, `vision-stories-manual-dark-${width}`, "#vision-illustration .s2vi-stories");
    if (!illustrationsOnly) await screenshot(page, `hub-manual-dark-${width}`, "#session2-resources");
    await page.locator("#themeBtn").click();
    assert.equal(await page.locator("html").evaluate(element => element.classList.contains("dark")), false);
    console.log(`Session 2 resource hub ${width}px passed.`); await context.close();
  }
  const { page, context } = await freshPage(390, 844, false);
  const staticCheck = { noJavaScript: await structure(page, false), illustrations: await visionIllustrations(page, false), existingStaticContent: await preservation(page), hubGeometry: await staticHubGeometry(page), visionGeometry: await staticHubGeometry(page, "#vision-illustration") };
  await screenshot(page, "no-js-hub-390", "#session2-resources");
  await screenshot(page, "no-js-vision-390", "#vision-illustration");
  if (baseline) {
    await page.setContent(baseline, { waitUntil: "load", timeout: 90000 });
    staticCheck.legacyPageGeometry = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
    assert.ok(staticCheck.hubGeometry.pageDocument <= staticCheck.legacyPageGeometry.document + 1 && staticCheck.hubGeometry.pageBody <= staticCheck.legacyPageGeometry.body + 1, "The resource hub adds no whole-page no-JS overflow beyond the pre-edit layout");
    staticCheck.limitation = "Legacy runtime-Tailwind page geometry is measured, not certified for no-JS use; the new resource hub is checked independently.";
  }
  report.checks.push(staticCheck); await context.close();
  assert.deepEqual(report.pageErrors, []); assert.deepEqual(report.writes, []); report.passed = true;
} catch (error) {
  report.passed = false; report.failure = { message: error.message, stack: error.stack }; console.error(error.stack); process.exitCode = 1;
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify(report, null, 2));
  await Promise.allSettled(contexts.map(context => context.close())); await browser.close();
  if (server) await new Promise(done => server.close(done));
}
console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, pageErrors: report.pageErrors.length, writes: report.writes.length, report: `${output}/report.json` }));
