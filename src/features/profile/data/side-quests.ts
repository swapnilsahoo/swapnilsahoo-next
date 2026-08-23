import type { SideQuest } from "@/features/profile/types";

export const sideQuests: SideQuest[] = [
  {
    slug: "ai-viva-bot",
    status: "Live beta · open for testing",
    eyebrow: "AI build · grew out of the AI Mini Hackathon",
    title: "AI Viva Bot",
    tagline: "A Socratic oral-exam simulator that questions students on their own claims.",
    description:
      "Most oral exams reward confident delivery, not understanding. AI Viva Bot pushes past that: a student uploads the actual assignment or report, and the bot questions them the way a sharp examiner would — grounding each question in a claim they specifically made, not a generic bank. Faculty set the examiner's persona, the difficulty and the grading rubric before the room opens.",
    features: [
      "Faculty pick the examiner persona, difficulty and grading rubric before the room opens.",
      "Every question is generated from a specific claim in the student's own submission, not a static bank.",
      "Students can answer by text, audio or video; light in-browser proctoring (gaze and window-focus checks) keeps the session honest.",
      "Runs on the Gemini API with session data kept in the browser, not a server database.",
    ],
    testAsks: [
      {
        title: "Run a full mock exam",
        description:
          "As faculty or student, go end to end: set up or receive an oral exam, answer the follow-up questions, see how the grading reads.",
      },
      {
        title: "Try to break it",
        description:
          "Upload a messy file, give a deliberately weak or evasive answer, switch tabs mid-question — tell me what the bot does with the edge case.",
      },
      {
        title: "Judge the questions",
        description:
          "Were they actually anchored to what you wrote, or did they feel generic? That gap is the thing most worth fixing next.",
      },
    ],
    href: "https://aivivabotv90.netlify.app/",
    external: true,
  },
];
