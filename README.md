# swapnilsahoo-next

Modern rebuild of the swapnilsahoo.com WordPress site — Next.js (App Router), TypeScript, and Tailwind CSS. WordPress is reference-only; nothing here mirrors its architecture.

## Stack

- **Framework:** Next.js 16 (App Router, Server Components by default)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first theme in `src/app/globals.css`)
- **Package manager:** pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/            App Router routes, layouts, error/loading/not-found boundaries
  components/
    ui/           Reusable primitives (Button, Container, Section, Typography, ...)
    layout/       Site-wide chrome (Navbar, Footer) — added as pages are migrated
  features/       Feature-scoped components/logic, grouped by domain
  hooks/          Shared React hooks
  lib/            Framework-agnostic utilities (e.g. cn())
  types/          Shared TypeScript types
  constants/      Shared constant values
```

Content is currently hardcoded as typed constants/data per feature rather than pulled from a CMS. This keeps the initial migration fast while leaving a clean seam to swap in a headless CMS later if needed.

## Scripts

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm start    # run production build
pnpm lint     # eslint
```

## Conventions

- Server Components by default; `"use client"` only where interactivity requires it.
- Variant-driven UI primitives use `class-variance-authority`; class composition uses `cn()` (`clsx` + `tailwind-merge`).
- Design tokens (colors, type scale, spacing) are extracted into the Tailwind theme as each page is migrated from the legacy WordPress CSS.
