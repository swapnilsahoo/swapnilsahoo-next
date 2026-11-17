import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { chromium } from "playwright";

const { values } = parseArgs({
  options: {
    base: { type: "string", default: "http://localhost:3111" },
    label: { type: "string", default: "after" },
    runs: { type: "string", default: "3" },
    "measure-only": { type: "boolean", default: false },
  },
});
const base = new URL(values.base);
assert(["localhost", "127.0.0.1"].includes(base.hostname), "Use an isolated local preview.");
assert(/^[a-z0-9-]+$/i.test(values.label), "Use a simple report label.");
const runs = Number(values.runs);
assert(Number.isInteger(runs) && runs >= 1 && runs <= 5, "Use 1 to 5 runs.");
const directory = ".data/qa/performance";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
});
const report = { base: base.origin, label: values.label, samples: [], checks: {} };
const errors = [];

async function context(options = {}) {
  const result = await browser.newContext({ viewport: { width: 390, height: 844 }, ...options });
  await result.route("**/*", (route) => {
    const request = route.request();
    if (new URL(request.url()).origin !== base.origin || !["GET", "HEAD"].includes(request.method()))
      return route.abort();
    return route.continue();
  });
  return result;
}

try {
  const warm = await context();
  const warmPage = await warm.newPage();
  for (const route of ["/", "/learning-lab"])
    await warmPage.goto(new URL(route, base).href, { waitUntil: "networkidle" });
  await warm.close();

  for (const route of ["/", "/learning-lab"]) {
    for (let run = 0; run < runs; run++) {
      const isolated = await context();
      const page = await isolated.newPage();
      const cdp = await isolated.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 100000,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await page.addInitScript(() => {
        window.loadingMetrics = { lcpMs: 0, cls: 0 };
        new PerformanceObserver((list) => {
          window.loadingMetrics.lcpMs = list.getEntries().at(-1).startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput) window.loadingMetrics.cls += entry.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      const response = await page.goto(new URL(route, base).href, { waitUntil: "load", timeout: 90000 });
      assert.equal(response.status(), 200);
      await page.waitForTimeout(3000);
      const sample = await page.evaluate(() => {
        const navigation = performance.getEntriesByType("navigation")[0];
        const resources = performance.getEntriesByType("resource");
        return {
          ttfbMs: navigation.responseStart,
          fcpMs: performance.getEntriesByName("first-contentful-paint")[0]?.startTime,
          loadMs: navigation.loadEventEnd,
          htmlBytes: navigation.encodedBodySize,
          resourceBytes: resources.reduce((sum, resource) => sum + resource.encodedBodySize, 0),
          requests: resources.length,
          scriptBytes: resources.filter((resource) => resource.initiatorType === "script")
            .reduce((sum, resource) => sum + resource.encodedBodySize, 0),
          hiddenMediaRequests: resources.filter((resource) => resource.initiatorType === "video").length,
          domElements: document.querySelectorAll("*").length,
          ...window.loadingMetrics,
        };
      });
      report.samples.push({ route, run: run + 1, ...sample });
      console.log(JSON.stringify(report.samples.at(-1)));
      await isolated.close();
    }
  }

  const blockedScripts = await context();
  await blockedScripts.route(/\.js(?:\?|$)/, (route) => route.abort());
  const firstPaintPage = await blockedScripts.newPage();
  await firstPaintPage.goto(base.href, { waitUntil: "load" });
  report.checks.headingVisibleBeforeHydration = await firstPaintPage.locator("h1").evaluate((heading) => {
    for (let element = heading; element; element = element.parentElement) {
      const style = getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0)
        return false;
    }
    return heading.getBoundingClientRect().height > 0;
  });
  await blockedScripts.close();

  const ui = await context();
  const page = await ui.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base.href, { waitUntil: "networkidle" });
  let menuRequests = 0;
  await page.route("**/*", (route) => {
    if (new URL(route.request().url()).searchParams.has("_rsc")) {
      menuRequests++;
      return route.abort();
    }
    return route.continue();
  });
  await page.getByRole("button", { name: "Open site menu", exact: true }).click();
  await page.waitForTimeout(1500);
  report.checks.menuPrefetchRequests = menuRequests;
  const menu = page.getByRole("navigation", { name: "Mobile navigation", exact: true });
  assert(await menu.getByRole("link", { name: "Learning Lab", exact: true }).isVisible());
  assert(await menu.locator('a[href="/teaching/karma-yoga/india"]').count());
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("button", { name: "Open site menu", exact: true }).getAttribute("aria-expanded"), "false");
  await page.unroute("**/*");

  await page.getByTestId("digital-guide-launcher").click();
  await page.getByTestId("digital-guide-dialog").waitFor({ state: "visible" });
  await page.getByTestId("digital-guide-welcome-video").waitFor({ state: "visible" });
  await page.getByRole("combobox", { name: "Learning tools", exact: true }).selectOption("find-path");
  await page.getByRole("heading", { name: "Find a useful starting point", exact: true }).waitFor();
  await page.getByTestId("digital-guide-close").click();
  assert(await page.getByTestId("digital-guide-launcher").evaluate((element) => element === document.activeElement));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base.href, { waitUntil: "networkidle" });
  const teaching = page.getByRole("button", { name: "Teaching submenu", exact: true }).filter({ visible: true });
  await teaching.hover();
  await page.getByRole("link", { name: "For India · Mehalchauri", exact: true }).filter({ visible: true }).waitFor();
  await page.keyboard.press("Escape");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `Overflow at ${width}px`);
    await page.screenshot({ path: `${directory}/${values.label}-${width}.png` });
  }
  await ui.close();
  report.checks.browserErrors = errors;
  if (!values["measure-only"]) {
    assert(report.checks.headingVisibleBeforeHydration, "The heading must render before hydration.");
    assert(report.checks.menuPrefetchRequests <= 2, "Opening the menu must not preload the whole website.");
    assert(report.samples.every((sample) => sample.hiddenMediaRequests === 0), "Closed guide media loaded early.");
    assert.deepEqual(errors, []);
  }
  console.log(JSON.stringify(report.checks));
} finally {
  await writeFile(`${directory}/${values.label}.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
