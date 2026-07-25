import type { ContactCard } from "@/features/profile/types";

export const contactCards: ContactCard[] = [
  {
    title: "Email",
    description: "swapnil.sahoo@greatlakes.edu.in",
    href: "mailto:swapnil.sahoo@greatlakes.edu.in",
    icon: "mail",
  },
  {
    title: "Book a 1:1 mentoring slot",
    description: "Career path, research ideas, strategic advice.",
    href: "https://calendar.app.google/L7zMAVEUFu2rumyf9",
    external: true,
    icon: "calendar",
  },
  {
    title: "Subscribe to the newsletter",
    description: "AI safety, security & the academy — on Substack.",
    href: "https://swapnilsahoo.substack.com/",
    external: true,
    icon: "rss",
  },
  {
    title: "Official faculty page",
    description: "Great Lakes Institute of Management, Gurgaon.",
    href: "https://www.greatlakes.edu.in/gurgaon/swapnil-sahoo/",
    external: true,
    icon: "briefcase",
  },
];
