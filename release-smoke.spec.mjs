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

test("Comics & Fiction branches · page and navigation", async ({ page }) => {
  const branches = [
    { label: "Spider-Man", hash: "#spider-man" },
    { label: "Superman", hash: "#superman" },
    { label: "He-Man", hash: "#he-man" },
  ];

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/comics`, { waitUntil: "domcontentloaded" });

  const branchNav = page.getByRole("navigation", {
    name: "Choose a Comics and Fiction branch",
  });
  for (const branch of branches) {
    await expect(page.locator(branch.hash)).toHaveCount(1);
    await expect(branchNav.getByRole("link", { name: branch.label, exact: true })).toHaveAttribute(
      "href",
      branch.hash
    );
  }

  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
  const moreTrigger = primaryNav.getByRole("button", { name: "More", exact: true });
  const menuId = await moreTrigger.getAttribute("aria-controls");
  expect(menuId).toBeTruthy();
  await moreTrigger.hover();

  const desktopMenu = page.locator(`#${menuId}`);
  for (const branch of branches) {
    await expect(
      desktopMenu.getByRole("link", { name: branch.label, exact: true })
    ).toHaveAttribute("href", `/comics${branch.hash}`);
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/comics`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open site menu" }).click();

  const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
  for (const branch of branches) {
    await expect(mobileNav.getByRole("link", { name: branch.label, exact: true })).toHaveAttribute(
      "href",
      `/comics${branch.hash}`
    );
  }
});

test("Comics & Fiction story cycles · structure and disclosure behaviour", async ({ page }) => {
  const cycles = ["spider-man", "superman", "he-man"];

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/comics`, { waitUntil: "domcontentloaded" });

  await expect(page.locator("[data-story-cycle]")).toHaveCount(3);
  for (const slug of cycles) {
    const cycle = page.locator(`[data-story-cycle="${slug}"]`);
    const chapters = cycle.locator("details");

    await expect(chapters).toHaveCount(6);
    await expect(chapters.locator("summary")).toHaveCount(6);
    expect(await chapters.evaluateAll((items) => items.every((item) => !item.open))).toBe(true);
    expect(
      await chapters.evaluateAll((items) =>
        items.every((item) => item.firstElementChild?.tagName === "SUMMARY")
      )
    ).toBe(true);
  }

  const firstChapter = page.locator("#spider-man-chapter-1");
  const secondChapter = page.locator("#spider-man-chapter-2");
  const firstSummary = firstChapter.locator("summary");
  const secondSummary = secondChapter.locator("summary");

  await firstSummary.focus();
  await page.keyboard.press("Enter");
  await expect(firstChapter).toHaveAttribute("open", "");
  await expect(firstSummary).toBeFocused();

  await secondSummary.focus();
  await page.keyboard.press("Enter");
  await expect(firstChapter).toHaveAttribute("open", "");
  await expect(secondChapter).toHaveAttribute("open", "");

  await firstSummary.focus();
  await page.keyboard.press("Space");
  await expect(firstChapter).not.toHaveAttribute("open", "");
  await expect(firstSummary).toBeFocused();

  const documentText = await page.locator("body").textContent();
  expect(documentText).toContain("Responsibility that does not take over");
  expect(documentText).toContain("Hope a city can practise");
  expect(documentText).toContain("Power that makes itself less necessary");

  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(`${baseUrl}/comics`, { waitUntil: "domcontentloaded" });

  for (const slug of cycles) {
    const summaries = page.locator(`[data-story-cycle="${slug}"] summary`);
    const summaryHeights = await summaries.evaluateAll((items) =>
      items.map((item) => Math.round(item.getBoundingClientRect().height))
    );
    expect(Math.min(...summaryHeights), `${slug} has a summary below 44px`).toBeGreaterThanOrEqual(
      44
    );
    await page.locator(`#${slug}-chapter-6 > summary`).click();
  }

  const expandedOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(expandedOverflow).toBeLessThanOrEqual(1);

  const storyIds = await page
    .locator("[data-story-cycle] [id]")
    .evaluateAll((items) => items.map((item) => item.id));
  expect(new Set(storyIds).size).toBe(storyIds.length);
});

test("Homepage gallery · AOM 2026 event photographs", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(`${baseUrl}/#gallery`, { waitUntil: "domcontentloaded" });

  const gallery = page.getByRole("region", { name: "Fieldwork and teaching gallery" });
  const firstSlide = gallery.getByRole("group", { name: "1 of 7" });
  const photo = firstSlide.getByRole("img", {
    name: /Swapnil Sahoo with four fellow Academy of Management attendees at AOM 2026/,
  });

  await expect(firstSlide).toBeVisible();
  await expect(photo).toBeVisible();
  await expect(firstSlide).toContainText("AOM 2026 · Philadelphia Convention Center");
  await expect(photo).toHaveJSProperty("complete", true);

  const dimensions = await photo.evaluate((image) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
  }));
  expect(dimensions.naturalWidth).toBeGreaterThan(0);
  expect(dimensions.naturalHeight).toBeGreaterThan(0);
  expect(dimensions.naturalWidth / dimensions.naturalHeight).toBeCloseTo(4 / 3, 2);

  await gallery.getByRole("button", { name: "Go to slide 2" }).click();

  const secondSlide = gallery.getByRole("group", { name: "2 of 7" });
  const sessionPhoto = secondSlide.getByRole("img", {
    name: /AOM 2026 participants gathered around a conference table/,
  });

  await expect(gallery.getByRole("button", { name: "Go to slide 2" })).toHaveAttribute(
    "aria-current",
    "true"
  );
  await expect(sessionPhoto).toBeVisible();
  await expect(secondSlide).toContainText("Dean Shepherd, Madeline Toubiana and Raj Shankar");
  await expect(secondSlide).toContainText("Trenton Williams");
  await expect(secondSlide).toContainText("Golshan Javadian");
  await expect(secondSlide.getByRole("link")).toHaveCount(0);
});

for (const dropdown of [
  {
    label: "Teaching",
    firstLink: "1-Year MBA",
    lastLink: "Executive MDPs",
    minimumWidth: 240,
    adjacentLink: "PhD",
  },
  {
    label: "More",
    firstLink: "Press & Media",
    lastLink: "Contact",
    minimumWidth: 300,
    adjacentLink: "Writing",
  },
]) {
  test(`desktop header · ${dropdown.label} dropdown`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

    const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
    const trigger = primaryNav.getByRole("button", {
      name: dropdown.label,
      exact: true,
    });
    const adjacentLink = primaryNav.getByRole("link", {
      name: dropdown.adjacentLink,
      exact: true,
    });
    const menuId = await trigger.getAttribute("aria-controls");
    const headerStyles = await primaryNav.evaluate((element) => ({
      backdropFilter: window.getComputedStyle(element.firstElementChild).backdropFilter,
      position: window.getComputedStyle(element).position,
    }));

    expect(menuId).toBeTruthy();
    expect(headerStyles.position).toBe("sticky");
    expect(headerStyles.backdropFilter).not.toBe("none");
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    await expect
      .poll(async () => {
        const navBox = await primaryNav.boundingBox();
        return Math.abs((navBox?.y ?? Number.POSITIVE_INFINITY) - 12);
      })
      .toBeLessThanOrEqual(1);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    await expect(trigger).toBeVisible();
    await page.mouse.move(0, 0);
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const menu = page.locator(`#${menuId}`);
    const bridge = page.locator(`[data-dropdown-hover-bridge="${dropdown.label}"]`);
    await expect(menu).toBeVisible();
    await expect(bridge).toBeVisible();
    await expect(menu.getByRole("link", { name: dropdown.firstLink, exact: true })).toBeVisible();
    await expect(menu.getByRole("link", { name: dropdown.lastLink, exact: true })).toBeVisible();

    const box = await menu.boundingBox();
    const bridgeBox = await bridge.boundingBox();
    const adjacentLinkBox = await adjacentLink.boundingBox();
    const styles = await menu.evaluate((element) => {
      const computed = window.getComputedStyle(element);

      return {
        className: element.className,
        backdropFilter: computed.backdropFilter,
        maxHeight: computed.maxHeight,
        minWidth: computed.minWidth,
        overflowY: computed.overflowY,
      };
    });
    expect(box, `${dropdown.label} menu has no rendered box`).not.toBeNull();
    expect(bridgeBox, `${dropdown.label} bridge has no rendered box`).not.toBeNull();
    expect(adjacentLinkBox, `${dropdown.adjacentLink} has no rendered box`).not.toBeNull();
    expect(styles.backdropFilter).not.toBe("none");
    expect(box.width, `${dropdown.label} menu is too narrow`).toBeGreaterThanOrEqual(
      dropdown.minimumWidth
    );
    expect(box.x, `${dropdown.label} menu crosses the left viewport edge`).toBeGreaterThanOrEqual(
      0
    );
    expect(
      box.x + box.width,
      `${dropdown.label} menu crosses the right viewport edge`
    ).toBeLessThanOrEqual(1440);
    expect(box.y, `${dropdown.label} menu renders above the header`).toBeGreaterThan(0);
    expect(
      box.y + box.height,
      `${dropdown.label} menu crosses the bottom viewport edge: ${JSON.stringify({ box, styles })}`
    ).toBeLessThanOrEqual(900);
    expect(bridgeBox.x).toBeCloseTo(box.x, 0);
    expect(bridgeBox.width).toBeCloseTo(box.width, 0);
    expect(bridgeBox.y).toBeLessThanOrEqual(box.y);
    expect(bridgeBox.y + bridgeBox.height).toBeGreaterThanOrEqual(box.y);

    const adjacentHitTarget = await page.evaluate(
      ({ x, y }) => document.elementFromPoint(x, y)?.closest("a, button")?.textContent?.trim(),
      {
        x: adjacentLinkBox.x + adjacentLinkBox.width / 2,
        y: adjacentLinkBox.y + adjacentLinkBox.height / 2,
      }
    );
    expect(adjacentHitTarget).toBe(dropdown.adjacentLink);

    await bridge.hover();
    await page.waitForTimeout(550);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await menu.hover();

    await page.mouse.move(0, 0);
    await page.waitForTimeout(550);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.mouse.click(0, 0);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(menu.getByRole("link", { name: dropdown.firstLink, exact: true })).toBeFocused();

    await page.mouse.move(0, 0);
    await page.waitForTimeout(550);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(menu.getByRole("link", { name: dropdown.firstLink, exact: true })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();

    await page.evaluate(() => document.activeElement?.blur());
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toBeFocused();
  });
}
