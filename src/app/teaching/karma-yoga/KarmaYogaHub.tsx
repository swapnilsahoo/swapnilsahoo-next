import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

const sharedPrinciples = [
  {
    number: "01",
    title: "Dignity before solution",
    description:
      "Enter with humility. Local knowledge, consent and priorities come before the team’s preferred answer.",
  },
  {
    number: "02",
    title: "Evidence before narrative",
    description:
      "Pair lived stories with observation, feedback and honest limits before claiming that an action created value.",
  },
  {
    number: "03",
    title: "Handover before exit",
    description:
      "Design for local ownership, maintenance and the right to adapt or stop the work after a visiting team leaves.",
  },
] as const;

export function KarmaYogaHub() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-clip">
      <header className="px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="relative isolate mx-auto max-w-[92rem] overflow-hidden rounded-[2rem] border border-white/10 bg-ink-950 text-white shadow-[0_40px_120px_-48px_rgba(3,7,18,0.9)] sm:rounded-[2.5rem]">
          <Image
            src="/images/teaching/karma-yoga/mehalchauri/community-circle.webp"
            alt="Women and girls forming a community circle in a Mehalchauri courtyard"
            fill
            priority
            className="-z-20 object-cover"
            style={{ objectPosition: "center 40%" }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(5,10,24,0.82), rgba(30,58,138,0.74), rgba(10,20,38,0.70))",
            }}
          />
          <div
            className="bg-brand-500/20 absolute -top-40 -left-28 -z-10 h-[30rem] w-[30rem] rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="bg-accent-400/15 absolute -right-32 -bottom-44 -z-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [mask-image:linear-gradient(115deg,#000,transparent_78%)] [background-size:48px_48px] opacity-20"
            aria-hidden="true"
          />

          <div className="grid min-h-[610px] items-end gap-14 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-16 lg:py-20">
            <div>
              <p className="inline-flex rounded-full border border-white/15 bg-white/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-blue-100 uppercase backdrop-blur-sm">
                Experiential leadership · Responsible action
              </p>
              <h1 className="mt-9 max-w-5xl font-serif text-[clamp(4rem,8vw,8.8rem)] leading-[0.86] font-semibold tracking-[-0.055em] text-balance">
                Karma Yoga
                <span className="from-brand-200 to-accent-200 mt-3 block max-w-4xl bg-gradient-to-r via-white bg-clip-text pb-2 text-[0.43em] leading-[1.05] font-normal text-transparent italic">
                  Two pathways. One ethic of responsible action.
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                One pathway turns service into rigorous field learning for management students. The
                other follows relationships with place over time—beginning with Mehalchauri in the
                Himalayan foothills of Uttarakhand.
              </p>
            </div>

            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["01 · For B-Schools", "Field immersion · Co-design · Evidence"],
                ["02 · For India", "Mehalchauri · Long-horizon partnership"],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-md"
                >
                  <dt className="font-mono text-[10px] tracking-[0.16em] text-blue-200 uppercase">
                    {term}
                  </dt>
                  <dd className="mt-2 font-serif text-xl font-semibold text-white">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <InquiryPrelude
        id="karma-yoga-inquiry"
        title="Which pathway are you actually choosing — and why?"
        questions={[
          "Who decides if it worked — the students, or Mehalchauri?",
          "Would this still be worth doing if your team could never come back?",
        ]}
      />

      <section aria-label="Choose a Karma Yoga pathway" className="py-14 sm:py-20">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="mb-10 max-w-3xl">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">Choose a pathway</p>
            <h2 className="display text-4xl leading-[1.04] font-semibold text-balance sm:text-6xl">
              Two branches, designed for different kinds of work.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article
              id="karma-yoga-b-schools"
              className="glass-card group scroll-mt-28 overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/teaching/karma-yoga/b-schools/student-connection.webp"
                  alt="Management students gathered with schoolchildren during field learning"
                  width={1280}
                  height={960}
                  sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
                  className="h-full w-full object-cover object-[center_42%] transition duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute right-5 bottom-4 left-5 font-mono text-[10px] font-bold tracking-[0.16em] text-white uppercase">
                  Pathway 01 · Field pedagogy
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
                  Karma Yoga for B-Schools
                </h2>
                <p className="text-ink-600 dark:text-ink-300 mt-4 text-sm leading-7">
                  A complete management-learning architecture: inquiry, field immersion, co-design,
                  disciplined execution, impact evidence, handover and reflection.
                </p>
                <Link
                  href="/teaching/karma-yoga/b-schools"
                  className="text-brand-700 dark:text-brand-300 mt-6 inline-flex items-center gap-2 text-sm font-bold hover:underline"
                >
                  Enter the B-school pathway
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>

            <article
              id="karma-yoga-india"
              className="group scroll-mt-28 overflow-hidden rounded-3xl border border-emerald-300/20 bg-slate-950 text-white shadow-xl shadow-emerald-950/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/teaching/karma-yoga/mehalchauri/community-circle.webp"
                  alt="Women and girls forming a community circle in Mehalchauri"
                  width={1600}
                  height={900}
                  sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <p className="absolute right-5 bottom-4 left-5 font-mono text-[10px] font-bold tracking-[0.16em] text-emerald-100 uppercase">
                  Pathway 02 · Long-horizon partnership
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
                  Karma Yoga for India
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  The Mehalchauri story: a relationship across education, sport, environment,
                  livelihood experiments and community capability, told with historical and April
                  2026 field photographs.
                </p>
                <Link
                  href="/teaching/karma-yoga/india"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-200 hover:underline"
                >
                  Read the Mehalchauri story
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section aria-labelledby="recognition-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <blockquote className="border-brand-200 bg-brand-50/65 dark:border-brand-800 dark:bg-brand-950/35 rounded-3xl border p-7 sm:p-9">
              <p className="font-serif text-2xl leading-snug font-semibold text-balance sm:text-3xl">
                “My major takeaway from Karma Yoga at Great Lakes is that every problem can be
                solved if you just initiate and move forward with whatever you can do… It has all
                the components that a good manager should have, starting from problem
                identification, teamwork, and most importantly—empathy.”
              </p>
              <footer className="text-ink-600 dark:text-ink-300 mt-5 text-sm">
                Sumit Gupta · PGPM 2021–22
              </footer>
            </blockquote>

            <aside className="glass-card p-6">
              <p id="recognition-title" className="eyebrow">
                Recognition
              </p>
              <h2 className="mt-3 font-serif text-xl font-semibold">
                Nominated · ET Education Excellence Awards, 3rd Edition
              </h2>
              <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                Karma Yoga was put forward for &ldquo;Excellence in Innovative Teaching and
                Experiential Learning&rdquo;—recognition for treating field service as management
                education enacted in the field, not outreach added to it.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section aria-labelledby="shared-ethic-title" className="pb-20 sm:pb-28">
        <Container className="max-w-[min(100%,120rem)]">
          <div className="rounded-[2rem] border border-slate-900/10 bg-white/65 p-6 shadow-xl shadow-slate-950/5 sm:p-10 dark:border-white/10 dark:bg-slate-950/55">
            <div className="max-w-3xl">
              <p className="eyebrow mb-3">The shared ethic</p>
              <h2
                id="shared-ethic-title"
                className="display text-3xl font-semibold text-balance sm:text-5xl"
              >
                Different settings. The same responsibilities.
              </h2>
            </div>
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {sharedPrinciples.map(({ number, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-900/10 p-6 dark:border-white/10"
                >
                  <span className="text-brand-600 dark:text-brand-300 font-mono text-[10px] font-bold">
                    {number}
                  </span>
                  <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
                  <p className="text-ink-600 dark:text-ink-300 mt-3 text-sm leading-6">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
