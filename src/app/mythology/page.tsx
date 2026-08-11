import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRightIcon, CompassIcon, SparkIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";
import { MythologyBranchNav } from "@/features/mythology/components/MythologyBranchNav";

export const metadata: Metadata = {
  title: "Mythology — Epics & Immortality Traditions",
  description:
    "A source-aware reading library for the Mahabharata, Valmiki Ramayana, and 17 cross-cultural profiles of deathlessness.",
  keywords: [
    "Mahabharata original",
    "Ramayana original",
    "Valmiki Ramayana",
    "Vyasa Mahabharata",
    "Sanskrit epics",
    "Indian mythology",
    "immortality traditions",
    "siddha traditions",
  ],
  alternates: { canonical: "/mythology" },
  openGraph: {
    type: "website",
    title: "Mythology — Epics, Immortals & Many Tellings",
    description:
      "A source-aware reading library for two Sanskrit epics and 17 cross-cultural profiles of deathlessness.",
    url: "/mythology",
    images: ["/images/profile_pic.jpg"],
  },
};

const mahabharataLenses = [
  "Dharma and moral uncertainty",
  "Kinship, rivalry and inheritance",
  "Governance, counsel and leadership",
  "War, grief and consequence",
] as const;

const ramayanaLenses = [
  "Exile, home and belonging",
  "Loyalty, courage and agency",
  "Kingship and public duty",
  "Justice, loss and consequence",
] as const;

const mythologyInquiry = {
  socratic: [
    "Before calling a character righteous or wrong, which obligations are colliding—and whose voice or suffering is absent from the scene?",
    "Would the same action appear different if it were taken by someone with less status, less knowledge, or fewer choices?",
    "When recensions, translations, and commentaries differ, what do we actually mean when we say, ‘the epic says’?",
    "What does the aftermath reveal about a celebrated decision that the moment of heroism or victory can conceal?",
  ],
  firstPrinciples: [
    "Which edition or recension, passage, translation, and—where relevant—commentary support the reading in front of us?",
    "Can we separate what the scene depicts, what its narrator frames, what a commentator argues, and what a modern reader infers?",
    "If dharma concerns action amid competing obligations, which relationships, promises, constraints, and foreseeable consequences must be understood first?",
    "What remains in the episode when we suspend familiar summaries, devotional conclusions, and contemporary leadership analogies?",
  ],
} as const;

const mahabharataReadingMap = [
  {
    span: "Ādi & Sabhā",
    movement: "Lineage, vows, inheritance and the court",
    question: "Which earlier promises and exclusions make the later conflict possible?",
  },
  {
    span: "Vana & Virāṭa",
    movement: "Exile, learning, endurance and life under concealment",
    question: "What changes when status is removed but obligation remains?",
  },
  {
    span: "Udyoga",
    movement: "Counsel, embassies and the failure of settlement",
    question: "At what point does each side stop believing that peace is still workable?",
  },
  {
    span: "Bhīṣma through Strī",
    movement: "War, justification, bereavement and the cost carried by survivors",
    question: "How does each speaker explain a choice whose consequences cannot be contained?",
  },
  {
    span: "Śānti through Svargārohaṇa",
    movement: "Rule, instruction, withdrawal, collapse and the final journey",
    question: "What can victory repair—and what must remain unresolved?",
  },
] as const;

const ramayanaReadingMap = [
  {
    span: "Bāla Kāṇḍa",
    movement: "Origins, formation and the world into which the journey begins",
    question: "How does the opening establish the qualities by which later choices are judged?",
  },
  {
    span: "Ayodhyā Kāṇḍa",
    movement: "Succession, promises, exile and a household divided by duty",
    question: "When obligations conflict, who is allowed to define the honourable response?",
  },
  {
    span: "Araṇya & Kiṣkindhā",
    movement: "Forest life, abduction, grief, search and a difficult alliance",
    question: "How do loss and dependence reshape relationships between strangers?",
  },
  {
    span: "Sundara & Yuddha",
    movement: "Recognition, message, crossing, battle and return",
    question: "Where do courage, loyalty and restraint appear in actions rather than declarations?",
  },
  {
    span: "Uttara Kāṇḍa",
    movement: "Kingship, public judgment and the unsettled aftermath",
    question:
      "How does the chosen edition frame the tension between private bonds and public rule?",
  },
] as const;

type ReadingMapItem = (typeof mahabharataReadingMap)[number] | (typeof ramayanaReadingMap)[number];

function StudyLenses({ items }: { items: readonly string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item}
          className="border-ink-200/80 bg-white/70 dark:border-ink-700 dark:bg-ink-900/50 rounded-2xl border p-4"
        >
          <span className="text-accent-600 dark:text-accent-400 font-mono text-[10px]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 text-sm font-semibold">{item}</p>
        </div>
      ))}
    </div>
  );
}

function EpicReadingMap({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly ReadingMapItem[];
}) {
  return (
    <div className="mt-12">
      <div className="mb-6 max-w-3xl">
        <p className="eyebrow">A reading map</p>
        <h3 className="mt-2 font-serif text-3xl font-semibold">{title}</h3>
        <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">{description}</p>
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item, index) => (
          <li key={item.span} className="glass-card flex h-full flex-col p-5">
            <p className="text-brand-700 dark:text-brand-300 font-mono text-[10px] tracking-[0.14em] uppercase">
              Passage {String(index + 1).padStart(2, "0")}
            </p>
            <h4 className="mt-3 font-serif text-lg font-semibold">{item.span}</h4>
            <p className="text-ink-600 dark:text-ink-300 mt-2 text-sm leading-relaxed">
              {item.movement}
            </p>
            <p className="border-ink-200/80 dark:border-ink-700 text-ink-700 dark:text-ink-200 mt-5 border-t pt-4 text-xs leading-relaxed">
              <span className="font-semibold">Keep asking:</span> {item.question}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function MythologyPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div
            data-page-hero="mythology"
            className="relative isolate overflow-hidden rounded-[30px] border border-indigo-200/20 bg-gradient-to-br from-[#15113d] via-[#312e81] to-[#9a3412] px-6 py-12 text-white shadow-2xl shadow-indigo-950/25 sm:px-10 sm:py-16 lg:px-14"
          >
            <div
              className="absolute -top-32 -right-24 -z-10 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-36 -left-16 -z-10 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.42fr]">
              <div>
                <span className="inline-flex rounded-full border border-indigo-100/20 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-indigo-100 uppercase backdrop-blur-sm">
                  Mythology · text, tradition & evidence
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  Two epics. Seventeen profiles.{" "}
                  <span className="font-normal text-amber-200 italic">Many tellings.</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-indigo-50 sm:text-lg">
                  Read the Mahābhārata and Vālmīki Rāmāyaṇa alongside a new source-aware atlas of
                  immortality traditions—without collapsing sacred testimony, textual history and
                  scientific evidence into one kind of claim.
                </p>
                <nav aria-label="Explore mythology branches" className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#mahabharata-original"
                    className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-5 py-3 text-sm font-semibold text-indigo-950 shadow-lg shadow-indigo-950/20 transition hover:-translate-y-0.5 hover:bg-white focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:outline-none"
                  >
                    Mahabharata
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#ramayana-original"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    Ramayana
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <Link
                    href="/mythology/immortals"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
                  >
                    Immortals
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </nav>
              </div>

              <div className="rounded-3xl border border-indigo-100/15 bg-white/5 p-6 text-center backdrop-blur-sm">
                <p lang="sa-Deva" className="script-devanagari text-4xl leading-relaxed font-semibold text-amber-200">
                  इतिहास
                </p>
                <p lang="sa-Deva" className="script-devanagari mt-4 text-2xl leading-relaxed font-semibold">
                  धर्म · काव्य · अमृतत्व
                </p>
                <p className="mt-2 text-xs tracking-wider text-indigo-100 uppercase">
                  Ethics · Poetry · Deathlessness
                </p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-label="Mythology library navigation" className="pb-12 sm:pb-16">
        <Container className="max-w-6xl">
          <MythologyBranchNav current="overview" />
        </Container>
      </section>

      <InquiryPrelude
        id="mythology-inquiry"
        eyebrow="Before entering the epics"
        title="Which question is the story refusing to simplify?"
        introduction="The Mahābhārata and Vālmīki Rāmāyaṇa reach us through long textual and interpretive histories, not through a single uncontested authorial manuscript. These questions help us read a chosen witness carefully, distinguish scene from commentary, and remain attentive to moral complexity without deciding questions of faith or historicity for the reader."
        socraticQuestions={mythologyInquiry.socratic}
        firstPrinciplesQuestions={mythologyInquiry.firstPrinciples}
      />

      <section aria-labelledby="original-note-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="glass-card grid gap-7 p-7 sm:p-9 lg:grid-cols-[0.42fr_1fr]">
            <div>
              <SparkIcon
                className="text-accent-600 dark:text-accent-400 h-7 w-7"
                aria-hidden="true"
              />
              <p className="eyebrow mt-5 mb-2">A note on the label</p>
              <h2 id="original-note-title" className="display text-3xl font-semibold">
                What “Original” means here.
              </h2>
            </div>
            <div className="text-ink-600 dark:text-ink-300 space-y-4 self-center text-sm leading-relaxed sm:text-base">
              <p>
                “Original” signals a focus on the Sanskrit source traditions rather than screen
                adaptations, abridgements or modern retellings. It does not suggest that one
                uncontested authorial manuscript survives.
              </p>
              <p>
                Both epics have long, varied histories of composition and transmission. Every close
                reading should therefore identify the edition, translation and commentary it
                follows.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="mahabharata-original"
        aria-labelledby="mahabharata-title"
        className="py-16 sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <article>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Mahabharata · Original</p>
              <h2 id="mahabharata-title" className="display text-4xl font-semibold md:text-5xl">
                <span lang="sa-Deva" className="script-devanagari leading-relaxed">
                  महाभारतम्
                </span>
                <span className="text-ink-400 dark:text-ink-500"> · </span>
                Mahābhārata
              </h2>
              <p className="text-brand-700 dark:text-brand-300 mt-4 font-mono text-xs tracking-wide uppercase">
                Traditionally attributed to Vyāsa · Eighteen major parvans
              </p>
              <p className="text-ink-600 dark:text-ink-300 mt-7 text-base leading-relaxed">
                At its centre is a dynastic conflict, but the epic’s larger concern is dharma under
                pressure: what people owe family, polity, teachers, rivals and themselves when every
                available choice carries a cost. The Bhagavad Gītā appears within the Bhīṣma Parvan.
              </p>
              <a
                href="https://bombay.indology.info/mahabharata/welcome.html"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-brand-700 dark:text-brand-300 mt-7 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Explore the electronic Critical Edition
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>

            <aside aria-labelledby="mahabharata-lenses" className="glass-card p-6 sm:p-8">
              <CompassIcon
                className="text-accent-600 dark:text-accent-400 h-7 w-7"
                aria-hidden="true"
              />
              <h3 id="mahabharata-lenses" className="mt-4 font-serif text-2xl font-semibold">
                Study lenses
              </h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 mb-6 text-sm leading-relaxed">
                Four themes for moving from plot summary to attentive reading.
              </p>
              <StudyLenses items={mahabharataLenses} />
            </aside>
          </div>

          <EpicReadingMap
            title="Follow the argument, not only the battle."
            description="The eighteen-parvan architecture can feel forbidding at first. This five-part path keeps the earlier vows, failed negotiations, human cost and long aftermath in view, so the war does not become the whole epic."
            items={mahabharataReadingMap}
          />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="ramayana-original" aria-labelledby="ramayana-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <aside
              aria-labelledby="ramayana-lenses"
              className="glass-card order-2 p-6 sm:p-8 lg:order-1"
            >
              <CompassIcon
                className="text-accent-600 dark:text-accent-400 h-7 w-7"
                aria-hidden="true"
              />
              <h3 id="ramayana-lenses" className="mt-4 font-serif text-2xl font-semibold">
                Study lenses
              </h3>
              <p className="text-ink-600 dark:text-ink-300 mt-2 mb-6 text-sm leading-relaxed">
                Four themes for reading the journey as an inquiry, not only an itinerary.
              </p>
              <StudyLenses items={ramayanaLenses} />
            </aside>

            <article className="order-1 lg:order-2">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">02 / Ramayana · Original</p>
              <h2 id="ramayana-title" className="display text-4xl font-semibold md:text-5xl">
                <span lang="sa-Deva" className="script-devanagari leading-relaxed">
                  वाल्मीकिरामायणम्
                </span>
                <span className="text-ink-400 dark:text-ink-500"> · </span>
                Vālmīki Rāmāyaṇa
              </h2>
              <p className="text-brand-700 dark:text-brand-300 mt-4 font-mono text-xs tracking-wide uppercase">
                Traditionally attributed to Vālmīki · Received in seven kāṇḍas
              </p>
              <p className="text-ink-600 dark:text-ink-300 mt-7 text-base leading-relaxed">
                The epic follows Rāma’s exile, Sītā’s abduction, the search and alliance that lead
                to Laṅkā, and the difficult questions of return and kingship. It invites study of
                duty, loyalty, agency, justice and the tension between personal commitments and
                public responsibility.
              </p>
              <a
                href="https://gretil.sub.uni-goettingen.de/gret_utfbk.htm#Ram"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-brand-700 dark:text-brand-300 mt-7 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Explore Sanskrit text traditions
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </article>
          </div>

          <EpicReadingMap
            title="Read the journey as a sequence of changing obligations."
            description="A seven-kāṇḍa map helps readers notice how the central questions change: formation gives way to exile, exile to alliance and recovery, and return to an aftermath that must be read with the chosen edition clearly identified."
            items={ramayanaReadingMap}
          />
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section id="immortals" aria-labelledby="immortals-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <article>
              <span className="accent-rule" />
              <p className="eyebrow mb-3">03 / Immortals · Source-aware atlas</p>
              <h2 id="immortals-title" className="display text-4xl font-semibold md:text-5xl">
                <span lang="sa-Deva" className="script-devanagari leading-relaxed">
                  अमृतत्व
                </span>
                <span className="text-ink-400 dark:text-ink-500"> · </span>
                Traditions of deathlessness
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-7 text-base leading-relaxed">
                Seventeen profiles across Indic, Japanese, Burmese, Tibetan, Chinese and European
                settings ask what “immortal” can mean: an extraordinary lifespan, a teacher’s
                continuing presence, a luminous body, or alchemical transformation.
              </p>
              <Link
                href="/mythology/immortals"
                className="link-underline text-brand-700 dark:text-brand-300 mt-7 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Enter the Immortals atlas
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>

            <aside aria-label="Immortals editorial contract" className="glass-card p-6 sm:p-8">
              <CompassIcon className="text-accent-600 dark:text-accent-400 h-7 w-7" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl font-semibold">Every profile is read in three layers.</h3>
              <ol className="mt-6 grid gap-3">
                {[
                  ["Sources establish", "The historical record, text, institution, or documented public life."],
                  ["Tradition records", "The devotional, lineage, hagiographic, or esoteric account in its own register."],
                  ["Evidence does not establish", "The lifespan, miracle, identity, or physical mechanism that remains unverified."],
                ].map(([title, description], index) => (
                  <li key={title} className="border-ink-200/80 dark:border-ink-700 rounded-2xl border p-4">
                    <span className="text-brand-700 dark:text-brand-300 font-mono text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm font-semibold">{title}</p>
                    <p className="text-ink-600 dark:text-ink-300 mt-1 text-sm leading-relaxed">
                      {description}
                    </p>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </section>

      <section aria-labelledby="reading-method-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#15113d] via-[#312e81] to-[#7c2d12] p-7 text-white shadow-xl shadow-indigo-950/15 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <SparkIcon className="h-7 w-7 text-amber-300" aria-hidden="true" />
                <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-indigo-200 uppercase">
                  Editorial approach
                </p>
                <h2 id="reading-method-title" className="mt-3 font-serif text-4xl font-semibold">
                  How this library reads.
                </h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-indigo-50">
                <p>
                  The maps above are orientation, not substitutes for the text. Close reading should
                  name the Sanskrit edition, translation, commentary and later retelling being used.
                  Verse references and significant textual variants should be identified rather than
                  presented as universally settled.
                </p>
                <p>
                  The Immortals atlas applies the same discipline to sacred biography: a historical
                  record, a tradition’s testimony, and an extraordinary claim are related layers,
                  not interchangeable kinds of evidence.
                </p>
                <p>
                  “Mythology” is used here as a library category; it does not adjudicate questions
                  of faith, sacred authority or historicity. Later retellings remain important works
                  in their own contexts.
                </p>
                <p>
                  Begin with the scene before reaching for a lesson: who speaks, who remains silent,
                  what promise is already in force, what information is missing and who will live
                  with the result. That slower method leaves room for disagreement instead of
                  flattening either epic into a list of modern management rules.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
