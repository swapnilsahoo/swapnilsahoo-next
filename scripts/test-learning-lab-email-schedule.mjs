import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { campaignNotesEnd, campaignNotesOpen } from "./learning-lab-campaign-policy.mjs";

const require = createRequire(import.meta.url);
const {
  weeklyNotes,
  getPublishedWeeklyNotes,
  getWeeklyNotesDueForEmail,
} = require("../src/features/learning-lab/weekly-notes.ts");
const emailDates = [
  "2026-10-23T09:00:00+05:30",
  "2026-10-30T09:00:00+05:30",
  "2026-11-06T09:00:00+05:30",
  "2026-11-13T09:00:00+05:30",
];
assert.equal(weeklyNotes.length, 4);
assert.deepEqual(
  weeklyNotes.map((note) => note.practiceEmailAt),
  emailDates
);
const websiteRelease = Math.max(...weeklyNotes.map((note) => Date.parse(note.publishesAt)));
assert.ok(Number.isFinite(websiteRelease));
assert.ok(
  websiteRelease < Date.parse(emailDates[0]),
  "Website release precedes the first opted-in email date."
);
assert.equal(
  getPublishedWeeklyNotes(websiteRelease).length,
  4,
  "All four practices are available together on the website."
);
assert.equal(
  getWeeklyNotesDueForEmail(websiteRelease).length,
  0,
  "Publishing all practices must not queue an early four-message email blast."
);
assert.equal(getWeeklyNotesDueForEmail(Number.NaN).length, 0);
for (const [index, value] of emailDates.entries()) {
  const boundary = Date.parse(value);
  assert.equal(new Date(boundary).getUTCDay(), 5, "The original email cadence stays Friday.");
  assert.equal(
    new Date(boundary).toISOString().slice(11, 19),
    "03:30:00",
    "Emails become due at 09:00 IST."
  );
  assert.equal(
    getWeeklyNotesDueForEmail(boundary - 1).length,
    index,
    "The next note must not become due one millisecond early."
  );
  assert.deepEqual(
    getWeeklyNotesDueForEmail(boundary).map((note) => note.slug),
    weeklyNotes.slice(0, index + 1).map((note) => note.slug)
  );
  assert.equal(
    getPublishedWeeklyNotes(boundary).length,
    4,
    "Public availability stays independent from email due dates."
  );
}
assert.equal(getWeeklyNotesDueForEmail(campaignNotesEnd).length, 4);
assert.equal(campaignNotesOpen(campaignNotesEnd), true);
assert.equal(
  campaignNotesOpen(campaignNotesEnd + 1),
  false,
  "The separate 13 November email cutoff remains enforced."
);
console.log(
  "PASS: four website practices available together; zero early emails; original Friday 09:00 IST email boundaries yield 1/2/3/4 due notes; send cutoff unchanged."
);
