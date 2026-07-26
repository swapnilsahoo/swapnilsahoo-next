"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { NavDropdown } from "@/features/profile/types";

const CLOSE_DELAY_MS = 500;

export function NavDropdownMenu({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeout.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };

  useEffect(() => clearCloseTimeout, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clearCloseTimeout();
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimeout();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <a
        href={dropdown.href}
        className="link-underline inline-flex items-center gap-1 rounded-full px-3 py-1.5"
        onClick={(event) => {
          event.preventDefault();
          clearCloseTimeout();
          setOpen((value) => !value);
        }}
      >
        {dropdown.label}
        <svg
          className="h-3 w-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
      <div
        className="nav-glass dropdown-content absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] rounded-[14px] p-2 opacity-0 transition-[opacity,transform] duration-200"
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(4px)",
        }}
      >
        {dropdown.items.map((item) =>
          item.external ? (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
}
