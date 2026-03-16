# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paws of Hope — a stray animal care website built with Next.js 15 (App Router) and PayloadCMS 3.x (embedded, not headless). PostgreSQL via Neon. Deployed on Vercel with Blob storage for media. Design: "Vivid Brutalist" (warm playful brutalist — cream/black/11-color palette, 0px radius, 1.5px grid lines).

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
pnpm run seed               # Seed database (destructive — drops existing data)
pnpm run seed:cms           # Seed CMS content only
```

### Running a Single Test

```bash
# Integration (Vitest) — single file
pnpm vitest run --config ./vitest.config.mts tests/int/path/to/file.int.spec.ts

# E2E (Playwright) — single file
pnpm playwright test tests/e2e/path/to/file.spec.ts
```

### Environment

Copy `.env.example` to `.env` and fill in `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`. Media uploads require `BLOB_READ_WRITE_TOKEN` (Vercel Blob). Tests use `test.env` (loaded via `vitest.setup.ts`).

## Architecture

### Route Groups & i18n

- `src/app/(frontend)/[locale]/` — Public site, locale-prefixed (`tr` default, `en`)
- `src/app/(payload)/` — PayloadCMS admin panel (`/admin`) with 3 custom views: `/hayvan-takip`, `/vaka-takip`, `/gonullu-yonetim`
- `src/middleware.ts` — next-intl middleware, `localePrefix: 'always'`, excludes /admin, /api, /payload
- `src/i18n/` — config, request, navigation helpers (Link, redirect, usePathname, useRouter)
- All user-facing text lives in CMS globals (UIStrings, SiteSettings) — next-intl handles routing only

### Collections & Globals

Defined in `src/collections/` and registered in `src/payload.config.ts`:
- **İçerik Yönetimi**: Pages, Posts, Categories
- **Hayvan Bakım**: Animals, EmergencyCases, VetRecords
- **Topluluk**: Events, Volunteers
- **Destek & Raporlar**: NeedsList, TransparencyReports
- **Sistem**: Media, Users
- **Globals** (3 only — no Footer global):
  - Header (`src/Header/config.ts` — CMS-driven nav, brand, logo, social links)
  - SiteSettings (`src/SiteSettings/config.ts` — 4 tabs: Ana Sayfa, Banka Bilgileri, Sosyal Medya, İstatistikler)
  - UIStrings (`src/globals/UIStrings/config.ts` — 12 tabs, all localized text for every frontend page)

### Homepage Block System

The homepage uses a CMS-driven block builder configured in `SiteSettings.homepageBlocks`. 10 block types defined in `src/blocks/homepage/`:

`homeHero`, `homeStats`, `homeStory`, `homeOurWork`, `homeFeaturedAnimals`, `homeActiveEmergencies`, `homeSupportCards`, `homeNeedsList`, `homeRecentPosts`, `homeTransparencyBanner`

`RenderHomepageBlocks.tsx` maps blocks to components with special behavior:
- Each block has an `enabled` flag — disabled blocks render nothing
- `homeRecentPosts` + `homeTransparencyBanner` are combined into a single `PostsAndTransparency` component when both enabled
- `SectionDividerBand` components are injected programmatically after `homeStory` and `homeSupportCards` (not CMS blocks)
- Data is fetched optimistically in `page.tsx` — only collections needed by active blocks are queried

### Page Builder Blocks

General pages use a separate block-based builder. Block components in `src/blocks/`:
ArchiveBlock, Banner, CallToAction, Code, Content, MediaBlock, Mission, RelatedPosts, Timeline.
`RenderBlocks.tsx` maps block types to components.

### Feature Modules

`src/modules/` organizes frontend features by domain. Each module follows: `components/` + `lib/` (queries) + `index.ts` re-export.

Modules: animals, blog, donate, emergency, our-work, supplies, transparency

### Plugins

Configured in `src/plugins/index.ts`:
- `@payloadcms/plugin-seo` — SEO fields on pages/posts
- `@payloadcms/plugin-redirects` — Redirect management
- `@payloadcms/plugin-nested-docs` — Nested categories
- `@payloadcms/plugin-search` — Search index on posts + animals
- `@payloadcms/storage-vercel-blob` — Media storage on Vercel Blob
- `@shefing/quickfilter` — Filter buttons on list views (uses `includedCollections`, not `collections`)
- `@payload-enchants/translator` — Translation copy between locales
- `@rumess/payload-audit-log` — Audit logging for animal care collections
- `@payloadcms/plugin-import-export` — CSV/JSON import/export

### Key Directories

- `src/components/home/` — Homepage section components (rendered by `RenderHomepageBlocks.tsx`)
- `src/components/shared/` — Reusable components (Section, Container, Heading, CopyButton, StatusBadge, ProgressBar, WhatsAppButton, SearchModal, Breadcrumb, MobileDonateBar)
- `src/components/ui/` — shadcn/ui base components
- `src/modules/` — Feature modules (see above)
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

- Homepage: `src/app/(frontend)/[locale]/page.tsx` — block-driven composition wrapped in `.sys-wrap`
- CMS pages: catch-all `[slug]/page.tsx` fetches from Pages collection
- Posts: `/posts/[slug]` with `.client.tsx` companion for live preview
- Custom routes: `/canlarimiz`, `/acil-vakalar`, `/destek-ol`, `/gonullu-ol`, `/gelecek-vizyonu`, etc.

### Animation Libraries

- **GSAP** — Primary animation library. Components: `FlowingMenu.tsx` (desktop menu), `StaggeredMenu.tsx` (mobile menu), `BlurText.tsx`, `CountUp.tsx`, `RotatingText.tsx`, `SplitText.tsx`, `ScrollVelocity.tsx`. Header nav uses GSAP edge-detection (`findClosestEdge4`).
- **Motion** (Framer Motion v12) — Used in some components alongside GSAP
- **OGL** — WebGL library for `CircularGallery.tsx` (3D gallery variant)

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
2. **Always pass `req` to nested operations in hooks** for transaction safety across DB adapters
3. **Use `context` flags to prevent infinite hook loops** when hooks trigger updates on the same collection (e.g., `if (context.skipHooks) return`)

### Custom Admin Components

Payload admin components use file paths (not imports). Paths are relative to `src/` (the `importMap.baseDir`). Named exports use `#ExportName` suffix. All components are Server Components by default — add `'use client'` only when needed. Separate `serverProps` (non-serializable) from `clientProps` (serializable).

### Access Control

- **Collection-level** access can return `true/false` OR a query constraint object (for row-level security)
- **Field-level** access returns **boolean only** — no query constraints allowed
- Custom endpoints are **NOT authenticated by default** — always check `req.user`

### Hook Context & Coordination

- Use `req.context` to cache expensive data and share between hooks in the same request
- Use context flags (`skipHooks`, `disableRevalidate`) to prevent infinite loops
- Hook lifecycle: `beforeValidate` (formatting) → `beforeChange` (business logic) → `afterChange` (side effects) → `afterRead` (computed fields)

### Key Gotchas

- Use `caseStatus` (not `status`) on EmergencyCases to avoid conflict with Payload's `_status` enum in Drizzle
- `trash: true` is on EmergencyCases, VetRecords, Events, Volunteers, TransparencyReports (NOT on Animals/Posts due to searchPlugin conflict)
- PayloadCMS localization: `tr` (default), `en` with fallback — configured in `src/payload.config.ts`
- Database uses `push: true` (auto-syncs schema) — no migration workflow

## Style & Tooling

- **Vivid Brutalist**: 0px border radius, no shadows/gradients, 1.5px black grid lines, cream background (#F4F1EA), 11-color palette
- **Palette**: red #EF303B, blue #4A46E4, yellow #F5B62A, orange #F26E41, lilac #9E74F9, teal #2D936C, coral #FF6B6B, forest #0F5257, black #111111, dark-cream #C9C4B8, warm-gray #A39E93
- **Semantic tokens**: `--cta` (red), `--stats` (blue), `--emergency` (yellow), `--adoption` (orange), `--trust` (lilac), `--health` (teal), `--warm` (coral)
- **Tailwind CSS 4** with `@tailwindcss/typography`, configured in `tailwind.config.mjs`. Utility classes: `bg-cta`, `bg-stats`, `bg-emergency`, `bg-adoption`, `bg-trust`, `bg-health`, `bg-warm`, `bg-palette-*`
- **CSS utilities**: `.sys-wrap`, `.panel`, `.g-1`–`.g-6`/`.g-8` (grid), `.t-mega/.t-h1/.t-h2/.t-body/.t-meta/.t-outline/.t-comment`, `.badge-sys` (`.cta`, `.mint`, `.critical`), `.btn-cta`, `.photo-sys`, `.pill-card`
- **Fonts**: Archivo Black (heading, `--font-heading`), Space Mono (body/mono, `--font-mono`) — via `next/font`
- **shadcn/ui** (base-vega style, Lucide icons) — uses @base-ui/react (NOT Radix for most components): no `asChild`, use `render` prop instead
- **URL state**: `nuqs` for URL query parameter management (NuqsAdapter in layout)
- **ESLint**: `next/core-web-vitals` + `next/typescript` — unused vars prefixed with `_` are allowed
- **Rich text**: Lexical editor (`@payloadcms/richtext-lexical`) with TextColorFeature and TextSizeFeature
- All scripts use `cross-env NODE_OPTIONS=--no-deprecation` to suppress Node deprecation warnings
