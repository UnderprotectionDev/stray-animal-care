# M5: Layout Module

## Description

Build the site-wide layout components: Header (8-column grid nav with GSAP edge-detection, FlowingMenu, StaggeredMenu), Footer (4-column grid with bank accounts from SiteSettings), mobile menu, language switcher, search trigger, "Donate" CTA, and breadcrumb navigation. These wrap all frontend pages.

## Dependencies

- **M2** — Design System & shadcn/ui (shared components, fonts, colors)
- **M3** — Internationalization (i18n) (language switcher, translated navigation)
- **M4** — CMS Collections & Global (SiteSettings for bank accounts, contact info)

## Scope

- Header component with 8-column CSS grid nav (desktop) and simplified bar (mobile)
- Desktop fullscreen menu (FlowingMenu with GSAP image reveals)
- Mobile fullscreen menu (StaggeredMenu with GSAP colored pre-layers)
- Footer component with 4-column grid, bank accounts array, PayPal/Wise links
- Language switcher (TR/EN)
- Breadcrumb navigation component
- Sticky mobile "Donate" CTA button
- Integration with SiteSettings global for dynamic content

## Tasks

### T5.1: Build Header component

**What:** Create the main header as an 8-column CSS grid with brand cell, nav link cells (GSAP edge-detection hover fills), language/search cell, `.btn-cta` mint donate button, and hamburger. Mobile: simplified bar with brand left, search + hamburger right.

**Files:**
- `src/Header/Component.client.tsx` (main header with NavCellLink, GSAP edge-detection)
- `src/Header/Component.tsx` (server wrapper)
- `src/Header/LanguageSwitcher.tsx`

**Acceptance Criteria:**
- [x] Brand cell links to home page (`/[locale]`)
- [x] Navigation cells include main pages with GSAP edge-detection hover (directional mint overlay fill)
- [x] "Donate" CTA uses `.btn-cta` (mint background, mono font, uppercase)
- [x] Header is sticky on scroll with `z-50`
- [x] Desktop (>= lg): 8-column CSS grid with `gap: 1px; background: var(--foreground)` grid lines
- [x] Mobile (< lg): simplified bar — brand left, search + hamburger icons right
- [x] All nav text is translated via next-intl
- [x] Hamburger opens FlowingMenu (desktop) or StaggeredMenu (mobile)

---

### T5.2: Build Fullscreen Menus

**What:** Two fullscreen menu components: FlowingMenu for desktop (GSAP image reveals on hover) and StaggeredMenu for mobile (GSAP colored pre-layers with staggered item animation).

**Files:**
- `src/components/FlowingMenu.tsx` (desktop — fullscreen with image reveals per nav item)
- `src/components/StaggeredMenu.tsx` (mobile — fullscreen overlay with colored pre-layers, staggered item entry, social links)

**Notes:** The original `src/Header/Nav/index.tsx` and `src/Header/MobileMenu.tsx` were deleted and replaced by these GSAP-based components.

**Acceptance Criteria:**
- [x] FlowingMenu: fullscreen overlay, image reveals on item hover, close on item click or close button
- [x] StaggeredMenu: fullscreen overlay with colored pre-layers, staggered item animation, social links
- [x] All navigation links are present in both menus
- [x] Language switcher is accessible
- [x] Body scroll is locked when menu is open
- [x] Menu is accessible (Escape key closes, proper ARIA attributes)

---

### T5.3: Build Language Switcher

**What:** Create a language toggle component that switches between TR and EN, preserving the current page path.

**Files:**
- `src/Header/LanguageSwitcher.tsx`

**Acceptance Criteria:**
- [x] Clicking TR/EN switches the locale prefix in the URL
- [x] Current page path is preserved (e.g., `/tr/canlarimiz` → `/en/canlarimiz`)
- [x] Current locale is visually indicated (active state)
- [x] Works in Header

---

### T5.4: Build Footer component

**What:** Create the footer as a 4-column grid (`.g-1 md:g-4`) with brand/social column, quick links, bank info (pulled from `bankAccounts` array in SiteSettings + PayPal/Wise links), and contact info. Data comes from SiteSettings global.

**Files:**
- `src/Footer/Component.tsx`

**Acceptance Criteria:**
- [x] 4-column grid layout using `.g-1 md:g-4` (Mint System grid utilities)
- [x] Brand column: logo, description, social icons (Instagram, WhatsApp)
- [x] Bank info column: IBAN with CopyButton, bank name, account holder
- [ ] International payment: PayPal/Wise links (removed in Mint System redesign — not implemented)
- [x] Contact column: phone, email, WhatsApp links with Lucide icons
- [x] Quick links column with key page navigation
- [x] Footer content is fetched from SiteSettings global
- [x] All text is translated via next-intl
- [x] IBAN is visible on every page (PRD requirement)

---

### T5.5: Build Breadcrumb component

**What:** Create a breadcrumb navigation component for detail pages (animal, emergency case, blog post).

**Files:**
- `src/components/shared/Breadcrumb.tsx`

**Acceptance Criteria:**
- [x] Shows hierarchy: Home > Section > Current Page
- [x] Links are functional and locale-aware
- [x] Structured data (BreadcrumbList JSON-LD) is included
- [x] Visually consistent with Mint System (`.t-meta`, uppercase)

---

### T5.6: Build sticky mobile Donate CTA

**What:** Create a fixed-position "Donate" button that appears on mobile screens, linking to the donation page.

**Files:**
- `src/components/shared/MobileDonateBar.tsx`

**Acceptance Criteria:**
- [x] Visible only on mobile (< 768px)
- [x] Fixed at the bottom of the viewport
- [x] Styled with Mint System CTA (`.btn-cta` mint background)
- [x] Links to `/[locale]/destek-ol`
- [x] Does not overlap with page content (proper spacing)
- [x] Text is translated

---

### T5.7: Integrate layout into App Router

**What:** Wire the Header, Footer, and MobileDonateBar into the frontend layout so they appear on all pages.

**Files:**
- `src/app/(frontend)/[locale]/layout.tsx`

**Acceptance Criteria:**
- [x] Header renders at the top of every frontend page
- [x] Footer renders at the bottom of every frontend page
- [x] MobileDonateBar renders on mobile
- [x] SiteSettings data is fetched once in the layout (not per-page)
- [x] Layout passes locale context to all children

---

## Milestone Acceptance Criteria

- [x] Header displays 8-column grid on desktop and simplified bar on mobile
- [x] Desktop FlowingMenu opens/closes with GSAP image reveals
- [x] Mobile StaggeredMenu opens/closes with colored pre-layers and staggered animation
- [x] Language switcher toggles locale and preserves current path
- [x] Footer IBAN copy button works and shows toast
- [x] Breadcrumb renders correct hierarchy on detail pages
- [x] Mobile donate CTA is visible only on mobile
- [x] All text is translated in both TR and EN
- [x] Footer data comes from SiteSettings (bank accounts, contact, social links, PayPal/Wise)

## Verification

1. Desktop: verify 8-column grid header with edge-detection hover on nav cells
2. Desktop: click hamburger — verify FlowingMenu with image reveals
3. Mobile: verify simplified bar, click hamburger — verify StaggeredMenu
4. Switch language via switcher — confirm path is preserved
5. Click IBAN copy button in footer — confirm clipboard and toast
6. Navigate to a detail page — verify breadcrumb appears
7. Resize to mobile — confirm sticky donate bar appears
8. Switch to English — verify all layout text is translated
