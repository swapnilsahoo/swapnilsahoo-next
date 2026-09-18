import { chromium } from "playwright";
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
p.on("console",m=>m.type()==="error"&&errs.push("console: "+m.text()));
await p.goto("http://localhost:4321/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
await p.waitForTimeout(700);

console.log("financial rows:", await p.locator("#marginBody tr").count());
console.log("segment rows:", await p.locator("#segBody tr").count());
console.log("findings hidden before reveal:", await p.locator("#findings").isHidden());

await p.locator("#revealMargins").click();
await p.waitForTimeout(400);
console.log("findings shown after reveal:", await p.locator("#findings").isVisible());
const tesla = await p.locator("#marginBody tr").last().innerText();
console.log("Tesla row:", tesla.replace(/\s+/g," "));
console.log("medians:", (await p.locator("#medGM").innerText()), (await p.locator("#medOM").innerText()), (await p.locator("#medRD").innerText()));

// original content still intact
const txt=(await p.locator("body").innerText()).toLowerCase();
for (const t of ["nokia","kodak","yahoo","urban company","asian paints","phoenix motors","collis"])
  process.stdout.write(t+"="+(txt.split(t).length-1)+" ");
console.log("\ncharts:", await p.locator("canvas").count());
for (const w of [320,768,1440]) {
  const q=await b.newPage({viewport:{width:w,height:900}});
  await q.goto("http://localhost:4321/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
  console.log("width "+w+": overflow "+(await q.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth))+"px");
  await q.close();
}
await p.locator("#exhibits").scrollIntoViewIfNeeded();
await p.waitForTimeout(300);
await p.screenshot({path:"scratch-plan/s1/review.png"});
console.log(errs.length?"ERRORS: "+errs.join(" | "):"no page errors");
await b.close();
