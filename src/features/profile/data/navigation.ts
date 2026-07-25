import type { NavDropdown, NavLink } from "@/features/profile/types";

export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Research", href: "#research" },
  { label: "Publications", href: "#publications" },
];

export const teachingDropdown: NavDropdown = {
  label: "Teaching",
  href: "#teaching",
  items: [
    { label: "1-Year MBA", href: "https://swapnilsahoo.com/1_year_mba_class_sessions/", external: true },
    { label: "2-Year MBA", href: "https://swapnilsahoo.com/2-year-mba-index-page/" },
    {
      label: "Case Study Preparation",
      href: "https://swapnilsahoo.com/case-study-preparation/",
      external: true,
    },
    { label: "AI Hackathon", href: "https://swapnilsahoo.com/ai-hackathon/", external: true },
    { label: "Placements", href: "https://swapnilsahoo.com/placements", external: true },
    { label: "Executive MDPs", href: "#mdp" },
  ],
};

export const secondaryNavLinks: NavLink[] = [
  { label: "PhD", href: "#phd" },
  { label: "Writing", href: "/blogs" },
];

export const moreDropdown: NavDropdown = {
  label: "More",
  href: "#more",
  items: [
    { label: "Press & Media", href: "#press" },
    { label: "Gallery", href: "#gallery" },
    { label: "Spirituality", href: "https://swapnilsahoo.com/hanuman-chalisa/", external: true },
    { label: "Contact", href: "#contact" },
  ],
};

export const socialLinks = [
  { label: "X", href: "https://x.com/swapnilsahoo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/swapnilsahoo/" },
  { label: "Instagram", href: "https://www.instagram.com/swapnilsahoo/" },
] as const;
