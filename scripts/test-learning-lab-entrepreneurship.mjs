// Checks /learning-lab/entrepreneurship ("From Startup Idea to Venture Growth").
// Static checks always run: the founder's module wording, publication edits, advice boundaries
// and that every link resolves to a real route. With LAB_BASE_URL set to a local server
// (for example http://localhost:3110), it also fetches each linked page and confirms every
// #fragment exists in the rendered HTML.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
import { checkLabLinks } from "./learning-lab-links.mjs";

const root = process.cwd();
const pageFile = path.join(root, "src/app/learning-lab/entrepreneurship/page.tsx");
const dataFile = path.join(root, "src/features/learning-lab/entrepreneurship-journey.ts");

// The founder's module text, 26 November 2026. Published verbatim.
const founderModules = [
  [
    "01",
    "Generate and Validate Startup Ideas",
    "Identify meaningful problems, discover entrepreneurial opportunities, assess market potential and validate customer needs before committing resources.",
  ],
  [
    "02",
    "Design Business Models and Find Customers",
    "Develop compelling value propositions, identify customer segments, evaluate revenue models and understand unit economics.",
  ],
  [
    "03",
    "Design and Build Great Products",
    "Build a Minimum Viable Product (MVP), experiment with prototypes, incorporate customer feedback and work towards product-market fit.",
  ],
  [
    "04",
    "Launch, Grow and Scale Your Venture",
    "Develop go-to-market strategies, acquire and retain customers, build distribution channels and experiment with sustainable growth mechanisms.",
  ],
  [
    "05",
    "Prepare to Raise Capital",
    "Understand entrepreneurial finance, startup valuation, bootstrapping, angel investment, venture capital, pitch decks, capitalisation tables and term sheets.",
  ],
  [
    "06",
    "Build an Entrepreneurial Organisation",
    "Assemble founding teams, develop organisational capabilities, manage partnerships and establish effective governance mechanisms.",
  ],
  [
    "07",
    "Manage Uncertainty, Failure and Strategic Pivots",
    "Apply effectuation, entrepreneurial bricolage and experimentation to make decisions under uncertainty, overcome resource constraints and respond to changing market conditions.",
  ],
];
assert.equal(entrepreneurshipJourneyPath, "/learning-lab/entrepreneurship");
assert.equal(journeyModules.length, 7);
journeyModules.forEach((item, index) => {
  const [number, title, description] = founderModules[index];
  assert.equal(item.number, number);
  assert.equal(item.title, title, `Module ${number} title is the founder's`);
  assert.equal(item.description, description, `Module ${number} description is the founder's`);
  assert.ok(item.resources.length >= 3, `Module ${number} links at least three free resources`);
  assert.ok(["open", "partial", "planned"].includes(item.availability));
  if (item.availability !== "open")
    assert.ok(item.notCoveredYet, `Module ${number} says what is not covered yet`);
  const hrefs = item.resources.map((resource) => resource.href);
  assert.equal(new Set(hrefs).size, hrefs.length, `Module ${number} has no duplicate links`);
});
assert.equal(entrepreneurshipJourney.title, "From Startup Idea to Venture Growth");
assert.equal(
  entrepreneurshipJourney.lead,
  "Learn how to transform an entrepreneurial idea into a viable, scalable and sustainable business."
);

// Advice boundaries: fundraising and governance are education, not advice or introductions.
const byNumber = Object.fromEntries(journeyModules.map((item) => [item.number, item]));
assert.match(byNumber["05"].caution, /Not investment, legal or tax advice/);
assert.match(byNumber["05"].caution, /does not arrange funding or introduce investors/);
assert.match(byNumber["06"].caution, /Not legal or tax advice/);
assert.match(
  problemStatement.gaps.find((gap) => gap.name === "Ecosystem gap").today,
  /does not arrange funding or introduce investors/
);

// The founder's problem statement, gap table, value proposition and differentiation.
assert.equal(problemStatement.gaps.length, 5);
assert.deepEqual(
  problemStatement.gaps.map((gap) => gap.name),
  ["Knowledge gap", "Execution gap", "Resource gap", "Decision-making gap", "Ecosystem gap"]
);
assert.match(
  problemStatement.howMightWe,
  /^How might we bridge the gap between entrepreneurial knowledge and entrepreneurial action/
);
assert.match(
  problemStatement.oneLine,
  /^Aspiring entrepreneurs lack an integrated, accessible and action-oriented learning ecosystem/
);
assert.equal(
  knowingDoingGap.line,
  "The gap between knowing entrepreneurship and doing entrepreneurship."
);
assert.deepEqual(knowingDoingGap.columns, ["What exists today", "What is missing"]);
assert.equal(knowingDoingGap.rows.length, 7);
assert.deepEqual(knowingDoingGap.rows[4], [
  "Selective, often costly accelerator programmes",
  "Accessible, free entrepreneurial learning",
]);
assert.deepEqual(
  valueProposition.map((step) => step.title),
  [
    "Entrepreneurial Intent",
    "The Knowing–Doing Gap",
    "Our Learning Platform",
    "Entrepreneurial Action",
  ]
);
assert.deepEqual(valueProposition[2].chain, ["Learn", "Apply", "Experiment", "Validate", "Build"]);
assert.equal(
  differentiation.capability,
  "We are democratising the capability to become an entrepreneur."
);
assert.match(
  differentiation.claims,
  /No completion rates, learning gains or comparisons are claimed yet/
);
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
])
  assert.ok(!published.includes(phrase), `Not published: ${phrase}`);

// Every link resolves to a real route file.
const links = [
  ...journeyModules.flatMap((item) => item.resources.map((resource) => resource.href)),
  ...problemStatement.gaps.map((gap) => gap.href).filter((href) => !href.startsWith("#")),
  "/learning-lab/venture-experiment#start",
];
const { pages, note: fragmentNote } = await checkLabLinks(links, {
  root,
  extraPages: [entrepreneurshipJourneyPath],
});
const page = pages.get(entrepreneurshipJourneyPath);
if (page) {
  for (const item of journeyModules)
    assert.ok(page.includes(`id="module-${item.number}"`), `module-${item.number} anchor`);
  for (const id of ["modules", "gap", "problem", "value", "difference"])
    assert.ok(page.includes(`id="${id}"`), `#${id} section`);
}

console.log(
  `PASS entrepreneurship journey: 7 founder modules verbatim, advice boundaries present, advisory notes unpublished, ${links.length} links resolve to real routes; ${fragmentNote}.`
);
