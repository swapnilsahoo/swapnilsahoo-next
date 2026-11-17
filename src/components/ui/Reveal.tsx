"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";

const VARIANT_CLASS = {
  /** Text and mixed content: a gentle rise + fade. */
  fade: "animate-fade-up",
  /** Photographs: a slow focus-pull — soft blur and a hint of scale settling into place,
   * so the image reads as though it is developing/merging into view rather than just appearing. */
  image: "animate-image-reveal",
} as const;

type RevealVariant = keyof typeof VARIANT_CLASS;

export function Reveal({
  children,
  className,
  delay,
  variant = "fade",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Keep the first viewport readable before hydration; animate only offscreen content.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.remove("reveal-pending");
          node.classList.add(VARIANT_CLASS[variant]);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      node.classList.remove("reveal-pending", VARIANT_CLASS[variant]);
    };
  }, [variant, className]);

  const style: CSSProperties | undefined =
    delay !== undefined ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
