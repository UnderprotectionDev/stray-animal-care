# M10: Polish, Search & Launch — Done

## Description

Final MVP milestone — implement site-wide search, remaining pages (Volunteer, Vision), full SEO setup, accessibility improvements, and performance optimization. Note: PawCursor and ScrollReveal were removed during the Mint System redesign.

## Dependencies

- **M6** — Core Pages
- **M7** — Animal Profiles
- **M8** — Emergency & Donate
- **M9** — Content Pages

## Scope

- Site-wide search (SearchModal with Cmd+K)
- Instagram integration (skipped — section removed from homepage in Mint System redesign)
- Volunteer page (`/[locale]/gonullu-ol`)
- Vision page (`/[locale]/gelecek-vizyonu`)
- GSAP animation components (BlurText, CountUp, FlowingMenu, RotatingText, SplitText, StaggeredMenu)
- Full SEO (dynamic sitemap, robots.ts, JSON-LD)
- Accessibility improvements (skip nav, focus indicators)
- Performance optimization

## Tasks

### T10.1: Build Search module

**What:** Create the site-wide search functionality with a search modal and URL state management via Nuqs.

**Files:**
- `src/components/shared/SearchModal.tsx` (cmdk-based, Cmd+K / Ctrl+K)

**Acceptance Criteria:**
- [x] Search icon in header opens SearchModal (Cmd+K / Ctrl+K)
- [x] Search queries via PayloadCMS search collection REST API (`/api/search`)
- [x] Results displayed with type labels
- [x] Empty state message when no results found
- [x] Keyboard accessible (Escape closes)
- [x] Debounced input (300ms)

---

### T10.2: Integrate Instagram API

**Status:** Skipped — Instagram placeholder stays as-is (no API token available). Instagram section REMOVED from homepage in Mint System redesign.

---

### T10.3: Build Volunteer page

**What:** Create the volunteer page with volunteer area cards, requirements, FAQ, and WhatsApp application link.

**Files:**
- `src/app/(frontend)/[locale]/gonullu-ol/page.tsx`

**Acceptance Criteria:**
- [x] Volunteer area cards: foster care, health support, feeding, shelter building
- [x] FAQ accordion (4 items)
- [x] Volunteer statistics (25+ volunteers, 150+ animals, 40+ feeding points)
- [x] WhatsApp "Apply" button with pre-filled message
- [x] Static page, translated in both locales
- [x] SEO metadata

---

### T10.4: Build Vision page

**What:** Create the future vision page with NGO establishment goals, short-term and long-term targets.

**Files:**
- `src/app/(frontend)/[locale]/gelecek-vizyonu/page.tsx`

**Acceptance Criteria:**
- [x] NGO establishment goal section
- [x] Short-term goals (1 year) timeline with icons
- [x] Long-term goals (3–5 years) timeline with icons
- [x] Volunteer network growth section
- [x] Support call-to-action (donate + volunteer buttons)
- [x] Static page, translated in both locales
- [x] SEO metadata

---

### T10.5: Custom paw cursor

**Status:** REMOVED — PawCursor component was deleted during the Mint System redesign (March 2026). The Mint System intentionally has no custom cursor.

---

### T10.6: GSAP Animation components

**What:** GSAP-based animation components used across the site. ScrollReveal was removed in the Mint System redesign.

**Files:**
- `src/components/CountUp.tsx` — GSAP animated number counter (scroll-triggered)
- `src/components/BlurText.tsx` — text fade-in with blur effect
- `src/components/FlowingMenu.tsx` — desktop fullscreen menu with image reveals
- `src/components/RotatingText.tsx` — text rotation animation
- `src/components/SplitText.tsx` — character/word split animation
- `src/components/StaggeredMenu.tsx` — mobile fullscreen menu with staggered animation

**Removed:**
- `ScrollReveal` — removed in Mint System redesign (no scroll-triggered fade-ins)

**Acceptance Criteria:**
- [x] CountUp animates stat numbers on scroll into view (GSAP)
- [x] BlurText, RotatingText, SplitText provide text animation effects
- [x] FlowingMenu and StaggeredMenu provide GSAP-based fullscreen menus
- [x] Animations respect `prefers-reduced-motion`

---

### T10.7: Complete SEO setup

**What:** Implement sitemap.xml, robots.txt, JSON-LD structured data, and Open Graph tags for all pages.

**Files:**
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/lib/jsonld.ts` (structured data helpers: Organization, Article, BreadcrumbList)

**Acceptance Criteria:**
- [x] `sitemap.xml` dynamically generated via `src/app/sitemap.ts` (all pages, both locales)
- [x] `robots.txt` dynamically generated via `src/app/robots.ts` (allows all, disallows /admin /api)
- [x] JSON-LD helpers: Organization, Article, BreadcrumbList (`src/lib/jsonld.ts`)
- [x] Open Graph + Twitter Card meta tags on all pages (via Next.js Metadata API)
- [x] Sitemap includes hreflang alternates for TR/EN

---

### T10.8: Accessibility audit and fixes

**What:** Run a WCAG 2.1 AA audit and fix all identified issues.

**Acceptance Criteria:**
- [x] Skip navigation link exists in root layout
- [x] Focus indicators visible on focusable elements (Tailwind outline-ring)
- [x] Search modal keyboard accessible (Cmd+K, Escape)
- [x] ARIA labels on icon buttons (search, menu)

---

### T10.9: Performance optimization

**What:** Optimize bundle size, images, fonts, and rendering for target performance metrics.

**Acceptance Criteria:**
- [x] Fonts preloaded with `next/font` (Inter, Space Grotesk)
- [x] CSS purged by Tailwind CSS 4
- [x] Build succeeds with no errors
- [x] First Load JS shared: ~102KB

---

### T10.10: Vercel deployment

**What:** Deploy the complete MVP to Vercel with environment variables, custom domain (if available), and production checks.

**Files:**
- `vercel.json` (if needed)
- `.env.example` (document all env vars)

**Acceptance Criteria:**
- [x] `pnpm run build` succeeds with no errors or warnings
- [x] Vercel deployment succeeds
- [x] All environment variables are configured in Vercel
- [x] PostgreSQL (Neon) connection works in production
- [x] All pages render correctly in production
- [x] Admin panel is accessible at `/admin`
- [x] ISR revalidation works in production
- [x] Vercel Analytics is active
- [x] Preview deployments work for future PRs

---

## Milestone Acceptance Criteria

- [x] Site-wide search works via SearchModal (Cmd+K)
- [x] Instagram placeholder stays (no API token) — section removed from homepage
- [x] Volunteer and Vision pages are complete and translated
- [x] PawCursor: REMOVED (Mint System — no custom cursor)
- [x] GSAP animations: CountUp, BlurText, FlowingMenu, RotatingText, SplitText, StaggeredMenu
- [x] SEO: dynamic sitemap, robots.ts, JSON-LD helpers present
- [x] Accessibility: skip nav, focus indicators, ARIA labels
- [x] Performance: fonts preloaded (Inter, Space Grotesk), CSS purged, build clean
- [x] All pages work in both TR and EN

## Verification

1. Open search modal — search for an animal name, blog title, and emergency case
2. Navigate to `/tr/gonullu-ol` — verify all sections and WhatsApp button
3. Navigate to `/tr/gelecek-vizyonu` — verify vision content
4. Scroll through stats section — verify GSAP CountUp animations
5. View page source — verify JSON-LD, OG tags, hreflang
6. Check `/sitemap.xml` and `/robots.txt`
7. Run Lighthouse audit — verify 90+ on Performance, Accessibility, SEO
8. Verify production deployment at Vercel URL
