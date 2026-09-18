import { chromium } from "playwright";
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});
const errs=[]; p.on("pageerror",e=>errs.push(e.message));
p.on("console",m=>m.type()==="error"&&errs.push("console: "+m.text()));
await p.goto("https://www.swapnilsahoo.com/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
await p.waitForTimeout(4000);

const h2=await p.locator("h2").allInnerTexts();
console.log("sections ("+h2.length+"):"); h2.forEach(t=>console.log("   - "+t.replace(/\s+/g," ").slice(0,58)));

const txt=(await p.locator("body").innerText()).toLowerCase();
console.log("\nORIGINAL content restored:");
for(const t of ["nokia","kodak","yahoo","urban company","rebel foods","reliance jio","nirma","titan","asian paints","southwest","ikea","blockbuster","phoenix motors"])
  process.stdout.write(t+"="+(txt.split(t).length-1)+"  ");
console.log("\n\nNEW content present:");
for(const t of ["collis","rukstad","objective","scope","advantage","tesla","references"])
  process.stdout.write(t+"="+(txt.split(t).length-1)+"  ");

console.log("\n\ncharts rendered:", await p.locator("canvas").count());
console.log("original quiz mounted:", await p.locator("#quiz-container > *").count() > 0);
console.log("my concept quiz:", await p.locator("#conceptQuiz > *").count());
console.log("my sorter items:", await p.locator("#oeSorter li").count());
console.log("my classifier items:", await p.locator("#emClassifier li").count());

// interaction smoke test
await p.locator("#oeSorter li").first().getByRole("button",{name:"Strategy"}).click();
await p.waitForTimeout(200);
console.log("sorter works:", (await p.locator("#oeSorter li").first().locator(".verdict").innerText()).slice(0,50));

console.log("copyright:", (await p.locator("body").innerText()).match(/Sahoo 20\d\d/g));
for(const w of [320,768,1440]){
  const q=await b.newPage({viewport:{width:w,height:900}});
  await q.goto("https://www.swapnilsahoo.com/teaching/1-year-mba/session1.html",{waitUntil:"networkidle"});
  console.log("width "+w+": overflow "+(await q.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth))+"px");
  await q.close();
}
console.log(errs.length?"ERRORS: "+errs.join(" | "):"no page errors");
await b.close();
