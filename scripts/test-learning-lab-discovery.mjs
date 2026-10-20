import assert from "node:assert/strict";
import sitemapModule from "../src/app/sitemap.ts";
import { catalogueResources } from "../src/features/learning-lab/catalogue.ts";
import { freeCourses } from "../src/features/learning-lab/free-courses.ts";

// tsx exposes the default through a CJS wrapper in this repository's Node setup.
const sitemap = typeof sitemapModule === "function" ? sitemapModule : sitemapModule.default;
const entries = sitemap(),
  urls = entries.map((entry) => entry.url);
const origin = new URL(urls[0]).origin;
assert.equal(new Set(urls).size, urls.length, "Sitemap URLs are unique");
assert.ok(urls.every((url) => !new URL(url).hash && !new URL(url).search));
for (const resource of catalogueResources) {
  assert.ok(
    urls.includes(origin + resource.href.split(/[?#]/)[0]),
    `${resource.id}: catalogue destination is in sitemap`
  );
}
for (let session = 1; session <= 13; session++) {
  assert.ok(urls.includes(`${origin}/teaching/1-year-mba/session${session}.html`));
}
for (const privatePath of [
  "/learning-lab/admin",
  "/learning-lab/login",
  "/learning-lab/learner",
  "/api/",
]) {
  assert.ok(
    !urls.some((url) => new URL(url).pathname.startsWith(privatePath)),
    "Private operations stay out of the public sitemap"
  );
}
const enhanced = freeCourses.filter((course) => course.question);
assert.deepEqual(
  enhanced.map((course) => course.slug),
  ["write-an-ai-task-brief", "read-your-unit-economics", "ask-better-customer-questions"]
);
for (const course of enhanced) {
  assert.ok(course.shortAnswer && course.searchTitle && course.revisedOn === "2026-10-20");
  assert.equal(course.lessons.length, 3, "Original reading sequence is retained");
  assert.ok(course.demo.checkpoint && course.demo.modelAnswer.length && course.sources.length);
}
console.log(
  `Discovery checks passed: ${urls.length} unique sitemap URLs, 25 catalogue destinations, 13 MBA lessons and three enhanced course entries.`
);
