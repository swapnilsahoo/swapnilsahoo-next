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
  "independent monitor matches the publication calendar"
);
assert.equal(getPublishedWeeklyNotes(Date.parse("2026-10-20T12:00:00+05:30")).length, 0);
assert.equal(getPublishedWeeklyNotes(Number.NaN).length, 0);
assert.equal(getPublishedWeeklyNote("missing", Date.parse("2027-01-01")), undefined);
for (let index = 0; index < weeklyNotes.length; index++) {
  const note = weeklyNotes[index];
  const boundary = Date.parse(note.publishesAt);
  assert.equal(new Date(boundary).getUTCDay(), 5, "Friday release");
  assert.equal(new Date(boundary).toISOString().slice(11, 19), "03:30:00", "9 am IST release");
  assert.equal(
    getPublishedWeeklyNote(note.slug, boundary - 1),
    undefined,
    "not available one millisecond early"
  );
  assert.equal(getPublishedWeeklyNote(note.slug, boundary), note, "available exactly at release");
  assert.equal(getPublishedWeeklyNotes(boundary - 1).length, index);
  assert.equal(getPublishedWeeklyNotes(boundary).length, index + 1);
  assert.ok(note.sections.length >= 3);
  assert.equal(note.selfCheck.length, 3);
  const before = buildWeeklyNotesFeed(boundary - 1);
  const after = buildWeeklyNotesFeed(boundary);
  assert.ok(!before.includes(`<title>${note.title.replaceAll("&", "&amp;")}</title>`));
  assert.ok(after.includes(`<pubDate>${new Date(boundary).toUTCString()}</pubDate>`));
  assert.equal((after.match(/<item>/g) || []).length, index + 1);
  assert.ok(
    !before.includes(note.sections[0].paragraphs[0]),
    "unreleased body not exposed through feed"
  );
}
assert.equal(formatCampaignDate(weeklyNotes[0].publishesAt), "23 October 2026");
assert.equal(
  getPublishedWeeklyNotes(Date.parse("2026-11-19T00:00:00+05:30")).length,
  4,
  "published archive remains available"
);
assert.equal(
  (buildWeeklyNotesFeed(Date.parse("2026-11-19T00:00:00+05:30")).match(/<item>/g) || []).length,
  4
);
const testTime = Date.parse("2026-11-06T09:00:00+05:30");
const goodFetch = async (url) => {
  const path = url.pathname;
  if (path.endsWith("feed.xml"))
    return new Response(buildWeeklyNotesFeed(testTime), {
      headers: { "content-type": "application/rss+xml" },
    });
  const note = weeklyNotes.find((item) => path.endsWith(`/${item.slug}`));
  return new Response("<h1>Public reading</h1>", {
    status: note && Date.parse(note.publishesAt) > testTime ? 404 : 200,
  });
};
assert.equal((await runCampaignHealth({ now: testTime, fetchImpl: goodFetch })).passed, true);
const earlyRelease = await runCampaignHealth({
  now: testTime,
  fetchImpl: async (url, options) =>
    url.pathname.endsWith("/what-would-you-decline")
      ? new Response("<h1>Leaked early</h1>")
      : goodFetch(url, options),
});
assert.equal(earlyRelease.passed, false, "monitor rejects an early public page");
const missingFeed = await runCampaignHealth({
  now: testTime,
  fetchImpl: async (url, options) =>
    url.pathname.endsWith("feed.xml")
      ? new Response(buildWeeklyNotesFeed(Date.parse("2026-10-20")), {
          headers: { "content-type": "application/rss+xml" },
        })
      : goodFetch(url, options),
});
assert.equal(missingFeed.passed, false, "monitor rejects a missing released RSS item");
console.log(
  "PASS: four original notes; all IST release boundaries, feed gates, invalid dates, archive persistence and health-check detection of early pages/missing releases."
);
