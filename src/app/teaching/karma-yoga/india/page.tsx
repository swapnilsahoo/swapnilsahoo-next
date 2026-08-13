import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons/LineIcons";
import { Container } from "@/components/ui/Container";
import { InquiryPrelude } from "@/components/ui/InquiryPrelude";

import { KarmaYogaBranchNav, KarmaYogaIndiaStory } from "../KarmaYogaPathways";

const title = "Karma Yoga for India — Mehalchauri";
const description =
  "The Mehalchauri partnership in Uttarakhand: a long-horizon Karma Yoga story spanning education, sport, environment, livelihoods and community capability.";
const image = "/images/teaching/karma-yoga/mehalchauri/community-circle.webp";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Karma Yoga for India",
    "Mehalchauri",
    "Uttarakhand",
    "Chamoli",
    "community partnership",
    "Indus Quality Foundation",
  ],
  alternates: { canonical: "/teaching/karma-yoga/india" },
  openGraph: {
    type: "article",
    title,
    description,
    url: "/teaching/karma-yoga/india",
    images: [
      {
        url: image,
        width: 1600,
        height: 900,
        alt: "A community circle in Mehalchauri, Uttarakhand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function KarmaYogaForIndiaPage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-clip">
      <header className="px-4 pt-10 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="relative mx-auto max-w-[92rem] overflow-hidden rounded-[2rem] border border-emerald-200/15 bg-slate-950 text-white shadow-[0_40px_120px_-48px_rgba(3,7,18,0.9)] sm:rounded-[2.5rem]">
          <div
            className="absolute -top-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-emerald-400/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid items-stretch lg:grid-cols-[0.94fr_1.06fr]">
            <div className="flex min-h-[560px] flex-col justify-end px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-emerald-200 uppercase">
                Karma Yoga · Pathway 02
              </p>
              <h1 className="mt-7 max-w-3xl font-serif text-[clamp(3.7rem,7vw,7.8rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance">
                Karma Yoga for India
                <span className="mt-4 block text-[0.46em] leading-[1.04] font-normal text-emerald-200 italic">
                  The Mehalchauri story.
                </span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300">
                A long-horizon relationship in the Himalayan foothills—built through schools, sport,
                environmental care, livelihood experiments and the patient work of returning.
              </p>
            </div>

            <div
              data-india-hero-photo
              className="relative flex flex-col gap-1.5 overflow-hidden lg:h-full lg:justify-center"
            >
              <figure className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={image}
                  alt="Women and girls forming a community circle in a Mehalchauri courtyard"
                  fill
                  priority
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-950/35 lg:via-transparent" />
                <figcaption className="absolute right-6 bottom-4 left-6 max-w-xl rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 text-xs leading-5 text-slate-200 backdrop-blur-md">
                  A community circle · participation begins with shared presence.
                </figcaption>
              </figure>
              <figure className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/teaching/karma-yoga/mehalchauri/girls-football-trophy-2026.jpg"
                  alt="Prof. S. K. Palhan presenting the trophy to Mehalchauri-Salinga's first girls' football team"
                  fill
                  sizes="(min-width: 1024px) 54vw, 100vw"
                  className="object-cover object-[center_38%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-950/35 lg:via-transparent" />
                <figcaption className="absolute right-6 bottom-4 left-6 max-w-xl rounded-xl border border-white/10 bg-slate-950/55 px-4 py-3 text-xs leading-5 text-slate-200 backdrop-blur-md">
                  April 2026 · Prof. S. K. Palhan, founder of the Karma Yoga initiative, presents
                  the trophy to Mehalchauri-Salinga&apos;s first-ever girls&apos; football
                  team—until now, the village&apos;s teams had been boys-only.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </header>

      <InquiryPrelude
        id="karma-yoga-india-inquiry"
        title="What does “partnership” mean over years rather than one visit?"
        questions={[
          "If the partnership ended tomorrow, what would still be standing in Mehalchauri without it?",
          "Would one visit have produced Mehalchauri's first girls' football team — or did that take years of returning?",
        ]}
      />

      <KarmaYogaBranchNav current="india" />
      <KarmaYogaIndiaStory />

      <section aria-label="Continue exploring Karma Yoga" className="py-14 sm:py-20">
        <Container className="max-w-6xl">
          <div className="glass-card flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="eyebrow mb-2">The other pathway</p>
              <h2 className="font-serif text-2xl font-semibold sm:text-3xl">
                See how Karma Yoga becomes a B-school learning architecture.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/teaching/karma-yoga"
                className="text-ink-600 dark:text-ink-300 inline-flex items-center text-sm font-semibold hover:underline"
              >
                Karma Yoga hub
              </Link>
              <Link
                href="/teaching/karma-yoga/b-schools"
                className="text-brand-700 dark:text-brand-300 inline-flex items-center gap-2 text-sm font-bold hover:underline"
              >
                For B-Schools
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
