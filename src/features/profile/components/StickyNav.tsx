import Image from "next/image";
import Link from "next/link";

import {
  aboutNavLink,
  aiDropdown,
  compactMoreDropdown,
  entrepreneurshipDropdown,
  moreDropdown,
  placementsDropdown,
  researchDropdown,
  secondaryNavLinks,
  teachingDropdown,
} from "@/features/profile/data/navigation";
import type { NavLink } from "@/features/profile/types";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NavDropdownMenu } from "./NavDropdownMenu";
import { MobileNav } from "./MobileNav";

const navItemClassName =
  "link-underline inline-flex min-h-11 items-center rounded-lg px-3 py-1.5";

function NavTextLink({ link }: { link: NavLink }) {
  if (!link.href.startsWith("/")) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={navItemClassName}>
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={navItemClassName}>
      {link.label}
    </Link>
  );
}

export function StickyNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-3 z-40 mx-auto max-w-[min(100%,120rem)] px-3 sm:px-6 lg:px-8"
    >
      <div className="nav-glass flex items-center justify-between rounded-2xl px-3 py-1.5 sm:px-4">
        <Link
          href="/#top"
          aria-label="Dr. Swapnil Sahoo — home"
          className="flex min-h-11 items-center gap-2"
        >
          <Image
            src="/icon.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            unoptimized
            className="h-8 w-8 shrink-0"
          />
          <span className="hidden font-serif text-sm font-semibold tracking-tight sm:block">
            Swapnil Sahoo
          </span>
        </Link>

        {/* Compact tier (roughly 1024–1279px): the handful of items most
            visitors actually need, directly in the bar, with everything
            else — Entrepreneurship, Press & Media, and the regular More
            items — folded into one wider "More". The full row below
            takes over at xl and this one disappears. */}
        <div className="hidden items-center gap-1 text-[13px] font-medium whitespace-nowrap lg:flex xl:hidden">
          <NavTextLink link={aboutNavLink} />
          <NavDropdownMenu dropdown={researchDropdown} />
          <NavDropdownMenu dropdown={teachingDropdown} />
          <NavDropdownMenu dropdown={placementsDropdown} />
          <NavDropdownMenu dropdown={aiDropdown} />
          <NavDropdownMenu dropdown={compactMoreDropdown} />
        </div>

        {/* Full row (1280px+): every top-level section on its own. */}
        <div className="hidden items-center gap-1 text-[13px] font-medium whitespace-nowrap xl:flex">
          <NavTextLink link={aboutNavLink} />
          <NavDropdownMenu dropdown={researchDropdown} />
          <NavDropdownMenu dropdown={teachingDropdown} />
          <NavDropdownMenu dropdown={placementsDropdown} />
          <NavDropdownMenu dropdown={entrepreneurshipDropdown} />
          <NavDropdownMenu dropdown={aiDropdown} />
          {secondaryNavLinks.map((link) => (
            <NavTextLink key={link.label} link={link} />
          ))}
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
