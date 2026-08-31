import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[min(100%,120rem)] px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}
