export interface RetentionPattern {
  id: string;
  name: string;
  whatItLooksLike: string;
  whatItMeans: string;
}

export const retentionPatterns: readonly RetentionPattern[] = [
  {
    id: "cliff",
    name: "The cliff",
    whatItLooksLike:
      "Almost everyone who tries the product stops using it within the first few weeks, and the line keeps falling toward zero.",
    whatItMeans:
      "People don't yet have a reason to come back. This usually means the core problem isn't painful enough, or the product doesn't yet solve it well enough to earn a second visit.",
  },
  {
    id: "flattening",
    name: "The flattening curve",
    whatItLooksLike:
      "Usage drops early, the way it always does, but then levels off at some percentage and stays roughly flat for months.",
    whatItMeans:
      "You've found a group of people the product genuinely works for — the flat portion is your real audience. The job now is to find more people like them, not to change the product for people who left.",
  },
  {
    id: "growing",
    name: "The rising curve",
    whatItLooksLike:
      "Usage among a group of early users grows over time, not just holds steady — they use it more, not less, as months pass.",
    whatItMeans:
      "This is the strongest possible signal. It usually means the product gets more useful with more use — data accumulates, habits form, or the network gets more valuable.",
  },
] as const;

export interface PmfSignal {
  question: string;
  weakAnswer: string;
  strongAnswer: string;
}

export const pmfSignals: readonly PmfSignal[] = [
  {
    question: "How do users react when the product is down or broken?",
    weakAnswer: "Nobody notices, or nobody says anything.",
    strongAnswer: "You get complaints, sometimes angry ones, within minutes.",
  },
  {
    question: "How do users describe the product to a friend, unprompted?",
    weakAnswer: "They don't mention it, or need you to explain it for them.",
    strongAnswer: "They explain it in their own words, and the explanation matches what you'd say.",
  },
  {
    question: "What happens when you raise the price, even slightly?",
    weakAnswer: "Most people who were paying quietly leave.",
    strongAnswer: "Most people who were paying grumble but stay.",
  },
] as const;

export const beforeYouHaveIt = [
  "Talk to people who tried the product and stopped — not to win them back, but to learn exactly where it lost them.",
  "Narrow who you're building for. \"Everyone who might need this\" is usually nobody in particular.",
  "Ship the smallest possible change that addresses the single biggest reason people leave, then re-check retention.",
  "Resist adding features to try to keep people who were never the right audience in the first place.",
] as const;
