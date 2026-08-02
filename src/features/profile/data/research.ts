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
    centralQuestion:
      "How do founders and family firms put scarce resources to work, and how can bricolage transition into effectuation?",
    context:
      "Founders and family businesses operating in resource-constrained environments and institutional voids.",
    whyItMatters:
      "This stream connects my doctoral work on entrepreneurial resourcefulness with questions about dynamic capabilities and repeatable adaptation.",
    icon: "bricolage",
  },
  {
    index: "Stream 02",
    title: "Neurodiversity & Dynamic Capabilities",
    centralQuestion:
      "How might cognitively diverse teams notice opportunities, act on them and adapt?",
    context:
      'Neurodiversity, entrepreneurial teams and the "spiky profile" in entrepreneurship theory.',
    whyItMatters:
      "The work brings neurodiversity into the same opportunity-recognition and dynamic-capabilities conversation as the rest of my research.",
    icon: "compass",
  },
  {
    index: "Stream 03",
    title: "Frugal Innovation, Jugaad & Bricolage",
    centralQuestion:
      "How do people create useful, affordable solutions when money and infrastructure are scarce?",
    context: "Frugal innovation, jugaad and bricolage in family enterprises and emerging markets.",
    whyItMatters:
      "This stream connects resource-constrained innovation with my conference work on family involvement, sustainable innovation and R&D.",
    icon: "spark",
  },
  {
    index: "Stream 04",
    title: "Effectuation & Family Business Dynamics",
    centralQuestion:
      "How do governance, trust, succession and AI adoption shape innovation across generations?",
    context:
      "Multi-generational family enterprises, where family relationships and strategic decisions meet.",
    whyItMatters:
      "The work links resourcefulness with my conference research on trust, sustainable innovation and family involvement.",
    icon: "network",
  },
];
