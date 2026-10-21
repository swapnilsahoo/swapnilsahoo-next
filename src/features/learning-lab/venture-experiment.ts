export const ventureExperimentPath = "/learning-lab/venture-experiment";

export const venturePositioning =
  "Swapnil Sahoo Learning Lab helps first-time student entrepreneurs turn a business idea into a small, affordable customer experiment in 14 days, with practical guidance and feedback, free of charge.";

export const ventureStages = [
  {
    id: "constraints",
    title: "Establish constraints",
    days: "Days 1–3",
    description:
      "Start with your skills, relationships, available time and an affordable commitment. Choose a problem you can investigate without building a business first.",
    output: "A realistic experiment boundary",
  },
  {
    id: "investigate",
    title: "Investigate the problem",
    days: "Days 4–6",
    description:
      "Ask potential customers about recent behaviour and their existing alternatives. Separate what you observed or heard from what you assumed.",
    output: "An evidence log with observations, interpretations and unknowns",
  },
  {
    id: "test",
    title: "Run one small test",
    days: "Days 7–11",
    description:
      "Offer one specific, honestly described next step. Record actual customer action and delivery effort against a threshold chosen before the test.",
    output: "A completed experiment record, including refusals and no responses",
  },
  {
    id: "decide",
    title: "Make a decision",
    days: "Days 12–14",
    description:
      "Review evidence, costs and effort; invite feedback; and defend a decision to continue, change or stop. Stopping can be a successful learning outcome.",
    output: "A defensible decision and one next action",
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
    task: "Before using the guide, write a one-page plan: whose problem, what you believe, the test you would run, a demand threshold and your current continue/change/stop decision. Record today's date; retain this unchanged as your baseline.",
    output: "A dated baseline plan and the question you most need to resolve",
  },
  {
    day: 2,
    stage: "constraints",
    title: "Set what you can afford to commit",
    task: "List useful skills, adult contacts, minutes available each day and a maximum affordable cost, including zero. Name what you will not risk: tuition, borrowing, essential expenses, confidential data or commitments you cannot fulfil.",
    output: "A time and cost ceiling, existing resources, and a stop rule",
  },
  {
    day: 3,
    stage: "constraints",
    title: "Choose one reachable customer problem",
    task: "Choose one adult customer group you can reach respectfully. Write a recent situation, their present alternative and your untested assumption. Arrange permission to speak with them; a classmate role-play is preparation, not customer evidence.",
    output: "One narrow customer/problem statement and a permission-based access plan",
  },
  {
    day: 4,
    stage: "investigate",
    title: "Prepare questions about behaviour",
    task: "Write five neutral questions beginning with 'Tell me about the last time…'. Ask what happened, what they used instead and their approximate effort or cost. Avoid pitching, leading questions and requests for private records. Ask permission to take anonymous notes.",
    output: "Five interview questions and a short voluntary-participation introduction",
  },
  {
    day: 5,
    stage: "investigate",
    title: "Hear the first accounts",
    task: "Invite up to three relevant adults to a short conversation, without pressure. Record recent behaviour in your own words, separately from your interpretation. Accept refusals. If no one participates, record the attempts and investigate access rather than inventing answers.",
    output: "Anonymous evidence entries labelled reported behaviour, interpretation and unknown",
  },
  {
    day: 6,
    stage: "investigate",
    title: "Look for a contradiction",
    task: "Seek an account that might disprove your assumption. Compare the problem, existing alternatives and circumstances across the conversations. A few accessible participants do not represent the whole market. Select one uncertainty worth testing next.",
    output: "A revised problem statement, contradictory evidence and one testable assumption",
  },
  {
    day: 7,
    stage: "test",
    title: "Define a small offer and a pass rule",
    task: "Describe a bounded service or prototype, who it is for, what is and is not available, and the real action you will count. Before inviting anyone, write the denominator, deadline, success threshold, cost ceiling and stopping condition. Choose a free reservation or trial if payment is unnecessary.",
    output: "A one-page experiment card with an observable action and a pre-set threshold",
  },
  {
    day: 8,
    stage: "test",
    title: "Make the smallest honest demonstration",
    task: "Use paper, an existing free tool or a manually delivered sample. Show exactly what can be provided; label mockups and prototypes. Check that the work fits the time and cost ceiling. Do not order inventory, borrow or buy software to make the example look impressive.",
    output: "A clearly labelled sample and a realistic delivery/cost estimate",
  },
  {
    day: 9,
    stage: "test",
    title: "Invite a bounded customer action",
    task: "Make the specific offer to a small, relevant group of consenting adults. State the terms and limitations plainly, avoid spam or repeated contact after refusal, and do not use assessed students or institutional branding as leverage. Record how many people actually received the offer.",
    output: "A dated invitation record and a count of people reached, without personal identifiers",
  },
  {
    day: 10,
    stage: "test",
    title: "Observe action and delivery effort",
    task: "Record actual reservations, use or another pre-defined action, plus refusals and no responses. If a trial is accepted, deliver only what you can safely fulfil and time your work. Compliments, page views and hypothetical willingness to pay are not purchases.",
    output: "Counts with denominators, actual time/cost, and any fulfilment problems",
  },
  {
    day: 11,
    stage: "test",
    title: "Close the experiment honestly",
    task: "Finish the test at its stated deadline and settle any commitment you made. Record what actually happened, including a zero result. Note limitations such as friends-only recruitment or missing customers. If no real customer test occurred, mark it incomplete; planning alone is not completion.",
    output: "An experiment record comparing the pre-set threshold with actual results",
  },
  {
    day: 12,
    stage: "decide",
    title: "Compare value with effort and cost",
    task: "Calculate approximate cost per completed trial and include your own time. Separate a free-trial action from evidence of willingness to pay. Compare alternatives and identify which conclusion the small sample cannot support.",
    output: "A simple cost/effort table and an evidence-supported interpretation",
  },
  {
    day: 13,
    stage: "decide",
    title: "Request feedback on your reasoning",
    task: "Prepare an anonymous one-page review: original assumption, experiment, threshold, results and provisional decision. Ask a reviewer what evidence is missing and what else could explain the result. Record the feedback and your response; do not claim founder feedback until it is received.",
    output: "A reviewable evidence packet and a feedback/revision log",
  },
  {
    day: 14,
    stage: "decide",
    title: "Defend continue, change or stop",
    task: "Write a final one-page decision using the same headings as Day 1. Cite your evidence, costs, limitations and feedback. Choose continue, change or stop and name one affordable next step. Compare your baseline and final work with the same rubric, including any incomplete experiment.",
    output: "A final decision memo, rubric comparison and actual days/hours spent",
  },
];

export const ventureExample = {
  title: "Asha's campus presentation practice",
  note: "Entirely hypothetical Indian student example; the names, counts and costs are invented teaching assumptions, not Learning Lab results.",
  context:
    "Asha is an adult college student in Pune. She thinks fellow adult students struggle to rehearse a three-minute project presentation. She can organise a practice meeting, has 30 minutes a day and chooses a ₹0 spending ceiling.",
  stages: [
    {
      stage: "constraints",
      story:
        "She rules out building an app or charging for an untested service. Her boundary is one free 20-minute practice session, using an already available meeting space with permission; no grades or employment outcomes are promised.",
    },
    {
      stage: "investigate",
      story:
        "Three volunteers describe their latest presentation preparation. Two struggled to keep within the time limit; one already practises effectively alone. Asha records those reported experiences separately from her belief that a practice group would help.",
    },
    {
      stage: "test",
      story:
        "Before inviting anyone, she sets a modest rule: continue investigating if at least two of six relevant adults offered a place actually attend. She offers one clearly described free session, records three reservations and two attendees, and spends 50 minutes preparing and running it. A reservation is not attendance or evidence of willingness to pay.",
    },
    {
      stage: "decide",
      story:
        "Her attendance threshold was met, but the friends-only sample and free price limit the conclusion. She chooses 'change': shorten preparation before another free test. She does not infer a viable paid business or publish participant names. If nobody had attended, an evidence-supported stop could also have been useful.",
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

export const ventureEvaluation = {
  baseline:
    "Retain the unaided Day 1 plan. Record a baseline score using the four 0–2 criteria. With no actual test yet, the execution criterion can legitimately score zero; do not invent missing evidence.",
  final:
    "Score the Day 14 packet using the same criteria and instructions. Report each criterion and total out of 8, whether an actual customer experiment was completed, calendar days, founder/reviewer minutes and learner hours. Record non-completion and withdrawals rather than excluding them.",
  completion:
    "A completed experiment requires a pre-stated assumption, honest specific offer made to actual relevant adults, a dated action/no-action record with a denominator, and a continue/change/stop decision. An executed test with zero demand can qualify; a role-play, plan or unlaunched offer does not.",
  comparison:
    "For the proposed first 20-person guided pilot, predefine a fair comparison with similar consenting learners using a named existing free resource. Record starting experience, customer access, task, time window, support received and the same completion/rubric rules. Use an assessor unaware of group where feasible and report all starters, assessed learners and missing outcomes. Define allocation before recruitment; do not withhold promised support.",
  limits:
    "This is an evaluation plan, not an established advantage. Before/after improvement alone does not prove the guide caused it. Small, self-selected or non-random groups cannot justify a superiority claim; report uncertainty and actual mentoring hours before expanding the free programme.",
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
