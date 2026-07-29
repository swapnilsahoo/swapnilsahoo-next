"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-11 w-[68px] rounded-full border p-0 backdrop-blur-[16px]"
      style={{
        borderColor: "var(--glass-border)",
        background: isDark ? "rgba(8,15,30,0.72)" : "rgba(255,255,255,0.58)",
        boxShadow: "0 12px 30px -18px rgba(15,23,42,0.52), 0 1px 0 var(--glass-highlight) inset",
      }}
    >
      <span
        className="absolute top-[8px] left-[5px] h-[26px] w-[26px] rounded-full bg-white shadow-[0_6px_16px_-8px_rgba(15,23,42,0.8)] transition-transform duration-250 ease-out"
        style={{
          transform: isDark ? "translateX(32px)" : "translateX(0)",
          background: isDark ? "#93C5FD" : "#fff",
        }}
      />
      <svg
        className="absolute top-1/2 right-[10px] h-3.5 w-3.5 -translate-y-1/2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        className="absolute top-1/2 left-[10px] h-3.5 w-3.5 -translate-y-1/2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
