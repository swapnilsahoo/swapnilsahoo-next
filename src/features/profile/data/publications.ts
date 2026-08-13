import type { Publication } from "@/features/profile/types";

export const journalArticles: Publication[] = [
  {
    title:
      "Entrepreneurship Under Constraint: How Bricolage Transitions into Effectuation in Family Businesses",
    meta: "with Munish Thakur · Academy of Management Proceedings",
    year: "2026",
    href: "https://journals.aom.org/doi/abs/10.5465/AMPROC.2026.12395abstract",
    category: "journal",
    badge: "AOM 2026",
    image: "/images/gallery/aom-2026-proceedings-abstract.jpg",
    imageAlt: "Academy of Management Proceedings abstract page for this paper",
  },
  {
    title:
      "Evaluating the Efficiency of Van Dhan Yojana Using DEA: Strategic Insights for Tribal Development",
    meta: "with N. Mishra & N. Mishra · International Research Journal of Multidisciplinary Studies",
    year: "2026",
    href: "https://www.irjms.com/wp-content/uploads/2026/01/Manuscript_IRJMS_08719_WS.pdf",
    category: "journal",
    badge: "Scopus / WoS",
  },
  {
    title:
      "Impact of Institutional Pressures and Security on Blockchain Technology Adoption and Organizational Performance: An Empirical Study",
    meta: "The Journal of Technology Transfer · Springer",
    year: "2024",
    href: "https://link.springer.com/article/10.1007/s10961-024-10098-2",
    category: "journal",
    badge: "Peer-reviewed",
  },
];

export const bookChapters: Publication[] = [
  {
    title: "An Overview of Ethics and the Indian Philosophy",
    meta: "In: Applied Ethics and Rationality (SAPERE, Vol. 74) · Springer · ed. Kuruvilla Pandikattu",
    year: "2025",
    href: "https://link.springer.com/chapter/10.1007/978-3-031-92139-1_1",
    category: "chapter",
    badge: "Scopus",
  },
  {
    title:
      "Pulling the Chariot Together: Jagannath, Collective Spirituality, and the Future of Inclusive Organizations",
    meta: "In: Inclusive Spirituality and Ethical Leadership · Spirituality Centre, XLRI · ed. Kuruvilla Pandikattu SJ · pp. 49–58",
    year: "2025",
    href: "https://zenodo.org/records/17248488",
    category: "chapter",
    badge: "Chapter 6",
  },
];

export interface TeachingCase {
  title: string;
  publication: string;
  year: string;
}

export const teachingCases: TeachingCase[] = [
  {
    title: "How Granules India Rebuilt Trust Through Radical Transparency",
    publication: "Business Standard Smart",
    year: "2026",
  },
  {
    title: "How Cycle Pure and Wagh Bakri Built Moats Out of Value",
    publication: "Business Standard Smart",
    year: "2026",
  },
  {
    title: "Silence as Strategy: How Zerodha and Razorpay Won Without Noise",
    publication: "Business Standard Smart",
    year: "2026",
  },
];

export interface Essay {
  outlet: string;
  date: string;
  title: string;
  href: string;
}

export const authoredEssays: Essay[] = [
  {
    outlet: "CSR Times",
    date: "Jun 2026",
    title: "Sustainability and Strategy: Why Responsible Growth Is Now a Business Imperative",
    href: "https://csrtimes.org/sustainability-and-strategy-why-responsible-growth-is-now-a-business-imperative/",
  },
  {
    outlet: "CSR Times",
    date: "Feb 2026",
    title: "Why Budget 2026 Must Be a Doctrine of Defence, Not Just a Statement of Accounts",
    href: "https://csrtimes.org/budget-2026-defence-doctrine/",
  },
  {
    outlet: "India Today",
    date: "Dec 2025",
    title: "VRS or Early Retirement? Why Your PF Needs a New Story for a New Life",
    href: "https://www.indiatoday.in/business/story/vrs-early-retirement-planning-india-how-to-manage-pf-corpus-after-exiting-job-early-retirement-finances-2840452-2025-12-23",
  },
  {
    outlet: "Indian Express",
    date: "Nov 2025",
    title: "CAT 2025: How to Master the 40-Minute Race Per Section",
    href: "https://indianexpress.com/article/education/cat-2025-how-to-master-40-minute-race-per-section-iim-mba-admission-10367290/",
  },
  {
    outlet: "BW Education",
    date: "Jul 2025",
    title: "Neuroscience of Learning in an AI Era",
    href: "https://www.bweducation.com/article/neuroscience-of-learning-in-an-ai-era-562220",
  },
  {
    outlet: "DataQuest",
    date: "Feb 2025",
    title: "How Entrepreneurs Are Building a More Secure Digital Future",
    href: "https://www.dqindia.com/features/safer-internet-day-how-entrepreneurs-are-building-a-more-secure-digital-future-8707009",
  },
];

export interface PressMention {
  outlet: string;
  date: string;
  description: string;
  href: string;
}

export const pressMentions: PressMention[] = [
  {
    outlet: "Open Magazine",
    date: "Jun 2026",
    description: "OpenAI's $2.4B ad bet before its IPO, and the shift to point-of-intent advertising",
    href: "https://openthemagazine.com/branding-marketing-and-advertising/openais-cannes-gambit-the-24-billion-ad-bet-before-the-ipo",
  },
  {
    outlet: "NDTV",
    date: "Sep 2025",
    description: "India's employability gap & Yogya Bharat Mission",
    href: "https://www.ndtv.com/education/indias-employability-gap-to-be-bridged-with-yogya-bharat-mission-experts-9290108",
  },
  {
    outlet: "Business Standard",
    date: "Jul 2025",
    description: "Depositing big cash sums: tax rules & I-T notices",
    href: "https://www.business-standard.com/finance/personal-finance/depositing-big-cash-sums-tax-rules-i-t-notices-and-what-to-watch-out-for-125071001232_1.html",
  },
  {
    outlet: "GoodReturns",
    date: "Jul 2025",
    description: "Why earning just over ₹50L can be a net loss",
    href: "https://www.goodreturns.in/personal-finance/taxes/why-earning-just-above-rs-50l-can-be-a-net-loss-dissecting-the-hidden-slab-penalties-1440791.html",
  },
  {
    outlet: "India Today",
    date: "Jul 2025",
    description: "Who is poor? Income inequality & the PPP debate",
    href: "https://www.indiatoday.in/business/story/india-poverty-income-inequality-ppp-mmrp-who-is-poor-world-bank-niti-aayog-2750057-2025-07-03",
  },
  {
    outlet: "Business Standard",
    date: "Jun 2025",
    description: "RBI MPC meeting highlights",
    href: "https://www.business-standard.com/finance/news/rbi-mpc-meeting-live-updates-governor-sanjay-malhotra-june-2025-monetary-policy-committee-meeting-repo-rate-125060600078_1.html",
  },
  {
    outlet: "CNBC TV18",
    date: "Jan 2025",
    description: "Budget 2025 expectations & the steel industry",
    href: "https://www.cnbctv18.com/budget/union-budget-2025-expectations-live-tax-relief-gst-fm-nirmala-sitharaman-stock-market-steel-industry-january-30-liveblog-19548795.htm",
  },
  {
    outlet: "Times Now",
    date: "Jan 2025",
    description: "Economic Survey 2025 live commentary",
    href: "https://www.timesnownews.com/business-economy/budget-2025-expectations-live-updates-finance-minister-nirmala-sitharaman-income-tax-slabs-expectations-economic-survey-liveblog-117719709",
  },
  {
    outlet: "Financial Express",
    date: "Jan 2025",
    description: "Budget 2025: transforming India's education landscape",
    href: "https://www.financialexpress.com/jobs-career/education-union-budget-2025-stakeholders-expectations-for-transforming-indias-education-landscape-3712498/",
  },
  {
    outlet: "Business Standard",
    date: "Jan 2025",
    description: "Budget 2025 expectations: geospatial & satellite tech",
    href: "https://www.business-standard.com/budget/news/union-budget-2025-expectations-live-updates-nirmala-sitharaman-tax-relief-education-india-gdp-budget-latest-news-125011700390_1.html",
  },
];
