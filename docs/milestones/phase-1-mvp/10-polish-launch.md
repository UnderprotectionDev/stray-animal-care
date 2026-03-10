# M10: Polish, Search, Instagram & Launch

## Description

Final MVP milestone — implement site-wide search, Instagram API integration, remaining pages (Volunteer, Vision), custom paw cursor, animations, full SEO setup, accessibility audit, performance optimization, and Vercel deployment.

## Dependencies

- **M6** — Core Pages
- **M7** — Animal Profiles
- **M8** — Emergency & Donate
- **M9** — Content Pages

## Scope

- Site-wide search (SearchBar, SearchModal, SearchResults)
- Instagram API integration (replace placeholders)
- Volunteer page (`/[locale]/gonullu-ol`)
- Vision page (`/[locale]/gelecek-vizyonu`)
- Custom paw cursor (desktop only)
- Motion + GSAP animations
- Full SEO (sitemap, robots.txt, JSON-LD, Open Graph)
- Accessibility audit (WCAG 2.1 AA)
- Performance optimization
- Vercel deployment

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
- [ ] Search icon in header opens SearchModal
- [ ] Search queries animals, blog posts, and emergency cases
- [ ] Uses PayloadCMS fullText search
- [ ] Search state synced to URL via Nuqs (`?q=searchterm`)
- [ ] Results grouped by type (Animals, Blog, Emergency)
- [ ] Empty state message when no results found
- [ ] Keyboard accessible (Escape closes, Enter searches)
- [ ] Debounced input (300ms)

---

### T10.2: Integrate Instagram API

**What:** Replace the placeholder Instagram feed with live data from Instagram Basic Display API (or Graph API).

**Files:**
- `src/modules/instagram/lib/api.ts`
- `src/modules/instagram/components/InstagramGrid.tsx`
- `src/modules/instagram/index.ts`
- `src/modules/home/components/InstagramFeed.tsx` (update)

**Acceptance Criteria:**
- [ ] Fetches latest 6–9 posts from Instagram API
- [ ] Displays photo grid with hover overlay (caption preview)
- [ ] Each post links to Instagram permalink
- [ ] Long-lived token handling with refresh mechanism
- [ ] Graceful fallback: static placeholder images if API fails
- [ ] ISR with 3600-second revalidation (1 hour cache)
- [ ] Token stored in environment variable

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
- [ ] Volunteer area cards: foster care, health care, feeding
- [ ] Requirements/conditions section
- [ ] FAQ accordion
- [ ] Volunteer statistics
- [ ] WhatsApp "Apply" button with pre-filled message
- [ ] Static page, translated in both locales
- [ ] SEO metadata

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
- [ ] NGO establishment goal section
- [ ] Short-term goals (1 year) section
- [ ] Long-term goals (3–5 years) section
- [ ] Volunteer network growth section
- [ ] Support call-to-action
- [ ] Static page, translated in both locales
- [ ] SEO metadata

---

### T10.5: Implement custom paw cursor

**What:** Create a custom cursor that replaces the default cursor with a paw print icon on desktop.

**Files:**
- `src/modules/shared/components/PawCursor.tsx`
- `public/images/cursor-paw.svg` (or PNG)

**Acceptance Criteria:**
- [ ] Custom paw cursor appears on desktop (> 768px)
- [ ] Default cursor on mobile/tablet (no custom cursor)
- [ ] Cursor changes to pointer on interactive elements
- [ ] Smooth cursor following (requestAnimationFrame)
- [ ] No performance impact (< 1ms per frame)

---

### T10.6: Add Motion + GSAP animations

**What:** Add scroll-triggered animations, page transitions, and micro-interactions across the site.

**Files:**
- `src/modules/shared/components/ScrollReveal.tsx`
- `src/modules/shared/components/CountUp.tsx`
- `src/modules/shared/hooks/useScrollAnimation.ts`

**Acceptance Criteria:**
- [ ] Sections fade-in/slide-up on scroll (Motion)
- [ ] Stat counters animate on scroll into view (CountUp)
- [ ] Hero sections have entrance animations
- [ ] Progress bars animate when visible
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No jank or layout shift from animations
- [ ] GSAP used for complex scroll-linked animations

---

### T10.7: Complete SEO setup

**What:** Implement sitemap.xml, robots.txt, JSON-LD structured data, and Open Graph tags for all pages.

**Files:**
- `src/app/sitemap.ts`
- `src/app/robots.ts`
- `src/modules/shared/lib/jsonld.ts` (structured data helpers)

**Acceptance Criteria:**
- [ ] `sitemap.xml` auto-generated with all pages (both locales)
- [ ] `robots.txt` allows all crawlers, references sitemap
- [ ] JSON-LD: Organization on home page
- [ ] JSON-LD: Article on blog posts
- [ ] JSON-LD: BreadcrumbList on detail pages
- [ ] Open Graph + Twitter Card meta tags on all pages
- [ ] All images have `alt` attributes
- [ ] `hreflang` tags for TR/EN alternate pages

---

### T10.8: Accessibility audit and fixes

**What:** Run a WCAG 2.1 AA audit and fix all identified issues.

**Acceptance Criteria:**
- [ ] Lighthouse Accessibility score: 90+
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are visible on all focusable elements
- [ ] Color contrast meets AA ratio (4.5:1 for text, 3:1 for large text)
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Skip navigation link exists
- [ ] ARIA landmarks are properly used
- [ ] Screen reader tested on critical flows (donate, emergency)

---

### T10.9: Performance optimization

**What:** Optimize bundle size, images, fonts, and rendering for target performance metrics.

**Acceptance Criteria:**
- [ ] Lighthouse Performance score: 90+
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TTFB < 600ms
- [ ] First Load JS < 150KB
- [ ] All images use Next.js Image with proper sizes/formats
- [ ] Fonts preloaded with `next/font`
- [ ] Unused CSS purged by Tailwind
- [ ] Critical rendering path optimized

---

### T10.10: Vercel deployment

**What:** Deploy the complete MVP to Vercel with environment variables, custom domain (if available), and production checks.

**Files:**
- `vercel.json` (if needed)
- `.env.example` (document all env vars)

**Acceptance Criteria:**
- [ ] `bun run build` succeeds with no errors or warnings
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

- [ ] Site-wide search works across animals, blog, and emergencies
- [ ] Instagram feed shows live posts (or graceful fallback)
- [ ] Volunteer and Vision pages are complete and translated
- [ ] Custom paw cursor works on desktop only
- [ ] Animations are smooth and respect reduced motion
- [ ] SEO: sitemap, robots.txt, JSON-LD, OG tags all present
- [ ] Accessibility: Lighthouse score 90+
- [ ] Performance: Lighthouse score 90+
- [ ] Site is deployed and live on Vercel
- [ ] All pages work in both TR and EN

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
