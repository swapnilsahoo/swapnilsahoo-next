export interface PitchAudience {
  id: string;
  audience: string;
  whatTheyActuallyWant: string;
  openingLine: string;
}

export const pitchAudiences: readonly PitchAudience[] = [
  {
    id: "investor",
    audience: "An investor",
    whatTheyActuallyWant:
      "Evidence this could become large and defensible, and confidence in the team's judgment under pressure — not the full feature list.",
    openingLine: "\"Here's the specific evidence that a large group of people urgently need this, and why we're the right team to build it.\"",
  },
  {
    id: "customer",
    audience: "A customer",
    whatTheyActuallyWant:
      "Proof this solves their specific problem, this week, with less risk or effort than what they do today — not the company's long-term vision.",
    openingLine: "\"Here's exactly what changes for you, starting the first time you use this.\"",
  },
  {
    id: "hire",
    audience: "A prospective hire",
    whatTheyActuallyWant:
      "A reason this specific moment, at this specific company, is worth their next two years — not a generic mission statement.",
    openingLine: "\"Here's the problem you'd personally own, and why solving it matters right now, not eventually.\"",
  },
] as const;

export interface PitchStep {
  step: string;
  question: string;
}

export const pitchStructure: readonly PitchStep[] = [
  { step: "Problem", question: "What specific, painful problem exists, and for whom exactly?" },
  { step: "Evidence", question: "What have real people already done that proves this pain is real?" },
  { step: "Solution", question: "What do you do about it, in one sentence a stranger could repeat?" },
  { step: "Why now", question: "What changed recently that makes this the right moment, not five years ago?" },
  { step: "Why you", question: "What do you specifically know or have that makes you positioned to win this?" },
  { step: "The ask", question: "What, exactly, do you want from the person in front of you, right now?" },
] as const;

export const pitchMistakes = [
  "Opening with the solution before the audience understands or believes the problem.",
  "Using jargon that makes the idea sound impressive but harder to repeat to someone else afterward.",
  "Ending without a specific, concrete ask — leaving the listener unsure what happens next.",
  "Answering \"why you\" with enthusiasm instead of a specific, relevant fact about your background or evidence.",
] as const;
