import {
  ArrowRightIcon,
  BricolageIcon,
  CompassIcon,
  GraduationCapIcon,
  NetworkIcon,
  SparkIcon,
} from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";

export type Reference = {
  id: number;
  author: string;
  year: string;
  title: string;
  publisher: string;
  href: string;
};

export type ProgrammeModule = {
  index: string;
  title: string;
  question: string;
  description: string;
  methods: string[];
  citations: number[];
};

export type ProgrammeConfig = {
  eyebrow: string;
  title: string;
  accent: string;
  promise: string;
  description: string;
  audience: string;
  pace: string;
  outcome: string;
  principles: { title: string; description: string; citations: number[] }[];
  modules: ProgrammeModule[];
  studioTitle: string;
  studioDescription: string;
  studios: { title: string; description: string; evidence: string }[];
  assessment: { label: string; title: string; description: string }[];
  references: Reference[];
  siblingHref: string;
  siblingLabel: string;
};

function Citations({ ids }: { ids: number[] }) {
  return (
    <span className="ml-1 whitespace-nowrap">
      {ids.map((id) => (
        <a
          key={id}
          href={`#reference-${id}`}
          className="text-brand-700 dark:text-brand-300 ml-0.5 align-super text-[10px] font-semibold hover:underline"
          aria-label={`See reference ${id}`}
        >
          [{id}]
        </a>
      ))}
    </span>
  );
}

export function MbaProgrammePage({ config }: { config: ProgrammeConfig }) {
  return (
    <main>
      <header className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="aurora" aria-hidden="true" />
        <Container className="max-w-6xl">
          <div className="from-ink-950 via-brand-900 to-ink-800 relative isolate overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br px-6 py-12 text-white shadow-2xl shadow-blue-950/20 sm:px-10 sm:py-16 lg:px-14">
            <div
              className="bg-accent-400/20 absolute -top-28 -right-24 -z-10 h-80 w-80 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="bg-brand-400/20 absolute -bottom-36 -left-20 -z-10 h-96 w-96 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_0.4fr]">
              <div>
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-blue-100 uppercase backdrop-blur-sm">
                  {config.eyebrow}
                </span>
                <h1 className="display mt-7 max-w-4xl text-5xl font-semibold text-balance sm:text-7xl">
                  {config.title}{" "}
                  <span className="text-brand-200 font-normal italic">{config.accent}</span>
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg">
                  {config.description}
                </p>
                <a
                  href="#learning-architecture"
                  className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:outline-none"
                >
                  Explore the learning architecture
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <div className="space-y-3">
                {[
                  ["Designed for", config.audience],
                  ["Learning pace", config.pace],
                  ["North star", config.outcome],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                      {label}
                    </p>
                    <p className="mt-2 font-serif text-xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section aria-labelledby="promise-title" className="py-16 sm:py-24">
        <Container className="max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="accent-rule" />
              <p className="eyebrow mb-3">01 / Learning promise</p>
              <h2 id="promise-title" className="display text-4xl font-semibold md:text-5xl">
                {config.promise}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
              {config.principles.map((principle, index) => (
                <article key={principle.title} className="glass-card p-6">
                  <span className="text-brand-600 font-mono text-[10px]">0{index + 1}</span>
                  <h3 className="mt-3 font-serif text-xl font-semibold">{principle.title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                    {principle.description}
                    <Citations ids={principle.citations} />
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <div className="hr-fade mx-auto max-w-6xl" />

      <section
        id="learning-architecture"
        aria-labelledby="architecture-title"
        className="py-16 sm:py-24"
      >
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Learning architecture</p>
            <h2 id="architecture-title" className="display text-4xl font-semibold md:text-5xl">
              From frameworks to executive judgment.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Each module begins with a consequential question, introduces only the theory needed to
              sharpen it, and ends with a decision, artifact or experiment.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {config.modules.map((module) => (
              <article key={module.index} className="glass-card group relative overflow-hidden p-7">
                <span className="text-brand-600/10 dark:text-brand-300/10 absolute top-1 right-5 font-serif text-7xl font-semibold">
                  {module.index}
                </span>
                <p className="eyebrow relative mb-3">Module {module.index}</p>
                <h3 className="relative font-serif text-2xl font-semibold">{module.title}</h3>
                <p className="text-brand-700 dark:text-brand-300 relative mt-2 text-sm font-semibold">
                  {module.question}
                </p>
                <p className="text-ink-600 dark:text-ink-300 relative mt-4 text-sm leading-relaxed">
                  {module.description}
                  <Citations ids={module.citations} />
                </p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {module.methods.map((method) => (
                    <span key={method} className="tag">
                      {method}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="from-ink-950 to-brand-900 relative overflow-hidden rounded-[28px] bg-gradient-to-br p-7 text-white shadow-xl shadow-blue-950/15 sm:p-10">
            <div className="relative grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <SparkIcon className="h-7 w-7 text-blue-200" aria-hidden="true" />
                <p className="mt-5 font-mono text-[11px] tracking-[0.16em] text-blue-200 uppercase">
                  03 / Practice studios
                </p>
                <h2 className="mt-3 font-serif text-4xl font-semibold">{config.studioTitle}</h2>
                <p className="mt-4 text-sm leading-relaxed text-blue-100">
                  {config.studioDescription}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {config.studios.map((studio, index) => {
                  const icons = [CompassIcon, NetworkIcon, BricolageIcon, GraduationCapIcon];
                  const Icon = icons[index % icons.length];
                  return (
                    <article
                      key={studio.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                    >
                      <Icon className="h-5 w-5 text-blue-200" aria-hidden="true" />
                      <h3 className="mt-4 font-serif text-xl font-semibold">{studio.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-blue-100">
                        {studio.description}
                      </p>
                      <p className="mt-3 font-mono text-[10px] tracking-wide text-blue-200 uppercase">
                        Evidence · {studio.evidence}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="assessment-title" className="pb-16 sm:pb-24">
        <Container className="max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Evidence of learning</p>
            <h2 id="assessment-title" className="display text-4xl font-semibold md:text-5xl">
              Assessment that looks like the work.
            </h2>
            <p className="text-ink-600 dark:text-ink-300 mt-5 text-sm leading-relaxed">
              Multiple direct demonstrations make progress visible and keep assessment aligned with
              the capabilities the programme intends to build.
              <Citations ids={[7]} />
            </p>
          </div>
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {config.assessment.map((item) => (
              <li key={item.label} className="glass-card p-6">
                <p className="eyebrow mb-3">{item.label}</p>
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="references-title" className="pb-20 sm:pb-28">
        <Container className="max-w-6xl">
          <div className="glass-card p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
              <div>
                <p className="eyebrow mb-3">05 / References</p>
                <h2 id="references-title" className="display text-4xl font-semibold">
                  Research behind the design.
                </h2>
              </div>
              <ol className="space-y-4">
                {config.references.map((reference) => (
                  <li
                    id={`reference-${reference.id}`}
                    key={reference.id}
                    className="text-ink-600 dark:text-ink-300 scroll-mt-28 text-sm leading-relaxed"
                  >
                    <span className="text-ink-900 dark:text-ink-50 mr-2 font-mono font-semibold">
                      [{reference.id}]
                    </span>
                    {reference.author} ({reference.year}).{" "}
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 dark:text-brand-300 font-semibold hover:underline"
                    >
                      {reference.title}
                    </a>
                    . {reference.publisher}.
                  </li>
                ))}
              </ol>
            </div>
            <div className="hr-fade my-8" />
            <a
              href={config.siblingHref}
              className="text-brand-700 dark:text-brand-300 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Compare with the {config.siblingLabel}
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
