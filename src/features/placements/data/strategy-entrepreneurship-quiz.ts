import type { QuizQuestion } from "@/features/placements/data/product-management-quiz";

export const strategyEntrepreneurshipTopics = [
  "Competitive strategy",
  "Corporate strategy",
  "Startup & unit economics",
  "Business model design",
  "Growth strategy",
] as const;

export const strategyEntrepreneurshipQuestions: readonly QuizQuestion[] = [
  {
    id: "se-1",
    topic: "Competitive strategy",
    question:
      "A firm has the lowest cost structure in its industry but its products are priced the same as competitors. What is it doing with the resulting advantage?",
    options: [
      "Nothing useful — a cost advantage only matters if you cut price.",
      "Capturing higher margin per unit than competitors, which it can reinvest or hold as a buffer.",
      "Automatically becoming the market share leader.",
      "Violating basic strategy principles.",
    ],
    correctIndex: 1,
    explanation:
      "A cost advantage can be monetised either by cutting price to gain share, or by holding price and capturing superior margin — both are legitimate strategic choices. The 'right' one depends on whether the firm's priority is share growth or profitability and reinvestment capacity.",
  },
  {
    id: "se-2",
    topic: "Competitive strategy",
    question: "Which of Porter's Five Forces is most directly affected by high switching costs for customers?",
    options: [
      "Bargaining power of suppliers",
      "Threat of new entrants",
      "Bargaining power of buyers",
      "Threat of substitutes only",
    ],
    correctIndex: 2,
    explanation:
      "High switching costs reduce buyers' bargaining power directly — customers who would face real cost or hassle to switch have less leverage to demand lower prices or better terms, independent of how many alternative suppliers exist.",
  },
  {
    id: "se-3",
    topic: "Corporate strategy",
    question:
      "A conglomerate is deciding whether a new business unit should be run as a wholly owned subsidiary or spun off. What is the central trade-off?",
    options: [
      "There is no trade-off — full ownership is always superior.",
      "Control and integration synergies versus focus, capital-market discipline and management incentive clarity.",
      "Spin-offs are illegal in most jurisdictions.",
      "The choice only affects the company's logo.",
    ],
    correctIndex: 1,
    explanation:
      "Keeping a unit inside the parent preserves potential synergies and control but can dilute management focus and blur performance accountability; spinning it off sharpens focus and lets capital markets value it directly, at the cost of losing integration benefits.",
  },
  {
    id: "se-4",
    topic: "Corporate strategy",
    question: "Under the Capron & Mitchell 'build, borrow or buy' framework, when is 'borrow' (an alliance or licence) typically preferred?",
    options: [
      "When the capability is easily developed in-house and central to the core business.",
      "When speed matters, the capability need may be temporary, and full ownership isn't required to capture the value.",
      "Never — borrowing capabilities is always inferior to buying them outright.",
      "Only when the company has no cash.",
    ],
    correctIndex: 1,
    explanation:
      "'Borrow' fits situations needing moderate speed and flexibility without the cost and irreversibility of an acquisition — useful when the capability need is uncertain, time-bound, or not central enough to justify full ownership.",
  },
  {
    id: "se-5",
    topic: "Startup & unit economics",
    question:
      "A startup's customer acquisition cost (CAC) is ₹500 and average customer lifetime value (LTV) is ₹600. What does this suggest?",
    options: [
      "The business is in excellent health — LTV exceeds CAC.",
      "The margin is thin (LTV:CAC close to 1:1); most investors want a materially higher ratio before calling the model healthy.",
      "CAC and LTV cannot be compared to each other.",
      "The startup should immediately double its marketing spend.",
    ],
    correctIndex: 1,
    explanation:
      "A common rule of thumb looks for an LTV:CAC ratio of roughly 3:1 or better before a model is considered healthy and scalable — a ratio near 1:1 means the company is barely recovering its acquisition cost, with no real margin for overhead, churn risk or reinvestment.",
  },
  {
    id: "se-6",
    topic: "Startup & unit economics",
    question: "What does a startup's 'runway' measure?",
    options: [
      "The length of its physical office space.",
      "How many months it can continue operating at its current burn rate before running out of cash.",
      "The number of customers it has signed.",
      "How fast its app loads.",
    ],
    correctIndex: 1,
    explanation:
      "Runway = current cash ÷ monthly net burn. It tells founders and investors how much time remains to reach the next milestone or fundraising round before the company runs out of money.",
  },
  {
    id: "se-7",
    topic: "Business model design",
    question:
      "In the Business Model Canvas, 'channels' and 'customer relationships' are distinct blocks. What is the key difference?",
    options: [
      "They are the same thing described twice.",
      "Channels describe how the offer reaches and is delivered to the customer; customer relationships describe the type and quality of interaction maintained with them over time.",
      "Channels only apply to physical products.",
      "Customer relationships only matter for B2B businesses.",
    ],
    correctIndex: 1,
    explanation:
      "Channels are about delivery and reach (a website, a retail partner, a sales team); customer relationships are about the ongoing nature of engagement (self-service, dedicated support, community) — a business can share a channel with a competitor while differentiating sharply on relationship.",
  },
  {
    id: "se-8",
    topic: "Business model design",
    question: "A two-sided marketplace (e.g. connecting buyers and sellers) primarily needs to solve which problem first?",
    options: [
      "Maximising revenue per transaction from day one.",
      "The 'chicken-and-egg' problem — attracting enough of one side to make the platform valuable to the other.",
      "Building the most features possible before launch.",
      "Filing as many patents as possible.",
    ],
    correctIndex: 1,
    explanation:
      "A marketplace has no value to either side until there's enough of the other side present — solving this cold-start problem, often by subsidising or seeding one side first, typically precedes any serious monetisation strategy.",
  },
  {
    id: "se-9",
    topic: "Growth strategy",
    question:
      "Using the Ansoff Matrix, launching an existing product in a new international market is an example of which strategy?",
    options: [
      "Market penetration",
      "Market development",
      "Product development",
      "Diversification",
    ],
    correctIndex: 1,
    explanation:
      "Market development means taking an existing product to new customers or geographies. It carries less risk than diversification (new product, new market) because the product itself is already proven.",
  },
  {
    id: "se-10",
    topic: "Growth strategy",
    question: "What is the main strategic risk of pursuing growth primarily through heavy discounting?",
    options: [
      "There is no risk — discounting always builds a loyal customer base.",
      "It can attract price-sensitive customers with low loyalty and mask whether the underlying product-market fit is strong.",
      "Discounting is illegal in most markets.",
      "It permanently improves gross margin.",
    ],
    correctIndex: 1,
    explanation:
      "Discount-driven growth can produce impressive top-line numbers while hiding weak retention and thin (or negative) unit economics — the growth may disappear the moment the discount does, so it's important to check whether demand holds at a sustainable price.",
  },
];
