import { type VariantProps, cva } from "class-variance-authority";
import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

const typographyVariants = cva("text-ink-900 dark:text-ink-50", {
  variants: {
    variant: {
      h1: "text-4xl font-bold tracking-tight sm:text-5xl",
      h2: "text-3xl font-bold tracking-tight sm:text-4xl",
      h3: "text-2xl font-semibold tracking-tight sm:text-3xl",
      h4: "text-xl font-semibold tracking-tight sm:text-2xl",
      body: "text-ink-600 dark:text-ink-300 text-base leading-7",
      lead: "text-ink-600 dark:text-ink-300 text-lg leading-8",
      small: "text-ink-500 dark:text-ink-300 text-sm",
      caption: "text-ink-500 dark:text-ink-300 text-xs",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>;

const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  lead: "p",
  small: "p",
  caption: "span",
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: ElementType;
}

export function Typography({ className, variant = "body", as, ...props }: TypographyProps) {
  const Component = as ?? defaultElement[variant];

  return <Component className={cn(typographyVariants({ variant }), className)} {...props} />;
}
