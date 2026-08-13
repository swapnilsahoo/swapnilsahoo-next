import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon, CompassIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

export const metadata: Metadata = {
  title: "Spirituality — Sacred Texts for Study and Reflection",
  description:
    "Source-aware devotional study editions of the Bhagavad Gita, Ramcharitmanas, Hanuman Chalisa, Vishnu Sahasranama, Lalita Sahasranama and Shiva Tandava Stotram with original script, clearly labeled romanization, close meaning, provenance and attribution biographies.",
  keywords: [
    "Bhagavad Gita",
    "Ramcharitmanas",
    "Hanuman Chalisa",
    "Vishnu Sahasranama",
    "Lalita Sahasranama",
    "Shiva Tandava Stotram",
    "Sanskrit transliteration",
    "word by word meaning",
    "name and line meanings",
    "English meaning",
    "textual provenance",
    "devotional study",
  ],
  alternates: { canonical: "/spirituality" },
  openGraph: {
    type: "website",
    title: "Sacred Texts — Read, Reflect, Return",
    description: "A respectful multilingual reader for six beloved devotional works.",
    url: "/spirituality",
    images: ["/images/profile_pic.jpg"],
  },
};

const collections = [
  {
    title: "हनुमान चालीसा",
    transliteration: "Hanumān Cālīsā",
    label: "Authentic Hanuman Chalisa",
    href: "/spirituality/hanuman-chalisa",
    language: "Old Awadhi",
    scope: "Complete · 86 annotated lines",
    description:
      "The complete forty-caupāī poem with word-level romanization, close meaning, literary form, and a historically careful Tulsidas biography.",
  },
  {
    title: "विष्णु सहस्रनाम",
    transliteration: "Viṣṇu Sahasranāma",
    label: "Authentic Vishnu Sahasranama",
    href: "/spirituality/vishnu-sahasranama",
    language: "Sanskrit",
    scope: "Declared enumeration · all 1,000 names",
    description:
      "All one thousand names in their Mahābhārata setting, with consistent IAST, concise name-level meanings, and Bhīṣma, Vyāsa, and commentary roles clearly separated.",
  },
  {
    title: "ललिता सहस्रनाम",
    transliteration: "Lalitā Sahasranāma",
    label: "Authentic Lalita Sahasranama",
    href: "/spirituality/lalita-sahasranama",
    language: "Sanskrit",
    scope: "Declared enumeration · all 1,000 names",
    description:
      "All one thousand names with consistent IAST and concise name-level meanings, while the Vāgdevī, Hayagrīva–Agastya, and Bhāskararāya traditions remain clearly distinguished.",
  },
  {
    title: "शिवताण्डवस्तोत्रम्",
    transliteration: "Śivatāṇḍavastotram",
    label: "Authentic Shiva Tandava Stotram",
    href: "/spirituality/shiva-tandava-stotram",
    language: "Sanskrit",
    scope: "Received edition · 17 annotated units",
    description:
      "A drum-like complete study sequence with consistent IAST, a pāda-level reading guide, metre, manuscript variants, and a carefully qualified Rāvaṇa attribution.",
  },
  {
    title: "श्रीमद्भगवद्गीता",
    transliteration: "Śrīmadbhagavadgītā",
    label: "Authentic Bhagavad Gita",
    href: "/spirituality/bhagavad-gita",
    language: "Sanskrit",
    scope: "Complete · all 701 verses",
    description:
      "All eighteen chapters of Krishna's counsel to Arjuna, with consistent IAST, a close English rendering, and a grammatical word-by-word split for every verse.",
  },
  {
    title: "श्रीरामचरितमानस",
    transliteration: "Śrī Rāmacaritamānasa",
    label: "Authentic Ramcharitmanas",
    href: "/spirituality/ramcharitmanas",
    language: "Old Awadhi",
    scope: "Bālakāṇḍa in progress · 42 of 369 units translated",
    description:
      "Tulsidas's Awadhi retelling of Rama's story, opened kāṇḍa by kāṇḍa. Bālakāṇḍa's opening invocation is complete with word-by-word study; the rest of its text is verified with translation under way.",
  },
] as const;

const readingLayers = [
  {
    title: "Source line",
    detail: "The transmitted Devanagari reading stays visible before interpretation.",
  },
  {
    title: "Declared romanization",
    detail:
      "The Sanskrit branches, and Ramcharitmanas, use IAST; the Hanuman Chalisa labels its pronunciation-friendly reading rather than presenting it as strict IAST.",
  },
  {
    title: "Name, word, or pāda study",
    detail:
      "Each branch labels its actual study unit—whole name, word, or pāda—without hiding the received form.",
  },
  {
    title: "Close meaning",
    detail: "Original concise glosses orient the reader without claiming to replace commentary.",
  },
  {
    title: "Attribution & sources",
    detail: "Poet, narrative speaker, traditional compiler, and commentator are named separately.",
  },
] as const;

const spiritualityQuestions = [
  "When this page calls an edition \"authentic,\" does that mean more than the sources are disclosed?",
  "If a short gloss here differs from what your teacher recites, which one should give way?",
] as const;

export default function SpiritualityPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div
            data-page-hero="spirituality"
            className="relative isolate overflow-hidden rounded-[30px] border border-amber-200/20 bg-gradient-to-br from-[#220b09] via-[#70230f] to-[#b45309] px-6 py-12 text-white shadow-2xl shadow-amber-950/25 sm:px-10 sm:py-16 lg:px-14"
          >
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
                  Six source-aware devotional editions designed for understanding as well as
                  recitation—bringing original script, clearly labeled romanization, close name-,
                  word-, or pāda-level meaning, authorship, and textual history into one calm
                  reading experience.
                </p>
                <a
                  href="#collections"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-950 shadow-lg shadow-amber-950/20 transition hover:-translate-y-0.5 hover:bg-white focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:outline-none"
                >
                  Choose a sacred-text branch
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

      <InquiryPrelude
        id="spirituality-inquiry"
        eyebrow="Before recitation or study"
        title="What kind of attention does a sacred text ask of us?"
        questions={spiritualityQuestions}
      />

      <section id="collections" aria-labelledby="collection-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">01 / The collection</p>
            <h2 id="collection-title" className="display text-4xl font-semibold md:text-5xl">
              Six authentic branches.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              “Authentic” means source-disclosed and editorially transparent—not a claim that one
              modern edition cancels every manuscript, recension, lineage, or living pronunciation.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {collections.map((collection, index) => (
              <Link
                key={collection.title}
                href={collection.href}
                className="glass-card group flex min-h-full flex-col p-6 transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-950/10 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none dark:hover:border-amber-500/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-ink-400 font-mono text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 font-mono text-[9px] font-semibold tracking-wide text-amber-900 uppercase dark:bg-amber-400/10 dark:text-amber-200">
                    {collection.language}
                  </span>
                </div>
                <h3
                  lang={collection.language === "Old Awadhi" ? "awa" : "sa"}
                  className="mt-5 font-serif text-2xl font-semibold"
                >
                  {collection.title}
                </h3>
                <p className="text-brand-700 dark:text-brand-300 mt-1 text-sm italic">
                  {collection.transliteration}
                </p>
                <p className="mt-4 text-sm font-semibold">{collection.label}</p>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {collection.description}
                </p>
                <div className="mt-auto pt-6">
                  <div className="border-ink-200 dark:border-ink-700 border-t pt-4">
                    <p className="text-ink-500 font-mono text-[10px] tracking-wide uppercase">
                      {collection.scope}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-800 group-hover:gap-3 dark:text-amber-300">
                      Open study edition
                      <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="reading-method" aria-labelledby="reader-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / Reading architecture</p>
              <h2 id="reader-title" className="display text-4xl font-semibold md:text-5xl">
                Five layers. No hidden editorial leaps.
              </h2>
            </div>
            <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed lg:col-span-7">
              Every branch uses the same reading logic, but its provenance is specific to that text.
              The Chalisa is treated as Old Awadhi; the two Sahasranāmas use complete, name-by-name
              Sanskrit readers; the Shiva Tandava Stotram receives pāda-level compound study; the
              Bhagavad Gita receives a full verse-by-verse, word-by-word Sanskrit reading across all
              eighteen chapters; and the Ramcharitmanas is being opened kāṇḍa by kāṇḍa, with its
              declared coverage stated plainly rather than smoothed over. Every branch except the
              Hanuman Chalisa uses consistent IAST.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {readingLayers.map((layer, index) => (
              <li key={layer.title} className="glass-card p-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-100 font-mono text-[10px] font-semibold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold">{layer.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {layer.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="companion-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#220b09] to-[#7c2d12] p-7 text-white shadow-xl shadow-amber-950/15 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <CompassIcon className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <p className="mt-5 mb-3 font-mono text-[10px] tracking-[0.16em] text-amber-200 uppercase">
                  03 / Study companion
                </p>
                <h2 id="companion-title" className="font-serif text-4xl font-semibold">
                  A study companion—not a substitute for lineage.
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
              <p className="eyebrow mt-5 mb-3">04 / Textual care</p>
              <h2 id="sources-title" className="display text-4xl font-semibold">
                Sources and editorial note.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 space-y-4 text-sm leading-relaxed">
              <p>
                The branch pages cite primary text repositories, critical-edition context,
                manuscript records, and modern scholarship. The Tulsidas attribution is qualified;
                Bhishma, Vyasa, the Vagdevīs, Hayagriva, Rāvaṇa, and later commentators are assigned
                their distinct textual roles.
              </p>
              <p>
                External source editions remain with their respective custodians. This site hosts
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
