import { Reveal } from "@/components/ui/Reveal";
import {
  GraduationCapIcon,
  BricolageIcon,
  CompassIcon,
  SparkIcon,
  NetworkIcon,
} from "@/components/icons/LineIcons";
import { dissertation, researchStreams } from "@/features/profile/data/research";
import type { ResearchStream } from "@/features/profile/types";

const streamIcons: Record<ResearchStream["icon"], typeof BricolageIcon> = {
  bricolage: BricolageIcon,
  compass: CompassIcon,
  spark: SparkIcon,
  network: NetworkIcon,
};

export function Research() {
  return (
    <Reveal>
      <section id="research" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="accent-rule" />
            <p className="eyebrow mb-3">02 / Research agenda</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">
              How organisations act when resources are scarce.
            </h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 max-w-md text-sm">
            My dissertation at XLRI examined entrepreneurial resourcefulness in resource-constrained
            environments. These four lines of inquiry carry that question into family firms, frugal
            innovation, neurodiverse teams and AI adoption.
          </p>
        </div>

        <div className="glass-card glass-card-inverse mb-8 border-0 p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <GraduationCapIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="eyebrow mb-2">{dissertation.eyebrow}</p>
              <h3 className="font-serif text-xl leading-snug font-semibold md:text-2xl">
                {dissertation.title}
              </h3>
              <p className="mt-2 text-sm text-white/80">{dissertation.description}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {researchStreams.map((stream) => {
            const Icon = streamIcons[stream.icon];
            return (
              <div key={stream.title} className="glass-card p-7">
                <div className="mb-3 flex items-start justify-between">
                  <div className="bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 flex h-10 w-10 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="tag tag-ink">{stream.index}</span>
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
                    <dt className="eyebrow mb-1">Connection</dt>
                    <dd className="text-ink-600 dark:text-ink-300">{stream.whyItMatters}</dd>
                  </div>
                </dl>
              </div>
            );
          })}
        </div>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
