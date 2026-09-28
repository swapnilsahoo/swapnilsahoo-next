import { chromium } from "playwright";
import fs from "fs";
const BASE = process.env.BASE || "http://localhost:4321";
const WAIT = process.env.BASE ? "domcontentloaded" : "networkidle";
const b = await chromium.launch();
let f = 0;
const ok = (l, v, x) => { if (!v) f++; console.log((v ? "PASS" : "FAIL") + "  " + l + (v ? "" : "  [" + x + "]")); };
const errs = [];
const page = async (path, w = 1440) => {
  const p = await b.newPage({ viewport: { width: w, height: 1000 } });
  p.on("pageerror", e => errs.push(path + ": " + e.message));
  p.on("console", m => m.type() === "error" && errs.push(path + ": " + m.text()));
  await p.goto(BASE + path, { waitUntil: WAIT });
  await p.waitForTimeout(1200);
  return p;
};

// ---------- guesstimates: 14 entries, the two new ones open ----------
{
  const p = await page("/placements/guesstimates");
  const txt = await p.locator("body").innerText();
  for (const [label, needle] of [["Metro fares, one city", "₹2,500 crore"], ["Coffee sachets, India daily", "1.5 crore"]]) {
    const btn = p.getByRole("button", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }).first();
    ok(`guesstimate index lists "${label}"`, (await btn.count()) > 0);
    if (await btn.count()) {
      await btn.click(); await p.waitForTimeout(500);
      ok(`"${label}" opens with its answer`, (await p.locator("body").innerText()).includes(needle), needle);
    }
  }
  ok("index says 14 guesstimates somewhere or lists 14", /14/.test(txt) || (await p.locator("button").count()) >= 14);
  await p.close();
}

// ---------- quiz index ----------
const manifest = JSON.parse(fs.readFileSync("content/quizzes/manifest.json", "utf8"));
{
  const p = await page("/teaching/quiz");
  const html = await p.content();
  const missing = manifest.filter(e => !html.includes(`/teaching/quiz/${e.sessionId}`)).map(e => e.sessionId);
  ok(`quiz index links all ${manifest.length} sessions`, missing.length === 0, missing.join(","));
  const total = manifest.reduce((n, e) => n + e.questionCount, 0);
  ok(`quiz index shows the new total (${total.toLocaleString("en-US")})`, (await p.locator("body").innerText()).replace(/,/g, "").includes(String(total)), total);
  await p.close();
}

// ---------- every new or rebuilt session: answer the question on screen correctly ----------
for (const sid of ["1yr-01", "2yr-01", "1yr-02", "2yr-02", "2yr-03", "2yr-04", "2yr-07", "2yr-08", "1yr-09"]) {
  const bank = JSON.parse(fs.readFileSync(`content/quizzes/${sid}.json`, "utf8"));
  const p = await page(`/teaching/quiz/${sid}`);
  const body = await p.locator("body").innerText();
  ok(`${sid}: shows ${bank.questionCount} questions`, body.includes(String(bank.questionCount)), bank.questionCount);
  const q = bank.questions.find(x => body.includes(x.stem.slice(0, 60)));
  ok(`${sid}: the question on screen is from the bank`, !!q);
  if (q) {
    const correct = q.options[q.answer];
    const btn = p.locator("button").filter({ hasText: correct.slice(0, 50) }).first();
    await btn.click(); await p.waitForTimeout(400);
    const after = await p.locator("body").innerText();
    ok(`${sid}: clicking the keyed answer scores 1/1`, /1\/1 this round/.test(after), after.match(/\d+\/\d+ this round/)?.[0]);
    if (q.explanation) ok(`${sid}: its explanation is revealed`, after.includes(q.explanation.slice(0, 50)));
  }
  await p.close();
}

// ---------- the question that was teaching a wrong answer is gone ----------
{
  const bank = JSON.parse(fs.readFileSync("content/quizzes/1yr-02.json", "utf8"));
  ok("withdrawn: capital-markets answer no longer keyed anywhere",
     !bank.questions.some(q => /reliance on external capital markets/.test(q.options[q.answer])));
}

// ---------- phone width ----------
for (const path of ["/placements/guesstimates", "/teaching/quiz", "/teaching/quiz/2yr-08"]) {
  const p = await page(path, 320);
  const o = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  ok(`no overflow @320 ${path}`, o === 0, o + "px");
  await p.close();
}
console.log(errs.length ? "FAIL errors: " + errs.join(" | ") : "PASS  no console errors");
console.log(f + errs.length === 0 ? "\n=== ALL CHECKS PASSED ===" : "\n=== " + (f + errs.length) + " FAILURES ===");
await b.close();
