"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import type { NavDropdown, NavLink } from "@/features/profile/types";

const CLOSE_DELAY_MS = 500;

function DropdownLink({
  item,
  nested = false,
  onNavigate,
}: {
  item: NavLink;
  nested?: boolean;
  onNavigate: () => void;
}) {
  const className = nested ? "nav-child" : undefined;

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function NavDropdownMenu({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
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

  const closeMenu = () => {
    clearCloseTimeout();
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimeout();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();
          ref.current?.querySelector("button")?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        className="link-underline inline-flex min-h-10 items-center gap-1 rounded-full px-3 py-1.5"
        onClick={() => {
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
      </button>
      <div
        id={menuId}
        aria-hidden={!open}
        inert={!open}
        className="nav-glass dropdown-content absolute top-[calc(100%+10px)] left-1/2 z-50 min-w-[220px] rounded-[14px] p-2 opacity-0 transition-[opacity,transform] duration-200"
        style={{
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(4px)",
        }}
      >
        <ul>
          {dropdown.items.map((item) => (
            <li key={item.label}>
              <DropdownLink item={item} onNavigate={closeMenu} />
              {item.children?.length ? (
                <ul aria-label={`${item.label} pages`}>
                  {item.children.map((child) => (
                    <li key={child.label}>
                      <DropdownLink item={child} nested onNavigate={closeMenu} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
