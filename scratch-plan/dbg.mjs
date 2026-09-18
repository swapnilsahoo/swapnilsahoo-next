import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 950 } });
await p.goto("http://localhost:5952/teaching/quiz/2yr-12", { waitUntil: "networkidle" });
const names = await p.locator("button").evaluateAll((els) =>
  els.map((e) => (e.innerText || "").replace(/\s+/g, " ").slice(0, 70))
);
console.log("buttons on page:");
names.forEach((n, i) => console.log("  " + i + ": " + JSON.stringify(n)));
await b.close();
