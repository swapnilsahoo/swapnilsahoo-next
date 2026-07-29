export interface ConferenceCluster {
  badge: string;
  venue: string;
  highlight: string;
  note: string;
  papers: string[];
}

export const bamCluster: ConferenceCluster = {
  badge: "BAM 2025",
  venue: "Kent Business School, UK",
  highlight: "4 papers · dissertation cluster",
  note: 'Drawn from the doctoral dissertation, "Entrepreneurial Resourcefulness in Resource-Constrained Environments."',
  papers: [
    "Thriving with Less: Family Entrepreneurship in Institutional Voids",
    "Towards a Unified Theory of Entrepreneurship: A Neurodiverse Promise of the Spiky Profile",
    "Conceptualising Family Business Resourcefulness in Resource-Constrained Environments",
    "Resourcefulness of Family Business in Penurious Environments",
  ],
};

export interface ConferenceEntry {
  badge: string;
  location?: string;
  title: string;
  subtitle?: string;
  award?: string;
}

export const conferenceEntries: ConferenceEntry[] = [
  {
    badge: "AOM 2026",
    location: "Philadelphia, PA, USA · 4 Aug, 1:15–2:45 PM · Marriott Downtown, Franklin 8",
    title:
      "Entrepreneurship Under Constraint: How Bricolage Transitions into Effectuation in Family Businesses",
    subtitle: "86th Annual Meeting of the Academy of Management",
  },
  {
    badge: "AOM 2025",
    location: "Copenhagen, Denmark · Jul 25–29",
    title:
      "Conceptualising Family Business Resourcefulness: A Socio-material Perspective on Family Firm Advantages in Resource-Constrained Environments",
    subtitle: "85th Annual Meeting of the Academy of Management",
  },
  {
    badge: "XLRI · 2024",
    title:
      "Cultivating Trust: Human Capital and Organizational Citizenship Behaviour in Family Enterprises",
    subtitle:
      "International Industrial Relations Conference · with Leeds University Business School & Friedrich Ebert Stiftung",
  },
  {
    badge: "XLRI · 2024",
    title: "Navigating the Maze: Corporate Bribery and Ethical Choices in Indian Family Firms",
    subtitle: "International Conference on Enabling Social and Business Responsibility",
  },
  {
    badge: "XLRI · 2024",
    title:
      "Conceptualizing Family Business Resourcefulness (FBR) in a Resource-Constrained Environment",
    subtitle: "Doctoral Colloquium on AI & Sustainability",
  },
  {
    badge: "MERC 2023 · IIM Kashipur",
    title: "A Study of How Family Involvement Impacts Sustainable Innovation in Family Firms",
    subtitle: "Entrepreneurship Track 1",
    award: "🏅 Best Paper in Track",
  },
  {
    badge: "SBM 2023 · IIT Roorkee + ASU",
    title:
      "An In-depth Analysis of the Impact of Family Involvement on Sustainable Innovation in Family Firms",
  },
  {
    badge: "POMS India 2023 · XLRI",
    title:
      "Exploring the Innovation Heritage: Family Involvement in Propelling R&D within Family Enterprises",
  },
  {
    badge: "IIT Kharagpur · 9th MDC",
    title: "Bibliometrics Analysis of Family Firms Internationalization",
  },
];
