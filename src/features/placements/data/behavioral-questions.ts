export interface BehavioralGroup {
  id: string;
  theme: string;
  questions: readonly string[];
}

/**
 * Behavioural, leadership, conflict and ethical-judgment questions —
 * grouped by what they're actually probing, since "behavioural questions"
 * is too broad a bucket to prepare against as one undifferentiated list.
 */
export const behavioralGroups: readonly BehavioralGroup[] = [
  {
    id: "conflict-and-influence",
    theme: "Conflict and influence",
    questions: [
      "Tell me about the most difficult stakeholder you've worked with. What made the relationship difficult?",
      "Describe a conflict where you were partly wrong. What exactly were you wrong about?",
      "Tell me about a time you had to say no to a senior stakeholder.",
      "Give an example where you influenced without formal authority.",
      "Describe a situation where you had to work with someone whose working style you disliked.",
    ],
  },
  {
    id: "judgment-under-uncertainty",
    theme: "Judgment under uncertainty and failure",
    questions: [
      "Tell me about a decision you made with incomplete information.",
      "Describe a time your manager disagreed with you and you still believed your recommendation was correct.",
      "Tell me about a project where your original plan failed. What changed next?",
      "Describe a professional failure whose consequences were visible to others.",
      "What's a professional achievement you're proud of but would execute differently today?",
    ],
  },
  {
    id: "trade-offs-and-standards",
    theme: "Trade-offs and standards",
    questions: [
      "Describe a situation where speed and quality were in conflict. What did you sacrifice?",
      "Give an example of a decision where you protected the long-term outcome at the cost of a short-term win.",
      "Describe a situation in which you created unnecessary complexity. Why did it happen?",
      "When have you over-communicated? When have you under-communicated?",
    ],
  },
  {
    id: "ethics-and-metrics",
    theme: "Ethics and what gets measured",
    questions: [
      "Tell me about an ethical tension at work. What competing obligations existed?",
      "Give an example where a metric encouraged the wrong behaviour.",
      "Tell me about a time you received difficult feedback. What changed in your behaviour after it?",
    ],
  },
  {
    id: "leading-others",
    theme: "Leading others",
    questions: [
      "Tell me about a team member who was underperforming. What did you actually do?",
      "When did you last change your mind because a junior colleague had better evidence?",
      "What would your previous manager say is the hardest thing about managing you?",
    ],
  },
] as const;

export const evidenceLadder: readonly string[] = [
  "Define the metric precisely.",
  "Give the baseline and the endline.",
  "State the sample size and the time period.",
  "Explain the data source.",
  "Separate your personal contribution from the team's.",
  "State other plausible causes for the same result.",
  "Reproduce the arithmetic, on the spot.",
  "Explain what would falsify the claim.",
] as const;
