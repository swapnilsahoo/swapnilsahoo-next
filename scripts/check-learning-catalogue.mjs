import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { catalogueResources, learningPaths, filterCatalogue, getCatalogueResource } from "../src/features/learning-lab/catalogue.ts";
import { freeCourses } from "../src/features/learning-lab/free-courses.ts";

const root = process.cwd();
const quizManifest = JSON.parse(await readFile(path.join(root, "content/quizzes/manifest.json"), "utf8"));
assert.equal(catalogueResources.length, 25);
assert.equal(learningPaths.length, 4);
assert.equal(new Set(catalogueResources.map((item) => item.id)).size, catalogueResources.length);
assert.equal(new Set(learningPaths.map((item) => item.slug)).size, 4);
for (const resource of catalogueResources) {
  for (const key of ["title", "summary", "outcome", "audience", "level", "prerequisites", "duration", "format", "language", "instructor", "accessNote"]) {
    assert.ok(resource[key]?.trim(), `${resource.id}: ${key}`);
  }
  assert.ok(resource.href.startsWith("/"), `${resource.id}: internal authoritative entry point`);
  const [pathname, anchor] = resource.href.split("#");
  let source;
  if (pathname.endsWith(".html")) source = path.join(root, "public", pathname);
  else if (pathname.startsWith("/learning-lab/free-courses/")) {
    assert.ok(freeCourses.some((item) => item.slug === pathname.split("/").at(-1)));
    source = path.join(root, "src/app/learning-lab/free-courses/[slug]/page.tsx");
  } else if (pathname.startsWith("/teaching/quiz/")) {
    assert.ok(quizManifest.some((item) => item.sessionId === pathname.split("/").at(-1)), "Quiz identifier exists in the real manifest");
    source = path.join(root, "src/app/teaching/quiz/[session]/page.tsx");
  } else if (pathname.startsWith("/learning-lab/programmes/")) source = path.join(root, "src/app/learning-lab/programmes/[slug]/page.tsx");
  else source = path.join(root, "src/app", pathname, "page.tsx");
  await access(source);
  if (anchor) {
    const anchorSource = pathname === "/teaching/1-year-mba"
      ? path.join(root, "src/app/teaching/1-year-mba/OneYearMbaExperience.tsx") : source;
    const text = await readFile(anchorSource, "utf8");
    assert.ok(text.includes(`id="${anchor}"`), `${resource.id}: anchor exists in source`);
  }
}
for (const course of freeCourses) {
  const resource = getCatalogueResource(course.slug);
  assert.equal(resource?.title, course.title);
  assert.equal(resource?.outcome, course.output);
  assert.equal(resource?.duration, `About ${course.minutes} minutes`);
}
for (const learningPath of learningPaths) {
  assert.ok(learningPath.resourceIds.length >= 4);
  assert.equal(new Set(learningPath.resourceIds).size, learningPath.resourceIds.length);
  for (const id of [...learningPath.resourceIds, ...learningPath.optionalIds]) assert.ok(getCatalogueResource(id), `Path pointer: ${id}`);
  for (const id of learningPath.resourceIds) assert.equal(getCatalogueResource(id)?.access, "open", "Core steps need no academic/beta access");
  assert.equal(learningPath.challenge.prompts.length, 4);
  assert.equal(learningPath.challenge.checks.length, 4);
}
for (const [query, expected] of [["contribution", "read-your-unit-economics"], ["margin", "read-your-unit-economics"], ["customer discovery", "ask-better-customer-questions"], ["consulting case", "case-frameworks"], ["AI workflow", "write-an-ai-task-brief"]]) {
  assert.ok(filterCatalogue(catalogueResources, { query }).some((item) => item.id === expected), `Skill synonym: ${query}`);
}
assert.equal(filterCatalogue(catalogueResources, { query: "no-such-skill-zzzz" }).length, 0);
assert.equal(filterCatalogue(catalogueResources, { access: "academic" }).length, 4);
assert.equal(filterCatalogue(catalogueResources, { access: "beta" }).length, 1);
assert.equal(filterCatalogue(catalogueResources, { level: "Introductory", access: "open", resourceIds: learningPaths[0].resourceIds }).length, 2);
for (const file of ["finding-product-market-fit.pptx", "pitching-and-storytelling.pptx", "hiring-your-first-five-people.pptx", "raising-money-without-losing-the-company.pptx", "building-a-durable-competitive-advantage.pptx"]) await access(path.join(root, "public/downloads", file));
console.log("Learning catalogue passed: 25 verified internal resources, four open core paths, real quiz/anchor/download targets, source-aligned mini-course metadata and skill/access/level filters.");
