import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
const errs = [];
p.on("pageerror", (e) => errs.push(e.message));

await p.goto("https://www.swapnilsahoo.com/teaching/quiz", { waitUntil: "domcontentloaded", timeout: 60000 });
console.log("index h1:", (await p.locator("h1").first().innerText()).replace(/\s+/g," "));
console.log("index lead:", (await p.locator("h1 + p").innerText()).slice(0, 90));
console.log("quiz cards:", await p.locator("a[href^='/teaching/quiz/']").count());

await p.goto("https://www.swapnilsahoo.com/teaching/quiz/2yr-12", { waitUntil: "domcontentloaded", timeout: 60000 });
console.log("session h1:", await p.locator("h1").first().innerText());
await p.waitForTimeout(2500);  // let hydration attach handlers
const opts = p.locator("ul li button");
console.log("options:", await opts.count());
await opts.nth(0).click();
await p.waitForTimeout(500);
console.log("feedback:", (await p.locator("[role=status]").innerText()).split("\n")[0]);
console.log(errs.length ? "ERRORS: " + errs.join(" | ") : "no page errors");
await b.close();
