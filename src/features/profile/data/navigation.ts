import type { NavDropdown, NavLink } from "@/features/profile/types";

export const primaryNavLinks: NavLink[] = [
  { label: "About", href: "/#about" },
  { label: "Research", href: "/research" },
  { label: "Publications", href: "/#publications" },
];

export const teachingDropdown: NavDropdown = {
  label: "Teaching",
  href: "/#teaching",
  items: [
    { label: "1-Year MBA", href: "/teaching/1-year-mba" },
    { label: "2-Year MBA", href: "/teaching/2-year-mba" },
    {
      label: "Karma Yoga",
      href: "/teaching/karma-yoga",
      children: [
        {
          label: "For B-Schools",
          href: "/teaching/karma-yoga/b-schools",
        },
        {
          label: "For India · Mehalchauri",
          href: "/teaching/karma-yoga/india",
        },
      ],
    },
    { label: "Business Simulation", href: "/teaching/business-simulation" },
    {
      label: "AI Mini Hackathon",
      href: "/teaching/ai-hackathon",
      children: [
        { label: "Side Quests · AI Viva Bot", href: "/teaching/ai-hackathon/side-quests" },
      ],
    },
    { label: "How to Build a Startup?", href: "/teaching/how-to-build-a-startup" },
    { label: "The Entrepreneurship Shelf", href: "/teaching/reading-and-watching-list" },
    {
      label: "Placement Assistance",
      href: "/placements",
      children: [
        {
          label: "Rigorous Industry Analysis",
          href: "/placements/industry-analysis",
        },
        {
          label: "Case Study Preparation",
          href: "/placements/case-study-preparation",
        },
        {
          label: "Case Frameworks",
          href: "/placements/case-frameworks",
        },
        {
          label: "Case Examples",
          href: "/placements/case-examples",
        },
        {
          label: "Guesstimates",
          href: "/placements/guesstimates",
        },
        {
          label: "General Management Interviews",
          href: "/placements/general-management-interviews",
        },
        {
          label: "Product Management Interview Prep",
          href: "/placements/product-management-interview-prep",
        },
        {
          label: "Strategy & Entrepreneurship Interview Prep",
          href: "/placements/strategy-entrepreneurship-interview-prep",
        },
        {
          label: "Cracking Consulting Interviews",
          href: "/teaching/consulting-interviews",
        },
      ],
    },
    { label: "Executive MDPs", href: "/#mdp" },
  ],
};

export const secondaryNavLinks: NavLink[] = [
  { label: "PhD", href: "/#phd" },
  { label: "Writing", href: "https://swapnilsahoo.substack.com/", external: true },
  { label: "Press & Media", href: "/press" },
];

export const moreDropdown: NavDropdown = {
  label: "More",
  href: "/#gallery",
  items: [
    { label: "Gallery", href: "/#gallery" },
    {
      label: "Spirituality",
      href: "/spirituality",
      children: [
        {
          label: "Bhagavad Gita · Complete Text",
          href: "/spirituality/bhagavad-gita",
        },
        {
          label: "Ramcharitmanas · Bālakāṇḍa",
          href: "/spirituality/ramcharitmanas",
        },
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
        {
          label: "Authentic Shiva Tandava Stotram",
          href: "/spirituality/shiva-tandava-stotram",
        },
        {
          label: "Authentic Chandogya Upanishad",
          href: "/spirituality/chandogya-upanishad",
        },
      ],
    },
    {
      label: "Holistic Wellbeing",
      href: "/holistic-wellbeing",
      children: [
        {
          label: "Mental Wellbeing",
          href: "/holistic-wellbeing/mental-wellbeing",
        },
      ],
    },
    {
      label: "Comics & Fiction",
      href: "/comics",
      children: [
        { label: "Spider-Man", href: "/comics#spider-man" },
        { label: "Superman", href: "/comics#superman" },
        { label: "He-Man", href: "/comics#he-man" },
      ],
    },
    {
      label: "Mythology",
      href: "/mythology",
      children: [
        {
          label: "Mahabharata (Original)",
          href: "/mythology#mahabharata-original",
        },
        {
          label: "Ramayana (Original)",
          href: "/mythology#ramayana-original",
        },
        {
          label: "Immortals · 17 profiles",
          href: "/mythology/immortals",
        },
      ],
    },
    { label: "Contact", href: "/#contact" },
  ],
};
