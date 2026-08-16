"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined =
    delay !== undefined ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div
      ref={ref}
      className={cn(visible ? VARIANT_CLASS[variant] : "reveal-pending", className)}
      style={style}
    >
      {children}
    </div>
  );
}
