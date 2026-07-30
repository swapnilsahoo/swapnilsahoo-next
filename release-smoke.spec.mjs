// Run against a local production server:
// pnpm exec playwright test release-smoke.spec.mjs --reporter=line --workers=1
import { expect, test } from "playwright/test";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";

const routes = [
  "/",
  "/teaching/ai-hackathon",
  "/teaching/1-year-mba",
  "/teaching/2-year-mba",
  "/comics",
  "/mythology",
  "/spirituality",
  "/spirituality/hanuman-chalisa",
  "/spirituality/vishnu-sahasranama",
  "/spirituality/lalita-sahasranama",
  "/spirituality/shiva-tandava-stotram",
];

const viewports = [
  { label: "phone-320", width: 320, height: 720 },
  { label: "phone-375", width: 375, height: 812 },
  { label: "tablet-768", width: 768, height: 1024 },
  { label: "laptop-1024", width: 1024, height: 768 },
  { label: "desktop-1440", width: 1440, height: 900 },
];

test.use({
  colorScheme: "light",
  reducedMotion: "reduce",
});

for (const route of routes) {
  for (const viewport of viewports) {
    test(`${route} · ${viewport.label}`, async ({ page }) => {
      const pageErrors = [];
      page.on("pageerror", (error) => pageErrors.push(error.message));

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "domcontentloaded",
      });

      expect(response, `No document response for ${route}`).not.toBeNull();
      expect(response.status(), `${route} returned ${response.status()}`).toBeLessThan(400);
      await expect(page.locator("main")).toBeVisible();
      await expect(page).toHaveTitle(/\S+/);

      const overflow = await page.evaluate(() => {
        const rootWidth = Math.max(
          document.documentElement.scrollWidth,
          document.body?.scrollWidth || 0
        );
        const offenders = Array.from(document.querySelectorAll("*"))
          .map((element) => {
            const rect = element.getBoundingClientRect();

            return {
              selector: [
                element.tagName.toLowerCase(),
                element.id ? `#${element.id}` : "",
                element.classList.length
                  ? `.${Array.from(element.classList).slice(0, 3).join(".")}`
                  : "",
              ].join(""),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            };
          })
          .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1)
          .slice(0, 8);

        return {
          rootWidth,
          viewportWidth: window.innerWidth,
          overflowPixels: Math.max(0, rootWidth - window.innerWidth),
          offenders,
        };
      });

      expect(
        overflow.overflowPixels,
        `${route} is ${overflow.overflowPixels}px wider than the ${
          viewport.width
        }px viewport; offenders: ${JSON.stringify(overflow.offenders)}`
      ).toBeLessThanOrEqual(1);
      expect(pageErrors, `Uncaught browser errors on ${route}`).toEqual([]);
    });
  }
}
