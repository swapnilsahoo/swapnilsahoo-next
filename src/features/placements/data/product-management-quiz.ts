export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
}

export const productManagementTopics = [
  "Product sense",
  "Metrics & analytics",
  "Prioritisation & execution",
  "Technical understanding",
  "Product strategy",
] as const;

export const productManagementQuestions: readonly QuizQuestion[] = [
  {
    id: "pm-1",
    topic: "Product sense",
    question:
      "A food-delivery app's order-completion rate has fallen. What is the single most useful next question to ask?",
    options: [
      "How many total downloads did the app get this month?",
      "At which step of the order funnel are users dropping off, and has that step changed recently?",
      "What do competitor apps look like this month?",
      "Should we redesign the app icon?",
    ],
    correctIndex: 1,
    explanation:
      "A falling completion rate is a funnel problem. Locating the exact drop-off step — and whether anything changed there — turns a vague symptom into a specific, testable hypothesis. Downloads and the app icon are unrelated to completion once someone is already in the funnel.",
  },
  {
    id: "pm-2",
    topic: "Product sense",
    question:
      "You're asked to improve a note-taking app for university students. What is the strongest first move?",
    options: [
      "List every feature request from the app-store reviews and prioritise by frequency.",
      "Define who the primary user is and what job they are hiring the app to do, before touching features.",
      "Copy the top three features from the market leader.",
      "Add AI-powered summarisation, since it's currently popular.",
    ],
    correctIndex: 1,
    explanation:
      "Feature lists and trend-chasing skip the step that actually determines which features matter: a clear view of the user and the job they need done. Without that, prioritisation and 'popular' features are both guesses.",
  },
  {
    id: "pm-3",
    topic: "Metrics & analytics",
    question:
      "A social app's daily active users (DAU) are flat, but session length has doubled. What should you check first?",
    options: [
      "Whether the increase in session length reflects genuine engagement or difficulty completing a task.",
      "Nothing — longer sessions are always a positive engagement signal.",
      "Whether the marketing budget increased.",
      "The company's total headcount.",
    ],
    correctIndex: 0,
    explanation:
      "Longer sessions can mean either deeper engagement or that users are struggling to do something that used to be quick — the metric alone can't distinguish the two. A PM should pair the quantitative signal with qualitative evidence (support tickets, session recordings, a quick user interview) before calling it good news.",
  },
  {
    id: "pm-4",
    topic: "Metrics & analytics",
    question:
      "Which pair of metrics is most likely to be in tension with each other for a subscription product?",
    options: [
      "Monthly active users and total employee count",
      "New sign-up volume and post-trial conversion rate, if sign-up friction is lowered aggressively",
      "App store rating and server uptime",
      "Customer support ticket count and office square footage",
    ],
    correctIndex: 1,
    explanation:
      "Lowering sign-up friction usually raises the number of trials (often by admitting lower-intent users) but can pull down the percentage who convert to paid, since the marginal sign-up is less committed. Good PMs watch both together rather than optimising one in isolation.",
  },
  {
    id: "pm-5",
    topic: "Prioritisation & execution",
    question:
      "Using a simple reach-impact-confidence-effort (RICE) view, which feature should usually be prioritised first?",
    options: [
      "High reach, high impact, low confidence, high effort",
      "Low reach, low impact, high confidence, low effort",
      "High reach, high impact, high confidence, low effort",
      "Low reach, high impact, low confidence, high effort",
    ],
    correctIndex: 2,
    explanation:
      "RICE scoring rewards features that touch many users, move the needle meaningfully, are well-understood (high confidence) and cheap to build. The third option dominates on every dimension that increases the score and minimises the one that reduces it.",
  },
  {
    id: "pm-6",
    topic: "Prioritisation & execution",
    question:
      "Engineering says a requested feature will take twice as long as the PM expected. What is the best next step?",
    options: [
      "Insist on the original timeline since it was already communicated to stakeholders.",
      "Understand why the estimate changed, then jointly decide whether to descope, re-sequence or accept the new timeline.",
      "Quietly remove the feature from the roadmap without telling anyone.",
      "Escalate immediately to leadership before talking to the engineering team.",
    ],
    correctIndex: 1,
    explanation:
      "A good PM treats an estimate change as new information, not a negotiation to win. Understanding the reason first (scope, complexity, dependencies) lets you make a real trade-off decision instead of just applying pressure.",
  },
  {
    id: "pm-7",
    topic: "Technical understanding",
    question: "What is the main practical difference between a SQL and a NoSQL database, for a PM to know?",
    options: [
      "SQL databases cannot store text, only numbers.",
      "SQL databases enforce a fixed, related-table structure; NoSQL databases favour flexible, often document-based structures that scale differently.",
      "NoSQL databases are always faster for every use case.",
      "There is no meaningful difference for product decisions.",
    ],
    correctIndex: 1,
    explanation:
      "A PM doesn't need to write either, but knowing that SQL favours structured, relational data with strong consistency, while NoSQL favours flexibility and horizontal scale, helps you ask the right questions when engineering proposes a data-model change.",
  },
  {
    id: "pm-8",
    topic: "Technical understanding",
    question: "What does an API rate limit primarily protect against?",
    options: [
      "Poor visual design in the app.",
      "A single client or integration overwhelming the backend with too many requests.",
      "Users forgetting their password.",
      "Slow marketing campaigns.",
    ],
    correctIndex: 1,
    explanation:
      "Rate limits cap how many requests a client can make in a given time window, protecting shared infrastructure from being overwhelmed by one heavy user, a bug in a client, or abuse — a common consideration when a PM is scoping a public API or integration.",
  },
  {
    id: "pm-9",
    topic: "Product strategy",
    question:
      "A product has strong usage among free-tier users but weak conversion to paid. Which explanation is most worth investigating first?",
    options: [
      "The free tier already delivers most of the value paid customers would pay for.",
      "The company's logo needs a redesign.",
      "Free users are using a different device than paid users.",
      "The support team is too small.",
    ],
    correctIndex: 0,
    explanation:
      "Weak conversion despite strong free usage is a classic sign the free tier over-delivers value relative to what's reserved for paid — a strategic packaging problem, not a marketing or support problem.",
  },
  {
    id: "pm-10",
    topic: "Product strategy",
    question: "What is the main risk of building a feature because 'our biggest competitor just launched it'?",
    options: [
      "There is no risk — matching competitors is always correct.",
      "It may not fit your specific users' actual needs, and reacting to competitors can quietly replace having your own strategy.",
      "It will always be technically impossible to build.",
      "Competitors never make good product decisions.",
    ],
    correctIndex: 1,
    explanation:
      "Competitive awareness is useful input, but building reactively — without asking whether the feature serves your specific users and strategy — can lead to a roadmap driven entirely by someone else's decisions.",
  },
];
