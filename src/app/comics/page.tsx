import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

import { StoryCycle } from "./StoryCycle";
import styles from "./comics.module.css";
import { heManStory, spiderManStory, supermanStory } from "./storyCycles";

export const metadata: Metadata = {
  title: "Comics & Fiction — Aspiration, Hope and Resilience",
  description:
    "Three original, unofficial six-chapter story cycles exploring Spider-Man, Superman and He-Man through aspiration, hope and surviving against the odds.",
  keywords: [
    "comics and fiction",
    "Spider-Man",
    "Superman",
    "He-Man",
    "aspiration",
    "hope",
    "resilience",
    "surviving against the odds",
  ],
  alternates: { canonical: "/comics" },
  openGraph: {
    type: "article",
    title: "Comics & Fiction — Three Ways to Keep Going",
    description:
      "Three unofficial six-chapter story cycles move from immediate choices to higher-order ideas about responsibility, hope and stewardship.",
    url: "/comics",
  },
};

const branches = [
  {
    number: "01",
    name: "Spider-Man",
    href: "#spider-man",
    theme: "Responsibility after failure",
    description:
      "An ordinary life under extraordinary pressure—and the decision to let a mistake become a beginning, not an ending.",
  },
  {
    number: "02",
    name: "Superman",
    href: "#superman",
    theme: "Hope placed in service",
    description:
      "A survivor of a lost world who finds belonging, then measures strength by how carefully it protects other people.",
  },
  {
    number: "03",
    name: "He-Man",
    href: "#he-man",
    theme: "Courage with a purpose",
    description:
      "A fantasy of immense power whose better lesson is stewardship: strength matters when it answers to something larger.",
  },
] as const;

const sharedPractices = [
  {
    number: "01",
    title: "Name the difficulty",
    icon: SparkIcon,
    description:
      "Hope does not ask us to pretend that loss, fear or failure is smaller than it is. We begin by seeing clearly.",
  },
  {
    number: "02",
    title: "Choose the next act",
    icon: ArrowRightIcon,
    description:
      "Aspirations become real through the next responsible decision—not through certainty about the final outcome.",
  },
  {
    number: "03",
    title: "Use strength carefully",
    icon: BricolageIcon,
    description:
      "Ability becomes character when it protects dignity, shares agency and leaves other people stronger.",
  },
  {
    number: "04",
    title: "Keep tomorrow open",
    icon: CompassIcon,
    description:
      "Resilience is not endless toughness. It is the refusal to let today write every remaining page.",
  },
] as const;

const sourceLinkClass =
  "inline-flex min-h-11 items-center gap-2 font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-red-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:outline-none dark:text-blue-300 dark:focus-visible:ring-offset-slate-950";

const comicsInquiry = {
  socratic: [
    "Which part of a hero’s achievement depends on exceptional power, and which part remains available to an ordinary person?",
    "When does responsibility help repair a failure—and when can it harden into guilt that leaves no room for rest or growth?",
    "Who bears the cost when a powerful person decides alone what protection, justice, or rescue should mean?",
    "What would hope look like if victory remained uncertain, recognition never arrived, and only the next choice was available?",
  ],
  firstPrinciples: [
    "What makes an act courageous: the danger faced, the intention behind it, the cost accepted, or the person it serves?",
    "Peter Parker gets no clean reward and returns anyway—apart from any superhuman power, what relationships and knowledge have to already be in place for that kind of return to even be possible?",
    "If power is simply the capacity to affect another life, what constraints turn that capacity into trustworthy stewardship?",
    "What evidence would distinguish resilience from mere endurance—and recovery from the demand to remain endlessly strong?",
  ],
} as const;

export default function ComicsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header
        data-page-hero="full"
        className={`${styles.hero} relative isolate overflow-hidden text-white`}
      >
        <Container className="relative z-10 flex min-h-[620px] max-w-7xl flex-col justify-between py-8 sm:min-h-[700px] sm:py-16 lg:py-20">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] uppercase">
            <span className="h-px w-10 bg-yellow-300" aria-hidden="true" />
            Comics &amp; Fiction · Three ways to keep going
          </div>

          <div className="max-w-5xl py-14 sm:py-20">
            <p className="mb-5 font-serif text-xl text-yellow-200 italic sm:text-2xl">
              The odds may shape the struggle. They do not get the final word.
            </p>
            <h1 className="max-w-5xl font-serif text-5xl leading-[0.94] font-bold text-balance sm:text-7xl lg:text-8xl">
              Stories for the days when trying feels impossible.
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-100 sm:text-xl sm:leading-9">
              Comics make inner battles visible. Fear acquires a face. Responsibility becomes a
              choice. Hope takes action. Through three original interpretive story cycles, this page
              asks a simple question: when life narrows our options, what helps us continue?
            </p>

            <nav
              aria-label="Choose a Comics and Fiction branch"
              className="mt-9 flex flex-wrap gap-3"
            >
              {branches.map((branch) => (
                <a
                  key={branch.href}
                  href={branch.href}
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/30 bg-slate-950/20 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:border-yellow-300 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                  {branch.name}
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <p className="max-w-3xl border-l-2 border-yellow-300 pl-4 text-xs leading-6 text-slate-300">
            These are independent critical reflections and unofficial works of fiction. They are
            neither part of any published canon nor authorised continuations, and they do not claim
            that courage always wins quickly.
          </p>
        </Container>
      </header>

      <InquiryPrelude
        id="comics-inquiry"
        eyebrow="Before the first panel"
        title="What are we really asking a hero to carry?"
        introduction="These stories are invitations, not moral formulas. Begin by questioning what courage, power, failure and hope mean when choices are constrained and consequences are shared. The aim is to notice the human problem beneath the costume before drawing a lesson from the plot."
        socraticQuestions={comicsInquiry.socratic}
        firstPrinciplesQuestions={comicsInquiry.firstPrinciples}
      />

      <section
        aria-labelledby="branches-title"
        className="border-b border-slate-200 bg-white py-16 sm:py-20 dark:border-white/10 dark:bg-[#07101f]"
      >
        <Container className="max-w-7xl">
          <div className="max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow">Choose a branch</p>
            <h2 id="branches-title" className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
              Three heroes. Three kinds of endurance.
            </h2>
          </div>

          <div className="mt-10 grid border border-slate-200 md:grid-cols-3 dark:border-white/10">
            {branches.map((branch) => (
              <a
                key={branch.href}
                href={branch.href}
                className={`${styles.branchCard} group min-h-72 border-b border-slate-200 p-6 transition focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none md:border-r md:border-b-0 md:last:border-r-0 dark:border-white/10`}
              >
                <span className="font-mono text-sm font-bold text-red-700 dark:text-red-400">
                  {branch.number}
                </span>
                <h3 className="mt-10 font-serif text-3xl font-bold text-slate-950 dark:text-white">
                  {branch.name}
                </h3>
                <p className="mt-2 text-sm font-bold text-blue-700 dark:text-blue-300">
                  {branch.theme}
                </p>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {branch.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-slate-950 group-hover:text-red-700 dark:text-white dark:group-hover:text-yellow-200">
                  Enter this branch
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="spider-man"
        aria-labelledby="spider-man-title"
        className="scroll-mt-28 py-20 sm:py-28"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-sm font-bold text-red-700 uppercase dark:text-red-400">
                01 / Spider-Man
              </p>
              <h2
                id="spider-man-title"
                className="mt-4 font-serif text-4xl leading-tight font-bold sm:text-6xl"
              >
                Responsibility begins after the mistake.
              </h2>
              <p
                className={`${styles.pullQuote} mt-10 font-serif text-2xl font-semibold sm:text-3xl`}
              >
                We are not only what went wrong. We are also what we decide to do next.
              </p>
            </div>

            <div>
              <div className={`${styles.prose} text-slate-700 dark:text-slate-300`}>
                <p className="text-xl leading-9 text-slate-950 dark:text-white">
                  Peter Parker is compelling because extraordinary ability does not free him from
                  ordinary pressure. He still faces grief, self-doubt, relationships, work and the
                  fear of not being enough.
                </p>
                <p>
                  Created by Stan Lee and Steve Ditko, Spider-Man first appeared in{" "}
                  <em>Amazing Fantasy</em> #15 in 1962. His origin turns on a painful failure to
                  act. The lasting idea is not that a hero never fails; it is that remorse can
                  become responsibility when it changes the way a person lives.
                </p>
                <p>
                  His version of survival is untidy. He carries competing duties and seldom receives
                  a clean reward. Yet he returns, repairs what he can and accepts that doing the
                  right thing may remain difficult. Aspiration here is not escape from an ordinary
                  life. It is the effort to live that life with greater care.
                </p>
              </div>

              <dl className="mt-10 grid border-y border-slate-200 sm:grid-cols-3 dark:border-white/10">
                {[
                  ["1962", "First appearance"],
                  ["Amazing Fantasy #15", "Debut story"],
                  ["Lee & Ditko", "Credited creators"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-b border-slate-200 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0 dark:border-white/10"
                  >
                    <dt className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                      {label}
                    </dt>
                    <dd className="mt-2 font-serif text-lg font-bold text-slate-950 dark:text-white">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="https://en.wikipedia.org/wiki/Spider-Man"
                target="_blank"
                rel="noopener noreferrer"
                className={`${sourceLinkClass} mt-8`}
              >
                Read the Spider-Man reference
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <StoryCycle
            story={spiderManStory}
            characterName="Spider-Man"
            slug="spider-man"
            tone="spider"
          />
        </Container>
      </section>

      <section
        id="superman"
        aria-labelledby="superman-title"
        className={`${styles.supermanBand} scroll-mt-28 py-20 text-white sm:py-28`}
      >
        <Container className="max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-20">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden border border-white/20 bg-slate-900">
                <Image
                  src="/images/comics/flying-superman.jpg"
                  alt="A Superman cosplayer in a blue suit and red cape leaping upward with one arm raised"
                  fill
                  className="object-cover object-[70%_24%]"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
              <figcaption className="mt-4 text-[11px] leading-5 text-slate-300 sm:text-xs">
                Superman cosplay at Dragon Con 2009, cropped for display. Photograph by{" "}
                <a
                  href="https://commons.wikimedia.org/wiki/File:Flying_Superman.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline decoration-white/60 underline-offset-2 hover:text-yellow-200"
                >
                  J F Willis / Wikimedia Commons
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                , licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by-sa/2.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white underline decoration-white/60 underline-offset-2 hover:text-yellow-200"
                >
                  CC BY-SA 2.0
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </figcaption>
            </figure>

            <div>
              <p className="text-sm font-bold text-yellow-300 uppercase">02 / Superman</p>
              <h2
                id="superman-title"
                className="mt-4 font-serif text-4xl leading-tight font-bold sm:text-6xl"
              >
                Hope is power that stays gentle.
              </h2>
              <div className={`${styles.prose} mt-8 text-slate-300`}>
                <p className="text-xl leading-9 text-white">
                  Superman begins as a survivor. Kal-El is sent to Earth as a baby shortly before
                  Krypton is destroyed, finds a home with Jonathan and Martha Kent, and grows into
                  Clark Kent. His future is not a restoration of the world he lost. It is a life of
                  belonging built after loss.
                </p>
                <p>
                  Jerry Siegel and Joe Shuster introduced Superman in <em>Action Comics</em> #1 in
                  1938. The character helped establish the language of the modern superhero, but
                  spectacle is only part of his endurance. The deeper question is what someone with
                  immense power chooses to do with it.
                </p>
                <p>
                  Superman can stand above humanity, yet repeatedly chooses closeness, service and
                  restraint. His hope is not a forecast that nothing will break. It is a commitment
                  to protect what can still be saved without allowing catastrophe to turn strength
                  into bitterness.
                </p>
              </div>

              <dl className="mt-10 grid border-y border-white/20 sm:grid-cols-3">
                {[
                  ["18 April 1938", "First published"],
                  ["Action Comics #1", "First appearance"],
                  ["Siegel & Shuster", "Credited creators"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-b border-white/20 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <dt className="text-xs font-semibold text-slate-400 uppercase">{label}</dt>
                    <dd className="mt-2 font-serif text-lg font-bold text-white">{value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="https://en.wikipedia.org/wiki/Superman"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-yellow-200 underline decoration-yellow-300/70 underline-offset-4 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
              >
                Read the Superman reference
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <StoryCycle
            story={supermanStory}
            characterName="Superman"
            slug="superman"
            tone="superman"
          />
        </Container>
      </section>

      <section
        id="he-man"
        aria-labelledby="he-man-title"
        className={`${styles.heManBand} scroll-mt-28 py-20 sm:py-28`}
      >
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-sm font-bold text-purple-900 uppercase">03 / He-Man</p>
              <h2
                id="he-man-title"
                className="mt-4 font-serif text-4xl leading-tight font-bold text-slate-950 sm:text-6xl"
              >
                Strength answers to something larger.
              </h2>
              <div className="mt-10 grid grid-cols-[3rem_1fr] gap-5 border-t-4 border-purple-800 pt-6">
                <CompassIcon className="h-8 w-8 text-purple-800" aria-hidden="true" />
                <p className="font-serif text-2xl font-semibold text-slate-950 sm:text-3xl">
                  Courage is not the absence of fear. It is power given a purpose.
                </p>
              </div>
            </div>

            <div>
              <div className={`${styles.prose} text-slate-800`}>
                <p className="text-xl leading-9 text-slate-950">
                  He-Man&apos;s world is openly mythic: swords, sorcery, transformation and a battle
                  to defend Eternia. Yet beneath the scale sits a familiar question. Is strength a
                  possession, or is it a responsibility held on behalf of others?
                </p>
                <p>
                  Developed for Mattel by designers including Roger Sweet and Mark Taylor, He-Man
                  first appeared in <em>He-Man and the Power Sword</em> in 1981. His origin changes
                  across continuities. The early mini-comics present a barbarian hero; the familiar
                  Filmation series presents Prince Adam transforming through the Power Sword.
                </p>
                <p>
                  That variation is part of the character&apos;s long life. A recurring idea is
                  stewardship: He-Man and his allies protect a vulnerable world from forces that
                  would turn power into domination. Surviving against the odds is a shared effort,
                  sustained by loyalty, courage and the willingness to stand between danger and
                  those who cannot face it alone.
                </p>
              </div>

              <dl className="mt-10 grid border-y border-slate-900/20 sm:grid-cols-3">
                {[
                  ["1981", "First appearance"],
                  ["Masters of the Universe", "Story world"],
                  ["Adam / He-Man", "Familiar continuity"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="border-b border-slate-900/20 py-5 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                  >
                    <dt className="text-xs font-semibold text-slate-600 uppercase">{label}</dt>
                    <dd className="mt-2 font-serif text-lg font-bold text-slate-950">{value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="https://en.wikipedia.org/wiki/He-Man"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-purple-900 underline decoration-purple-500 underline-offset-4 transition hover:text-red-800 focus-visible:ring-2 focus-visible:ring-purple-800 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                Read the He-Man reference
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <StoryCycle story={heManStory} characterName="He-Man" slug="he-man" tone="heMan" />
        </Container>
      </section>

      <section aria-labelledby="shared-map-title" className="py-20 sm:py-28">
        <Container className="max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow">A shared map</p>
              <h2 id="shared-map-title" className="mt-4 font-serif text-4xl font-bold sm:text-6xl">
                Four moves for ordinary days.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">
              Fiction matters when it returns us to real life with a little more room to act. These
              are not superpowers. They are practices available before the outcome is certain.
            </p>
          </div>

          <ol className="mt-14 grid border border-slate-200 bg-white md:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-[#07101f]">
            {sharedPractices.map((practice) => {
              const Icon = practice.icon;

              return (
                <li
                  key={practice.number}
                  className="min-h-72 border-b border-slate-200 p-6 md:border-r md:even:border-r-0 lg:border-b-0 lg:last:border-r-0 lg:even:border-r dark:border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-red-700 dark:text-red-400">
                      {practice.number}
                    </span>
                    <Icon className="h-6 w-6 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                  </div>
                  <h3 className="mt-10 font-serif text-3xl font-bold text-slate-950 dark:text-white">
                    {practice.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {practice.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <section
        aria-labelledby="closing-title"
        className={`${styles.closing} relative overflow-hidden py-24 text-white sm:py-32`}
      >
        <Container className="relative z-10 max-w-5xl text-center">
          <p className="eyebrow" style={{ color: "var(--color-yellow-300)" }}>
            The next panel
          </p>
          <h2
            id="closing-title"
            className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight font-bold sm:text-6xl"
          >
            Survival is not the last page. It is the chance to write the next one.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Spider-Man does not erase his mistake. Superman does not recover Krypton. He-Man does
            not make Eternia safe forever. Their stories endure because each hero continues:
            responsible enough to return, hopeful enough to serve and courageous enough to stand up
            again.
          </p>
          <p className="mt-9 font-serif text-2xl text-yellow-200 italic">
            We do not need to be invulnerable. We need a reason to keep going.
          </p>
        </Container>
      </section>

      <section aria-labelledby="sources-title" className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="grid gap-10 border-t border-slate-300 pt-10 lg:grid-cols-[0.7fr_1.3fr] dark:border-white/15">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow">Sources &amp; note</p>
              <h2 id="sources-title" className="mt-3 font-serif text-3xl font-bold">
                Read beyond this reflection.
              </h2>
            </div>
            <div>
              <ul className="grid gap-3 text-sm sm:grid-cols-3">
                {[
                  ["Spider-Man", "https://en.wikipedia.org/wiki/Spider-Man"],
                  ["Superman", "https://en.wikipedia.org/wiki/Superman"],
                  ["He-Man", "https://en.wikipedia.org/wiki/He-Man"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={sourceLinkClass}
                    >
                      Wikipedia · {name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-7 max-w-3xl text-xs leading-6 text-slate-500 dark:text-slate-400">
                Character facts are summarised from the linked overview pages. These story cycles
                and their fictional situations were written for this page as an independent,
                unofficial critical reflection. They are not summaries of published stories, part of
                any official canon, or authorised continuations. Comic and screen continuities vary,
                especially for He-Man. Spider-Man, Superman, He-Man and their related properties
                belong to their respective rights holders. The independently licensed Superman
                cosplay photograph is credited above; nothing on this page implies endorsement by
                the photographer, Wikimedia Commons or any rights holder.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
