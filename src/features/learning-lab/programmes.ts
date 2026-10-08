import type { LabProgramme } from "./types";
import { demoDecisions } from "./demo-decisions";

export type { LabProgramme, LabProgrammeSlug } from "./types";

function completionRequirements(): LabProgramme["certificate"] {
  return {
    attendancePercent: 80,
    minScore: 60,
    requiredLessons: 6,
    requirements: [
      "Complete all six assigned lessons and their exercises.",
      "Attend at least 80% of the scheduled live learning time, as recorded by the instructor.",
      "Submit an original capstone and receive an instructor-approved score of at least 60 out of 100 against the published rubric.",
      "A Certificate of Completion records completion of this Lab programme. It is not a degree, recognised qualification or claim of accreditation.",
    ],
  };
}

const programmeDrafts: LabProgramme[] = [
  {
    slug: "ai-for-managers",
    title: "AI for Managers",
    tagline: "Turn an AI idea into a testable managerial decision.",
    audience: [
      "Adult MBA and other management students applying AI to business problems.",
      "Early-career professionals responsible for team workflows, analysis or customer operations.",
    ],
    prerequisites: [
      "Basic spreadsheet skills and familiarity with a business workflow.",
      "A laptop and willingness to examine evidence; no coding background or paid AI subscription required.",
      "Participants must be 18 or older. Use synthetic data unless you have permission to use real information.",
    ],
    duration:
      "Proposed: four weeks; six 90-minute live sessions plus approximately two hours of independent work each week.",
    format:
      "Proposed small-cohort online workshops, guided practice and instructor feedback. Dates, capacity and fees are not yet confirmed.",
    outcomes: [
      "Map a workflow and distinguish an AI use case from a conventional automation opportunity.",
      "Write a task brief with permitted inputs, output criteria, evidence requirements and a human reviewer.",
      "Build a small evaluation set and compare assisted work with a measured baseline.",
      "Identify data, reliability and decision risks and propose controls proportionate to the task.",
      "Present a pilot recommendation with costs, owner, stopping conditions and a defensible adoption decision.",
    ],
    sessions: [
      {
        title: "1. Start with the decision",
        description:
          "Map who makes a decision, what information they use and where work is delayed. Separate desirable speed from a valuable outcome.",
        output: "A workflow map and one clearly bounded use-case statement.",
      },
      {
        title: "2. Give the task a contract",
        description:
          "Practise instructions, input boundaries, output formats and evidence checks using original synthetic examples. Compare a weak and a testable task brief.",
        output: "A reusable task brief and a reviewer checklist.",
      },
      {
        title: "3. Measure before you adopt",
        description:
          "Define a baseline, representative examples, error categories and acceptance criteria. Include difficult examples rather than selecting only favourable results.",
        output: "A ten-example evaluation table with a documented comparison method.",
      },
      {
        title: "4. Design the human decision",
        description:
          "Examine sensitive information, unsupported assertions, escalation and responsibility. Choose where a person must check, approve or override an output.",
        output: "A risk register, data boundary and responsibility map.",
      },
      {
        title: "5. Make the business case",
        description:
          "Estimate net time, review effort, software costs and failure costs. Test whether the benefit remains when assumptions change.",
        output: "A pilot economics sheet and two sensitivity scenarios.",
      },
      {
        title: "6. Defend the pilot",
        description:
          "Present evidence, handle peer challenge and propose an adoption, revision or rejection decision. Agree a monitoring and rollback plan.",
        output: "An instructor-reviewed pilot proposal and revision note.",
      },
    ],
    capstone:
      "Submit a five-page AI workflow pilot proposal for an original hypothetical or explicitly authorised business setting. Include a task brief, ten-example evaluation, baseline comparison, cost assumptions, risk controls, human decision owner and stop/go criteria. A proposal can recommend against adoption if the evidence supports that decision.",
    rubric: [
      {
        criterion: "Problem and workflow clarity",
        weight: 20,
        description: "A specific user, decision and baseline with a justified boundary.",
      },
      {
        criterion: "Evaluation and evidence",
        weight: 30,
        description:
          "Representative examples, reproducible criteria, honest errors and a credible baseline comparison.",
      },
      {
        criterion: "Risk and human oversight",
        weight: 25,
        description:
          "Permitted data, named responsibilities, escalation and appropriate stopping conditions.",
      },
      {
        criterion: "Economics and recommendation",
        weight: 15,
        description:
          "Transparent cost assumptions, sensitivity and a conclusion supported by the evidence.",
      },
      {
        criterion: "Communication and revision",
        weight: 10,
        description: "A concise decision document that addresses instructor and peer feedback.",
      },
    ],
    certificate: completionRequirements(),
    sources: [
      {
        title: "NIST (2023), AI Risk Management Framework 1.0 — voluntary guidance",
        url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
      },
      {
        title: "NIST (2024), Generative Artificial Intelligence Profile",
        url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
      },
    ],
    demo: {
      title: "Should the support team use an AI draft?",
      scenario:
        "Hypothetical exercise: Paperlane is an invented small stationery seller. Its team handles 40 support messages a day. A human-only reply takes six minutes. A proposed AI-assisted process takes one minute to draft and three minutes to check. Some enquiries mention addresses; refund decisions must follow an approved policy. These numbers are invented learning inputs, not results from a real business.",
      lesson: [
        "Begin with a bounded task: prepare a reply for review, using an approved refund policy and a message stripped of unnecessary personal details.",
        "With the stated assumptions, a checked draft uses four minutes rather than six. Forty messages would save 80 minutes a day before software, training and exception costs. This is a hypothesis to test, not a productivity promise.",
        "Design a trial that includes ordinary questions, missing information and refund exceptions. Record review time, policy errors and escalations alongside speed.",
        "NIST's voluntary risk guidance supports examining context, evidence, ownership and ongoing controls. An instructor and manager remain responsible for judgement; a fluent draft does not establish accuracy.",
      ],
      task: "Choose a pilot approach, write a task brief and propose one condition that would stop the trial.",
      prompts: [
        "What may the draft assistant receive, and what information should be removed?",
        "Who checks a reply, and which cases must be escalated?",
        "What evidence would justify adoption, revision or stopping the pilot?",
      ],
      modelAnswer: [
        "Trial draft-only replies on de-identified messages with the approved policy supplied. Keep refund approval and sending with the human reviewer.",
        "Measure total time, including correction and escalation, against the six-minute baseline using a representative test set.",
        "Pause the trial if a draft exposes personal information or recommends a refund outside the approved policy; investigate before restarting.",
      ],
      checkpoint: {
        question: "Which observation is most useful when judging whether the pilot creates value?",
        options: [
          "Drafts are longer and sound more confident.",
          "Total handling time falls while policy accuracy and escalation quality meet predefined criteria.",
          "Every message receives an automatic refund.",
          "Staff used the tool at least once.",
        ],
        answer: 1,
        explanation:
          "A useful comparison combines net time with quality and responsibility. Draft speed or usage alone cannot show that the complete workflow improved.",
      },
    },
  },
  {
    slug: "strategy-case-thinking",
    title: "Strategy and Case Thinking Lab",
    tagline: "Move from a case summary to a defensible choice.",
    audience: [
      "Adult management students who want to make stronger case arguments.",
      "Early-career analysts and professionals asked to recommend a course of action under uncertainty.",
    ],
    prerequisites: [
      "Comfort reading a short business brief and using basic arithmetic.",
      "A laptop or tablet and willingness to defend and revise a recommendation.",
      "Participants must be 18 or older. Prior strategy coursework is helpful but not required.",
    ],
    duration:
      "Proposed: three weeks; six 90-minute live sessions plus approximately two hours of independent work each week.",
    format:
      "Proposed small-cohort case workshops with original case packets, peer challenge and instructor feedback. Dates, capacity and fees are not yet confirmed.",
    outcomes: [
      "Separate the decision, established facts, assumptions and missing evidence in a case.",
      "Compare plausible options using criteria relevant to the business problem.",
      "Describe a customer choice, a trade-off and the activities needed to support it.",
      "Calculate a simple economic implication and test whether a recommendation survives an adverse assumption.",
      "Write and defend a decision memo with ownership, an experiment and a revision trigger.",
    ],
    sessions: [
      {
        title: "1. Find the decision",
        description:
          "Read an original case packet. Identify who must decide, by when and with what constraints. Mark facts, interpretations and missing evidence separately.",
        output: "A one-page decision brief and evidence ledger.",
      },
      {
        title: "2. Understand the customer and setting",
        description:
          "Examine customers, alternatives and sources of bargaining pressure. Select evidence that matters to the decision rather than filling every framework box.",
        output: "An external analysis with three decision-relevant implications.",
      },
      {
        title: "3. Test the ability to deliver",
        description:
          "Identify resources, bottlenecks and activities that enable the proposed value. Distinguish a capability claim from demonstrated evidence.",
        output: "A capability and activity map with one critical gap.",
      },
      {
        title: "4. Choose and make a trade-off",
        description:
          "Compare competing options, specify the target customer and identify an offer the firm will decline. Check the consistency of supporting activities.",
        output: "A choice statement and comparison of two feasible alternatives.",
      },
      {
        title: "5. Challenge the economics",
        description:
          "Calculate contribution, capacity and an adverse scenario using supplied synthetic numbers. Explain which assumption could reverse the recommendation.",
        output: "A small decision model and sensitivity note.",
      },
      {
        title: "6. Defend and revise",
        description:
          "Present a decision memo, answer a structured challenge and translate the choice into a test with an owner and review date.",
        output: "A revised case memo and 30-day action plan.",
      },
    ],
    capstone:
      "Write a 1,500-word decision memo from an original Lab case packet or an explicitly authorised workplace problem. Include a decision statement, evidence ledger, two alternatives, a simple economic comparison, a trade-off, a supporting activity map and an implementation test. Defend the memo in a short instructor-led discussion.",
    rubric: [
      {
        criterion: "Decision and evidence",
        weight: 25,
        description:
          "A focused decision; facts, assumptions and missing information are kept distinct.",
      },
      {
        criterion: "Analysis and alternatives",
        weight: 25,
        description: "Relevant reasoning and a fair comparison of at least two feasible options.",
      },
      {
        criterion: "Choice and consistency",
        weight: 25,
        description: "A clear customer choice and trade-off supported by compatible activities.",
      },
      {
        criterion: "Economics and implementation",
        weight: 15,
        description:
          "Correct calculations, a meaningful sensitivity and a practical test with ownership.",
      },
      {
        criterion: "Defence and revision",
        weight: 10,
        description:
          "A concise argument that acknowledges counterevidence and responds to challenge.",
      },
    ],
    certificate: completionRequirements(),
    sources: [
      {
        title:
          "Michael E. Porter (1996), What Is Strategy? — publisher information; full reading may require purchase",
        url: "https://store.hbr.org/product/what-is-strategy/96608",
      },
    ],
    demo: {
      title: "The lunch service that cannot serve everyone",
      scenario:
        "Hypothetical exercise: Noonbox is an invented lunch service with one kitchen and delivery capacity of 120 lunches a day. Office subscriptions earn ₹50 contribution per lunch; premium custom orders earn ₹90 before any additional coordination cost. The team can offer reliable fixed-menu delivery to offices or individually customised meals with flexible delivery times. It cannot promise both with its current kitchen and routing team. All business details are invented.",
      lesson: [
        "A useful recommendation states which customer problem the business will serve and identifies the operational commitment that follows.",
        "Porter's positioning lens asks whether choices, trade-offs and supporting activities are consistent. Use it to examine Noonbox rather than assume a framework supplies the answer.",
        "At 120 lunches, the stated contribution is ₹6,000 for office subscriptions or ₹10,800 for custom orders before extra coordination, unmet demand and fixed costs. Higher contribution per order alone does not prove the second option is better.",
        "A decision memo should identify demand and capacity assumptions, propose evidence to obtain and name the condition that would reverse the choice.",
      ],
      task: "Choose a customer promise, identify one request you will decline and design a small test of your recommendation.",
      prompts: [
        "Which customer need will Noonbox prioritise, and why?",
        "Which offer will it decline to keep that promise feasible?",
        "Which assumption could reverse your choice, and how would you test it?",
      ],
      modelAnswer: [
        "A defensible office-focused choice offers a fixed menu and predictable delivery. It declines custom dishes and flexible routes that disrupt that promise.",
        "The team should test repeat demand, on-time delivery and contribution after waste and route costs. The ₹6,000 illustration is not a profit forecast.",
        "A custom-order strategy could also be defensible if demand and coordination evidence support it. Explain the corresponding kitchen, ordering and delivery changes rather than trying to promise everything.",
      ],
      checkpoint: {
        question: "Which recommendation contains an actionable strategic trade-off?",
        options: [
          "Offer every meal and delivery time so no customer is lost.",
          "Focus on predictable office lunches and decline individual customisation that disrupts scheduled routes.",
          "Ask the kitchen to become more efficient without choosing a customer.",
          "Choose the higher contribution figure without testing demand or capacity.",
        ],
        answer: 1,
        explanation:
          "The office-focused choice connects a customer promise to a deliberate exclusion and supporting operations. A custom-focused choice could work too, but would need different activities and evidence.",
      },
    },
  },
  {
    slug: "entrepreneurship-under-constraint",
    title: "Entrepreneurship Under Constraint Bootcamp",
    tagline: "Test a venture idea before committing scarce resources.",
    audience: [
      "Adult management students exploring an original venture or side project.",
      "Early-career professionals who want to test a customer problem within a limited budget and time.",
    ],
    prerequisites: [
      "Basic spreadsheet skills and access to a laptop.",
      "An idea to examine, or willingness to use an original hypothetical Lab scenario.",
      "Participants must be 18 or older. Interviews require informed participation; no employment or venture outcome is promised.",
    ],
    duration:
      "Proposed: four weeks; six 90-minute live sessions plus approximately three hours of independent work each week.",
    format:
      "Proposed small-cohort workshops, customer-discovery practice and instructor feedback. Dates, capacity and fees are not yet confirmed.",
    outcomes: [
      "Describe a customer problem using observed behaviour rather than a feature wish list.",
      "Map available means, constraints and an affordable-loss boundary.",
      "Conduct ethical discovery conversations and separate interview evidence from personal interpretation.",
      "Design a small experiment with an explicit hypothesis, metric, budget and stop rule.",
      "Calculate simple contribution and cash needs and recommend whether to continue, revise or stop.",
    ],
    sessions: [
      {
        title: "1. Start with means and limits",
        description:
          "Inventory skills, relationships, available time and money. State what the learner can afford to lose before selecting an experiment.",
        output: "A means inventory and explicit time-and-money loss boundary.",
      },
      {
        title: "2. Discover the problem",
        description:
          "Practise non-leading interviews about recent behaviour and current alternatives. Obtain permission and minimise recorded personal information.",
        output:
          "An interview guide and an evidence log from five consent-based conversations, or a labelled classroom simulation.",
      },
      {
        title: "3. Define a first customer",
        description:
          "Identify a narrow customer group and its existing workaround. State what evidence supports the problem and what remains uncertain.",
        output: "A customer problem brief and uncertainty register.",
      },
      {
        title: "4. Run a constrained experiment",
        description:
          "Choose a low-cost manual test, define success and failure criteria, and agree a spending cap. Do not take payment or make promises without permission and appropriate arrangements.",
        output: "An experiment card with hypothesis, budget, metric and stop rule.",
      },
      {
        title: "5. Understand contribution and cash",
        description:
          "Model unit revenue, variable costs, founder time and cash timing. Examine what happens when demand falls or rework increases.",
        output: "A unit-economics sheet and cash-needs scenario.",
      },
      {
        title: "6. Decide the next commitment",
        description:
          "Present observed evidence, distinguish completed work from planned tests and defend a continue, revise or stop recommendation.",
        output: "An instructor-reviewed venture evidence dossier and next-test decision.",
      },
    ],
    capstone:
      "Submit a venture evidence dossier of up to eight pages: means and loss boundary, customer problem, consent-based interview evidence or explicitly labelled simulation, experiment design, observed results if a test was authorised, simple unit economics and a continue/revise/stop memo. Planned tests must be labelled as plans; invented results are not evidence.",
    rubric: [
      {
        criterion: "Customer evidence",
        weight: 25,
        description:
          "Relevant behaviour and alternatives, with clear separation of observation, interpretation and simulation.",
      },
      {
        criterion: "Experiment design",
        weight: 25,
        description:
          "A falsifiable hypothesis, appropriate metric, small test and stated decision thresholds.",
      },
      {
        criterion: "Constraints and economics",
        weight: 25,
        description:
          "A credible affordable-loss boundary and transparent revenue, cost and time assumptions.",
      },
      {
        criterion: "Responsible practice",
        weight: 15,
        description:
          "Permission, careful information handling and no unsupported promises or invented evidence.",
      },
      {
        criterion: "Learning and decision",
        weight: 10,
        description:
          "A clear next commitment that responds to evidence and explains what could change the decision.",
      },
    ],
    certificate: completionRequirements(),
    sources: [
      {
        title: "Saras D. Sarasvathy (2001), Causation and Effectuation — research publication",
        url: "https://effectuation.org/publications-library/causation-and-effectuation-toward-a-theoretical-shift-from-economic-inevitability-to-entrepreneurial-contingency",
      },
      {
        title: "US National Science Foundation, I-Corps — customer-discovery learning approach",
        url: "https://www.nsf.gov/funding/initiatives/i-corps/about-teams",
      },
    ],
    demo: {
      title: "₹5,000, ten hours and an untested idea",
      scenario:
        "Hypothetical exercise: a founder is considering an evening bicycle-maintenance service for apartment residents. The founder has basic repair skills, ten hours for a first test and ₹5,000 they can afford to lose. Equipment for a full launch would cost ₹35,000. No customer has yet been interviewed. These are invented learning inputs; this exercise does not establish demand or approve a real commercial service.",
      lesson: [
        "Sarasvathy's effectuation research offers a way to start with available means and limit the downside of the next commitment when predictions are uncertain.",
        "Customer discovery asks about an actual recent problem and current alternatives. Ask when a bicycle last needed service, what the resident did and what was inconvenient; avoid asking only whether an attractive idea sounds good.",
        "A low-cost manual trial can examine willingness to book, effort per service and costs. Do not infer willingness to pay from compliments.",
        "Specify what would make you continue, revise or stop before the experiment. Keep actual observations separate from forecasts and respect participants' permission.",
      ],
      task: "Select the first commitment, set an affordable test budget and write a decision rule that uses observable customer behaviour.",
      prompts: [
        "What can you test within ten hours without buying the full equipment kit?",
        "What is the maximum acceptable loss, and what would stop the test?",
        "Which observed behaviour would justify the next commitment?",
      ],
      modelAnswer: [
        "Begin with five consent-based discovery conversations and a small booking-interest test. Use existing safe equipment for any later authorised trial; do not spend ₹35,000 before examining demand.",
        "Set a first-test cap below the ₹5,000 loss boundary and preserve time to review the evidence. A cap is permission to spend up to a limit, not a reason to spend it all.",
        "Define a threshold such as three concrete appointment requests from ten relevant residents, then check time, costs and safety before a further commitment. This illustrative threshold is not a universal business rule.",
      ],
      checkpoint: {
        question: "Which result provides the strongest evidence for the next small test?",
        options: [
          "Friends say the idea sounds exciting.",
          "A spreadsheet projects thousands of customers next year.",
          "Relevant residents describe recent repair problems and request specific appointments within the proposed service scope.",
          "The founder spends the full budget on a logo.",
        ],
        answer: 2,
        explanation:
          "Specific behaviour connected to the target problem is more informative than praise or a forecast. It still needs follow-up: an appointment request is not proof of profitable demand.",
      },
    },
  },
];

export const programmes: LabProgramme[] = programmeDrafts.map((programme) => ({
  ...programme,
  demo: { ...programme.demo, decisions: demoDecisions[programme.slug] },
}));

export function getProgramme(slug: string): LabProgramme | undefined {
  return programmes.find((programme) => programme.slug === slug);
}
