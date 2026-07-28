"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  moreDropdown,
  primaryNavLinks,
  secondaryNavLinks,
  teachingDropdown,
} from "@/features/profile/data/navigation";
import type { NavLink } from "@/features/profile/types";

const mobileLinks: Array<NavLink & { group: string }> = [
  ...primaryNavLinks.map((link) => ({ ...link, group: "Profile" })),
  ...secondaryNavLinks.map((link) => ({ ...link, group: "Profile" })),
  ...teachingDropdown.items.map((link) => ({ ...link, group: "Teaching" })),
  ...moreDropdown.items.map((link) => ({ ...link, group: "More" })),
];

function MobileLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  const className =
    "hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-visible:bg-brand-50 dark:focus-visible:bg-brand-900/20 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold";

  if (link.external || !link.href.startsWith("/")) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {link.label}
        <span className="text-ink-400 ml-auto font-mono text-[10px]" aria-hidden="true">
          ↗
        </span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={link.href} className={className} onClick={onNavigate}>
      {link.label}
    </Link>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const groups = ["Profile", "Teaching", "More"] as const;

  return (
    <div ref={wrapperRef} className="relative sm:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-site-navigation"
        aria-label={open ? "Close site menu" : "Open site menu"}
        onClick={() => setOpen((value) => !value)}
        className="hover:bg-ink-100 dark:hover:bg-ink-800 flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold"
      >
        <span aria-hidden="true" className="grid w-4 gap-1">
          <span
            className={`bg-current block h-0.5 rounded-full transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`bg-current block h-0.5 rounded-full transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`bg-current block h-0.5 rounded-full transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
        Menu
      </button>

      <div
        id="mobile-site-navigation"
        aria-hidden={!open}
        inert={!open}
        className={`nav-glass absolute top-[calc(100%+0.65rem)] right-0 w-[min(88vw,22rem)] origin-top-right rounded-3xl p-3 transition ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="max-h-[min(72vh,34rem)] overflow-y-auto">
          {groups.map((group) => (
            <div
              key={group}
              className="border-ink-200 dark:border-ink-700 border-b py-2 last:border-b-0"
            >
              <p className="eyebrow px-3 py-2">{group}</p>
              {mobileLinks
                .filter((link) => link.group === group)
                .map((link) => (
                  <MobileLink
                    key={`${group}-${link.label}`}
                    link={link}
                    onNavigate={() => setOpen(false)}
                  />
                ))}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
