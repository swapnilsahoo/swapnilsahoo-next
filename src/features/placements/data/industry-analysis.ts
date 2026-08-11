export type SixQModule = {
  id: string;
  number: string;
  question: string;
  lens: string;
  decisionOutput: string;
  coreQuestions: readonly string[];
  whatToDo: readonly string[];
  requiredExhibits: readonly string[];
  worldClassExample: string;
  researchFoundation?: string;
};

export const sixQFramework: readonly SixQModule[] = [
  {
    id: "what",
    number: "1",
    question: "WHAT?",
    lens: "Arena & growth",
    decisionOutput: "What is the market, and where is the growth actually coming from?",
    coreQuestions: [
      "What products or services form the industry, and what customer problem do they solve?",
      "How large is the market today, in both value and volume?",
      "How has it grown historically, and what is driving the forecast?",
      "Is the industry emerging, growing, consolidating, mature, renewing or declining?",
    ],
    whatToDo: [
      "Define product/service scope, geography, customer set, value-chain stage, time horizon and explicit exclusions — a narrow definition can hide substitutes, an overly broad one can make the analysis meaningless.",
      "Build a segmentation tree, but only on dimensions that actually change economics or strategy.",
      "Estimate market size through at least two independent routes — top-down, bottom-up or supply-side — and reconcile them rather than averaging blindly.",
      "Calculate CAGR = (Ending value / Beginning value)^(1/n) − 1, and separate growth into volume, price/mix, penetration and new-segment contributions.",
      "Judge lifecycle stage from several signals together — penetration, growth, consolidation, innovation rate and returns — never from growth rate alone.",
    ],
    requiredExhibits: [
      "Industry boundary map",
      "Market architecture / segmentation tree",
      "Five-year historical size and growth chart",
      "Five-year forecast with assumptions and a confidence range",
      "Growth bridge: volume, price/mix, penetration, new segments",
      "Lifecycle judgement with supporting evidence",
    ],
    worldClassExample:
      "For a streaming business, the competitive arena should not be defined only as “other streaming platforms.” Time spent on gaming, social video and other entertainment may be genuine substitutes — the boundary should follow the customer problem and the economic substitution logic, not a convenient product label.",
  },
  {
    id: "who",
    number: "2",
    question: "WHO?",
    lens: "Customers & demand",
    decisionOutput: "Who buys, why, and what actually changes demand?",
    coreQuestions: [
      "Who are the economically distinct customer groups — and does the segmentation change strategy, or only the label?",
      "What job is the customer trying to get done, and what pain points or switching barriers stand in the way?",
      "Who initiates, influences, approves, pays and uses, especially in B2B buying centres?",
      "Which demand drivers are structural, cyclical or merely temporary?",
    ],
    whatToDo: [
      "Create three to six customer segments, each with distinct needs, decision criteria, price sensitivity, channel and switching cost — segmentation that produces labels but no different behaviour is not useful.",
      "Map the buying journey from trigger through search, evaluation, purchase, use, repeat and exit.",
      "Build a mathematical demand-driver tree rather than a list of vague “drivers” — for example: total category demand × awareness × consideration × eligibility × conversion × retention.",
      "Identify leakage points in the adoption funnel: awareness, availability, affordability, trust, conversion, repeat.",
      "Where relevant, estimate price elasticity of demand from observed data or credible research — never invent an elasticity because it “sounds reasonable.”",
    ],
    requiredExhibits: [
      "Customer segmentation matrix",
      "Customer journey / buying-centre map",
      "Jobs-needs-pain-points table",
      "Demand-driver tree",
      "Adoption funnel with leakage points",
      "Willingness-to-pay or price-sensitivity evidence",
    ],
    worldClassExample:
      "Low-cost airlines do not simply target “air travellers.” Their economics depend on customers who value low fares enough to accept trade-offs in schedule, airport, seat flexibility and add-on pricing — the segmentation is useful because it links a need directly to a distinct operating model.",
  },
  {
    id: "how",
    number: "3",
    question: "HOW?",
    lens: "Industry economics",
    decisionOutput: "Where is value created, captured and destroyed?",
    coreQuestions: [
      "What are the major stages from input to end customer, and who pays whom, for what, and when?",
      "Where are the revenue pools — and, separately, where are the profit pools?",
      "What are the largest fixed and variable costs, and how is pricing actually set?",
      "Which KPIs are native to this specific industry, and why do they matter here?",
    ],
    whatToDo: [
      "Draw the value chain from upstream inputs to end customer, service and end-of-life — then add the ecosystem where interdependence matters: regulators, platforms, financiers, complementors and infrastructure.",
      "Estimate revenue by value-chain stage, then separately estimate profit or margin by stage — revenue is not profit, and the largest revenue pool is rarely the best profit pool.",
      "Compare business models: transactional, subscription, usage, licensing, advertising, marketplace commission, financing, service or hybrid — and identify which revenue streams recur versus which are one-off.",
      "Build the cost structure: fixed, variable, semi-variable and step-fixed costs, and identify what creates operating leverage.",
      "Select five to eight KPIs native to the industry — airlines track load factor and yield; SaaS tracks recurring revenue and churn; retail tracks same-store sales and inventory turns; manufacturing tracks utilisation, yield and working capital.",
    ],
    requiredExhibits: [
      "Value-chain map",
      "Ecosystem dependency map",
      "Revenue-pool and profit-pool map",
      "Business-model comparison",
      "Cost-driver waterfall and pricing architecture",
      "Unit-economics dashboard; capital-intensity and return profile",
    ],
    worldClassExample:
      "Electric vehicles require more than vehicle manufacturing: cells, battery packs, power electronics, charging, software, dealers and service, financing, electricity infrastructure and recycling are all interdependent. Analysing only the vehicle manufacturer can miss the binding constraint on the whole system.",
    researchFoundation:
      "Gadiesh and Gilbert (1998) define an industry profit pool as the total profit earned across the value chain; their classic U-Haul example shows why an apparently unattractive core activity can be linked to far more attractive adjacent profits. Adner (2017) frames ecosystem analysis as necessary wherever several actors must align for a value proposition to work at all.",
  },
  {
    id: "who-wins",
    number: "4",
    question: "WHO WINS?",
    lens: "Competition",
    decisionOutput: "Who has advantage, and why is it durable?",
    coreQuestions: [
      "Who are the major players, and — more revealing than any single year's share — how is their share trending?",
      "Which competitors are pursuing similar positions with similar economics, forming genuine strategic groups?",
      "How intense is rivalry, and is that intensity strengthening or weakening?",
      "What capabilities are merely table stakes, and which ones are genuine, durable differentiators?",
    ],
    whatToDo: [
      "Compare competitors on a common set of strategic variables — scale, positioning, economics, go-to-market, capabilities, strategic intent — rather than a stack of disconnected SWOT tables.",
      "Plot market-share trends over several periods, not a single year: gaining or losing share usually reveals more than absolute rank.",
      "Map strategic groups using two dimensions that genuinely separate strategies, then apply Porter's Five Forces — score each force and, more importantly, state whether it is strengthening, stable or weakening.",
      "Separate table-stakes capabilities every viable competitor must have from differentiators that materially change willingness to pay, cost, speed or risk, and from a potential moat that is difficult to imitate or substitute.",
      "Compare industry attractiveness with strategic fit separately — an attractive industry is not automatically the right choice for a firm that lacks the required capabilities.",
    ],
    requiredExhibits: [
      "Competitor benchmark table and market-share trend",
      "Strategic-group map",
      "Five Forces heat map with direction of change",
      "Entry-barrier stack",
      "Capability / advantage matrix",
      "Attractiveness versus strategic-fit matrix",
    ],
    worldClassExample:
      "In a fast-changing mobility market, traditional manufacturers and digital-native entrants may compete in the same product category but belong to different strategic groups, because their capabilities, channel economics, software intensity and capital structures differ in ways that matter more than the shared category label.",
    researchFoundation:
      "Porter (2008) argues the five forces shape how economic value is divided among competitors, buyers, suppliers, entrants and substitutes. Barney (1991) and Teece (2007) provide the foundations for evaluating whether a firm's resources and capabilities — including its capacity to adapt — can sustain advantage as conditions change.",
  },
  {
    id: "what-changes",
    number: "5",
    question: "WHAT CHANGES?",
    lens: "External forces & disruption",
    decisionOutput: "What can change the rules — and through what mechanism?",
    coreQuestions: [
      "Which PESTEL forces actually connect to a business variable, rather than sitting as an unconnected list?",
      "Which technologies could alter performance or cost curves — and on what horizon?",
      "How could artificial intelligence change specific tasks, decisions or interfaces, and who would capture the resulting value?",
      "What regulatory, supply-chain, geopolitical or ESG exposures could change the industry's economics fastest?",
    ],
    whatToDo: [
      "List external forces only after completing WHAT, WHO, HOW and WHO WINS — this prevents a generic, disconnected PESTEL list.",
      "For each force, write the full causal chain: event or trend → business variable affected → economic effect → likely winners and losers → timing.",
      "Prioritise by impact, probability and timing; focus the report on the top five to eight forces, not an exhaustive list.",
      "Analyse technology by performance improvement, cost trajectory, adoption barriers, complement readiness and business-model consequence — separating what improves the current value chain from what could make a stage obsolete.",
      "Analyse AI by task and economics: which decisions or workflows change, what data is required, what cost is removed, what new risk is created, and whether value shifts to model providers, data owners, distributors or integrators.",
    ],
    requiredExhibits: [
      "PESTEL impact-priority matrix",
      "Technology / AI disruption radar (horizon 1, 2, 3)",
      "Regulatory and supply-chain risk timeline",
      "ESG materiality / stakeholder map",
      "Disruptor watchlist",
      "Change-force dashboard: probability × impact × timing",
    ],
    worldClassExample:
      "“AI may disrupt the industry” is not analysis. The rigorous version names the mechanism: generative AI automates a specific workflow → lowers service cost per customer → changes minimum efficient scale → favours firms with proprietary data. A claim without a mechanism is not yet an argument.",
  },
  {
    id: "what-next",
    number: "6",
    question: "WHAT NEXT?",
    lens: "Outlook & strategy",
    decisionOutput: "What should we do, and what would change our mind?",
    coreQuestions: [
      "Which parts of the current trajectory are predetermined, and which uncertainties would genuinely change the industry's economics?",
      "What plausible, internally coherent future states should a decision-maker prepare for — not a single forecast with three adjectives?",
      "Where do growth, profit-pool quality and strategic fit actually intersect?",
      "What early-warning indicators would tell us which future is emerging, and what would falsify the recommendation entirely?",
    ],
    whatToDo: [
      "Separate predetermined trends from two or three genuinely critical uncertainties, then combine them into three to four distinct, internally coherent scenarios — not disguised forecasts.",
      "For each scenario, estimate demand, margins, competitive structure and profit pools, and name who is advantaged and who is vulnerable.",
      "Screen opportunities on attractiveness (growth, profit-pool quality, structure, durability) and strategic fit (capabilities, brand, channel, capital, right to win) as two separate scores — never combine them prematurely.",
      "Identify observable early-warning signposts for each scenario, and build a monitoring dashboard around them.",
      "Red-team the conclusion: assign someone to argue the thesis is wrong, and state the two or three assumptions the recommendation actually depends on.",
    ],
    requiredExhibits: [
      "Three-to-four scenario matrix with signposts",
      "Opportunity heat map",
      "Risk register / thesis-breaker dashboard",
      "Winner/loser capability map",
      "Industry attractiveness × strategic-fit matrix",
      "Where-to-play / how-to-win choices with no-regret and contingent moves",
    ],
    worldClassExample:
      "Shell's long-standing scenario-planning practice illustrates the distinction between prediction and preparedness: scenarios exist to explore plausible futures, test assumptions and identify strategic implications — not to claim certainty about a single forecast.",
    researchFoundation:
      "Schoemaker (1995) recommends building scenarios around major trends and critical uncertainties rather than optimistic/base/pessimistic variants of one forecast. Lafley and Martin (2013) popularised the linked questions of where to play and how to win; Rumelt (2011) emphasises diagnosis, a guiding policy and coherent action as the three parts of good strategy.",
  },
] as const;

export const evidenceTiers = [
  {
    tier: "Tier 1 — Primary / authoritative",
    use: "Government and regulator data, audited annual reports, stock-exchange filings, official industry associations, official company disclosures, patents and standards.",
  },
  {
    tier: "Tier 2 — High-quality secondary",
    use: "Peer-reviewed research, major multilateral institutions, established market research, reputable financial databases, recognised business press.",
  },
  {
    tier: "Tier 3 — Directional",
    use: "Expert interviews, channel checks, job postings, app reviews, distributor websites, conference presentations, search trends.",
  },
  {
    tier: "Tier 4 — Weak / unverified",
    use: "Anonymous blogs, uncited social posts, promotional claims, AI-generated summaries without source verification.",
  },
] as const;

export const confidenceTags = [
  { tag: "A — High", meaning: "Audited or official primary source; the metric's definition is clear and stated." },
  { tag: "B — Medium", meaning: "Credible secondary source, or a triangulated estimate from more than one method." },
  { tag: "C — Low", meaning: "Assumption, interview estimate or incomplete source; requires sensitivity testing." },
] as const;

export const evidenceRule =
  "For every material number, seek at least two independent sources or a top-down and bottom-up calculation. Where sources disagree, explain the definition or period difference — Calendar Year versus Financial Year, shipments versus registrations, GMV versus revenue — instead of averaging blindly.";

export const claimEvidenceRule = {
  weak: "“AI will disrupt the industry.”",
  strong:
    "“Generative AI is reducing content-production time (evidence); this lowers one cost barrier for new entrants (mechanism); therefore rivalry and differentiation may shift toward distribution and proprietary data (implication).”",
};

export const eightWeekSprint = [
  {
    week: "Week 1",
    focus: "Frame",
    activities: "Decision question, boundary, issue tree, hypothesis, source plan",
    deliverable: "1-page charter + initial hypotheses",
  },
  {
    week: "Week 2",
    focus: "WHAT",
    activities: "Market architecture, size, growth, lifecycle, forecast logic",
    deliverable: "Market model + growth exhibits",
  },
  {
    week: "Week 3",
    focus: "WHO",
    activities: "Segmentation, interviews, demand drivers, buying journey",
    deliverable: "Customer and demand pack",
  },
  {
    week: "Week 4",
    focus: "HOW",
    activities: "Value chain, ecosystem, profit pools, cost/pricing, unit economics",
    deliverable: "Industry economics pack",
  },
  {
    week: "Week 5",
    focus: "WHO WINS",
    activities: "Competitors, strategic groups, Five Forces, capabilities",
    deliverable: "Competitive advantage pack",
  },
  {
    week: "Week 6",
    focus: "WHAT CHANGES",
    activities: "PESTEL, technology, regulation, supply chain, ESG",
    deliverable: "Change-force and disruption pack",
  },
  {
    week: "Week 7",
    focus: "WHAT NEXT",
    activities: "Scenarios, opportunities, risks, attractiveness and fit",
    deliverable: "Strategic options pack",
  },
  {
    week: "Week 8",
    focus: "Synthesis",
    activities: "Recommendation, red team, roadmap, executive story",
    deliverable: "Final report + 10–15 slide board deck",
  },
] as const;

export const rubric = [
  { dimension: "Framing and scope", marks: 8, excellence: "Decision question, boundaries, issue tree, hypotheses." },
  { dimension: "Market and growth", marks: 12, excellence: "Sizing, segmentation, forecast, lifecycle, triangulation." },
  { dimension: "Customer and demand", marks: 12, excellence: "Segments, needs, buying behaviour, driver tree, primary evidence." },
  { dimension: "Industry economics", marks: 15, excellence: "Value chain, profit pools, pricing, costs, unit economics, capital." },
  { dimension: "Competition", marks: 15, excellence: "Shares, strategic groups, Five Forces, barriers, capabilities." },
  { dimension: "External / disruption", marks: 10, excellence: "PESTEL mechanism, regulation, technology, supply chain, ESG." },
  { dimension: "Scenarios and outlook", marks: 10, excellence: "Distinct scenarios, opportunities, risks, signposts." },
  { dimension: "Strategic implications", marks: 10, excellence: "Attractiveness × fit, choices, trade-offs, actions." },
  { dimension: "Evidence and rigour", marks: 5, excellence: "Source hierarchy, definitions, citations, confidence." },
  { dimension: "Communication", marks: 3, excellence: "Executive logic, exhibit quality, clarity, concision." },
] as const;

export const qualityGates = [
  { gate: "Scope", test: "Can a reader state exactly what is included and excluded after thirty seconds?" },
  { gate: "Numbers", test: "Do the top-down and bottom-up market estimates reconcile?" },
  { gate: "Definitions", test: "Are calendar year, financial year, units, currency and metric definitions consistent throughout?" },
  { gate: "Demand", test: "Is there a driver tree — not merely a list of trends?" },
  { gate: "Economics", test: "Does the report identify profit pools, not only revenue pools?" },
  { gate: "Competition", test: "Does it explain advantage and its direction of change, not merely current market shares?" },
  { gate: "External", test: "Does each PESTEL item carry a mechanism, magnitude, timing and implication?" },
  { gate: "Future", test: "Are the scenarios genuinely distinct, and linked to observable signposts?" },
  { gate: "Strategy", test: "Are the recommendations choices with trade-offs, owners, investments and milestones?" },
  { gate: "Evidence", test: "Are all important claims cited and confidence-tagged?" },
  { gate: "Red team", test: "Does the report state what evidence would falsify its own conclusion?" },
] as const;

export const formulaSheet = [
  { measure: "Market size", formula: "Units or transactions × average realised price" },
  { measure: "CAGR", formula: "(Ending value / Beginning value)^(1/n) − 1, where n = number of years" },
  { measure: "Market share", formula: "Firm sales / total industry sales, using matched definitions and periods" },
  { measure: "Gross margin", formula: "(Revenue − direct cost) / revenue" },
  { measure: "EBITDA margin", formula: "EBITDA / revenue" },
  { measure: "EBIT margin", formula: "EBIT / revenue" },
  { measure: "Price elasticity of demand", formula: "% change in quantity demanded / % change in price" },
  { measure: "Capacity utilisation", formula: "Actual output / practical or rated capacity" },
  { measure: "Break-even volume", formula: "Fixed costs / contribution margin per unit" },
  { measure: "CAC", formula: "Customer acquisition spend / new customers acquired" },
  { measure: "LTV / CAC", formula: "Customer lifetime value / customer acquisition cost" },
  { measure: "ROIC", formula: "After-tax operating profit / invested capital — state the exact definition used" },
  { measure: "HHI (optional)", formula: "Sum of squared market shares, using one consistent basis for every firm" },
] as const;

export const workedExample = {
  decisionQuestion:
    "Should a well-capitalised mobility company enter or expand in India's electric two-wheeler (e-2W) industry over 2026–2030, and which positions in the value chain offer the best combination of growth, sustainable economics and strategic fit?",
  sections: [
    {
      q: "WHAT?",
      title: "Arena and growth",
      body: "India remained the world's second-largest electric two-wheeler market in CY2025 (IEA, 2026), while SIAM reported 2.17 crore total domestic two-wheeler sales in FY2025–26 (SIAM, 2026). These two statistics use different periods and cannot be divided directly to infer penetration — the disciplined response is to obtain matched-period numerator and denominator data before drawing any conclusion.",
    },
    {
      q: "WHO?",
      title: "Customers and demand",
      body: "A useful segmentation separates urban commuters, family scooter users, delivery and fleet operators, students and young professionals, premium technology buyers, and semi-urban or rural customers — each with different utilisation, charging access, financing constraints and service expectations. Total-cost-of-ownership economics, not sticker price alone, often explain adoption.",
    },
    {
      q: "HOW?",
      title: "Industry economics",
      body: "A complete economic map spans vehicle assembly, cells and battery packs, power electronics, software, distribution, financing, insurance, charging, service and spares, resale, and recycling — with revenue and operating profit estimated separately for each stage, since the largest revenue pool is rarely the largest profit pool.",
    },
    {
      q: "WHO WINS?",
      title: "Competition",
      body: "A useful strategic-group map separates established manufacturers with large physical distribution and service networks from EV-native challengers with software-led architectures, plus a long tail of smaller players. The live question is not which group is “better” in general, but which capabilities matter most as the industry moves from early adoption toward scale.",
    },
    {
      q: "WHAT CHANGES?",
      title: "Policy, technology and supply chain",
      body: "India's PM E-DRIVE scheme supports roughly 24.79 lakh eligible electric two-wheelers (Ministry of Heavy Industries, 2026). The rigorous question is not “is there a subsidy?” but how the scheme's exact terminal date and vehicle-level eligibility change effective purchase price, adoption and manufacturer economics — alongside cell chemistry, battery-management systems and localisation depth.",
    },
    {
      q: "WHAT NEXT?",
      title: "Three plausible scenarios",
      body: "Scale acceleration (improving economics and financing lift conversion), gradual coexistence (EVs grow in favourable urban use-cases while ICE holds elsewhere), and consolidation shock (price pressure or policy shifts compress weak players) imply different winners and different early-warning signposts — rising matched-period penetration, stable non-urban ICE demand, or dealer and warranty stress, respectively.",
    },
  ],
  recommendation:
    "The industry merits selective participation, not indiscriminate entry. A new entrant should avoid a me-too scooter proposition and enter only with a clear wedge — material cost advantage, a defined customer use case, differentiated technology, proprietary distribution, fleet economics, or a service/finance model that improves customer lifetime economics. An incumbent should treat the vehicle as one element of a system spanning financing, service, software, battery lifecycle and resale. The recommendation stays contingent on matched-period penetration trends, acquisition economics, warranty costs, policy eligibility and service-network productivity — which become the monitoring dashboard.",
} as const;

export const finalTest =
  "If the executive team can remove your PESTEL, Five Forces and SWOT pages and your recommendation remains unchanged, the frameworks were probably decorative. Every analytical module must alter the diagnosis, the economics, the risk assessment or the strategic choice.";

export const closingPrinciple =
  "A rigorous industry analysis should leave the reader with a sharper decision, not merely more information. The work is finished only when evidence, economics, competitive logic and future uncertainty have been translated into explicit choices and a monitoring plan.";

export const references = [
  "Adner, R. (2017). Ecosystem as structure: An actionable construct for strategy. Journal of Management, 43(1), 39–58.",
  "Barney, J. (1991). Firm resources and sustained competitive advantage. Journal of Management, 17(1), 99–120.",
  "Christensen, C. M. (1997). The innovator's dilemma: When new technologies cause great firms to fail. Harvard Business School Press.",
  "Gadiesh, O., & Gilbert, J. L. (1998). Profit pools: A fresh look at strategy. Harvard Business Review, 76(3), 139–147.",
  "Lafley, A. G., & Martin, R. L. (2013). Playing to win: How strategy really works. Harvard Business Review Press.",
  "Minto, B. (2009). The pyramid principle: Logic in writing and thinking (3rd ed.). Pearson.",
  "Porter, M. E. (1980). Competitive strategy: Techniques for analyzing industries and competitors. Free Press.",
  "Porter, M. E. (2008). The five competitive forces that shape strategy. Harvard Business Review, 86(1), 78–93.",
  "Rumelt, R. P. (2011). Good strategy/bad strategy: The difference and why it matters. Crown Business.",
  "Schoemaker, P. J. H. (1995). Scenario planning: A tool for strategic thinking. Sloan Management Review, 36(2), 25–40.",
  "Teece, D. J. (2007). Explicating dynamic capabilities: The nature and microfoundations of (sustainable) enterprise performance. Strategic Management Journal, 28(13), 1319–1350.",
] as const;
