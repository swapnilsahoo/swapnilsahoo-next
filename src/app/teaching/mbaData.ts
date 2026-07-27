import type { ProgrammeConfig, Reference } from "./MbaProgrammePage";

const references: Reference[] = [
  {
    id: 1,
    author: "Porter, M. E.",
    year: "1996",
    title: "What Is Strategy?",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/1996/11/what-is-strategy",
  },
  {
    id: 2,
    author: "Harvard Business School",
    year: "n.d.",
    title: "The Case Method",
    publisher: "Harvard Business School",
    href: "https://www.hbs.edu/mba/academic-experience/the-case-method",
  },
  {
    id: 3,
    author: "Sterman, J. D.",
    year: "2022",
    title: "MIT Sloan Beer Game Online",
    publisher: "MIT Sloan School of Management",
    href: "https://mitsloan.mit.edu/teaching-resources-library/mit-sloan-beer-game-online",
  },
  {
    id: 4,
    author: "Sarasvathy, S. D.",
    year: "2001",
    title: "Causation and Effectuation",
    publisher: "Academy of Management Review",
    href: "https://doi.org/10.5465/amr.2001.4378020",
  },
  {
    id: 5,
    author: "Teece, D. J.",
    year: "2007",
    title: "Explicating Dynamic Capabilities",
    publisher: "Strategic Management Journal",
    href: "https://doi.org/10.1002/smj.640",
  },
  {
    id: 6,
    author: "Stanford d.school",
    year: "2025",
    title: "Let’s Stop Talking About THE Design Process",
    publisher: "Hasso Plattner Institute of Design at Stanford",
    href: "https://dschool.stanford.edu/stories/lets-stop-talking-about-the-design-process",
  },
  {
    id: 7,
    author: "AACSB International",
    year: "2022",
    title: "2020 Guiding Principles and Standards for Business Accreditation",
    publisher: "AACSB International",
    href: "https://www.aacsb.edu/-/media/documents/accreditation/2020-aacsb-business-accreditation-standards-jul-1-2022.pdf",
  },
  {
    id: 8,
    author: "Tabassi, E.",
    year: "2023",
    title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
    publisher: "National Institute of Standards and Technology",
    href: "https://doi.org/10.6028/NIST.AI.100-1",
  },
];

export const oneYearMba: ProgrammeConfig = {
  eyebrow: "1-Year MBA · Executive learning system",
  title: "Experience becomes",
  accent: "strategic range.",
  description:
    "An accelerated, discussion-intensive journey for experienced professionals—designed to convert functional depth into enterprise judgment, decisive communication and responsible action.",
  audience: "Experienced professionals",
  pace: "Compressed · intensive",
  outcome: "Enterprise-level judgment",
  promise: "Compress time. Expand perspective.",
  principles: [
    {
      title: "Experience is evidence",
      description:
        "Professional experience enters the room as data to be tested, compared and reframed—not merely narrated.",
      citations: [2],
    },
    {
      title: "Decisions before answers",
      description:
        "Learners commit under uncertainty, defend trade-offs and revise their view when the evidence changes.",
      citations: [1, 2],
    },
    {
      title: "Transfer every week",
      description:
        "Each concept travels from case to simulation to a live organizational challenge.",
      citations: [3, 7],
    },
  ],
  modules: [
    {
      index: "01",
      title: "Strategic diagnosis",
      question: "What is really going on—and what matters most?",
      description:
        "Move from symptoms to a coherent diagnosis by connecting industry structure, capabilities, stakeholders and the economics of value.",
      methods: ["Case debate", "Issue trees", "Value mapping"],
      citations: [1],
    },
    {
      index: "02",
      title: "Choice and positioning",
      question: "Where will we play, how will we win, and what will we refuse?",
      description:
        "Treat strategy as an integrated system of choices rather than a list of ambitions or operational improvements.",
      methods: ["Activity systems", "Trade-off memo", "Red-team review"],
      citations: [1],
    },
    {
      index: "03",
      title: "Adaptation and renewal",
      question: "What must the enterprise sense, seize and transform?",
      description:
        "Examine how leaders reconfigure assets, routines and partnerships as technologies and markets move.",
      methods: ["Capability audit", "Scenario sprint", "Portfolio choices"],
      citations: [5],
    },
    {
      index: "04",
      title: "Entrepreneurial action",
      question: "How do we act when prediction is weak?",
      description:
        "Contrast predictive planning with effectual control, affordable loss, partnerships and iterative commitment.",
      methods: ["Means inventory", "Affordable-loss test", "Venture experiment"],
      citations: [4],
    },
    {
      index: "05",
      title: "Systems and execution",
      question: "Why do sensible local decisions create poor enterprise outcomes?",
      description:
        "Use simulation and causal reasoning to expose feedback, delay, coordination failure and unintended consequences.",
      methods: ["Management simulation", "Causal loops", "After-action review"],
      citations: [3],
    },
    {
      index: "06",
      title: "AI in the boardroom",
      question: "Where does AI create advantage—and where does it create risk?",
      description:
        "Evaluate AI use cases through value, operating-model readiness, human accountability and continuous risk management.",
      methods: ["AI opportunity map", "Risk register", "Executive recommendation"],
      citations: [8],
    },
  ],
  studioTitle: "Pressure-test the decision.",
  studioDescription:
    "Fast cycles mirror executive work: diagnose, decide, communicate, receive challenge and improve the next move.",
  studios: [
    {
      title: "Boardroom brief",
      description: "Turn a complex case into a crisp recommendation with assumptions and risks.",
      evidence: "Two-page decision memo",
    },
    {
      title: "Strategy simulation",
      description: "Experience second-order effects, coordination costs and competitive response.",
      evidence: "Decision log + debrief",
    },
    {
      title: "Live challenge lab",
      description: "Apply the architecture to a current organizational opportunity or constraint.",
      evidence: "Sponsor-ready proposal",
    },
    {
      title: "Executive dialogue",
      description: "Defend a position, listen for disconfirming evidence and revise in real time.",
      evidence: "Oral defense",
    },
  ],
  assessment: [
    {
      label: "Signal 01",
      title: "Case judgment",
      description: "Diagnosis, choice quality and explicit trade-offs.",
    },
    {
      label: "Signal 02",
      title: "Simulation learning",
      description: "Decision logic, adaptation and insight from consequences.",
    },
    {
      label: "Signal 03",
      title: "Executive communication",
      description: "Clarity, evidence, brevity and response to challenge.",
    },
    {
      label: "Signal 04",
      title: "Strategic transfer",
      description: "Application to a live context with a credible action path.",
    },
  ],
  references,
  siblingHref: "/teaching/2-year-mba",
  siblingLabel: "2-Year MBA journey",
};

export const twoYearMba: ProgrammeConfig = {
  eyebrow: "2-Year MBA · Strategy & entrepreneurship pathway",
  title: "Build the foundations.",
  accent: "Earn the judgment.",
  description:
    "A scaffolded pathway that develops strategic literacy, analytical confidence and entrepreneurial agency—then integrates them through cases, experiments, simulations and live decisions.",
  audience: "Early-career managers",
  pace: "Scaffolded · cumulative",
  outcome: "Independent strategic thinking",
  promise: "Learn the language. Then challenge it.",
  principles: [
    {
      title: "Scaffold, then remove",
      description:
        "Frameworks provide an entry point; repeated application develops the ability to choose, adapt or discard them.",
      citations: [2, 6],
    },
    {
      title: "Participation creates learning",
      description:
        "Preparation, peer challenge, active listening and reflection turn cases into judgment practice.",
      citations: [2],
    },
    {
      title: "Evidence closes the loop",
      description:
        "Artifacts and feedback make capability development visible across the programme.",
      citations: [7],
    },
  ],
  modules: [
    {
      index: "01",
      title: "Seeing the business system",
      question: "How does an organization create, deliver and capture value?",
      description:
        "Build fluency across customers, economics, operations, stakeholders and the interdependencies that connect them.",
      methods: ["Business model map", "Unit economics", "Stakeholder lens"],
      citations: [3],
    },
    {
      index: "02",
      title: "Industry and competition",
      question: "What shapes profitability—and how might it change?",
      description:
        "Analyze industry structure without treating a framework as a static checklist; identify mechanisms and likely moves.",
      methods: ["Industry map", "Competitor response", "Evidence brief"],
      citations: [1],
    },
    {
      index: "03",
      title: "Advantage and activity systems",
      question: "Why should this firm win?",
      description:
        "Connect a distinctive value proposition to reinforcing activities, capabilities and meaningful trade-offs.",
      methods: ["Activity map", "Capability test", "Strategy critique"],
      citations: [1],
    },
    {
      index: "04",
      title: "Innovation through making",
      question: "What can we learn before we scale?",
      description:
        "Navigate ambiguity through user inquiry, reframing, prototyping and evidence-generating experiments.",
      methods: ["Need finding", "Prototype", "Learning experiment"],
      citations: [6],
    },
    {
      index: "05",
      title: "Entrepreneurship under uncertainty",
      question: "What can we control with the means already available?",
      description:
        "Use effectual logic to move from identity, knowledge and networks toward affordable experiments and partnerships.",
      methods: ["Means map", "Stakeholder ask", "Affordable-loss plan"],
      citations: [4],
    },
    {
      index: "06",
      title: "Corporate scope and renewal",
      question: "What belongs together—and what must change?",
      description:
        "Evaluate diversification, alliances, acquisitions and capability renewal through a value-creation lens.",
      methods: ["Better-off test", "Synergy logic", "Renewal roadmap"],
      citations: [5],
    },
    {
      index: "07",
      title: "Execution as a system",
      question: "How do choices become coordinated action?",
      description:
        "Translate strategy into priorities, measures, operating rhythms and learning loops while anticipating system effects.",
      methods: ["Causal map", "Operating cadence", "Leading indicators"],
      citations: [3],
    },
    {
      index: "08",
      title: "Responsible AI and strategy",
      question: "How should managers govern AI-enabled decisions?",
      description:
        "Pair opportunity discovery with governance, context mapping, measurement and ongoing management of risk.",
      methods: ["Use-case canvas", "Human oversight", "AI risk review"],
      citations: [8],
    },
  ],
  studioTitle: "Practice before performance.",
  studioDescription:
    "A progression of low-stakes rehearsals builds the analytical, collaborative and communication muscles required for consequential work.",
  studios: [
    {
      title: "Case huddle",
      description: "Compare diagnoses, surface assumptions and prepare a decision before class.",
      evidence: "One-page case note",
    },
    {
      title: "Framework clinic",
      description: "Apply, critique and adapt a strategic tool using contrasting contexts.",
      evidence: "Annotated analysis",
    },
    {
      title: "Venture studio",
      description:
        "Move from an observed problem to a testable proposition and stakeholder evidence.",
      evidence: "Experiment portfolio",
    },
    {
      title: "Integration lab",
      description:
        "Connect competition, capabilities, execution and responsibility in one decision.",
      evidence: "Capstone defense",
    },
  ],
  assessment: [
    {
      label: "Foundation",
      title: "Concept fluency",
      description: "Accurate use of core ideas, mechanisms and business vocabulary.",
    },
    {
      label: "Application",
      title: "Case analysis",
      description: "Situation-specific diagnosis supported by evidence.",
    },
    {
      label: "Creation",
      title: "Experiments",
      description: "Testable assumptions, stakeholder learning and iteration.",
    },
    {
      label: "Integration",
      title: "Capstone judgment",
      description: "Coherent choices, implementation logic and responsible trade-offs.",
    },
  ],
  references,
  siblingHref: "/teaching/1-year-mba",
  siblingLabel: "1-Year MBA journey",
};
