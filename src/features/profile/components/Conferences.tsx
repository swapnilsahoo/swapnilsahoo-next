import { Reveal } from "@/components/ui/Reveal";
import { bamCluster, conferenceEntries } from "@/features/profile/data/conferences";

export function Conferences() {
  return (
    <Reveal>
      <section id="conferences" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="accent-rule" />
            <p className="eyebrow mb-3">04 / Conferences &amp; talks</p>
            <h2 className="display text-4xl font-semibold md:text-5xl">On the podium.</h2>
          </div>
          <p className="text-ink-600 dark:text-ink-300 self-end text-sm leading-relaxed md:col-span-8">
            From Copenhagen to Kashipur, Kent to Kharagpur — presenting work-in-progress at the
            venues where the field shows up.
          </p>
        </div>

        <ol className="border-ink-200 dark:border-ink-700 relative ms-2 border-s">
          <li className="ms-6 pb-8">
            <span className="bg-brand-600 dark:ring-ink-900 absolute -start-2 mt-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-white" />
            <div className="glass-card p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="tag">{bamCluster.badge}</span>
                <span className="tag tag-ink">{bamCluster.venue}</span>
                <span className="tag tag-amber">{bamCluster.highlight}</span>
              </div>
              <p className="text-ink-500 dark:text-ink-400 mb-3 text-xs italic">
                {bamCluster.note}
              </p>
              <ul className="space-y-2 text-sm">
                {bamCluster.papers.map((paper) => (
                  <li key={paper} className="flex gap-2">
                    <span className="text-brand-500 mt-1">·</span>
                    <span className="font-serif font-semibold">{paper}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {conferenceEntries.map((entry, index) => (
            <li
              key={entry.title}
              className={index === conferenceEntries.length - 1 ? "ms-6" : "ms-6 pb-8"}
            >
              <span
                className={`dark:ring-ink-900 absolute -start-2 mt-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-white ${
                  entry.award ? "bg-accent-500" : "bg-brand-600"
                }`}
              />
              <div className="glass-card p-5">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span className="tag">{entry.badge}</span>
                  {entry.location && <span className="tag tag-ink">{entry.location}</span>}
                  {entry.award && <span className="tag tag-amber">{entry.award}</span>}
                </div>
                <p className="font-serif font-semibold">{entry.title}</p>
                {entry.subtitle && (
                  <p className="text-ink-500 dark:text-ink-300 mt-1 text-xs">{entry.subtitle}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
      <div className="hr-fade mx-auto max-w-6xl" />
    </Reveal>
  );
}
