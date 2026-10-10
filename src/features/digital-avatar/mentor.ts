import type { MentorLesson } from "./lesson-manifest";

export type EconomicsCase = {
  id: "original" | "transfer";
  title: string;
  price: number;
  variableCost: number;
  fixedCost: number;
  capacity: number;
  discountPrice: number;
};

// Original lesson figures and a new, explicitly fictional transfer exercise.
// These arithmetic checks do not grade a learner's prose or establish mastery.
export const economicsCases: EconomicsCase[] = [
  {
    id: "original",
    title: "TiffinTrail · original lesson case",
    price: 150,
    variableCost: 90,
    fixedCost: 12000,
    capacity: 300,
    discountPrice: 120,
  },
  {
    id: "transfer",
    title: "Fresh practice · fictional meal service",
    price: 200,
    variableCost: 120,
    fixedCost: 16000,
    capacity: 250,
    discountPrice: 180,
  },
];

export function calculateEconomics(input: EconomicsCase, discounted = false) {
  const price = discounted ? input.discountPrice : input.price;
  if (
    ![price, input.variableCost, input.fixedCost, input.capacity].every(Number.isFinite) ||
    price < 0 ||
    input.variableCost < 0 ||
    input.fixedCost < 0 ||
    !Number.isInteger(input.capacity) ||
    input.capacity <= 0
  ) {
    throw new Error("Use non-negative rupee inputs and a positive whole-unit capacity.");
  }
  const contribution = price - input.variableCost;
  const breakEven = contribution > 0 ? Math.ceil(input.fixedCost / contribution) : null;
  return {
    contribution,
    breakEven,
    feasible: breakEven !== null && breakEven <= input.capacity,
    operatingResultAtCapacity: contribution * input.capacity - input.fixedCost,
  };
}

export function readNumericAttempt(value: string): number | null {
  const normalised = value.trim().replace(/^₹\s*/, "").replace(/,/g, "");
  if (!/^-?\d+(\.\d+)?$/.test(normalised)) return null;
  const result = Number(normalised);
  return Number.isFinite(result) ? result : null;
}

export function economicsQuestions(input: EconomicsCase) {
  const standard = calculateEconomics(input);
  const discount = calculateEconomics(input, true);
  return [
    {
      id: "contribution",
      prompt: `At price ₹${input.price}, what is contribution per unit in rupees?`,
      answer: standard.contribution,
      hints: [
        "Contribution subtracts all listed variable costs from price. It is not profit.",
        `Use ₹${input.price} − ₹${input.variableCost}. Fixed cost belongs in the next step.`,
      ],
      worked: `₹${input.price} − ₹${input.variableCost} = ₹${standard.contribution} contribution per unit. Fixed cost has not yet been covered.`,
      misconception:
        "Use every listed variable cost, rather than subtracting only ingredients or treating revenue as profit.",
    },
    {
      id: "break-even",
      prompt: "How many whole units cover the listed fixed cost at the original price?",
      answer: standard.breakEven,
      hints: [
        "Divide fixed cost by contribution per unit, rather than by the selling price.",
        `Use ₹${input.fixedCost.toLocaleString("en-IN")} ÷ ₹${standard.contribution}, then round up to a whole unit.`,
      ],
      worked: `ceil(${input.fixedCost} ÷ ${standard.contribution}) = ${standard.breakEven} whole units. This is an arithmetic threshold, not a demand forecast.`,
      misconception:
        "Use contribution as the denominator. Fractional break-even units must be rounded up, never down.",
    },
    {
      id: "discount-contribution",
      prompt: `At discounted price ₹${input.discountPrice}, what is contribution per unit?`,
      answer: discount.contribution,
      hints: [
        "The exercise holds variable cost constant. Only the selling price changes.",
        `Use ₹${input.discountPrice} − ₹${input.variableCost}. More orders do not automatically mean a better operating result.`,
      ],
      worked: `₹${input.discountPrice} − ₹${input.variableCost} = ₹${discount.contribution} contribution per unit.`,
      misconception:
        "Recalculate contribution using the discounted price and the same listed variable cost.",
    },
    {
      id: "discount-break-even",
      prompt: "At the discounted price, what is whole-unit break-even volume?",
      answer: discount.breakEven,
      hints: [
        "Keep fixed cost unchanged and divide by the new contribution.",
        `Use ₹${input.fixedCost.toLocaleString("en-IN")} ÷ ₹${discount.contribution}. A partial unit cannot cover the remaining cost: round up.`,
      ],
      worked: `ceil(${input.fixedCost} ÷ ${discount.contribution}) = ${discount.breakEven} whole units. Compare this with capacity ${input.capacity} before deciding.`,
      misconception:
        "Use the discounted contribution and round up. Reusing the old break-even value misses the price change.",
    },
  ];
}

export function lessonExplanation(lesson: MentorLesson) {
  return `${lesson.explanation[0]}\n\nTry explaining the key idea in your own words. Which case fact would change your decision?`;
}
