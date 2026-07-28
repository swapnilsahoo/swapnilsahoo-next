import { affiliationMarquee } from "@/features/profile/data/stats";

export function AffiliationMarquee() {
  return (
    <div className="marquee">
      <p className="sr-only">{affiliationMarquee.join(", ")}</p>
      <div className="marquee-track text-ink-500 dark:text-ink-300 font-serif text-xl font-medium italic">
        {[false, true].map((duplicate) => (
          <span key={String(duplicate)} aria-hidden="true" className="flex items-center gap-14">
            {affiliationMarquee.map((item) => (
              <span key={item} className="flex items-center gap-14">
                {item}
                <span>·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
