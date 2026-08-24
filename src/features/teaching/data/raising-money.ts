export interface FundingRoute {
  id: string;
  name: string;
  howItWorks: string;
  whatYouGive: string;
  bestWhen: string;
}

export const fundingRoutes: readonly FundingRoute[] = [
  {
    id: "revenue",
    name: "Bootstrapping on revenue",
    howItWorks:
      "You fund growth from what customers already pay you. No outside money, no board seats, no term sheet.",
    whatYouGive: "Speed — you can only grow as fast as your own cash flow allows.",
    bestWhen: "Your customers pay early, margins are healthy, and the market doesn't reward being first.",
  },
  {
    id: "debt",
    name: "Debt",
    howItWorks:
      "You borrow money you must repay with interest, regardless of how the business performs.",
    whatYouGive: "Fixed repayment obligations — the lender doesn't share your downside, only your upside stays yours.",
    bestWhen: "Cash flow is predictable enough to service the repayment, and you don't want to give up ownership.",
  },
  {
    id: "equity",
    name: "Equity",
    howItWorks:
      "Investors give you money in exchange for a percentage of ownership in the company, permanently.",
    whatYouGive: "A slice of the company and a say in some decisions — forever, unless bought back later.",
    bestWhen: "The market genuinely rewards moving fast, and the upside is large enough to justify sharing it.",
  },
] as const;

export interface InvestorLens {
  title: string;
  question: string;
}

export const investorLenses: readonly InvestorLens[] = [
  {
    title: "Evidence, not enthusiasm",
    question: "What have real customers already done — not said — that suggests this works?",
  },
  {
    title: "Market clarity",
    question: "Do you know exactly who you serve and why they'd choose you over the current alternative?",
  },
  {
    title: "A credible team",
    question: "Why are you and your co-founders specifically positioned to solve this, better than someone else?",
  },
  {
    title: "A defensible plan",
    question: "If this works, what stops a well-funded copycat from taking it from you in a year?",
  },
] as const;

export interface DilutionRound {
  round: string;
  preMoney: string;
  raised: string;
  postMoney: string;
  newInvestorStake: string;
  founderStakeAfter: string;
}

export const dilutionExample: readonly DilutionRound[] = [
  {
    round: "Start",
    preMoney: "—",
    raised: "—",
    postMoney: "—",
    newInvestorStake: "0%",
    founderStakeAfter: "100%",
  },
  {
    round: "Round 1",
    preMoney: "₹4.5 crore",
    raised: "₹50 lakh",
    postMoney: "₹5 crore",
    newInvestorStake: "10%",
    founderStakeAfter: "90%",
  },
  {
    round: "Round 2",
    preMoney: "₹8.5 crore",
    raised: "₹1.5 crore",
    postMoney: "₹10 crore",
    newInvestorStake: "15%",
    founderStakeAfter: "76.5%",
  },
] as const;

export const whenNotToRaise = [
  "You haven't yet found evidence that customers want this — money speeds up a mistake as easily as a success.",
  "You could reach the same milestone with a smaller, self-funded version of the idea first.",
  "The market doesn't actually reward speed — a slower, profitable build serves you just as well.",
  "You're raising because it feels like validation, not because you have a specific, funded use for the money.",
] as const;
