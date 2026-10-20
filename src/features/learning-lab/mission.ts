export const labMission = {
  purpose: "Making learning freely accessible to everyone",
  promise: "Learn freely. Think independently. Build your future.",
  proposedFoundation: "Swapnil Sahoo Open Learning Foundation",
  proposedCompany: "Swapnil Sahoo Ventures Private Limited",
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
