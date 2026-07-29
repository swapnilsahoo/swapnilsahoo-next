import type { ResearchStream } from "@/features/profile/types";

export const dissertation = {
  eyebrow: "Doctoral dissertation · XLRI Jamshedpur",
  title: "Entrepreneurial Resourcefulness in Resource-Constrained Environments",
  description:
    "This dissertation remains the foundation of my current research. Several papers presented at AOM Copenhagen and BAM Kent in 2025 grew from it.",
};

export const researchStreams: ResearchStream[] = [
  {
    index: "Stream 01",
    title: "Entrepreneurial Resourcefulness",
    description:
      "I study how founders and family firms put scarce resources to work, and where bricolage, effectuation and dynamic-capabilities theory help explain what they do.",
    icon: "bricolage",
  },
  {
    index: "Stream 02",
    title: "Neurodiversity & Dynamic Capabilities",
    description:
      'How cognitively diverse teams notice opportunities, act on them and adapt—including my work on the "spiky profile" in entrepreneurship theory (BAM 2025).',
    icon: "compass",
  },
  {
    index: "Stream 03",
    title: "Frugal Innovation, Jugaad & Bricolage",
    description:
      "How people create useful, affordable solutions when money and infrastructure are scarce, especially in family enterprises and emerging markets.",
    icon: "spark",
  },
  {
    index: "Stream 04",
    title: "Effectuation & Family Business Dynamics",
    description:
      "How governance, trust, succession and AI adoption shape innovation in family enterprises across generations.",
    icon: "network",
  },
];
