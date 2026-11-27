export const labMission = {
  purpose: "Making learning freely accessible to everyone",
  promise: "Learn freely. Think independently. Build your future.",
} as const;

/**
 * Purpose, mission, vision and values of Swapnil Sahoo Learning Lab Private Limited, written
 * at the founder's request on 27 November 2026. They build on the founder's own lines above
 * and on the knowing–doing gap in entrepreneurship-journey.ts. docs/learning-lab/services-and-purpose.md
 * records the reasoning; keep the claims within what the Lab offers today.
 */
export const labPurpose = {
  headline: "Make learning free. Help people act on it.",
  statement:
    "Swapnil Sahoo Learning Lab Private Limited exists to make learning freely accessible to everyone, and to help people turn what they learn into action.",
  why: "Courses, books and startup advice are everywhere. Turning them into action is the hard part. We start with entrepreneurship: the gap between knowing entrepreneurship and doing it.",
  pillars: [
    {
      label: "Purpose",
      question: "Why we exist",
      text: "To make learning freely accessible to everyone, and to help people turn what they learn into action.",
    },
    {
      label: "Mission",
      question: "What we do now",
      text: "Help aspiring entrepreneurs aged 18 and over move from knowing entrepreneurship to doing it, with free tools, short courses, a 14-day customer experiment and a seven-module journey from startup idea to venture growth.",
    },
    {
      label: "Vision",
      question: "Where we are going",
      text: "Free, practical learning from school to doctoral study, across entrepreneurship, management, engineering and research.",
    },
  ],
  values: [
    {
      title: "Free for every learner",
      text: "Everything we offer is free. Voluntary support helps keep it that way and never buys a place, feedback or a certificate.",
    },
    {
      title: "Learning by doing",
      text: "Understand, apply, question, act. Each resource ends in something you do, not only something you read.",
    },
    {
      title: "Evidence over opinion",
      text: "Count what people do, not what they say. We hold our own ideas to the same test.",
    },
    {
      title: "Honest promises",
      text: "We say what is open, what is planned and what we cannot promise. No funding, job, business success or certificate is guaranteed.",
    },
    {
      title: "Independent thinking",
      text: "We help you reason for yourself. AI is a tool; human judgement stays responsible.",
    },
  ],
} as const;

export const educationPathways = [
  {
    id: "school-learning",
    title: "School Learning",
    status: "Planned",
    scope:
      "KG 1 through Class 12: literacy, numeracy, scientific curiosity and independent thinking.",
    today:
      "A structured school-learning pathway is not available yet. The current adult pilot and account services are not for children.",
    href: "/learning-lab/purpose#school-learning",
    action: "Read the school-learning plan",
  },
  {
    id: "engineering",
    title: "Engineering",
    status: "Planned",
    scope:
      "B.Tech-level learning in computer science and electronics, connecting concepts with practical projects.",
    today:
      "A complete engineering pathway is planned. Existing introductory applied-AI exercises are open today; they are not a B.Tech curriculum.",
    href: "/learning-lab/purpose#engineering",
    action: "Read the engineering plan",
  },
  {
    id: "management",
    title: "Management",
    status: "Resources available · pathway expanding",
    scope:
      "Build the knowledge, analytical skills and managerial judgement associated with a two-year MBA.",
    today:
      "Start with the published strategy teaching sessions, case practice, applied-AI lessons and business tools. Coverage is growing; this is not yet a complete MBA curriculum.",
    href: "/teaching/2-year-mba",
    action: "Explore management resources",
  },
  {
    id: "research-entrepreneurship",
    title: "Research & Entrepreneurship",
    status: "Resources available · pathway expanding",
    scope:
      "Research methods and doctoral-level learning in strategy and entrepreneurship, alongside practical venture exploration.",
    today:
      "Research-methods resources and entrepreneurship exercises are open. A comprehensive doctoral-level pathway remains a long-term goal.",
    href: "/research/phd-coursework",
    action: "Explore research resources",
  },
] as const;
