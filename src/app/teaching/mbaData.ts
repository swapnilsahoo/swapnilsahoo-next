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
    author: "Porter, M. E.",
    year: "2008",
    title: "The Five Competitive Forces That Shape Strategy",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/2008/01/the-five-competitive-forces-that-shape-strategy",
  },
  {
    id: 4,
    author: "Mintzberg, H.",
    year: "1987",
    title: "Crafting Strategy",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/1987/07/crafting-strategy",
  },
  {
    id: 5,
    author: "Collis, D. J., & Montgomery, C. A.",
    year: "1995",
    title: "Competing on Resources",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/1995/07/competing-on-resources-strategy-in-the-1990s",
  },
  {
    id: 6,
    author: "Mankins, M. C., & Steele, R.",
    year: "2005",
    title: "Turning Great Strategy into Great Performance",
    publisher: "Harvard Business Review",
    href: "https://hbr.org/2005/07/turning-great-strategy-into-great-performance",
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
    author: "Rothaermel, F. T.",
    year: "2024",
    title: "Strategic Management, 6th edition",
    publisher: "McGraw Hill",
    href: "https://www.mheducation.com/highered/product/strategic-management-rothaermel.html",
  },
];

export const oneYearMba: ProgrammeConfig = {
  eyebrow: "PGPM · Strategic Management I · 2 credits",
  title: "Thirteen sessions.",
  accent: "One integrated strategy.",
  description:
    "An accelerated, discussion-intensive journey for experienced professionals—moving from business strategy to corporate scope through tightly sequenced cases, reflection and original field evidence.",
  audience: "PGPM · experienced cohort",
  pace: "13 × 90-minute sessions",
  outcome: "Formulate, defend, reflect",
  promise: "A compressed journey through the whole firm.",
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
        "Each concept travels from case discussion to handwritten reflection and a live founder conversation.",
      citations: [2, 7],
    },
  ],
  modules: [
    {
      index: "01",
      title: "Strategy, purpose and industry",
      question: "What is strategy—and what shapes the arena?",
      description:
        "Sessions 1–4 move from purpose, values and value gaps to industry structure, ecosystems, business models, game theory and competitor response.",
      methods: ["Tesla case", "Five Forces", "Competitor analysis"],
      citations: [1, 3, 4],
    },
    {
      index: "02",
      title: "Resources and advantage",
      question: "Why should this firm win—and for how long?",
      description:
        "Sessions 5–8 connect internal analysis, value chains and the resource-based view to creating, sustaining and positioning competitive advantage.",
      methods: ["Patagonia case", "Value chain", "Cost vs differentiation"],
      citations: [1, 5],
    },
    {
      index: "03",
      title: "Technology and corporate scope",
      question: "How do innovation and firm boundaries create value?",
      description:
        "Sessions 9–10 examine technology and innovation before crossing from business strategy into portfolios, synergy, core competence and transaction costs.",
      methods: ["NVIDIA case", "Innovation lens", "Corporate advantage"],
      citations: [1, 8],
    },
    {
      index: "04",
      title: "Integration, global strategy and diversification",
      question: "What belongs inside the firm—and across which markets?",
      description:
        "Sessions 11–13 use Amazon to test vertical integration, multinational choices and the logic—and limits—of diversification.",
      methods: ["Amazon case", "Better-off test", "Global-local tension"],
      citations: [1, 6],
    },
  ],
  studioTitle: "From case room to founder conversation.",
  studioDescription:
    "The formal teaching plan combines prepared case discussion, session quizzes, handwritten reflection and original primary-data fieldwork.",
  studios: [
    {
      title: "Prepared case room",
      description: "Analyze environments, identify strategic options and make a recommendation.",
      evidence: "Optional one-page write-up",
    },
    {
      title: "Eight-minute retrieval",
      description:
        "Close each class by retrieving and applying the session’s central ideas by hand.",
      evidence: "Practice quiz",
    },
    {
      title: "Founder field analysis",
      description:
        "Gather primary evidence through a live interview; desk-research-only work does not qualify.",
      evidence: "Transcript + strategic report",
    },
    {
      title: "Handwritten reflection",
      description:
        "Integrate concepts, experience and changes in judgment after sessions 7 and 13.",
      evidence: "Two reflection papers",
    },
  ],
  assessment: [
    {
      label: "25 marks",
      title: "Class quizzes",
      description: "Subjective and objective embedded questions.",
    },
    {
      label: "10 marks",
      title: "Reflection papers",
      description: "Two handwritten integrations of concepts and experience.",
    },
    {
      label: "15 + 30 marks",
      title: "Midterm and end term",
      description: "Conceptual grounding, analysis and decision-making.",
    },
    {
      label: "20 marks",
      title: "Startup field analysis",
      description: "Primary interview, strategic analysis and recommendations.",
    },
  ],
  references,
  siblingHref: "/teaching/2-year-mba",
  siblingLabel: "2-Year MBA journey",
};

export const twoYearMba: ProgrammeConfig = {
  eyebrow: "PGDM · Strategic Management · 3 credits",
  title: "Twenty sessions.",
  accent: "Strategy in full.",
  description:
    "A cumulative strategy journey from purpose and industry structure to corporate parenting, execution and internationalization—anchored in cases, assessment and a primary-research company project.",
  audience: "PGDM · multidisciplinary cohort",
  pace: "20 × 90-minute sessions",
  outcome: "Analyze, recommend, execute",
  promise: "From business advantage to global execution.",
  principles: [
    {
      title: "Scaffold, then remove",
      description:
        "Frameworks provide an entry point; repeated application develops the ability to choose, adapt or discard them.",
      citations: [2, 4],
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
        "Direct assessment and feedback make conceptual and analytical development visible.",
      citations: [7],
    },
  ],
  modules: [
    {
      index: "01",
      title: "Purpose, value and industry structure",
      question: "What is strategy—and what determines the playing field?",
      description:
        "Sessions 1–4 build the analytical spine: purpose and value, Five Forces, ecosystems, business models, uncertainty and competitor response.",
      methods: ["Tesla case", "Five Forces", "Game theory"],
      citations: [1, 3, 4],
    },
    {
      index: "02",
      title: "Resources and sustainable advantage",
      question: "What can the firm do distinctively—and can rivals copy it?",
      description:
        "Sessions 5–7 move inside the firm through SWOT, value chains and resources to the creation and endurance of advantage.",
      methods: ["Patagonia case", "Resource audit", "Commitments"],
      citations: [5],
    },
    {
      index: "03",
      title: "Positioning, technology and innovation",
      question: "How will the firm compete—and redraw the value curve?",
      description:
        "Sessions 8–9 connect cost leadership, differentiation and focus with platforms, technology application and innovation-led strategy.",
      methods: ["NVIDIA case", "Generic strategies", "Blue Ocean"],
      citations: [1, 8],
    },
    {
      index: "04",
      title: "Corporate scope and boundaries",
      question: "Where should the firm participate—and how should it own?",
      description:
        "Sessions 10–11 introduce portfolio logic, synergy, core competence, transaction costs and vertical integration.",
      methods: ["Amazon case", "Portfolio logic", "Vertical integration"],
      citations: [1],
    },
    {
      index: "05",
      title: "Global strategy and corporate parenting",
      question: "How can a multi-business firm add value across borders?",
      description:
        "Sessions 12–14 examine global integration versus national differentiation, diversification and parenting advantage through the Tata Group.",
      methods: ["Tata Group case", "Global-local choices", "Parenting advantage"],
      citations: [1],
    },
    {
      index: "06",
      title: "Execution, acquisitions and alliances",
      question: "Which implementation mode fits the strategic intent?",
      description:
        "Sessions 15–17 move from portfolio governance to the motives, evidence and integration choices behind M&A, joint ventures and alliances.",
      methods: ["Amazon case", "M&A logic", "Ally-or-acquire"],
      citations: [6],
    },
    {
      index: "07",
      title: "Internationalization and strategic change",
      question: "How do emerging multinationals adapt as industries evolve?",
      description:
        "Sessions 18–19 address national advantage, globalization, emerging giants and the special challenges of international growth.",
      methods: ["Rajesh Exports case", "National advantage", "Emerging giants"],
      citations: [1],
    },
    {
      index: "08",
      title: "The future of management",
      question: "How must organizations and managerial work be redesigned?",
      description:
        "Session 20 synthesizes current trends, organizational redesign and the changing role of managers into a forward-looking strategic agenda.",
      methods: ["Trend synthesis", "Organization redesign", "Future-of-work debate"],
      citations: [4, 6],
    },
  ],
  studioTitle: "Primary evidence, not desk research.",
  studioDescription:
    "The signature field project requires teams to interview a founder, CXO or senior employee live, build an original strategic analysis and send practical recommendations back to the organization.",
  studios: [
    {
      title: "Case sequence",
      description:
        "Tesla, Patagonia, NVIDIA, Amazon, Tata Group and Rajesh Exports anchor the arc.",
      evidence: "Prepared discussion",
    },
    {
      title: "Founder interview",
      description: "Capture struggles, pivots, resource choices, competition and current dilemmas.",
      evidence: "Recording or transcript",
    },
    {
      title: "Strategic analysis",
      description:
        "Apply course frameworks to original primary evidence rather than a copied profile.",
      evidence: "5–7 page report",
    },
    {
      title: "Recommendation loop",
      description:
        "Send recommendations to the organization and request relevance and feasibility feedback.",
      evidence: "Founder/CXO response",
    },
  ],
  assessment: [
    {
      label: "20 marks",
      title: "Class quizzes",
      description: "Descriptive and objective checks across the course.",
    },
    {
      label: "5 marks",
      title: "Reflection paper",
      description: "Handwritten integration of strategy concepts and experience.",
    },
    {
      label: "15 + 35 marks",
      title: "Midterm and end term",
      description: "Embedded questions testing concepts and critical judgment.",
    },
    {
      label: "25 marks",
      title: "Company field analysis",
      description: "Primary evidence, recommendations, presentation and individual reflection.",
    },
  ],
  references,
  siblingHref: "/teaching/1-year-mba",
  siblingLabel: "1-Year MBA journey",
};
