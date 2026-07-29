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
import { cn } from "@/lib/cn";

const mobileLinks: Array<NavLink & { group: string }> = [
  ...primaryNavLinks.map((link) => ({ ...link, group: "Profile" })),
  ...secondaryNavLinks.map((link) => ({ ...link, group: "Profile" })),
  ...teachingDropdown.items.map((link) => ({ ...link, group: "Teaching" })),
  ...moreDropdown.items.map((link) => ({ ...link, group: "More" })),
];

function MobileLink({
  link,
  nested = false,
  onNavigate,
}: {
  link: NavLink;
  nested?: boolean;
  onNavigate: () => void;
}) {
  const className = cn(
    "hover:bg-brand-50 dark:hover:bg-brand-900/20 focus-visible:bg-brand-50 dark:focus-visible:bg-brand-900/20 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold",
    nested &&
      "border-ink-200 text-ink-600 dark:border-ink-700 dark:text-ink-300 ml-3 rounded-l-none border-l pl-4 text-[13px] font-medium"
  );

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
    <div ref={wrapperRef} className="relative lg:hidden">
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
            className={`block h-0.5 rounded-full bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 rounded-full bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 rounded-full bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </span>
        Menu
      </button>

      <div
        id="mobile-site-navigation"
        aria-hidden={!open}
        inert={!open}
        className={`nav-glass fixed top-[calc(env(safe-area-inset-top)+5.25rem)] right-3 left-3 max-h-[calc(100dvh-6.25rem-env(safe-area-inset-bottom))] origin-top-right overflow-hidden rounded-3xl p-3 transition sm:absolute sm:top-[calc(100%+0.65rem)] sm:right-0 sm:left-auto sm:w-[min(88vw,22rem)] ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="max-h-[calc(100dvh-7.75rem-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain sm:max-h-[min(72vh,34rem)]"
        >
          {groups.map((group) => (
            <div
              key={group}
              className="border-ink-200 dark:border-ink-700 border-b py-2 last:border-b-0"
            >
              <p className="eyebrow px-3 py-2">{group}</p>
              <ul>
                {mobileLinks
                  .filter((link) => link.group === group)
                  .map((link) => (
                    <li key={`${group}-${link.label}`}>
                      <MobileLink link={link} onNavigate={() => setOpen(false)} />
                      {link.children?.length ? (
                        <ul aria-label={`${link.label} pages`}>
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <MobileLink link={child} nested onNavigate={() => setOpen(false)} />
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
