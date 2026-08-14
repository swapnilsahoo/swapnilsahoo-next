import type { ContactCard } from "@/features/profile/types";

export const contactCards: ContactCard[] = [
  {
    title: "Email",
    description: "swapnil.s@greatlakes.edu.in",
    href: "mailto:swapnil.s@greatlakes.edu.in",
    icon: "mail",
  },
  {
    title: "Book a 1:1 mentoring slot",
    description:
      "A focused conversation about a career decision, research idea or strategic question.",
    href: "https://calendar.app.google/L7zMAVEUFu2rumyf9",
    external: true,
    icon: "calendar",
  },
  {
    title: "Subscribe to the newsletter",
    description: "My notes on AI safety, security and academic life, published on Substack.",
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
