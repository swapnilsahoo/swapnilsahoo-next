import type { CaseFrameworkBranch } from "@/features/placements/data/case-frameworks";

export interface GuesstimateStep {
  label: string;
  detail: string;
}

export interface Guesstimate {
  id: string;
  number: string;
  question: string;
  approach: "Demand-side" | "Supply-side";
  tree: {
    root: string;
    rootFormula?: string;
    branches: readonly CaseFrameworkBranch[];
  };
  steps: readonly GuesstimateStep[];
  finalAnswer: string;
  sanityCheck: string;
}

export const guesstimates: readonly Guesstimate[] = [
  {
    id: "auto-rickshaws",
    number: "1",
    question: "How many auto-rickshaws are on the road in Bengaluru on a typical day?",
    approach: "Demand-side",
    tree: {
      root: "Auto-rickshaws needed",
      rootFormula: "= Daily auto-trips ÷ Trips per rickshaw per day",
      branches: [
        { label: "Daily auto-trips", formula: "Population × Trip rate × Auto share", note: "How many trips happen, and what share choose an auto." },
        { label: "Trips per rickshaw", formula: "Working hours × Trips per hour", note: "How much work one vehicle can realistically absorb in a day." },
      ],
    },
    steps: [
      {
        label: "Define",
        detail:
          "Scope it precisely: rickshaws actually operating on a typical weekday in Bengaluru city, not registered-but-idle vehicles and not the whole metro region.",
      },
      {
        label: "Decompose",
        detail:
          "Go demand-side: total daily trips by auto, divided by how many trips one rickshaw can complete in a working day.",
      },
      {
        label: "Estimate",
        detail:
          "City population ≈ 1.3 crore. Assume 30% take at least one motorised trip needing an auto/cab on a given day, and of those, autos capture roughly 40% of trips (versus buses, metro, cabs, two-wheelers). That's roughly 1.3cr × 0.3 × 0.4 ≈ 15.6 lakh auto-trips a day. A driver working a 10-hour day, spending half of it in actual paid trips averaging 20 minutes each, completes roughly 15 trips a day.",
      },
      {
        label: "Sanity-check",
        detail:
          "15.6 lakh trips ÷ 15 trips per rickshaw ≈ 1.04 lakh rickshaws. That is the same order of magnitude as widely cited estimates for a city this size — the number should feel plausible, not exact.",
      },
    ],
    finalAnswer: "≈ 1 lakh (100,000) auto-rickshaws operating on a typical day",
    sanityCheck:
      "If this were off by 5x in either direction, the streets would visibly look very different from what a resident of the city actually observes — that gut check matters as much as the arithmetic.",
  },
  {
    id: "mall-outlet-revenue",
    number: "2",
    question: "What is the daily revenue of a single quick-service restaurant outlet inside a busy Mumbai mall?",
    approach: "Supply-side",
    tree: {
      root: "Daily outlet revenue",
      rootFormula: "= Footfall × Conversion × Average bill",
      branches: [
        { label: "Footfall", note: "People who pass close enough to the outlet to plausibly buy." },
        { label: "Conversion", note: "Share of that footfall who actually purchase." },
        { label: "Average bill", note: "Average amount spent per transaction." },
      ],
    },
    steps: [
      {
        label: "Define",
        detail:
          "A single, mid-sized outlet in a high-footfall mall on an average day (not a weekend peak, not a holiday).",
      },
      {
        label: "Decompose",
        detail:
          "This is a supply-side, operational estimate: footfall past the outlet, multiplied by conversion into a purchase, multiplied by average bill value.",
      },
      {
        label: "Estimate",
        detail:
          "Assume the mall sees 15,000 visitors on an average day, and roughly 20% pass close enough to this specific outlet's frontage — 3,000 people. Of those, a conservative 8% conversion buy something — 240 transactions. Average bill for a quick-service meal: ₹250.",
      },
      {
        label: "Sanity-check",
        detail:
          "240 × ₹250 = ₹60,000 a day, or roughly ₹18 lakh a month. Cross-check against a rough staffing and rent load: an outlet this size typically needs monthly revenue well above its fixed cost to be viable, so ₹18 lakh should comfortably clear that bar — if it didn't, the assumptions would need revisiting.",
      },
    ],
    finalAnswer: "≈ ₹60,000 in daily revenue (≈ ₹18 lakh a month)",
    sanityCheck:
      "Always state which lever you're least sure of — here, it's the conversion rate. A confident candidate says so out loud rather than hiding it inside a clean final number.",
  },
  {
    id: "bottled-water-market",
    number: "3",
    question: "What is the annual market size for packaged drinking water in urban India?",
    approach: "Demand-side",
    tree: {
      root: "Annual market size",
      rootFormula: "= Urban population × Annual consumption per person × Average price",
      branches: [
        { label: "Urban population", note: "The relevant buyer base — packaged water is overwhelmingly an urban habit." },
        { label: "Consumption per person", note: "Litres bought per year, not total water drunk (most water is not bottled)." },
        { label: "Average price", note: "Blended price per litre across bottle sizes and brands." },
      ],
    },
    steps: [
      {
        label: "Define",
        detail:
          "Packaged drinking water bought at retail (bottles, jars, cans) by urban Indian households and out-of-home consumers — not tap water, not bulk institutional supply.",
      },
      {
        label: "Decompose",
        detail:
          "Urban population, multiplied by an average annual litres-purchased figure per person, multiplied by an average realised price per litre.",
      },
      {
        label: "Estimate",
        detail:
          "Urban population ≈ 50 crore. Assume an average urban resident buys roughly 15 litres of packaged water a year (most water consumed is still tap or filtered, not bottled — this is a deliberately conservative number). Average realised price, blending small bottles and large jars: ₹20 per litre.",
      },
      {
        label: "Sanity-check",
        detail:
          "50cr × 15 litres × ₹20 = ₹15,000 crore. That is the right order of magnitude for a large, fragmented, low-margin-per-unit consumer category — not a niche category, but also not comparable to something like the total dairy market.",
      },
    ],
    finalAnswer: "≈ ₹15,000 crore annual market",
    sanityCheck:
      "Triangulate with a second route if time allows — for instance, total bottled-water production volume × average price — and see whether the two independent estimates land in the same order of magnitude.",
  },
] as const;
