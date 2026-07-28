import { type VariantProps, cva } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-ink-950",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
        secondary:
          "bg-ink-100 text-ink-900 hover:bg-ink-200 focus-visible:ring-ink-400 dark:bg-ink-800 dark:text-ink-50 dark:hover:bg-ink-700",
        outline:
          "border border-ink-300 bg-transparent text-ink-900 hover:bg-ink-50 focus-visible:ring-ink-400 dark:border-ink-600 dark:text-ink-50 dark:hover:bg-ink-800",
        ghost:
          "bg-transparent text-ink-900 hover:bg-ink-100 focus-visible:ring-ink-400 dark:text-ink-50 dark:hover:bg-ink-800",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function buttonClassName(
  props?: VariantProps<typeof buttonVariants>,
  className?: string
): string {
  return cn(buttonVariants(props), className);
}

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClassName({ variant, size }, className)} {...props} />
  );
}
