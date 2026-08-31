import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { Reveal } from "@/components/ui/Reveal";
import { ScriptureReader } from "@/features/spirituality/components/ScriptureReader";
import {
  isScriptureSlug,
  scriptureCatalog,
  scriptureSlugs,
} from "@/features/spirituality/data/catalog";
import { loadScriptureReaderBootstrap } from "@/features/spirituality/data/load-entries";
import type { ScriptureSlug } from "@/features/spirituality/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const themes: Record<
  ScriptureSlug,
  {
    hero: string;
    glow: string;
    badge: string;
  }
> = {
  "hanuman-chalisa": {
    hero: "from-[#2b0b06] via-[#8a260e] to-[#db6509]",
    glow: "bg-amber-300/25",
    badge: "text-amber-200",
  },
  "vishnu-sahasranama": {
    hero: "from-[#081a34] via-[#123f69] to-[#187f8d]",
    glow: "bg-cyan-300/20",
    badge: "text-cyan-200",
  },
  "lalita-sahasranama": {
    hero: "from-[#31091d] via-[#881744] to-[#c54b62]",
    glow: "bg-rose-200/20",
    badge: "text-rose-200",
  },
  "shiva-tandava-stotram": {
    hero: "from-[#080f1f] via-[#25324a] to-[#8a3f16]",
    glow: "bg-orange-300/20",
    badge: "text-orange-200",
  },
  "bhagavad-gita": {
    hero: "from-[#1a0f00] via-[#5c3a10] to-[#0f2d3a]",
    glow: "bg-amber-300/20",
    badge: "text-amber-200",
  },
  ramcharitmanas: {
    hero: "from-[#1a0300] via-[#7c1d0e] to-[#1f2d0a]",
    glow: "bg-orange-300/20",
    badge: "text-orange-100",
  },
  "chandogya-upanishad": {
    hero: "from-[#0a0f1f] via-[#1e2a4a] to-[#3a2d6e]",
    glow: "bg-indigo-300/20",
    badge: "text-indigo-200",
  },
};

const scriptureInquiry: Record<
  ScriptureSlug,
  {
    title: string;
    questions: readonly string[];
  }
> = {
  "hanuman-chalisa": {
    title: "What becomes audible when familiarity slows down?",
    questions: [
      "Would you read this differently knowing it's Old Awadhi devotional poetry, not Sanskrit scripture?",
      "Is Tulsidas's authorship something the evidence shows, or something tradition has decided?",
    ],
  },
  "vishnu-sahasranama": {
    title: "What changes when one thousand names are heard as an answer?",
    questions: [
      "Does a name read differently once you know Bhīṣma is answering Yudhiṣṭhira, not reciting a list?",
      'If editions split compounds differently, is "exactly one thousand names" really fixed?',
    ],
  },
  "lalita-sahasranama": {
    title: "How should a thousand names remain more than a thousand labels?",
    questions: [
      'If the hymn\'s place in the Brahmāṇḍa Purāṇa shifts across manuscripts, what exactly is "the text"?',
      "Does a name mean something different read through Bhāskararāya's commentary than read alone?",
    ],
  },
  "shiva-tandava-stotram": {
    title: "What does the hymn's movement reveal before explanation begins?",
    questions: [
      "Would this hymn move you differently if Rāvaṇa never actually wrote it?",
      "Is the phalaśruti's promised reward a guarantee, or just how devotion talks?",
    ],
  },
  "bhagavad-gita": {
    title: "What changes when Krishna's counsel is read through a named and reproducible witness?",
    questions: [
      "Does it change anything that you're hearing Sañjaya's report, not a direct transcript of the battlefield?",
      'This edition counts 701 verses against the usual 700 — does one extra verse change what "complete" means?',
    ],
  },
  ramcharitmanas: {
    title:
      "What becomes visible when all seven kāṇḍas can be read without pretending every layer is finished?",
    questions: [
      "With Śiva telling Pārvatī, Yājñavalkya retelling it, and Tulsidas retelling that — who's actually speaking in any one verse?",
      "Can a source-text edition be complete while its translation and grammar remain honestly unpublished?",
    ],
  },
  "chandogya-upanishad": {
    title: "What is Om actually made of, according to this opening chapter?",
    questions: [
      "The text traces Om back through earth, water, plants, the body and speech before it ever names the syllable — why start so far from the sound itself?",
      'Verse three calls Om "the eighth" essence, without ever explaining what\'s being counted — translators still disagree. Does an unexplained number weaken the teaching, or is that exactly the kind of puzzle it expects a student to sit with?',
    ],
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return scriptureSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isScriptureSlug(slug)) return {};
  const scripture = scriptureCatalog[slug];

  return {
    title: scripture.title,
    description: scripture.dek,
    keywords: [
      scripture.shortTitle,
      scripture.transliteratedTitle,
      slug === "shiva-tandava-stotram"
        ? "pada by pada meaning"
        : slug === "bhagavad-gita" || slug === "ramcharitmanas"
          ? "complete source-text reading edition"
          : slug === "vishnu-sahasranama" || slug === "lalita-sahasranama"
            ? "name by name meaning"
            : "line and word study",
      slug === "hanuman-chalisa" || slug === "ramcharitmanas"
        ? "Awadhi romanization"
        : "IAST transliteration",
      "authorship and provenance",
      "sacred text study",
    ],
    alternates: { canonical: `/spirituality/${slug}` },
    openGraph: {
      type: "article",
      title: scripture.title,
      description: scripture.dek,
      url: `/spirituality/${slug}`,
      images: ["/images/profile_pic.jpg"],
    },
  };
}

export default async function ScripturePage({ params }: PageProps) {
  const { slug } = await params;
  if (!isScriptureSlug(slug)) notFound();

  const scripture = scriptureCatalog[slug];
  const reader = await loadScriptureReaderBootstrap(slug);
  const theme = themes[slug];
  const inquiry = scriptureInquiry[slug];
  const optionalSectionCount =
    (scripture.traditionalBenefits ? 1 : 0) + (scripture.practicalGuidance ? 1 : 0);
  const guidanceNumber = String(4 + (scripture.traditionalBenefits ? 1 : 0)).padStart(2, "0");
  const methodNumber = String(4 + optionalSectionCount).padStart(2, "0");
  const sourcesNumber = String(5 + optionalSectionCount).padStart(2, "0");
  const isSahasranama = slug === "vishnu-sahasranama" || slug === "lalita-sahasranama";
  const languageCode = slug === "hanuman-chalisa" || slug === "ramcharitmanas" ? "awa" : "sa";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.swapnilsahoo.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: scripture.title,
    headline: scripture.originalTitle,
    description: scripture.dek,
    url: `${siteUrl}/spirituality/${slug}`,
    inLanguage:
      slug === "ramcharitmanas"
        ? ["awa-Deva", "sa-Deva", "awa-Latn", "sa-Latn"]
        : slug === "bhagavad-gita"
          ? ["sa-Deva", "sa-Latn"]
          : slug === "hanuman-chalisa"
            ? ["awa-Deva", "en"]
            : ["sa-Deva", "en"],
    learningResourceType:
      slug === "ramcharitmanas" || slug === "bhagavad-gita"
        ? "Complete selected source-text reading edition"
        : slug === "shiva-tandava-stotram"
          ? "Pada-and-compound sacred-text study edition"
          : isSahasranama
            ? "Complete name-by-name sacred-text study edition"
            : "Word-and-compound sacred-text study edition",
    isBasedOn: scripture.sources.map((source) => source.href),
    publisher: {
      "@type": "Person",
      name: "Dr. Swapnil Sahoo",
      url: siteUrl,
    },
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-[min(100%,120rem)]">
          <nav
            aria-label="Breadcrumb"
            className="text-ink-500 mb-5 flex flex-wrap items-center gap-2 text-xs"
          >
            <Link href="/" className="transition hover:text-blue-700 dark:hover:text-blue-300">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/spirituality"
              className="transition hover:text-blue-700 dark:hover:text-blue-300"
            >
              Spirituality
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink-800 dark:text-ink-100">
              {scripture.shortTitle}
            </span>
          </nav>

          <div
            data-page-hero="scripture"
            className={`relative isolate overflow-hidden rounded-[34px] border border-white/15 bg-gradient-to-br ${theme.hero} px-6 py-11 text-white shadow-2xl shadow-slate-950/25 sm:px-10 sm:py-16 lg:px-14`}
          >
            <div
              className={`absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full ${theme.glow} blur-3xl`}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-white/8 blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.34fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur-sm">
                  Source-aware ·{" "}
                  {slug === "shiva-tandava-stotram"
                    ? "pāda & compound edition"
                    : slug === "ramcharitmanas"
                      ? "complete seven-kāṇḍa source edition"
                      : slug === "bhagavad-gita"
                        ? "complete 701-verse source edition"
                        : isSahasranama
                          ? "complete name-by-name edition"
                          : "line & word study edition"}
                </span>
                <p lang={languageCode} className={`script-devanagari mt-8 text-3xl ${theme.badge}`}>
                  {scripture.originalTitle}
                </p>
                <h1 className="display mt-3 max-w-4xl text-4xl font-semibold text-balance sm:text-6xl lg:text-7xl">
                  {scripture.title}
                </h1>
                <p className="mt-4 text-sm font-medium text-white/70 italic">
                  {scripture.transliteratedTitle}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
                  {scripture.dek}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#reader"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-950/20 transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    Open the reader
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#attribution"
                    className="inline-flex min-h-11 items-center rounded-xl border border-white/20 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    Attribution &amp; biography
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/15 bg-black/10 p-6 text-center backdrop-blur-md">
                <p lang={languageCode} className={`script-devanagari text-6xl ${theme.badge}`}>
                  {scripture.glyph}
                </p>
                <div className="my-5 h-px bg-white/15" />
                <p className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
                  On-site scope
                </p>
                <p className="mt-2 font-serif text-xl font-semibold">{scripture.entryCountLabel}</p>
                <p className="mt-4 text-xs leading-relaxed text-white/65">{scripture.language}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/50">{scripture.form}</p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <InquiryPrelude
        id={`${slug}-inquiry`}
        eyebrow="Before opening the reader"
        title={inquiry.title}
        questions={inquiry.questions}
      />

      <section aria-labelledby="authentic-title" className="py-14 sm:py-20">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Authenticity ledger</p>
              <h2 id="authentic-title" className="display text-4xl font-semibold md:text-5xl">
                What “authentic” means here.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                Source disclosed. Language named. Attribution qualified. Editorial choices made
                visible. It does not mean that one modern web page has erased every living recension
                or interpretive tradition.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {scripture.authenticity.map((item, index) => (
                <article key={item.label} className="glass-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <p className="eyebrow">{item.label}</p>
                    <span className="text-ink-400 font-mono text-[10px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{item.value}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-[min(100%,120rem)]" />

      <section id="reader" aria-labelledby="reader-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">
                02 /{" "}
                {slug === "shiva-tandava-stotram"
                  ? "Pāda & compound"
                  : slug === "ramcharitmanas" || slug === "bhagavad-gita"
                    ? "Source text"
                    : isSahasranama
                      ? "Name-by-name"
                      : "Word & compound"}{" "}
                reader
              </p>
              <h2 id="reader-title" className="display text-4xl font-semibold md:text-5xl">
                The text, opened carefully.
              </h2>
            </div>
            <div className="rounded-2xl border border-amber-900/10 bg-amber-50/70 p-5 dark:border-amber-100/10 dark:bg-amber-400/[0.045]">
              <p className="text-xs font-semibold tracking-wide text-amber-900 uppercase dark:text-amber-200">
                {scripture.scopeLabel}
              </p>
              <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
                {scripture.scopeNote}
              </p>
            </div>
          </div>
          <ScriptureReader
            initialEntries={reader.initialEntries}
            initialResultTotal={reader.initialResultTotal}
            initialSection={reader.initialSection}
            language={languageCode}
            pageSize={reader.pageSize}
            sections={reader.sections}
            slug={slug}
            supportsStudyLayer={reader.supportsStudyLayer}
            totalEntries={reader.totalEntries}
          />
        </Container>
      </section>

      <section
        id="attribution"
        aria-labelledby="attribution-title"
        className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24"
      >
        <Container className="relative max-w-[min(100%,120rem)]">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] tracking-[0.16em] text-amber-300 uppercase">
              03 / Attribution &amp; biography
            </p>
            <h2 id="attribution-title" className="display mt-3 text-4xl font-semibold md:text-5xl">
              People, voices, and tradition.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-300">
              A sacred text can have a poet, a speaker inside its story, a traditional compiler, and
              later commentators. These roles are named separately so reverence never requires
              blurred history.
            </p>
          </div>

          <div
            className={`mt-10 grid gap-5 ${
              scripture.profiles.length === 1
                ? "max-w-3xl"
                : scripture.profiles.length === 2
                  ? "lg:grid-cols-2"
                  : "lg:grid-cols-3"
            }`}
          >
            {scripture.profiles.map((profile, index) => (
              <article
                key={`${profile.name}-${profile.role}`}
                className="rounded-[26px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[9px] tracking-wider text-amber-200 uppercase">
                    {profile.evidenceLabel}
                  </span>
                  <span className="font-mono text-[10px] text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-6 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  {profile.role}
                </p>
                <h3 className="mt-2 font-serif text-3xl font-semibold">{profile.name}</h3>
                {profile.dates ? (
                  <p className="mt-1 text-xs font-medium text-amber-300">{profile.dates}</p>
                ) : null}
                <p className="mt-5 text-sm leading-relaxed text-slate-300">{profile.summary}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {scripture.traditionalBenefits ? (
        <section aria-labelledby="benefits-title" className="py-16 sm:py-24">
          <Container className="max-w-[min(100%,120rem)]">
            <div
              className={`grid gap-9 ${scripture.traditionalBenefits.image ? "lg:grid-cols-[0.34fr_0.86fr_1fr]" : "lg:grid-cols-[0.42fr_1fr]"}`}
            >
              {scripture.traditionalBenefits.image ? (
                <Reveal
                  variant="image"
                  className="relative min-h-[460px] overflow-hidden rounded-[24px] sm:min-h-[520px] lg:min-h-full"
                >
                  <Image
                    src={scripture.traditionalBenefits.image.src}
                    alt={scripture.traditionalBenefits.image.alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 12%" }}
                    sizes="(min-width: 1024px) 280px, 100vw"
                  />
                </Reveal>
              ) : null}
              <div>
                <span className="accent-rule" />
                <p className="eyebrow mb-3">04 / {scripture.traditionalBenefits.eyebrow}</p>
                <h2 id="benefits-title" className="display text-4xl font-semibold md:text-5xl">
                  {scripture.traditionalBenefits.title}
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
                  {scripture.traditionalBenefits.disclaimer}
                </p>
              </div>
              <ul role="list" className="grid gap-4 sm:grid-cols-2">
                {scripture.traditionalBenefits.items.map((item, index) => (
                  <li key={item} className="glass-card flex gap-4 p-5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 font-mono text-[10px] font-semibold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      ) : null}

      {scripture.practicalGuidance ? (
        <section aria-labelledby="guidance-title" className="py-16 sm:py-24">
          <Container className="max-w-[min(100%,120rem)]">
            <div className="grid gap-9 lg:grid-cols-[1fr_0.42fr]">
              <div>
                <span className="accent-rule" />
                <p className="eyebrow mb-3">
                  {guidanceNumber} / {scripture.practicalGuidance.eyebrow}
                </p>
                <h2 id="guidance-title" className="display text-4xl font-semibold md:text-5xl">
                  {scripture.practicalGuidance.title}
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-5 max-w-2xl text-sm leading-relaxed">
                  {scripture.practicalGuidance.disclaimer}
                </p>
                <ul role="list" className="mt-8 grid gap-4 sm:grid-cols-2">
                  {scripture.practicalGuidance.items.map((item, index) => (
                    <li key={item} className="glass-card flex gap-4 p-5">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 font-mono text-[10px] font-semibold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {scripture.practicalGuidance.images &&
              scripture.practicalGuidance.images.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {scripture.practicalGuidance.images.map((image, index) => (
                    <Reveal
                      key={image.src}
                      variant="image"
                      delay={index * 0.12}
                      className="overflow-hidden rounded-[22px] border border-black/5 shadow-lg shadow-slate-950/10 dark:border-white/10"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 360px, 90vw"
                        className="h-auto w-full object-cover"
                      />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      <section id="method" aria-labelledby="method-title" className="py-16 sm:py-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-9 lg:grid-cols-[0.42fr_1fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">{methodNumber} / Editorial method</p>
              <h2 id="method-title" className="display text-4xl font-semibold md:text-5xl">
                Designed for honest study.
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {scripture.editorialPolicy.map((policy, index) => (
                <li key={policy} className="glass-card flex gap-4 p-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 font-mono text-[10px] font-semibold text-amber-950 dark:bg-amber-400/15 dark:text-amber-200">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-ink-600 dark:text-ink-300 text-sm leading-relaxed">{policy}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section aria-labelledby="sources-title" className="pb-16 sm:pb-24">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 p-7 sm:p-10 dark:border-slate-800">
              <p className="eyebrow mb-3">{sourcesNumber} / Source shelf</p>
              <h2 id="sources-title" className="display text-4xl font-semibold">
                Read beyond this edition.
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-4 max-w-3xl text-sm leading-relaxed">
                Primary texts, manuscript records, and scholarly studies are linked directly.
                External texts remain with their custodians and under their stated terms.
              </p>
            </div>
            <ol className="divide-y divide-slate-200 dark:divide-slate-800">
              {scripture.sources.map((source, index) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-4 p-6 transition hover:bg-amber-50/60 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none focus-visible:ring-inset sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8 dark:hover:bg-white/[0.035]"
                  >
                    <span className="text-ink-400 font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-serif text-xl font-semibold group-hover:text-amber-800 dark:group-hover:text-amber-300">
                        {source.title}
                      </span>
                      <span className="text-ink-500 mt-1 block text-xs font-semibold">
                        {source.institution}
                      </span>
                      <span className="text-ink-600 dark:text-ink-300 mt-2 block text-sm leading-relaxed">
                        {source.note}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-ink-400 transition group-hover:translate-x-1 group-hover:text-amber-700"
                    >
                      ↗
                    </span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <nav aria-label="Other sacred-text branches" className="mt-10">
            <p className="eyebrow mb-4">Continue through the library</p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {scriptureSlugs.map((branchSlug) => {
                const branch = scriptureCatalog[branchSlug];
                const current = branchSlug === slug;
                return (
                  <Link
                    key={branchSlug}
                    href={`/spirituality/${branchSlug}`}
                    aria-current={current ? "page" : undefined}
                    className={`rounded-2xl border p-5 transition focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${
                      current
                        ? "border-amber-400 bg-amber-50 dark:border-amber-500/60 dark:bg-amber-400/10"
                        : "border-ink-200 dark:border-ink-700 hover:border-amber-300 hover:bg-amber-50/50 dark:hover:border-amber-500/40 dark:hover:bg-amber-400/5"
                    }`}
                  >
                    <span
                      lang={
                        branchSlug === "hanuman-chalisa" || branchSlug === "ramcharitmanas"
                          ? "awa"
                          : "sa"
                      }
                      className="script-devanagari text-xl"
                    >
                      {branch.originalTitle}
                    </span>
                    <span className="mt-2 block text-sm font-semibold">{branch.shortTitle}</span>
                    <span className="text-ink-500 mt-1 block text-xs">
                      {current ? "You are here" : "Open branch →"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </Container>
      </section>
    </main>
  );
}
