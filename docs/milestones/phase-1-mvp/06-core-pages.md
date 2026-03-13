# M6: Core Pages (Home, Story, Contact)

> **Status: Done** — Completed 2026-03-10. Homepage redesigned with Mint System March 2026.

## Description

Build the three core pages — Home (editorial hero, 11-section composition), Story (personal narrative via CMS page builder), and Contact (WhatsApp, phone, email) — plus the custom 404 page. These are the essential entry points for visitors.

## Dependencies

- **M5** — Layout Module (Header, Footer, Breadcrumb)

## Scope

- Home page with all sections (editorial hero, stats, story, our work, featured animals, success stories, emergencies, support cards, needs list, recent posts, transparency banner)
- Story page (personal narrative with timeline — via CMS page builder)
- Contact page (WhatsApp, phone, email, social links)
- Custom 404 page
- WhatsApp integration for contact and volunteer

## Implementation Notes

The project uses a flat `src/components/` structure (not `src/modules/`) — file paths below reflect the actual implementation. The Story page is built via CMS page builder using TimelineBlock and MissionBlock rather than a dedicated route, allowing content editors to manage it through the admin panel.

## Tasks

### T6.1: Build Home page — Hero section

**What:** Create the editorial split-panel hero with urgent badge (`.badge-sys.critical`), giant `.t-mega` headline (uppercase), and two photo columns with grayscale-to-color hover (`.photo-sys`). No CTA buttons in hero.

**Files:**
- `src/components/home/HomeHero.tsx`
- `src/app/(frontend)/[locale]/page.tsx`

**Acceptance Criteria:**
- [x] Editorial split-panel layout: text left, photos right
- [x] Urgent badge with `.badge-sys.critical` styling
- [x] Giant `.t-mega` headline — uppercase, clamp(3rem, 8vw, 7rem)
- [x] Cat and dog photo columns with `.photo-sys` (grayscale → color on hover)
- [x] Headline and badge text are translated
- [x] Responsive: stacks vertically on mobile
- [x] Images optimized with Next.js Image component

---

### T6.2: Build Home page — Statistics section

**What:** Create animated stat counters with dark theme (black background), mint accent for numbers, 2x2 mobile / 4-col desktop grid.

**Files:**
- `src/components/home/StatsSection.tsx`
- `src/components/CountUp.tsx` (GSAP count-up animation)

**Acceptance Criteria:**
- [x] Dark theme: `bg-black` background, white text, mint accent for numbers
- [x] Displays catsCount, dogsCount, treatedCount, spayedCount, vaccinatedCount
- [x] Numbers animate (GSAP CountUp) when scrolled into view
- [x] Data comes from SiteSettings global
- [x] Responsive: 2x2 grid on mobile, 4-column on desktop

---

### T6.3: Build Home page — Featured sections

**What:** Create the 11-section homepage composition including new Mint System components alongside featured data sections.

**Files:**
- `src/components/home/StorySection.tsx` — personal narrative teaser
- `src/components/home/OurWorkShowcase.tsx` — 6-activity grid from CMS (`ourWorkActivities` in SiteSettings)
- `src/components/home/FeaturedAnimals.tsx` — 5 featured animals (`.photo-sys` grayscale grid)
- `src/components/home/SuccessStories.tsx` — before/after slider (`react-compare-slider`)
- `src/components/home/ActiveEmergencies.tsx` — 5 active cases with progress bars
- `src/components/home/SupportCards.tsx` — donation method cards (IBAN, PayPal/Wise, supplies, volunteer)
- `src/components/home/NeedsList.tsx` — brutalist magazine grid with urgency-based layout
- `src/components/home/RecentPosts.tsx` — latest 3 published blog posts
- `src/components/home/TransparencyBanner.tsx` — accountability/transparency CTA

**Acceptance Criteria:**
- [x] FeaturedAnimals shows up to 5 animals marked as `featured`
- [x] ActiveEmergencies shows up to 5 cases with status `aktif`
- [x] SuccessStories shows completed cases with before/after photos
- [x] OurWorkShowcase displays 6 activity types from SiteSettings with images
- [x] NeedsList uses brutalist magazine grid layout (`.needs-grid`)
- [x] RecentPosts shows latest 3 published blog posts
- [x] TransparencyBanner links to transparency page
- [x] Each section has a "View All" link to the full page
- [x] Data fetched from PayloadCMS local API

---

### T6.4: Build Home page — Instagram feed section

**Status:** REMOVED from homepage in Mint System redesign. Component file (`InstagramFeedPlaceholder.tsx`) may still exist but is not rendered.

---

### T6.5: Assemble Home page

**What:** Combine all home sections into the page component wrapped in `.sys-wrap` (Mint System vertical stack with 1px gap grid lines).

**Files:**
- `src/app/(frontend)/[locale]/page.tsx`

**Component order:**
1. `HomeHero` — editorial split-panel
2. `StatsSection` — dark theme with GSAP CountUp
3. `StorySection` — personal narrative teaser
4. `OurWorkShowcase` — 6-activity grid from CMS
5. `FeaturedAnimals` — 5 featured animals
6. `SuccessStories` — before/after slider
7. `ActiveEmergencies` — 5 active cases
8. `SupportCards` — donation method cards
9. `NeedsList` — brutalist magazine grid
10. `RecentPosts` — latest 3 posts
11. `TransparencyBanner` — accountability CTA

**Acceptance Criteria:**
- [x] All sections render in correct order inside `.sys-wrap`
- [x] ISR with 60-second revalidation
- [x] SEO metadata (generateMetadata) is set
- [x] Page is thin — all UI in component files under `src/components/home/`

---

### T6.6: Build Story page

**What:** Create the "Hikayem" (My Story) page with personal narrative, earthquake story, daily routine timeline, and mission statement. Implemented via CMS page builder using TimelineBlock and MissionBlock.

**Files:**
- `src/blocks/Timeline/Component.tsx`
- `src/blocks/Timeline/config.ts`
- `src/blocks/Mission/Component.tsx`
- `src/blocks/Mission/config.ts`
- `src/blocks/RenderBlocks.tsx` (updated to include new blocks)

**Acceptance Criteria:**
- [x] Personal introduction section with photo
- [x] Earthquake story section
- [x] Daily routine as a visual timeline
- [x] "Why I started this" section
- [x] Goals/mission section
- [x] Static page (build-time generation)
- [x] All content translated (TR/EN)
- [x] SEO metadata is set

---

### T6.7: Build Contact page

**What:** Create the contact page with WhatsApp link, phone number, email, and social media links.

**Files:**
- `src/components/contact/ContactCard.tsx`
- `src/app/(frontend)/[locale]/iletisim/page.tsx`

**Acceptance Criteria:**
- [x] WhatsApp button with pre-filled message
- [x] Phone number with click-to-call
- [x] Email with mailto link
- [x] Social media links (Instagram)
- [x] Contact info comes from SiteSettings global
- [x] All text translated
- [x] SEO metadata is set

---

### T6.8: Build Custom 404 page

**What:** Create a custom "page not found" page with links to popular pages.

**Files:**
- `src/app/(frontend)/[locale]/not-found.tsx`

**Acceptance Criteria:**
- [x] "Page not found" message in both TR and EN
- [x] Links to home, animals, donate pages
- [x] Search suggestion or search bar (deferred to M10)
- [x] Consistent with Mint System design

---

## Milestone Acceptance Criteria

- [x] Home page renders all 11 sections with real CMS data inside `.sys-wrap`
- [x] Story page renders with full translated content via CMS page builder
- [x] Contact page displays working WhatsApp, phone, email links
- [x] 404 page renders for unknown routes
- [x] All pages have correct SEO metadata
- [x] All content is available in both TR and EN
- [x] Pages are responsive (320px–1920px)

## Verification

1. Navigate to `/tr` — verify all 11 home sections render with data in `.sys-wrap`
2. Navigate to `/en` — verify English translations
3. Click featured animals/emergencies — verify links work
4. Navigate to `/tr/hikayem` — verify story page with timeline
5. Navigate to `/tr/iletisim` — click WhatsApp button, verify wa.me link
6. Navigate to `/tr/nonexistent-page` — verify 404 page
7. Run Lighthouse — verify SEO score 90+
