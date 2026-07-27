import type { Metadata } from "next";

import { ArrowRightIcon, CompassIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

import { ScriptureExplorer } from "./ScriptureExplorer";

export const metadata: Metadata = {
  title: "Spirituality — Sacred Texts for Study and Reflection",
  description:
    "A multilingual devotional study library for the Hanuman Chalisa, Vishnu Sahasranama and Lalita Sahasranama with Sanskrit, Roman transliteration, Hindi explanation and English meaning.",
  keywords: [
    "Hanuman Chalisa",
    "Vishnu Sahasranama",
    "Lalita Sahasranama",
    "Sanskrit transliteration",
    "Hindi meaning",
    "English meaning",
    "devotional study",
  ],
  alternates: { canonical: "/spirituality/" },
  openGraph: {
    type: "website",
    title: "Sacred Texts — Read, Reflect, Return",
    description: "A respectful multilingual reader for three beloved devotional works.",
    url: "/spirituality/",
  },
};

const collections = [
  {
    title: "हनुमान चालीसा",
    transliteration: "Hanumān Cālīsā",
    description: "Devotion expressed through courage, wisdom, service and remembrance.",
  },
  {
    title: "विष्णु सहस्रनाम",
    transliteration: "Viṣṇu Sahasranāma",
    description: "A thousand names contemplating the all-pervading sustaining presence.",
  },
  {
    title: "ललिता सहस्रनाम",
    transliteration: "Lalitā Sahasranāma",
    description: "A thousand names celebrating the Divine Mother, consciousness and grace.",
  },
] as const;

export default function SpiritualityPage() {
  return (
    <main>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div className="relative isolate overflow-hidden rounded-[30px] border border-amber-200/20 bg-gradient-to-br from-[#220b09] via-[#70230f] to-[#b45309] px-6 py-12 text-white shadow-2xl shadow-amber-950/25 sm:px-10 sm:py-16 lg:px-14">
            <div
              className="absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full bg-amber-300/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full bg-rose-400/15 blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.4fr]">
              <div>
                <span className="inline-flex rounded-full border border-amber-100/20 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-amber-100 uppercase backdrop-blur-sm">
                  Sacred texts · Study &amp; reflection
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Read slowly.{" "}
                  <span className="font-normal text-amber-200 italic">Return inward.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-amber-50 sm:text-lg">
                  A multilingual devotional library designed for understanding as well as
                  recitation—bringing Sanskrit, Roman transliteration, Hindi explanation and English
                  meaning into one calm reading experience.
                </p>
                <a
                  href="#scripture-reader"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-950 shadow-lg shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-white focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:outline-none"
                >
                  Begin the guided reading
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="rounded-3xl border border-amber-100/15 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p className="font-serif text-6xl text-amber-200" aria-hidden="true">
                  ॐ
                </p>
                <p className="mt-4 font-serif text-2xl font-semibold">श्रद्धा · ज्ञान · शान्ति</p>
                <p className="mt-2 text-xs tracking-wider text-amber-100 uppercase">
                  Reverence · Understanding · Peace
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="collection-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / The collection</p>
            <h2 id="collection-title" className="display text-4xl font-semibold md:text-5xl">
              Three paths of remembrance.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {collections.map((collection, index) => (
              <article key={collection.title} className="glass-card p-6">
                <span className="text-ink-400 font-mono text-[10px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 lang="sa" className="mt-3 font-serif text-2xl font-semibold">
                  {collection.title}
                </h3>
                <p className="text-brand-700 dark:text-brand-300 mt-1 text-sm italic">
                  {collection.transliteration}
                </p>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-relaxed">
                  {collection.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="scripture-reader" aria-labelledby="reader-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / Multilingual reader</p>
              <h2 id="reader-title" className="display text-4xl font-semibold md:text-5xl">
                Sound, script and meaning together.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Roman transliteration supports pronunciation; Hindi and English glosses support
              contemplation. Search across all four layers, then continue into the complete text.
            </p>
          </div>
          <ScriptureExplorer />
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#220b09] to-[#7c2d12] p-7 text-white shadow-xl shadow-amber-950/15 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <CompassIcon className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-4xl font-semibold">
                  A reader for study—not a substitute for tradition.
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-amber-50">
                <p>
                  Pronunciation, sandhi and interpretation can vary across lineages. The short
                  meanings here are learning aids, not exhaustive commentaries.
                </p>
                <p>
                  For formal recitation, initiation or ritual guidance, learn with a qualified
                  teacher and follow the practice of your family or tradition.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="sources-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <SparkIcon
                className="text-accent-600 dark:text-accent-400 h-7 w-7"
                aria-hidden="true"
              />
              <p className="eyebrow mt-5 mb-3">03 / Textual care</p>
              <h2 id="sources-title" className="display text-4xl font-semibold">
                Sources and editorial note.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 space-y-4 text-sm leading-relaxed">
              <p>
                Text order and spellings were checked against the Sanskrit Documents archive:
                Tulsidas&apos;s Hanuman Chalisa, the Mahabharata&apos;s Vishnu Sahasranama, and the
                Brahmanda Purana tradition of Lalita Sahasranama.
              </p>
              <p>
                Sanskrit source editions remain with their respective custodians. This site hosts
                original concise study glosses and links readers to the complete source editions
                where reposting restrictions apply.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
