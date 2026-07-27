import type { NavDropdown, NavLink } from "@/features/profile/types";

export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/#research" },
  { label: "Publications", href: "/#publications" },
];

export const teachingDropdown: NavDropdown = {
  label: "Teaching",
  href: "/#teaching",
  items: [
    { label: "1-Year MBA", href: "/teaching/1-year-mba" },
    { label: "2-Year MBA", href: "/teaching/2-year-mba" },
    {
      label: "Case Study Preparation",
      href: "https://swapnilsahoo.com/case-study-preparation/",
      external: true,
    },
    { label: "AI Hackathon", href: "/teaching/ai-hackathon" },
    { label: "Placements", href: "https://swapnilsahoo.com/placements", external: true },
    { label: "Executive MDPs", href: "/#mdp" },
  ],
};

export const secondaryNavLinks: NavLink[] = [
  { label: "PhD", href: "/#phd" },
  { label: "Writing", href: "/blogs" },
];

export const moreDropdown: NavDropdown = {
  label: "More",
  href: "/#press",
  items: [
    { label: "Press & Media", href: "/#press" },
    { label: "Gallery", href: "/#gallery" },
    { label: "Spirituality", href: "/spirituality/hanuman-chalisa.html" },
    { label: "Contact", href: "/#contact" },
  ],
};

export const socialLinks = [
  { label: "X", href: "https://x.com/swapnilsahoo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/swapnilsahoo/" },
  { label: "Instagram", href: "https://www.instagram.com/swapnilsahoo/" },
] as const;
