import type { Metadata } from "next";
import Image from "next/image";

import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

import styles from "./superman.module.css";

export const metadata: Metadata = {
  title: "Superman — The Discipline of Hope",
  description:
    "An original reflection on Superman, comics and hope: why the character's deepest power is the repeated choice to protect, serve and believe in a better tomorrow.",
  keywords: [
    "Superman",
    "comics",
    "fiction",
    "hope",
    "Clark Kent",
    "Kal-El",
    "Jerry Siegel",
    "Joe Shuster",
    "Action Comics",
  ],
  alternates: { canonical: "/comics/" },
  openGraph: {
    type: "article",
    title: "Superman — The Discipline of Hope",
    description:
      "Power may make the spectacle. Hope makes the hero. An essay on Superman's enduring moral imagination.",
    url: "/comics/",
    images: [
      {
        url: "/images/comics/guardian-of-hope.png",
        width: 1672,
        height: 941,
        alt: "An original comic-book guardian overlooking a city at sunrise",
      },
    ],
  },
};

const history = [
  {
    year: "1938",
    title: "A new archetype",
    description:
      "Jerry Siegel and Joe Shuster's creation appears in Action Comics #1 and helps establish the grammar of the modern superhero.",
  },
  {
    year: "1978",
    title: "A crest becomes inheritance",
    description:
      "The feature film reframes the chest mark as the crest of the House of El, connecting identity with family and origin.",
  },
  {
    year: "2003",
    title: "The mark becomes hope",
    description:
      "Superman: Birthright describes the crest as an old Kryptonian symbol for hope, deepening a meaning readers had long felt.",
  },
  {
    year: "Today",
    title: "A better tomorrow",
    description:
      "Across comics and screens, the durable idea is not invulnerability. It is strength placed in service of other people.",
  },
] as const;

const principles = [
  {
    number: "01",
    title: "Look up",
    description:
      "Hope begins by refusing to make the present moment the limit of what is possible.",
  },
  {
    number: "02",
    title: "Move closer",
    description:
      "Compassion is not observation from a distance. It closes the space between power and need.",
  },
  {
    number: "03",
    title: "Choose restraint",
    description:
      "The moral use of strength is measured as much by what it refuses to do as by what it can do.",
  },
  {
    number: "04",
    title: "Leave light behind",
    description:
      "A hopeful act enlarges another person's capacity to act. Rescue should return agency, not collect admiration.",
  },
] as const;

const readingTrail = [
  {
    title: "Superman: Birthright",
    meta: "Mark Waid & Leinil Francis Yu · 2003–04",
    reason: "For belonging, identity and the explicit language of the crest as hope.",
  },
  {
    title: "Superman for All Seasons",
    meta: "Jeph Loeb & Tim Sale · 1998",
    reason: "For the quiet moral education of Clark Kent and the people who make him human.",
  },
  {
    title: "All-Star Superman",
    meta: "Grant Morrison & Frank Quitely · 2005–08",
    reason: "For mortality, tenderness and the question of what great power leaves behind.",
  },
  {
    title: "Action Comics #775",
    meta: "Joe Kelly, Doug Mahnke & Lee Bermejo · 2001",
    reason: "For a defence of principle when cynicism mistakes cruelty for realism.",
  },
] as const;

export default function ComicsPage() {
  return (
    <main id="main-content">
      <header className={`${styles.hero} relative isolate overflow-hidden text-white`}>
        <Image
          src="/images/comics/guardian-of-hope.png"
          alt="An original comic-book illustration of a caped guardian watching a city awaken as teachers, neighbors and first responders help others"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <Container className="relative z-10 flex min-h-[68svh] max-w-7xl flex-col justify-between py-8 sm:min-h-[720px] sm:py-16 lg:py-20">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase">
            <span className="h-px w-10 bg-yellow-300" aria-hidden="true" />
            Comics &amp; Fiction · Reading 01
          </div>

          <div className="max-w-3xl py-10 sm:py-20">
            <p className="mb-5 font-serif text-xl text-yellow-200 italic sm:text-2xl">
              Power makes the spectacle. Hope makes the hero.
            </p>
            <h1 className="font-serif text-5xl leading-[0.92] font-bold sm:text-7xl lg:text-8xl">
              Superman
              <span className="mt-3 block text-3xl font-normal text-white sm:text-5xl">
                The discipline of hope.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-slate-100 sm:text-lg sm:leading-8">
              Not optimism without evidence. Not confidence that nothing will break. Hope is the
              decision that, even when the world is breakable, our strength can still be used to
              hold it together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#essay"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-yellow-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Read the essay
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#reading-trail"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/40 bg-slate-950/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-slate-950/40 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Find a story
              </a>
            </div>
          </div>

          <p className="max-w-xl border-l-2 border-red-500 pl-4 text-[11px] leading-5 text-slate-300 sm:text-xs">
            Original editorial artwork: an unnamed guardian inspired by the hopeful tradition of
            superhero comics.
          </p>
        </Container>
      </header>

      <section aria-label="Superman at a glance" className="border-b border-slate-200 bg-white dark:border-white/10 dark:bg-[#07101f]">
        <Container className="max-w-7xl">
          <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["18 April 1938", "First published"],
              ["Jerry Siegel", "Writer and co-creator"],
              ["Joe Shuster", "Artist and co-creator"],
              ["Action Comics #1", "First appearance"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border-b border-slate-200 px-4 py-6 sm:border-r sm:px-6 sm:last:border-r-0 lg:border-b-0 dark:border-white/10"
              >
                <dt className="text-xs font-semibold text-slate-500 uppercase dark:text-slate-400">
                  {label}
                </dt>
                <dd className="mt-2 font-serif text-xl font-bold text-slate-950 dark:text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="essay" aria-labelledby="essay-title" className="py-20 sm:py-28">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold text-red-700 uppercase dark:text-red-400">
                01 / The enduring question
              </p>
              <h2
                id="essay-title"
                className="mt-4 font-serif text-4xl leading-tight font-bold text-slate-950 sm:text-6xl dark:text-white"
              >
                What is strength for?
              </h2>
              <div className={`${styles.pullQuote} mt-10`}>
                <p className="font-serif text-2xl leading-snug font-semibold text-slate-950 sm:text-3xl dark:text-white">
                  “Hope is not a forecast. It is a moral position.”
                </p>
              </div>
            </div>

            <div className={`${styles.prose} text-slate-700 dark:text-slate-300`}>
              <p className="text-xl leading-9 text-slate-950 dark:text-white">
                Superman has survived because his central problem was never whether he could lift
                the impossible weight. It was whether a person with almost unlimited power could
                remain gentle, accountable and close to ordinary life.
              </p>
              <p>
                Created by writer Jerry Siegel and artist Joe Shuster, Superman first appeared in{" "}
                <em>Action Comics</em> #1 in 1938. He helped popularize the superhero form: the
                costume, the secret identity, the extraordinary ability directed toward public
                good. But conventions alone do not explain nearly nine decades of attention.
              </p>
              <p>
                His deeper appeal is a reversal of the usual fantasy of power. Superman can dominate,
                yet chooses to serve. He can stand above humanity, yet chooses to live among people
                as Clark Kent. He arrives from a world that could not be saved, yet does not make
                loss an excuse for bitterness.
              </p>
              <p>
                That is where hope enters. Hope is not his confidence that he will always win. It is
                his refusal to let suffering decide what kind of person he becomes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="history-title" className={`${styles.historyBand} py-20 text-white sm:py-24`}>
        <Container className="max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-yellow-300 uppercase">02 / A changing symbol</p>
            <h2 id="history-title" className="mt-4 font-serif text-4xl font-bold sm:text-6xl">
              From initial to inheritance to hope.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-300">
              The meaning of the chest emblem evolved across media. The evolution matters because
              stories often discover their deepest significance slowly.
            </p>
          </div>

          <ol className="mt-14 grid gap-0 border-t border-white/20 md:grid-cols-4">
            {history.map((moment, index) => (
              <li
                key={moment.year}
                className="relative border-b border-white/20 px-5 py-8 md:border-r md:border-b-0 md:last:border-r-0"
              >
                <span
                  className="absolute -top-1.5 left-5 h-3 w-3 bg-yellow-300"
                  aria-hidden="true"
                />
                <p className="font-mono text-sm font-bold text-red-400">{moment.year}</p>
                <h3 className="mt-4 font-serif text-2xl font-bold">{moment.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{moment.description}</p>
                <span className="sr-only">Milestone {index + 1} of {history.length}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="four-meanings-title" className="py-20 sm:py-28">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-sm font-bold text-red-700 uppercase dark:text-red-400">
                03 / Four meanings
              </p>
              <h2
                id="four-meanings-title"
                className="mt-4 font-serif text-4xl leading-tight font-bold sm:text-5xl"
              >
                The humanity inside the myth.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                The cape attracts attention. The choices beneath it sustain the story.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-white/10 dark:border-white/10">
              <article className="grid gap-5 py-10 sm:grid-cols-[3rem_1fr]">
                <SparkIcon className="h-7 w-7 text-yellow-600 dark:text-yellow-300" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-3xl font-bold">Hope survives the journey.</h3>
                  <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">
                    Kal-El&apos;s story begins with catastrophe. Krypton is lost, his parents cannot
                    follow, and a child crosses the dark alone. Yet his life on Earth becomes more
                    than survival. Jonathan and Martha Kent give him language, belonging and a moral
                    home. Hope here is not a return to what was. It is the courage to belong again.
                  </p>
                </div>
              </article>

              <article className="grid gap-5 py-10 sm:grid-cols-[3rem_1fr]">
                <CompassIcon className="h-7 w-7 text-blue-700 dark:text-blue-300" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-3xl font-bold">Power chooses restraint.</h3>
                  <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">
                    Invulnerability is a physical condition; restraint is a moral achievement. The
                    hopeful Superman does not ask only, “Can I stop this?” He asks what protection
                    preserves dignity, what force is proportionate and what future remains after the
                    rescue. His power is credible because it accepts limits from within.
                  </p>
                </div>
              </article>

              <article className="grid gap-5 py-10 sm:grid-cols-[3rem_1fr]">
                <BricolageIcon className="h-7 w-7 text-red-700 dark:text-red-400" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-3xl font-bold">Clark Kent keeps him near.</h3>
                  <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">
                    Clark is not merely camouflage. As a reporter, colleague, son and friend, he
                    remains accountable to the human scale: deadlines, questions, evidence and
                    relationships. The secret identity protects something more valuable than
                    anonymity. It protects his capacity to listen before he acts.
                  </p>
                </div>
              </article>

              <article className="grid gap-5 py-10 sm:grid-cols-[3rem_1fr]">
                <ArrowRightIcon className="h-7 w-7 text-slate-700 dark:text-slate-200" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-3xl font-bold">Tomorrow is a direction.</h3>
                  <p className="mt-4 leading-8 text-slate-700 dark:text-slate-300">
                    “A better tomorrow” is deliberately unfinished. It turns hope from a feeling
                    into orientation. We may not control the whole horizon, but we can choose the
                    next truthful report, the next protective act, the next use of strength that
                    leaves another person standing taller.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="practice-title" className={`${styles.practice} py-20 sm:py-24`}>
        <Container className="max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
            <div>
              <p className="text-sm font-bold text-red-700 uppercase">04 / The hope protocol</p>
              <h2 id="practice-title" className="mt-4 font-serif text-4xl font-bold sm:text-6xl">
                Four moves for ordinary days.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-700">
              Fiction earns its place when it returns us to reality with better questions. These are
              not superpowers. They are choices available before the cape arrives.
            </p>
          </div>

          <ol className="mt-14 grid border border-slate-900/15 bg-white md:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <li
                key={principle.number}
                className="min-h-64 border-b border-slate-900/15 p-6 md:border-r md:even:border-r-0 lg:border-b-0 lg:even:border-r lg:last:border-r-0"
              >
                <span className="font-mono text-sm font-bold text-red-700">{principle.number}</span>
                <h3 className="mt-10 font-serif text-3xl font-bold text-slate-950">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{principle.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="reading-trail" aria-labelledby="reading-title" className="py-20 sm:py-28">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-sm font-bold text-red-700 uppercase dark:text-red-400">
                05 / Reading trail
              </p>
              <h2 id="reading-title" className="mt-4 font-serif text-4xl font-bold sm:text-5xl">
                Four doors into hope.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
                Not a ranking. Each story illuminates a different part of the character&apos;s moral
                imagination.
              </p>
            </div>

            <div className="border-t border-slate-300 dark:border-white/15">
              {readingTrail.map((book, index) => (
                <article
                  key={book.title}
                  className="grid gap-4 border-b border-slate-300 py-7 sm:grid-cols-[3rem_1fr] dark:border-white/15"
                >
                  <span className="font-mono text-sm font-bold text-red-700 dark:text-red-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-bold">{book.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-blue-700 dark:text-blue-300">
                      {book.meta}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {book.reason}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="closing-title" className={`${styles.closing} relative overflow-hidden py-24 text-white sm:py-32`}>
        <Container className="relative z-10 max-w-5xl text-center">
          <p className="text-sm font-bold text-yellow-300 uppercase">The last panel</p>
          <h2 id="closing-title" className="mx-auto mt-5 max-w-4xl font-serif text-4xl leading-tight font-bold sm:text-6xl">
            The world does not need us to be invulnerable.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            It needs us to remain available to one another: honest enough to see the danger, strong
            enough to help, and hopeful enough to believe that help still matters.
          </p>
          <p className="mt-9 font-serif text-2xl text-yellow-200 italic">Look up. Then look around.</p>
        </Container>
      </section>

      <section aria-labelledby="sources-title" className="py-16 sm:py-20">
        <Container className="max-w-6xl">
          <div className="grid gap-10 border-t border-slate-300 pt-10 lg:grid-cols-[0.7fr_1.3fr] dark:border-white/15">
            <div>
              <p className="text-sm font-bold text-red-700 uppercase dark:text-red-400">
                Sources &amp; note
              </p>
              <h2 id="sources-title" className="mt-3 font-serif text-3xl font-bold">
                Read beyond this page.
              </h2>
            </div>
            <div>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Superman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-red-700 dark:text-blue-300"
                  >
                    Wikipedia · Superman
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://en.wikipedia.org/wiki/Origin_of_Superman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-red-700 dark:text-blue-300"
                  >
                    Wikipedia · Origin of Superman
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.dc.com/characters/superman"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-red-700 dark:text-blue-300"
                  >
                    DC · Official Superman character profile
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
              <p className="mt-7 max-w-3xl text-xs leading-6 text-slate-500 dark:text-slate-400">
                This is an independent, non-commercial critical reflection. Superman and related
                character names are trademarks of DC. The hero artwork on this page is an original
                illustration of an unnamed guardian and is not official DC artwork.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
