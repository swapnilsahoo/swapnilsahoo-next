// The services of Swapnil Sahoo Learning Lab Private Limited, by audience, written at the
// founder's request on 27 November 2026. Pure data (no React, CSS or server-only imports) so
// the Services page, the Lab homepage, the sitemap, the AI mentor and plain-Node checks can read it.
// Every fact repeats what the linked page already says; check that page before changing one.
// scripts/test-learning-lab-services.mjs checks the links, statuses and price statements.

export const labServicesPath = "/learning-lab/services";

export type ServiceStatus = "open" | "pilot" | "prototype" | "proposed";

export const serviceStatus: Record<
  ServiceStatus,
  { label: string; meaning: string; chip: "open" | "partial" | "planned" }
> = {
  open: { label: "Open now", meaning: "use it today", chip: "open" },
  pilot: { label: "Pilot · limited places", meaning: "open to a small number at a time", chip: "partial" },
  prototype: {
    label: "Working prototype",
    meaning: "try it today; it is still being developed",
    chip: "partial",
  },
  proposed: {
    label: "Proposed",
    meaning: "planned; dates, format and capacity will be published before it opens",
    chip: "planned",
  },
};

export type LabService = {
  id: string;
  name: string;
  status: ServiceStatus;
  summary: string;
  /** How it is delivered, in one short line. */
  format: string;
  href: string;
  action: string;
};

export type ServiceGroup = {
  id: string;
  audience: string;
  title: string;
  intro: string;
  services: readonly LabService[];
};

export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: "entrepreneurs",
    audience: "For aspiring entrepreneurs and students",
    title: "Test an idea, then build on it.",
    intro:
      "Free, self-paced and open now for adults aged 18 and over. Start with the 14-day experiment.",
    services: [
      {
        id: "venture-experiment",
        name: "Free 14-day venture experiment",
        status: "open",
        summary:
          "Test one business idea with real customers, then decide to continue, change or stop.",
        format: "Self-paced online · about 30 minutes a day · no account needed",
        href: "/learning-lab/venture-experiment",
        action: "Start the experiment",
      },
      {
        id: "founder-feedback",
        name: "Written founder feedback",
        status: "pilot",
        summary:
          "Written feedback from Dr. Swapnil Sahoo at each stage of the experiment, for up to 20 learners at a time. Turnaround is not guaranteed.",
        format: "Private online workspace · for adults at college",
        href: "/learning-lab/venture-experiment#start",
        action: "Check for a place",
      },
      {
        id: "entrepreneurship-journey",
        name: "From Startup Idea to Venture Growth",
        status: "open",
        summary:
          "A seven-module journey that links free resources for each stage, from a first idea to raising capital.",
        format: "Self-paced learning map · each module marked open now, partly open or planned",
        href: "/learning-lab/entrepreneurship",
        action: "See the seven modules",
      },
      {
        id: "founder-toolkit",
        name: "Free founder toolkit",
        status: "open",
        summary:
          "Eight copy-ready tools, including an idea filter, customer scripts in English and Hindi, and ₹0–₹500 test playbooks.",
        format: "Online · no sign-up · your answers stay on your device",
        href: "/learning-lab/toolkit",
        action: "Open the toolkit",
      },
      {
        id: "free-courses",
        name: "Six free short courses",
        status: "open",
        summary:
          "Customer questions, affordable loss, unit economics, strategy and applied AI, each with a worksheet.",
        format: "Self-paced · about 20–25 minutes each · no account needed",
        href: "/learning-lab/free-courses",
        action: "Explore the courses",
      },
      {
        id: "catalogue",
        name: "Open catalogue and learning paths",
        status: "open",
        summary:
          "Free management, career, research and entrepreneurship resources, with four ordered learning paths.",
        format: "Self-paced reading and practice",
        href: "/learning-lab/catalogue",
        action: "Browse the catalogue",
      },
      {
        id: "ai-mentor",
        name: "AI learning mentor",
        status: "open",
        summary:
          "Prepared answers from the published website, by text or voice, that point you to the right free resource.",
        format: "Online · it does not grade, enrol or give personal advice",
        href: "/digital-guide",
        action: "Ask the mentor",
      },
    ],
  },
  {
    id: "institutions",
    audience: "For colleges, E-Cells and faculty",
    title: "Run it with a group.",
    intro:
      "A free workshop kit, a working prototype for oral exams and proposed pilots for adult students.",
    services: [
      {
        id: "facilitator-kit",
        name: "Kit for E-Cells and faculty",
        status: "open",
        summary:
          "Run a 75-minute customer-test workshop: a session plan, slide outline, report template and grading rubric.",
        format: "Free for non-commercial sessions, with credit",
        href: "/learning-lab/toolkit/facilitator-kit",
        action: "Open the kit",
      },
      {
        id: "ai-viva-bot",
        name: "AI Viva Bot",
        status: "prototype",
        summary:
          "An AI oral examiner that questions each student on their own submission and prepares an evaluation for faculty.",
        format: "Live demo · a live viva uses your own Google AI Studio (Gemini) key",
        href: "/learning-lab/products",
        action: "See AI Viva Bot",
      },
      {
        id: "institution-pilots",
        name: "Institution pilot programmes",
        status: "proposed",
        summary:
          "A scoped pilot of a Lab programme for adult students, with agreed responsibilities and a published rubric.",
        format: "Written proposal first · no partnerships or completed pilots yet",
        href: "/learning-lab/for-colleges",
        action: "Request a pilot discussion",
      },
    ],
  },
  {
    id: "professionals",
    audience: "For professionals and adult learners",
    title: "Build a skill you can demonstrate.",
    intro: "Three proposed programmes. Each has a demonstration lesson you can try today.",
    services: [
      {
        id: "ai-for-managers",
        name: "AI for Managers",
        status: "proposed",
        summary:
          "Practise workflow design, evidence checking, privacy choices and human review.",
        format: "Proposed: four weeks · six live sessions · sample lesson open now",
        href: "/learning-lab/programmes/ai-for-managers#demo",
        action: "Try the sample lesson",
      },
      {
        id: "strategy-case-thinking",
        name: "Strategy and Case Thinking Lab",
        status: "proposed",
        summary: "Turn a messy scenario into a decision memo you can defend.",
        format: "Proposed: three weeks · six live sessions · sample lesson open now",
        href: "/learning-lab/programmes/strategy-case-thinking#demo",
        action: "Try the sample lesson",
      },
      {
        id: "entrepreneurship-under-constraint",
        name: "Entrepreneurship Under Constraint Bootcamp",
        status: "proposed",
        summary:
          "Define an affordable experiment, use the means you have and decide on evidence.",
        format: "Proposed: four weeks · six live sessions · sample lesson open now",
        href: "/learning-lab/programmes/entrepreneurship-under-constraint#demo",
        action: "Try the sample lesson",
      },
    ],
  },
];

/** How every service works: price, eligibility, delivery, limits, data and contact. */
export const serviceTerms = [
  {
    title: "Price",
    text: "Free. The Lab charges no fees for any service, including future programmes. The only payment on the website is an optional voluntary contribution, and it buys nothing.",
  },
  {
    title: "Who can use them",
    text: "Adults aged 18 and over. A school-learning pathway is planned, not open.",
  },
  {
    title: "How they are delivered",
    text: "Online, at swapnilsahoo.com/learning-lab. Most services are self-paced and need no account. Before a proposed programme opens, its dates, format, capacity and workload will be published.",
  },
  {
    title: "What we do not promise",
    text: "No funding, job, promotion, business success, degree or accreditation. Fundraising and governance resources are general education, not investment, legal or tax advice.",
  },
  {
    title: "Your data",
    text: "The toolkit keeps your answers on your device. The privacy notice explains what the founder-feedback pilot and enquiries store.",
  },
  {
    title: "Questions and complaints",
    text: "Email the Lab or use the contact page. Everything is free, so there is no fee to refund; a contribution sent by mistake is returned.",
  },
] as const;
