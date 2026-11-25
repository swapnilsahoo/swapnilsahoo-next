import { sideQuests } from "@/features/profile/data/side-quests";

export const labProductsPath = "/learning-lab/products";

// One demo address for the whole site: the side-quests page and the Lab products page share it.
const vivaDemoUrl =
  sideQuests.find((quest) => quest.slug === "ai-viva-bot")?.href ||
  "https://aivivabotv90.netlify.app/";

export type LabProduct = {
  slug: string;
  name: string;
  status: string;
  tagline: string;
  demoUrl: string;
  forWhom: string;
  problem: string;
  solution: string;
  flow: { title: string; detail: string }[];
  tryIt: { step: string; detail: string }[];
  builtWith: string[];
  brandingNote: string;
};

/**
 * Facts here were checked against the live demo on 25 November 2026:
 * the four personas, 6–18 questions, the Faculty and Student demo buttons,
 * the sample roster and scores, PDF/email dossier, backup and restore,
 * and the browser-stored Gemini key. Do not add usage numbers or customers
 * without evidence.
 */
export const aiVivaBot: LabProduct = {
  slug: "ai-viva-bot",
  name: "AI Viva Bot",
  status: "Working prototype · live demo",
  tagline: "An AI oral examiner that questions each student on their own submission.",
  demoUrl: vivaDemoUrl,
  forWhom: "Universities, business schools and faculty who assess students through oral exams.",
  problem:
    "A viva is the clearest way to check that students understand their own work. It takes hours of faculty time per class, and it tends to reward confident delivery over understanding.",
  solution:
    "AI Viva Bot runs the viva. Faculty set the course, topic, number of questions and examiner style. Each student uploads their assignment or report, and the bot asks follow-up questions grounded in the claims that student actually made, then prepares an evaluation for faculty to review.",
  flow: [
    {
      title: "Faculty set up the exam",
      detail:
        "Course and topic, 6 to 18 questions, and one of four examiner personas: Socratic Challenger, Rigorous Academic, Balanced & Supportive or Industry Practitioner.",
    },
    {
      title: "Students join and upload",
      detail:
        "Each candidate enters their details and uploads their own submission, such as a PDF report.",
    },
    {
      title: "The bot examines",
      detail:
        "Questions come from specific claims in the submission, not a fixed question bank. Students answer by text, audio or video, with light in-browser checks on gaze and window focus.",
    },
    {
      title: "Faculty review the results",
      detail:
        "A dashboard shows the roster, scores and completed evaluations. Each evaluation becomes a dossier faculty can download as a PDF or email.",
    },
  ],
  tryIt: [
    {
      step: "Open the live demo",
      detail: "It opens in a new tab. If a box asks for an API key, close it with ✕ for now.",
    },
    {
      step: "Select ⚡ Faculty Demo",
      detail:
        "Loads a sample course, four sample students, scores and completed evaluations. No key needed.",
    },
    {
      step: "Select ⚡ Student Demo",
      detail: "Shows the candidate’s side: details, submission upload and the start of the viva.",
    },
    {
      step: "Run a live AI viva",
      detail:
        "Select 🔑 API Key and paste your own Google AI Studio (Gemini) key. It is stored only in your browser, never on a server.",
    },
  ],
  builtWith: [
    "Google Gemini API for questioning and evaluation",
    "Runs entirely in the browser; exam data stays on the device",
    "Faculty backup and restore, with no server database",
  ],
  brandingNote:
    "The demo currently shows Great Lakes Institute of Management branding and sample addresses. This does not mean the institute sponsors, endorses or partners with the Lab.",
};

export const labProducts: LabProduct[] = [aiVivaBot];
