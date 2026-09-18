import { chromium } from "playwright";
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
await p.goto("http://localhost:5977/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
await p.waitForTimeout(800);

// Porter/Mintzberg lens toggles on the Nokia card
const lens = p.getByRole("button",{name:/Analyze with Porter/i}).first();
console.log("lens buttons:", await p.getByRole("button",{name:/Analyze with/i}).count());
await lens.click(); await p.waitForTimeout(300);
const vis = await p.locator("text=/Confused Operational Effectiveness/").first().isVisible().catch(()=>false);
console.log("Porter lens reveals Nokia analysis:", vis);

// original quiz
const q = p.locator("#quiz-container");
console.log("original quiz questions:", await q.locator("button, .option, li").count() > 0);

// workshop choice
const ws = p.locator("#activities button").first();
console.log("activity buttons:", await p.locator("#activities button").count());
await ws.click(); await p.waitForTimeout(400);
console.log("modal shown after choice:", await p.locator("#modal").isVisible().catch(()=>false));

// simulation container
console.log("simulation present:", await p.locator("#simulation-container").count());

// mobile nav select
const m=await b.newPage({viewport:{width:390,height:844}});
await m.goto("http://localhost:5977/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
console.log("mobile nav options:", await m.locator("#mobile-nav option").count());
await m.close();
console.log(errs.length?"ERRORS: "+errs.join(" | "):"no page errors");
await b.close();
