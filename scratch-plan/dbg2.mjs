import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const data = JSON.parse(readFileSync("content/quizzes/2yr-12.json", "utf8"));
const first = data.questions[0];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 950 } });
p.on("pageerror", (e) => console.log("PAGEERROR:", e.message));
await p.goto("http://localhost:5952/teaching/quiz/2yr-12", { waitUntil: "networkidle" });
await p.waitForTimeout(800);

const opts = p.locator("ul li button");
console.log("option buttons:", await opts.count());
const wrongIdx = ["A","B","C","D"].findIndex((l) => l !== first.answer);
console.log("correct is", first.answer, "- clicking index", wrongIdx);
await opts.nth(wrongIdx).click();
await p.waitForTimeout(600);

const statusCount = await p.locator("[role=status]").count();
console.log("status blocks after click:", statusCount);
if (statusCount) console.log("text:", (await p.locator("[role=status]").innerText()).slice(0,180));
const disabled = await opts.nth(wrongIdx).isDisabled();
console.log("clicked button now disabled:", disabled);
await p.screenshot({ path: "scratch-plan/dbg2.png" });
await b.close();
