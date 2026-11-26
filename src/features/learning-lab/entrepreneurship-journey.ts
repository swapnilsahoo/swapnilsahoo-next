// "From Startup Idea to Venture Growth": the Lab's free seven-module entrepreneurship journey.
// Pure data (no React, CSS or server-only imports) so the page, the Lab homepage, the sitemap,
// the AI mentor and plain-Node checks can all read it.
//
// The module titles and descriptions, the problem statement, the knowing–doing gap table, the
// value proposition and the differentiation are the founder's own text (26 November 2026).
// docs/learning-lab/entrepreneurship-journey.md records the source wording and every edit made
// for publication; scripts/test-learning-lab-entrepreneurship.mjs keeps the two in step.

export const entrepreneurshipJourneyPath = "/learning-lab/entrepreneurship";

export const entrepreneurshipJourney = {
  title: "From Startup Idea to Venture Growth",
  lead: "Learn how to transform an entrepreneurial idea into a viable, scalable and sustainable business.",
  start: "Seven free modules. Start with one honest test with real customers.",
  description:
    "Seven free modules, from testing a startup idea to growing a venture. Start with a 14-day test with real customers. Free, for adults aged 18+.",
  shareTitle: "From startup idea to venture growth: seven free modules",
  shareAlt:
    "From startup idea to venture growth: a free seven-module entrepreneurship journey from Swapnil Sahoo Learning Lab.",
  scope:
    "This is a free, self-paced learning map, not a course you enrol in. There is no account, fee, assessment or certificate. Nothing here promises funding or business success.",
} as const;

export type JourneyAvailability = "open" | "partial" | "planned";

export const journeyAvailability: Record<
  JourneyAvailability,
  { label: string; meaning: string }
> = {
  open: { label: "Open now", meaning: "you can practise the core of it today" },
  partial: { label: "Partly open", meaning: "free resources cover part of it" },
  planned: {
    label: "Planned",
    meaning: "only early readings so far; dates and format will be published before anything opens",
  },
};

export type JourneyResourceKind =
  | "14-day experiment"
  | "Toolkit"
  | "Free course"
  | "Weekly note"
  | "Learning path"
  | "Founder’s Playbook"
  | "Case practice"
  | "Academic"
  | "Research";

export type JourneyResource = {
  kind: JourneyResourceKind;
  /** The destination's public title. */
  title: string;
  /** Internal path, optionally with a #fragment that exists on the rendered page. */
  href: string;
  /** What a learner does with it for this module, in one plain line. */
  use: string;
};

export type JourneyModule = {
  number: "01" | "02" | "03" | "04" | "05" | "06" | "07";
  title: string;
  description: string;
  availability: JourneyAvailability;
  resources: readonly JourneyResource[];
  /** Topics from the description that no free resource covers yet. */
  notCoveredYet?: string;
  /** Advice boundary shown with the module. */
  caution?: string;
};

const venture = "/learning-lab/venture-experiment";
const toolkit = "/learning-lab/toolkit";
const courses = "/learning-lab/free-courses";

export const journeyModules: readonly JourneyModule[] = [
  {
    number: "01",
    title: "Generate and Validate Startup Ideas",
    description:
      "Identify meaningful problems, discover entrepreneurial opportunities, assess market potential and validate customer needs before committing resources.",
    availability: "open",
    resources: [
      {
        kind: "14-day experiment",
        title: "Free 14-day venture experiment, Days 1–6",
        href: `${venture}#plan`,
        use: "Set your limits, pick one reachable customer problem and test it in real conversations.",
      },
      {
        kind: "Toolkit",
        title: "One-page idea filter",
        href: `${toolkit}/idea-filter`,
        use: "Turn a vague idea into one person, one problem and one thing to test.",
      },
      {
        kind: "Toolkit",
        title: "Customer conversation kit",
        href: `${toolkit}/talk-to-customers`,
        use: "Ask about the last time the problem happened, without pitching.",
      },
      {
        kind: "Free course",
        title: "Ask customer questions that reveal behaviour",
        href: `${courses}/ask-better-customer-questions`,
        use: "Build a five-question interview guide in about 20 minutes.",
      },
      {
        kind: "Case practice",
        title: "Guesstimates: Define, Decompose, Estimate, Sanity-Check",
        href: "/placements/guesstimates",
        use: "Practise sizing a market from stated assumptions (case-interview practice).",
      },
    ],
  },
  {
    number: "02",
    title: "Design Business Models and Find Customers",
    description:
      "Develop compelling value propositions, identify customer segments, evaluate revenue models and understand unit economics.",
    availability: "partial",
    resources: [
      {
        kind: "Free course",
        title: "Make a strategic choice you can defend",
        href: `${courses}/make-a-strategic-tradeoff`,
        use: "Write a promise for one specific customer and the trade-off that makes it work.",
      },
      {
        kind: "Free course",
        title: "Read your unit economics before you grow",
        href: `${courses}/read-your-unit-economics`,
        use: "Work out contribution and break-even with a free calculator.",
      },
      {
        kind: "Weekly note",
        title: "The discount that needs more capacity",
        href: "/learning-lab/weekly-notes/the-discount-that-needs-more-capacity",
        use: "A five-minute worked example linking price, break-even and capacity.",
      },
      {
        kind: "Founder’s Playbook",
        title: "Building a Durable Competitive Advantage",
        href: "/teaching/building-a-durable-advantage",
        use: "Finish “for [customer], we are better because…” and check whether customers would pay for it.",
      },
    ],
    notCoveredYet:
      "comparing revenue models, customer acquisition cost and lifetime value, and choosing between customer segments.",
  },
  {
    number: "03",
    title: "Design and Build Great Products",
    description:
      "Build a Minimum Viable Product (MVP), experiment with prototypes, incorporate customer feedback and work towards product-market fit.",
    availability: "partial",
    resources: [
      {
        kind: "14-day experiment",
        title: "Free 14-day venture experiment, Days 7–11",
        href: `${venture}#venture-day-7`,
        use: "Define a small offer, make the smallest honest demonstration and count real actions.",
      },
      {
        kind: "Toolkit",
        title: "₹0–₹500 test playbooks",
        href: `${toolkit}/test-playbooks`,
        use: "Run a small test, such as doing the job by hand for five people, before building an app.",
      },
      {
        kind: "Founder’s Playbook",
        title: "How to Build a Startup? A Simple, Honest Guide",
        href: "/teaching/how-to-build-a-startup#mvp-title",
        use: "See why an MVP is the smallest test of your riskiest assumption, often done by hand.",
      },
      {
        kind: "Founder’s Playbook",
        title: "Finding Product-Market Fit",
        href: "/teaching/product-market-fit",
        use: "Read retention curves and demand signals before you claim fit.",
      },
    ],
    notCoveredYet:
      "prototyping methods (wireframes, clickable or landing-page prototypes) and product design or usability testing.",
  },
  {
    number: "04",
    title: "Launch, Grow and Scale Your Venture",
    description:
      "Develop go-to-market strategies, acquire and retain customers, build distribution channels and experiment with sustainable growth mechanisms.",
    availability: "planned",
    resources: [
      {
        kind: "Founder’s Playbook",
        title: "Finding Product-Market Fit",
        href: "/teaching/product-market-fit#curves",
        use: "Use retention to decide when to grow, then find more people like those who stay.",
      },
      {
        kind: "Toolkit",
        title: "₹0–₹500 test playbooks",
        href: `${toolkit}/test-playbooks#playbooks`,
        use: "Try small first-customer channels and count who acts.",
      },
      {
        kind: "Free course",
        title: "Read your unit economics before you grow",
        href: `${courses}/read-your-unit-economics#lesson-3`,
        use: "Check that a discount meant to grow sales still covers its costs.",
      },
      {
        kind: "Toolkit",
        title: "Learn from Y Combinator, free",
        href: `${toolkit}/learn-from-yc`,
        use: "Read how founders won their first customers by hand.",
      },
    ],
    notCoveredYet:
      "go-to-market planning, building distribution channels, retention tactics and growth experiments.",
  },
  {
    number: "05",
    title: "Prepare to Raise Capital",
    description:
      "Understand entrepreneurial finance, startup valuation, bootstrapping, angel investment, venture capital, pitch decks, capitalisation tables and term sheets.",
    availability: "partial",
    resources: [
      {
        kind: "Founder’s Playbook",
        title: "Raising Money Without Losing the Company",
        href: "/teaching/raising-money",
        use: "Compare bootstrapping, debt and equity, see what investors check and follow dilution across two rounds.",
      },
      {
        kind: "Founder’s Playbook",
        title: "Pitching and Storytelling",
        href: "/teaching/pitching-storytelling",
        use: "Outline a two-minute investor pitch: problem, evidence, solution, why now, why you and a clear ask.",
      },
      {
        kind: "Free course",
        title: "Set an affordable loss for your first experiment",
        href: `${courses}/set-an-affordable-loss`,
        use: "Fund a first test from your own means, without borrowing.",
      },
      {
        kind: "Founder’s Playbook",
        title: "Hiring Your First Five People",
        href: "/teaching/hiring-first-team#equity-title",
        use: "See how vesting and early equity shape the cap table before any round.",
      },
    ],
    notCoveredYet:
      "startup valuation methods, angel and venture capital processes, building a pitch deck, cap tables in depth and term sheets.",
    caution:
      "General education only. Not investment, legal or tax advice. The Lab does not arrange funding or introduce investors.",
  },
  {
    number: "06",
    title: "Build an Entrepreneurial Organisation",
    description:
      "Assemble founding teams, develop organisational capabilities, manage partnerships and establish effective governance mechanisms.",
    availability: "partial",
    resources: [
      {
        kind: "Founder’s Playbook",
        title: "Hiring Your First Five People",
        href: "/teaching/hiring-first-team",
        use: "Choose early hires, agree vesting and equity in writing, and avoid common co-founder mistakes.",
      },
      {
        kind: "Founder’s Playbook",
        title: "How to Build a Startup? A Simple, Honest Guide",
        href: "/teaching/how-to-build-a-startup#principles",
        use: "Open principle 3, “Find partners before you find funders”.",
      },
      {
        kind: "Founder’s Playbook",
        title: "Pitching and Storytelling",
        href: "/teaching/pitching-storytelling#audiences",
        use: "Prepare the pitch for a prospective first hire.",
      },
      {
        kind: "Academic",
        title: "Session 17: Organizational Design — Structure, Culture & Control",
        href: "/teaching/2-year-mba/session-17-organizational-design-structure-culture-control.html#structure",
        use: "For depth: how structure grows from a flat startup into functional roles.",
      },
    ],
    notCoveredYet:
      "co-founder agreements, startup governance (boards, advisers and shareholder agreements) and managing partnerships.",
    caution: "General education only. Not legal or tax advice.",
  },
  {
    number: "07",
    title: "Manage Uncertainty, Failure and Strategic Pivots",
    description:
      "Apply effectuation, entrepreneurial bricolage and experimentation to make decisions under uncertainty, overcome resource constraints and respond to changing market conditions.",
    availability: "open",
    resources: [
      {
        kind: "14-day experiment",
        title: "Free 14-day venture experiment, Days 12–14",
        href: `${venture}#venture-day-12`,
        use: "Weigh evidence, costs and feedback, then choose to continue, change or stop.",
      },
      {
        kind: "Free course",
        title: "Set an affordable loss for your first experiment",
        href: `${courses}/set-an-affordable-loss`,
        use: "Start from your means, cap what you can lose and set stop rules.",
      },
      {
        kind: "Founder’s Playbook",
        title: "How to Build a Startup? A Simple, Honest Guide",
        href: "/teaching/how-to-build-a-startup#principles",
        use: "Five effectuation principles, including treating surprises as material for a change of direction.",
      },
      {
        kind: "Learning path",
        title: "Entrepreneurship Under Constraint",
        href: "/learning-lab/paths/entrepreneurship-under-constraint",
        use: "Six ordered steps ending in a venture decision dossier.",
      },
      {
        kind: "Research",
        title: "From Bricolage to Effectuation",
        href: "/research/bricolage-to-effectuation",
        use: "The founder’s research on making do with what is at hand, and how it grows into effectual action.",
      },
    ],
    notCoveredYet: "structured pivot decisions and learning from failure after it happens.",
  },
];

/** "The gap we are trying to solve" (founder's text). */
export const knowingDoingGap = {
  line: "The gap between knowing entrepreneurship and doing entrepreneurship.",
  context:
    "While aspiring entrepreneurs have access to courses, books, podcasts, business frameworks and startup advice, they often lack an integrated pathway that helps them convert this knowledge into entrepreneurial action.",
  columns: ["What exists today", "What is missing"],
  rows: [
    ["Abundant entrepreneurial knowledge", "Structured application of knowledge"],
    ["Startup success stories", "Context-specific decision-making guidance"],
    ["Business theories and frameworks", "Practical execution tools"],
    ["Fragmented online courses", "An integrated entrepreneurial journey"],
    // Founder's text: "Expensive accelerator programmes | Accessible, affordable entrepreneurial
    // learning". Everything the Lab offers is free, and accelerator places are selective as well
    // as often costly, so both cells were adjusted for publication.
    ["Selective, often costly accelerator programmes", "Accessible, free entrepreneurial learning"],
    ["Fundraising advice", "Venture-building capabilities"],
    ["Standardised learning content", "Personalised entrepreneurial guidance"],
  ],
} as const;

/** Problem statement (founder's text) with what the Lab offers today for each gap. */
export const problemStatement = {
  summary:
    "Aspiring entrepreneurs often possess the ambition to build a venture but lack a structured, accessible and practical pathway to translate their ideas into viable businesses. Entrepreneurship education is frequently fragmented across opportunity identification, business model development, product design, customer acquisition and fundraising, leaving learners struggling to integrate these elements into entrepreneurial action.",
  howMightWe:
    "How might we bridge the gap between entrepreneurial knowledge and entrepreneurial action by providing an accessible, evidence-based and experiential learning platform that enables aspiring entrepreneurs to identify opportunities, validate ideas, build products and create sustainable ventures?",
  gaps: [
    {
      name: "Knowledge gap",
      text: "Understanding what to do at different stages of the entrepreneurial journey.",
      today: "Seven modules, each with free resources for that stage.",
      href: "#modules",
      action: "See the seven modules ↓",
    },
    {
      name: "Execution gap",
      text: "Translating theoretical knowledge into practical entrepreneurial action.",
      today: "The free 14-day venture experiment turns one idea into one real customer test.",
      href: venture,
      action: "Start the 14-day experiment →",
    },
    {
      name: "Resource gap",
      text: "Accessing high-quality learning resources, frameworks and tools.",
      today: "A free founder toolkit, six short courses and an open catalogue. No paid tool is needed.",
      href: toolkit,
      action: "Open the free toolkit →",
    },
    {
      name: "Decision-making gap",
      text: "Making informed decisions under uncertainty and resource constraints.",
      today: "Set an affordable loss, then decide to continue, change or stop on real evidence.",
      href: `${courses}/set-an-affordable-loss`,
      action: "Set an affordable loss →",
    },
    {
      name: "Ecosystem gap",
      text: "Accessing mentorship, customers, collaborators and potential investors.",
      today:
        "A list of independent next steps after the 14-day experiment. The Lab does not arrange funding or introduce investors.",
      href: `${venture}#next`,
      action: "See independent next steps →",
    },
  ],
  oneLine:
    "Aspiring entrepreneurs lack an integrated, accessible and action-oriented learning ecosystem that helps them move from entrepreneurial intent to venture creation and sustainable growth.",
} as const;

/** "Our proposed value proposition" (founder's text). */
export const valueProposition = [
  { title: "Entrepreneurial Intent", text: "Desire to start a venture" },
  { title: "The Knowing–Doing Gap", text: "Knowledge, execution, resources and guidance" },
  { title: "Our Learning Platform", text: "", chain: ["Learn", "Apply", "Experiment", "Validate", "Build"] },
  { title: "Entrepreneurial Action", text: "Venture creation and growth" },
] as const;

/** "Our differentiation" (founder's text) and how the Lab holds itself to its hypothesis. */
export const differentiation = {
  notMerely: "We are not merely democratising access to entrepreneurship education.",
  capability: "We are democratising the capability to become an entrepreneur.",
  hypothesis:
    "The underlying problem hypothesis is not information scarcity, but the inability to translate abundant information into meaningful entrepreneurial action.",
  testing:
    "This is a proposed problem hypothesis, not a finding. We are testing it through customer discovery, the way we ask you to test an idea: by talking to aspiring entrepreneurs about what they actually did, before we build more of the journey.",
  claims: "This is a new pilot. No completion rates, learning gains or comparisons are claimed yet.",
  us: "Continue, change or stop applies to us too.",
} as const;

export const journeySources = [
  {
    label:
      "Jeffrey Pfeffer and Robert I. Sutton, The Knowing-Doing Gap (Harvard Business School Press, 2000)",
    href: "https://www.gsb.stanford.edu/faculty-research/books/knowing-doing-gap-how-smart-companies-turn-knowledge-action",
    note: "the source of the phrase “knowing–doing gap”",
  },
  {
    label: "Saras D. Sarasvathy, Causation and Effectuation (2001)",
    href: "https://effectuation.org/publications-library/causation-and-effectuation-toward-a-theoretical-shift-from-economic-inevitability-to-entrepreneurial-contingency",
    note: "effectuation, in Module 07",
  },
  {
    label: "Ted Baker and Reed E. Nelson, Creating Something from Nothing (2005)",
    href: "https://doi.org/10.2189/asqu.2005.50.3.329",
    note: "entrepreneurial bricolage, in Module 07",
  },
] as const;
