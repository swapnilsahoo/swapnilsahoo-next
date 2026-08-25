export interface AiModule {
  id: string;
  title: string;
  items: { whatItCovers: string; tools: string }[];
}

/**
 * A hands-on AI-literacy workshop for teachers and academic staff —
 * what to actually do with an AI assistant, module by module, with
 * the real tools used in each session named directly.
 */
export const aiModules: readonly AiModule[] = [
  {
    id: "materials",
    title: "Create teaching materials, fast",
    items: [
      {
        whatItCovers:
          "Turn a prompt, outline or document into a polished slide deck with speaker notes, or re-level any text with vocabulary and comprehension questions built in. Generate worksheets, MCQs and quizzes matched to topic and grade, with a gamified option when it helps.",
        tools: "Gamma · Canva · Brisk · MagicSchool · Diffit · Quizizz · Conker · QuestionWell",
      },
      {
        whatItCovers:
          "Turn plain text into editable diagrams, flowcharts, mind-maps and timelines in seconds, plus AI-generated images for posters and displays — with a note on using generated images responsibly.",
        tools: "Napkin AI · Canva",
      },
      {
        whatItCovers:
          "Prompt an assistant to generate a self-checking practice puzzle — a maths maze where each correct answer chooses the next step is the example I use in the session, but the same idea adapts to fractions, times tables, spelling or vocabulary in any subject.",
        tools: "Your assistant of choice · Canva",
      },
    ],
  },
  {
    id: "draft-explain",
    title: "Draft, summarise, explain",
    items: [
      {
        whatItCovers:
          "Draft, format and summarise documents directly inside Word or Docs. Turn a spreadsheet into charts plus a plain-language summary of what it actually shows.",
        tools: "Copilot · Julius AI",
      },
      {
        whatItCovers:
          "Turn a summary into a short, narrated explainer video — one to three minutes, no camera required — which works well for junior classes.",
        tools: "Synthesia · HeyGen",
      },
    ],
  },
  {
    id: "prompting",
    title: "Prompting, properly",
    items: [
      {
        whatItCovers:
          "Know the main assistants and where each genuinely helps versus where it fails — and always verify. I teach a simple five-part frame — Role, Task, Context, Format, Example — for getting the exact output you want, then refining it with a follow-up: 'simpler,' 'in Hindi,' 'add an answer key.'",
        tools: "ChatGPT · Claude · Gemini · Copilot",
      },
      {
        whatItCovers:
          "Save the setup, not just the output: custom instructions and saved projects that store your role, tone and recurring needs, plus templates for the handful of messages you send most often.",
        tools: "Custom instructions & saved projects",
      },
      {
        whatItCovers:
          "Know when a template-driven toolkit beats open prompting, and how to get AI-assisted research with citations you can actually check — answers grounded in your own uploaded sources, not the open internet.",
        tools: "MagicSchool · Brisk · Perplexity · NotebookLM",
      },
    ],
  },
  {
    id: "admin",
    title: "Save time on the admin",
    items: [
      {
        whatItCovers:
          "Live meeting transcription with summaries and action items — with a consent rule stated up front, every time.",
        tools: "Otter.ai · Fireflies · Read AI",
      },
      {
        whatItCovers:
          "Formulas, cleaning and pivot tables from a plain-language request; upload a sheet and get charts plus a written summary — and always anonymise student data before it goes near a model.",
        tools: "Copilot for Excel/Sheets · Julius AI",
      },
    ],
  },
  {
    id: "grade-build",
    title: "Grade, and build your own assistant",
    items: [
      {
        whatItCovers:
          "Rubric generators, rubric-aligned feedback, question banks, Bloom's-level mapping, and gamified evaluation for any subject — with one rule that doesn't move: AI drafts, the teacher reviews, edits and owns the result.",
        tools: "MagicSchool · Brisk · Quizizz · QuestionWell · CoGrader",
      },
      {
        whatItCovers:
          "Build a custom GPT or Gemini Gem as a teaching assistant in about ten minutes — effectively a clone that answers student doubts in your own style, from your own materials. This is also where responsible use gets concrete: bias, privacy under India's DPDP Act, and who owns what the assistant produces.",
        tools: "Custom GPTs · Gemini Gems · Claude Projects · NotebookLM",
      },
    ],
  },
] as const;

export const aiGoldenRule = {
  title: "AI drafts. You review, edit and own it.",
  description:
    "Every module in this workshop returns to the same rule. An assistant can produce a first draft of almost anything faster than you can type a heading — a deck, a quiz, a rubric, feedback on thirty scripts. What it cannot do is take responsibility for what goes in front of a student. That stays with the teacher, every time, no exception.",
} as const;

export const responsiblePrinciples: readonly string[] = [
  "Bias: check generated content for skewed examples, stereotypes or an uneven difficulty curve before it reaches a class.",
  "Privacy: never paste identifiable student data into a general-purpose assistant; anonymise first, and know what your institution's policy actually permits under India's DPDP Act.",
  "Ownership: a teacher who builds a custom assistant or generates a resource is responsible for what it says — attribute, verify and be ready to explain any output you use.",
] as const;
