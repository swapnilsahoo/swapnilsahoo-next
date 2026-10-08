export type LabProgrammeSlug =
  "ai-for-managers" | "strategy-case-thinking" | "entrepreneurship-under-constraint";

export type LabDemoDecision = {
  question: string;
  choices: { title: string; feedback: string }[];
};

export type LabProgramme = {
  slug: LabProgrammeSlug;
  title: string;
  tagline: string;
  audience: string[];
  prerequisites: string[];
  duration: string;
  format: string;
  outcomes: string[];
  sessions: { title: string; description: string; output: string }[];
  capstone: string;
  rubric: { criterion: string; weight: number; description: string }[];
  certificate: {
    attendancePercent: number;
    minScore: number;
    requiredLessons: number;
    requirements: string[];
  };
  sources: { title: string; url: string }[];
  demo: {
    decisions?: LabDemoDecision[];
    title: string;
    scenario: string;
    lesson: string[];
    task: string;
    prompts: string[];
    modelAnswer: string[];
    checkpoint: {
      question: string;
      options: string[];
      answer: number;
      explanation: string;
    };
  };
};
