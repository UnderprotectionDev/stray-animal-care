# M2: Design System & shadcn/ui

## Description

Establish the visual design system with "Warm & Organic" style tokens, custom fonts, and shadcn/ui component library. This milestone creates the reusable design foundation that all pages will build upon.

## Dependencies

- **M1** — Project Scaffolding & Infrastructure

## Scope

- Color tokens (Amber primary, Sage Green secondary, Terracotta CTA)
- Typography (Plus Jakarta Sans, Inter, Caveat)
- shadcn/ui installation and base component setup
- Shared UI components (buttons, cards, badges, etc.)
- Dark mode support (optional, can be deferred)
- CSS custom properties / Tailwind theme extension

## Tasks

### T2.1: Configure custom fonts

**What:** Set up Plus Jakarta Sans (headings), Inter (body), and Caveat (accent) using `next/font` for self-hosted optimization.

**Files:**
- `src/app/layout.tsx` (font imports)
- `src/app/globals.css` (font-family CSS variables)
- `public/fonts/` (if local font files needed)

**Acceptance Criteria:**
- [ ] Plus Jakarta Sans renders for headings
- [ ] Inter renders for body text
- [ ] Caveat renders for accent/handwritten text
- [ ] Fonts load without layout shift (CLS < 0.1)
- [ ] `next/font` handles optimization automatically

---

### T2.2: Define color tokens and Tailwind theme

**What:** Extend the Tailwind CSS configuration with the project's color palette: Amber primary, Sage Green secondary, Terracotta CTA, and neutral/semantic colors.

**Files:**
- `src/app/globals.css` (CSS custom properties)
- `tailwind.config.ts` (theme extension, if needed for v4)

**Acceptance Criteria:**
- [ ] `bg-primary`, `text-primary`, `bg-secondary`, `bg-cta` classes work
- [ ] Amber, Sage Green, Terracotta, and neutral shades are available (50–950)
- [ ] Semantic colors (success, warning, error, info) are defined
- [ ] Colors meet WCAG 2.1 AA contrast ratios for text

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
- [ ] `components.json` is configured with project's theme
- [ ] All listed base components are installed and importable
- [ ] `cn()` utility function works for className merging
- [ ] Components render with the custom color tokens

---

### T2.4: Create shared design components

**What:** Build project-specific shared components that extend shadcn/ui for consistent use across modules.

**Files:**
- `src/modules/shared/components/Section.tsx` (page section wrapper with consistent padding/spacing)
- `src/modules/shared/components/Container.tsx` (max-width container)
- `src/modules/shared/components/Heading.tsx` (H1–H4 with font presets)
- `src/modules/shared/components/CopyButton.tsx` (copy-to-clipboard with toast)
- `src/modules/shared/components/StatusBadge.tsx` (animal/case status badges)
- `src/modules/shared/components/ProgressBar.tsx` (donation progress)
- `src/modules/shared/components/WhatsAppButton.tsx` (wa.me link button)
- `src/modules/shared/index.ts` (barrel exports)

**Acceptance Criteria:**
- [ ] All shared components are importable from `@/modules/shared`
- [ ] Components use the design system tokens (fonts, colors, spacing)
- [ ] CopyButton copies text and shows a toast notification
- [ ] WhatsAppButton generates correct `wa.me` URLs
- [ ] StatusBadge renders different colors per status

---

### T2.5: Define spacing and layout tokens

**What:** Establish consistent spacing scale, border-radius, shadow, and breakpoint values in the Tailwind/CSS configuration.

**Files:**
- `src/app/globals.css` (CSS custom properties for spacing, radius, shadows)

**Acceptance Criteria:**
- [ ] Consistent spacing scale is used across components
- [ ] Border-radius tokens match design (rounded-sm, rounded-md, rounded-lg, rounded-full)
- [ ] Shadow tokens are defined for cards, modals, and dropdowns
- [ ] Responsive breakpoints match target: 320px–1920px

---

## Milestone Acceptance Criteria

- [ ] All three fonts render correctly on a test page
- [ ] Color tokens are available as Tailwind classes
- [ ] shadcn/ui components render with custom theme
- [ ] Shared components are importable and functional
- [ ] No Tailwind CSS build warnings
- [ ] WCAG 2.1 AA color contrast is met for all text/background combinations

## Verification

1. Create a test page that renders all fonts, colors, and base components
2. Run Lighthouse accessibility audit — score should be 90+
3. Verify color contrast with a contrast checker tool
4. Confirm `pnpm run build` succeeds with no Tailwind warnings
5. Import shared components in a test module to confirm barrel exports work
