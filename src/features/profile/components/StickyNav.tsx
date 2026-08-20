import Link from "next/link";

import {
  moreDropdown,
  primaryNavLinks,
  secondaryNavLinks,
  teachingDropdown,
} from "@/features/profile/data/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NavDropdownMenu } from "./NavDropdownMenu";
import { MobileNav } from "./MobileNav";

export function StickyNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-3 z-40 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8"
    >
      <div className="nav-glass flex items-center justify-between rounded-2xl px-3 py-1.5 sm:px-4">
        <Link
          href="/#top"
          aria-label="Dr. Swapnil Sahoo — home"
          className="flex min-h-11 items-center gap-2"
        >
          <span className="bg-ink-900 dark:bg-brand-500 flex h-8 w-8 items-center justify-center rounded-lg font-serif text-sm font-bold text-white">
            S
          </span>
          <span className="hidden font-serif text-sm font-semibold tracking-tight sm:block">
            Swapnil Sahoo
          </span>
        </Link>
        <div className="hidden items-center gap-1 text-[13px] font-medium lg:flex">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="link-underline inline-flex min-h-11 items-center rounded-lg px-3 py-1.5"
            >
              {link.label}
            </Link>
          ))}
          <NavDropdownMenu dropdown={teachingDropdown} />
          {secondaryNavLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className="link-underline inline-flex min-h-11 items-center rounded-lg px-3 py-1.5"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex min-h-11 items-center rounded-lg px-3 py-1.5"
              >
                {link.label}
              </a>
            )
          )}
          <NavDropdownMenu dropdown={moreDropdown} />
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
