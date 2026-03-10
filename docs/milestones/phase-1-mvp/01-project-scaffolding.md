# M1: Project Scaffolding & Infrastructure

## Description

Set up the foundational project structure with Next.js 15, PayloadCMS 3.x, PostgreSQL, Tailwind CSS 4, Biome, and pnpm. This milestone produces a working dev environment with all tooling configured and the modular directory structure in place.

## Dependencies

None — this is the starting milestone.

## Scope

- Next.js 15 App Router project initialization with pnpm
- PayloadCMS 3.x embedded in Next.js (not separate server)
- PostgreSQL connection via Neon (serverless)
- Tailwind CSS 4 configuration
- Biome configuration (linting + formatting)
- Modular directory structure (`src/modules/`, `src/app/`, etc.)
- Environment variables setup
- TypeScript strict mode configuration

## Tasks

### T1.1: Initialize Next.js 15 project with pnpm

**What:** Create the Next.js 15 project using `pnpm create next-app` with App Router, TypeScript, and Tailwind CSS enabled.

**Files:**
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `src/app/layout.tsx`
- `src/app/page.tsx`

**Acceptance Criteria:**
- [x] `pnpm dev` starts the development server successfully
- [x] TypeScript strict mode is enabled
- [x] App Router is configured (not Pages Router)

---

### T1.2: Install and configure PayloadCMS 3.x

**What:** Add PayloadCMS 3.x as an embedded CMS within the Next.js app. Set up the admin panel routes and Payload config.

**Files:**
- `src/payload.config.ts`
- `src/app/(payload)/admin/[[...segments]]/page.tsx`
- `src/app/(payload)/admin/[[...segments]]/importMap.js`
- `src/app/(payload)/api/[...slug]/route.ts`
- `src/app/(payload)/layout.tsx`

**Acceptance Criteria:**
- [x] PayloadCMS admin panel is accessible at `/admin`
- [x] Payload API routes respond at `/api`
- [x] `payload.config.ts` has basic configuration (empty collections array)

---

### T1.3: Configure PostgreSQL (Neon) connection

**What:** Set up the database adapter for PayloadCMS using `@payloadcms/db-postgres` with Neon serverless PostgreSQL.

**Files:**
- `.env.local` (DATABASE_URI, PAYLOAD_SECRET)
- `src/payload.config.ts` (db adapter config)

**Acceptance Criteria:**
- [x] PayloadCMS connects to Neon PostgreSQL on startup
- [x] Database tables are auto-created by Payload migrations
- [x] `.env.local` is in `.gitignore`

---

### T1.4: Configure Tailwind CSS 4

**What:** Set up Tailwind CSS 4 with the project's design tokens (colors, fonts, spacing). Create the global CSS file.

**Files:**
- `src/app/globals.css`
- `tailwind.config.ts` (if needed for v4)

**Acceptance Criteria:**
- [x] Tailwind utility classes work in components
- [x] CSS file imports Tailwind layers (`@tailwind base`, `@tailwind components`, `@tailwind utilities` or v4 equivalent)

---

### T1.5: Configure Biome (linting + formatting)

**What:** Replace ESLint + Prettier with Biome as the single linting and formatting tool. Add scripts to `package.json`.

**Files:**
- `biome.json`
- `package.json` (scripts: `lint`, `format`, `check`)

**Acceptance Criteria:**
- [x] `pnpm run lint` runs Biome linting
- [x] `pnpm run format` runs Biome formatting
- [x] `pnpm run check` runs both lint + format check
- [x] No ESLint or Prettier config files exist

---

### T1.6: Create modular directory structure

**What:** Create the full directory scaffold with all module folders, shared directories, and placeholder `index.ts` files.

**Files:**
- `src/modules/home/index.ts`
- `src/modules/story/index.ts`
- `src/modules/our-work/index.ts`
- `src/modules/animals/index.ts`
- `src/modules/donate/index.ts`
- `src/modules/supplies/index.ts`
- `src/modules/emergency/index.ts`
- `src/modules/transparency/index.ts`
- `src/modules/blog/index.ts`
- `src/modules/volunteer/index.ts`
- `src/modules/vision/index.ts`
- `src/modules/contact/index.ts`
- `src/modules/layout/index.ts`
- `src/modules/instagram/index.ts`
- `src/modules/search/index.ts`
- `src/modules/shared/index.ts`
- `src/modules/media/index.ts`
- `src/modules/settings/index.ts`
- `src/components/ui/` (empty, for shadcn/ui)
- `src/lib/utils.ts`
- `src/lib/payload.ts`
- `src/lib/format.ts`
- `src/types/common.ts`
- `src/types/payload-types.ts`

**Acceptance Criteria:**
- [x] All 18 module directories exist with `index.ts` barrel exports
- [x] `src/components/ui/` directory exists
- [x] `src/lib/` and `src/types/` directories exist with placeholder files

---

### T1.7: Set up App Router route groups

**What:** Create the `(frontend)` and `(payload)` route groups with their respective layouts. Set up the `[locale]` dynamic segment for i18n.

**Files:**
- `src/app/(frontend)/[locale]/layout.tsx`
- `src/app/(frontend)/[locale]/page.tsx`
- `src/app/layout.tsx` (root layout)
- `src/app/error.tsx`
- `src/app/global-error.tsx`

**Acceptance Criteria:**
- [x] `(frontend)` route group serves the public site
- [x] `(payload)` route group serves the admin panel
- [x] `[locale]` dynamic segment exists for i18n routing
- [x] Error boundary pages render correctly

---

### T1.8: Configure Vercel deployment

**What:** Add Vercel-specific configuration and ensure the project builds successfully for deployment.

**Files:**
- `vercel.json` (if needed)
- `package.json` (build script)

**Acceptance Criteria:**
- [x] `pnpm run build` completes without errors
- [x] Project is deployable to Vercel

---

## Milestone Acceptance Criteria

- [x] `pnpm dev` starts the app with no errors
- [x] PayloadCMS admin is accessible at `/admin`
- [x] Frontend renders at `/tr` (or default locale)
- [x] All 18 module directories exist
- [x] Biome linting passes with no errors
- [x] `pnpm run build` succeeds
- [x] `.env.local` is gitignored and documented in `.env.example`

## Verification

1. Run `pnpm dev` and verify the app starts
2. Navigate to `/admin` and confirm PayloadCMS loads
3. Navigate to `/` and confirm the frontend renders
4. Run `pnpm run lint` and confirm no errors
5. Run `pnpm run build` and confirm successful build
6. Verify all directories exist with `ls -R src/modules/`
