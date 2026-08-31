"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import type { NavDropdown, NavLink } from "@/features/profile/types";

const CLOSE_DELAY_MS = 240;

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

  // These links sit inside a hover-triggered dropdown that stays mounted
  // (just visually hidden) at all times, so Next.js's default
  // prefetch-on-mount would eagerly prefetch every item in every dropdown
  // across the whole site as soon as the page loads. We disable that here
  // and prefetch on hover-open instead (see NavDropdownMenu below), which
  // still makes the actually-clicked link feel instant without the
  // background cost of prefetching links no one is about to click.
  return (
    <Link href={item.href} prefetch={false} className={className} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

export function NavDropdownMenu({ dropdown }: { dropdown: NavDropdown }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpened = useRef(false);
  const alignRight = dropdown.label === "More";
  const menuTransform = alignRight
    ? `translateY(${open ? "0" : "4px"})`
    : `translateX(-50%) translateY(${open ? "0" : "4px"})`;
  const router = useRouter();
  const prefetched = useRef(false);

  // Prefetch this dropdown's own links only once it's actually opened,
  // instead of every dropdown on the page eagerly prefetching on mount.
  const prefetchItems = () => {
    if (prefetched.current) return;
    prefetched.current = true;
    for (const item of dropdown.items) {
      if (!item.external) router.prefetch(item.href);
      for (const child of item.children ?? []) {
        if (!child.external) router.prefetch(child.href);
      }
    }
  };

  const clearCloseTimeout = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimeout();
    closeTimeout.current = setTimeout(() => {
      closeTimeout.current = null;
      if (!ref.current?.contains(document.activeElement)) {
        hoverOpened.current = false;
        setOpen(false);
      }
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => clearCloseTimeout, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        clearCloseTimeout();
        hoverOpened.current = false;
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
        closeTimeout.current = null;
      }
      hoverOpened.current = false;
      setOpen(false);
      ref.current?.querySelector("button")?.focus();
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const closeMenu = () => {
    clearCloseTimeout();
    hoverOpened.current = false;
    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        clearCloseTimeout();
        if (!open) hoverOpened.current = true;
        setOpen(true);
        prefetchItems();
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
      }}
    >
      <span className="link-underline inline-flex min-h-11 items-center rounded-lg pl-3 text-[13px] font-medium">
        <Link href={dropdown.href} className="py-1.5" onClick={closeMenu}>
          {dropdown.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${dropdown.label} submenu`}
          className="flex min-h-11 items-center rounded-lg py-1.5 pr-3 pl-1.5"
          onClick={(event) => {
            clearCloseTimeout();
            prefetchItems();
            if (event.detail === 0) {
              hoverOpened.current = false;
              setOpen((value) => !value);
            } else if (hoverOpened.current) {
              hoverOpened.current = false;
              setOpen(true);
            } else {
              setOpen((value) => !value);
            }
          }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </span>
      {open ? (
        <span
          aria-hidden="true"
          data-dropdown-hover-bridge={dropdown.label}
          className={`pointer-events-auto absolute top-full z-50 block h-[14px] ${
            alignRight ? "right-0" : "left-1/2 -translate-x-1/2"
          }`}
          style={{ width: alignRight ? 300 : 240 }}
        />
      ) : null}
      <div
        id={menuId}
        aria-hidden={!open}
        inert={!open}
        className={`nav-glass dropdown-content absolute top-[calc(100%+10px)] z-50 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-xl p-2 opacity-0 transition-[opacity,transform] duration-150 ${
          alignRight ? "right-0" : "left-1/2"
        }`}
        style={{
          minWidth: alignRight ? 300 : 240,
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: menuTransform,
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
