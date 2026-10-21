import assert from "node:assert/strict";
import {
  recommendNextTask,
  ventureDays,
  ventureEvidenceRubric,
  ventureStages,
} from "../src/features/learning-lab/venture-experiment.ts";

assert.deepEqual(
  ventureDays.map(({ day }) => day),
  Array.from({ length: 14 }, (_, i) => i + 1)
);
assert.ok(ventureDays.every(({ stage }) => ventureStages.some(({ id }) => id === stage)));
assert.equal(ventureEvidenceRubric.length, 4);
const constraints = {
  day: 9,
  skills: "coding",
  minutesPerDay: 30,
  customerAccess: "direct",
  affordableCommitment: 0,
};
const free = recommendNextTask(constraints);
assert.equal(free.budgetLimit, 0);
assert.ok(free.adaptations.some((text) => text.includes("₹0")));
assert.ok(free.adaptations.some((text) => text.includes("coding a product")));
assert.equal(free.readyForCustomerTest, true);
assert.equal(free.title, ventureDays[8].title);

for (const customerAccess of ["none", "indirect", "invalid"]) {
  const blocked = recommendNextTask({ ...constraints, customerAccess });
  assert.equal(blocked.readyForCustomerTest, false);
  assert.match(blocked.title, /Resolve customer access/);
  assert.match(blocked.output, /honest access barrier/);
}
for (const minutesPerDay of [0, -1, Number.NaN, Infinity]) {
  const paused = recommendNextTask({ ...constraints, minutesPerDay });
  assert.equal(paused.minutes, 0);
  assert.equal(paused.readyForCustomerTest, false);
  assert.match(paused.output, /decision to pause/);
}
const limited = recommendNextTask({ ...constraints, minutesPerDay: 10 });
assert.equal(limited.readyForCustomerTest, false);
assert.ok(limited.adaptations.some((text) => text.includes("more than 14 days")));
for (const affordableCommitment of [-10, Number.NaN, Infinity]) {
  assert.equal(recommendNextTask({ ...constraints, affordableCommitment }).budgetLimit, 0);
}
for (const affordableCommitment of [1, 51.7, 1000, 10000]) {
  const { budgetLimit } = recommendNextTask({ ...constraints, affordableCommitment });
  assert.ok(budgetLimit >= 0 && budgetLimit <= affordableCommitment && budgetLimit <= 1000);
}
assert.equal(recommendNextTask({ ...constraints, day: 99, minutesPerDay: 500 }).day, 14);
assert.equal(recommendNextTask({ ...constraints, day: -1 }).day, 1);
assert.equal(recommendNextTask({ ...constraints, day: Number.NaN }).day, 1);
assert.equal(
  recommendNextTask({ ...constraints, skills: "writing" }).adaptations.some((text) =>
    text.includes("labelled sketch")
  ),
  true
);
assert.equal(
  recommendNextTask({ ...constraints, skills: "repair" }).adaptations.some((text) =>
    text.includes("available materials")
  ),
  true
);
assert.deepEqual(
  constraints,
  {
    day: 9,
    skills: "coding",
    minutesPerDay: 30,
    customerAccess: "direct",
    affordableCommitment: 0,
  },
  "recommendation must not mutate the learner's inputs"
);
console.log(
  "PASS: 14-day curriculum and constraint-based recommendations, including no time, no access and zero budget."
);
