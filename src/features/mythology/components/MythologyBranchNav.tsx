import Link from "next/link";

const branches = [
  { id: "overview", label: "Library overview", href: "/mythology", number: "00" },
  {
    id: "mahabharata",
    label: "Mahābhārata",
    href: "/mythology#mahabharata-original",
    number: "01",
  },
  {
    id: "ramayana",
    label: "Vālmīki Rāmāyaṇa",
    href: "/mythology#ramayana-original",
    number: "02",
  },
  {
    id: "immortals",
    label: "Immortals atlas",
    href: "/mythology/immortals",
    number: "03",
  },
] as const;

export function MythologyBranchNav({
  current,
}: {
  current?: (typeof branches)[number]["id"];
}) {
  return (
    <nav aria-label="Mythology branches" className="glass-card p-3 sm:p-4">
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {branches.map((branch) => {
          const isCurrent = current === branch.id;

          return (
            <li key={branch.id}>
              <Link
                href={branch.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`flex min-h-16 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isCurrent
                    ? "bg-ink-900 text-white dark:bg-brand-600"
                    : "hover:bg-brand-50 dark:hover:bg-brand-900/20"
                }`}
              >
                <span
                  className={`font-mono text-xs ${isCurrent ? "text-white/60" : "text-ink-400"}`}
                  aria-hidden="true"
                >
                  {branch.number}
                </span>
                {branch.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
