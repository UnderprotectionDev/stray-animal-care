# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paws of Hope — a stray animal care website built with Next.js 15 (App Router) and PayloadCMS 3.x (embedded, not headless). PostgreSQL via Neon. Deployed on Vercel. Design: "Mint System" (brutalist/typographic — black/white/mint, 0px radius, 1px grid lines).

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

### Route Groups & i18n

- `src/app/(frontend)/[locale]/` — Public site, locale-prefixed (`tr` default, `en`)
- `src/app/(payload)/` — PayloadCMS admin panel (`/admin`)
- `src/middleware.ts` — next-intl middleware, `localePrefix: 'always'`, excludes /admin, /api, /payload
- `src/i18n/` — config, request, navigation helpers (Link, redirect, usePathname, useRouter)
- Translation files: `src/i18n/tr.json`, `src/i18n/en.json`

### Collections & Globals

Defined in `src/collections/` and registered in `src/payload.config.ts`:
- **İçerik Yönetimi**: Pages, Posts, Categories
- **Hayvan Bakım**: Animals, EmergencyCases, VetRecords
- **Topluluk**: Events, Volunteers
- **Destek & Raporlar**: NeedsList, TransparencyReports
- **Sistem**: Media, Users
- **Globals**: Header (`src/Header/config.ts` — CMS-driven nav, brand, logo, social links), Footer (`src/Footer/config.ts`), SiteSettings (`src/SiteSettings/config.ts` — 4 tabs: Ana Sayfa, Banka Bilgileri, İletişim, İstatistikler), UIStrings (`src/globals/UIStrings/config.ts`)

### Blocks (Page Builder)

Pages use a block-based builder. Block components live in `src/blocks/`:
ArchiveBlock, Banner, CallToAction, Code, Content, MediaBlock, Mission, RelatedPosts, Timeline.
`RenderBlocks.tsx` maps block types to components.

### Plugins

Configured in `src/plugins/index.ts`:
- `@payloadcms/plugin-seo` — SEO fields on pages/posts
- `@payloadcms/plugin-redirects` — Redirect management
- `@payloadcms/plugin-nested-docs` — Nested categories
- `@payloadcms/plugin-search` — Search index on posts + animals
- `@shefing/quickfilter` — Filter buttons on list views (uses `includedCollections`, not `collections`)
- `@payload-enchants/translator` — Translation copy between locales
- `@rumess/payload-audit-log` — Audit logging for animal care collections
- `@payloadcms/plugin-import-export` — CSV/JSON import/export

### Key Directories

- `src/components/` — React components (shared, home, admin, animation, UI)
- `src/components/shared/` — Reusable components (Section, Container, Heading, CopyButton, StatusBadge, ProgressBar, WhatsAppButton, SearchModal, Breadcrumb, MobileDonateBar)
- `src/components/ui/` — shadcn/ui base components
- `src/components/home/` — Homepage section components (11 sections)
- `src/modules/` — Feature modules (animals, blog, donate, emergency, our-work, supplies, transparency)
- `src/fields/` — Reusable field configs (defaultLexical, link, linkGroup)
- `src/hooks/` — Payload lifecycle hooks
- `src/access/` — Access control functions
- `src/search/` — Search field overrides and sync hooks
- `src/heros/` — Hero section components
- `src/utilities/` — Utility functions (shadcn utils alias: `@/utilities/ui`)
- `src/providers/` — React context providers

### Path Aliases

- `@/*` → `src/*`
- `@payload-config` → `src/payload.config.ts`

### Frontend Pages

- Homepage: `src/app/(frontend)/[locale]/page.tsx` — 11-section composition wrapped in `.sys-wrap`
- CMS pages: catch-all `[slug]/page.tsx` fetches from Pages collection
- Posts: `/posts/[slug]` with `.client.tsx` companion for live preview
- Custom routes: `/canlarimiz`, `/acil-vakalar`, `/destek-ol`, `/gonullu-ol`, `/gelecek-vizyonu`, etc.

### Animation Components (GSAP)

GSAP is the primary animation library. Components at `src/components/`:
- `FlowingMenu.tsx` — Desktop fullscreen menu with image reveals
- `StaggeredMenu.tsx` — Mobile fullscreen menu with colored pre-layers
- `BlurText.tsx`, `CountUp.tsx`, `RotatingText.tsx`, `SplitText.tsx`

Header nav cells use GSAP edge-detection (`findClosestEdge4`) in `src/Header/Component.client.tsx`.

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

### Key Gotchas

- Use `caseStatus` (not `status`) on EmergencyCases to avoid conflict with Payload's `_status` enum in Drizzle
- `trash: true` is on EmergencyCases, VetRecords, Events, Volunteers, TransparencyReports (NOT on Animals/Posts due to searchPlugin conflict)
- PayloadCMS localization: `tr` (default), `en` with fallback — configured in `src/payload.config.ts`
- Database uses `push: true` (auto-syncs schema) — no migration workflow

## Style & Tooling

- **Mint System**: 0px border radius, no shadows/gradients, 1px black grid lines, mint accent (#A8D5BA)
- **Tailwind CSS 4** with `@tailwindcss/typography`, configured in `tailwind.config.mjs`
- **CSS utilities**: `.sys-wrap`, `.panel`, `.g-1`–`.g-8` (grid), `.t-mega/.t-h1/.t-h2/.t-body/.t-meta`, `.badge-sys`, `.btn-cta`, `.photo-sys` (grayscale+hover)
- **shadcn/ui** (base-vega style, Lucide icons) — uses @base-ui/react (NOT Radix): no `asChild`, use `render` prop instead
- **ESLint**: `next/core-web-vitals` + `next/typescript` — unused vars prefixed with `_` are allowed
- **Rich text**: Lexical editor (`@payloadcms/richtext-lexical`) with TextColorFeature and TextSizeFeature
- **Fonts**: Inter (heading + body), Space Grotesk (mono/UI) — via `next/font`
- All scripts use `cross-env NODE_OPTIONS=--no-deprecation` to suppress Node deprecation warnings
