// Run against a local production server:
// pnpm exec playwright test release-smoke.spec.mjs --reporter=line --workers=1
import { expect, test } from "playwright/test";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";

const researchHubRoute = "/research";
const researchBranchRoutes = [
  "/research/neurodiversity-entrepreneurial-agency",
  "/research/bricolage-to-effectuation",
  "/research/family-business-resourcefulness",
  "/research/frugal-innovation-dynamic-capabilities",
];

const immortalsRoute = "/mythology/immortals";

const routes = [
  "/",
  researchHubRoute,
  ...researchBranchRoutes,
  "/teaching/ai-hackathon",
  "/teaching/1-year-mba",
  "/teaching/2-year-mba",
  "/teaching/karma-yoga",
  "/teaching/karma-yoga/b-schools",
  "/teaching/karma-yoga/india",
  "/teaching/business-simulation",
  "/placements",
  "/case-study-preparation",
  "/comics",
  "/mythology",
  immortalsRoute,
  "/spirituality",
  "/spirituality/bhagavad-gita",
  "/spirituality/hanuman-chalisa",
  "/spirituality/vishnu-sahasranama",
  "/spirituality/lalita-sahasranama",
  "/spirituality/shiva-tandava-stotram",
];

const inquiryRoutes = routes.filter(
  (route) =>
    !route.startsWith("/research") &&
    route !== "/teaching/karma-yoga" &&
    route !== "/teaching/karma-yoga/india"
);

const karmaYogaRoutes = [
  "/teaching/karma-yoga",
  "/teaching/karma-yoga/b-schools",
  "/teaching/karma-yoga/india",
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

for (const route of inquiryRoutes) {
  test(`${route} · inquiry prelude`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });

    const inquiry = page.locator("[data-inquiry-prelude]");
    await expect(inquiry).toHaveCount(1);
    await expect(inquiry).toBeVisible();
    const labelledBy = await inquiry.getAttribute("aria-labelledby");
    expect(labelledBy).toBeTruthy();
    await expect(inquiry.locator(`#${labelledBy}`)).toHaveCount(1);
    await expect(inquiry.getByText("Socratic lens", { exact: true })).toBeVisible();
    await expect(inquiry.getByText("First-principles lens", { exact: true })).toBeVisible();

    const socraticQuestions = inquiry.locator(
      '[data-inquiry-lens="socratic"] ol[role="list"] > li > p'
    );
    const firstPrinciplesQuestions = inquiry.locator(
      '[data-inquiry-lens="first-principles"] ol[role="list"] > li > p'
    );
    await expect(socraticQuestions).toHaveCount(4);
    await expect(firstPrinciplesQuestions).toHaveCount(4);

    const questions = inquiry.locator('ol[role="list"] > li > p');
    await expect(questions).toHaveCount(8);
    expect(
      await questions.evaluateAll((items) =>
        items.every((item) => item.textContent?.trim().endsWith("?"))
      )
    ).toBe(true);
  });
}

async function expectLoadedPhotoSet(photoSet, expectedCount) {
  const figures = photoSet.locator("figure");

  await expect(figures).toHaveCount(expectedCount);
  await expect(photoSet.locator("figcaption")).toHaveCount(expectedCount);

  for (let index = 0; index < expectedCount; index += 1) {
    const figure = figures.nth(index);
    const image = figure.getByRole("img");

    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(
        () =>
          image.evaluate(
            (element) => element.complete && element.naturalWidth > 0 && element.naturalHeight > 0
          ),
        { timeout: 15_000 }
      )
      .toBe(true);
    expect((await image.getAttribute("alt"))?.trim()).toBeTruthy();
    expect((await figure.locator("figcaption").textContent())?.trim()).toBeTruthy();
  }
}

test("Karma Yoga hub · routes visitors to two focused pathways", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/teaching/karma-yoga`, { waitUntil: "domcontentloaded" });

  const pathwayChooser = page.locator('[aria-label="Choose a Karma Yoga pathway"]');

  await expect(pathwayChooser).toHaveCount(1);
  await expect(pathwayChooser).toBeVisible();
  await expect(pathwayChooser.locator('a[href="/teaching/karma-yoga/b-schools"]')).toHaveCount(1);
  await expect(pathwayChooser.locator('a[href="/teaching/karma-yoga/india"]')).toHaveCount(1);
  await expect(page.locator("#karma-yoga-b-schools")).toHaveCount(1);
  await expect(page.locator("#karma-yoga-india")).toHaveCount(1);
  await expect(page.locator("[data-photo-set]")).toHaveCount(0);
  await expect(page.locator("#mehalchauri-timeline-title")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "A documented return", exact: true })).toHaveCount(
    0
  );
});

test("Karma Yoga for B-Schools · field-learning story and photographs", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/teaching/karma-yoga/b-schools`, {
    waitUntil: "domcontentloaded",
  });

  const main = page.locator("main");
  const bSchoolPhotoSet = main.locator('[data-photo-set="b-schools"]');

  await expect(
    main.getByRole("heading", { level: 1, name: "Karma Yoga for B-Schools" })
  ).toBeVisible();
  await expectLoadedPhotoSet(bSchoolPhotoSet, 7);
  await expect(main.locator('[data-photo-set="india"]')).toHaveCount(0);
  await expect(main.locator('[data-photo-set="historical"]')).toHaveCount(0);
  await expect(main.locator('a[href="/teaching/karma-yoga"]').first()).toHaveAttribute(
    "href",
    "/teaching/karma-yoga"
  );
  await expect(main.locator('a[href="/teaching/karma-yoga/india"]').first()).toHaveAttribute(
    "href",
    "/teaching/karma-yoga/india"
  );

  const photoSources = await bSchoolPhotoSet
    .locator("figure")
    .evaluateAll((figures) => figures.map((figure) => figure.getAttribute("data-photo-src")));
  expect(photoSources.every((source) => source?.includes("/b-schools/"))).toBe(true);
  expect(new Set(photoSources).size).toBe(photoSources.length);
});

test("Karma Yoga for India · Mehalchauri story and two documented photo sets", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/teaching/karma-yoga/india`, { waitUntil: "domcontentloaded" });

  const main = page.locator("main");
  const historicalPhotoSet = main.locator('[data-photo-set="historical"]');
  const indiaPhotoSet = main.locator('[data-photo-set="india"]');
  const heroImage = main.locator("[data-india-hero-photo] img");

  await expect(main.getByRole("heading", { level: 1, name: "Karma Yoga for India" })).toBeVisible();
  await expect(main).toContainText("Mehalchauri");
  await expect(main).toContainText("around 2009–10");
  await expect(main).toContainText("1–6 Apr 2026");
  await expect(main).toContainText("100+ children");
  await expect(main).toContainText("Ruhan Bhatia");
  await expect(
    main.getByRole("heading", {
      name: "A village partnership built through many small, connected acts.",
    })
  ).toBeVisible();
  await expect(main.getByRole("heading", { name: "Learning infrastructure" })).toBeVisible();
  await expect(main.getByRole("heading", { name: "Sport and confidence" })).toBeVisible();
  await expect(main.getByRole("heading", { name: "Livelihood experiments" })).toBeVisible();
  await expect(main).toContainText("Napier grass, mulberry and walnut");
  await expect(main).toContainText("Two LED lamps per household");
  await expect(main).toContainText("100 oak trees");
  await expect(main).toContainText("117 walnut trees");
  await expect(main).toContainText("four Mehalchauri students");
  await expect(
    main.getByRole("heading", { name: "A documented return", exact: true })
  ).toBeVisible();

  await expectLoadedPhotoSet(historicalPhotoSet, 3);
  await expectLoadedPhotoSet(indiaPhotoSet, 3);
  await expect(main.locator('[data-photo-set="b-schools"]')).toHaveCount(0);
  await expect(heroImage).toHaveCount(1);
  await heroImage.scrollIntoViewIfNeeded();
  await expect(heroImage).toBeVisible();
  await expect
    .poll(
      () =>
        heroImage.evaluate(
          (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
        ),
      { timeout: 15_000 }
    )
    .toBe(true);
  expect((await heroImage.getAttribute("alt"))?.trim()).toBeTruthy();
  await expect(main.locator('a[href="/teaching/karma-yoga"]').first()).toHaveAttribute(
    "href",
    "/teaching/karma-yoga"
  );
  await expect(main.locator('a[href="/teaching/karma-yoga/b-schools"]').first()).toHaveAttribute(
    "href",
    "/teaching/karma-yoga/b-schools"
  );

  const historicalSources = await historicalPhotoSet
    .locator("figure")
    .evaluateAll((figures) => figures.map((figure) => figure.getAttribute("data-photo-src")));
  const indiaSources = await indiaPhotoSet
    .locator("figure")
    .evaluateAll((figures) => figures.map((figure) => figure.getAttribute("data-photo-src")));
  expect(historicalSources.every((source) => source?.includes("/mehalchauri/historical/"))).toBe(
    true
  );
  expect(indiaSources.every((source) => source?.includes("/mehalchauri/"))).toBe(true);
  expect(historicalSources.filter((source) => indiaSources.includes(source))).toEqual([]);
});

test("Karma Yoga routes · unique self-canonical and Open Graph URLs", async ({ page }) => {
  const canonicalUrls = [];
  const openGraphUrls = [];

  for (const route of karmaYogaRoutes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });

    const canonical = page.locator('link[rel="canonical"]');
    const openGraphUrl = page.locator('meta[property="og:url"]');
    await expect(canonical).toHaveCount(1);
    await expect(openGraphUrl).toHaveCount(1);

    const canonicalHref = await canonical.getAttribute("href");
    const openGraphContent = await openGraphUrl.getAttribute("content");
    expect(canonicalHref).toBeTruthy();
    expect(openGraphContent).toBeTruthy();

    const canonicalUrl = new URL(canonicalHref);
    const ogUrl = new URL(openGraphContent);
    expect(canonicalUrl.pathname).toBe(route);
    expect(canonicalUrl.search).toBe("");
    expect(canonicalUrl.hash).toBe("");
    expect(ogUrl.href).toBe(canonicalUrl.href);

    canonicalUrls.push(canonicalUrl.href);
    openGraphUrls.push(ogUrl.href);
  }

  expect(new Set(canonicalUrls).size).toBe(karmaYogaRoutes.length);
  expect(new Set(openGraphUrls).size).toBe(karmaYogaRoutes.length);
});

test("Karma Yoga routes · appear exactly once in the sitemap", async ({ request }) => {
  const response = await request.get(`${baseUrl}/sitemap.xml`);
  expect(response.ok()).toBe(true);

  const xml = await response.text();
  const sitemapPaths = Array.from(
    xml.matchAll(/<loc>([^<]+)<\/loc>/g),
    ([, location]) => new URL(location).pathname
  );

  for (const route of karmaYogaRoutes) {
    expect(sitemapPaths.filter((path) => path === route)).toHaveLength(1);
  }
});

test("Karma Yoga branches · nested desktop and mobile navigation", async ({ page }) => {
  const branches = [
    { label: "For B-Schools", href: "/teaching/karma-yoga/b-schools" },
    { label: "For India · Mehalchauri", href: "/teaching/karma-yoga/india" },
  ];

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/teaching/karma-yoga`, { waitUntil: "domcontentloaded" });

  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
  const teachingTrigger = primaryNav.getByRole("button", { name: "Teaching", exact: true });
  const menuId = await teachingTrigger.getAttribute("aria-controls");
  expect(menuId).toBeTruthy();
  await teachingTrigger.hover();

  const desktopBranches = page.locator(`#${menuId}`).getByRole("list", {
    name: "Karma Yoga pages",
  });
  for (const branch of branches) {
    await expect(
      desktopBranches.getByRole("link", { name: branch.label, exact: true })
    ).toHaveAttribute("href", branch.href);
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/teaching/karma-yoga`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open site menu" }).click();

  const mobileBranches = page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("list", { name: "Karma Yoga pages" });
  for (const branch of branches) {
    await expect(
      mobileBranches.getByRole("link", { name: branch.label, exact: true })
    ).toHaveAttribute("href", branch.href);
  }
});

test("skip link · transfers keyboard focus to main content", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");

  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page).toHaveURL(/#main-content$/);
});

for (const viewport of [
  { label: "phone-320", width: 320, height: 720 },
  { label: "phone-375", width: 375, height: 812 },
  { label: "tablet-768", width: 768, height: 1024 },
]) {
  test(`mobile header · contained menu at ${viewport.label}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

    const trigger = page.getByRole("button", { name: "Open site menu" });
    await trigger.click();

    const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(mobileNav).toBeVisible();
    const panel = page.locator("#mobile-site-navigation");
    const box = await panel.boundingBox();

    expect(box).not.toBeNull();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
  });
}

test("mobile header · closes when keyboard focus leaves", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

  const trigger = page.getByRole("button", { name: "Open site menu" });
  await trigger.click();
  const contact = page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact", exact: true });
  await contact.scrollIntoViewIfNeeded();
  await contact.focus();
  await page.keyboard.press("Tab");

  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("course map · remains available on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(`${baseUrl}/teaching/1-year-mba`, { waitUntil: "domcontentloaded" });

  const courseMap = page.getByRole("navigation", { name: "On this course page" });
  await expect(courseMap).toBeVisible();
  await expect(courseMap.getByRole("link", { name: "Promise", exact: true })).toBeVisible();
  await expect(
    courseMap.getByRole("link", { name: "All 13 sessions", exact: true })
  ).toHaveAttribute("href", "#sessions");
});

test("theme toggle · persists dark mode after reload", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

  const toggle = page.getByRole("button", { name: "Switch to dark theme" });
  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveClass(/dark/);
});

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
  await expect(page.locator("[data-story-cycle]")).toHaveCount(3);

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
  const firstSlide = gallery.getByRole("group", { name: "1 of 9" });
  const photo = firstSlide.getByRole("img", {
    name: /Swapnil Sahoo with four fellow Academy of Management attendees at AOM 2026/,
  });

  await expect(firstSlide).toBeVisible();
  await expect(photo).toBeVisible();
  await expect(firstSlide).toContainText("AOM 2026 · Philadelphia Convention Center");
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(
      () =>
        photo.evaluate(
          (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
        ),
      { timeout: 15_000 }
    )
    .toBe(true);

  const dimensions = await photo.evaluate((image) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
  }));
  expect(dimensions.naturalWidth).toBeGreaterThan(0);
  expect(dimensions.naturalHeight).toBeGreaterThan(0);
  expect(dimensions.naturalWidth / dimensions.naturalHeight).toBeCloseTo(4 / 3, 2);

  await gallery.getByRole("button", { name: "Go to slide 2" }).click();

  const secondSlide = gallery.getByRole("group", { name: "2 of 9" });
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

  await gallery.getByRole("button", { name: "Go to slide 3" }).click();

  const thirdSlide = gallery.getByRole("group", { name: "3 of 9" });
  const presentationPhoto = thirdSlide.getByRole("img", {
    name: /Swapnil Sahoo presenting Reconstructing Entrepreneurship Under Constraint at AOM 2026/,
  });

  await expect(gallery.getByRole("button", { name: "Go to slide 3" })).toHaveAttribute(
    "aria-current",
    "true"
  );
  await expect(presentationPhoto).toBeVisible();
  await expect(thirdSlide).toContainText("Presenting entrepreneurship under constraint");
  await expect(thirdSlide).toContainText("co-authored with Munish Thakur");
  await expect(thirdSlide.getByRole("link")).toHaveCount(0);
  await presentationPhoto.scrollIntoViewIfNeeded();
  await expect
    .poll(
      () =>
        presentationPhoto.evaluate(
          (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
        ),
      { timeout: 15_000 }
    )
    .toBe(true);

  const presentationDimensions = await presentationPhoto.evaluate((image) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
  }));
  expect(presentationDimensions.naturalWidth / presentationDimensions.naturalHeight).toBeCloseTo(
    3 / 2,
    2
  );

  await gallery.getByRole("button", { name: "Go to slide 4" }).click();

  const fourthSlide = gallery.getByRole("group", { name: "4 of 9" });
  const portrait = fourthSlide.getByRole("img", {
    name: /Swapnil Sahoo with Prof\. J\.P\. Eggers at AOM 2026/,
  });

  await expect(gallery.getByRole("button", { name: "Go to slide 4" })).toHaveAttribute(
    "aria-current",
    "true"
  );
  await expect(portrait).toBeVisible();
  await expect(fourthSlide).toContainText("With Prof. J.P. Eggers");
  await expect(fourthSlide).toContainText("best conversations do not close questions");
  await expect(fourthSlide.getByRole("link")).toHaveCount(0);
  await portrait.scrollIntoViewIfNeeded();
  await expect
    .poll(
      () =>
        portrait.evaluate(
          (image) => image.complete && image.naturalWidth > 0 && image.naturalHeight > 0
        ),
      { timeout: 15_000 }
    )
    .toBe(true);

  const portraitDimensions = await portrait.evaluate((image) => ({
    naturalWidth: image.naturalWidth,
    naturalHeight: image.naturalHeight,
  }));
  expect(portraitDimensions.naturalWidth / portraitDimensions.naturalHeight).toBeCloseTo(4 / 3, 2);
});

test("Lalita Sahasranama · range and direct-name navigation", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto(`${baseUrl}/spirituality/lalita-sahasranama#lalita-879`, {
    waitUntil: "domcontentloaded",
  });

  const reader = page.locator("#reader");
  const rangeSelect = reader.getByLabel("Name range");
  const directEntry = page.locator("#lalita-879");

  await expect(rangeSelect).toHaveValue("Names 851–900");
  await expect(directEntry).toBeVisible();

  await reader.getByLabel("Jump to name").fill("471");
  await reader.getByRole("button", { name: "Go", exact: true }).click();

  await expect(page).toHaveURL(/#lalita-471$/);
  await expect(rangeSelect).toHaveValue("Names 451–500");
  await expect(page.locator("#lalita-471")).toContainText("सिद्धेश्वरी");
});

test("Immortals · source-aware 17-profile atlas and interaction", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}${immortalsRoute}`, { waitUntil: "domcontentloaded" });

  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 1 })).toContainText("Immortals");
  await expect(page.locator("[data-immortal-profile]")).toHaveCount(17);
  await expect(main.getByText("No verified physical immortality.", { exact: true })).toBeVisible();

  const search = main.getByLabel("Search names, places, traditions, or terms");
  await search.fill("Vallalar");
  await expect(main.getByRole("status")).toContainText("Showing 1 of 17 profiles");
  await expect(page.locator("[data-immortal-profile]:visible")).toHaveCount(1);
  await expect(page.locator('[data-immortal-profile="vallalar"]')).toBeVisible();

  await search.clear();
  await main
    .getByRole("button", { name: "Buddhist continuing & transformed presence", exact: true })
    .click();
  await expect(main.getByRole("status")).toContainText("Showing 4 of 17 profiles");
  await main.getByRole("button", { name: "Bön transformed body", exact: true }).click();
  await expect(main.getByRole("status")).toContainText("Showing 1 of 17 profiles");
  await expect(page.locator('[data-immortal-profile="shardza-tashi-gyaltsen"]')).toBeVisible();
  await main.getByRole("button", { name: "All 17", exact: true }).click();

  const kukai = page.locator("#kukai");
  const kukaiSummary = kukai.locator("summary");
  await kukaiSummary.focus();
  await page.keyboard.press("Enter");
  await expect(kukai).toHaveAttribute("open", "");
  await expect(kukai.getByText("Sources establish", { exact: true })).toBeVisible();
  await expect(kukai.getByText("Tradition records", { exact: true })).toBeVisible();
  await expect(
    kukai.getByText("Independent evidence does not establish", { exact: true })
  ).toBeVisible();

  expect(
    await kukaiSummary.evaluate((element) => element.getBoundingClientRect().height)
  ).toBeGreaterThanOrEqual(44);

  await page.goto(`${baseUrl}${immortalsRoute}#kukai`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("#kukai")).toHaveAttribute("open", "");
});

test("Immortals · authentic scripts and responsible publication boundary", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}${immortalsRoute}`, { waitUntil: "domcontentloaded" });

  const devanagari = page.locator('[lang="sa-Deva"]').first();
  const iast = page.locator('[lang="sa-Latn"]').first();
  await expect(devanagari).toBeVisible();
  await expect(iast).toBeVisible();
  expect(await devanagari.textContent()).toMatch(/[\u0900-\u097F]/u);
  expect(await iast.textContent()).toMatch(/[āīūṛṃṇṭḍṣś]/u);

  const fontVariable = await page
    .locator("html")
    .evaluate((element) => getComputedStyle(element).getPropertyValue("--font-devanagari"));
  expect(fontVariable).toMatch(/Noto[ _]Serif[ _]Devanagari/i);
  const devanagariFont = await devanagari.evaluate(async (element) => {
    await document.fonts.ready;
    return getComputedStyle(element).fontFamily;
  });
  expect(devanagariFont).toMatch(/Noto.*Serif.*Devanagari/i);

  const multilingualVariables = await page.locator("main").evaluate((element) => {
    const styles = getComputedStyle(element);
    return [
      "--font-bengali",
      "--font-gurmukhi",
      "--font-tamil",
      "--font-tibetan",
      "--font-myanmar",
      "--font-cjk-japanese",
      "--font-cjk-traditional",
    ].map((name) => styles.getPropertyValue(name));
  });
  expect(multilingualVariables.every((value) => /Noto/i.test(value))).toBe(true);

  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/�|à¤|à¥|â€|Â|■■|s{8,}/u);
  expect(text).not.toContain("8:32:16");
  expect(text).not.toContain("Stage 6");
  expect(text).not.toContain("Immortality_Traditions_FINAL.pdf");
  expect(text).not.toContain("Immortality_Traditions_Integrated_With_Original_10_Masters.pdf");
  await expect(page.locator('a[href*="Immortality_Traditions"]')).toHaveCount(0);
});

test("Immortals · metadata, branch navigation and sitemap discovery", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}${immortalsRoute}`, { waitUntil: "domcontentloaded" });

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
  expect(canonical).toBeTruthy();
  expect(openGraphUrl).toBe(canonical);
  expect(new URL(canonical).pathname).toBe(immortalsRoute);
  expect(new URL(openGraphUrl).pathname).toBe(immortalsRoute);

  const branchNav = page.getByRole("navigation", { name: "Mythology branches" });
  await expect(
    branchNav.getByRole("link", { name: "Immortals atlas", exact: true })
  ).toHaveAttribute("aria-current", "page");

  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
  const moreTrigger = primaryNav.getByRole("button", { name: "More", exact: true });
  const menuId = await moreTrigger.getAttribute("aria-controls");
  expect(menuId).toBeTruthy();
  await moreTrigger.hover();
  await expect(
    page
      .locator(`#${menuId}`)
      .getByRole("list", { name: "Mythology pages" })
      .getByRole("link", { name: "Immortals · 17 profiles", exact: true })
  ).toHaveAttribute("href", immortalsRoute);

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}${immortalsRoute}`, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open site menu" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("list", { name: "Mythology pages" })
      .getByRole("link", { name: "Immortals · 17 profiles", exact: true })
  ).toHaveAttribute("href", immortalsRoute);

  await page.goto(`${baseUrl}/mythology`, { waitUntil: "domcontentloaded" });
  await expect(
    page
      .getByRole("navigation", { name: "Mythology branches" })
      .getByRole("link", { name: "Immortals atlas", exact: true })
  ).toHaveAttribute("href", immortalsRoute);

  const sitemapResponse = await request.get(`${baseUrl}/sitemap.xml`);
  expect(sitemapResponse.ok()).toBe(true);
  const xml = await sitemapResponse.text();
  const matches = Array.from(
    xml.matchAll(/<loc>([^<]+)<\/loc>/g),
    ([, location]) => new URL(location).pathname
  ).filter((path) => path === immortalsRoute);
  expect(matches).toHaveLength(1);
});

test("Research hub · thesis foundation, four branches and collaboration boundary", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}${researchHubRoute}`, { waitUntil: "domcontentloaded" });

  const main = page.locator("main");
  await expect(main.getByRole("heading", { level: 1 })).toContainText(
    "Creating strategic possibility under constraint"
  );

  const branchNav = main.getByRole("navigation", { name: "Research branches" });
  await expect(branchNav).toHaveCount(1);
  await expect(branchNav.locator('a[href^="/research"]')).toHaveCount(5);

  for (const route of researchBranchRoutes) {
    await expect(main.locator(`a[href="${route}"]`).first()).toHaveAttribute("href", route);
  }

  const thesis = page.locator("#doctoral-foundation");
  await expect(thesis).toContainText(
    "Entrepreneurial Resourcefulness in Resource-Constrained Environments"
  );
  await expect(thesis).toContainText("Prof. Fr. Kuruvilla Pandikattu, S.J.");
  await expect(thesis).toContainText("Prof. Munish Thakur");
  await expect(thesis).toContainText("Prof. Rahul Shukla");
  await expect(thesis.getByRole("link", { name: "Request the thesis" })).toHaveAttribute(
    "href",
    /^mailto:swapnil\.sahoo@greatlakes\.edu\.in/
  );

  await expect(main.locator('a[href$=".docx"], a[href$=".pdf"]')).toHaveCount(0);
  await expect(main).toContainText("Unpublished essay manuscripts are not hosted");
});

for (const branch of [
  {
    route: "/research/neurodiversity-entrepreneurial-agency",
    title: "Neurodiversity & Entrepreneurial Agency",
  },
  {
    route: "/research/bricolage-to-effectuation",
    title: "From Bricolage to Effectuation",
  },
  {
    route: "/research/family-business-resourcefulness",
    title: "Family Business Resourcefulness",
  },
  {
    route: "/research/frugal-innovation-dynamic-capabilities",
    title: "Frugal Innovation & Dynamic Capabilities",
  },
]) {
  test(`${branch.title} · research branch contract`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}${branch.route}`, { waitUntil: "domcontentloaded" });

    const main = page.locator("main");
    await expect(main.getByRole("heading", { level: 1 })).toHaveText(branch.title);
    await expect(main.getByText("Evidence boundary", { exact: true })).toBeVisible();
    await expect(page.locator("#open-questions li")).toHaveCount(4);

    const branchNavs = main.getByRole("navigation", { name: "Research branches" });
    await expect(branchNavs).toHaveCount(2);
    await expect(branchNavs.first().locator('a[href^="/research"]')).toHaveCount(5);
    await expect(branchNavs.first().locator(`a[href="${branch.route}"]`)).toHaveAttribute(
      "aria-current",
      "page"
    );

    await expect(main.getByRole("link", { name: "Propose a collaboration" })).toHaveAttribute(
      "href",
      /^mailto:swapnil\.sahoo@greatlakes\.edu\.in/
    );
    await expect(main.locator('a[href$=".docx"], a[href$=".pdf"]')).toHaveCount(0);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    const openGraphUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(canonical).pathname).toBe(branch.route);
    expect(new URL(openGraphUrl).pathname).toBe(branch.route);
  });
}

test("Research · site navigation and sitemap discovery", async ({ page, request }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

  const primaryNav = page.getByRole("navigation", { name: "Primary navigation" });
  await expect(primaryNav.getByRole("link", { name: "Research", exact: true })).toHaveAttribute(
    "href",
    researchHubRoute
  );

  const sitemapResponse = await request.get(`${baseUrl}/sitemap.xml`);
  expect(sitemapResponse.ok()).toBe(true);
  const xml = await sitemapResponse.text();
  const sitemapPaths = Array.from(
    xml.matchAll(/<loc>([^<]+)<\/loc>/g),
    ([, location]) => new URL(location).pathname
  );

  for (const route of [researchHubRoute, ...researchBranchRoutes]) {
    expect(sitemapPaths.filter((path) => path === route)).toHaveLength(1);
  }
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
