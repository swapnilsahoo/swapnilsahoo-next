import { freeCourses } from "./free-courses";

export const catalogueVersion = "2026-10-10";
export type CatalogueAccess = "open" | "academic" | "beta";
export type CatalogueLevel = "Introductory" | "Practice" | "Academic depth";
export type CatalogueResource = {
  id: string;
  title: string;
  href: string;
  summary: string;
  outcome: string;
  audience: string;
  level: CatalogueLevel;
  prerequisites: string;
  duration: string;
  format: string;
  language: string;
  instructor: string;
  access: CatalogueAccess;
  accessNote: string;
  keywords: string[];
};
export type LearningPath = {
  slug: string;
  title: string;
  goal: string;
  summary: string;
  audience: string;
  prerequisites: string;
  resourceIds: string[];
  optionalIds: string[];
  challenge: { title: string; brief: string; prompts: string[]; checks: string[] };
};

export const accessLabels: Record<CatalogueAccess, string> = {
  open: "Free / open",
  academic: "Academic resource",
  beta: "Beta tools",
};

const keywords: Record<string, string[]> = {
  "write-an-ai-task-brief": ["prompt", "workflow", "instructions", "reviewer", "LLM"],
  "test-ai-before-adoption": ["evaluation", "accuracy", "workflow", "review time", "AI reliability"],
  "make-a-strategic-tradeoff": ["strategy", "choice", "trade-off", "opportunity cost", "focus"],
  "read-your-unit-economics": ["contribution", "margin", "profit", "break-even", "capacity", "numeracy"],
  "set-an-affordable-loss": ["effectuation", "budget", "experiment", "risk", "venture"],
  "ask-better-customer-questions": ["customer interviews", "discovery", "behaviour", "demand", "evidence"],
};

// Public metadata only. Lesson explanations and examples remain in their original source.
// Suggested levels/background are catalogue guidance, not admission requirements.
const introductoryResources: CatalogueResource[] = freeCourses.map((course) => ({
  id: course.slug,
  title: course.title,
  href: `/learning-lab/free-courses/${course.slug}`,
  summary: course.intro,
  outcome: course.output,
  audience: "Adult learners starting to practise a management skill",
  level: "Introductory",
  prerequisites:
    course.slug === "read-your-unit-economics"
      ? "Basic addition, subtraction and division; a notebook or calculator."
      : "No specialist background; a notebook is enough.",
  duration: `About ${course.minutes} minutes`,
  format: "Reading + decision exercise + worksheet",
  language: "English",
  instructor: "Dr. Swapnil Sahoo",
  access: "open",
  accessNote: "No account or paid software required. Self-practice; no certificate.",
  keywords: keywords[course.slug] || [course.category],
}));

function resource(
  input: Pick<CatalogueResource, "id" | "title" | "href" | "summary" | "outcome" | "keywords"> &
    Partial<CatalogueResource>
): CatalogueResource {
  return {
    audience: "Adult learners, MBA students and early-career professionals",
    level: "Practice",
    prerequisites: "No formal prerequisite is stated; use the suggested path order.",
    duration: "Self-paced; no published time estimate",
    format: "Reading + self-practice",
    language: "English",
    instructor: "Dr. Swapnil Sahoo",
    access: "open",
    accessNote: "Public reading and self-practice. No enrolment, human review or certificate included.",
    ...input,
  };
}

export const catalogueResources: CatalogueResource[] = [
  ...introductoryResources,
  resource({
    id: "ai-for-students",
    title: "Use AI while keeping the judgement yours",
    href: "/ai-initiatives/ai-for-students",
    summary: "Do/avoid guidance for case preparation, interviews, assignments and building.",
    outcome: "A verification, disclosure and ownership checklist for your next AI-assisted draft.",
    audience: "PGDM / MBA students",
    prerequisites: "Read your programme's AI-use rules before applying the examples.",
    accessNote: "The guide is open. Trying tool examples needs your chosen AI assistant; no tool is needed to read.",
    keywords: ["AI literacy", "students", "assignments", "disclosure", "verification", "placements"],
  }),
  resource({
    id: "ai-workflow-demonstration",
    title: "Inspect an AI workflow adoption decision",
    href: "/learning-lab/programmes/ai-for-managers#demo",
    summary: "Try the programme's original demonstration and inspect its public workflow example.",
    outcome: "An adoption decision that accounts for errors, review effort and human responsibility.",
    format: "Decision exercise + downloadable text example",
    accessNote: "The sample is open. The surrounding full programme is proposed; this is not enrolment.",
    keywords: ["AI", "workflow", "evaluation", "adoption", "review", "pilot"],
  }),
  resource({
    id: "placement-readiness",
    title: "Choose a role and build an evidence bank",
    href: "/placements",
    summary: "A readiness studio connecting your experience, target role and interview evidence.",
    outcome: "A role thesis, a capability-gap list and examples you can defend in an interview.",
    audience: "MBA students preparing for placements",
    format: "Interactive readiness check + reading + prompts",
    keywords: ["career", "placements", "interview", "resume", "CV", "role", "readiness"],
  }),
  resource({
    id: "case-frameworks",
    title: "Choose a structure for a consulting case",
    href: "/placements/case-frameworks",
    summary: "Six framework families with diagrams, questions and worked mini examples.",
    outcome: "A case structure that follows the problem instead of forcing a memorised template.",
    prerequisites: "Comfort with basic business terms; the foundations path is a useful start.",
    format: "Interactive framework explorer + diagrams + reading",
    keywords: ["consulting", "case practice", "profitability", "market entry", "growth", "pricing", "M&A"],
  }),
  resource({
    id: "guesstimates",
    title: "Estimate a market and defend your assumptions",
    href: "/placements/guesstimates",
    summary: "Define, decompose, estimate and sanity-check with worked arithmetic examples.",
    outcome: "A transparent estimate with units, assumptions and a second plausibility check.",
    prerequisites: "Basic arithmetic, percentages and unit consistency.",
    format: "Interactive example explorer + worked calculations",
    keywords: ["market sizing", "guesstimate", "estimate", "numeracy", "assumptions", "consulting"],
  }),
  resource({
    id: "worked-case-examples",
    title: "Read exhibits and synthesise a recommendation",
    href: "/placements/case-examples",
    summary: "Three original market-entry, growth and pricing cases with staged exhibits.",
    outcome: "A case recommendation tied to the exhibits, risks and a useful next test.",
    prerequisites: "Basic arithmetic; review a case framework before the examples.",
    format: "Case prompts + exhibits + synthesis guidance",
    keywords: ["consulting", "case practice", "exhibits", "evidence", "market entry", "pricing"],
  }),
  resource({
    id: "case-interview-bank",
    title: "Practise ten cases before revealing the guidance",
    href: "/placements/case-interview-bank",
    summary: "Original prompts spanning retention, pricing, competitive response, causal reasoning and diligence.",
    outcome: "An independent case attempt revised against the questions a strong answer should raise.",
    prerequisites: "Recommended: case frameworks and the three worked case examples.",
    format: "Case prompts + expandable review guidance",
    keywords: ["consulting", "case practice", "product", "retention", "causality", "PE", "VC"],
  }),
  resource({
    id: "behavioural-interview-evidence",
    title: "Defend the evidence behind an interview story",
    href: "/placements/behavioral-interview-questions",
    summary: "Leadership, conflict and judgement questions, plus an evidence ladder for resume claims.",
    outcome: "A specific interview story with your decisions, actions, results and limitations.",
    prerequisites: "Bring an example from work, an internship, a project or campus responsibility.",
    format: "Question groups + evidence prompts",
    keywords: ["behavioural", "behavioral", "STAR", "leadership", "resume", "interview", "evidence"],
  }),
  resource({
    id: "startup-playbook",
    title: "Turn a startup idea into a small real test",
    href: "/teaching/how-to-build-a-startup",
    summary: "Five effectuation principles and a first-two-weeks action checklist.",
    outcome: "A bounded idea, affordable-loss limit, five conversation plan and smallest test.",
    audience: "Students and early founders",
    format: "Interactive principle tabs + activities + checklist",
    keywords: ["startup", "venture", "effectuation", "customer discovery", "experiment", "entrepreneurship"],
  }),
  resource({
    id: "product-market-fit",
    title: "Read retention before claiming product-market fit",
    href: "/teaching/product-market-fit",
    summary: "Compare retention patterns and possible responses when repeat use is weak.",
    outcome: "A retention interpretation and a specific next learning action.",
    audience: "Students and early founders",
    format: "Reading + retention comparison + PPTX slides",
    keywords: ["product market fit", "PMF", "retention", "customers", "product", "startup"],
  }),
  resource({
    id: "pitching-storytelling",
    title: "Structure a pitch for the person listening",
    href: "/teaching/pitching-storytelling",
    summary: "A six-part outline with investor, customer and prospective-hire perspectives.",
    outcome: "A two-minute pitch outline grounded in a problem, evidence and a specific ask.",
    audience: "Founders and students practising a venture pitch",
    format: "Reading + pitch outline + PPTX slides",
    keywords: ["pitch", "storytelling", "investor", "customer", "startup", "communication"],
  }),
  resource({
    id: "hiring-first-team",
    title: "Make deliberate choices about your first team",
    href: "/teaching/hiring-first-team",
    summary: "Early-hire traits, red flags and equity/co-founder discussion prompts.",
    outcome: "An early-hire criteria list and questions about equity, vesting and decision rights.",
    audience: "Founders considering early hires",
    format: "Reading + checklists + PPTX slides",
    keywords: ["hiring", "team", "founder", "equity", "vesting", "entrepreneurship"],
  }),
  resource({
    id: "raising-money",
    title: "Compare funding routes and follow dilution",
    href: "/teaching/raising-money",
    summary: "Bootstrapping, debt and equity with a worked ownership table and investor questions.",
    outcome: "A funding comparison and an explained founder-ownership calculation.",
    prerequisites: "Basic percentages; bring a hypothetical venture funding need.",
    format: "Reading + worked dilution table + PPTX slides",
    keywords: ["funding", "debt", "equity", "dilution", "capital", "startup"],
  }),
  resource({
    id: "durable-advantage",
    title: "Map an advantage and test how easily it can be copied",
    href: "/teaching/building-a-durable-advantage",
    summary: "Advantage sources, examples and a one-page map with a copy test.",
    outcome: "A one-page advantage map and a reasoned twelve-month copy test.",
    prerequisites: "A business idea or fictional company; a partner is useful for the published exercise.",
    format: "Reading + mapping exercise + PPTX slides",
    keywords: ["strategy", "competitive advantage", "moat", "copy", "venture", "defensibility"],
  }),
  resource({
    id: "mba-strategy-map",
    title: "Explore the thirteen-session MBA strategy sequence",
    href: "/teaching/1-year-mba#course-map",
    summary: "An academic course map connecting analysis, formulation and implementation.",
    outcome: "A route to deeper strategy sessions, reading lists and interactive activities.",
    audience: "MBA learners and readers with business-analysis background",
    level: "Academic depth",
    prerequisites: "Business-analysis background; assigned readings and course materials may need separate access.",
    duration: "13 academic sessions; not a self-paced completion estimate",
    format: "Academic course map + linked session resources",
    access: "academic",
    accessNote: "The map is public. Academic enrolment, licensed readings and course-folder access are separate.",
    keywords: ["MBA", "strategy", "academic", "industry analysis", "formulation", "implementation"],
  }),
  resource({
    id: "mba-strategy-session-one",
    title: "Explore strategic choices through an activity system",
    href: "/teaching/1-year-mba/session1.html",
    summary: "Interactive strategy activities, a productivity frontier and decision-memo practice.",
    outcome: "An explained strategic choice and a first decision-memo attempt.",
    level: "Academic depth",
    prerequisites: "Start with the strategic-choice mini-course; consult the session's reading/access notes.",
    format: "Interactive session + reading + workshops + checks",
    access: "academic",
    accessNote: "Public session activities are available. Referenced course-pack readings remain separately accessed.",
    keywords: ["strategy", "Porter", "activity system", "productivity frontier", "trade-off", "MBA"],
  }),
  resource({
    id: "mba-strategy-quiz-one",
    title: "Check your reasoning on the first strategy session",
    href: "/teaching/quiz/1yr-01",
    summary: "Session practice questions with worked rationales.",
    outcome: "A list of concepts to revisit, based on your practice answers and explanations.",
    level: "Academic depth",
    prerequisites: "Read the corresponding MBA strategy session first.",
    format: "Interactive quiz + worked rationales",
    access: "academic",
    accessNote: "Public practice only. Quiz performance does not award academic marks or Lab certification.",
    keywords: ["strategy", "quiz", "misconception", "review", "MBA", "practice"],
  }),
  resource({
    id: "business-simulation-outline",
    title: "Connect strategy to cross-functional simulation decisions",
    href: "/teaching/business-simulation",
    summary: "A twenty-session academic outline across markets, operations, finance, people and ESG.",
    outcome: "A framework for explaining how business decisions affect one another.",
    level: "Academic depth",
    prerequisites: "MBA-level business knowledge. Running the named simulation requires separate course/provider access.",
    duration: "20-session academic outline; not a self-paced completion estimate",
    format: "Course outline + decision/debrief guidance",
    access: "academic",
    accessNote: "Reading the page is open. It does not provide a simulation licence, account or academic enrolment.",
    keywords: ["simulation", "Cesim", "operations", "finance", "ESG", "strategy", "MBA"],
  }),
  resource({
    id: "beta-ai-tools",
    title: "Inspect the founder's optional AI prototypes",
    href: "/ai-initiatives/ai-hackathon/side-quests",
    summary: "A public directory linking to personal beta builds, including AI Viva Bot.",
    outcome: "A view of an experimental practice tool and its current setup requirements.",
    format: "Directory + external beta application links",
    access: "beta",
    accessNote: "Optional external prototypes. Check each app's credentials/data requirements; no live assessment or reliability is promised.",
    keywords: ["AI Viva Bot", "viva", "oral interview", "beta", "prototype", "external app"],
  }),
];

export const learningPaths: LearningPath[] = [
  {
    slug: "business-foundations",
    title: "Business Foundations",
    goal: "Understand a business decision",
    summary: "Follow the money, make a choice, explain an assumption and support a recommendation.",
    audience: "Adult beginners and students building confidence with business reasoning",
    prerequisites: "Basic arithmetic; use the worked examples before trying the larger cases.",
    resourceIds: ["read-your-unit-economics", "make-a-strategic-tradeoff", "guesstimates", "worked-case-examples"],
    optionalIds: ["mba-strategy-map", "mba-strategy-session-one", "mba-strategy-quiz-one", "business-simulation-outline"],
    challenge: {
      title: "Write a one-page decision memo",
      brief: "Choose a fictional business from the lessons or a case you have worked. Compare two feasible choices and recommend one using the available numbers and constraints.",
      prompts: ["What decision must be made, and what are the two choices?", "Which two facts or calculations support your recommendation?", "What assumption, capacity limit or trade-off matters most?", "What small test would make you revise the decision?"],
      checks: ["Distinguish supplied facts from assumptions.", "Show units and intermediate arithmetic.", "Explain the choice you are giving up.", "Name a test and a revision trigger."],
    },
  },
  {
    slug: "applied-ai-for-managers",
    title: "Applied AI for Managers",
    goal: "Use AI with evidence and human review",
    summary: "Specify a bounded task, inspect an evaluation and defend a practical adoption decision.",
    audience: "Non-technical adult learners, management students and early-career professionals",
    prerequisites: "No coding required for the open lessons. Use synthetic information; an AI account is optional for the initial exercises.",
    resourceIds: ["write-an-ai-task-brief", "test-ai-before-adoption", "ai-for-students", "ai-workflow-demonstration"],
    optionalIds: ["beta-ai-tools"],
    challenge: {
      title: "Build an inspectable workflow proposal",
      brief: "Use a fictional task from the lessons. Write the allowed inputs, draft/review stages and a small evaluation plan. If you try an AI tool, use only synthetic inputs and record its actual outputs; a paper walkthrough is also useful.",
      prompts: ["What may the assistant prepare, and what remains a human decision?", "What counts as a pass, a revision or escalation?", "Which awkward cases and review-time costs will you include?", "What result would justify a limited trial, and what would stop it?"],
      checks: ["Use permitted inputs and flag missing facts.", "Keep generated claims separate from evidence.", "Count review and correction effort.", "Name the human owner and rollback condition."],
    },
  },
  {
    slug: "career-and-case-practice",
    title: "Career and Case Practice",
    goal: "Prepare for interviews and analytical roles",
    summary: "Connect a role to your evidence, practise cases and make your reasoning easier to follow.",
    audience: "MBA students and adult learners preparing for analytical interviews",
    prerequisites: "Basic business numeracy; bring an experience or project you can discuss honestly.",
    resourceIds: ["placement-readiness", "case-frameworks", "guesstimates", "worked-case-examples", "case-interview-bank", "behavioural-interview-evidence"],
    optionalIds: ["beta-ai-tools"],
    challenge: {
      title: "Keep an interview evidence and practice log",
      brief: "Choose one target role, attempt one case without revealing guidance, then record one experience-based answer. Compare both attempts with the source prompts and revise a specific weakness.",
      prompts: ["What role are you targeting and what evidence supports the choice?", "How did you structure the case and check the arithmetic?", "What did you do personally in your interview story?", "What changed after you reviewed the guidance or rehearsed with a partner?"],
      checks: ["Make claims specific and defensible.", "Attempt the case before opening its guidance.", "Explain assumptions and competing interpretations.", "Record a concrete revision; self-review is not a hiring prediction."],
    },
  },
  {
    slug: "entrepreneurship-under-constraint",
    title: "Entrepreneurship Under Constraint",
    goal: "Test a venture without betting everything",
    summary: "Set your limits, ask about real behaviour, check the economics and design a small test.",
    audience: "Students, aspiring founders and people exploring a small venture",
    prerequisites: "No funding or coding required to start. Basic arithmetic helps with the economics step.",
    resourceIds: ["set-an-affordable-loss", "ask-better-customer-questions", "read-your-unit-economics", "startup-playbook", "product-market-fit", "pitching-storytelling"],
    optionalIds: ["hiring-first-team", "raising-money", "durable-advantage"],
    challenge: {
      title: "Prepare a venture decision dossier",
      brief: "Develop a hypothetical venture or a safe experiment you can genuinely run. Separate what customers did from what you infer, explain the cost/capacity limit and decide the next bounded step.",
      prompts: ["What problem and recent customer behaviour will you investigate?", "What time/money can you afford to lose?", "What do contribution, break-even and capacity imply?", "What evidence would make you continue, change or stop?"],
      checks: ["Distinguish compliments, bookings, payments and repeat use.", "Separate observations from interpretations.", "Include delivery costs and capacity.", "Set a budget, a learning question and a stopping condition."],
    },
  },
];

export function getCatalogueResource(id: string) {
  return catalogueResources.find((item) => item.id === id);
}
export function getLearningPath(slug: string) {
  return learningPaths.find((item) => item.slug === slug);
}
export function filterCatalogue(
  resources: CatalogueResource[],
  filters: { query?: string; access?: string; level?: string; resourceIds?: string[] }
) {
  const words = (filters.query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  return resources.filter((item) => {
    const searchable = `${item.title} ${item.summary} ${item.outcome} ${item.audience} ${item.keywords.join(" ")}`.toLowerCase();
    return (
      (!filters.access || item.access === filters.access) &&
      (!filters.level || item.level === filters.level) &&
      (!filters.resourceIds || filters.resourceIds.includes(item.id)) &&
      words.every((word) => searchable.includes(word))
    );
  });
}
