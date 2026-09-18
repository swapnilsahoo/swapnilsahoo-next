import { chromium } from "playwright";
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
p.on("console",m=>m.type()==="error"&&errs.push("console: "+m.text()));
await p.goto("http://localhost:4321/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
await p.waitForTimeout(900);

console.log("porter nodes:", await p.locator("#porterNodes g").count());
console.log("porter edges:", await p.locator("#porterEdges line").count());
await p.locator("#porterNodes g").first().click(); await p.waitForTimeout(250);
console.log("node click info:", (await p.locator("#porterNodeInfo").innerText()).slice(0,60));
await p.locator("#porterCopyThree").click(); await p.waitForTimeout(250);
console.log("copy-three msg:", (await p.locator("#porterCopyMsg").innerText()).slice(0,60));

await p.locator('.author-tab[data-author="collis"]').click(); await p.waitForTimeout(300);
console.log("collis samples:", await p.locator("#collisSamples button").count());
await p.locator("#collisSamples button").nth(1).click(); await p.waitForTimeout(200);
console.log("collis verdict has chips:", (await p.locator("#collisVerdict").innerHTML()).includes("Objective"));

await p.locator('.author-tab[data-author="mintzberg"]').click(); await p.waitForTimeout(300);
console.log("mintzberg svg children:", await p.locator("#mintzMap > *").count());
await p.locator("#mintzSlider").fill("100"); await p.waitForTimeout(250);
console.log("slider 100 verdict:", (await p.locator("#mintzVerdict").innerText()).slice(0,55));

console.log("example cards (global):", await p.locator("#exGrid > div").count());
await p.locator('.ex-tab[data-ex="india"]').click(); await p.waitForTimeout(300);
const names = await p.locator("#exGrid h3").allInnerTexts();
console.log("india cards:", names.join(", "));
await p.locator("#exGrid .ex-open").first().click(); await p.waitForTimeout(200);
console.log("card expands:", await p.locator("#exGrid .ex-body").first().isVisible());

const txt=(await p.locator("body").innerText()).toLowerCase();
for (const t of ["nokia","kodak","yahoo","urban company","asian paints","phoenix motors","collis","porter","mintzberg"])
  process.stdout.write(t+"="+(txt.split(t).length-1)+" ");
console.log("\ncharts:", await p.locator("canvas").count());
for (const w of [320,768,1440]) {
  const q=await b.newPage({viewport:{width:w,height:900}});
  await q.goto("http://localhost:4321/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
  console.log("width "+w+": overflow "+(await q.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth))+"px");
  await q.close();
}
console.log(errs.length?"ERRORS: "+errs.join(" | "):"no page errors");
await b.close();
