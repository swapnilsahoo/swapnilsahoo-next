import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude, type InquiryQuestions } from "@/components/ui/InquiryPrelude";
import { ScriptureReader } from "@/features/spirituality/components/ScriptureReader";
import {
  isScriptureSlug,
  scriptureCatalog,
  scriptureSlugs,
} from "@/features/spirituality/data/catalog";
import { loadScriptureEntries } from "@/features/spirituality/data/load-entries";
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
};

const scriptureInquiry: Record<
  ScriptureSlug,
  {
    title: string;
    introduction: string;
    socraticQuestions: InquiryQuestions;
    firstPrinciplesQuestions: InquiryQuestions;
  }
> = {
  "hanuman-chalisa": {
    title: "What becomes audible when familiarity slows down?",
    introduction:
      "The declared normalized Devanagari reading of the Old Awadhi poem comes first. The word divisions, pronunciation-friendly romanization, close meanings, and notes are editorial study aids, not replacement verses or claims of exhaustive commentary.",
    socraticQuestions: [
      "What changes when the Chalisa is read as Old Awadhi devotional poetry rather than assuming that Devanagari script makes it a Sanskrit composition?",
      "When printed and recited traditions divide or pronounce a phrase differently, which meanings depend on the editor’s decision?",
      "How can we honour the traditional attribution to Tulsidas while distinguishing historical evidence from later devotional biography?",
      "How do praise, memory, rhythm, and ethical formation work together without reducing the poem to a list of propositions?",
    ],
    firstPrinciplesQuestions: [
      "Which words belong to the declared Devanagari reading, and which boundaries, romanization choices, and English glosses have been supplied by this edition?",
      "What must be present to call the sequence complete: two opening dohās, forty numbered caupāīs, and the closing dohā?",
      "What evidence would justify preferring one variant reading, and how should that choice be documented without dismissing living recitation traditions?",
      "What can a close word-level gloss establish, and what still requires Awadhi grammar, literary context, or a fuller commentary?",
    ],
  },
  "vishnu-sahasranama": {
    title: "What changes when one thousand names are heard as an answer?",
    introduction:
      "The declared Sanskrit base reading and one-thousand-name enumeration are presented within the Mahābhārata frame, then kept distinct from this site’s normalization, name segmentation, IAST, concise glosses, and editorial notes.",
    socraticQuestions: [
      "How does hearing Bhīṣma answer Yudhiṣṭhira in the Anuśāsanaparvan change a reading that might otherwise seem like an isolated list?",
      "When an epithet recurs, do its neighbours and narrative setting invite a different emphasis rather than mere repetition?",
      "If chapter numbering and name boundaries vary across editions, what assumptions sit behind the apparently simple claim of exactly one thousand names?",
      "How can distinct Vedānta commentary traditions illuminate a name without being compressed into one supposedly final meaning?",
    ],
    firstPrinciplesQuestions: [
      "What counts as one name when sandhi, compounds, multiword expressions, and repeated epithets complicate segmentation?",
      "Which wording and enumeration come from the declared base sources, and which normalization, segmentation, IAST, and English wording are editorial?",
      "What evidence distinguishes Bhīṣma as narrative speaker, Vyāsa as traditional compiler-seer, and Śaṅkara as an attributed commentator rather than treating all three as historical authors?",
      "Which interpretations follow closely from grammar and context, and which depend on a particular doctrinal commentary?",
    ],
  },
  "lalita-sahasranama": {
    title: "How should a thousand names remain more than a thousand labels?",
    introduction:
      "The complete declared sequence stays visible in its received order. The site separately identifies normalized Devanagari, mechanically prepared IAST, editorial name boundaries, concise meanings, and commentarial context.",
    socraticQuestions: [
      "How do the Vāgdevī attribution and Hayagrīva–Agastya teaching frame shape devotional reading without becoming modern biographical claims?",
      "If the hymn’s placement is not uniform across printed Brahmāṇḍa Purāṇa recensions, what does it mean to describe it carefully as transmitted with the Lalitopākhyāna tradition?",
      "How might a name change when read beside its neighbours or through Bhāskararāya’s compound analysis rather than as an isolated glossary entry?",
      "Can devotional trust and critical attention to witnesses, variants, and editorial decisions deepen one another?",
    ],
    firstPrinciplesQuestions: [
      "How is the one-thousand-name count established when sandhi and Sanskrit compounds permit more than one defensible segmentation?",
      "Which Sanskrit wording comes from the declared base reading, and which normalization, IAST, name division, and English meaning have been prepared for this reader?",
      "What source evidence supports a selected base reading when the same witness or another recension records a variant?",
      "What can a concise name-level meaning clarify, and what remains dependent on grammar, Śrīvidyā context, and extended commentary?",
    ],
  },
  "shiva-tandava-stotram": {
    title: "What does the hymn’s movement reveal before explanation begins?",
    introduction:
      "This page declares a popular seventeen-unit received sequence rather than a reconstructed critical edition. The selected surface reading is kept distinct from editorial pāda boundaries, hyphenation, IAST, pāda-level reading guides, concise meanings, and notes.",
    socraticQuestions: [
      "What does the traditional Rāvaṇa attribution contribute to devotional memory, and what can it not establish about a historically identifiable poet?",
      "How do metre, alliteration, and the drum-like movement create an experience that an English paraphrase cannot fully carry?",
      "When manuscripts differ in stanza count, order, and wording, what is gained—and what must be disclosed—when this seventeen-unit sequence is described as complete within its declared scope?",
      "How should a phalaśruti’s promised benefits be heard within devotional genre without turning them into guaranteed empirical outcomes?",
    ],
    firstPrinciplesQuestions: [
      "What exactly composes this declared sequence: fifteen body stanzas, one phalaśruti, and one received supplementary stanza?",
      "Which features make this a transparent received edition rather than a claim to have reconstructed an original text?",
      "Which Sanskrit wording belongs to the selected surface reading, how do the displayed Devanagari and IAST encode it, and which pāda breaks, hyphens, reading guides, and English meanings are additional editorial aids?",
      "Which variants materially alter metre, image, or interpretation enough that a careful reader needs to see them?",
    ],
  },
  "bhagavad-gita": {
    title: "What changes when Krishna's counsel is read verse by verse, word by word?",
    introduction:
      "The declared Sanskrit base text and its grammatical word-division are presented for all eighteen chapters, kept distinct from this site's mechanical transliteration, sourced or editorially supplied word meanings, and newly composed close English rendering.",
    socraticQuestions: [
      "How does hearing this as Sañjaya's report to Dhṛtarāṣṭra, rather than an abstract philosophical treatise, change what Kṛṣṇa's counsel to Arjuna is doing?",
      "When a single Sanskrit compound can be split and glossed in more than one defensible way, what does the chosen word-by-word division make visible, and what does it foreclose?",
      "How can the many centuries of commentary on this text (Śaṅkara, Rāmānuja, Madhusūdana, and others) be honoured rather than flattened by one close, literal English rendering?",
      "What does it mean to call this edition complete: is completeness about verse count alone, or also about the layers of reading a single verse can support?",
    ],
    firstPrinciplesQuestions: [
      "Which Sanskrit wording comes from the declared base source, and which normalization, transliteration, word-division, and English wording were prepared for this reader?",
      "Why does this edition carry 701 verses when 700 is the more commonly cited total, and what does that difference actually consist of?",
      "What can a concise, literal, word-grounded English rendering establish about a verse, and what does it still leave to grammar, philosophical context, and commentary?",
      "What evidence distinguishes Sañjaya as narrator, Kṛṣṇa as the dialogue's speaker, and Vyāsa as the epic's traditional compiler, rather than treating all three as equivalent historical authors?",
    ],
  },
  ramcharitmanas: {
    title: "What does it mean for a reading edition to say, plainly, how much of it is done?",
    introduction:
      "Bālakāṇḍa's opening invocation is presented complete, word by word, with the rest of the kāṇḍa's Awadhi text verified but not yet translated, and the six kāṇḍas after it not yet begun. The declared coverage is stated before the reader, not discovered partway through it.",
    socraticQuestions: [
      "What is lost, and what is gained, by reading Tulsi's Awadhi retelling as a devotional work in its own right rather than as a translation of Vālmīki's Sanskrit Rāmāyaṇa?",
      "When a verse's translation is marked pending rather than supplied, does that absence teach something a confident but uncertain guess would not?",
      "How does the layered narration — Tulsidas recounting Yājñavalkya recounting Śiva's telling to Pārvatī — change what it means to ask who is speaking at any given verse?",
      "What does it cost a reader when a study edition of a sacred text quietly pads out an unfinished section to look complete, and what does it cost when it does not?",
    ],
    firstPrinciplesQuestions: [
      "Which Awadhi and Sanskrit wording comes from the declared base source, and which normalization, transliteration, and translation were prepared for this reader?",
      "What must be true of a source correction — like the one disclosed doha label — before it is reasonable to fix it rather than reproduce an evident typo?",
      "Of the 369 units in this kāṇḍa, which thirteen carry full word-by-word study, which further twenty-nine carry only a close translation, and what distinguishes each layer from the verified-but-untranslated remainder?",
      "What would it take to extend this same standard of verification across the rest of Bālakāṇḍa and into the six kāṇḍas that follow?",
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
  const entries = await loadScriptureEntries(slug);
  const theme = themes[slug];
  const inquiry = scriptureInquiry[slug];
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
        ? ["awa-Deva", "sa-Deva", "en"]
        : slug === "hanuman-chalisa"
          ? ["awa-Deva", "en"]
          : ["sa-Deva", "en"],
    learningResourceType:
      slug === "shiva-tandava-stotram"
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
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.34fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur-sm">
                  Source-aware ·{" "}
                  {slug === "shiva-tandava-stotram"
                    ? "pāda & compound edition"
                    : isSahasranama
                      ? "complete name-by-name edition"
                      : "line & word study edition"}
                </span>
                <p lang={languageCode} className={`mt-8 font-serif text-3xl ${theme.badge}`}>
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
                <p lang={languageCode} className={`font-serif text-6xl ${theme.badge}`}>
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
        introduction={inquiry.introduction}
        socraticQuestions={inquiry.socraticQuestions}
        firstPrinciplesQuestions={inquiry.firstPrinciplesQuestions}
      />

      <section aria-labelledby="authentic-title" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
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

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="reader" aria-labelledby="reader-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">
                02 /{" "}
                {slug === "shiva-tandava-stotram"
                  ? "Pāda & compound"
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
          <ScriptureReader entries={entries} slug={slug} language={languageCode} />
        </Container>
      </section>

      <section
        id="attribution"
        aria-labelledby="attribution-title"
        className="relative overflow-hidden bg-slate-950 py-16 text-white sm:py-24"
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        <Container className="relative max-w-6xl">
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

      <section id="method" aria-labelledby="method-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-9 lg:grid-cols-[0.42fr_1fr]">
            <div>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">04 / Editorial method</p>
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
        <Container className="max-w-6xl">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-xl shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950">
            <div className="border-b border-slate-200 p-7 sm:p-10 dark:border-slate-800">
              <p className="eyebrow mb-3">05 / Source shelf</p>
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
                      className="font-serif text-xl"
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
