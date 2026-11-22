export const ventureExperimentPath = "/learning-lab/venture-experiment";

export const venturePositioning =
  "A free 14-day guide for first-time student entrepreneurs: turn your business idea into one small customer test, get feedback, and decide what to do next.";

export const ventureStages = [
  {
    id: "constraints",
    title: "Set your limits",
    days: "Days 1–3",
    description:
      "Start from your skills, contacts, time and a budget you can afford. Pick a problem you can explore without building a business.",
    output: "Clear time, cost and stop limits",
  },
  {
    id: "investigate",
    title: "Talk to customers",
    days: "Days 4–6",
    description:
      "Ask people what they actually did recently and what they use now. Keep what you heard separate from what you assume.",
    output: "An evidence log: observations, interpretations, unknowns",
  },
  {
    id: "test",
    title: "Run one small test",
    days: "Days 7–11",
    description:
      "Make one specific, honest offer. Count what customers actually do against a target you set beforehand.",
    output: "A test record, including refusals and no-replies",
  },
  {
    id: "decide",
    title: "Make the call",
    days: "Days 12–14",
    description:
      "Weigh results, costs and effort, get feedback, then choose continue, change or stop. Stopping can be the right answer.",
    output: "A decision you can defend and one next step",
  },
] as const;

export type VentureStage = (typeof ventureStages)[number]["id"];
export type VentureDay = {
  day: number;
  stage: VentureStage;
  title: string;
  task: string;
  output: string;
};

export const ventureDays: readonly VentureDay[] = [
  {
    day: 1,
    stage: "constraints",
    title: "Write your starting decision",
    task: "Before reading further, write one page: whose problem, what you believe, the test you would run, the result that would count as demand, and whether you would continue, change or stop today. Date it and leave it unchanged. This is your baseline.",
    output: "A dated baseline plan and your biggest open question",
  },
  {
    day: 2,
    stage: "constraints",
    title: "Set what you can afford to commit",
    task: "List your useful skills, adult contacts, minutes per day and the most you can spend (₹0 is fine). Write down what you will not risk: tuition, loans, essential expenses, confidential data or promises you cannot keep.",
    output: "A time and cost limit, your resources and a stop rule",
  },
  {
    day: 3,
    stage: "constraints",
    title: "Choose one reachable customer problem",
    task: "Pick one adult customer group you can reach respectfully. Note a recent situation they faced, what they use now and your untested assumption. Get permission to talk to them. Role-play with classmates is practice, not evidence.",
    output: "One narrow customer problem and a plan to reach them with permission",
  },
  {
    day: 4,
    stage: "investigate",
    title: "Prepare questions about behaviour",
    task: "Write five neutral questions that start 'Tell me about the last time…'. Ask what happened, what they used instead and what it cost them in time or money. Do not pitch, lead or ask for private records. Ask before taking anonymous notes.",
    output: "Five questions and a short, voluntary introduction",
  },
  {
    day: 5,
    stage: "investigate",
    title: "Hear the first accounts",
    task: "Invite up to three relevant adults to a short chat, with no pressure. Note what they did, separately from what you think it means. Accept refusals. If no one agrees, record your attempts and fix access. Never invent answers.",
    output: "Anonymous notes labelled behaviour, interpretation or unknown",
  },
  {
    day: 6,
    stage: "investigate",
    title: "Look for a contradiction",
    task: "Look for an account that could prove you wrong. Compare problems, alternatives and situations across your conversations. A few people are not the whole market. Pick one uncertainty to test next.",
    output: "A revised problem statement, the contradicting evidence and one testable assumption",
  },
  {
    day: 7,
    stage: "test",
    title: "Define a small offer and a pass rule",
    task: "Describe a small service or prototype: who it is for, what is and is not included, and the real action you will count. Before inviting anyone, write how many people you will ask, the deadline, the pass mark, your cost limit and when you will stop. If payment is not needed, use a free reservation or trial.",
    output: "A one-page experiment card with a countable action and a pre-set pass mark",
  },
  {
    day: 8,
    stage: "test",
    title: "Make the smallest honest demonstration",
    task: "Use paper, a free tool or a sample you deliver by hand. Show exactly what you can provide and label any mockup. Stay within your time and cost limit. Do not buy stock, borrow or pay for software to look impressive.",
    output: "A labelled sample and a realistic delivery and cost estimate",
  },
  {
    day: 9,
    stage: "test",
    title: "Invite a bounded customer action",
    task: "Make the offer to a small group of relevant adults who have agreed to hear it. State the terms and limits plainly. No spam, no follow-ups after a no, and no using students you assess or your institution's name as leverage. Count how many people actually got the offer.",
    output: "A dated invitation record and a count of people reached, with no names",
  },
  {
    day: 10,
    stage: "test",
    title: "Observe action and delivery effort",
    task: "Record real reservations, use or the action you chose, plus refusals and no-replies. If someone takes up a trial, deliver only what you can safely do, and time it. Compliments, page views and 'I would pay for that' are not purchases.",
    output: "Counts out of the number asked, real time and cost, and any delivery problems",
  },
  {
    day: 11,
    stage: "test",
    title: "Close the experiment honestly",
    task: "End the test on its deadline and honour any commitment you made. Record what happened, even a zero. Note limits such as friends-only recruiting. If no real customer test happened, mark it incomplete. Planning alone does not count.",
    output: "A record comparing your pre-set pass mark with actual results",
  },
  {
    day: 12,
    stage: "decide",
    title: "Compare value with effort and cost",
    task: "Work out the rough cost per completed trial, including your own time. A free-trial sign-up does not prove people will pay. Compare alternatives and note what your small sample cannot tell you.",
    output: "A simple cost and effort table and an evidence-based reading of it",
  },
  {
    day: 13,
    stage: "decide",
    title: "Request feedback on your reasoning",
    task: "Prepare an anonymous one-page summary: assumption, test, pass mark, results and provisional decision. Ask a reviewer what is missing and what else could explain the result. Log their feedback and your response. Do not claim founder feedback until you have it.",
    output: "A reviewable evidence packet and a feedback log",
  },
  {
    day: 14,
    stage: "decide",
    title: "Defend continue, change or stop",
    task: "Write a one-page decision using your Day 1 headings. Cite evidence, costs, limits and feedback. Choose continue, change or stop, and name one affordable next step. Score Day 1 and Day 14 with the same rubric, even if the test is incomplete.",
    output: "A final decision memo, rubric comparison and actual days and hours spent",
  },
];

export const ventureExample = {
  title: "Asha's campus presentation practice",
  note: "Hypothetical example. Names, numbers and costs are invented for teaching; they are not Lab results.",
  context:
    "Asha, an adult college student in Pune, thinks fellow students struggle to rehearse three-minute project presentations. She has 30 minutes a day, can organise a practice meeting and sets a ₹0 budget.",
  stages: [
    {
      stage: "constraints",
      story:
        "No app, and no charging for an untested service. Her limit: one free 20-minute practice session in a room she has permission to use. No grades or job outcomes promised.",
    },
    {
      stage: "investigate",
      story:
        "Three volunteers describe their last presentation preparation. Two struggled with the time limit; one already practises well alone. She records what they said separately from her belief that a group would help.",
    },
    {
      stage: "test",
      story:
        "Her rule, set in advance: keep going if at least two of the six adults offered a place actually attend. Three reserve, two attend, and it takes her 50 minutes. A reservation is not attendance, and attendance is not payment.",
    },
    {
      stage: "decide",
      story:
        "The pass mark was met, but a friends-only sample and a free price limit what she can conclude. She chooses 'change': shorten the preparation and run another free test. She claims no paid business and publishes no names. Had nobody come, stopping would also have been a sound decision.",
    },
  ],
} as const;

export const ventureEvidenceRubric = [
  {
    id: "boundary",
    criterion: "Problem and constraints",
    scores: [
      "0: Customer/problem unclear; no time or cost boundary.",
      "1: Specific customer and problem, but access or commitment is vague.",
      "2: Reachable adult customer, recent problem, explicit time/cost ceiling and stop rule.",
    ],
  },
  {
    id: "customerEvidence",
    criterion: "Evidence quality",
    scores: [
      "0: Opinions or invented observations presented as demand.",
      "1: Some relevant reported behaviour; interpretation or sampling limits unclear.",
      "2: Dated anonymous observations separated from interpretations, with contradictions and limits.",
    ],
  },
  {
    id: "testDesign",
    criterion: "Experiment design and execution",
    scores: [
      "0: No observable action or no actual test.",
      "1: A bounded test is run, but threshold, denominator or delivery record is missing.",
      "2: Honest offer, threshold set before testing, actual action counts and delivery/cost record.",
    ],
  },
  {
    id: "decision",
    criterion: "Decision and revision",
    scores: [
      "0: Unsupported recommendation or success claim.",
      "1: A decision cites some results but overlooks costs, feedback or alternative explanations.",
      "2: Continue/change/stop follows the evidence, costs and limits; feedback and one affordable next action are documented.",
    ],
  },
] as const;

// The pilot's full evaluation protocol is in docs/learning-lab/venture-experiment.md.
export const ventureEvaluation = {
  completion:
    "A completed experiment needs four things: an assumption stated in advance, an honest offer made to real, relevant adults, a dated record of who acted out of how many were asked, and a continue, change or stop decision. A real test with zero demand counts. A role-play, a plan or an offer never made does not.",
} as const;

export type VentureConstraints = {
  day?: number;
  skills: string;
  relationships?: string;
  minutesPerDay: number;
  customerAccess: "none" | "indirect" | "direct";
  affordableCommitment: number;
};

/** A practice suggestion only: no spending, outreach or business commitment is executed. */
export function recommendNextTask(input: VentureConstraints) {
  const bounded = (value: number, maximum: number) =>
    Number.isFinite(value) ? Math.min(maximum, Math.max(0, Math.floor(value))) : 0;
  const day = Math.max(1, bounded(input.day ?? 1, 14));
  const minutes = bounded(input.minutesPerDay, 480);
  const budgetLimit = bounded(input.affordableCommitment, 1000);
  const access =
    input.customerAccess === "direct" || input.customerAccess === "indirect"
      ? input.customerAccess
      : "none";
  const lesson = ventureDays[day - 1];
  const skills = input.skills.trim().toLowerCase();
  const adaptations = [
    budgetLimit === 0
      ? "Keep this test at ₹0: use paper, a borrowed authorised space or tools already available free. Do not collect payment, buy stock or start a paid subscription."
      : `Start with a free test. Any optional test cost must stay within ₹${budgetLimit}, or your lower personal limit; a ceiling is not a recommendation or permission to spend. Do not borrow or risk essential expenses.`,
  ];

  adaptations.push(
    /design|draw|writ|communicat/.test(skills)
      ? "Use your writing or design skill for one clear offer and a labelled sketch; do not build a complete brand or website."
      : /cod|software|technical|engineer/.test(skills)
        ? "Use a manual or clickable demonstration first; do not spend the fortnight coding a product before customer evidence."
        : /mak|repair|cook|craft/.test(skills)
          ? "Demonstrate an existing safe skill using available materials; avoid inventory, hazardous work and regulated services."
          : "Start with a manually organised, low-risk demonstration. List one skill you already have; no coding or business experience is required."
  );

  if (minutes === 0)
    return {
      ...lesson,
      title: "Find a feasible time boundary first",
      task: "Save your idea and identify a realistic time slot before starting. With zero available minutes, do not promise yourself a completed 14-day experiment; resume when time is available.",
      output: "A revised start date or an explicit decision to pause",
      minutes,
      budgetLimit,
      adaptations,
      readyForCustomerTest: false,
    };
  if (minutes < 15)
    adaptations.push(
      "Use one short step per sitting. Interviews and a real test may need a longer agreed slot or more than 14 days; record the actual time rather than claim on-time completion."
    );
  if (access !== "direct") {
    adaptations.push(
      access === "indirect"
        ? "Ask one trusted adult whether they can make a permission-based introduction to a relevant adult customer. Do not request their contact list or contact someone who declined."
        : "First find one relevant adult who is willing to talk, through a permitted college/community route. Do not scrape contacts, pay for access or treat friends' role-play as real demand."
    );
    if (day >= 5 && day <= 11)
      return {
        ...lesson,
        title: "Resolve customer access before claiming a test",
        task: adaptations[adaptations.length - 1],
        output:
          "A consented conversation opportunity, or an honest access barrier and revised plan",
        minutes,
        budgetLimit,
        adaptations,
        readyForCustomerTest: false,
      };
  }
  if (input.relationships?.trim())
    adaptations.push(
      "Use the relationships you listed only for optional introductions with permission. Knowing someone does not establish that they are a relevant customer or willing to participate."
    );
  return {
    ...lesson,
    minutes,
    budgetLimit,
    adaptations,
    readyForCustomerTest: access === "direct" && minutes >= 15 && day >= 7 && day <= 11,
  };
}
