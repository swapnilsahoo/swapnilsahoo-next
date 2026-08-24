import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Cracking Consulting Interviews",
  description:
    "A professor's in-depth, first-person guide to consulting and general-management interviews: the process end to end, what interviewers actually score, the case method, framework families, the personal interview, group discussions, common mistakes and a realistic prep plan.",
  keywords: [
    "consulting interview preparation",
    "case interview framework",
    "MBA placements",
    "general management interview",
    "MBB interview",
    "case method",
    "personal interview MBA",
    "group discussion preparation",
    "guesstimates",
    "placement assistance",
  ],
  alternates: { canonical: "/teaching/consulting-interviews" },
  openGraph: {
    type: "article",
    title: "Cracking Consulting Interviews",
    description:
      "The process, the case method, the framework families, the fit round and the mistakes I see most often — written out in full, in my own words.",
    url: "/teaching/consulting-interviews",
    images: ["/images/profile_pic.jpg"],
  },
};

const processStages = [
  {
    number: "01",
    title: "Resume & cover letter screen",
    description:
      "Firms read hundreds of near-identical resumes in a few days. What earns a second look is specific, quantified impact — not adjectives, and not a longer list of tools you've touched once.",
  },
  {
    number: "02",
    title: "Written or online assessment",
    description:
      "Psychometric tests, logical or numerical reasoning, sometimes a short written case. Unglamorous, but a weak score here can end a process before a human ever reads your case performance.",
  },
  {
    number: "03",
    title: "The informal layer",
    description:
      "Mentor or 'buddy' conversations, information sessions, pre-interview dinners. None of this formally decides anything on its own. All of it quietly shapes the impression that reaches the people who do decide.",
  },
  {
    number: "04",
    title: "First-round interviews",
    description:
      "Usually two conversations with senior consultants or managers — a case, a fit-style discussion, sometimes both blended into one. This is where structuring and composure get their first real test.",
  },
  {
    number: "05",
    title: "Final or partner round",
    description:
      "Case and fit again, but now with a partner or director in the room. The question quietly shifts from 'can this person structure a case' to 'would I trust this person in front of my client tomorrow.'",
  },
  {
    number: "06",
    title: "The decision",
    description:
      "An offer, sometimes tied to a specific practice or role. If it doesn't come, ask for feedback anyway — it's the most useful data you'll get for the next process.",
  },
] as const;

const evaluationCriteria = [
  {
    title: "Problem structuring",
    description:
      "Taking a large, ambiguous question and breaking it into pieces you can actually work with — before you start working with any single one of them.",
  },
  {
    title: "Analytical thinking",
    description:
      "Following that structure with real numbers and real logic. Confident language is not analysis; a number you can defend is.",
  },
  {
    title: "Synthesis",
    description:
      "Turning what you found into a point of view. A recommendation, not a recap of everywhere you looked along the way.",
  },
  {
    title: "Structured communication",
    description:
      "Saying it top-down — headline first — in a way a client could act on without asking you to explain it a second time.",
  },
] as const;

const caseMethodSteps = [
  {
    number: "01",
    title: "Listen, then clarify",
    description:
      "Repeat the objective back in your own words before you do anything else. Ask two or three scoping questions that would genuinely change your structure — not a checklist recited to look thorough. Know when to stop asking and start structuring; camping here reads as stalling.",
  },
  {
    number: "02",
    title: "Structure the problem",
    description:
      "Build an issue tree that is mutually exclusive and collectively exhaustive for this case — not a memorised template glued on top of it. Say the structure out loud before you dive into any one branch, so the interviewer can redirect you before you spend ten minutes somewhere unproductive.",
  },
  {
    number: "03",
    title: "Analyse",
    description:
      "Ask for only the data you actually need next, not everything on offer. Do the arithmetic out loud, one step at a time. Sanity-check every number against something you already believe to be true — an order of magnitude, a benchmark, a gut check.",
  },
  {
    number: "04",
    title: "Synthesise",
    description:
      "Lead with the recommendation, not a summary of everywhere you looked. Back it with the two or three points of evidence that actually carry it. Name the biggest risk to your own recommendation before the interviewer has to ask — it reads as judgment, not weakness.",
  },
] as const;

const frameworkFamilies = [
  {
    name: "Profitability",
    question: "What changed in revenue, cost or mix — and since when?",
    pitfall: "Jumping straight to 'cut costs' before separating price, volume and cost drivers.",
  },
  {
    name: "Market entry",
    question: "Is this market attractive, accessible and winnable for us specifically?",
    pitfall: "Sizing the market and stopping there, without asking whether this company can actually win it.",
  },
  {
    name: "Growth strategy",
    question: "Where can value expand — organically or inorganically — and what has to be true?",
    pitfall: "Listing every possible growth lever instead of prioritising the two or three worth a recommendation.",
  },
  {
    name: "Pricing",
    question: "What value does this create, what will customers actually pay, and how will rivals respond?",
    pitfall: "Anchoring only on cost-plus math and never asking about willingness to pay.",
  },
  {
    name: "M&A / investment",
    question: "Does the deal create value, and can it actually be completed and integrated?",
    pitfall: "Valuing the target in isolation and forgetting integration risk entirely.",
  },
  {
    name: "Operations & cost",
    question: "Where is the process losing time, quality or money — and what's the cheapest real fix?",
    pitfall: "Reaching for automation or headcount cuts as a reflex, before finding the actual bottleneck.",
  },
  {
    name: "Guesstimates",
    question: "Can you build a defensible number from a standing start, with your assumptions visible?",
    pitfall: "Guessing a final number instead of showing the decomposition that produced it.",
  },
  {
    name: "Abstract / creative",
    question: "Can you create structure when no standard template fits the problem?",
    pitfall: "Forcing a memorised framework onto a problem it was never built to answer.",
  },
] as const;

const fitRoundPoints = [
  {
    title: "Your two-minute introduction",
    description:
      "Not a resume recitation. A shaped narrative that gives the interviewer somewhere useful to go next — most will pick their first follow-up straight from what you choose to emphasise here.",
  },
  {
    title: "Know your own resume cold",
    description:
      "Any number, any gap, any claim on it is fair game. A wobble explaining your own history costs more credibility than a shaky case ever will.",
  },
  {
    title: "Structure your stories",
    description:
      "The STAR shape — Situation, Task, Action, Result — is the simplest way to tell a story under time pressure without losing the interviewer halfway through it.",
  },
  {
    title: "Strengths and weaknesses, honestly",
    description:
      "A real weakness, with what you're actually doing about it, beats a disguised humble-brag every time. Interviewers have heard 'I'm too much of a perfectionist' more times than you have.",
  },
  {
    title: "Why this firm, why consulting",
    description:
      "It has to be built from something specific about the firm or the role. If your answer could be handed to any firm in the market unchanged, it isn't ready yet.",
  },
  {
    title: "The questions you ask back",
    description:
      "Ask what you're genuinely curious about, not a question performed to look interested. Interviewers can tell the difference immediately.",
  },
] as const;

const groupDiscussionFormats = [
  {
    name: "Case-based GD",
    description:
      "A short business scenario, read fast, discussed in a group of six to eight. Offer a structure early if you can see one, then spend most of your airtime building on others' points rather than repeating your own opening line.",
  },
  {
    name: "Abstract GD",
    description:
      "An open-ended or philosophical prompt. The goal isn't the cleverest interpretation — it's connecting an abstract idea to a real business decision quickly, and inviting quieter voices into the conversation.",
  },
  {
    name: "Gamified / information-sharing GD",
    description:
      "Each participant holds a different clue to a shared puzzle. These formats reward listening and synthesis over talking — the person who quietly connects three other people's clues usually stands out more than the loudest one in the room.",
  },
] as const;

const commonMistakes = [
  "Reciting a memorised framework instead of building a structure for the case actually in front of them.",
  "Treating clarifying questions as a checklist to get through, rather than genuinely trying to understand the problem.",
  "Doing the arithmetic silently and presenting only a final number, so one small slip reads as a wrong instinct instead of a fixable error.",
  "A synthesis that summarises every branch explored instead of committing to a recommendation.",
  "Missing it when an interviewer is trying to help — a raised eyebrow, a repeated word, a gentle 'are you sure?' is data, not an attack.",
  "Preparing exotic frameworks while under-preparing the fundamentals — mental math, structured communication, plain listening — that actually decide most interviews.",
  "Walking into the fit round under-prepared because 'the case is what matters,' then losing the seat to someone with a similar case performance and a sharper sense of who they are.",
] as const;

const prepTimeline = [
  {
    window: "6–8 weeks out",
    focus: "Form the group, learn the families",
    description:
      "Build a small case group — four to six people, ideally from different functional backgrounds. Work through one framework family at a time and don't move on until it's genuinely comfortable, not just familiar.",
  },
  {
    window: "4–6 weeks out",
    focus: "Full mock cases, rotating roles",
    description:
      "Run complete mocks in pairs, swapping who interviews. Keep a short log after each one — one thing that worked, one thing to fix next time. The log, not the case count, is what actually compounds.",
  },
  {
    window: "2–4 weeks out",
    focus: "Add the fit round and breadth",
    description:
      "Mix in personal-interview practice and, if your process includes one, group discussions. Cover a spread of industries so an unfamiliar sector doesn't rattle you on the day.",
  },
  {
    window: "Final week",
    focus: "Fewer, sharper reps",
    description:
      "Taper the volume. Rest properly the day before. Walk in prepared to listen and think, not to perform a script you rehearsed forty times.",
  },
] as const;

const firmLandscape = [
  {
    name: "MBB / global strategy firms",
    description:
      "The highest bar on structured problem-solving and polish, typically the most case-heavy process of the group.",
  },
  {
    name: "Tier-2 and boutique strategy firms",
    description:
      "A similar method, often with more room for genuine domain interest and slightly more conversational cases.",
  },
  {
    name: "Big-4 and management-consulting arms",
    description:
      "A broader mix of strategy, technology and operations work; case style and depth vary more by practice area.",
  },
  {
    name: "General management / leadership programmes",
    description:
      "The same case-method habits still matter, but the fit round and functional depth carry relatively more weight.",
  },
] as const;

export default function ConsultingInterviewsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="text-ink-500 mb-5 flex flex-wrap items-center gap-2 text-xs"
          >
            <Link href="/" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/#teaching"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Teaching
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              Cracking Consulting Interviews
            </span>
          </nav>

          <div
            data-page-hero="academic"
            className="relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-ink-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14"
          >
            <Image
              src="/images/gallery/strategy-kodak-case-teaching-2026.jpg"
              alt="Dr Swapnil Sahoo teaching a case to a Strategy classroom"
              fill
              priority
              className="-z-20 object-cover"
              style={{ objectPosition: "center 40%" }}
              sizes="100vw"
            />
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, rgba(5,10,24,0.92), rgba(30,58,138,0.85), rgba(22,32,51,0.82))",
              }}
            />
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.42fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                  Teaching · Placement assistance · Consulting
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Cracking{" "}
                  <span className="text-brand-200 font-normal italic">consulting interviews.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  This is the long version of what I tell every student who walks into my office a
                  few weeks before consulting or general-management placements begin — the
                  process, the frameworks, the fit round, and the mistakes I watch good candidates
                  make. Written out in full, in my own words, so it doesn&rsquo;t have to wait for
                  office hours.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#case-method"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    See the case method
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#mistakes"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Common mistakes
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    Core loop
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">
                    Listen → Structure → Solve → Land it
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    North star
                  </p>
                  <p className="mt-2 font-serif text-2xl font-semibold">Judgment, not a script</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id="consulting-questions"
        eyebrow="Before you memorise another framework"
        title="Ask yourself these before the next mock case."
        questions={[
          "If I took away your framework right now, could you still ask a sharp first question?",
          "Could you defend the one assumption in your structure that, if wrong, would break your whole recommendation?",
          "Are you preparing to sound like a consultant, or preparing to actually think like one?",
        ]}
      />

      <section aria-labelledby="process-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / The process, start to finish</p>
              <h2 id="process-title" className="display text-4xl font-semibold md:text-5xl">
                Know the shape of it before you&rsquo;re inside it.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Most of the anxiety I see isn&rsquo;t about any single interview — it&rsquo;s about
              not knowing what comes next. Every firm&apos;s process differs slightly, but the
              shape underneath is close enough to this everywhere I&apos;ve seen it.
            </p>
          </div>

          <Reveal>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {processStages.map((stage) => (
                <li key={stage.number} className="glass-card relative overflow-hidden p-6">
                  <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                    {stage.number}
                  </span>
                  <p className="eyebrow relative mb-4">Stage {stage.number}</p>
                  <h3 className="relative font-serif text-xl font-semibold">{stage.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                    {stage.description}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="evaluation-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Evaluation criteria</p>
            <h2 id="evaluation-title" className="display text-4xl font-semibold md:text-5xl">
              Four things every interviewer is quietly scoring.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Firms phrase this differently in their own materials, but underneath, they&rsquo;re
              almost always watching for the same four things.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {evaluationCriteria.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="glass-card h-full p-7">
                  <span className="text-ink-400 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{item.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="glass-card mt-6 p-7">
            <p className="eyebrow mb-2">A fifth, unofficial one</p>
            <h3 className="font-serif text-lg font-semibold">The &ldquo;airport test.&rdquo;</h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
              An old shorthand across the industry: would the interviewer be comfortable stuck at
              an airport with you during a long delay? It sounds informal, but it&apos;s really
              asking whether you&apos;re someone a client team could spend a stressful week with.
              Technical skill is replicable. Presence isn&apos;t, and interviewers know it.
            </p>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="case-method" aria-labelledby="case-method-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">03 / The case method, end to end</p>
              <h2 id="case-method-title" className="display text-4xl font-semibold md:text-5xl">
                One approach, adapted every time — never the reverse.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              This is the sequence I return to with every student, regardless of which framework
              family the case belongs to. The framework changes case to case. This doesn&rsquo;t.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {caseMethodSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.06}>
                <li className="glass-card relative h-full overflow-hidden p-6">
                  <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                    {step.number}
                  </span>
                  <h3 className="relative font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 relative mt-3 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="frameworks-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Framework families</p>
            <h2 id="frameworks-title" className="display text-4xl font-semibold md:text-5xl">
              Not templates to recite — starting points to adapt.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              A framework is a hypothesis about what usually matters in a certain kind of problem.
              It should shorten your first ninety seconds of thinking, not replace the next thirty
              minutes of it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {frameworkFamilies.map((family, index) => (
              <Reveal key={family.name} delay={(index % 4) * 0.05}>
                <article className="glass-card h-full p-6">
                  <h3 className="font-serif text-lg font-semibold">{family.name}</h3>
                  <p className="text-ink-500 dark:text-ink-400 mt-3 font-mono text-[10px] tracking-[0.12em] uppercase">
                    Answers
                  </p>
                  <p className="text-ink-700 dark:text-ink-200 mt-1 text-sm leading-relaxed">
                    {family.question}
                  </p>
                  <p className="mt-4 font-mono text-[10px] tracking-[0.12em] text-amber-700 uppercase dark:text-amber-300">
                    Where candidates slip
                  </p>
                  <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm leading-relaxed">
                    {family.pitfall}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="fit-round" aria-labelledby="fit-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">05 / The personal interview</p>
            <h2 id="fit-title" className="display text-4xl font-semibold md:text-5xl">
              The case gets you shortlisted. This decides who they&rsquo;d work with.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Conventional wisdom says the case makes or breaks a candidate. In my experience
              watching this process closely, it&rsquo;s the personal interview that actually
              separates similarly strong candidates — case technique is learnable in six weeks;
              presence and self-knowledge aren&rsquo;t built that fast.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fitRoundPoints.map((point, index) => (
              <Reveal key={point.title} delay={(index % 3) * 0.06}>
                <article className="glass-card h-full p-6">
                  <span className="text-ink-400 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-lg font-semibold">{point.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section
        id="group-discussion"
        aria-labelledby="gd-title"
        className="py-16 sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">06 / Group discussions</p>
            <h2 id="gd-title" className="display text-4xl font-semibold md:text-5xl">
              A different skill: making the group&rsquo;s thinking better.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Not every process includes one, but general-management recruiting often does. The
              skill being tested here isn&rsquo;t case technique — it&rsquo;s whether you can move
              a group forward without dominating it.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {groupDiscussionFormats.map((format, index) => (
              <Reveal key={format.name} delay={index * 0.08}>
                <article className="glass-card h-full p-6">
                  <h3 className="font-serif text-lg font-semibold">{format.name}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                    {format.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section
        id="mistakes"
        aria-labelledby="mistakes-title"
        className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24"
      >
        <Container className="relative max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.16em] text-amber-300 uppercase">
              07 / What actually goes wrong
            </p>
            <h2 id="mistakes-title" className="display mt-3 text-4xl font-semibold md:text-5xl">
              Not knowledge gaps. Habits.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              I rarely see a candidate fail because they didn&rsquo;t know a framework. I see the
              same handful of habits, over and over, across otherwise well-prepared candidates.
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {commonMistakes.map((mistake, index) => (
              <li
                key={mistake}
                className="rounded-[20px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm"
              >
                <span className="font-mono text-[10px] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{mistake}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="plan-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">08 / How I&rsquo;d plan the weeks before</p>
            <h2 id="plan-title" className="display text-4xl font-semibold md:text-5xl">
              Six to eight weeks, spent on the right things.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Quality beats volume every time I&rsquo;ve watched this play out. A smaller number of
              well-reviewed mocks beats a large number of cases nobody reflected on afterward.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {prepTimeline.map((phase) => (
              <li key={phase.window} className="glass-card h-full p-6">
                <p className="font-mono text-[10px] tracking-[0.14em] text-amber-700 uppercase dark:text-amber-300">
                  {phase.window}
                </p>
                <h3 className="mt-3 font-serif text-lg font-semibold">{phase.focus}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {phase.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="landscape-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">09 / The landscape, briefly</p>
            <h2 id="landscape-title" className="display text-4xl font-semibold md:text-5xl">
              Different doors, the same underlying skills.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {firmLandscape.map((firm) => (
              <div key={firm.name} className="glass-card h-full p-6">
                <h3 className="font-serif text-lg font-semibold">{firm.name}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {firm.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="next-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 rounded-[28px] bg-gradient-to-br p-8 text-white shadow-xl shadow-blue-950/15 sm:p-12">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              None of this replaces practice
            </p>
            <h2 id="next-title" className="mt-3 max-w-2xl font-serif text-3xl font-semibold sm:text-4xl">
              Reading this gets you ready to practise. Only practice gets you ready to interview.
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/placements/case-study-preparation"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Enter the case practice lab
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/placements"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Placement assistance overview
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
