export type UnitEconomicsInput = {
  price: number;
  variableCost: number;
  fixedCost: number;
  capacity: number;
  expectedUnits: number;
};

/** One product, one month, constant costs within the entered capacity. Money uses paise. */
export function calculateUnitEconomics(input: UnitEconomicsInput) {
  const money = [input.price, input.variableCost, input.fixedCost];
  const units = [input.capacity, input.expectedUnits];
  if (
    money.some(
      (value, index) =>
        !Number.isFinite(value) ||
        value < 0 ||
        value > (index === 2 ? 1_000_000_000 : 1_000_000) ||
        value !== Math.round(value * 100) / 100
    ) ||
    units.some((value) => !Number.isSafeInteger(value) || value < 0 || value > 1_000_000)
  )
    return null;

  const [price, variableCost, fixedCost] = money.map((value) => Math.round(value * 100));
  const contribution = price - variableCost;
  const feasibleUnits = Math.min(input.capacity, input.expectedUnits);
  const breakEvenUnits = contribution > 0 ? Math.ceil(fixedCost / contribution) : null;
  return {
    contribution: contribution / 100,
    breakEvenUnits,
    breakEvenWithinCapacity: breakEvenUnits === null ? null : breakEvenUnits <= input.capacity,
    feasibleUnits,
    unservedUnits: input.expectedUnits - feasibleUnits,
    revenue: (price * feasibleUnits) / 100,
    operatingResult: (contribution * feasibleUnits - fixedCost) / 100,
    atCapacityResult: (contribution * input.capacity - fixedCost) / 100,
  };
}

export const weakTaskBrief =
  "Help with customers. Act like an expert receptionist, be friendly and confirm the booking quickly.";

export const improvedTaskBrief = `TASK
Prepare a draft reply for the Sahaj Desk receptionist to review. Do not send it, confirm a booking, take payment or choose a price.

PERMITTED EVIDENCE
Use only this fictional enquiry and policy. Enquiry: “Can six of us book Friday from 5:30–7 pm?” Policy: room capacity is eight; closing time is 6 pm. No dated availability or authorised price sheet is supplied.

OUTPUT
1. A polite draft of no more than 100 words.
2. The supplied policy facts used.
3. Missing facts and questions for the receptionist.

MISSING-FACT RULE
Never invent a price, available slot or confirmation. Explain the 6 pm closing limit and ask whether an earlier or shorter meeting would work. Flag the exact date, acceptable duration, availability and price for human verification.

REVIEWER
The Sahaj Desk receptionist approves the final reply after checking actual availability and authorised prices.

FIVE REVIEW CHECKS
□ Every factual claim matches permitted evidence.
□ The reply respects capacity and closing time.
□ No unnecessary personal information is requested.
□ Missing facts and unresolved questions are visible.
□ The tone is respectful and the draft is within 100 words.`;

export function buildInterviewGuide(audience: string, task: string) {
  const group = audience.trim() || "local residents";
  const activity = task.trim() || "get clothing repaired";
  return `CUSTOMER INTERVIEW GUIDE
People to learn from: ${group}
Recent task to explore: ${activity}

Before starting: explain the purpose and ask permission to take brief notes. Do not request sensitive details. Listen before presenting a solution.

1. Tell me about the last time you needed to ${activity}. When was that?
2. Walk me through what you did. What alternatives did you consider?
3. What was hardest, if anything? What happened next?
4. Who decided how to handle it? What influenced that decision?
5. What time, effort or money did you actually spend? Approximate amounts are enough.

If they have no recent example, record that; do not invent a problem for them. Follow their answer with “Can you tell me more about that?” rather than suggesting the answer.

EVIDENCE LOG
Reported behaviour:
My interpretation:
Contrary evidence:
What remains unknown:
Next small test:

SUMMARY CHECK
Record how many people were interviewed, how they were selected and how many reported the behaviour. Praise, permission to follow up, booking and payment are different events. A small voluntary sample does not establish market-wide demand.`;
}
