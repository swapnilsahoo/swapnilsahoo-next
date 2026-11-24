import assert from "node:assert/strict";
import {
  buildVentureCalendar,
  conversationScriptHindi,
  conversationScriptHinglish,
  facilitatorReportTemplate,
  facilitatorSessionPlan,
  facilitatorUseNote,
  outreachMessagesHinglish,
} from "../src/features/learning-lab/founder-toolkit-extras.ts";
import { ventureDays } from "../src/features/learning-lab/venture-experiment.ts";
import { existsSync } from "node:fs";
import {
  aiPrompts,
  badToBetterQuestions,
  beginnerMistakes,
  buildConversationScript,
  buildIdeaStatement,
  campusExamples,
  campusExamplesNote,
  checkQuestion,
  checkQuestions,
  closingQuestions,
  coreQuestions,
  followUpQuestions,
  freeTools,
  ideaAlerts,
  ideaFilterChecks,
  ideaPaths,
  outreachMessages,
  scoreIdeaFilter,
  testPlaybooks,
  toolkitPath,
  toolkitStartSteps,
  toolkitTools,
  ventureDayHelp,
  whatsappShareHref,
  ycNote,
  ycResources,
  signalLadder,
  nextStepLadder,
  experimentRecordTemplate,
  testCardTemplate,
  learningCardTemplate,
  aiNotEvidence,
  conversationTarget,
} from "../src/features/learning-lab/founder-toolkit.ts";

// Every tool has a real page, unique slugs, and the hub exists.
const slugs = toolkitTools.map(({ slug }) => slug);
assert.equal(new Set(slugs).size, slugs.length, "toolkit slugs must be unique");
assert.equal(toolkitPath, "/learning-lab/toolkit");
for (const step of toolkitStartSteps) assert.ok(slugs.includes(step.slug));
for (const mistake of beginnerMistakes) assert.ok(slugs.includes(mistake.tool), mistake.id);

// Question checker: the kit's own recommended questions pass, the "bad" examples are caught.
const recommended = [
  ...coreQuestions.map((q) => q.replace("[situation]", "needed a late-night snack")),
  ...followUpQuestions,
  ...closingQuestions,
  ...badToBetterQuestions.map(({ better }) => better),
];
for (const question of recommended) {
  const result = checkQuestion(question);
  assert.notEqual(
    result.verdict,
    "fix",
    `recommended question was flagged: ${question} -> ${result.flags.map((f) => f.id)}`
  );
}
for (const { bad } of badToBetterQuestions)
  assert.equal(checkQuestion(bad).verdict, "fix", `bad question was not flagged: ${bad}`);

const flagIds = (q) => checkQuestion(q).flags.map((f) => f.id);
assert.ok(flagIds("Would you use an app for laundry?").includes("future"));
assert.ok(flagIds("How much would you pay for notes?").includes("price-guess"));
assert.ok(flagIds("Do you like my idea?").includes("pitch"));
assert.ok(flagIds("Do you like my idea?").includes("opinion"));
assert.ok(flagIds("Don't you think canteen food is bad?").includes("leading"));
assert.ok(flagIds("Do you ever skip breakfast?").includes("generic"));
assert.ok(flagIds("What do you eat and how much do you spend?").includes("double"));
assert.ok(flagIds("Is the canteen far?").includes("closed"));
assert.equal(checkQuestion("Tell me about the last time you missed breakfast.").verdict, "good");
assert.equal(checkQuestion("Can you show me how you track it?").flags.length, 0);
assert.equal(checkQuestion("").flags.length, 0);
assert.equal(checkQuestion("x".repeat(500)).question.length, 300);

const many = checkQuestions(
  "1. Would you buy it?\n\n- Tell me about the last time it happened\n" + "Why?\n".repeat(30)
);
assert.equal(many.length, 20, "checker caps at 20 questions");
assert.equal(many[0].question, "Would you buy it?", "list numbering is stripped");
assert.equal(many[1].verdict, "good");

// Idea filter.
assert.equal(scoreIdeaFilter([true, true, true, true, true, true]).verdict, "test");
assert.equal(scoreIdeaFilter([true, true, true, true, true, false]).verdict, "test");
assert.equal(scoreIdeaFilter([true, true, true, false, false, false]).verdict, "narrow");
assert.equal(scoreIdeaFilter([true, false]).verdict, "rethink");
assert.equal(scoreIdeaFilter(["true", 1, {}, null]).score, 0, "only real booleans count");
assert.equal(scoreIdeaFilter([]).total, ideaFilterChecks.length);
const statement = buildIdeaStatement({
  who: "first-year hostel students ",
  problem: "finding a snack after the mess closes.",
  when: "during exam weeks",
  workaround: "order instant noodles",
  cost: "₹80 a night",
  reach: "my floor's WhatsApp group",
  wrong: "fewer than 2 of 5 had the problem",
});
assert.match(
  statement,
  /^I think first-year hostel students struggle with finding a snack after the mess closes, especially during exam weeks\./
);
assert.match(statement, /through my floor's WhatsApp group\./);
assert.match(buildIdeaStatement({}), /\[who\].*\[problem\].*\[what would prove you wrong\]/);
assert.deepEqual(
  ideaAlerts({ problem: "I will build an app for everyone" }).map((a) => a.id),
  ["build-first", "too-broad"]
);
assert.deepEqual(ideaAlerts({ problem: "late-night snacks" }), []);
for (const path of ideaPaths)
  assert.ok(
    testPlaybooks.some(({ id }) => id === path.playbook),
    path.id
  );

// Conversation kit.
const script = buildConversationScript("hostel students", "ran out of clean clothes");
assert.match(script, /Talking to: hostel students/);
assert.match(script, /Tell me about the last time you ran out of clean clothes/);
assert.match(script, /not selling anything/);
assert.match(script, /Customer A/);
assert.match(buildConversationScript("", ""), /\[who\]/);
assert.ok(outreachMessages.every(({ message }) => message.length < 400));
assert.ok(outreachMessages.some(({ id }) => id === "after-no"));

// Playbooks stay at ₹0–₹500 and always say what to count and the pass mark.
assert.ok(testPlaybooks.length >= 5);
for (const playbook of testPlaybooks) {
  const amounts = [...playbook.cost.matchAll(/₹(\d+)/g)].map((m) => Number(m[1]));
  assert.ok(amounts.length && amounts.every((n) => n <= 500), `${playbook.id} exceeds ₹500`);
  assert.ok(playbook.count && playbook.passMark && playbook.steps.length >= 4, playbook.id);
}
assert.match(campusExamplesNote, /invented/);
assert.ok(
  campusExamples.some(({ decision }) => decision.startsWith("Stop")),
  "show that stopping is a valid result"
);

// Daily help covers all 14 days with a short checklist and a watch-out.
for (let day = 1; day <= 14; day++) {
  const help = ventureDayHelp[day];
  assert.ok(help, `missing help for day ${day}`);
  assert.ok(help.doToday.length >= 2 && help.doToday.length <= 3, `day ${day} checklist size`);
  assert.ok(help.watchOut.length > 10);
  if (help.tool) assert.ok(help.tool.href.startsWith("/learning-lab/"), `day ${day} tool link`);
}
// The idea filter must not appear before Day 3 (keeps the Day 1 baseline unaided).
assert.ok(![1, 2].some((day) => ventureDayHelp[day].tool?.href.includes("idea-filter")));

// External links are https, and the YC list carries the no-affiliation note.
const externalUrls = [
  ...freeTools.flatMap(({ tools }) => tools.map(({ url }) => url)),
  ...ycResources.flatMap(({ items }) => items.map(({ url }) => url)),
];
for (const url of externalUrls) assert.match(url, /^https:\/\//, url);
assert.equal(new Set(externalUrls).size, externalUrls.length, "duplicate external links");
assert.match(ycNote, /not affiliated with or endorsed by Y Combinator/);
assert.ok(
  aiPrompts.every(({ prompt }) => !/swapnil/i.test(prompt)),
  "prompts must not impersonate the founder"
);
assert.equal(new Set(aiPrompts.map(({ id }) => id)).size, aiPrompts.length);
assert.match(
  whatsappShareHref("Try this", "https://example.com/a"),
  /^https:\/\/wa\.me\/\?text=Try%20this%20https%3A%2F%2Fexample\.com%2Fa$/
);

// Best-practice additions: costs on the signal ladder, a pre-set pass mark, a forced decision, honest records.
assert.ok(
  signalLadder.every(({ costs }) => costs.length > 0),
  "every signal says what it costs the customer"
);
assert.equal(signalLadder[0].strength, "Counts as zero");
assert.ok(testCardTemplate.includes("At least [X] of [Y"), "test card uses an X-of-Y pass mark");
assert.ok(
  learningCardTemplate.includes("continue / change / stop"),
  "learning card forces a decision"
);
assert.match(experimentRecordTemplate, /Not a certificate/);
assert.match(aiNotEvidence, /not evidence/);
assert.match(conversationTarget, /three/);
assert.deepEqual(
  nextStepLadder.map(({ decision }) => decision),
  ["Continue", "Change", "Stop"]
);
for (const step of nextStepLadder)
  for (const link of step.links) assert.ok(link.url.startsWith("https://"), link.url);
assert.equal(
  scoreIdeaFilter([true, false, true]).riskiestGuess?.startsWith("That you can find people"),
  true
);
assert.equal(scoreIdeaFilter([true, true, true, true, true, true]).riskiestGuess, null);

// Hindi and Hinglish versions, the facilitator kit and calendar reminders.
assert.ok(
  outreachMessagesHinglish.length >= 4 &&
    outreachMessagesHinglish.every(({ message }) => message.length < 400)
);
assert.match(conversationScriptHindi, /[ऀ-ॿ]/, "Hindi script uses Devanagari");
assert.ok(conversationScriptHinglish.includes("Pichhli baar"));
assert.equal(
  facilitatorSessionPlan.at(-1).minutes.endsWith("75"),
  true,
  "session plan fills 75 minutes"
);
for (const block of facilitatorSessionPlan) assert.ok(slugs.includes(block.tool), block.title);
assert.match(facilitatorUseNote, /no partnership is implied/);
assert.match(facilitatorReportTemplate, /no customer names or personal data/);
const ics = buildVentureCalendar(
  "2026-12-01",
  "19:00",
  ventureDays,
  "https://www.swapnilsahoo.com/learning-lab/venture-experiment",
  "20261124T120000Z"
);
assert.ok(ics && ics.startsWith("BEGIN:VCALENDAR\r\n") && ics.trimEnd().endsWith("END:VCALENDAR"));
assert.equal((ics.match(/BEGIN:VEVENT/g) || []).length, 14);
assert.ok(ics.includes("DTSTART:20261201T190000") && ics.includes("DTSTART:20261214T190000"));
assert.ok(
  ics.split("\r\n").every((line) => line.length <= 75),
  "lines are folded"
);
const late = buildVentureCalendar(
  "2026-12-31",
  "23:45",
  ventureDays.slice(0, 1),
  "https://x.test/p",
  "20261124T120000Z"
);
assert.ok(late.includes("DTEND:20270101T001500"), "a late reminder ends after midnight");
for (const [date, time] of [
  ["2026-02-30", "19:00"],
  ["2026-12-01", "25:00"],
  ["bad", "19:00"],
  ["2026-12-01", "7pm"],
])
  assert.equal(
    buildVentureCalendar(date, time, ventureDays, "https://x.test", "20261124T120000Z"),
    null,
    date + " " + time
  );

assert.ok(existsSync("src/app/learning-lab/toolkit/page.tsx"), "toolkit hub page is missing");
for (const slug of slugs)
  assert.ok(
    existsSync(`src/app/learning-lab/toolkit/${slug}/page.tsx`),
    `missing page for ${slug}`
  );

console.log(
  `PASS: founder toolkit — ${toolkitTools.length} tools, ${testPlaybooks.length} playbooks, ${beginnerMistakes.length} mistakes, question checker and 14 days of daily help.`
);
