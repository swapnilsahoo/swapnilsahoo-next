import { affiliationMarquee } from "@/features/profile/data/stats";

export function AffiliationMarquee() {
  return (
    <ul className="text-ink-500 dark:text-ink-300 flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg font-medium italic">
      {affiliationMarquee.map((item, index) => (
        <li key={item} className="flex items-center gap-8">
          {item}
          {index < affiliationMarquee.length - 1 && (
            <span className="text-ink-300 dark:text-ink-600" aria-hidden="true">
              ·
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
