export interface FounderPlaybookCourse {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  href: string;
  deckHref: string;
}

/**
 * Short original courses under the "Founder's Playbook" umbrella,
 * each with its own page and a downloadable slide deck. Add new
 * entries here as the series grows — both the nav and the parent
 * "How to Build a Startup?" page render from this list.
 */
export const founderPlaybookCourses: readonly FounderPlaybookCourse[] = [
  {
    slug: "building-a-durable-advantage",
    title: "Building a Durable Competitive Advantage",
    tagline: "Winning once is easy. Staying ahead is the actual test.",
    description:
      "Five short modules on what actually makes a business defensible over time — cost and efficiency, differentiation, switching costs and network effects — plus a simple test for whether your own idea would survive a well-funded copycat.",
    href: "/teaching/building-a-durable-advantage",
    deckHref: "/downloads/building-a-durable-competitive-advantage.pptx",
  },
  {
    slug: "raising-money",
    title: "Raising Money Without Losing the Company",
    tagline: "Every rupee of outside money changes who you answer to.",
    description:
      "Bootstrapping vs. debt vs. equity, the four questions behind every investor's yes or no, a fully worked dilution example across two funding rounds, and four honest reasons not to raise yet.",
    href: "/teaching/raising-money",
    deckHref: "/downloads/raising-money-without-losing-the-company.pptx",
  },
  {
    slug: "product-market-fit",
    title: "Finding Product-Market Fit",
    tagline: "\"People seem to like it\" is a feeling. This is a fact you can chart.",
    description:
      "Three retention-curve shapes and what each one actually means, three honest signals to check before trusting a dashboard, and exactly what to do while the curve still looks weak.",
    href: "/teaching/product-market-fit",
    deckHref: "/downloads/finding-product-market-fit.pptx",
  },
  {
    slug: "hiring-first-team",
    title: "Hiring Your First Five People",
    tagline: "Your first hires define what the company can do before there's a process to lean on.",
    description:
      "Four traits that matter more than a strong resume, four rules for early equity that prevent most future disputes, and the co-founder mistakes that quietly break companies later.",
    href: "/teaching/hiring-first-team",
    deckHref: "/downloads/hiring-your-first-five-people.pptx",
  },
  {
    slug: "pitching-storytelling",
    title: "Pitching and Storytelling",
    tagline: "One idea. Three genuinely different two-minute pitches.",
    description:
      "What an investor, a customer and a prospective hire are each actually listening for, a six-step structure that works for any two-minute pitch, and the four mistakes that make pitches forgettable.",
    href: "/teaching/pitching-storytelling",
    deckHref: "/downloads/pitching-and-storytelling.pptx",
  },
];
