import Link from "next/link";

import {
  moreDropdown,
  primaryNavLinks,
  secondaryNavLinks,
  teachingDropdown,
} from "@/features/profile/data/navigation";
import { NavDropdownMenu } from "./NavDropdownMenu";

export function StickyNav() {
  return (
    <nav className="sticky top-3 z-40 mx-auto max-w-5xl px-4">
      <div className="nav-glass flex items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="flex items-center gap-2">
          <span className="bg-ink-900 dark:bg-brand-500 flex h-7 w-7 items-center justify-center rounded-full font-serif text-sm font-bold text-white">
            S
          </span>
          <span className="hidden font-serif text-sm font-semibold tracking-tight sm:block">
            Swapnil Sahoo
          </span>
        </a>
        <div className="flex items-center gap-1 text-[13px] font-medium">
          {primaryNavLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`link-underline rounded-full px-3 py-1.5 ${
                index === 1 ? "hidden md:inline-block" : ""
              }`}
            >
              {link.label}
            </a>
          ))}
          <NavDropdownMenu dropdown={teachingDropdown} />
          {secondaryNavLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.label}
                href={link.href}
                className={`link-underline rounded-full px-3 py-1.5 ${
                  link.label === "PhD" ? "hidden md:inline-block" : ""
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`link-underline rounded-full px-3 py-1.5 ${
                  link.label === "PhD" ? "hidden md:inline-block" : ""
                }`}
              >
                {link.label}
              </a>
            )
          )}
          <NavDropdownMenu dropdown={moreDropdown} />
        </div>
      </div>
    </nav>
  );
}
