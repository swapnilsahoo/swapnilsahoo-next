import { affiliationMarquee } from "@/features/profile/data/stats";

export function AffiliationMarquee() {
  const items = [...affiliationMarquee, ...affiliationMarquee];

  return (
    <div className="marquee">
      <div className="marquee-track text-ink-500 dark:text-ink-300 font-serif text-xl font-medium italic">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-14">
            {item}
            <span>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
