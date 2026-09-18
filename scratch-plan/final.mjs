import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
const errs = []; p.on("pageerror", e => errs.push(e.message));

await p.goto("https://www.swapnilsahoo.com/teaching/quiz", { waitUntil: "domcontentloaded", timeout: 60000 });
console.log("index cards:", await p.locator("a[href^='/teaching/quiz/']").count());
console.log("index lead:", (await p.locator("h1 + p").innerText()).slice(0,70));

// the newly added session
const d = JSON.parse(readFileSync("content/quizzes/2yr-09.json","utf8"));
await p.goto("https://www.swapnilsahoo.com/teaching/quiz/2yr-09", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(700);
console.log("2yr-09 h1:", await p.locator("h1").first().innerText());
await p.waitForTimeout(2500);
const opts = p.locator("ul li button");
console.log("options:", await opts.count());
await opts.nth(["A","B","C","D"].indexOf(d.questions[0].answer)).click();
await p.waitForTimeout(400);
console.log("correct-answer feedback:", (await p.locator("[role=status]").innerText()).split("\n")[0]);

// 1-Year course page now links quizzes
await p.goto("https://www.swapnilsahoo.com/teaching/1-year-mba", { waitUntil: "domcontentloaded", timeout: 60000 });
const links = await p.locator("a[href^='/teaching/quiz/1yr-']").count();
console.log("1-Year page quiz links:", links);
await p.goto("https://www.swapnilsahoo.com/teaching/2-year-mba", { waitUntil: "domcontentloaded", timeout: 60000 });
console.log("2-Year page quiz links:", await p.locator("a[href^='/teaching/quiz/2yr-']").count());
console.log(errs.length ? "ERRORS: "+errs.join(" | ") : "no page errors");
await b.close();
