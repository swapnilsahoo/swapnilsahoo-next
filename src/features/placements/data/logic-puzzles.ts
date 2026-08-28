export interface LogicPuzzle {
  id: string;
  prompt: string;
  scoreOn: string;
}

/**
 * Logic and lateral-thinking puzzles, in the register interviewers
 * actually use them: not for the final answer, but to watch how a
 * candidate decomposes an unfamiliar problem out loud.
 */
export const logicPuzzles: readonly LogicPuzzle[] = [
  {
    id: "eight-balls",
    prompt: "You have eight identical-looking balls; one is heavier. Find it in two balance-scale weighings.",
    scoreOn: "Splitting into groups of three rather than halves, and using the imbalance (or balance) of the first weighing to eliminate two-thirds of the possibilities before the second.",
  },
  {
    id: "two-ropes",
    prompt:
      "You have two ropes, each taking exactly 60 minutes to burn but at non-uniform rates. Measure 45 minutes.",
    scoreOn: "Realising that lighting a rope from both ends halves its remaining burn time — the insight the whole puzzle hinges on.",
  },
  {
    id: "three-switches",
    prompt:
      "Three switches are outside a room and one bulb is inside. You may enter the room only once. Identify which switch controls the bulb.",
    scoreOn: "Using a third variable — heat — once you realise light alone can only distinguish two states, not three.",
  },
  {
    id: "twelve-coins",
    prompt:
      "You have 12 coins and one counterfeit that may be heavier or lighter. What information must a weighing strategy preserve after each step?",
    scoreOn: "Explaining information preservation explicitly, not just producing a weighing sequence from memory.",
  },
  {
    id: "manhole-covers",
    prompt: "Why are manhole covers usually circular? Give more than one operational or engineering reason.",
    scoreOn: "Generating multiple independent reasons (can't fall through the hole, easiest shape to roll, no orientation to align) rather than stopping at the first one.",
  },
  {
    id: "lily-pond",
    prompt:
      "A lily patch doubles in size every day and covers a pond in 30 days. On which day is it half-covered? Explain why intuition gets this wrong.",
    scoreOn: "Naming exponential growth explicitly and explaining why the intuitive halfway guess (day 15) is wrong — this is really a test of exponential reasoning, not arithmetic.",
  },
  {
    id: "hundred-lockers",
    prompt: "You have 100 lockers, and on the nth pass you toggle every nth locker. Which lockers remain open, and why?",
    scoreOn: "Connecting the answer to perfect squares — a locker is toggled once per divisor it has, and only perfect squares have an odd number of divisors.",
  },
  {
    id: "losing-clock",
    prompt: "A clock loses five minutes every hour. How would you calculate when it next shows the correct time on a 12-hour dial?",
    scoreOn: "Setting up the problem as accumulated drift versus the full 12-hour cycle, rather than guessing or trial-and-error.",
  },
  {
    id: "decision-tree-launch",
    prompt:
      "Construct a decision tree for whether to launch a product when three uncertain events must happen in sequence, each with a given probability.",
    scoreOn: "Correctly multiplying sequential probabilities rather than adding them, and reasoning about expected value, not just the most-likely single path.",
  },
  {
    id: "reverse-forty-two",
    prompt:
      "The answer is 42. Generate three different business questions for which 42 could be a reasonable answer, stating the units each time.",
    scoreOn: "Producing genuinely different question types (a count, a percentage, a rate) rather than three trivial variations of the same question.",
  },
] as const;
