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
];
