import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { campaignReleases, runCampaignHealth } from "./check-learning-lab-campaign.mjs";

const require = createRequire(import.meta.url);
const {
  weeklyNotes,
  getPublishedWeeklyNotes,
  getPublishedWeeklyNote,
  buildWeeklyNotesFeed,
  formatCampaignDate,
  learningCampaign,
} = require("../src/features/learning-lab/weekly-notes.ts");

assert.equal(weeklyNotes.length, 4);
assert.equal(
  (Date.parse(learningCampaign.endsAt) + 1 - Date.parse(learningCampaign.startsAt)) / 86_400_000,
  30,
  "the inclusive campaign window is exactly thirty IST calendar days"
);
assert.equal(new Set(weeklyNotes.map((note) => note.slug)).size, 4);
assert.deepEqual(
  campaignReleases,
  weeklyNotes.map((note) => [note.slug, note.publishesAt]),
  "independent monitor matches publication"
);
const publication = Date.parse("2026-10-21T04:57:43+05:30");
assert.ok(
  weeklyNotes.every((note) => Date.parse(note.publishesAt) === publication),
  "all four website notes share the actual release timestamp"
);
assert.equal(getPublishedWeeklyNotes(publication - 1).length, 0);
assert.equal(getPublishedWeeklyNotes(publication).length, 4);
assert.equal(getPublishedWeeklyNotes(Number.NaN).length, 0);
assert.equal(getPublishedWeeklyNote("missing", publication), undefined);
assert.equal(formatCampaignDate(weeklyNotes[0].publishesAt), "21 October 2026");
assert.deepEqual(
  weeklyNotes.map((note) => note.practiceEmailAt),
  [
    "2026-10-23T09:00:00+05:30",
    "2026-10-30T09:00:00+05:30",
    "2026-11-06T09:00:00+05:30",
    "2026-11-13T09:00:00+05:30",
  ],
  "optional email dates remain separate from immediate website publication"
);
const before = buildWeeklyNotesFeed(publication - 1);
const after = buildWeeklyNotesFeed(publication);
assert.equal((before.match(/<item>/g) || []).length, 0);
assert.equal((after.match(/<item>/g) || []).length, 4);
for (const note of weeklyNotes) {
  assert.equal(getPublishedWeeklyNote(note.slug, publication - 1), undefined);
  assert.equal(getPublishedWeeklyNote(note.slug, publication), note);
  assert.ok(note.sections.length >= 3);
  assert.equal(note.selfCheck.length, 3);
  assert.ok(!before.includes(`/weekly-notes/${note.slug}`));
  assert.ok(after.includes(`/weekly-notes/${note.slug}`));
  assert.ok(after.includes(`<pubDate>${new Date(publication).toUTCString()}</pubDate>`));
  const emailAt = new Date(note.practiceEmailAt);
  assert.equal(emailAt.getUTCDay(), 5);
  assert.equal(emailAt.toISOString().slice(11, 19), "03:30:00");
}
assert.equal(
  getPublishedWeeklyNotes(Date.parse("2026-11-19T00:00:00+05:30")).length,
  4,
  "published archive remains available"
);

const goodFetchAt = (now) => async (url) => {
  const path = url.pathname;
  if (path.endsWith("feed.xml"))
    return new Response(buildWeeklyNotesFeed(now), {
      headers: { "content-type": "application/rss+xml" },
    });
  const note = weeklyNotes.find((item) => path.endsWith(`/${item.slug}`));
  if (note && now < Date.parse(note.publishesAt))
    return new Response("Not available", { status: 404 });
  return new Response(
    note
      ? `<h1>${note.title}</h1><p>${note.sections[0].paragraphs[0]}</p>`
      : "<h1>Public reading</h1>"
  );
};
const goodFetch = goodFetchAt(publication);
assert.equal(
  (await runCampaignHealth({ now: publication - 1, fetchImpl: goodFetchAt(publication - 1) }))
    .passed,
  true
);
assert.equal((await runCampaignHealth({ now: publication, fetchImpl: goodFetch })).passed, true);
const firstPath = `/learning-lab/weekly-notes/${weeklyNotes[0].slug}`;
for (const [label, broken] of [
  ["missing released page", () => new Response("Not found", { status: 404 })],
  ["missing released body", () => new Response(`<h1>${weeklyNotes[0].title}</h1>`)],
  [
    "missing released heading",
    () => new Response(`<p>${weeklyNotes[0].sections[0].paragraphs[0]}</p>`),
  ],
]) {
  const report = await runCampaignHealth({
    now: publication,
    fetchImpl: async (url, options) =>
      url.pathname === firstPath ? broken() : goodFetch(url, options),
  });
  assert.equal(report.passed, false, `monitor rejects ${label}`);
}
const missingFeed = await runCampaignHealth({
  now: publication,
  fetchImpl: async (url, options) =>
    url.pathname.endsWith("feed.xml")
      ? new Response(before, { headers: { "content-type": "application/rss+xml" } })
      : goodFetch(url, options),
});
assert.equal(missingFeed.passed, false, "monitor rejects missing released RSS items");
const duplicateFeed = after.replace(
  `/weekly-notes/${weeklyNotes[0].slug}</link>`,
  `/weekly-notes/${weeklyNotes[1].slug}</link>`
);
assert.equal(
  (
    await runCampaignHealth({
      now: publication,
      fetchImpl: async (url, options) =>
        url.pathname.endsWith("feed.xml")
          ? new Response(duplicateFeed, { headers: { "content-type": "application/rss+xml" } })
          : goodFetch(url, options),
    })
  ).passed,
  false,
  "monitor rejects a duplicated or missing RSS item URL"
);
console.log(
  "PASS: four simultaneous website releases, separate Friday email dates, archive persistence, and missing page/body/heading/RSS detection."
);
