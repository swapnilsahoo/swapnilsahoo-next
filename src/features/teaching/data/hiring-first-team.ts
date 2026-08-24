export interface EarlyHireTrait {
  id: string;
  trait: string;
  whyItMatters: string;
  redFlag: string;
}

export const earlyHireTraits: readonly EarlyHireTrait[] = [
  {
    id: "range",
    trait: "Comfort doing work outside their job title",
    whyItMatters:
      "In the first five hires, there is no org chart thick enough to protect anyone from ambiguity. The person who says \"that's not my job\" in month two is expensive far beyond their salary.",
    redFlag: "Someone who asks for a detailed job description before they'll consider joining a five-person company.",
  },
  {
    id: "evidence",
    trait: "A track record you can actually verify",
    whyItMatters:
      "Enthusiasm in an interview is cheap. A specific, checkable thing they built, shipped or fixed — that you can call a reference about — tells you far more than how well they answer questions.",
    redFlag: "Impressive-sounding claims that get vaguer, not more specific, the more you ask about them.",
  },
  {
    id: "ownership",
    trait: "They ask what they'd own, not just what they'd be paid",
    whyItMatters:
      "Early hires who think in terms of a problem they'll be responsible for tend to stay engaged when things get hard. Early hires who think only in terms of compensation tend to leave the moment a better offer appears.",
    redFlag: "Every question in the interview is about salary, title or equity, with none about the actual problem.",
  },
  {
    id: "candor",
    trait: "Willingness to disagree with you, respectfully, in the interview itself",
    whyItMatters:
      "If someone won't push back when they're trying to impress you, they certainly won't push back once they're on payroll — and you need people who will tell you when your plan is wrong.",
    redFlag: "Agreement with everything you say, including things a thoughtful outsider would reasonably question.",
  },
] as const;

export interface EquitySplit {
  scenario: string;
  approach: string;
}

export const equityGuidance = [
  "Vest everyone's equity over time (commonly four years, with a one-year cliff) — nobody, including you, should own a large stake for a role they leave after two months.",
  "Give early hires less equity than co-founders, but be specific with each person about why, so it doesn't feel arbitrary later.",
  "Write down verbally agreed equity in a document immediately — a handshake percentage remembered differently by two people is a guaranteed future conflict.",
  "Revisit the plan honestly if someone's contribution turns out to be much larger or smaller than expected — silence about this breeds resentment faster than an honest, awkward conversation.",
] as const;

export const coFounderMistakes = [
  "Splitting equity equally by default, without discussing what each person is actually contributing or risking.",
  "Avoiding the vesting conversation because it feels like distrust between friends — it isn't; it protects everyone equally.",
  "Never writing down who decides what when the two of you disagree, until the day you actually disagree.",
  "Hiring a friend or relative for a critical early role because it's comfortable, not because they're the strongest option available.",
] as const;
