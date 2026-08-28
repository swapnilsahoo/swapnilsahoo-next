export interface CaseBankEntry {
  id: string;
  number: string;
  title: string;
  theme: string;
  prompt: string;
  steps: {
    label: string;
    items: readonly string[];
  }[];
  strongAnswer: readonly string[];
}

/**
 * A wider bank of practice cases beyond the three fully worked examples on
 * /placements/case-examples — shorter on exhibits, but each covers a
 * distinct case archetype (product, growth, pricing, competitive response,
 * profitability, ethics-under-pressure, diagnosis, PE/VC diligence, causal
 * inference, market entry) so the set as a whole builds real range.
 */
export const caseBank: readonly CaseBankEntry[] = [
  {
    id: "placement-portal-redesign",
    number: "01",
    theme: "Product · prioritisation",
    title: "Placement Portal Redesign",
    prompt:
      "Students complain that a business-school placement portal is frustrating. You are the PM. 1,000 students, 150 recruiters, 70% mobile usage, 18% of applications are abandoned midway, 40% of complaints concern eligibility confusion, the placement team spends 25 person-hours/week on repetitive queries, and recruiters complain about incomplete profiles. Improve it.",
    steps: [
      {
        label: "Ask",
        items: [
          "Who are the primary and secondary users, and whose problem do you optimise for first?",
          "What research would you run before designing anything?",
          "Propose an MVP with no more than five features — what gets explicitly deferred?",
        ],
      },
      {
        label: "Pressure-test",
        items: [
          "What if application completion rises but irrelevant applications increase 50%?",
          "How do you handle it when recruiters ask for more student data than students are comfortable sharing?",
        ],
      },
    ],
    strongAnswer: [
      "Balances student, recruiter and placement-team needs rather than optimising one at the expense of the others.",
      "Defines outcome metrics, not feature output.",
      "Names eligibility confusion as a root cause and incomplete profiles as the recruiter-side symptom of the same problem.",
      "Includes a privacy guardrail before it's asked for, not after.",
    ],
  },
  {
    id: "saas-growth-strategy",
    number: "02",
    theme: "Growth strategy · quantification",
    title: "SaaS Growth Strategy",
    prompt:
      "A B2B design-collaboration SaaS firm has ₹40 crore ARR and wants 50% growth next year. Retention is healthy but new-logo acquisition has slowed.",
    steps: [
      {
        label: "Structure",
        items: [
          "Break growth into: existing-customer expansion, new customers, pricing/packaging, new segments/geographies, product-led growth, inorganic options.",
        ],
      },
      {
        label: "Quantify before you brainstorm",
        items: [
          "If baseline expansion delivers 15% growth, what revenue gap remains?",
          "At an average new-customer ARR of ₹10 lakh, how many additional customers does that gap require?",
        ],
      },
      {
        label: "Choose",
        items: [
          "Which lever would you test first, and why that one before the others?",
          "What single piece of data would change your recommendation?",
        ],
      },
    ],
    strongAnswer: [
      "Quantifies the gap before listing levers — this is the single most common thing weak answers skip.",
      "Connects the growth choice to product capacity, channel capacity, sales capacity and unit economics, not just market size.",
      "Picks one lever to test first instead of recommending all six at once.",
    ],
  },
  {
    id: "new-product-pricing",
    number: "03",
    theme: "Pricing · value capture",
    title: "New Product Pricing",
    prompt:
      "Your company has built an enterprise workflow tool that cuts approval-cycle time by 30%. Determine a pricing model.",
    steps: [
      {
        label: "Compare approaches",
        items: [
          "Cost-based vs. competitor-based vs. value-based — which fits a time-saving enterprise tool, and why?",
          "If 500 employees each save 2 hours/month at ₹1,000/hour fully-loaded cost, what's the customer's annual economic value?",
        ],
      },
      {
        label: "Package it",
        items: [
          "Per-seat, per-workflow, usage-based or outcome-linked — what are the adoption and expansion trade-offs of each?",
          "What are the specific risks of outcome-based pricing here?",
        ],
      },
      {
        label: "Test it",
        items: ["How would you test willingness to pay before a full launch, not after?"],
      },
    ],
    strongAnswer: [
      "Calculates the value created first, and only then asks what defensible share of it to capture.",
      "Explicitly checks that the pricing metric (seat, usage, outcome) matches the value metric (hours saved, cycle time).",
      "Considers procurement simplicity and expansion incentives, not just theoretical revenue-maximisation.",
    ],
  },
  {
    id: "competitive-response",
    number: "04",
    theme: "Competitive strategy",
    title: "Competitive Response",
    prompt:
      "You are advising an incumbent enterprise-software firm. A cheaper AI-native entrant is winning small customers quickly. What should the incumbent do?",
    steps: [
      {
        label: "Diagnose",
        items: [
          "Why are customers actually switching — price, usability, deployment speed, AI quality, procurement friction, brand?",
          "Which customer segments are most exposed, and which are genuinely safe?",
        ],
      },
      {
        label: "Weigh the options",
        items: [
          "Reprice? Launch a sub-brand? Bundle? Acquire? Partner? Improve the product? Defend the enterprise segment and concede the rest?",
          "Which option risks cannibalising the incumbent's own base — and when is that cannibalisation actually acceptable?",
        ],
      },
      {
        label: "Commit",
        items: ["Choose one primary move and one defensive move. Name the metric and trigger point for each."],
      },
    ],
    strongAnswer: [
      "Uses segment economics, not a single company-wide reaction.",
      "Doesn't reflexively cut price as the first move.",
      "Reasons explicitly about cannibalisation rather than treating it as an unqualified negative.",
    ],
  },
  {
    id: "digital-agency-profitability",
    number: "05",
    theme: "Profitability diagnosis",
    title: "Digital Agency Profitability",
    prompt: "A digital design agency's revenue is growing 20%, but profit has fallen for two years. Diagnose why.",
    steps: [
      {
        label: "Clarify",
        items: [
          "Is the margin decline company-wide, or concentrated by service line, client or geography?",
          "Is it price, mix, utilisation, rework or subcontracting driving it?",
        ],
      },
      {
        label: "Analyse",
        items: [
          "Build a revenue equation and a cost equation for the business — where do they diverge?",
          "How would you test whether growth itself is what's destroying profitability?",
          "What would you want to see at the individual-project level?",
        ],
      },
      {
        label: "Recommend",
        items: ["Give three interventions, and name the second-order effect of each."],
      },
    ],
    strongAnswer: [
      "Goes beyond Revenue − Cost into mix, utilisation, rework and client-level economics.",
      "Uses project-level profitability, not just company averages.",
      "Explicitly recognises that fast growth can be the cause of margin decline, not just coincidental with it.",
    ],
  },
  {
    id: "enterprise-presales-transformation",
    number: "06",
    theme: "Pre-sales · integrity under pressure",
    title: "Enterprise Pre-Sales Transformation",
    prompt:
      "A manufacturing client says: \"We need an AI dashboard for project execution.\" You are the solution consultant. Sales wants a proposal tomorrow.",
    steps: [
      {
        label: "Discover",
        items: [
          "What business outcome is the client actually trying to move?",
          "Who makes the relevant decisions today, and on what data?",
          "What must integrate, and what are the security/latency constraints?",
        ],
      },
      {
        label: "Solution and stress-test",
        items: [
          "What's the minimum viable architecture at a conceptual level, and what belongs in the POC — with explicit success criteria?",
          "The sales director has already promised generative AI. Your discovery shows rules-based analytics solves 80% of the problem more reliably. What do you do?",
        ],
      },
    ],
    strongAnswer: [
      "Resists solution-first behaviour — discovery comes before the pitch, not after.",
      "Translates every technical choice into a business outcome and an ROI number.",
      "Shows real integrity under sales pressure rather than just agreeing to what was already promised.",
      "Defines POC success criteria before the POC starts, not after it's judged.",
    ],
  },
  {
    id: "ecommerce-revenue-drop",
    number: "07",
    theme: "Diagnosis · segmentation",
    title: "E-Commerce Revenue Drop",
    prompt: "An e-commerce marketplace's weekly revenue is down 12% while traffic is flat. Diagnose it.",
    steps: [
      {
        label: "Structure first",
        items: [
          "Revenue = traffic × conversion × orders per customer × average order value — then segment by channel, geography, category, device, and new vs. returning.",
        ],
      },
      {
        label: "Follow the data",
        items: [
          "You're told: conversion is flat overall, but mobile checkout completion is down 20% while desktop is stable. What's your next cut?",
          "How do you distinguish a product bug, a payment failure, poor traffic quality, an app-version issue and an external event from each other?",
        ],
      },
      {
        label: "Recommend",
        items: ["What's the immediate containment action, and what's the separate longer-term fix?"],
      },
    ],
    strongAnswer: [
      "Uses a metric tree and real segmentation instead of guessing at causes.",
      "Doesn't fall into the averaging trap once the mobile-vs-desktop split is revealed.",
      "Asks for the specific instrumentation and release/payment data that would actually confirm or rule out each hypothesis.",
      "Keeps containment (stop the bleeding) separate from root-cause correction (fix it properly).",
    ],
  },
  {
    id: "ai-startup-due-diligence",
    number: "08",
    theme: "PE/VC diligence · AI",
    title: "AI Startup Due Diligence",
    prompt:
      "A PE fund is considering two AI startups: one automates pathology workflows, the other provides consumer-retail analytics. Management of both claims \"AI-driven\" differentiation. Assess whether the AI capability is real and valuable.",
    steps: [
      {
        label: "Build the framework",
        items: [
          "Team/talent, proprietary data, model performance, workflow integration, business impact, unit economics, scalability, defensibility, governance, client references.",
        ],
      },
      {
        label: "Build separate KPI trees",
        items: [
          "Healthcare: TAT, samples/hour, cost/sample, diagnostic accuracy, utilisation, patient throughput.",
          "Consumer: AOV, purchase frequency, retention, NPS, sales uplift, client churn.",
        ],
      },
      {
        label: "Decide",
        items: ["What evidence would make you walk away from either deal despite an impressive product demo?"],
      },
    ],
    strongAnswer: [
      "Tests actual business impact rather than being impressed by AI as a buzzword.",
      "Builds distinct KPI trees for genuinely different use cases instead of one generic scorecard.",
      "Checks data rights, reproducibility, scalability and leadership depth, not just the demo.",
      "Connects operating metrics back to NPV/valuation, not just \"the product looks good.\"",
    ],
  },
  {
    id: "experiment-design-ai-rollout",
    number: "09",
    theme: "Causal reasoning · experiment design",
    title: "Experiment Design: AI Rollout",
    prompt:
      "A bank introduces an AI assistant for customer-service agents. Average handling time falls 15%, but customer complaints rise 8%. Should the bank roll it out?",
    steps: [
      {
        label: "Question the causal design first",
        items: [
          "Which agents and customers were actually treated? Was there real randomisation, or just a before/after comparison?",
          "Which specific complaint types increased — is it the same complaint driving the whole 8%, or several unrelated ones?",
        ],
      },
      {
        label: "Define what actually matters",
        items: [
          "What's the primary outcome, and what are the guardrail metrics that should stop a rollout even if the primary metric looks good?",
          "Does the effect differ by agent tenure, customer type or query type?",
        ],
      },
      {
        label: "Decide",
        items: ["What threshold or evidence would justify a full rollout, a redesign, or a rollback?"],
      },
    ],
    strongAnswer: [
      "Refuses to treat a before/after time-series as proof of causation.",
      "Treats handling time and complaints as a genuine trade-off, not a single metric to optimise.",
      "Looks for heterogeneous effects across subgroups instead of trusting one aggregate number.",
      "Names an actual decision threshold instead of saying \"we'd need more data\" and stopping there.",
    ],
  },
  {
    id: "b2b-analytics-market-entry",
    number: "10",
    theme: "Market entry · quantification",
    title: "B2B Analytics Market Entry",
    prompt:
      "An Indian analytics SaaS firm has ₹160 crore ARR and wants to enter one of three regions — Middle East, Europe or North America — with a ₹40 crore year-one budget. Recommend a market.",
    steps: [
      {
        label: "Structure",
        items: [
          "Market size and growth, digital maturity, target verticals, competition, regulation/data rules, sales cycle, CAC, talent, language/culture, existing relationships.",
        ],
      },
      {
        label: "Quantify the target first",
        items: [
          "If organic growth alone gets to 15% but the corporate target is 40%, what ARR gap must this expansion fill on its own?",
        ],
      },
      {
        label: "Choose",
        items: [
          "What specific data would you request for each region before deciding?",
          "One market, or several? What mode of entry — direct, partner, or acquisition?",
        ],
      },
    ],
    strongAnswer: [
      "Quantifies the objective before comparing geographies, not after.",
      "Balances market attractiveness against realistic ability to win it.",
      "Explicitly accounts for enterprise sales-cycle length and regulatory/compliance friction, not just market size.",
      "Lands on a focused recommendation with milestones, not a list of three roughly-equal options.",
    ],
  },
] as const;
