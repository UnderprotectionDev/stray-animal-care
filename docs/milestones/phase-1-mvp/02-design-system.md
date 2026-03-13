# M2: Design System & shadcn/ui

> **Note:** Originally implemented as "Warm & Organic" style, then redesigned to **Mint System** (brutalist/typographic) in March 2026. Acceptance criteria below reflect the current Mint System.

## Description

Establish the visual design system with Mint System style tokens, custom fonts, and shadcn/ui component library. This milestone creates the reusable design foundation that all pages will build upon.

## Dependencies

- **M1** — Project Scaffolding & Infrastructure

## Scope

- Color tokens (oklch: black foreground, white background, mint accent)
- Typography (Inter for headings + body, Space Grotesk for mono/UI)
- shadcn/ui installation and base component setup
- Shared UI components (buttons, cards, badges, etc.)
- CSS custom properties / Tailwind theme extension
- No dark mode (intentionally excluded in Mint System)

## Tasks

### T2.1: Configure custom fonts

**What:** Set up Inter (headings + body) and Space Grotesk (mono/UI) using `next/font` for self-hosted optimization.

**Files:**
- `src/app/layout.tsx` (font imports)
- `src/app/(frontend)/globals.css` (font-family CSS variables: `--font-heading`, `--font-body`, `--font-mono`)
- `public/fonts/` (if local font files needed)

**Acceptance Criteria:**
- [x] Inter renders for headings (weight 900) and body text (weights 400, 500)
- [x] Space Grotesk renders for mono/UI elements (weights 400, 700)
- [x] Fonts load without layout shift (CLS < 0.1)
- [x] `next/font` handles optimization automatically
- [x] All headings are uppercase via typography utility classes

---

### T2.2: Define color tokens and Tailwind theme

**What:** Define the Mint System color palette as oklch CSS custom properties: black foreground, white background, mint accent (#A8D5BA), red destructive.

**Files:**
- `src/app/(frontend)/globals.css` (CSS custom properties — `:root` block)
- `tailwind.config.mjs` (theme extension, if needed for v4)

**Acceptance Criteria:**
- [x] oklch tokens defined: `--background`, `--foreground`, `--accent`, `--destructive`, `--muted`, `--border`
- [x] `--accent` maps to mint (`oklch(0.82 0.08 155)`)
- [x] `--border` and `--foreground` are black (`oklch(0 0 0)`)
- [x] `--radius: 0px` — zero border radius everywhere
- [x] Semantic colors (success, warning, error) are defined
- [x] Colors meet WCAG 2.1 AA contrast ratios for text

---

### T2.3: Install and configure shadcn/ui

**What:** Initialize shadcn/ui with the project's custom theme. Install base components needed across the site.

**Files:**
- `components.json` (shadcn/ui config)
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/toast.tsx`
- `src/components/ui/skeleton.tsx`
- `src/lib/utils.ts` (cn helper)

**Acceptance Criteria:**
- [x] `components.json` is configured with project's theme
- [x] All listed base components are installed and importable
- [x] `cn()` utility function works for className merging
- [x] Components render with the custom color tokens

---

### T2.4: Create shared design components

**What:** Build project-specific shared components that extend shadcn/ui for consistent use across the site.

**Files:**
- `src/components/shared/Section.tsx` (page section wrapper with consistent padding/spacing)
- `src/components/shared/Container.tsx` (max-width container)
- `src/components/shared/Heading.tsx` (H1–H4 with font presets, `as` prop)
- `src/components/shared/CopyButton.tsx` (copy-to-clipboard with toast)
- `src/components/shared/StatusBadge.tsx` (animal/case status badges)
- `src/components/shared/ProgressBar.tsx` (donation progress)
- `src/components/shared/WhatsAppButton.tsx` (wa.me link button)
- `src/components/shared/Breadcrumb.tsx` (breadcrumb navigation)
- `src/components/shared/MobileDonateBar.tsx` (sticky mobile donate CTA)

**Acceptance Criteria:**
- [x] All shared components are importable from `@/components/shared`
- [x] Components use the Mint System tokens (fonts, colors, spacing)
- [x] CopyButton copies text and shows a toast notification
- [x] WhatsAppButton generates correct `wa.me` URLs
- [x] StatusBadge renders different colors per status

---

### T2.5: Define spacing and layout tokens

**What:** Establish consistent spacing scale, border-radius, and breakpoint values in the Tailwind/CSS configuration.

**Files:**
- `src/app/(frontend)/globals.css` (CSS custom properties for spacing, radius)

**Acceptance Criteria:**
- [x] Consistent spacing scale is used across components
- [x] `--radius: 0px` — border radius is zero everywhere (Mint System)
- [x] No shadow tokens — Mint System uses flat surfaces only
- [x] Responsive breakpoints: sm 40rem, md 48rem, lg 64rem, xl 80rem, 2xl 86rem

---

## Milestone Acceptance Criteria

- [x] Inter + Space Grotesk fonts render correctly
- [x] oklch color tokens are available as CSS custom properties and Tailwind classes
- [x] shadcn/ui components render with Mint System theme (0px radius, black borders)
- [x] Shared components are importable and functional
- [x] No Tailwind CSS build warnings
- [x] WCAG 2.1 AA color contrast is met for all text/background combinations

## Verification

1. Create a test page that renders all fonts, colors, and base components
2. Run Lighthouse accessibility audit — score should be 90+
3. Verify color contrast with a contrast checker tool
4. Confirm `pnpm run build` succeeds with no Tailwind warnings
5. Import shared components in a test module to confirm barrel exports work
