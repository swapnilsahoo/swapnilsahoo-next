import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { LinkedInIcon } from "@/components/icons/SocialIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";
import { linkedInHighlights } from "@/features/profile/data/linkedin";

import { oneYearMba } from "../mbaData";
import styles from "./OneYearMbaExperience.module.css";

const mbaClassroomPost = linkedInHighlights[1];

const executiveStrategyQuestions = [
  "When your experience says “this worked before,” what conditions made it true—and do they still hold here?",
  "This course gives each idea one case and one pass before the next module begins. Is that enough to change your mind?",
  "When a firm claims synergy from owning more of its value chain, what has to be true for that to beat the added coordination cost?",
] as const;

const sessionActs = [
  {
    number: "01",
    sessions: "Sessions 01—04",
    title: "Read the arena",
    question: "What is strategy—and what shapes the playing field?",
    caseStudy: "Tesla",
    topics: ["Purpose & value", "Industry structure", "Ecosystems & game theory"],
    citations: [1, 3, 4],
  },
  {
    number: "02",
    sessions: "Sessions 05—08",
    title: "Locate advantage",
    question: "Why should this firm win—and for how long?",
    caseStudy: "Patagonia",
    topics: ["Resources & value chain", "Creating advantage", "Cost vs differentiation"],
    citations: [1, 5],
  },
  {
    number: "03",
    sessions: "Sessions 09—10",
    title: "Redraw the firm",
    question: "How do technology and corporate scope create value?",
    caseStudy: "NVIDIA",
    topics: ["Technology & innovation", "Portfolio logic", "Core competence"],
    citations: [1, 8],
  },
  {
    number: "04",
    sessions: "Sessions 11—13",
    title: "Choose the boundaries",
    question: "What belongs inside the firm—and across which markets?",
    caseStudy: "Amazon",
    topics: ["Vertical integration", "Global strategy", "Diversification"],
    citations: [1, 6],
  },
] as const;

// Interactive session pages: a separate, richer set of standalone HTML pages
// (public/teaching/1-year-mba/*.html) predates this syllabus and uses its own internal
// numbering/filenames, which only partially line up with the plan below — several files are
// mistitled relative to their actual content, and a few cover topics this condensed 13-session
// plan doesn't include at all. Only sessions with a confident topical match get a link.
const interactive = (file: string) => `/teaching/1-year-mba/${encodeURIComponent(file)}`;

const sessionPlan = [
  {
    number: "01",
    title: "Introduction to Strategy",
    topics: ["What is strategy?", "Why do firms need it?", "How is strategy made?"],
    readings: [
      "Case · Elon Musk at Tesla (2024)",
      "Article · Porter, M. E. (1996). What Is Strategy? Harvard Business Review.",
      "Textbook · Chapter 1",
    ],
    interactiveHref: interactive("session1.html"),
  },
  {
    number: "02",
    title: "Framework for Strategic Analysis",
    topics: ["Vision–Mission–Strategy / Purpose–Values–Strategy", "Strategy as a quest for value"],
    readings: [
      "Case · Elon Musk at Tesla (2024)",
      "Article · Porter, M. E. (1996). What Is Strategy? Harvard Business Review.",
      "Textbook · Chapter 2",
    ],
    interactiveHref: interactive("session3.html"),
  },
  {
    number: "03",
    title: "Industry Analysis: The Fundamentals",
    topics: ["Analysis of the external environment of business", "Porter’s Five (six) Forces"],
    readings: [
      "Case · Elon Musk at Tesla (2024)",
      "Article · Porter, M. E. (2008). The Five Competitive Forces That Shape Strategy. Harvard Business Review.",
      "Textbook · Chapter 3",
    ],
    interactiveHref: interactive("session4.html"),
  },
  {
    number: "04",
    title: "Beyond the Five Forces",
    topics: ["Ecosystems and business models", "Game theory and competitor analysis"],
    readings: [
      "Case · Elon Musk at Tesla (2024)",
      "Video · Selected videos on Steve Jobs",
      "Article · Porter, M. E. (2008). The Five Competitive Forces That Shape Strategy. Harvard Business Review.",
      "Textbook · Chapter 4",
    ],
    interactiveHref: undefined,
  },
  {
    number: "05",
    title: "Internal Analysis & Resource-Based View",
    topics: [
      "Internal analysis of the company",
      "SWOT analysis",
      "Value chain analysis",
      "Resource-based view of the firm",
    ],
    readings: [
      "Case · Patagonia: “Earth Is Now Our Only Shareholder”",
      "Article · Porter, M. E. (2008). The Five Competitive Forces That Shape Strategy. Harvard Business Review.",
      "Textbook · Chapter 5",
    ],
    interactiveHref: interactive("Session_5_Internal_Firm_Analysis_v0.91.html"),
  },
  {
    number: "06",
    title: "Creating Competitive Advantage",
    topics: [
      "How a firm can create competitive advantage",
      "External sources of competitive advantage",
      "Internal sources of competitive advantage",
    ],
    readings: [
      "Case · Patagonia: “Earth Is Now Our Only Shareholder”",
      "Article · Ghemawat, P., & Rivkin, J. W. (1998). Creating Competitive Advantage.",
      "Textbook · Chapter 6",
    ],
    interactiveHref: undefined,
  },
  {
    number: "07",
    title: "Sustaining Competitive Advantage",
    topics: ["How competitive advantage is sustained", "Deterrence and preemption"],
    readings: [
      "Case · Patagonia: “Earth Is Now Our Only Shareholder”",
      "Article · Ghemawat, P., & Pisano, G. P. (1997). Sustaining Superior Performance: Commitments and Capabilities.",
      "Textbook · Chapter 7",
    ],
    interactiveHref: undefined,
  },
  {
    number: "08",
    title: "Differentiation & Cost Leadership",
    topics: ["Generic strategies", "Low-cost strategy", "Differentiation and focus strategies"],
    readings: [
      "Case · Patagonia: “Earth Is Now Our Only Shareholder”",
      "Article · Porter, M. E. (1996). What Is Strategy? Harvard Business Review.",
      "Textbook · Chapter 8",
    ],
    interactiveHref: interactive(
      "Session6_Business Strategy_Differentiation, CostLeadership_BlueOceans_v0.8.html",
    ),
  },
  {
    number: "09",
    title: "Managing Technology & Innovation",
    topics: ["Application of technology", "Innovation-led strategy formulation"],
    readings: [
      "Case · NVIDIA, Inc. in 2024 and the Future of AI",
      "Article · Ghemawat, P., & Pisano, G. P. (1997). Sustaining Superior Performance: Commitments and Capabilities.",
      "Textbook · Chapter 9",
    ],
    interactiveHref: interactive(
      "Session_7_Business_Strategy_Innovation_Entrepreneurship_Platforms_V0.003.html",
    ),
  },
  {
    number: "10",
    title: "Introduction to Corporate Strategy",
    topics: [
      "Portfolio approach, synergy approach and core competencies",
      "Transaction costs and the scope of the firm",
    ],
    readings: [
      "Case · NVIDIA, Inc. in 2024 and the Future of AI",
      "Article · Porter, M. E. (1987). From Competitive Advantage to Corporate Strategy. Harvard Business Review.",
      "Textbook · Chapter 10",
    ],
    interactiveHref: interactive("Session8_Corporate Strategy_v0.8.html"),
  },
  {
    number: "11",
    title: "Vertical Integration",
    topics: [
      "Portfolio approach, synergy approach and core competencies",
      "Transaction costs and the scope of the firm",
    ],
    readings: [
      "Case · Amazon in 2024",
      "Article · Osegowitsch, T., & Madhok, A. (2003). Vertical Integration Is Dead, or Is It? Business Horizons.",
      "Textbook · Chapter 11",
    ],
    interactiveHref: interactive("Session8_Corporate Strategy_v0.8.html"),
  },
  {
    number: "12",
    title: "Global Strategy & MNC",
    topics: [
      "Competitive advantage in an international context",
      "Multinational strategies: global integration versus national differentiation",
    ],
    readings: [
      "Case · Amazon in 2024",
      "Article · Porter, M. E. (1987). From Competitive Advantage to Corporate Strategy. Harvard Business Review.",
      "Textbook · Chapter 12",
    ],
    interactiveHref: interactive("Session_10_Global_Strategy_v0.84.html"),
  },
  {
    number: "13",
    title: "Diversification Strategies",
    topics: ["Motives for diversification", "Competitive advantage from diversification"],
    readings: [
      "Case · Amazon in 2024",
      "Article · Porter, M. E. (1987). From Competitive Advantage to Corporate Strategy. Harvard Business Review.",
      "Textbook · Chapter 13",
    ],
    interactiveHref: interactive("Session8_Corporate Strategy_v0.8.html"),
  },
] as const;

const learningMoves = [
  {
    icon: CompassIcon,
    label: "Diagnose",
    title: "See the system",
    description: "Move between industry structure, resources, competitors and firm boundaries.",
  },
  {
    icon: BricolageIcon,
    label: "Decide",
    title: "Make the trade-off",
    description: "Commit under uncertainty before the room reveals a comfortable answer.",
  },
  {
    icon: NetworkIcon,
    label: "Defend",
    title: "Earn the recommendation",
    description: "Use evidence, challenge assumptions and revise when a stronger argument appears.",
  },
] as const;

const studioRhythm = [
  {
    step: "Before",
    title: "Prepare the point of view",
    text: "Read the case, test the numbers and arrive with a recommendation—not a summary.",
  },
  {
    step: "In the room",
    title: "Stress-test the decision",
    text: "Listen, challenge, compare experience and make the trade-offs visible.",
  },
  {
    step: "Last 8 minutes",
    title: "Retrieve without a screen",
    text: "Handwrite the central idea and apply it while the reasoning is still alive.",
  },
] as const;

const fieldLoop = [
  ["01", "Interview", "Speak live with a founder, CXO or senior team member."],
  ["02", "Decode", "Trace struggles, pivots, resources, competition and adaptation."],
  ["03", "Recommend", "Translate the evidence into a defensible strategic choice."],
  ["04", "Return", "Send the recommendation back and seek a feasibility response."],
] as const;

const assessmentColours = [
  "bg-blue-600",
  "bg-blue-400",
  "bg-amber-400",
  "bg-amber-600",
  "bg-teal-700",
] as const;

const assessmentPlan = [
  {
    title: "Class subjective & objective quiz",
    marks: "25",
    instrument: "Embedded questions",
    alignment: "CO1 / PO1 · 15  |  CO2 / PO2 · 10",
  },
  {
    title: "Reflection papers (2 × 5)",
    marks: "10",
    instrument: "Rubric",
    alignment: "CO1 / PO1 · 5  |  CO2 / PO2 · 5",
  },
  {
    title: "Midterm examination",
    marks: "15",
    instrument: "Embedded questions",
    alignment: "CO1 / PO1 · 10  |  CO2 / PO2 · 5",
  },
  {
    title: "End-term examination",
    marks: "30",
    instrument: "Embedded questions",
    alignment: "CO1 / PO1 · 15  |  CO2 / PO2 · 15",
  },
  {
    title: "Field analysis on startups",
    marks: "20",
    instrument: "Rubric",
    alignment: "CO1 / PO1 · 10  |  CO2 / PO2 · 10",
  },
] as const;

const deliverables = [
  ["By Session 06", "Reflective Note 1", "Handwritten submission"],
  ["Before Session 08", "Midterm exam", "Concepts, analysis and decisions"],
  ["By Session 11", "Group assignment", "Report/recommendation emailed to the founder or CEO"],
  ["By Session 13", "Reflective Note 2", "Handwritten submission"],
  ["After Session 13", "End-term exam", "Cumulative course assessment"],
] as const;

const outcomes = [
  "Explain what makes a strategy coherent and capable of producing advantage.",
  "Connect the parts of a business so they operate in strategic harmony.",
  "Assess risk and make choices from collected and analyzed evidence.",
  "Read industry structure and recommend a defensible market position.",
  "Diagnose, enhance and sustain a firm’s competitive advantage.",
] as const;

const programmeOutcomes = [
  [
    "PO-1",
    "Conceptual understanding and practical application of pertinent theories to solve business and organizational problems.",
  ],
  ["PO-2", "Demonstrate analytic and decision-making skills."],
  ["PO-3", "Ethical awareness and/or socio-cultural sensitization."],
  ["PO-4", "Demonstrate managerial and leadership skills to achieve glocal organizational goals."],
] as const;

const classroomStandards = [
  "Preparation, active listening and participation directly determine the quality of the shared learning experience.",
  "Use the final eight minutes for a handwritten, ungraded practice quiz on one A4 sheet.",
  "Phones, laptops and entertainment devices remain off during class.",
  "Attribute ideas and words rigorously; plagiarism is prohibited.",
  "Maintain respectful discourse without interruptions, off-topic remarks or personal critiques.",
  "Attendance is mandatory; chronic lateness and early departures are penalized.",
  "Complete the readings; an optional one-page, non-graded case write-up may be submitted before each session using Appendix A.",
  "Treat the classroom as a cost-free environment for experimenting, contributing and learning to play the game.",
  "Use Appendices A–D for case analysis, article analysis, participation behaviours and the startup project.",
  "A post-class participation card may record the case, date and contribution made.",
  "When a peer presents, arrive with questions; presenters analyze environments, options and recommendations for long-term performance.",
] as const;

const courseReadingCanon = [
  "Porter, M. E. (1980). Competitive Strategy: Techniques for Analyzing Industries and Competitors.",
  "Rumelt, R. P. (2011). Good Strategy/Bad Strategy.",
  "Courtney, H., Kirkland, J., & Viguerie, P. Strategy Under Uncertainty; Eisenmann et al. (2006). Strategies for Two-Sided Markets.",
  "Mankins, M. C., & Steele, R. Turning Great Strategy into Great Performance.",
  "Campbell, A., Goold, M., & Alexander, M. (1995). Corporate Strategy: The Quest for Parenting Advantage.",
  "Buzzell, R. D. Is Vertical Integration Profitable?; Goold & Campbell. Why Diversify?",
  "Dewhurst, M., Harris, J., & Heywood, S. Understanding Your Globalization Penalty; Laeven & Levine (2006). Diversification Discount in Financial Conglomerates.",
  "Ramachandran, J., Manikandan, K. S., & Pant, A. (2013). Why Conglomerates Thrive.",
  "Kaplan, S. N. Mergers and Acquisitions: A Financial Economics Perspective.",
  "Mintzberg, H. (1987). Crafting Strategy.",
  "Collins, J. Good to Great; Christensen, C. M. The Innovator’s Dilemma.",
  "Niedermeyer, E. Ludicrous: The Unvarnished Story of Tesla Motors.",
  "Collis, D. J., & Rukstad, M. G. (2008). Can You Say What Your Strategy Is?",
  "Ohmae, K. The Mind of the Strategist; Garrette, Phelps & Sibony. Cracked It!",
  "Mankins & Steele. Turning Great Strategy into Great Performance; Bennett & Lemoine. What VUCA Means for You.",
  "Barton, D. (2011). Capitalism for the Long Term; Hamel, G. Moon Shots for Management.",
  "Deighton, J. How Snapple Got Its Juice Back.",
  "Kaplan, R. S., & Norton, D. P. Developing the Strategy—Vision, Value Gaps, and Analysis.",
  "Porter, M. E. (1983). Note on the Structural Analysis of Industries.",
  "Collis, D. J., & Montgomery, C. A. (1995). Competing on Resources.",
  "Porter, M. E. (1987). From Competitive Advantage to Corporate Strategy.",
] as const;

function Citations({ ids }: { ids: readonly number[] }) {
  return (
    <span className="ml-1 whitespace-nowrap">
      {ids.map((id) => (
        <a
          key={id}
          href={`#reference-${id}`}
          aria-label={`See reference ${id}`}
          className="text-brand-700 dark:text-brand-300 ml-0.5 align-super text-[10px] font-bold hover:underline"
        >
          [{id}]
        </a>
      ))}
    </span>
  );
}

export function OneYearMbaExperience() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-clip">
      <header className="px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div
          data-page-hero="course"
          className={`${styles.heroShell} mx-auto max-w-[92rem] overflow-hidden rounded-[2rem] text-white shadow-[0_40px_120px_-48px_rgba(3,7,18,0.9)] sm:rounded-[2.5rem]`}
        >
          <div className="grid min-h-[680px] lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative z-10 flex flex-col justify-between px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-blue-300/20 bg-blue-300/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-blue-100 uppercase">
                    PGPM · Strategic Management I
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-slate-400 uppercase">
                    PGPM 2024–26 · 2 credits · Term 4
                  </span>
                </div>
                <h1 className="mt-10 max-w-4xl font-serif text-[clamp(3.4rem,7vw,7.7rem)] leading-[0.86] font-semibold tracking-[-0.055em] text-balance">
                  Strategy,
                  <span className="mt-2 block bg-gradient-to-r from-blue-200 via-white to-amber-200 bg-clip-text pb-2 text-transparent">
                    at executive speed.
                  </span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Thirteen discussion-intensive sessions connect professional experience to
                  decisions about industry, competitive advantage and firm boundaries.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#course-map"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:outline-none"
                  >
                    See all 13 sessions
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#assessment"
                    className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:outline-none"
                  >
                    View assessment design
                  </a>
                </div>
              </div>

              <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-6 text-sm text-slate-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10">
                  <SparkIcon className="h-4 w-4 text-amber-200" aria-hidden="true" />
                </span>
                <p className="max-w-xl">
                  Cases become decisions, professional experience is tested as evidence, and
                  reflection carries the learning back to work.
                </p>
              </div>
            </div>

            <div
              className={`${styles.imageFrame} relative min-h-[520px] overflow-hidden border-t border-white/10 lg:min-h-full lg:border-t-0 lg:border-l`}
            >
              <Image
                src="/images/teaching/one-year/intensive-classroom.webp"
                alt="An intensive management classroom with learners gathered for a live strategic discussion"
                fill
                priority
                className="object-cover"
                style={{ objectPosition: "54% center" }}
                sizes="(min-width: 1024px) 46vw, 100vw"
              />
              <div className="absolute right-5 bottom-5 left-5 z-10 rounded-2xl border border-white/15 bg-slate-950/65 p-5 backdrop-blur-xl sm:right-8 sm:bottom-8 sm:left-auto sm:max-w-sm">
                <p className="font-mono text-[10px] tracking-[0.18em] text-blue-200 uppercase">
                  Teaching in practice
                </p>
                <p className="mt-3 font-serif text-xl leading-snug font-semibold">
                  A compressed programme works when every minute becomes active decision practice.
                </p>
              </div>
            </div>
          </div>

          <dl className="grid border-t border-white/10 bg-black/20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["13", "90-minute sessions"],
              ["19.5", "contact hours"],
              ["4", "integrated case anchors"],
              ["100", "marks across five signals"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-white/10 px-6 py-5 sm:border-r last:sm:border-r-0 lg:px-8"
              >
                <dt className="font-mono text-[10px] tracking-[0.14em] text-slate-400 uppercase">
                  {label}
                </dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <Container className="max-w-[min(100%,120rem)]">
        <nav
          aria-label="On this course page"
          className="nav-glass my-6 flex items-center gap-4 overflow-x-auto rounded-xl px-4 py-2 lg:my-8 lg:justify-between"
        >
          <p className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
            Course guide
          </p>
          <div className="flex shrink-0 items-center gap-1 text-xs font-semibold">
            {[
              ["Promise", "#promise"],
              ["Course profile", "#course-profile"],
              ["All 13 sessions", "#sessions"],
              ["Practice", "#practice"],
              ["Assessment", "#assessment"],
              ["References", "#references"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-md px-3 py-2 whitespace-nowrap transition hover:bg-blue-600/8 hover:text-blue-700 dark:hover:text-blue-300"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      </Container>

      <InquiryPrelude
        id="executive-strategy-inquiry"
        title="Experience enters the room as a hypothesis."
        questions={executiveStrategyQuestions}
      />

      <section aria-labelledby="induction-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <Reveal className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Before the syllabus · Induction, PGPM 2026–27 batch</p>
            <h2 id="induction-title" className="display text-4xl font-semibold sm:text-5xl">
              A room fills up before a single case gets assigned.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-2xl text-sm leading-relaxed">
              Every incoming PGPM cohort&apos;s first days are induction, not case discussion —
              sessions where faculty meet the class, expectations get set out loud, and a room of
              strangers starts becoming a cohort before the first cold call.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <Reveal
              variant="image"
              className="group relative min-h-[360px] overflow-hidden rounded-[28px] sm:min-h-[480px]"
            >
              <Image
                src="/images/teaching/one-year/induction-auditorium.webp"
                alt="A packed lecture hall of incoming PGPM 2026-27 students during induction, with faculty at the front of the room"
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes="(min-width: 1024px) 800px, 100vw"
              />
              <div className="from-ink-950 via-ink-950/35 absolute inset-0 bg-gradient-to-t to-transparent" />
              <Reveal delay={0.15} className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-10">
                <p className="font-mono text-[10px] tracking-[0.18em] text-blue-200 uppercase">
                  Day one
                </p>
                <p className="mt-3 max-w-lg font-serif text-2xl font-semibold text-white sm:text-3xl">
                  A full hall of new voices, before anyone has read a single case together.
                </p>
              </Reveal>
            </Reveal>

            <div className="grid gap-5">
              <Reveal
                delay={0.1}
                variant="image"
                className="group relative min-h-[220px] overflow-hidden rounded-[24px]"
              >
                <Image
                  src="/images/teaching/one-year/induction-facilitation.webp"
                  alt="Dr Swapnil Sahoo facilitating an interactive induction session with a flip chart"
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: "center 30%" }}
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <p className="absolute inset-x-4 bottom-4 text-xs leading-5 text-white/90">
                  Setting the room&apos;s norms before day one&apos;s first case.
                </p>
              </Reveal>
              <Reveal
                delay={0.2}
                variant="image"
                className="group relative min-h-[220px] overflow-hidden rounded-[24px]"
              >
                <Image
                  src="/images/teaching/one-year/induction-among-cohort.webp"
                  alt="Dr Swapnil Sahoo seated among the incoming PGPM cohort during induction, taking notes"
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <p className="absolute inset-x-4 bottom-4 text-xs leading-5 text-white/90">
                  Taking notes alongside the cohort I&apos;ll teach all year.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section id="promise" aria-labelledby="promise-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="eyebrow">01 / Learning promise</p>
              <h2
                id="promise-title"
                className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                Professional experience becomes evidence to test.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-6 max-w-xl text-base leading-7">
                The compressed format is not a shorter survey. It is a deliberate sequence of
                consequential questions, selected theory and repeated decision practice.
                <Citations ids={[2, 7]} />
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {learningMoves.map(({ icon: Icon, label, title, description }, index) => (
                <article
                  key={label}
                  className="glass-card group relative overflow-hidden p-6 sm:min-h-72"
                >
                  <span className="text-brand-600/10 dark:text-brand-300/10 absolute -top-3 right-3 font-serif text-8xl font-semibold">
                    {index + 1}
                  </span>
                  <Icon
                    className="text-brand-700 dark:text-brand-300 relative h-6 w-6"
                    aria-hidden="true"
                  />
                  <p className="text-brand-700 dark:text-brand-300 relative mt-8 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
                    {label}
                  </p>
                  <h3 className="relative mt-2 font-serif text-2xl font-semibold">{title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 relative mt-4 text-sm leading-6">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section
        id="course-profile"
        aria-labelledby="course-profile-title"
        className="pb-16 sm:pb-24"
      >
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card overflow-hidden">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.84fr_1.16fr]">
              <div>
                <p className="eyebrow">Course profile</p>
                <h2
                  id="course-profile-title"
                  className="mt-4 font-serif text-4xl leading-[1.04] font-semibold tracking-[-0.035em] sm:text-5xl"
                >
                  Strategic Management – 1
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-7">
                  A rigorous course in gaining and sustaining competitive advantage through
                  strategic decision-making. Internal and external analysis, classical and
                  contemporary frameworks, cases and practical exercises connect theory to
                  real-world choices.
                </p>
              </div>
              <dl className="grid gap-px overflow-hidden rounded-2xl border border-slate-900/10 bg-slate-900/10 sm:grid-cols-2 dark:border-white/10 dark:bg-white/10">
                {[
                  ["Course code", "PGPM-G/C-T1-SM1"],
                  ["Instructor", "Dr. Swapnil Sahoo"],
                  ["Programme / term", "PGPM 2024–26 · Term 4"],
                  ["Credit value", "2 credits"],
                  ["Contact design", "13 × 1.5 hours"],
                  ["Prerequisite", "All core functional areas completed"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/75 p-5 dark:bg-[#0a1629]/90">
                    <dt className="text-ink-500 dark:text-ink-400 font-mono text-[10px] tracking-[0.14em] uppercase">
                      {label}
                    </dt>
                    <dd className="mt-2 font-serif text-lg leading-snug font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="course-map"
        aria-labelledby="course-map-title"
        className="bg-slate-950 py-20 text-white sm:py-28"
      >
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.18em] text-blue-300 uppercase">
                02 / The 13-session arc
              </p>
              <h2
                id="course-map-title"
                className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                Four stages of one strategy course.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-300">
              The cases change as the unit of analysis expands—from an arena, to an advantage, to
              the scope and boundaries of the firm.
            </p>
          </div>

          <div className={`${styles.courseTrack} mt-14 grid gap-4 md:grid-cols-4`}>
            {sessionActs.map((act) => (
              <article
                key={act.number}
                className="relative ml-12 rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm md:ml-0 md:pt-10"
              >
                <span className="absolute top-5 -left-[3.35rem] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/30 bg-slate-950 font-mono text-[10px] font-bold text-blue-200 md:top-0 md:left-6 md:-translate-y-1/2">
                  {act.number}
                </span>
                <p className="font-mono text-[10px] tracking-[0.14em] text-blue-300 uppercase">
                  {act.sessions}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold">{act.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {act.question}
                  <Citations ids={act.citations} />
                </p>
                <div className="my-5 h-px bg-white/10" />
                <p className="font-mono text-[10px] tracking-[0.16em] text-amber-200 uppercase">
                  Anchor case · {act.caseStudy}
                </p>
                <ul className="mt-4 space-y-2">
                  {act.topics.map((topic) => (
                    <li key={topic} className="flex gap-2 text-xs leading-5 text-slate-400">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-300" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="sessions" aria-labelledby="sessions-title" className="py-20 sm:py-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow">03 / Complete session plan</p>
              <h2
                id="sessions-title"
                className="mt-4 max-w-3xl font-serif text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                How the thirteen sessions build one cumulative argument.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 max-w-md text-sm leading-6">
              Each 90-minute session is reproduced from the supplied teaching plan. Open a session
              to see its exact coverage and preparation.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-4 lg:grid-cols-2">
            {sessionPlan.map((session, index) => (
              <details
                key={session.number}
                open={index === 0}
                className="glass-card group overflow-hidden"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-center gap-4 p-5 marker:hidden sm:p-6">
                  <span className="bg-ink-900 dark:bg-brand-600 flex h-11 w-11 items-center justify-center rounded-full font-mono text-[11px] font-bold text-white">
                    {session.number}
                  </span>
                  <div>
                    <p className="text-ink-500 dark:text-ink-400 font-mono text-[10px] tracking-[0.14em] uppercase">
                      Session {session.number} · 1.5 hours
                    </p>
                    <h3 className="mt-1 font-serif text-xl leading-snug font-semibold">
                      {session.title}
                    </h3>
                  </div>
                  <span
                    className="text-ink-500 dark:text-ink-300 flex h-8 w-8 items-center justify-center rounded-full border border-slate-900/10 text-xl transition-transform group-open:rotate-45 dark:border-white/10"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-slate-900/10 px-5 pt-5 pb-6 sm:px-6 dark:border-white/10">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                        Topics & coverage
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {session.topics.map((topic) => (
                          <li
                            key={topic}
                            className="text-ink-700 dark:text-ink-200 flex gap-3 text-sm leading-6"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                        Readings & references
                      </p>
                      <ol className="mt-3 space-y-2.5">
                        {session.readings.map((reading, readingIndex) => (
                          <li
                            key={reading}
                            className="text-ink-600 dark:text-ink-300 grid grid-cols-[auto_1fr] gap-3 text-xs leading-5"
                          >
                            <span className="text-ink-400 font-mono">
                              {String(readingIndex + 1).padStart(2, "0")}
                            </span>
                            {reading}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                  {session.interactiveHref ? (
                    <a
                      href={session.interactiveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 dark:text-brand-300 link-underline mt-5 inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      Open the full interactive session
                      <ArrowRightIcon className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </details>
            ))}
          </div>

          <p className="text-ink-500 dark:text-ink-400 mt-7 text-xs leading-5">
            Sequence and coverage may be modified by the instructor in response to initial
            experience and the mid-course review.
          </p>
        </Container>
      </section>

      <section id="practice" aria-labelledby="practice-title" className="py-20 sm:py-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
            <article className="glass-card relative min-h-[620px] overflow-hidden p-7 sm:p-10">
              <div className="relative z-10 max-w-xl">
                <p className="eyebrow">04 / Practice system</p>
                <h2
                  id="practice-title"
                  className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
                >
                  The room is a decision laboratory.
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-lg text-sm leading-6">
                  Preparation, peer challenge and handwritten retrieval convert a case discussion
                  into repeatable strategic practice.
                  <Citations ids={[2]} />
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[52%]">
                <Image
                  src="/images/teaching/one-year/facilitated-dialogue.webp"
                  alt="Dr Swapnil Sahoo facilitating a live exchange with a participant in the classroom"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "52% center" }}
                  sizes="(min-width: 1024px) 650px, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-slate-950/10 dark:from-[#09152a] dark:via-[#09152a]/30" />
                <p className="absolute right-4 bottom-3 left-4 text-[10px] leading-4 text-white/85">
                  Facilitated dialogue · experience becomes a claim to examine, challenge and revise
                </p>
              </div>
            </article>

            <div className="grid gap-4">
              {studioRhythm.map((item, index) => (
                <article key={item.step} className="glass-card grid grid-cols-[auto_1fr] gap-5 p-6">
                  <span className="bg-ink-900 dark:bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                      {item.step}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold">{item.title}</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-6">
                      {item.text}
                    </p>
                  </div>
                </article>
              ))}
              <article className="from-ink-950 to-brand-900 rounded-3xl bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15">
                <GraduationCapIcon className="h-6 w-6 text-blue-200" aria-hidden="true" />
                <p className="mt-7 font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                  Reflection checkpoints
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold">
                  Two handwritten integrations
                </h3>
                <p className="mt-3 text-sm leading-6 text-blue-100">
                  Learners capture what changed in their judgment—not merely what they remember. The
                  tentative submission schedule appears below.
                </p>
              </article>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.76fr_1.24fr]">
            <article className="glass-card p-7">
              <p className="eyebrow">Teaching / learning methodology</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold">Seminar mode, by design.</h3>
              <ul className="text-ink-600 dark:text-ink-300 mt-6 space-y-4 text-sm leading-6">
                {[
                  "Classroom lecture and discussion grounded in the core text, references and videos.",
                  "Case analyses across Tesla, Patagonia, NVIDIA and Amazon.",
                  "One quiz per session, case exercises, an individual project, midterm and end-term examinations.",
                  "Student-led discussion around mandatory papers, enriched by independent literature search.",
                ].map((method) => (
                  <li key={method} className="flex gap-3">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                    {method}
                  </li>
                ))}
              </ul>
            </article>

            <article className="glass-card p-7">
              <p className="eyebrow">Tentative deliverable timeline</p>
              <h3 className="mt-4 font-serif text-3xl font-semibold">
                Five milestones across thirteen sessions.
              </h3>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {deliverables.map(([when, title, description], index) => (
                  <li
                    key={title}
                    className="rounded-2xl border border-slate-900/8 bg-white/45 p-4 dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.12em] uppercase">
                        {when}
                      </span>
                      <span className="text-ink-400 font-mono text-[10px]">0{index + 1}</span>
                    </div>
                    <h4 className="mt-3 font-serif text-lg font-semibold">{title}</h4>
                    <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-5">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
              <p className="text-ink-500 dark:text-ink-400 mt-4 text-[11px] leading-5">
                The timeline is tentative and may move with the mid-course review.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section aria-labelledby="field-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="from-ink-950 via-brand-900 to-ink-900 relative overflow-hidden rounded-[2rem] bg-gradient-to-br px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div
              className="absolute -top-36 -right-24 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-blue-200 uppercase">
                  05 / Signature field project
                </p>
                <h2
                  id="field-title"
                  className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
                >
                  The project starts with a live conversation.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-sm leading-6 text-blue-100">
                  Teams connect course frameworks to a live startup decision. Secondary-data-only
                  profiles do not qualify: the work begins with a human conversation and ends with a
                  useful recommendation.
                </p>
                <span className="mt-5 inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-amber-100 uppercase">
                  20 marks · no secondary-data-only submissions
                </span>
              </div>
            </div>

            <div className="relative mt-12 grid gap-6 md:grid-cols-4">
              <span className={`${styles.fieldLine} hidden md:block`} aria-hidden="true" />
              {fieldLoop.map(([number, title, description]) => (
                <article key={number} className="relative">
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-blue-200/25 bg-slate-950 font-mono text-xs font-bold text-blue-100">
                    {number}
                  </span>
                  <h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-blue-100">{description}</p>
                </article>
              ))}
            </div>

            <div className="relative mt-12 border-t border-white/10 pt-8">
              <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                Project rubric · 20 marks
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  [
                    "05 marks",
                    "Framework integration",
                    "Understand and apply concepts, tools and frameworks for strategy formulation and execution.",
                  ],
                  [
                    "05 marks",
                    "Critical decision-making",
                    "Demonstrate conceptual, analytical and critical-thinking capability in the recommendation.",
                  ],
                  [
                    "10 marks",
                    "Glocal adaptability",
                    "Show how the startup responds to dynamic local and global challenges with foresight and alignment.",
                  ],
                ].map(([marks, title, description]) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="font-mono text-[10px] tracking-[0.14em] text-amber-200 uppercase">
                      {marks}
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-blue-100">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="assessment"
        aria-labelledby="assessment-title"
        className="border-y border-slate-900/8 bg-white/35 py-20 backdrop-blur-sm sm:py-28 dark:border-white/8 dark:bg-slate-950/20"
      >
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="flex flex-col items-center lg:items-start">
              <p className="eyebrow self-start">06 / Evidence of learning</p>
              <h2
                id="assessment-title"
                className="mt-4 self-start font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] text-balance sm:text-6xl"
              >
                Assessment that looks like the work.
              </h2>
              <div
                className={`${styles.assessmentRing} mt-10`}
                role="img"
                aria-label="Assessment allocation totalling 100 marks: quizzes 25, reflections 10, midterm 15, end term 30, startup field analysis 20"
              >
                <div className={`${styles.assessmentValue} text-center`}>
                  <strong className="block font-serif text-6xl leading-none font-semibold">
                    100
                  </strong>
                  <span className="text-ink-500 dark:text-ink-300 mt-2 block font-mono text-[10px] tracking-[0.16em] uppercase">
                    total marks
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              {assessmentPlan.map((item, index) => (
                <article
                  key={item.title}
                  className="glass-card grid grid-cols-[auto_1fr] items-center gap-4 p-5 sm:grid-cols-[auto_1fr_auto]"
                >
                  <span
                    className={`${assessmentColours[index]} h-3 w-3 rounded-full`}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-1 text-xs leading-5">
                      {item.instrument}
                      <span className="text-ink-400 mx-2" aria-hidden="true">
                        ·
                      </span>
                      {item.alignment}
                    </p>
                  </div>
                  <span className="text-brand-700 dark:text-brand-300 col-start-2 font-mono text-xs font-bold sm:col-start-auto">
                    {item.marks} marks
                  </span>
                </article>
              ))}
              <p className="text-ink-500 dark:text-ink-400 mt-3 text-xs leading-5">
                Quizzes, reflections, examinations and field analysis show different parts of each
                learner&apos;s progress.
                <Citations ids={[7]} />
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="outcomes-title" className="py-20 sm:py-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow">07 / Capability outcomes</p>
              <h2
                id="outcomes-title"
                className="mt-4 font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
              >
                By the end, learners can…
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-6">
                The official learning objectives move from conceptual understanding to diagnosis,
                choice and recommendation.
              </p>
            </div>
            <ol className="divide-y divide-slate-900/10 border-y border-slate-900/10 dark:divide-white/10 dark:border-white/10">
              {outcomes.map((outcome, index) => (
                <li key={outcome} className="grid grid-cols-[auto_1fr] gap-5 py-5">
                  <span className="text-brand-700 dark:text-brand-300 font-mono text-xs font-bold">
                    0{index + 1}
                  </span>
                  <p className="font-serif text-xl leading-snug font-semibold">{outcome}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                [
                  "CO 1 · aligned to PO-1",
                  "Understand concepts, tools and frameworks for strategy formulation and execution.",
                ],
                [
                  "CO 2 · aligned to PO-2",
                  "Demonstrate conceptual, analytical and critical-thinking capabilities for strategic decision-making.",
                ],
              ].map(([label, description]) => (
                <article key={label} className="glass-card p-6">
                  <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.14em] uppercase">
                    {label}
                  </p>
                  <p className="mt-3 font-serif text-lg leading-snug font-semibold">
                    {description}
                  </p>
                </article>
              ))}
            </div>

            <div className="glass-card p-7">
              <p className="eyebrow">PGPM programme outcomes</p>
              <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {programmeOutcomes.map(([code, description]) => (
                  <article key={code} className="grid grid-cols-[auto_1fr] gap-3">
                    <span className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold">
                      {code}
                    </span>
                    <p className="text-ink-600 dark:text-ink-300 text-xs leading-5">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="standards-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <details className="from-ink-950 to-brand-900 group overflow-hidden rounded-[2rem] bg-gradient-to-br text-white shadow-xl shadow-blue-950/15">
            <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-end gap-6 p-7 marker:hidden sm:p-10 lg:p-12">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-blue-200 uppercase">
                  08 / Classroom standards
                </p>
                <h2
                  id="standards-title"
                  className="mt-4 max-w-3xl font-serif text-4xl leading-[1.03] font-semibold tracking-[-0.035em] sm:text-5xl"
                >
                  Eleven commitments to a serious learning room.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100">
                  Preparation, presence, attribution and respectful challenge make the case method
                  work. Open the classroom contract for the full expectations.
                </p>
              </div>
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl transition-transform group-open:rotate-45"
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <ol className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2">
              {classroomStandards.map((standard, index) => (
                <li
                  key={standard}
                  className={`grid grid-cols-[auto_1fr] gap-4 bg-slate-950/85 p-5 sm:p-6 ${
                    classroomStandards.length % 2 !== 0 && index === classroomStandards.length - 1
                      ? "sm:col-span-2"
                      : ""
                  }`}
                >
                  <span className="font-mono text-[10px] font-bold text-blue-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-6 text-slate-200">{standard}</p>
                </li>
              ))}
            </ol>
          </details>
        </Container>
      </section>

      <aside aria-labelledby="connected-practice-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow">Connected practice</p>
              <h2
                id="connected-practice-title"
                className="mt-4 font-serif text-3xl leading-tight font-semibold tracking-[-0.03em] sm:text-4xl"
              >
                See how these ideas carry into a rapid build.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-6">
                The hackathon and classroom note show the same emphasis on choice and evidence in
                other teaching settings.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/ai-initiatives/ai-hackathon"
                className="border-ink-200/80 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 group rounded-2xl border p-5 transition"
              >
                <p className="eyebrow">Build-first learning</p>
                <h3 className="mt-2 font-serif text-xl font-semibold">AI Mini Hackathon</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-5">
                  Follow an incoming PGDM cohort from student problem to testable GenAI prototype.
                </p>
                <span className="text-brand-700 dark:text-brand-300 mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  Explore the programme
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
              <a
                href={mbaClassroomPost.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink-200/80 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 group rounded-2xl border p-5 transition"
              >
                <p className="eyebrow inline-flex items-center gap-2">
                  <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
                  LinkedIn field note
                </p>
                <h3 className="mt-2 font-serif text-xl font-semibold">{mbaClassroomPost.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-5">
                  {mbaClassroomPost.description}
                </p>
                <span className="text-brand-700 dark:text-brand-300 mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  Read on LinkedIn
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </aside>

      <section id="references" aria-labelledby="references-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="glass-card overflow-hidden">
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.36fr_0.64fr]">
              <div>
                <p className="eyebrow">09 / References</p>
                <h2
                  id="references-title"
                  className="mt-4 font-serif text-4xl leading-tight font-semibold tracking-[-0.03em]"
                >
                  Research behind the design.
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-6">
                  The page combines the documented teaching plan with established strategy and
                  assurance-of-learning sources.
                </p>
              </div>
              <ol className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {oneYearMba.references.map((reference) => (
                  <li
                    id={`reference-${reference.id}`}
                    key={reference.id}
                    className="text-ink-600 dark:text-ink-300 scroll-mt-28 text-xs leading-5"
                  >
                    <span className="text-ink-900 dark:text-ink-50 mr-2 font-mono font-bold">
                      [{reference.id}]
                    </span>
                    {reference.author} ({reference.year}).{" "}
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 dark:text-brand-300 font-semibold hover:underline"
                    >
                      {reference.title}
                    </a>
                    . {reference.publisher}.
                  </li>
                ))}
              </ol>
            </div>
            <details className="group border-t border-slate-900/10 dark:border-white/10">
              <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-5 px-7 py-6 marker:hidden sm:px-10">
                <div>
                  <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold tracking-[0.15em] uppercase">
                    Complete course reading canon
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm">
                    Core text plus all 21 reference-book and article entries in the teaching plan.
                  </p>
                </div>
                <span
                  className="text-ink-500 dark:text-ink-300 flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 text-xl transition-transform group-open:rotate-45 dark:border-white/10"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="border-t border-slate-900/10 px-7 py-7 sm:px-10 dark:border-white/10">
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 p-5">
                  <p className="font-mono text-[10px] font-bold tracking-[0.14em] text-amber-700 uppercase dark:text-amber-300">
                    Core textbook
                  </p>
                  <p className="mt-2 font-serif text-lg font-semibold">
                    Frank T. Rothaermel · Strategic Management
                  </p>
                </div>
                <ol className="mt-7 grid gap-x-8 gap-y-4 md:grid-cols-2">
                  {courseReadingCanon.map((reading, index) => (
                    <li
                      key={reading}
                      className="text-ink-600 dark:text-ink-300 grid grid-cols-[auto_1fr] gap-3 text-xs leading-5"
                    >
                      <span className="text-brand-700 dark:text-brand-300 font-mono font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {reading}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
            <div className="flex flex-col gap-4 border-t border-slate-900/10 bg-slate-950/[0.025] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 dark:border-white/10 dark:bg-white/[0.025]">
              <p className="text-ink-600 dark:text-ink-300 text-sm">
                Looking for the longer two-year strategy course?
              </p>
              <Link
                href="/teaching/2-year-mba"
                className="text-brand-700 dark:text-brand-300 inline-flex items-center gap-2 text-sm font-bold"
              >
                Explore the 2-Year MBA
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
