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

export const linkedInArticles: Essay[] = [
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Eloquence: The Gift — and the Danger — of Powerful Words",
    href: "https://www.linkedin.com/pulse/eloquence-giftand-dangerof-powerful-words-dr-swapnil-sahoo-pqwhe",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Day 5: Data — Why Machines Stop Following Rules and Start Finding Patterns",
    href: "https://www.linkedin.com/pulse/day-5-data-why-machines-stop-following-rules-start-finding-sahoo-toize",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Why Outsiders Often See What Insiders Miss",
    href: "https://www.linkedin.com/pulse/why-outsiders-often-see-what-insiders-miss-dr-swapnil-sahoo-jckde",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Day 4: What Is Machine Learning?",
    href: "https://www.linkedin.com/pulse/day-4-what-machine-learning-learn-ai-31-days-30-minutes-sahoo-hs8te",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Day 3: Types of AI — Predictive, Generative and Agentic",
    href: "https://www.linkedin.com/pulse/day-3-types-ai-predictive-generative-agentic-learn-31-sahoo-bhxre",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Beyond the Hype: Why AI Isn't Magic (and Why That's a Good Thing)",
    href: "https://www.linkedin.com/pulse/beyond-hype-why-ai-isnt-magic-thats-good-thing-dr-swapnil-sahoo-alyve",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Day 2: A Short History of AI",
    href: "https://www.linkedin.com/pulse/learn-ai-31-days-30-minutes-day-2-short-history-dr-swapnil-sahoo-hrmxe",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2026",
    title: "Day 1: What Is Artificial Intelligence?",
    href: "https://www.linkedin.com/pulse/learn-ai-31-days-30-minutes-day-1-what-artificial-dr-swapnil-sahoo-tdnqe",
  },
  {
    outlet: "LinkedIn",
    date: "Jun 2026",
    title: "The Ghost in the Machine — Can AI Be Conscious?",
    href: "https://www.linkedin.com/pulse/ghost-machine-can-ai-conscious-dr-swapnil-sahoo-oau0e",
  },
  {
    outlet: "LinkedIn",
    date: "Oct 2024",
    title: "Calling All Family Business Owners and Entrepreneurs",
    href: "https://www.linkedin.com/pulse/calling-all-family-business-owners-entrepreneurs-swapnil-sahoo-zroee",
  },
  {
    outlet: "LinkedIn",
    date: "Aug 2018",
    title: "Eliminating Mobility Silos",
    href: "https://www.linkedin.com/pulse/eliminating-mobility-silos-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Aug 2018",
    title: "Innovation in Alliances and Partnerships for Enterprise Mobility Management",
    href: "https://www.linkedin.com/pulse/innovation-alliances-partnerships-enterprise-mobility-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2018",
    title: "India's EdTech Industry and Future",
    href: "https://www.linkedin.com/pulse/indias-edtech-industry-future-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Jul 2018",
    title: "Future of Financial Markets in the United Kingdom Post-Brexit",
    href: "https://www.linkedin.com/pulse/future-financial-markets-united-kingdom-post-breexit-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Apr 2017",
    title: "The Future of Global Digital Payments",
    href: "https://www.linkedin.com/pulse/future-global-digital-payments-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Apr 2017",
    title: "Millennials: The Fastest-Growing Customer Base — A Banking Point of View",
    href: "https://www.linkedin.com/pulse/millennials-fastest-growing-customer-base-banking-pov-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Apr 2017",
    title: "Banking on Blockchain — Literally",
    href: "https://www.linkedin.com/pulse/banking-blockchain-literally-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Aug 2015",
    title: "Value-Added Services and Big Data: To Be or Not to Be",
    href: "https://www.linkedin.com/pulse/value-added-services-big-data-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Jun 2015",
    title: "Monetizing Cloud Computing",
    href: "https://www.linkedin.com/pulse/monetizing-cloud-computing-swapnil-sahoo-6011002933980774400",
  },
  {
    outlet: "LinkedIn",
    date: "May 2015",
    title: "Data Post 1",
    href: "https://www.linkedin.com/pulse/data-post-1-swapnil-sahoo",
  },
  {
    outlet: "LinkedIn",
    date: "Jun 2014",
    title: "Harnessing BI",
    href: "https://www.linkedin.com/pulse/20140610042621-27661454-harnessing-bi",
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
  {
    outlet: "ET Now",
    date: "Jan 2025",
    description: "Budget 2025: easing regulation to grow startup jobs",
    href: "https://www.etnownews.com/budget/budget-2025-expectations-education-sectors-expectations-from-this-years-budget-article-117516818",
  },
  {
    outlet: "Education21",
    date: "Jan 2025",
    description: "Budget 2025: Startup India, skill gaps & tax relief",
    href: "https://education21.in/union-budget-2025-expectations-for-education-and-skills/",
  },
  {
    outlet: "Curriculum Magazine",
    date: "Jan 2025",
    description: "Budget 2025: closing skill gaps in AI, IoT & green tech",
    href: "https://curriculum-magazine.com/union-budget-2025-expectations-for-education-and-skills/",
  },
];
