export interface StartupPrinciple {
  id: string;
  number: string;
  name: string;
  plainEnglish: string;
  example: string;
  tryThis: string;
}

export const startupPrinciples: readonly StartupPrinciple[] = [
  {
    id: "means-not-vision",
    number: "1",
    name: "Start with what you have, not a grand vision",
    plainEnglish:
      "Don't wait for the perfect idea or a business plan that predicts five years of revenue. Look at what you already have — your skills, your network, a few thousand rupees, a weekend — and ask what you could build with exactly that, starting today.",
    example:
      "A student who is good at editing video and has three friends running small Instagram shops doesn't need funding to start. They already have a means: offer to edit reels for those three shops this week and see what happens.",
    tryThis:
      "List three things you already have (a skill, a relationship, a small amount of money, spare time) and one thing you could build with just those three things by Friday.",
  },
  {
    id: "affordable-loss",
    number: "2",
    name: "Risk what you can afford to lose, not what you hope to gain",
    plainEnglish:
      "Instead of asking 'how big could this get?', ask 'what is the most I am willing to lose if this fails completely?' Then commit only that much — time, money, reputation — before deciding whether to go further.",
    example:
      "Rather than quitting your placement offer to chase an idea full-time, spend twenty hours a week and ₹5,000 testing it first. If it works, you have real evidence before you risk more. If it doesn't, you've lost twenty hours and ₹5,000, not a career.",
    tryThis:
      "Write down the maximum time and money you're willing to lose on your first real test. Do not exceed it, no matter how excited you get halfway through.",
  },
  {
    id: "partners-before-funders",
    number: "3",
    name: "Find partners before you find funders",
    plainEnglish:
      "Early on, the people who commit real resources to your idea — a co-founder, a first customer who pays in advance, a friend who lends you their kitchen — are shaping what the business becomes, not just funding it. Chase commitment, not just capital.",
    example:
      "A founder trying to start a tiffin service didn't wait for investors. She got her building's WhatsApp group to pre-pay for a week of meals. Those first ten paying neighbours told her what to cook, what to charge and when to deliver — they became partners in designing the business, not just customers.",
    tryThis:
      "Find one person who will commit something real — money, time or their name — to your idea this week, before you've built anything.",
  },
  {
    id: "leverage-surprises",
    number: "4",
    name: "Treat surprises as material, not distractions",
    plainEnglish:
      "Plans rarely survive contact with real customers. When something unexpected happens — a customer asks for a feature you never planned, a competitor's exit opens a gap — don't file it away as a distraction from the plan. Ask what it's telling you to build instead.",
    example:
      "A team building a tutoring app for board-exam students noticed parents kept asking about career counselling, not tutoring. Instead of ignoring the 'off-topic' requests, they leaned into them — career counselling became the actual business.",
    tryThis:
      "Look back at the last unexpected question or complaint a potential customer gave you. Write one sentence on what it might be telling you to change.",
  },
  {
    id: "shape-dont-predict",
    number: "5",
    name: "Shape the future you can influence — don't just forecast it",
    plainEnglish:
      "You don't need to predict exactly how the market will evolve. You need to take actions today that make a good outcome more likely, and stay close enough to your customers and partners to adjust as you go.",
    example:
      "Rather than spending a month researching whether a city 'needs' a bike-repair subscription, a founder fixed twenty bicycles for free in one housing society, asked who would pay ₹99 a month for the same service, and built the business around who actually said yes.",
    tryThis:
      "Pick one small, concrete action you can take this week that moves your idea forward — not a research task, an action with a real person on the other end.",
  },
] as const;

export interface StartupFailureMode {
  title: string;
  description: string;
}

export const commonFailureModes: readonly StartupFailureMode[] = [
  {
    title: "Solving a problem nobody urgently has",
    description:
      "The idea is clever, but when you ask real people, they shrug — the problem exists, but it isn't painful enough for them to change their behaviour or pay for a fix.",
  },
  {
    title: "Running out of cash before running out of ideas",
    description:
      "Founders often die with unexplored options still on the table, simply because they spent too fast and didn't know their runway in months, not rupees.",
  },
  {
    title: "Building in isolation for too long",
    description:
      "Months are spent perfecting a product before a single real customer has seen it — by launch, assumptions that were never tested have hardened into the whole design.",
  },
  {
    title: "Ignoring how customers will actually find you",
    description:
      "A genuinely useful product with no realistic path to reach its first hundred customers is not yet a business — distribution is a design decision, not an afterthought.",
  },
  {
    title: "Co-founder conflict left unaddressed",
    description:
      "Disagreements about equity, roles or commitment level are avoided early to preserve the friendship, then resurface later at a much higher cost.",
  },
  {
    title: "Scaling before the core loop actually works",
    description:
      "Hiring, marketing spend and new features are added to a business that hasn't yet proven a small group of customers will use and pay for it repeatedly.",
  },
] as const;

export interface StartupMetric {
  term: string;
  meaning: string;
}

export const founderMetrics: readonly StartupMetric[] = [
  {
    term: "Burn rate",
    meaning: "How much cash the business spends, net of any revenue, in a typical month.",
  },
  {
    term: "Runway",
    meaning: "Cash in hand ÷ monthly burn rate — how many months you can operate before running out.",
  },
  {
    term: "Unit economics",
    meaning: "Whether you make or lose money on one customer or one order, before accounting for fixed costs.",
  },
  {
    term: "Retention",
    meaning: "The share of customers who are still using or buying from you after a fixed period — the honest test of whether you've built something people actually want.",
  },
] as const;

export interface FounderMyth {
  myth: string;
  reality: string;
}

export const founderMyths: readonly FounderMyth[] = [
  {
    myth: "\"I need a completely original idea.\"",
    reality:
      "Almost every successful business is an old idea done for a specific group of people better than anyone currently does it. A tiffin service, a tutoring app, a laundry pickup — the idea rarely wins. Knowing exactly who you serve and why they'd switch to you does.",
  },
  {
    myth: "\"I need funding before I can start.\"",
    reality:
      "Funding buys you speed, not permission. Almost anything can be tested at a tiny scale first — by hand, on WhatsApp, with your own time — before a single rupee of outside money is involved.",
  },
  {
    myth: "\"I need to know how to code.\"",
    reality:
      "You need to know how to test whether people want the outcome. A spreadsheet, a phone number and you doing the work manually can validate most ideas long before any product needs to exist.",
  },
  {
    myth: "\"If I build it well, people will come.\"",
    reality:
      "Distribution — how strangers will actually hear about and trust you — is part of the idea, not a problem for later. If you can't name your first ten customers and how you'll reach them, the idea isn't ready to build yet.",
  },
  {
    myth: "\"Successful founders had it figured out from day one.\"",
    reality:
      "Most successful businesses look nothing like their founders' first version of the idea. What didn't change was the discipline of testing small, listening honestly and adjusting fast.",
  },
] as const;

export const starterChecklist = [
  "Write your idea as one sentence: for [specific person], who struggles with [specific problem], we help by [specific action].",
  "Find five people who actually match that 'specific person' and talk to them this week — not a survey, an actual conversation.",
  "Ask what they currently do about the problem today, and whether they already pay for any part of a fix.",
  "Decide the smallest possible version of your idea that would let you learn if they'd really use it.",
  "Set your affordable loss — the maximum time and money you'll spend before deciding whether to continue.",
  "Get one real commitment (money, time or a public yes) from someone outside your immediate friend group.",
] as const;
