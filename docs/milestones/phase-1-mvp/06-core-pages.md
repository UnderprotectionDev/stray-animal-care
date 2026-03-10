# M6: Core Pages (Home, Story, Contact)

> **Status: Done ✅** — Completed 2026-03-10

## Description

Build the three core pages — Home (hero, stats, sections), Story (personal narrative), and Contact (WhatsApp, phone, email) — plus the custom 404 page. These are the essential entry points for visitors.

## Dependencies

- **M5** — Layout Module (Header, Footer, Breadcrumb)

## Scope

- Home page with all sections (hero, stats, featured content, CTA cards)
- Story page (personal narrative with timeline)
- Contact page (WhatsApp, phone, email, social links)
- Custom 404 page ("lost paw" design)
- WhatsApp integration for contact and volunteer

## Implementation Notes

The project uses a flat `src/components/` structure (not `src/modules/`) — file paths below reflect the actual implementation. The Story page is built via CMS page builder using TimelineBlock and MissionBlock rather than a dedicated route, allowing content editors to manage it through the admin panel.

## Tasks

### T6.1: Build Home page — Hero section

**What:** Create the hero section with a large emotional image, headline, subtitle, and two CTA buttons ("Donate" and "Emergency Cases").

**Files:**
- `src/components/home/HomeHero.tsx`
- `src/app/(frontend)/[locale]/page.tsx`

**Acceptance Criteria:**
- [x] Full-width hero with background image
- [x] Headline and subtitle text are translated
- [x] Two CTA buttons link to donate and emergency pages
- [x] Responsive: stacks vertically on mobile
- [x] Image is optimized with Next.js Image component

---

### T6.2: Build Home page — Statistics section

**What:** Create animated stat counters showing cats, dogs, treated, spayed, and vaccinated counts from SiteSettings.

**Files:**
- `src/components/home/StatsSection.tsx`

**Acceptance Criteria:**
- [x] Displays catsCount, dogsCount, treatedCount, spayedCount, vaccinatedCount
- [x] Numbers animate (count-up) when scrolled into view
- [x] Data comes from SiteSettings global
- [x] Responsive grid layout (2 cols mobile, 5 cols desktop)

---

### T6.3: Build Home page — Featured sections

**What:** Create sections for featured animals, active emergency cases, recent blog posts, and support method cards. Each section links to its full page.

**Files:**
- `src/components/home/FeaturedAnimals.tsx`
- `src/components/home/ActiveEmergencies.tsx`
- `src/components/home/RecentPosts.tsx`
- `src/components/home/SupportCards.tsx`

**Acceptance Criteria:**
- [x] Featured animals shows up to 4 animals marked as `featured`
- [x] Active emergencies shows up to 3 cases with status `aktif`
- [x] Recent posts shows latest 3 published blog posts
- [x] Support cards show donation methods (IBAN, PayPal/Wise, supplies, volunteer)
- [x] Each section has a "View All" link to the full page
- [x] Data fetched from PayloadCMS local API

---

### T6.4: Build Home page — Instagram feed section

**What:** Create a placeholder section for the Instagram feed (actual API integration in M10). Shows static placeholder images for now.

**Files:**
- `src/components/home/InstagramFeedPlaceholder.tsx`

**Acceptance Criteria:**
- [x] Grid layout for 6–9 posts
- [x] Placeholder images with Instagram icon overlay
- [x] "Follow us" link to Instagram profile
- [x] Ready for API integration in M10

---

### T6.5: Assemble Home page

**What:** Combine all home sections into the page component with proper data fetching.

**Files:**
- `src/app/(frontend)/[locale]/page.tsx`

**Acceptance Criteria:**
- [x] All sections render in correct order
- [x] ISR with 60-second revalidation
- [x] SEO metadata (generateMetadata) is set
- [x] Page is thin — all UI in module components

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

**What:** Create a custom "page not found" page with a "lost paw" themed design and links to popular pages.

**Files:**
- `src/app/(frontend)/[locale]/not-found.tsx`

**Acceptance Criteria:**
- [x] Custom illustration or design (paw theme)
- [x] "Page not found" message in both TR and EN
- [x] Links to home, animals, donate pages
- [x] Search suggestion or search bar (deferred to M10)
- [x] Consistent with design system

---

## Milestone Acceptance Criteria

- [x] Home page renders all sections with real CMS data
- [x] Story page renders with full translated content
- [x] Contact page displays working WhatsApp, phone, email links
- [x] 404 page renders for unknown routes
- [x] All pages have correct SEO metadata
- [x] All content is available in both TR and EN
- [x] Pages are responsive (320px–1920px)

## Verification

1. Navigate to `/tr` — verify all home sections render with data
2. Navigate to `/en` — verify English translations
3. Click featured animals/emergencies — verify links work
4. Navigate to `/tr/hikayem` — verify story page with timeline
5. Navigate to `/tr/iletisim` — click WhatsApp button, verify wa.me link
6. Navigate to `/tr/nonexistent-page` — verify 404 page
7. Run Lighthouse — verify SEO score 90+
