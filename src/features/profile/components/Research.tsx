import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal";
import {
  ArrowRightIcon,
  GraduationCapIcon,
  BricolageIcon,
  CompassIcon,
  SparkIcon,
  NetworkIcon,
} from "@/components/icons/LineIcons";
import {
  researchAgenda,
  researchBranches,
  thesisFoundation,
} from "@/features/research/data/researchAgenda";
import type { ResearchIcon } from "@/features/research/types";

const streamIcons: Record<ResearchIcon, typeof BricolageIcon> = {
  bricolage: BricolageIcon,
  compass: CompassIcon,
  spark: SparkIcon,
  network: NetworkIcon,
};

export function Research() {
  return (
    <Reveal>
      <section id="research" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="accent-rule" />
            <p className="eyebrow mb-3">03 / Research agenda</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">
              {researchAgenda.title}
            </h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 max-w-md text-sm">
            Four connected branches grow from my submitted doctoral thesis: neurodiverse
            entrepreneurial agency, bricolage and effectuation, family-business resourcefulness,
            and frugal innovation through dynamic capabilities.
          </p>
        </div>

        <Link
          href="/research#doctoral-foundation"
          className="glass-card glass-card-inverse group mb-8 block border-0 p-6 md:p-8"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <GraduationCapIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="eyebrow mb-2">{thesisFoundation.eyebrow}</p>
              <h3 className="font-serif text-xl leading-snug font-semibold md:text-2xl">
                {thesisFoundation.title}
              </h3>
              <p className="mt-2 text-sm text-white/80">{thesisFoundation.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-200 group-hover:gap-3">
                Read the doctoral foundation
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>

        <div className="grid gap-5 md:grid-cols-2">
          {researchBranches.map((stream) => {
            const Icon = streamIcons[stream.icon];
            return (
              <Link
                key={stream.slug}
                href={`/research/${stream.slug}`}
                className="glass-card group flex h-full flex-col p-7"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="tag tag-ink">Branch {stream.index}</span>
                </div>
                <h3 className="mb-2 font-serif text-2xl font-semibold">{stream.title}</h3>
                <dl className="space-y-4 text-sm leading-relaxed">
                  <div>
                    <dt className="eyebrow mb-1">Central question</dt>
                    <dd className="text-ink-700 dark:text-ink-200">{stream.centralQuestion}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Context</dt>
                    <dd className="text-ink-600 dark:text-ink-300">{stream.context}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1">Thesis connection</dt>
                    <dd className="text-ink-600 dark:text-ink-300">
                      {stream.thesisConnection}
                    </dd>
                  </div>
                </dl>
                <span className="text-brand-700 dark:text-brand-300 mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold group-hover:gap-3">
                  Explore this branch
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/research" className="btn-primary">
            Explore the complete research agenda
            <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
