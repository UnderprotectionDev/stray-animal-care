# M10: Polish, Search, Instagram & Launch — Done ✅

## Description

Final MVP milestone — implement site-wide search, remaining pages (Volunteer, Vision), custom paw cursor, animations, full SEO setup, accessibility improvements, and performance optimization.

## Dependencies

- **M6** — Core Pages
- **M7** — Animal Profiles
- **M8** — Emergency & Donate
- **M9** — Content Pages

## Scope

- Site-wide search (SearchModal with Cmd+K)
- Instagram placeholder (stays as-is, no API token)
- Volunteer page (`/[locale]/gonullu-ol`)
- Vision page (`/[locale]/gelecek-vizyonu`)
- Custom paw cursor (desktop only)
- Motion (Framer Motion) scroll animations
- Full SEO (dynamic sitemap, robots.ts, JSON-LD)
- Accessibility improvements (skip nav, focus indicators)
- Performance optimization

## Tasks

### T10.1: Build Search module

**What:** Create the site-wide search functionality with a search bar/modal, results page, and URL state management via Nuqs.

**Files:**
- `src/modules/search/components/SearchBar.tsx`
- `src/modules/search/components/SearchModal.tsx`
- `src/modules/search/components/SearchResults.tsx`
- `src/modules/search/lib/queries.ts`
- `src/modules/search/index.ts`

**Acceptance Criteria:**
- [x] Search icon in header opens SearchModal (Cmd+K / Ctrl+K)
- [x] Search queries via PayloadCMS search collection REST API
- [x] Results displayed with type labels
- [x] Empty state message when no results found
- [x] Keyboard accessible (Escape closes)
- [x] Debounced input (300ms)

---

### T10.2: Integrate Instagram API

**What:** Replace the placeholder Instagram feed with live data from Instagram Basic Display API (or Graph API).

**Files:**
- `src/modules/instagram/lib/api.ts`
- `src/modules/instagram/components/InstagramGrid.tsx`
- `src/modules/instagram/index.ts`
- `src/modules/home/components/InstagramFeed.tsx` (update)

**Status:** Skipped — Instagram placeholder stays as-is (no API token available).

---

### T10.3: Build Volunteer page

**What:** Create the volunteer page with volunteer area cards, requirements, FAQ, and WhatsApp application link.

**Files:**
- `src/modules/volunteer/components/VolunteerAreas.tsx`
- `src/modules/volunteer/components/VolunteerRequirements.tsx`
- `src/modules/volunteer/components/VolunteerFAQ.tsx`
- `src/modules/volunteer/components/VolunteerStats.tsx`
- `src/app/(frontend)/[locale]/gonullu-ol/page.tsx`
- `src/modules/volunteer/index.ts`

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
- `src/modules/vision/components/VisionHero.tsx`
- `src/modules/vision/components/ShortTermGoals.tsx`
- `src/modules/vision/components/LongTermGoals.tsx`
- `src/modules/vision/components/CallToAction.tsx`
- `src/app/(frontend)/[locale]/gelecek-vizyonu/page.tsx`
- `src/modules/vision/index.ts`

**Acceptance Criteria:**
- [x] NGO establishment goal section
- [x] Short-term goals (1 year) timeline with icons
- [x] Long-term goals (3–5 years) timeline with icons
- [x] Volunteer network growth section
- [x] Support call-to-action (donate + volunteer buttons)
- [x] Static page, translated in both locales
- [x] SEO metadata

---

### T10.5: Implement custom paw cursor

**What:** Create a custom cursor that replaces the default cursor with a paw print icon on desktop.

**Files:**
- `src/modules/shared/components/PawCursor.tsx`
- `public/images/cursor-paw.svg` (or PNG)

**Acceptance Criteria:**
- [x] Custom paw cursor appears on desktop (> 768px)
- [x] Default cursor on mobile/tablet (no custom cursor)
- [x] Smooth cursor following (requestAnimationFrame)
- [x] Respects prefers-reduced-motion

---

### T10.6: Add Motion + GSAP animations

**What:** Add scroll-triggered animations, page transitions, and micro-interactions across the site.

**Files:**
- `src/modules/shared/components/ScrollReveal.tsx`
- `src/modules/shared/components/CountUp.tsx`
- `src/modules/shared/hooks/useScrollAnimation.ts`

**Acceptance Criteria:**
- [x] Sections fade-in/slide-up on scroll (Motion via ScrollReveal component)
- [x] Stat counters animate on scroll into view (CountUpNumber)
- [x] Home page sections wrapped with ScrollReveal
- [x] Animations respect `prefers-reduced-motion` (via useInView + media query)

---

### T10.7: Complete SEO setup

**What:** Implement sitemap.xml, robots.txt, JSON-LD structured data, and Open Graph tags for all pages.

**Files:**
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/modules/shared/lib/jsonld.ts` (structured data helpers)

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
- [x] Fonts preloaded with `next/font` (Plus Jakarta Sans, Inter, Caveat)
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
- [ ] `pnpm run build` succeeds with no errors or warnings
- [ ] Vercel deployment succeeds
- [ ] All environment variables are configured in Vercel
- [ ] PostgreSQL (Neon) connection works in production
- [ ] All pages render correctly in production
- [ ] Admin panel is accessible at `/admin`
- [ ] ISR revalidation works in production
- [ ] Vercel Analytics is active
- [ ] Preview deployments work for future PRs

---

## Milestone Acceptance Criteria

- [x] Site-wide search works via SearchModal (Cmd+K)
- [x] Instagram placeholder stays (no API token)
- [x] Volunteer and Vision pages are complete and translated
- [x] Custom paw cursor works on desktop only
- [x] Animations are smooth and respect reduced motion
- [x] SEO: dynamic sitemap, robots.ts, JSON-LD helpers present
- [x] Accessibility: skip nav, focus indicators, ARIA labels
- [x] Performance: fonts preloaded, CSS purged, build clean
- [x] All pages work in both TR and EN

## Verification

1. Open search modal — search for an animal name, blog title, and emergency case
2. Verify Instagram section shows live posts or fallback
3. Navigate to `/tr/gonullu-ol` — verify all sections and WhatsApp button
4. Navigate to `/tr/gelecek-vizyonu` — verify vision content
5. Desktop: verify custom paw cursor, mobile: verify default cursor
6. Scroll through pages — verify animations trigger smoothly
7. View page source — verify JSON-LD, OG tags, hreflang
8. Check `/sitemap.xml` and `/robots.txt`
9. Run Lighthouse audit — verify 90+ on Performance, Accessibility, SEO
10. Verify production deployment at Vercel URL
