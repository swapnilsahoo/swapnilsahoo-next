import { sideQuests } from "@/features/profile/data/side-quests";

export const labProductsPath = "/learning-lab/products";

/** The Lab hosts AI Viva Bot itself: public/learning-lab/products/ai-viva-bot.html. */
export const aiVivaBotAppPath = "/learning-lab/products/ai-viva-bot.html";

// One demo address for the whole site: the side-quests page and the Lab products page share it.
const vivaDemoUrl =
  sideQuests.find((quest) => quest.slug === "ai-viva-bot")?.href || aiVivaBotAppPath;

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
  adopt: { title: string; detail: string }[];
  builtWith: string[];
};

/**
 * Facts here were checked against the hosted app on 25 November 2026:
 * the four personas, 6–18 questions, the Faculty and Student demo buttons,
 * the sample roster and scores, PDF/email dossier, backup and restore,
 * the institution-name setting and the tab-only Gemini key.
 * Do not add usage numbers or customers without evidence.
 */
export const aiVivaBot: LabProduct = {
  slug: "ai-viva-bot",
  name: "AI Viva Bot",
  status: "Working prototype · live demo",
  tagline: "An AI oral examiner that questions each student on their own submission.",
  demoUrl: vivaDemoUrl,
  forWhom:
    "Universities, business schools, professors and students who use oral exams, at any institution.",
  problem:
    "A viva is the clearest way to check that students understand their own work. It takes hours of faculty time per class, and it tends to reward confident delivery over understanding.",
  solution:
    "AI Viva Bot runs the viva. Faculty set the course, topic, number of questions and examiner style. Each student uploads their assignment or report, and the bot asks follow-up questions grounded in the claims that student actually made, then prepares an evaluation for faculty to review.",
  flow: [
    {
      title: "Faculty set up the exam",
      detail:
        "Institution name, course and topic, 6 to 18 questions, and one of four examiner personas: Socratic Challenger, Rigorous Academic, Balanced & Supportive or Industry Practitioner.",
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
        "Select 🔑 API Key and paste your own Google AI Studio (Gemini) key. It stays only in that browser tab and goes only to Google’s Gemini API.",
    },
  ],
  adopt: [
    {
      title: "Make it yours",
      detail:
        "Enter your institution’s name in the faculty setup. It appears on the welcome screen, the dashboard and in the AI examiner’s instructions. No other institution’s branding is built in.",
    },
    {
      title: "Set your own standards",
      detail:
        "Choose the course, topic, number of questions, examiner persona, rubric and question bank for each exam.",
    },
    {
      title: "Keep data with faculty",
      detail:
        "Rosters, settings and results stay in the faculty member’s browser, with backup and restore as a file. Each faculty member uses their own Gemini key.",
    },
  ],
  builtWith: [
    "Google Gemini API for questioning and evaluation",
    "Runs entirely in the browser; exam data stays on the device",
    "Hosted by the Lab at swapnilsahoo.com, with no server database",
  ],
};

export const labProducts: LabProduct[] = [aiVivaBot];
