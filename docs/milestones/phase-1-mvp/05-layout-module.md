# M5: Layout Module

## Description

Build the site-wide layout components: Header (navigation, language switcher, search trigger, "Donate" CTA), Footer (IBAN, social links, quick links), mobile menu, and breadcrumb navigation. These wrap all frontend pages.

## Dependencies

- **M2** — Design System & shadcn/ui (shared components, fonts, colors)
- **M3** — Internationalization (i18n) (language switcher, translated navigation)
- **M4** — CMS Collections & Global (SiteSettings for IBAN, contact info)

## Scope

- Header component with responsive navigation
- Footer component with IBAN display and copy
- Mobile hamburger menu with slide-in drawer
- Language switcher (TR/EN)
- Breadcrumb navigation component
- Sticky mobile "Donate" CTA button
- Integration with SiteSettings global for dynamic content

## Tasks

### T5.1: Build Header component

**What:** Create the main header with logo, navigation links, language switcher, search icon, and "Donate" CTA button. Should be responsive — full nav on desktop, hamburger on mobile.

**Files:**
- `src/modules/layout/components/Header.tsx`
- `src/modules/layout/components/NavLinks.tsx`
- `src/modules/layout/components/Logo.tsx`

**Acceptance Criteria:**
- [x] Logo links to home page (`/[locale]`)
- [x] Navigation includes all main pages from PRD routing table
- [x] "Donate" CTA button is prominently styled (Terracotta)
- [x] Header is sticky on scroll
- [x] Desktop: full horizontal navigation visible
- [x] Mobile (< 768px): navigation collapses to hamburger icon
- [x] All nav text is translated via next-intl

---

### T5.2: Build Mobile Menu

**What:** Create a slide-in mobile menu triggered by the hamburger icon, with all navigation links, language switcher, and close button.

**Files:**
- `src/modules/layout/components/MobileMenu.tsx`

**Acceptance Criteria:**
- [x] Menu slides in from right with smooth animation
- [x] All navigation links are present
- [x] Language switcher is included
- [x] "Donate" CTA is prominently displayed
- [x] Close button or outside-click dismisses the menu
- [x] Body scroll is locked when menu is open
- [x] Menu is accessible (focus trap, Escape key closes)

---

### T5.3: Build Language Switcher

**What:** Create a language toggle component that switches between TR and EN, preserving the current page path.

**Files:**
- `src/modules/layout/components/LanguageSwitcher.tsx`

**Acceptance Criteria:**
- [x] Clicking TR/EN switches the locale prefix in the URL
- [x] Current page path is preserved (e.g., `/tr/canlarimiz` → `/en/canlarimiz`)
- [x] Current locale is visually indicated (active state)
- [x] Works in both Header and MobileMenu

---

### T5.4: Build Footer component

**What:** Create the footer with IBAN info (copy-to-clipboard), contact details, social media links, quick navigation links, and international payment options. Data comes from SiteSettings global.

**Files:**
- `src/modules/layout/components/Footer.tsx`

**Acceptance Criteria:**
- [x] IBAN is displayed with a copy button (uses CopyButton from shared)
- [x] Bank name and account holder are shown
- [x] PayPal/Wise links are displayed for international donors
- [x] WhatsApp, Instagram, phone, email links are present
- [x] Quick links section with key page navigation
- [x] Footer content is fetched from SiteSettings global
- [x] All text is translated via next-intl
- [x] IBAN is visible on every page (PRD requirement)

---

### T5.5: Build Breadcrumb component

**What:** Create a breadcrumb navigation component for detail pages (animal, emergency case, blog post).

**Files:**
- `src/modules/layout/components/Breadcrumb.tsx`

**Acceptance Criteria:**
- [x] Shows hierarchy: Home > Section > Current Page
- [x] Links are functional and locale-aware
- [x] Structured data (BreadcrumbList JSON-LD) is included
- [x] Visually consistent with design system

---

### T5.6: Build sticky mobile Donate CTA

**What:** Create a fixed-position "Donate" button that appears on mobile screens, linking to the donation page.

**Files:**
- `src/modules/layout/components/MobileDonateBar.tsx`

**Acceptance Criteria:**
- [x] Visible only on mobile (< 768px)
- [x] Fixed at the bottom of the viewport
- [x] Styled with Terracotta CTA color
- [x] Links to `/[locale]/destek-ol`
- [x] Does not overlap with page content (proper spacing)
- [x] Text is translated

---

### T5.7: Integrate layout into App Router

**What:** Wire the Header, Footer, and MobileDonateBar into the frontend layout so they appear on all pages.

**Files:**
- `src/app/(frontend)/[locale]/layout.tsx`
- `src/modules/layout/index.ts` (barrel exports)

**Acceptance Criteria:**
- [x] Header renders at the top of every frontend page
- [x] Footer renders at the bottom of every frontend page
- [x] MobileDonateBar renders on mobile
- [x] SiteSettings data is fetched once in the layout (not per-page)
- [x] Layout passes locale context to all children

---

## Milestone Acceptance Criteria

- [x] Header displays correctly on desktop and mobile
- [x] Mobile menu opens/closes smoothly with all links
- [x] Language switcher toggles locale and preserves current path
- [x] Footer IBAN copy button works and shows toast
- [x] Breadcrumb renders correct hierarchy on detail pages
- [x] Mobile donate CTA is visible only on mobile
- [x] All text is translated in both TR and EN
- [x] Footer data comes from SiteSettings (IBAN, contact, social links)

## Verification

1. Desktop: verify full navigation, language switcher, and CTA in header
2. Mobile: verify hamburger menu with all links and animations
3. Switch language via switcher — confirm path is preserved
4. Click IBAN copy button in footer — confirm clipboard and toast
5. Navigate to a detail page — verify breadcrumb appears
6. Resize to mobile — confirm sticky donate bar appears
7. Switch to English — verify all layout text is translated
