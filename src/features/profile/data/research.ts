import type { ResearchStream } from "@/features/profile/types";

export const dissertation = {
  eyebrow: "Doctoral dissertation · XLRI Jamshedpur",
  title: "Entrepreneurial Resourcefulness in Resource-Constrained Environments",
  description:
    "The intellectual core of my current programme: a series of 2025 papers presented at AOM Copenhagen and BAM Kent draws from this work.",
};

export const researchStreams: ResearchStream[] = [
  {
    index: "Stream 01",
    title: "Entrepreneurial Resourcefulness",
    description:
      "Conceptualising and measuring how founders and family firms mobilise scarce resources — bridging bricolage, effectuation, and dynamic-capabilities perspectives.",
    icon: "bricolage",
  },
  {
    index: "Stream 02",
    title: "Neurodiversity & Dynamic Capabilities",
    description:
      'How cognitively diverse teams sense, seize, and reconfigure — including the "spiky profile" in unified theories of entrepreneurship (BAM 2025).',
    icon: "compass",
  },
  {
    index: "Stream 03",
    title: "Frugal Innovation, Jugaad & Bricolage",
    description:
      "The grammar of constrained creativity in emerging markets — institutional voids, family entrepreneurship, and how penurious environments shape capability building.",
    icon: "spark",
  },
  {
    index: "Stream 04",
    title: "Effectuation & Family Business Dynamics",
    description:
      "Sustainable innovation, governance, and trust in multi-generational family enterprises — with growing attention to AI adoption and succession.",
    icon: "network",
  },
];
