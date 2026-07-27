import type { TeachingLink } from "@/features/profile/types";

export const teachingLinks: TeachingLink[] = [
  {
    eyebrow: "Programme",
    title: "1-Year MBA",
    description: "Class sessions, cases & reading lists for the PGPM cohort.",
    href: "/teaching/1-year-mba",
  },
  {
    eyebrow: "Programme",
    title: "2-Year MBA",
    description: "Index of strategy & entrepreneurship modules across terms.",
    href: "/teaching/2-year-mba",
  },
  {
    eyebrow: "Teaching Resource",
    title: "Case Study Preparation",
    description:
      "Structured support for case writing, analysis, classroom discussion and debrief design.",
    href: "https://swapnilsahoo.com/case-study-preparation/",
    external: true,
  },
  {
    eyebrow: "MBA & PhD",
    title: "AI Hackathon",
    description:
      "A build-first AI experience grounded in 26 prototypes, an alumni-juried final, and responsible innovation.",
    href: "/teaching/ai-hackathon",
  },
  {
    eyebrow: "Career",
    title: "Placements",
    description: "Placement support, recruiter notes and student outcomes.",
    href: "https://swapnilsahoo.com/placements",
    external: true,
  },
];

export const teachingPhilosophy = {
  quote:
    "Strategy is taught best in the same key it is lived — under constraint, with imperfect information, and in the company of people who disagree well.",
  attribution: "Teaching philosophy",
};
