export const coursePhases = [
  {
    number: "01",
    sessions: "01—04",
    title: "Read the arena",
    question: "What is strategy—and what shapes the competitive system?",
    cases: "Tesla",
    focus: ["Purpose & value", "Industry structure", "Ecosystems & uncertainty"],
  },
  {
    number: "02",
    sessions: "05—09",
    title: "Build advantage",
    question: "What can the firm do distinctively—and can rivals catch it?",
    cases: "Patagonia · NVIDIA",
    focus: ["Resources & value chains", "Positioning", "Technology & innovation"],
  },
  {
    number: "03",
    sessions: "10—14",
    title: "Design the corporation",
    question: "Where should the firm participate—and how should it create shared value?",
    cases: "Amazon · Tata Group",
    focus: ["Corporate scope", "Integration", "Diversification & parenting"],
  },
  {
    number: "04",
    sessions: "15—17",
    title: "Choose the execution mode",
    question: "How should strategy move from intent to coordinated action?",
    cases: "Amazon 2025",
    focus: ["Portfolio governance", "M&A", "Joint ventures & alliances"],
  },
  {
    number: "05",
    sessions: "18—20",
    title: "Compete through change",
    question: "How do firms internationalize, evolve and redesign managerial work?",
    cases: "Rajesh Exports",
    focus: ["Globalization", "Industry evolution", "Future of management"],
  },
] as const;

// Interactive session pages: a separate, richer set of standalone HTML pages built earlier
// (public/teaching/2-year-mba/session-*.html) uses its own internal session numbering, which
// only partially agrees with the syllabus below — the two were built as different course passes
// that share a subset of topics. Only sessions with a clear, confident topical match to their
// interactive page get a link; the rest intentionally have none rather than pointing at the
// wrong case study. See docs/gallery-asset-provenance.md-adjacent notes in this file for context.
const interactive = (file: string) => `/teaching/2-year-mba/${file}`;

export const sessions = [
  {
    number: "01",
    title: "Introduction to Strategy",
    topics: ["What is strategy?", "Why do firms need it?", "How is strategy made?"],
    readings: [
      "Case · Tesla (HBR)",
      "Porter, M. E. (1996). What Is Strategy? Harvard Business Review.",
      "Mintzberg, H. (1987). Crafting Strategy. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-01-what-is-strategy.html"),
  },
  {
    number: "02",
    title: "Framework for Strategic Analysis",
    topics: ["Vision–Mission–Strategy / Purpose–Values–Strategy", "Strategy as a quest for value"],
    readings: [
      "Case · Tesla (HBR)",
      "Kaplan, R. S., & Norton, D. P. Developing the Strategy—Vision, Value Gaps, and Analysis.",
      "Operations in an Era of Radical Uncertainty.",
    ],
    interactiveHref: interactive("session-04-purpose-values-strategy-tesla.html"),
  },
  {
    number: "03",
    title: "Industry Analysis: The Fundamentals",
    topics: ["Analysis of the external environment of business", "Porter’s Five (six) Forces"],
    readings: [
      "Case · Tesla (MIT)",
      "Porter, M. E. (2008). The Five Competitive Forces That Shape Strategy. Harvard Business Review.",
      "Porter, M. E. (1983). Note on the Structural Analysis of Industries.",
    ],
    interactiveHref: interactive("session-05-external-analysis-porter-five-forces.html"),
  },
  {
    number: "04",
    title: "Beyond the Five Forces",
    topics: ["Ecosystems and business models", "Game theory and competitor analysis"],
    readings: [
      "Case · Tesla (MIT)",
      "Video · Selected videos on Steve Jobs",
      "Courtney, H., Kirkland, J., & Viguerie, P. Strategy Under Uncertainty.",
    ],
    interactiveHref: undefined,
  },
  {
    number: "05",
    title: "Internal Analysis & Resource-Based View",
    topics: [
      "Internal analysis of the company",
      "SWOT analysis",
      "Value chain analysis",
      "Resource-based view of the firm",
    ],
    readings: [
      "Case · Patagonia (HBR)",
      "Collis, D. J., & Montgomery, C. A. (1995). Competing on Resources. Harvard Business Review.",
      "Porter, M. E. From Competitive Advantage to Corporate Strategy.",
    ],
    interactiveHref: interactive("session-09-internal-analysis.html"),
  },
  {
    number: "06",
    title: "Creating Competitive Advantage",
    topics: [
      "How a firm creates competitive advantage",
      "External sources of competitive advantage",
      "Internal sources of competitive advantage",
    ],
    readings: [
      "Case · Patagonia (HBR)",
      "Ghemawat, P., & Rivkin, J. W. (1998). Creating Competitive Advantage.",
      "Bennett, N., & Lemoine, G. J. What VUCA Really Means for You.",
    ],
    interactiveHref: interactive("session-11-firm-performance-and-business-models.html"),
  },
  {
    number: "07",
    title: "Sustaining Competitive Advantage",
    topics: ["How competitive advantage is sustained", "Deterrence and preemption"],
    readings: [
      "Case · Patagonia (HBR)",
      "Ghemawat, P., & Pisano, G. P. (1997). Sustaining Superior Performance: Commitments and Capabilities.",
    ],
    interactiveHref: interactive("session-10-resources-capabilities-and-core-competencies.html"),
  },
  {
    number: "08",
    title: "Differentiation & Cost Leadership",
    topics: ["Generic strategies", "Low-cost strategy", "Differentiation and focus strategies"],
    readings: ["Case · NVIDIA (HBR)", "Eisenmann et al. (2006). Strategies for Two-Sided Markets."],
    interactiveHref: interactive("session-12-generic-strategies-and-blue-ocean-strategy.html"),
  },
  {
    number: "09",
    title: "Managing Technology & Innovation",
    topics: ["Application of technology", "Innovation-led strategy formulation"],
    readings: [
      "Case · NVIDIA (HBR)",
      "Kim, W. C., & Mauborgne, R. A. (2004). Blue Ocean Strategy. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-13-business-strategy-innovation-entrepreneurship-platforms.html"),
  },
  {
    number: "10",
    title: "Introduction to Corporate Strategy",
    topics: [
      "Portfolio approach, synergy approach and core competencies",
      "Transaction costs and the scope of the firm",
    ],
    readings: [
      "Case · Amazon (HBR)",
      "Porter, M. E. (1987). From Competitive Advantage to Corporate Strategy. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-14-corporate-strategy-vertical-integration-and-diversification.html"),
  },
  {
    number: "11",
    title: "Vertical Integration",
    topics: [
      "Portfolio approach, synergy approach and core competencies",
      "Transaction costs and the scope of the firm",
    ],
    readings: [
      "Case · Amazon (HBR)",
      "Osegowitsch, T., & Madhok, A. (2003). Vertical Integration Is Dead, or Is It? Business Horizons.",
    ],
    interactiveHref: interactive("session-14-corporate-strategy-vertical-integration-and-diversification.html"),
  },
  {
    number: "12",
    title: "Global Strategy & MNC",
    topics: [
      "Competitive advantage in an international context",
      "Global integration versus national differentiation",
    ],
    readings: [
      "Case · Creating Corporate Advantage: The Case of the Tata Group",
      "Goold, M., & Campbell, A. (1993). Why Diversify? Four Decades of Management Thinking.",
    ],
    interactiveHref: interactive("session-16-global-strategy-competing-around-the-world.html"),
  },
  {
    number: "13",
    title: "Diversification Strategies",
    topics: ["Motives for diversification", "Competitive advantage from diversification"],
    readings: [
      "Case · Creating Corporate Advantage: The Case of the Tata Group",
      "Goold, M., & Campbell, A. (1993). Why Diversify? Four Decades of Management Thinking.",
    ],
    interactiveHref: interactive("session-14-corporate-strategy-vertical-integration-and-diversification.html"),
  },
  {
    number: "14",
    title: "Business Groups: Corporate Parenting Advantage",
    topics: ["Managing the multi-business firm", "Managing linkages across businesses"],
    readings: [
      "Case · Creating Corporate Advantage: The Case of the Tata Group",
      "Ramachandran, J., Manikandan, K. S., & Pant, A. (2013). Why Conglomerates Thrive. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-06-group-projects-discussion.html"),
  },
  {
    number: "15",
    title: "Strategy Implementation",
    topics: [
      "Governance of multi-business corporations",
      "Managing the corporate portfolio",
      "Managing individual businesses",
    ],
    readings: [
      "Case · Amazon (HBR, 2025)",
      "Mankins, M. C., & Steele, R. (2005). Turning Great Strategy into Great Performance. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-18-final-group-project-evaluations.html"),
  },
  {
    number: "16",
    title: "Implementation Mode: Mergers & Acquisitions",
    topics: [
      "The pattern of M&A activity",
      "Are mergers successful?",
      "Motives for mergers and acquisitions",
    ],
    readings: [
      "Case · Amazon (HBR, 2025)",
      "Kaplan, S. N. Mergers and Acquisitions: A Financial Economics Perspective. University of Chicago.",
    ],
    interactiveHref: interactive("session-15-corporate-strategy-strategic-alliances-mergers-acquisitions.html"),
  },
  {
    number: "17",
    title: "Implementation Mode: Joint Ventures & Strategic Alliances",
    topics: ["Motives for joint ventures and alliances", "Managing strategic alliances"],
    readings: [
      "Case · Amazon (HBR, 2025)",
      "Dyer, J. H., Kale, P., Singh, H., & Singh, H. (2004). When to Ally and When to Acquire. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-15-corporate-strategy-strategic-alliances-mergers-acquisitions.html"),
  },
  {
    number: "18",
    title: "Internationalization & Globalization Strategy",
    topics: ["Globalization and strategy: foundational concepts"],
    readings: [
      "Case · Rajesh Exports: Gold Trader to International Jewellery Retailer",
      "Porter, M. E. (1990). The Competitive Advantage of Nations. Harvard Business Review.",
    ],
    interactiveHref: interactive("session-19-managing-technology-and-innovation-nvidia.html"),
  },
  {
    number: "19",
    title: "Industry Evolution & Strategic Change",
    topics: ["Emerging multinationals: special challenges"],
    readings: [
      "Case · Rajesh Exports: Gold Trader to International Jewellery Retailer",
      "Khanna, T., & Palepu, K. (2009). Emerging Giants. Harvard Business Review.",
    ],
    interactiveHref: undefined,
  },
  {
    number: "20",
    title: "Current Trends in Strategic Management",
    topics: ["Redesigning organizations", "The changing role of managers"],
    readings: ["The Future of Work. The Economist.", "Hamel, G. The Future of Management."],
    interactiveHref: interactive("session-17-organizational-design-structure-culture-control.html"),
  },
] as const;

export const assessments = [
  {
    title: "Class descriptive & objective quizzes",
    marks: "20",
    instrument: "Embedded questions",
    alignment: "CO1 / PO1 · 10  |  CO2 / PO2 · 10",
  },
  {
    title: "Reflection paper",
    marks: "5",
    instrument: "Rubric",
    alignment: "CO1 / PO1 · 2.5  |  CO2 / PO2 · 2.5",
  },
  {
    title: "Midterm examination",
    marks: "15",
    instrument: "Embedded questions",
    alignment: "CO1 / PO1 · 10  |  CO2 / PO2 · 5",
  },
  {
    title: "End-term examination",
    marks: "35",
    instrument: "Embedded questions",
    alignment: "CO1 / PO1 · 20  |  CO2 / PO2 · 15",
  },
  {
    title: "Field analysis: startup or regular company",
    marks: "25",
    instrument: "Rubric",
    alignment: "CO1 / PO1 · 10  |  CO2 / PO2 · 15",
  },
] as const;

export const deliverables = [
  ["By Session 10", "Reflection Paper 1", "Handwritten submission"],
  ["Before Session 11", "Midterm exam", "Concepts, analysis and decisions"],
  [
    "By Session 16",
    "Field analysis",
    "Recommendations submitted and emailed to the founder or CEO",
  ],
  ["By Session 18", "Reflection Paper 2", "Handwritten submission"],
  ["After Session 20", "End-term exam", "Cumulative strategic judgment"],
] as const;

export const learningObjectives = [
  "Explain the characteristics of a well-conceived strategy and formulate one for competitive advantage.",
  "Manage the parts of a business in strategic harmony.",
  "Assess business risk and make sound decisions from collected and analysed data.",
  "Analyse industry structure and recommend a favourable competitive position.",
  "Diagnose, enhance and sustain a firm’s competitive advantage.",
  "Evaluate corporate strategy and recommend vertical and horizontal changes to firm boundaries.",
  "Evaluate global strategy and recommend ways to improve global performance.",
  "Complete a comprehensive company analysis with problems, solutions and an implementation timeline.",
  "Provide a thoughtful critique of others’ arguments, analyses and evidence.",
  "Communicate arguments coherently and persuasively.",
] as const;

export const programmeOutcomes = [
  ["PO-1", "Conceptual grounding in and application of business theory."],
  ["PO-2", "Analytic and decision-making skills."],
  ["PO-3", "Socio-cultural sensitisation and ethical awareness."],
  ["PO-4a", "Managerial and leadership skills."],
  ["PO-4b", "Team skills."],
  ["PO-5", "Anticipate, strategise and adapt to global market changes."],
  ["PO-6", "Effective oral and written communication and presentation techniques."],
] as const;

export const courseReadings = [
  "Rothaermel, F. T. Strategic Management (latest edition).",
  "Porter, M. E. (1980). Competitive Strategy: Techniques for Analyzing Industries and Competitors.",
  "Rumelt, R. P. (2011). Good Strategy/Bad Strategy.",
  "Collins, J. Good to Great.",
  "Christensen, C. M. The Innovator’s Dilemma.",
  "Collis, D. J., & Rukstad, M. G. (2008). Can You Say What Your Strategy Is?",
  "Campbell, A., Goold, M., & Alexander, M. (1995). Corporate Strategy: The Quest for Parenting Advantage.",
  "Case · Louis Vuitton Moët Hennessy: In Search of Synergies in the Global Luxury Industry.",
  "Deighton, J. How Snapple Got Its Juice Back.",
  "Case · Eli Lilly in India: Rethinking the Joint Venture Strategy.",
  "Case · Microsoft Acquires Activision Blizzard: Beating Sony in Gaming and the Metaverse.",
  "Mergers and Acquisitions: The New Rules of Attraction. The Economist.",
  "Barton, D. (2011). Capitalism for the Long Term.",
  "Case · Creating Corporate Advantage: The Case of the Tata Group.",
  "Burgelman, R. A., & Grove, A. Strategic Dissonance.",
  "Laeven, L., & Levine, R. (2006). Is There a Diversification Discount in Financial Conglomerates?",
  "Case · Amazon Go: Venturing into Traditional Retail.",
  "Porter, M. E. The Competitive Advantage of Nations.",
  "Dewhurst, M., Harris, J., & Heywood, S. Understanding Your Globalization Penalty.",
  "Case · Coca-Cola in 2011: In Search of a New Model.",
  "Buzzell, R. D. Is Vertical Integration Profitable?",
  "Mankins, M. C., & Steele, R. Turning Great Strategy into Great Performance.",
  "Hamel, G. Moon Shots for Management?",
] as const;
