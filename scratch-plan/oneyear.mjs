import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on("pageerror", e => errs.push("pageerror: " + e.message));
p.on("console", m => m.type() === "error" && errs.push("console: " + m.text()));
const bad = [];
p.on("response", r => { if (r.status() >= 400) bad.push(r.status() + " " + r.url().slice(0, 90)); });

await p.goto("https://www.swapnilsahoo.com/teaching/1-year-mba", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(2500);

console.log("title:", await p.title());
console.log("h1:", (await p.locator("h1").first().innerText()).replace(/\s+/g, " "));

// section headings, to see the learning structure
const h2 = await p.locator("h2").allInnerTexts();
console.log("\nsections (" + h2.length + "):");
h2.forEach(t => console.log("   - " + t.replace(/\s+/g, " ").slice(0, 78)));

// session count
const details = await p.locator("details").count();
console.log("\nsession accordions:", details);
console.log("quiz links:", await p.locator("a[href^='/teaching/quiz/']").count());

// outcomes list
const outcomes = await p.locator("li").filter({ hasText: "Diagnose, enhance and sustain" }).count();
console.log("outcomes rendered:", outcomes > 0);

console.log("\nhttp errors:", bad.length ? bad.join(" | ") : "none");
console.log("js errors:", errs.length ? errs.join(" | ") : "none");
await b.close();
