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
    { label: "Karma Yoga", href: "/teaching/karma-yoga" },
    { label: "Business Simulation", href: "/teaching/business-simulation" },
    {
      label: "Case Study Preparation",
      href: "/case-study-preparation/",
    },
    { label: "AI Hackathon", href: "/teaching/ai-hackathon" },
    { label: "Placements", href: "/placements" },
    { label: "Executive MDPs", href: "/#mdp" },
  ],
};

export const secondaryNavLinks: NavLink[] = [
  { label: "PhD", href: "/#phd" },
  { label: "Writing", href: "https://swapnilsahoo.substack.com/", external: true },
];

export const moreDropdown: NavDropdown = {
  label: "More",
  href: "/#press",
  items: [
    { label: "Press & Media", href: "/#press" },
    { label: "Gallery", href: "/#gallery" },
    {
      label: "Spirituality",
      href: "/spirituality",
      children: [
        {
          label: "Authentic Hanuman Chalisa",
          href: "/spirituality/hanuman-chalisa",
        },
        {
          label: "Authentic Vishnu Sahasranama",
          href: "/spirituality/vishnu-sahasranama",
        },
        {
          label: "Authentic Lalita Sahasranama",
          href: "/spirituality/lalita-sahasranama",
        },
      ],
    },
    { label: "Comics & Fiction", href: "/comics/" },
    {
      label: "Mythology",
      href: "/mythology/",
      children: [
        {
          label: "Mahabharata (Original)",
          href: "/mythology/#mahabharata-original",
        },
        {
          label: "Ramayana (Original)",
          href: "/mythology/#ramayana-original",
        },
      ],
    },
    { label: "Contact", href: "/#contact" },
  ],
};

export const socialLinks = [
  { label: "X", href: "https://x.com/swapnilsahoo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/swapnilsahoo/" },
  { label: "Instagram", href: "https://www.instagram.com/swapnilsahoo/" },
] as const;
