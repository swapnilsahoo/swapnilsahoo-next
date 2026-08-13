import type { Metadata } from "next";
import {
  Noto_Sans_Bengali,
  Noto_Sans_Gurmukhi,
  Noto_Sans_JP,
  Noto_Sans_Myanmar,
  Noto_Sans_TC,
  Noto_Sans_Tamil,
  Noto_Serif_Tibetan,
} from "next/font/google";
import Link from "next/link";

import { ArrowRightIcon, CompassIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { ImmortalsLibrary } from "@/features/mythology/components/ImmortalsLibrary";
import { MythologyBranchNav } from "@/features/mythology/components/MythologyBranchNav";
import {
  immortalityEvidenceLegend,
  immortalityProfiles,
  immortalitySources,
  shivaInvocation,
} from "@/features/mythology/data/immortalityTraditions";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
  preload: false,
  fallback: ["Nirmala UI", "Vrinda", "sans-serif"],
});

const notoSansGurmukhi = Noto_Sans_Gurmukhi({
  variable: "--font-gurmukhi",
  subsets: ["gurmukhi"],
  display: "swap",
  preload: false,
  fallback: ["Nirmala UI", "Raavi", "sans-serif"],
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  display: "swap",
  preload: false,
  fallback: ["Nirmala UI", "Latha", "sans-serif"],
});

const notoSerifTibetan = Noto_Serif_Tibetan({
  variable: "--font-tibetan",
  subsets: ["tibetan"],
  display: "swap",
  preload: false,
  fallback: ["Microsoft Himalaya", "serif"],
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  variable: "--font-myanmar",
  subsets: ["myanmar"],
  display: "swap",
  preload: false,
  fallback: ["Myanmar Text", "sans-serif"],
});

const notoSansJapanese = Noto_Sans_JP({
  variable: "--font-cjk-japanese",
  display: "swap",
  preload: false,
  fallback: ["Yu Gothic", "sans-serif"],
});

const notoSansTraditionalChinese = Noto_Sans_TC({
  variable: "--font-cjk-traditional",
  display: "swap",
  preload: false,
  fallback: ["Microsoft JhengHei", "sans-serif"],
});

const multilingualFontVariables = [
  notoSansBengali.variable,
  notoSansGurmukhi.variable,
  notoSansTamil.variable,
  notoSerifTibetan.variable,
  notoSansMyanmar.variable,
  notoSansJapanese.variable,
  notoSansTraditionalChinese.variable,
].join(" ");

export const metadata: Metadata = {
  title: "Immortals — 17 Profiles Across Traditions",
  description:
    "A source-aware atlas of 17 figures across immortality traditions, separating historical record, sacred testimony, later legend, original-language terms, and scientific limits.",
  keywords: [
    "immortality traditions",
    "Indian immortals",
    "siddha traditions",
    "Kūkai nyūjō",
    "Vallalar light body",
    "Padmasambhava",
    "Shardza rainbow body",
    "weizza Buddhism",
    "Sanskrit transliteration",
  ],
  alternates: { canonical: "/mythology/immortals" },
  openGraph: {
    type: "website",
    title: "Immortals — A Source-Aware Atlas",
    description:
      "Seventeen profiles of longevity, continuing presence, light body, and transformation—read with reverence and clear evidence boundaries.",
    url: "/mythology/immortals",
    images: ["/images/profile_pic.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Immortals — A Source-Aware Atlas",
    description:
      "Seventeen profiles across deathlessness traditions, with original scripts, source trails, and explicit historical and scientific boundaries.",
    images: ["/images/profile_pic.jpg"],
  },
};

const inquiryQuestions = [
  "When this atlas calls someone 'immortal,' does it mean a long life, a felt presence, or freedom from rebirth?",
  "The longest verified human life is 122 years. What would convince you a claim of centuries is more than legend?",
  "Does folding a Tamil, Japanese, or Tibetan practice into one English word erase what made it distinct?",
] as const;

const claimFamilies = [
  {
    number: "01",
    title: "Extraordinary longevity",
    description:
      "A person is said to have lived far beyond an ordinary human lifespan. Such claims require continuous identity-linked records before age can be treated as verified.",
    examples: "Tapasviji · Trailanga · Lokenath · Li Qingyun",
  },
  {
    number: "02",
    title: "Continuing presence",
    description:
      "The teacher remains available in meditation, sacred geography, vision, lineage, or ritual service after the historically recorded life has ended.",
    examples: "Kūkai · Padmasambhava · Haidakhan traditions",
  },
  {
    number: "03",
    title: "Luminous transformation",
    description:
      "The body is remembered as becoming light, diminishing, disappearing, or revealing a subtler mode of embodiment at the culmination of practice.",
    examples: "Vallalar · Shardza Tashi Gyaltsen",
  },
  {
    number: "04",
    title: "Alchemical perfection",
    description:
      "Religious technologies speak of perfecting the body through yoga, mantra, ethics, contemplative practice, or alchemy. Description here is never a prescription.",
    examples: "Nātha · Tamil Siddha · Burmese weizzā traditions",
  },
] as const;

const pronunciationKey = [
  ["ā ī ū", "long vowels: ā as in father, ī as in machine, ū as in rule"],
  ["ṛ", "a syllabic r; say it lightly rather than inserting a full ‘ri’"],
  ["ṃ", "anusvāra: nasalizes or takes the place of a following nasal sound"],
  ["ṇ ṭ ḍ ṣ", "retroflex sounds, articulated with the tongue curled slightly back"],
  ["ś", "a palatal ‘sh’; au is a diphthong like the vowel in cow"],
] as const;

export default function ImmortalsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Immortals — 17 Profiles Across Traditions",
    description: metadata.description,
    url: `${siteUrl}/mythology/immortals`,
    isPartOf: {
      "@type": "CollectionPage",
      name: "Mythology",
      url: `${siteUrl}/mythology`,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: immortalityProfiles.length,
      itemListElement: immortalityProfiles.map((profile, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: profile.name,
        url: `${siteUrl}/mythology/immortals#${profile.slug}`,
      })),
    },
  };

  return (
    <main id="main-content" tabIndex={-1} className={multilingualFontVariables}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden pt-14 pb-12 sm:pt-20 sm:pb-16">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div
            data-page-hero="mythology"
            className="relative isolate overflow-hidden rounded-[30px] border border-indigo-200/20 bg-gradient-to-br from-[#15113d] via-[#312e81] to-[#713f12] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14"
          >
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-indigo-100">
                <li>
                  <Link href="/mythology" className="underline-offset-4 hover:underline">
                    Mythology
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="font-semibold text-white">
                  Immortals
                </li>
              </ol>
            </nav>

            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.4fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-xs tracking-[0.14em] text-indigo-100 uppercase">
                  17 figures · across Asia and Europe · one evidence standard
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Immortals. <span className="font-normal text-amber-200 italic">Read in layers.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-indigo-50 sm:text-lg">
                  A comparative atlas of extraordinary longevity, continuing presence, light body,
                  rainbow body, and alchemical transformation—honouring sacred testimony while
                  distinguishing it from historical and biomedical evidence.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#atlas"
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-5 py-3 text-sm font-semibold text-indigo-950 transition hover:bg-white focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:outline-none"
                  >
                    Enter the 17-profile atlas
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#evidence"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    Read the evidence key
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-indigo-100/15 bg-white/5 p-6 text-center">
                <p lang="sa-Deva" className="script-devanagari text-5xl leading-relaxed font-semibold text-amber-200">
                  अमृतत्व
                </p>
                <p lang="sa-Latn" className="mt-2 text-xl font-semibold">
                  amṛtatva
                </p>
                <p className="mt-2 text-xs tracking-wider text-indigo-100 uppercase">
                  deathlessness · not one single claim
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-label="Mythology library navigation" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <MythologyBranchNav current="immortals" />
        </Container>
      </section>

      <InquiryPrelude
        id="immortals-inquiry"
        eyebrow="Before reading extraordinary lives"
        title="What kind of deathlessness is this tradition asking us to imagine?"
        questions={inquiryQuestions}
      />

      <section id="evidence" aria-labelledby="evidence-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">Evidence key</p>
              <h2 id="evidence-title" className="display text-4xl font-semibold md:text-5xl">
                Reverence without false certainty.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-base leading-relaxed">
                Each profile uses the same three sentences: <strong>sources establish</strong>,
                <strong> tradition records</strong>, and <strong>independent evidence does not establish</strong>.
                The badge tells you what kind of source situation you are entering before you read.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {immortalityEvidenceLegend.map((item, index) => (
                <article key={item.level} className="glass-card p-5 sm:p-6">
                  <p className="text-brand-700 dark:text-brand-300 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{item.label}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="mt-8 rounded-2xl bg-ink-900 p-6 text-white sm:p-8 dark:bg-black/35">
            <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
              <div>
                <p className="font-mono text-xs font-semibold tracking-[0.12em] text-rose-200 uppercase">
                  Scientific boundary
                </p>
                <p className="mt-2 font-serif text-3xl font-semibold">No verified physical immortality.</p>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-slate-200">
                <p>
                  No accepted biomedical evidence shows that a human has achieved literal physical
                  immortality, survived for several centuries, or dissolved into light under independently
                  observed conditions. The authenticated longevity benchmark is 122 years and 164 days.
                </p>
                <p>
                  Studies of meditation, metabolism, healthy ageing, or light emitted by biological tissue do
                  not verify the extraordinary claims in an individual sacred biography. Analogy is not
                  evidence of mechanism.
                </p>
                <a
                  href="https://www.guinnessworldrecords.com/world-records/oldest-person"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-amber-200 underline decoration-amber-200/50 underline-offset-4"
                >
                  See the authenticated longevity record
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="claim-families-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Comparative map</p>
            <h2 id="claim-families-title" className="display mt-3 text-4xl font-semibold md:text-5xl">
              Four claims often hidden inside one word.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {claimFamilies.map((claim) => (
              <article key={claim.number} className="glass-card p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="text-accent-600 dark:text-accent-400 font-mono text-xs">
                    {claim.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold">{claim.title}</h3>
                    <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                      {claim.description}
                    </p>
                    <p className="text-brand-700 dark:text-brand-300 mt-4 text-xs font-semibold">
                      {claim.examples}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="sacred-language"
        aria-labelledby="invocation-title"
        className="bg-ink-900 py-16 text-white sm:py-24 dark:bg-black/35"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
            <div>
              <SparkIcon className="h-7 w-7 text-amber-300" aria-hidden="true" />
              <p className="mt-5 font-mono text-xs tracking-[0.14em] text-indigo-200 uppercase">
                Repaired from the broken PDF text layer
              </p>
              <h2 id="invocation-title" className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
                {shivaInvocation.title}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-300">
                Selectable Unicode replaces the PDF’s missing-glyph boxes. Devanagari, scholarly IAST,
                recitation segmentation, grammar, translation, and provenance are shown as separate layers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8">
              <div lang="sa-Deva" className="script-devanagari text-3xl leading-[1.8] font-semibold text-amber-100 sm:text-4xl">
                {shivaInvocation.devanagari.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div lang="sa-Latn" className="mt-6 border-t border-white/15 pt-6 font-serif text-xl leading-relaxed text-indigo-100 italic sm:text-2xl">
                {shivaInvocation.iast.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-6 border-t border-white/15 pt-6">
                <p className="font-mono text-xs tracking-wide text-slate-400 uppercase">
                  Slow recitation · syllable guide
                </p>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200">
                  {shivaInvocation.recitation.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <p className="mt-6 border-t border-white/15 pt-6 text-base leading-relaxed text-white">
                {shivaInvocation.translation}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="font-mono text-xs tracking-[0.14em] text-indigo-200 uppercase">
              Word by word · surface reading
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              The Devanagari and IAST below preserve the forms heard and written in the continuous
              verse, including final anusvāra where Sanskrit sandhi requires it.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shivaInvocation.words.map((word) => (
              <article key={word.original} className="rounded-2xl border border-white/12 p-5">
                <p lang="sa-Deva" className="script-devanagari text-2xl leading-relaxed font-semibold text-amber-100">
                  {word.original}
                </p>
                <p lang="sa-Latn" className="mt-1 font-semibold text-indigo-200">
                  {word.iast}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{word.meaning}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/12 p-6">
              <h3 className="font-serif text-2xl font-semibold">Pronunciation key</h3>
              <dl className="mt-5 space-y-4">
                {pronunciationKey.map(([symbol, meaning]) => (
                  <div key={symbol} className="grid grid-cols-[4.5rem_1fr] gap-4">
                    <dt lang="sa-Latn" className="font-semibold text-amber-200">
                      {symbol}
                    </dt>
                    <dd className="text-sm leading-relaxed text-slate-300">{meaning}</dd>
                  </div>
                ))}
              </dl>
            </article>
            <article className="rounded-2xl border border-white/12 p-6">
              <h3 className="font-serif text-2xl font-semibold">Textual provenance</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {shivaInvocation.provenance}
              </p>
              <a
                href="https://sanskritdocuments.org/doc_z_misc_general/allshlokawmean.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-amber-200 underline decoration-amber-200/50 underline-offset-4"
              >
                Compare a received śloka collection
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>
          </div>
        </Container>
      </section>

      <section id="atlas" aria-labelledby="atlas-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.48fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">The atlas · 17 profiles</p>
              <h2 id="atlas-title" className="display text-4xl font-semibold md:text-6xl">
                One structure. Unequal evidence.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-3xl text-base leading-relaxed">
                Search across names, places, traditions, and original-language terms. Open any profile to
                compare historical record, sacred account, evidence boundary, language ledger, and the exact
                sources used.
              </p>
            </div>
            <div className="border-ink-200 dark:border-ink-700 rounded-2xl border p-5">
              <CompassIcon className="text-brand-600 dark:text-brand-300 h-6 w-6" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold">Reading rule</p>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                A more detailed story is not automatically a better documented story. Follow the source type,
                not the vividness of the claim.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <ImmortalsLibrary />
          </div>
        </Container>
      </section>

      <section aria-labelledby="editorial-method-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.62fr_1.38fr]">
            <div>
              <p className="eyebrow">Editorial source note</p>
              <h2 id="editorial-method-title" className="display mt-3 text-4xl font-semibold">
                What was deliberately not published.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 space-y-4 text-sm leading-relaxed sm:text-base">
              <p>
                The two supplied PDFs were used as coverage inventories, not uploaded as authoritative books.
                Their Sanskrit text layer is broken, many direct quotations lack traceable editions or page
                references, and several biographies rely on blogs or devotional retellings while using words
                such as “verified” or “confirmed.”
              </p>
              <p>
                A six-stage longevity protocol was omitted in full. This site does not prescribe fasting,
                prolonged breath retention, home dark retreats, herb dosages, cold exposure, commercial
                biomarker targets, or mercury-based alchemy. Historical description is not medical advice;
                mercury exposure can cause serious harm.
              </p>
              <a
                href="https://www.who.int/news-room/fact-sheets/detail/mercury-and-health"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-brand-700 dark:text-brand-300 inline-flex items-center gap-2 font-semibold"
              >
                World Health Organization · mercury and health
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section id="sources" aria-labelledby="sources-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Source shelf</p>
            <h2 id="sources-title" className="display mt-3 text-4xl font-semibold md:text-5xl">
              Read beyond the atlas.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-4 text-base leading-relaxed">
              Primary texts, scholarship, institutional records, archives, and tradition sources are labelled
              rather than flattened into one bibliography. A tradition source documents what a community says;
              it does not independently prove the claim it preserves.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {immortalitySources.map((source, index) => (
              <li key={source.id} className="glass-card flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-brand-700 dark:text-brand-300 font-mono text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="tag tag-ink">{source.kind}</span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold">{source.title}</h3>
                <p className="text-ink-500 dark:text-ink-400 mt-2 text-xs leading-relaxed">
                  {source.citation}
                </p>
                <p className="text-ink-600 dark:text-ink-300 mt-3 grow text-sm leading-relaxed">
                  {source.note}
                </p>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source: ${source.title} (opens in a new tab)`}
                  className="text-brand-700 dark:text-brand-300 mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Open source
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </main>
  );
}
