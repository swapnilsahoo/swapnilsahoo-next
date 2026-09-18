import { chromium } from "playwright";

const browser = await chromium.launch();
const out = "scratch-plan";
const url = "http://localhost:5951/placements/guesstimates";

// Wide desktop — checks the standing "minimise desktop whitespace" instruction
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});

await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({ content: ".reveal-pending{opacity:1!important;transform:none!important}" });
await page.waitForTimeout(400);

// Scroll to the explorer rather than the top of the page
const explorer = page.getByText("Filter by difficulty").first();
await explorer.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: `${out}/g-desktop.png` });

// Horizontal-overflow check at the narrow end, per editorial-standard section 3
for (const w of [320, 768, 1440]) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url, { waitUntil: "networkidle" });
  const overflow = await p.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  console.log(`width ${w}: horizontal overflow = ${overflow}px`);
  if (w === 320) await p.screenshot({ path: `${out}/g-320.png` });
  await p.close();
}

// Click a Hard item and confirm the panel swaps
await page.getByRole("button", { name: "Hard" }).first().click();
await page.waitForTimeout(400);
const shown = await page.getByText(/of 12 shown/).first().textContent();
console.log("filter says:", shown?.trim());
await page.screenshot({ path: `${out}/g-filtered.png` });

console.log(errors.length ? "PAGE ERRORS:\n" + errors.join("\n") : "no page/console errors");
await browser.close();
