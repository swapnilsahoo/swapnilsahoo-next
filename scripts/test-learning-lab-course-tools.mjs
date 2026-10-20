import assert from "node:assert/strict";
import {
  buildInterviewGuide,
  calculateUnitEconomics,
  improvedTaskBrief,
} from "../src/features/learning-lab/course-tools.ts";

// Local pure helpers only; no network, account, storage or payment operations.
const base = { price: 150, variableCost: 90, fixedCost: 12000, capacity: 300, expectedUnits: 250 };
const result = calculateUnitEconomics(base);
assert.equal(result.contribution, 60);
assert.equal(result.breakEvenUnits, 200);
assert.equal(result.operatingResult, 3000);
assert.equal(result.breakEvenWithinCapacity, true);

const discount = calculateUnitEconomics({ ...base, price: 120 });
assert.equal(discount.breakEvenUnits, 400);
assert.equal(discount.breakEvenWithinCapacity, false);
assert.equal(discount.operatingResult, -4500);

const capped = calculateUnitEconomics({ ...base, expectedUnits: 500 });
assert.equal(capped.feasibleUnits, 300);
assert.equal(capped.unservedUnits, 200);
assert.equal(capped.operatingResult, 6000);
assert.equal(calculateUnitEconomics({ ...base, price: 90 }).breakEvenUnits, null);
assert.equal(calculateUnitEconomics({ ...base, price: 80 }).operatingResult, -14500);
assert.equal(calculateUnitEconomics({ ...base, price: 80 }).breakEvenUnits, null);
assert.equal(calculateUnitEconomics({ ...base, expectedUnits: 0 }).operatingResult, -12000);
assert.equal(calculateUnitEconomics({ ...base, capacity: 0 }).feasibleUnits, 0);
assert.equal(calculateUnitEconomics({ ...base, fixedCost: 0 }).breakEvenUnits, 0);
assert.equal(
  calculateUnitEconomics({ ...base, price: 0.3, variableCost: 0.1, fixedCost: 0.6 }).breakEvenUnits,
  3,
  "Compute paise to avoid floating-point extra unit"
);
assert.equal(
  calculateUnitEconomics({ ...base, fixedCost: 12001 }).breakEvenUnits,
  201,
  "Round required whole units up"
);
for (const input of [
  { ...base, price: NaN },
  { ...base, price: Infinity },
  { ...base, fixedCost: -1 },
  { ...base, price: 1.001 },
  { ...base, price: 0.00000001 },
  { ...base, capacity: 2.5 },
  { ...base, expectedUnits: 1000001 },
  { ...base, price: 1000001 },
  { ...base, fixedCost: 1000000001 },
]) {
  assert.equal(calculateUnitEconomics(input), null, "Reject invalid, unsafe or excessive input");
}

const guide = buildInterviewGuide("  office managers  ", "  arrange a meeting room  ");
assert.match(guide, /People to learn from: office managers/);
assert.match(guide, /needed to arrange a meeting room/);
assert.match(guide, /What was hardest, if anything/);
assert.match(guide, /Reported behaviour:/);
assert.match(guide, /Contrary evidence:/);
assert.match(buildInterviewGuide("", ""), /get clothing repaired/);
assert.match(improvedTaskBrief, /PERMITTED EVIDENCE/);
assert.match(improvedTaskBrief, /MISSING-FACT RULE/);
assert.match(improvedTaskBrief, /Sahaj Desk receptionist approves/);
assert.equal((improvedTaskBrief.match(/□/g) || []).length, 5);
console.log(
  "PASS course-tool arithmetic: base, discount, capacity, nonpositive contribution, whole-unit rounding, paise precision and invalid inputs; brief/interview evidence boundaries."
);
