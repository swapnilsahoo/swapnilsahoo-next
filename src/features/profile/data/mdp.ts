import type { MdpModule, MdpProgram } from "@/features/profile/types";

export const mdpProgramsConducted: MdpProgram[] = [
  {
    venue: "NADT, Delhi",
    audience: "75 IRS officers",
    title: "Creativity in Problem Solving & Task Prioritization through Visual Thinking",
    context:
      "A one-day programme for the Indian Revenue Service at the National Academy of Direct Taxes, Delhi Campus, co-facilitated with Prof. S. K. Palhan.",
    inTheRoom:
      "The session used visual thinking to work through creativity in problem solving and task prioritisation.",
    followThrough: "Participants developed visual problem maps and 30-60-90-day execution plans.",
  },
  {
    venue: "Karma Yoga",
    audience: "Arya Samaj School, GK-2 New Delhi",
    title: "Experiential Learning for Underprivileged Students & Volunteer Teachers",
    context:
      "A Karma Yoga programme with students and volunteer teachers at Arya Samaj School, GK-2, New Delhi.",
    inTheRoom:
      "The work combined story-based values learning, creative puzzles, STEM demonstrations and team games.",
    followThrough: "Volunteer teachers received replicable classroom activity templates.",
  },
];

export const mdpModules: MdpModule[] = [
  {
    index: "Module 01",
    title: "Strategic Formulation & Leadership",
    items: [
      "Top-down & bottom-up formulation",
      "Stakeholder influence on strategy",
      "Strategic leadership",
      "Vision & mission as design choices",
    ],
  },
  {
    index: "Module 02",
    title: "Implementation & Org Design",
    items: [
      "Capabilities for execution",
      "Role of middle managers",
      "Structure & resource allocation",
      "The 7S framework",
    ],
  },
  {
    index: "Module 03",
    title: "Leading Teams & Change",
    items: [
      "Communicating strategy",
      "Inspirational leadership",
      "Negotiation & influence tactics",
      "Pervasive commitment",
    ],
  },
  {
    index: "Module 04",
    title: "Performance & Control",
    items: [
      "Balanced scorecard",
      "Management control systems",
      "Performance dashboards",
      "Finance vs. operational control",
    ],
  },
  {
    index: "Module 05",
    title: "Advanced Strategic Contexts",
    items: [
      "Contextual intelligence",
      "Technology adoption",
      "Internationalisation & liability of newness",
    ],
  },
];
