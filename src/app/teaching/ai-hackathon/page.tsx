import type { Metadata } from "next";
import Image from "next/image";

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
import { linkedInHighlights, linkedInProfileUrl } from "@/features/profile/data/linkedin";

const briefingDeckUrl =
  "https://pub-fe4ef7996d794eafbcca10e6093e62af.r2.dev/ai-hackathon/AI_in_45_Minutes_v7.pdf";
const responsibleAiPost = linkedInHighlights[0];

export const metadata: Metadata = {
  title: "AI Mini Hackathon for MBA & PhD Audiences",
  description:
    "The AI Mini Hackathon delivered for the incoming PGDM 2026–28 cohort at Great Lakes Gurgaon, with a clearly labelled research extension for PhD readers.",
  keywords: [
    "AI Hackathon",
    "Great Lakes Gurgaon",
    "AI in management education",
    "MBA experiential learning",
    "responsible AI",
    "rapid prototyping",
  ],
  alternates: {
    canonical: "/teaching/ai-hackathon",
  },
  openGraph: {
    type: "article",
    title: "AI Mini Hackathon — Build-First. By Students, For Students.",
    description:
      "How the incoming PGDM 2026–28 cohort moved from student problems to testable, responsibly framed GenAI prototypes.",
    url: "/teaching/ai-hackathon",
    images: ["/images/ai-hackathon/hackathon-demo.jpg"],
  },
};

const buildFlow = [
  {
    index: "01",
    title: "Kickoff together",
    description:
      "The full batch met in the Auditorium on 2 July to hear the brief, see what GenAI could do and agree on responsible-use expectations.",
  },
  {
    index: "02",
    title: "Choose a student problem",
    description:
      "Teams named a pain area, the people living with it and the practical change their idea should make.",
  },
  {
    index: "03",
    title: "Build in pods",
    description:
      "Build, Users & Business, and Story & Demo pods worked in parallel, connected by the team lead and pod leads.",
  },
  {
    index: "04",
    title: "Show the work",
    description:
      "Two semifinal groups presented on 3 July. The final notice announced ten teams for the 5 July jury in the Auditorium.",
  },
] as const;

const challengeThemes = [
  "Student productivity",
  "Learning & class preparation",
  "Case analysis & class participation",
  "Placements & careers",
  "Entrepreneurship & startups",
  "Campus operations & student life",
  "Sustainability & social impact",
  "Wellness & personal development",
  "Responsible & ethical decision-making",
] as const;

const prototypeAreas = [
  "Business-news briefings",
  "Peer connection",
  "Shared rides",
  "Interactive case learning",
  "Academic hubs",
  "Career preparation",
  "Wellness",
] as const;

const finalJuryCriteria = [
  "Clarity and relevance of the problem",
  "Practicality of the GenAI solution",
  "Prototype quality and usability",
  "Ease of adoption at Great Lakes",
  "Potential institutional impact",
] as const;

const learningRubric = [
  "Originality",
  "AI integration",
  "User experience",
  "Feasibility & scalability",
  "Responsible AI",
  "Collaboration",
  "Presentation",
  "Live demonstration",
] as const;

const eventSchedule = [
  {
    date: "Thursday, 2 July 2026",
    time: "6:00–8:00 PM",
    place: "Auditorium",
    detail: "Full-batch kickoff",
  },
  {
    date: "Friday, 3 July 2026",
    time: "2:30–5:00 PM",
    place: "A16",
    detail: "Semifinal · Group 1",
  },
  {
    date: "Friday, 3 July 2026",
    time: "6:00–8:30 PM",
    place: "Auditorium",
    detail: "Semifinal · Group 2",
  },
  {
    date: "Sunday, 5 July 2026",
    time: "2:30–5:00 PM",
    place: "Auditorium",
    detail: "Final",
  },
] as const;

export default function AiHackathonPage() {
  return (
    <main id="main-content">
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div className="from-ink-950 via-brand-900 to-ink-800 relative isolate overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br px-6 py-10 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                    Incoming PGDM 2026–28 · Great Lakes Gurgaon
                  </span>
                </div>

                <h1 className="display text-4xl font-semibold text-balance sm:text-6xl lg:text-7xl">
                  AI Mini Hackathon:{" "}
                  <span className="text-brand-200 font-normal italic">
                    Build-First. By Students, For Students.
                  </span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  The incoming PGDM cohort started with problems they knew from student life, then
                  built GenAI prototypes that people could open, test and question. This page
                  records that July 2026 programme and offers a separate research lens for PhD
                  readers.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={briefingDeckUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    Open the briefing deck
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a
                    href="#experience"
                    className="focus-visible:ring-brand-300 inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:outline-none"
                  >
                    See how it worked
                  </a>
                </div>
              </div>

              <figure className="relative overflow-hidden rounded-[22px] border border-white/15 bg-white/5 shadow-2xl shadow-slate-950/25">
                <Image
                  src="/images/ai-hackathon/hackathon-demo.jpg"
                  alt="Dr Swapnil Sahoo speaking during the AI Mini Hackathon final"
                  width={4608}
                  height={3072}
                  priority
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  className="aspect-[4/5] w-full object-cover object-[52%_center]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-5 pt-16 pb-4 text-xs text-blue-100">
                  Dr Swapnil Sahoo speaks during the 5 July final. Event photograph; photographer
                  not identified.
                </figcaption>
              </figure>
            </div>
          </div>

          <dl
            aria-label="Hackathon evidence counts"
            className="relative z-10 mx-3 -mt-5 grid gap-3 sm:mx-6 sm:grid-cols-2 lg:mx-10 lg:grid-cols-3"
          >
            <div className="glass-card p-5">
              <dt className="eyebrow">Registration file · raw records</dt>
              <dd className="mt-2 font-serif text-3xl font-semibold">29 registration records</dd>
              <dd className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                The original registration file includes repeat team registrations, so this is not a
                unique-team count.
              </dd>
            </div>
            <div className="glass-card p-5">
              <dt className="eyebrow">Prototype response sheet · final rows</dt>
              <dd className="mt-2 font-serif text-3xl font-semibold">
                24 timestamped response rows
              </dd>
              <dd className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                These are the auditable rows in the shared final problem-statement and prototype
                response sheet.
              </dd>
            </div>
            <div className="glass-card p-5">
              <dt className="eyebrow">Final notice · 4 July 2026</dt>
              <dd className="mt-2 font-serif text-3xl font-semibold">
                10 teams announced for the final
              </dd>
              <dd className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                The contemporaneous notice also named a final jury of three alumni.
              </dd>
            </div>
            <div className="glass-card p-5 sm:col-span-2 lg:col-span-3">
              <dt className="eyebrow">Evidence note</dt>
              <dd className="text-ink-600 dark:text-ink-300 mt-2 text-xs leading-relaxed">
                These records capture different workflow stages and are not identical. A later 27
                July institutional summary reports 26 recorded entries and nine shortlisted teams
                without documenting its reconciliation method. The figures above remain
                stage-specific, so 26 is not presented as a count of unique prototypes.
              </dd>
            </div>
          </dl>
        </Container>
      </header>

      <section id="experience" aria-labelledby="experience-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / What happened</p>
              <h2 id="experience-title" className="display text-4xl font-semibold md:text-5xl">
                Learn by making.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                The programme ran over three days: one shared kickoff, two semifinal rooms and a
                final for the shortlisted teams. Each stage asked students to make the idea more
                useful and easier to explain.
              </p>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {buildFlow.map((step) => (
                <li key={step.index} className="glass-card relative overflow-hidden p-6">
                  <span className="text-brand-600/15 dark:text-brand-300/10 absolute top-2 right-4 font-serif text-6xl font-semibold">
                    {step.index}
                  </span>
                  <p className="eyebrow relative mb-3">Stage {step.index}</p>
                  <h3 className="relative font-serif text-xl font-semibold">{step.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 relative mt-2 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="schedule-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Programme schedule</p>
            <h2 id="schedule-title" className="display text-4xl font-semibold md:text-5xl">
              Three days, with time to build between rooms.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              The kickoff set a common brief. The two semifinal groups kept presentations to three
              minutes, and the final allowed roughly nine minutes for the pitch and demonstration,
              followed by two to three minutes of questions.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {eventSchedule.map((item) => (
              <li key={`${item.date}-${item.detail}`} className="glass-card p-6">
                <p className="eyebrow">{item.detail}</p>
                <h3 className="mt-3 font-serif text-xl font-semibold">{item.date}</h3>
                <p className="text-brand-700 dark:text-brand-300 mt-3 text-sm font-semibold">
                  {item.time}
                </p>
                <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm">{item.place}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="lenses-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Audience lenses</p>
            <h2 id="lenses-title" className="display text-4xl font-semibold md:text-5xl">
              The hackathon can also be studied as a learning design.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              The management lens describes the programme delivered to the incoming PGDM 2026–28
              cohort. The PhD lens below is an invitation to study the design; it does not imply
              that doctoral students attended this edition.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <article className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[22px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-9">
              <div
                className="bg-brand-400/20 absolute -right-16 -bottom-20 h-64 w-64 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                    <CompassIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-blue-100 uppercase">
                    Delivered context
                  </span>
                </div>
                <p className="font-mono text-xs tracking-[0.16em] text-blue-200 uppercase">
                  MBA / management lens
                </p>
                <h3 className="mt-3 font-serif text-3xl font-semibold">
                  Turn a user problem into an adoption case.
                </h3>
                <ul className="mt-6 grid gap-3 text-sm text-blue-50 sm:grid-cols-2">
                  <li className="rounded-xl border border-white/10 bg-white/5 p-3">
                    Strategic problem framing
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 p-3">
                    User value &amp; usefulness
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 p-3">
                    Feasibility &amp; adoption
                  </li>
                  <li className="rounded-xl border border-white/10 bg-white/5 p-3">
                    Institutional impact
                  </li>
                </ul>
              </div>
            </article>

            <article className="glass-card relative overflow-hidden p-7 sm:p-9">
              <div
                className="bg-accent-400/10 absolute -top-20 -right-14 h-64 w-64 rounded-full blur-3xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div className="bg-accent-400/10 text-accent-600 dark:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl">
                    <GraduationCapIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="tag tag-amber">Research extension</span>
                </div>
                <p className="eyebrow">PhD / research lens</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold">
                  Treat the prototype as an intervention to examine.
                </h3>
                <ul className="text-ink-700 dark:text-ink-200 mt-6 grid gap-3 text-sm sm:grid-cols-2">
                  <li className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-3">
                    Research question &amp; constructs
                  </li>
                  <li className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-3">
                    Evidence &amp; provenance
                  </li>
                  <li className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-3">
                    Validation &amp; reproducibility
                  </li>
                  <li className="border-ink-200/80 dark:border-ink-700 rounded-xl border p-3">
                    Ethics &amp; limitations
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="challenge-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Challenge themes</p>
              <h2 id="challenge-title" className="display text-4xl font-semibold md:text-5xl">
                Start with a problem worth solving.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Students could choose from nine themes. The list gave teams a place to begin while
              leaving the actual problem, user and form of the prototype to them.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            <article className="glass-card p-7 lg:col-span-3">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 flex h-10 w-10 items-center justify-center rounded-xl">
                  <NetworkIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="eyebrow">Challenge themes</p>
                  <h3 className="font-serif text-xl font-semibold">Where teams looked</h3>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {challengeThemes.map((theme) => (
                  <li key={theme} className="tag tag-ink px-3 py-2 text-xs">
                    {theme}
                  </li>
                ))}
              </ul>
            </article>

            <article className="from-brand-50 to-accent-400/10 dark:from-brand-900/30 dark:to-accent-400/5 border-brand-200/60 dark:border-brand-700/40 rounded-[18px] border bg-gradient-to-br p-7 lg:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-xl text-white">
                  <SparkIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="eyebrow">Prototype areas</p>
                  <h3 className="font-serif text-xl font-semibold">What emerged</h3>
                </div>
              </div>
              <ul className="text-ink-700 dark:text-ink-200 grid gap-2.5 text-sm">
                {prototypeAreas.map((area) => (
                  <li key={area} className="flex items-center gap-3">
                    <span
                      className="bg-accent-500 h-1.5 w-1.5 shrink-0 rounded-full"
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="gallery-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">05 / In the room</p>
              <h2 id="gallery-title" className="display text-4xl font-semibold md:text-5xl">
                A demo makes assumptions visible.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                A working link changes the conversation. Teams had to show what their prototype did,
                explain who it helped and answer questions about whether Great Lakes could actually
                use it.
              </p>
            </div>
            <figure className="glass-card overflow-hidden p-2 lg:col-span-8">
              <Image
                src="/images/ai-hackathon/hackathon-room.jpg"
                alt="A presenter explaining an AI-enabled prototype during the hackathon"
                width={4608}
                height={3072}
                className="aspect-[16/9] w-full rounded-[14px] object-cover object-center"
              />
              <figcaption className="text-ink-500 dark:text-ink-400 px-3 py-3 text-xs">
                Prototype demonstration and live discussion during the hackathon.
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section aria-labelledby="evaluation-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">06 / What the jury considered</p>
            <h2 id="evaluation-title" className="display text-4xl font-semibold md:text-5xl">
              The final decision rested on five practical questions.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              The 4 July final notice announced ten teams and a jury of three alumni. That panel
              used the five criteria below, which are intentionally narrower than the broader
              learning rubric introduced at the kickoff.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {finalJuryCriteria.map((criterion, index) => (
              <li key={criterion} className="glass-card p-6">
                <p className="text-brand-600 dark:text-brand-300 font-mono text-sm">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-4 font-serif text-lg font-semibold">{criterion}</p>
              </li>
            ))}
          </ol>

          <article className="border-ink-200/80 dark:border-ink-700 mt-6 rounded-[18px] border p-6 sm:p-8">
            <h3 className="font-serif text-2xl font-semibold">The broader learning rubric</h3>
            <p className="text-ink-600 dark:text-ink-300 mt-2 max-w-3xl text-sm leading-relaxed">
              At kickoff, teams were also asked to think about originality, teamwork and responsible
              use—not only the final ranking. Keeping these two lists separate matters: one guided
              the learning; the other guided the final jury.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {learningRubric.map((criterion) => (
                <li key={criterion} className="tag tag-ink">
                  {criterion}
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section aria-labelledby="outputs-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 rounded-[24px] bg-gradient-to-br p-7 text-white sm:p-10">
            <p className="font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
              07 / What each team brought
            </p>
            <h2 id="outputs-title" className="mt-3 font-serif text-4xl font-semibold">
              Each team had to bring work the room could test.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100">
              Teams of up to about fifteen could divide the work across Build, Users &amp; Business,
              and Story &amp; Demo pods. The team lead, three pod leads and a nominated presenter
              kept those streams connected.
            </p>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-serif text-2xl font-semibold">Required submission</h3>
                <ul className="mt-4 space-y-2 text-sm text-blue-50">
                  <li>Pain area, problem statement and target user</li>
                  <li>An accessible prototype link and working demonstration</li>
                  <li>A short pitch covering the problem, solution and user benefit</li>
                  <li>A clear account of responsible AI choices</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-serif text-2xl font-semibold">The seven-slide deck</h3>
                <ol className="mt-4 grid gap-x-5 gap-y-2 text-sm text-blue-50 sm:grid-cols-2">
                  {[
                    "Title",
                    "Problem",
                    "Solution",
                    "Live Demo",
                    "User Benefit",
                    "Responsible AI",
                    "What’s Next",
                  ].map((slide, index) => (
                    <li key={slide}>
                      <span className="text-blue-300">{index + 1}.</span> {slide}
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="resources-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card relative overflow-hidden p-7 sm:p-10">
            <div
              className="bg-brand-500/10 absolute -top-24 -right-20 h-72 w-72 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="relative mb-8 max-w-2xl">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">08 / Source material and notes</p>
              <h2 id="resources-title" className="display text-4xl font-semibold">
                Read the brief and the thinking behind it.
              </h2>
            </div>

            <div className="relative grid gap-4 lg:grid-cols-3">
              <a
                href={briefingDeckUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border bg-white/40 p-6 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-white/[0.03] dark:focus-visible:ring-offset-slate-950"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-accent-400/10 text-accent-600 dark:text-accent-400 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <BricolageIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Public briefing deck · PDF</p>
                    <h3 className="font-serif text-2xl font-semibold">AI in 45 Minutes</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                      This is the public briefing resource used to introduce the build.
                    </p>
                    <span className="text-brand-700 dark:text-brand-400 mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      View the deck
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </div>
                </div>
              </a>

              <a
                href={responsibleAiPost.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border-ink-200 dark:border-ink-700 hover:border-brand-400 dark:hover:border-brand-500 focus-visible:ring-brand-500 rounded-2xl border bg-white/40 p-6 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-white/[0.03] dark:focus-visible:ring-offset-slate-950"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="eyebrow mb-2">LinkedIn field note</p>
                    <h3 className="font-serif text-2xl font-semibold">{responsibleAiPost.title}</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                      {responsibleAiPost.description}
                    </p>
                    <span className="text-brand-700 dark:text-brand-400 mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Read the post
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </div>
                </div>
              </a>

              <a
                href={linkedInProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group focus-visible:ring-brand-300 relative overflow-hidden rounded-2xl bg-[#0a66c2] p-6 text-white transition hover:bg-[#095ba9] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-offset-slate-950"
              >
                <div
                  className="absolute -right-12 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
                  aria-hidden="true"
                />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <LinkedInIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase">
                      LinkedIn posts
                    </p>
                    <h3 className="font-serif text-2xl font-semibold">
                      Follow the public conversation
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-blue-50">
                      I use LinkedIn to share what I am testing in the classroom, what students
                      teach me and where the next question leads.
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      Open LinkedIn
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
