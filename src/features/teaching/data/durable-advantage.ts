export interface AdvantageSource {
  id: string;
  name: string;
  explanation: string;
  example: string;
}

export const advantageSources: readonly AdvantageSource[] = [
  {
    id: "cost",
    name: "A cost or efficiency advantage",
    explanation:
      "You can do the same thing for meaningfully less than a rival — through scale, a proprietary process, or access to an input others don't have. This is durable when a competitor would need years, not months, to close the gap.",
    example:
      "A telecom operator that built its own fibre network end to end can price below rivals for years and still turn a profit, because its underlying cost structure is genuinely lower, not just discounted.",
  },
  {
    id: "differentiation",
    name: "Differentiation customers will actually pay for",
    explanation:
      "Not different for its own sake — different in a way a customer notices, values and would pay a premium to keep, even once a copy shows up. The test is willingness to pay, not novelty.",
    example:
      "A D2C skincare brand whose specific formulation customers ask for by name, not just \"a moisturiser\" — the difference lives in the product, not the packaging.",
  },
  {
    id: "switching-costs",
    name: "Switching costs that make leaving expensive",
    explanation:
      "Data, workflow, integrations or relationships built up over time that a customer would have to painfully rebuild elsewhere. The advantage grows every month the customer stays, not just at the moment they sign up.",
    example:
      "A small business's accounting software after five years — every invoice, vendor record and report lives inside it. Switching means re-entering years of history, not just learning a new interface.",
  },
  {
    id: "network-effects",
    name: "Network effects",
    explanation:
      "The product becomes more valuable to each user as more people join. This means a well-funded late entrant starts from zero every time, no matter how much they spend on launch.",
    example:
      "A ride-hailing app is more useful in a city with more drivers, which makes it more attractive to riders, which attracts more drivers — a loop a new entrant has to bootstrap from scratch, city by city.",
  },
] as const;

export const durableAdvantageInquiry = [
  "If you deleted your product's marketing entirely, would customers still have a reason they couldn't easily get elsewhere?",
  "Which of the four sources below applies to your idea — and is it getting stronger or weaker each month?",
] as const;
