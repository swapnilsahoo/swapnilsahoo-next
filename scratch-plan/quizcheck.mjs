import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const base = "http://localhost:5954";
const sid = "2yr-12";
const data = JSON.parse(readFileSync(`content/quizzes/${sid}.json`, "utf8"));
const first = data.questions[0];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => m.type() === "error" && errors.push("console: " + m.text()));

await page.goto(`${base}/teaching/quiz/${sid}`, { waitUntil: "networkidle" });

// The rendered stem must match the data exactly.
const stem = (await page.locator("h3").first().innerText()).trim();
console.log("stem matches data:", stem === first.stem.trim());

// Deliberately choose a WRONG option and confirm the UI says so.
const wrong = ["A", "B", "C", "D"].find((l) => l !== first.answer);
const opts = page.locator("ul li button");
await opts.nth(["A","B","C","D"].indexOf(wrong)).click();
await page.waitForTimeout(250);

const feedback = await page.getByRole("status").innerText();
console.log("wrong answer feedback:", JSON.stringify(feedback.split("\n")[0]));
console.log("names the right answer:", feedback.includes(first.answer));
console.log("shows the rationale:", first.explanation ? feedback.includes(first.explanation.slice(0, 40)) : "n/a");

// Score line should now read 0 of 1.
const score = await page.locator("text=/this round/").first().innerText();
console.log("score line:", score.trim());

await page.screenshot({ path: "scratch-plan/quiz-wrong.png" });

// Advance and answer correctly.
await page.getByRole("button", { name: "Next question" }).click();
await page.waitForTimeout(200);
const q2 = data.questions[1];
await page.locator("ul li button").nth(["A","B","C","D"].indexOf(q2.answer)).click();
await page.waitForTimeout(250);
const fb2 = await page.getByRole("status").innerText();
console.log("correct answer feedback:", JSON.stringify(fb2.split("\n")[0]));
await page.screenshot({ path: "scratch-plan/quiz-right.png" });

// Responsive check
for (const w of [320, 768, 1440]) {
  const p = await browser.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(`${base}/teaching/quiz/${sid}`, { waitUntil: "networkidle" });
  const of = await p.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  console.log(`width ${w}: overflow ${of}px`);
  await p.close();
}

// Index page
await page.goto(`${base}/teaching/quiz`, { waitUntil: "networkidle" });
const cards = await page.locator("a[href^='/teaching/quiz/']").count();
console.log("index cards:", cards);
await page.screenshot({ path: "scratch-plan/quiz-index.png", fullPage: false });

console.log(errors.length ? "ERRORS:\n" + errors.join("\n") : "no page/console errors");
await browser.close();
