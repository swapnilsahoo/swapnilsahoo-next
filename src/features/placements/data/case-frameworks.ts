export interface CaseFrameworkBranch {
  label: string;
  formula?: string;
  note?: string;
}

export interface CaseFramework {
  id: string;
  number: string;
  name: string;
  openingQuestion: string;
  whenToUse: string;
  tree: {
    root: string;
    rootFormula?: string;
    branches: readonly CaseFrameworkBranch[];
  } | null;
  guidingQuestions: readonly string[];
  miniExample: string;
  commonMistakes: readonly string[];
}

export const caseFrameworks: readonly CaseFramework[] = [
  {
    id: "profitability",
    number: "1",
    name: "Profitability",
    openingQuestion: "What changed in revenue, cost or mix — and why now?",
    whenToUse:
      "Profit fell or rose unexpectedly and management wants the cause identified before anyone proposes a fix.",
    tree: {
      root: "Profit",
      rootFormula: "= Revenue − Cost",
      branches: [
        {
          label: "Revenue",
          formula: "Price × Volume",
          note: "Break down further by product, channel or customer segment before concluding anything.",
        },
        {
          label: "Cost",
          formula: "Fixed + Variable",
          note: "Segment by cost driver — labour, materials, logistics — not just by accounting line item.",
        },
      ],
    },
    guidingQuestions: [
      "Over what exact period did profit change, and against which baseline — last month, last year, or budget?",
      "Separate price, volume, mix and cost effects individually before you hypothesise a single cause.",
      "Is the movement one-off (a lost contract, a bad quarter) or structural (a shifting cost curve, a permanent demand change)?",
    ],
    miniExample:
      "A five-city gym chain's monthly profit fell 18% even though membership grew 6%. Splitting the numbers shows average revenue per member fell 12% (a discount campaign dragged on too long) while per-member cost rose 4% (new locations added fixed rent before reaching break-even utilisation). The real story is a mix and cost problem hiding behind a healthy top-line growth number — not a demand problem at all.",
    commonMistakes: [
      "Jumping straight to cost-cutting before confirming whether the driver is revenue, cost or mix.",
      "Reporting 'sales fell' as a single fact when it is actually a mix of price and volume moving in different directions.",
      "Ignoring mix shift — an average number can hide a move toward lower-margin products or customers.",
    ],
  },
  {
    id: "market-entry",
    number: "2",
    name: "Market entry",
    openingQuestion: "Is the market attractive, accessible and winnable?",
    whenToUse:
      "A client is deciding whether to enter a new geography, segment or product category.",
    tree: {
      root: "Should we enter?",
      branches: [
        {
          label: "Attractive",
          note: "Size, growth rate and structural profitability of the target market.",
        },
        {
          label: "Accessible",
          note: "Regulatory, capital, channel and capability barriers to actually getting in.",
        },
        {
          label: "Winnable",
          note: "Can we build a defensible position once competitors see us coming?",
        },
      ],
    },
    guidingQuestions: [
      "What does 'the market' mean precisely — geography, customer segment, price tier, use case?",
      "What is our right to win here — an existing asset, capability or relationship competitors lack?",
      "How will the strongest incumbent respond, and does our plan survive that response?",
    ],
    miniExample:
      "A domestic snacks brand is deciding whether to enter the premium, imported-ingredient segment. The segment is attractive (25% growth, healthy margins) and accessible (no regulatory barrier, modest capital). The open question is winnable: two well-funded competitors already own premium shelf space and brand trust. The honest recommendation is to enter through a narrower niche — a single city, a single channel — rather than a national launch competing head-on.",
    commonMistakes: [
      "Treating 'the market is big and growing' as sufficient justification on its own.",
      "Skipping the competitive-response question entirely.",
      "Recommending entry without naming what specifically would make the company win, not just survive.",
    ],
  },
  {
    id: "growth",
    number: "3",
    name: "Growth",
    openingQuestion: "Where can value expand — and what must be true?",
    whenToUse:
      "A client has a healthy core business and wants to find and prioritise its next source of growth.",
    tree: {
      root: "Where can we grow?",
      branches: [
        { label: "Same customers, same product", note: "Penetration: sell more to who you already serve." },
        { label: "New customers, same product", note: "Market development: new geography or segment." },
        { label: "Same customers, new product", note: "Product development: expand what you sell them." },
        { label: "New customers, new product", note: "Diversification: the riskiest, least-connected move." },
      ],
    },
    guidingQuestions: [
      "Which growth path uses capabilities the company already has, and which requires building new ones?",
      "What is the realistic size of each opportunity, not just its strategic appeal?",
      "What would have to be true about customers, competitors or costs for this path to work?",
    ],
    miniExample:
      "A regional coffee chain with strong same-store growth is choosing between opening in a new city (new customers, same product) and adding a packaged-retail line to existing stores (same customers, new product). The retail line uses an existing customer relationship and needs less capital; new-city expansion needs real-estate and hiring capability the company hasn't built yet. Sequence matters as much as the choice itself.",
    commonMistakes: [
      "Listing every possible growth idea instead of prioritising two or three with an explicit reason.",
      "Ignoring which capabilities the company would need to build versus already has.",
      "Confusing a strategically exciting option with a large one.",
    ],
  },
  {
    id: "pricing",
    number: "4",
    name: "Pricing",
    openingQuestion:
      "What value does the offer create, what will customers pay, and how might competitors respond?",
    whenToUse: "A client is setting or resetting price for a product, service or new offer.",
    tree: {
      root: "Right price",
      branches: [
        { label: "Value created", note: "What does the offer solve, save or enable for the customer?" },
        { label: "Willingness to pay", note: "Segment-specific — rarely one number for the whole market." },
        { label: "Competitive response", note: "Will rivals match, undercut, or leave the price alone?" },
      ],
    },
    guidingQuestions: [
      "Is the current price anchored to cost, to competitors, or to customer value — and should it be?",
      "Which customer segments would pay meaningfully more, and which would leave at a small increase?",
      "What is the realistic first move of the strongest competitor, and how would we respond?",
    ],
    miniExample:
      "A B2B software tool has one flat price for all customers. Usage data shows one segment gets far more value (measurable time saved) than another. A tiered price aligned to value, not to feature count, could raise revenue from the high-value segment without losing the price-sensitive one — but only if the tiers are easy to understand and don't feel punitive.",
    commonMistakes: [
      "Setting price as cost-plus-margin without checking what value the customer actually receives.",
      "Assuming one price should fit every segment.",
      "Ignoring how competitors are likely to react to the change.",
    ],
  },
  {
    id: "ma-pe",
    number: "5",
    name: "M&A / PE",
    openingQuestion: "Will the asset create value, and can the deal be completed and integrated?",
    whenToUse:
      "A client or fund is evaluating whether to acquire, invest in, or merge with another business.",
    tree: {
      root: "Pursue the deal?",
      branches: [
        { label: "Strategic fit", note: "Does the target fill a genuine gap — capability, geography, customer access?" },
        { label: "Value creation", note: "Synergies, growth or cost that would not exist without the deal." },
        { label: "Executable", note: "Price, financing, regulatory approval and integration risk." },
      ],
    },
    guidingQuestions: [
      "What specifically would this target let us do that we cannot do organically, and by when?",
      "Which synergies are conservative and provable, and which are optimistic assumptions doing the heavy lifting?",
      "What is the biggest integration risk, and who owns it on day one?",
    ],
    miniExample:
      "A national logistics company is considering acquiring a smaller regional player with strong last-mile density in one region. The strategic fit is real (fills a genuine coverage gap), but the diligence question is whether the target's driver-retention and route-density numbers survive integration into a larger, more standardised operating model — synergies on paper often shrink once two operating cultures actually merge.",
    commonMistakes: [
      "Treating 'synergies' as a number that appears without naming the specific source and owner.",
      "Underweighting integration risk relative to strategic-fit enthusiasm.",
      "Ignoring price discipline — a good target at the wrong price is still a bad deal.",
    ],
  },
  {
    id: "abstract",
    number: "6",
    name: "Abstract",
    openingQuestion: "Can you create structure when no familiar template fits?",
    whenToUse:
      "The prompt does not resemble a standard case family — a judgment or design question rather than a business metric.",
    tree: null,
    guidingQuestions: [
      "What decision is actually being asked for, and who has to make it?",
      "What are the two or three genuinely different dimensions of this problem — not a long unsorted list?",
      "What would change your recommendation, and how would you find that out?",
    ],
    miniExample:
      "\"How would you decide whether a factory should add a rooftop solar programme?\" There is no standard framework here. A clear candidate builds one on the spot: economics (payback period versus the cost of capital), operational fit (does the roof and load profile even support it), and strategic signal (does it matter to customers, regulators or employees). The structure is invented for this question — that invention is exactly what is being tested.",
    commonMistakes: [
      "Forcing a memorised framework onto a question it does not fit.",
      "Producing a long, unsorted list of considerations instead of two or three genuinely distinct buckets.",
      "Never stating a recommendation because the question 'doesn't have a clean framework.'",
    ],
  },
] as const;
