// Checks /learning-lab/entrepreneurship ("From Startup Idea to Venture Growth").
// Static checks always run: the founder's module wording, publication edits, advice boundaries
// and that every link resolves to a real route. With LAB_BASE_URL set to a local server
// (for example http://localhost:3110), it also fetches each linked page and confirms every
// #fragment exists in the rendered HTML.
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  differentiation,
  entrepreneurshipJourney,
  entrepreneurshipJourneyPath,
  journeyModules,
  journeySources,
  knowingDoingGap,
  problemStatement,
  valueProposition,
} from "../src/features/learning-lab/entrepreneurship-journey.ts";
import { freeCourses } from "../src/features/learning-lab/free-courses.ts";
import { learningPaths } from "../src/features/learning-lab/catalogue.ts";
import { weeklyNotes } from "../src/features/learning-lab/weekly-notes.ts";
import { researchBranches } from "../src/features/research/data/researchAgenda.ts";
import { toolkitTools } from "../src/features/learning-lab/founder-toolkit.ts";

const root = process.cwd();
const pageFile = path.join(root, "src/app/learning-lab/entrepreneurship/page.tsx");
const dataFile = path.join(root, "src/features/learning-lab/entrepreneurship-journey.ts");

// The founder's module text, 26 November 2026. Published verbatim.
const founderModules = [
  ["01", "Generate and Validate Startup Ideas", "Identify meaningful problems, discover entrepreneurial opportunities, assess market potential and validate customer needs before committing resources."],
  ["02", "Design Business Models and Find Customers", "Develop compelling value propositions, identify customer segments, evaluate revenue models and understand unit economics."],
  ["03", "Design and Build Great Products", "Build a Minimum Viable Product (MVP), experiment with prototypes, incorporate customer feedback and work towards product-market fit."],
  ["04", "Launch, Grow and Scale Your Venture", "Develop go-to-market strategies, acquire and retain customers, build distribution channels and experiment with sustainable growth mechanisms."],
  ["05", "Prepare to Raise Capital", "Understand entrepreneurial finance, startup valuation, bootstrapping, angel investment, venture capital, pitch decks, capitalisation tables and term sheets."],
  ["06", "Build an Entrepreneurial Organisation", "Assemble founding teams, develop organisational capabilities, manage partnerships and establish effective governance mechanisms."],
  ["07", "Manage Uncertainty, Failure and Strategic Pivots", "Apply effectuation, entrepreneurial bricolage and experimentation to make decisions under uncertainty, overcome resource constraints and respond to changing market conditions."],
];
assert.equal(entrepreneurshipJourneyPath, "/learning-lab/entrepreneurship");
assert.equal(journeyModules.length, 7);
journeyModules.forEach((module, index) => {
  const [number, title, description] = founderModules[index];
  assert.equal(module.number, number);
  assert.equal(module.title, title, `Module ${number} title is the founder's`);
  assert.equal(module.description, description, `Module ${number} description is the founder's`);
  assert.ok(module.resources.length >= 3, `Module ${number} links at least three free resources`);
  assert.ok(["open", "partial", "planned"].includes(module.availability));
  if (module.availability !== "open") assert.ok(module.notCoveredYet, `Module ${number} says what is not covered yet`);
  const hrefs = module.resources.map((resource) => resource.href);
  assert.equal(new Set(hrefs).size, hrefs.length, `Module ${number} has no duplicate links`);
});
assert.equal(entrepreneurshipJourney.title, "From Startup Idea to Venture Growth");
assert.equal(
  entrepreneurshipJourney.lead,
  "Learn how to transform an entrepreneurial idea into a viable, scalable and sustainable business."
);

// Advice boundaries: fundraising and governance are education, not advice or introductions.
const byNumber = Object.fromEntries(journeyModules.map((module) => [module.number, module]));
assert.match(byNumber["05"].caution, /Not investment, legal or tax advice/);
assert.match(byNumber["05"].caution, /does not arrange funding or introduce investors/);
assert.match(byNumber["06"].caution, /Not legal or tax advice/);
assert.match(problemStatement.gaps.find((gap) => gap.name === "Ecosystem gap").today, /does not arrange funding or introduce investors/);

// The founder's problem statement, gap table, value proposition and differentiation.
assert.equal(problemStatement.gaps.length, 5);
assert.deepEqual(
  problemStatement.gaps.map((gap) => gap.name),
  ["Knowledge gap", "Execution gap", "Resource gap", "Decision-making gap", "Ecosystem gap"]
);
assert.match(problemStatement.howMightWe, /^How might we bridge the gap between entrepreneurial knowledge and entrepreneurial action/);
assert.match(problemStatement.oneLine, /^Aspiring entrepreneurs lack an integrated, accessible and action-oriented learning ecosystem/);
assert.equal(knowingDoingGap.line, "The gap between knowing entrepreneurship and doing entrepreneurship.");
assert.deepEqual(knowingDoingGap.columns, ["What exists today", "What is missing"]);
assert.equal(knowingDoingGap.rows.length, 7);
assert.deepEqual(knowingDoingGap.rows[4], ["Selective, often costly accelerator programmes", "Accessible, free entrepreneurial learning"]);
assert.deepEqual(valueProposition.map((step) => step.title), ["Entrepreneurial Intent", "The Knowing–Doing Gap", "Our Learning Platform", "Entrepreneurial Action"]);
assert.deepEqual(valueProposition[2].chain, ["Learn", "Apply", "Experiment", "Validate", "Build"]);
assert.equal(differentiation.capability, "We are democratising the capability to become an entrepreneur.");
assert.match(differentiation.claims, /No completion rates, learning gains or comparisons are claimed yet/);
assert.equal(journeySources.length, 3);
for (const source of journeySources) assert.match(source.href, /^https:\/\//);

// Advisory notes addressed to the founder, and wording that contradicts the free Lab, stay unpublished.
const published = `${await readFile(dataFile, "utf8")}\n${await readFile(pageFile, "utf8")}`
  .split("\n")
  .filter((line) => !line.trim().startsWith("//"))
  .join("\n");
for (const phrase of [
  "I have interpreted",
  "worth incorporating",
  "For your EdTech initiative",
  "should subsequently be validated",
  "before developing the platform",
  "affordable entrepreneurial learning",
  "Expensive accelerator",
]) assert.ok(!published.includes(phrase), `Not published: ${phrase}`);

// Every link resolves to a real route file.
const links = [
  ...journeyModules.flatMap((module) => module.resources.map((resource) => resource.href)),
  ...problemStatement.gaps.map((gap) => gap.href).filter((href) => !href.startsWith("#")),
  "/learning-lab/venture-experiment#start",
];
async function routeSource(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const slug = segments.at(-1);
  if (pathname.endsWith(".html")) return path.join(root, "public", pathname);
  if (pathname.startsWith("/learning-lab/free-courses/")) {
    assert.ok(freeCourses.some((course) => course.slug === slug), `Free course exists: ${slug}`);
    return path.join(root, "src/app/learning-lab/free-courses/[slug]/page.tsx");
  }
  if (pathname.startsWith("/learning-lab/paths/")) {
    assert.ok(learningPaths.some((item) => item.slug === slug), `Learning path exists: ${slug}`);
    return path.join(root, "src/app/learning-lab/paths/[slug]/page.tsx");
  }
  if (pathname.startsWith("/learning-lab/weekly-notes/")) {
    assert.ok(weeklyNotes.some((note) => note.slug === slug), `Weekly note exists: ${slug}`);
    return path.join(root, "src/app/learning-lab/weekly-notes/[slug]/page.tsx");
  }
  if (pathname.startsWith("/learning-lab/toolkit/"))
    assert.ok(toolkitTools.some((tool) => tool.slug === slug), `Toolkit tool exists: ${slug}`);
  if (/^\/research\/[^/]+$/.test(pathname) && slug !== "phd-coursework") {
    assert.ok(researchBranches.some((branch) => branch.slug === slug), `Research branch exists: ${slug}`);
    return path.join(root, "src/app/research/[slug]/page.tsx");
  }
  return path.join(root, "src/app", pathname, "page.tsx");
}
for (const href of links) {
  assert.ok(href.startsWith("/") && !href.startsWith("//"), `Internal link: ${href}`);
  await access(await routeSource(href.split("#")[0]));
}

// Optional: rendered pages and fragments on a local server.
const base = process.env.LAB_BASE_URL;
let fragmentNote = "fragments not checked (set LAB_BASE_URL to a local server to check them)";
if (base) {
  const url = new URL(base);
  assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(url.hostname), "LAB_BASE_URL must be a local server");
  const pages = new Map();
  for (const href of [...links, entrepreneurshipJourneyPath]) {
    const [pathname, fragment] = href.split("#");
    if (!pages.has(pathname)) {
      const response = await fetch(new URL(pathname, url), { redirect: "manual" });
      assert.equal(response.status, 200, `${pathname} returns 200`);
      pages.set(pathname, await response.text());
    }
    if (fragment) assert.ok(pages.get(pathname).includes(`id="${fragment}"`), `${href}: #${fragment} exists on the rendered page`);
  }
  const page = pages.get(entrepreneurshipJourneyPath);
  for (const module of journeyModules) assert.ok(page.includes(`id="module-${module.number}"`), `module-${module.number} anchor`);
  for (const id of ["modules", "gap", "problem", "value", "difference"]) assert.ok(page.includes(`id="${id}"`), `#${id} section`);
  fragmentNote = `${pages.size} rendered pages and every #fragment checked at ${url.origin}`;
}

console.log(
  `PASS entrepreneurship journey: 7 founder modules verbatim, advice boundaries present, advisory notes unpublished, ${links.length} links resolve to real routes; ${fragmentNote}.`
);
