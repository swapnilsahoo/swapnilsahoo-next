import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
p.on("console",m=>m.type()==="error"&&errs.push("console: "+m.text()));
await p.goto("http://localhost:5972/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});

console.log("title:", await p.title());
const h2 = await p.locator("h2").allInnerTexts();
console.log("sections:"); h2.forEach(t=>console.log("   - "+t.replace(/\s+/g," ").slice(0,62)));

// coverage check against required readings
const text = (await p.locator("body").innerText()).toLowerCase();
for (const t of ["porter","mintzberg","collis","rukstad","tesla","musk","emergent","deliberate","objective","scope","advantage","trade-off","fit"]) {
  process.stdout.write(t+"="+(text.split(t).length-1)+"  ");
}
console.log("\n");

// interactive: Q1 sorter
await p.waitForTimeout(2000);
const first = p.locator("#sorter li").first();
await first.getByRole("button",{name:"Strategy"}).click();
await p.waitForTimeout(200);
console.log("sorter verdict:", (await first.locator(".verdict").innerText()).slice(0,80));

// quiz: answer q1 wrong
const q1 = p.locator("#quiz > div").first();
await q1.locator("button.opt").nth(0).click();
await p.waitForTimeout(200);
console.log("quiz verdict:", (await q1.locator(".verdict").innerText()).slice(0,90));

// strategy statement builder
await p.locator("#sObj").fill("be the leading provider");
await p.waitForTimeout(250);
console.log("builder warning:", (await p.locator("#sWarn").innerText()).slice(0,90));

for (const w of [320,768,1440]) {
  const q = await b.newPage({viewport:{width:w,height:900}});
  await q.goto("http://localhost:5972/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
  const of = await q.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  console.log("width "+w+": overflow "+of+"px");
  await q.close();
}
console.log(errs.length?"ERRORS: "+errs.join(" | "):"no page errors");
await p.screenshot({path:"scratch-plan/s1-new.png"});
await b.close();
