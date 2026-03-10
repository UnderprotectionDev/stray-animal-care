# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paws of Hope — a stray animal care website built with Next.js 15 (App Router) and PayloadCMS 3.x (embedded, not headless). PostgreSQL via Neon. Deployed on Vercel.

The project is based on the official Payload Website Template but is being evolved into a custom animal care platform. See `docs/` for the full PRD and milestone plans describing the target architecture.

## Commands

```bash
pnpm install                # Install dependencies
pnpm dev                    # Start dev server (localhost:3000)
pnpm build                  # Production build
pnpm start                  # Start production server
pnpm lint                   # ESLint (next lint)
pnpm lint:fix               # ESLint with auto-fix
pnpm run generate:types     # Generate PayloadCMS TypeScript types
pnpm run generate:importmap # Regenerate Payload admin import map
pnpm run test:int           # Run integration tests (Vitest)
pnpm run test:e2e           # Run E2E tests (Playwright)
pnpm test                   # Run both int + e2e
tsc --noEmit                # Type-check without emitting
```

### Running a Single Test

```bash
# Integration (Vitest) — single file
pnpm vitest run --config ./vitest.config.mts tests/int/path/to/file.int.spec.ts

# E2E (Playwright) — single file
pnpm playwright test tests/e2e/path/to/file.spec.ts
```

### Environment

Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`. Tests use `test.env` (loaded via `vitest.setup.ts`).

## Architecture

### Route Groups

- `src/app/(frontend)/` — Public site (pages, posts, search, sitemaps)
- `src/app/(payload)/` — PayloadCMS admin panel (`/admin`)

### Collections & Globals

Defined in `src/collections/` and registered in `src/payload.config.ts`:
- **Collections**: Pages, Posts, Media, Categories, Users
- **Globals**: Header, Footer (configs in `src/Header/config.ts`, `src/Footer/config.ts`)

### Blocks (Page Builder)

Pages use a block-based builder. Block components live in `src/blocks/`:
ArchiveBlock, Banner, CallToAction, Code, Content, Form, MediaBlock, RelatedPosts.
`RenderBlocks.tsx` maps block types to components.

### Plugins

Configured in `src/plugins/index.ts`:
- `@payloadcms/plugin-seo` — SEO fields on pages/posts
- `@payloadcms/plugin-redirects` — Redirect management
- `@payloadcms/plugin-nested-docs` — Nested categories
- `@payloadcms/plugin-form-builder` — Dynamic forms
- `@payloadcms/plugin-search` — Search index on posts

### Key Directories

- `src/fields/` — Reusable field configs (defaultLexical, link, linkGroup)
- `src/hooks/` — Payload lifecycle hooks
- `src/access/` — Access control functions
- `src/search/` — Search field overrides and sync hooks
- `src/heros/` — Hero section components
- `src/components/` — Shared React components (including Payload admin customizations)
- `src/utilities/` — Utility functions (shadcn utils alias: `@/utilities/ui`)
- `src/providers/` — React context providers

### Path Aliases

- `@/*` → `src/*`
- `@payload-config` → `src/payload.config.ts`

### Frontend Pages

Pages are rendered via a catch-all `[slug]/page.tsx` that fetches from the Pages collection. Posts have dedicated routes at `/posts/[slug]`. Each page has a `.client.tsx` companion for live preview support.

### Testing

- **Integration tests**: `tests/int/**/*.int.spec.ts` — Vitest with jsdom, tsconfig paths resolved
- **E2E tests**: `tests/e2e/` — Playwright (Chromium), auto-starts dev server
- **Test helpers**: `tests/helpers/`

## PayloadCMS Patterns

### After Schema Changes

Always run both commands after modifying collections, globals, or fields:
```bash
pnpm run generate:types
pnpm run generate:importmap
```

### Security Rules

1. **Local API bypasses access control by default.** When passing `user`, always set `overrideAccess: false`
2. **Always pass `req` to nested operations in hooks** for transaction safety
3. **Use `context` flags to prevent infinite hook loops** when hooks trigger updates on the same collection

### Custom Components

Payload admin components use file paths (not imports). Paths are relative to `src/` (the `importMap.baseDir`). Named exports use `#ExportName` suffix. All components are Server Components by default — add `'use client'` only when needed.

## Style & Tooling

- **Tailwind CSS 4** with `@tailwindcss/typography`, configured in `tailwind.config.mjs`
- **shadcn/ui** (base-vega style, Lucide icons) — components alias to `@/components`, utils to `@/utilities/ui`
- **ESLint**: `next/core-web-vitals` + `next/typescript` — unused vars prefixed with `_` are allowed
- **Rich text**: Lexical editor (`@payloadcms/richtext-lexical`)
- All scripts use `cross-env NODE_OPTIONS=--no-deprecation` to suppress Node deprecation warnings
