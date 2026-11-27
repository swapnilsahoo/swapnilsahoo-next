// The services of Swapnil Sahoo Learning Lab Private Limited, by audience, written at the
// founder's request on 27 November 2026. Pure data (no React, CSS or server-only imports) so
// the Services page, the Lab homepage, the sitemap, the AI mentor and plain-Node checks can read it.
// Every fact repeats what the linked page already says; check that page before changing one.
// scripts/test-learning-lab-services.mjs checks the links, statuses and price statements.

export const labServicesPath = "/learning-lab/services";

export type ServiceStatus = "open" | "pilot" | "prototype" | "proposed" | "planned";

export const serviceStatus: Record<
  ServiceStatus,
  { label: string; meaning: string; chip: "open" | "partial" | "planned" }
> = {
  open: { label: "Open now", meaning: "use it today", chip: "open" },
  pilot: {
    label: "Pilot · limited places",
    meaning: "open to a small number at a time",
    chip: "partial",
  },
  prototype: {
    label: "Working prototype",
    meaning: "try it today; it is still being developed",
    chip: "partial",
  },
  proposed: {
    label: "Proposed",
    meaning: "designed; dates, format and capacity will be published before it opens",
    chip: "planned",
  },
  planned: {
    label: "Planned",
    meaning: "on our roadmap; not open yet",
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
        format: "Live demo · a live viva needs your own AI key (details on the Products page)",
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
        summary: "Practise workflow design, evidence checking, privacy choices and human review.",
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
        summary: "Define an affordable experiment, use the means you have and decide on evidence.",
        format: "Proposed: four weeks · six live sessions · sample lesson open now",
        href: "/learning-lab/programmes/entrepreneurship-under-constraint#demo",
        action: "Try the sample lesson",
      },
    ],
  },
  {
    id: "roadmap",
    audience: "On our roadmap",
    title: "From school to doctoral study.",
    intro:
      "Our vision is free learning at every stage. These pathways are planned, not open. Today the Lab is for adults aged 18 and over.",
    services: [
      {
        id: "school-learning",
        name: "School learning",
        status: "planned",
        summary:
          "KG 1 through Class 12: literacy, numeracy, scientific curiosity and independent thinking.",
        format: "Planned · not available yet; current services are not for children",
        href: "/learning-lab/purpose#school-learning",
        action: "Read the school-learning plan",
      },
      {
        id: "engineering",
        name: "Engineering",
        status: "planned",
        summary:
          "B.Tech-level learning in computer science and electronics, connecting concepts with practical projects.",
        format: "Planned · introductory applied-AI exercises are open today",
        href: "/learning-lab/purpose#engineering",
        action: "Read the engineering plan",
      },
    ],
  },
];

/** Homepage "Choose where to start": one goal per audience, each pointing to a service. */
export const startGoals = [
  {
    audience: "First-time founders",
    goal: "Test a business idea",
    detail: "14 days · about 30 minutes a day",
    href: "/learning-lab/venture-experiment",
  },
  {
    audience: "Aspiring entrepreneurs",
    goal: "Learn entrepreneurship step by step",
    detail: "Seven modules · self-paced",
    href: "/learning-lab/entrepreneurship",
  },
  {
    audience: "Student founders",
    goal: "Use ready-made founder tools",
    detail: "Eight tools · no sign-up",
    href: "/learning-lab/toolkit",
  },
  {
    audience: "Adult learners",
    goal: "Take a short course",
    detail: "Six courses · 20–25 minutes each",
    href: "/learning-lab/free-courses",
  },
  {
    audience: "E-Cells and faculty",
    goal: "Bring the Lab to your college",
    detail: "Workshop kit · AI Viva Bot · proposed pilots",
    href: "/learning-lab/services#institutions",
  },
  {
    audience: "Professionals",
    goal: "Build skills for work",
    detail: "Three proposed programmes · sample lessons open",
    href: "/learning-lab/services#professionals",
  },
] as const;

/** What every service shares. */
export const whyLearnWithLab = [
  {
    title: "Learn by doing",
    text: "Every path ends in action: learn, apply, experiment, validate, then build.",
  },
  {
    title: "A plan that fits you",
    text: "Enter your time, skills, customer access and budget to get your next task. It never spends money or contacts anyone for you.",
  },
  {
    title: "Feedback from the founder",
    text: "Up to 20 learners at a time (adults at college) get written feedback from Dr. Swapnil Sahoo at each stage of the experiment. Turnaround is not guaranteed.",
  },
  {
    title: "An AI mentor on hand",
    text: "Ask by text or voice. Prepared answers point you to the right free resource; it does not invent answers or contact anyone for you.",
  },
  {
    title: "Evidence over opinion",
    text: "Count what customers do, not what they say. Stopping after an honest test is a valid result.",
  },
  {
    title: "Free for everyone",
    text: "No fees, no paid version and no checkout for learning. Voluntary support never buys anything.",
  },
] as const;

/** How a learner moves through the Lab. */
export const howItWorks = [
  {
    title: "Choose your goal",
    text: "Pick a service above, or ask the AI mentor where to begin.",
  },
  {
    title: "Learn the essentials",
    text: "Short courses, the founder toolkit and the seven-module journey give you the ideas and templates.",
  },
  {
    title: "Apply it for real",
    text: "Run the 14-day experiment with real customers, about 30 minutes a day.",
  },
  {
    title: "Decide on evidence",
    text: "Continue, change or stop. Up to 20 learners at a time (adults at college) also get written founder feedback.",
  },
] as const;

/** Questions about the services. Answers repeat the policies and the FAQ page. */
export const serviceFaqs = [
  [
    "Is everything really free?",
    "Yes. The Lab charges no fees for any service, including future programmes. The only payment on the website is an optional voluntary contribution, and it buys nothing.",
  ],
  [
    "Who can use the Lab?",
    "Adults aged 18 and over. Most services need no account. A school-learning pathway is planned, not open.",
  ],
  [
    "Do you run live classes?",
    "Not yet. Everything open today is self-paced. The three programmes with live sessions are proposed; their dates, format and capacity will be published before they open.",
  ],
  [
    "Will I get a certificate?",
    "Not for the free self-paced services. A Certificate of Completion is proposed for future programmes, under the published certificate policy. It is not a degree or accreditation.",
  ],
  [
    "How does founder feedback work?",
    "During the 14-day experiment, adults at college can register for one of up to 20 active places and get written feedback from Dr. Swapnil Sahoo at each stage. Turnaround is not guaranteed.",
  ],
  [
    "Can my college or E-Cell use the Lab?",
    "Yes. The free kit for E-Cells and faculty runs a 75-minute customer-test workshop. Pilots of full programmes are proposed; request a pilot discussion to explore one.",
  ],
  [
    "Will the Lab help me raise funding?",
    "No. The Lab teaches how fundraising works as general education. It does not arrange funding or introduce investors.",
  ],
] as const;

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
