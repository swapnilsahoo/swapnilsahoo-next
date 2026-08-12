import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Reveal({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const style: CSSProperties | undefined =
    delay !== undefined ? { animationDelay: `${delay}s` } : undefined;

  return (
    <div className={cn("animate-fade-up", className)} style={style}>
      {children}
    </div>
  );
}
