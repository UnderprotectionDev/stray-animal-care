# M6: Core Pages (Home, Story, Contact)

## Description

Build the three core pages — Home (hero, stats, sections), Story (personal narrative), and Contact (WhatsApp, phone, email) — plus the custom 404 page. These are the essential entry points for visitors.

## Dependencies

- **M5** — Layout Module (Header, Footer, Breadcrumb)

## Scope

- Home page with all sections (hero, stats, featured content, CTA cards, supporter comments)
- Story page (personal narrative with timeline)
- Contact page (WhatsApp, phone, email, social links)
- Custom 404 page ("lost paw" design)
- WhatsApp integration for contact and volunteer

## Tasks

### T6.1: Build Home page — Hero section

**What:** Create the hero section with a large emotional image, headline, subtitle, and two CTA buttons ("Donate" and "Emergency Cases").

**Files:**
- `src/modules/home/components/Hero.tsx`
- `src/app/(frontend)/[locale]/page.tsx`

**Acceptance Criteria:**
- [ ] Full-width hero with background image
- [ ] Headline and subtitle text are translated
- [ ] Two CTA buttons link to donate and emergency pages
- [ ] Responsive: stacks vertically on mobile
- [ ] Image is optimized with Next.js Image component

---

### T6.2: Build Home page — Statistics section

**What:** Create animated stat counters showing cats, dogs, treated, spayed, and vaccinated counts from SiteSettings.

**Files:**
- `src/modules/home/components/StatsSection.tsx`

**Acceptance Criteria:**
- [ ] Displays catsCount, dogsCount, treatedCount, spayedCount, vaccinatedCount
- [ ] Numbers animate (count-up) when scrolled into view
- [ ] Data comes from SiteSettings global
- [ ] Responsive grid layout (2 cols mobile, 5 cols desktop)

---

### T6.3: Build Home page — Featured sections

**What:** Create sections for featured animals, active emergency cases, recent blog posts, and support method cards. Each section links to its full page.

**Files:**
- `src/modules/home/components/FeaturedAnimals.tsx`
- `src/modules/home/components/ActiveEmergencies.tsx`
- `src/modules/home/components/RecentPosts.tsx`
- `src/modules/home/components/SupportCards.tsx`

**Acceptance Criteria:**
- [ ] Featured animals shows up to 4 animals marked as `featured`
- [ ] Active emergencies shows up to 3 cases with status `aktif`
- [ ] Recent posts shows latest 3 published blog posts
- [ ] Support cards show donation methods (IBAN, PayPal/Wise, supplies, volunteer)
- [ ] Each section has a "View All" link to the full page
- [ ] Data fetched from PayloadCMS local API

---

### T6.4: Build Home page — Supporter Comments

**What:** Display approved supporter testimonials in a carousel or grid.

**Files:**
- `src/modules/home/components/SupporterComments.tsx`

**Acceptance Criteria:**
- [ ] Only shows comments where `approved: true`
- [ ] Displays name, date, and comment text
- [ ] Carousel on mobile, grid on desktop
- [ ] Data from SupporterComments collection

---

### T6.5: Build Home page — Instagram feed section

**What:** Create a placeholder section for the Instagram feed (actual API integration in M10). Shows static placeholder images for now.

**Files:**
- `src/modules/home/components/InstagramFeed.tsx`

**Acceptance Criteria:**
- [ ] Grid layout for 6–9 posts
- [ ] Placeholder images with Instagram icon overlay
- [ ] "Follow us" link to Instagram profile
- [ ] Ready for API integration in M10

---

### T6.6: Assemble Home page

**What:** Combine all home sections into the page component with proper data fetching.

**Files:**
- `src/app/(frontend)/[locale]/page.tsx`
- `src/modules/home/index.ts`

**Acceptance Criteria:**
- [ ] All sections render in correct order
- [ ] ISR with 60-second revalidation
- [ ] SEO metadata (generateMetadata) is set
- [ ] Page is thin — all UI in module components

---

### T6.7: Build Story page

**What:** Create the "Hikayem" (My Story) page with personal narrative, earthquake story, daily routine timeline, and mission statement.

**Files:**
- `src/modules/story/components/StoryHero.tsx`
- `src/modules/story/components/Timeline.tsx`
- `src/modules/story/components/Mission.tsx`
- `src/app/(frontend)/[locale]/hikayem/page.tsx`
- `src/modules/story/index.ts`

**Acceptance Criteria:**
- [ ] Personal introduction section with photo
- [ ] Earthquake story section
- [ ] Daily routine as a visual timeline
- [ ] "Why I started this" section
- [ ] Goals/mission section
- [ ] Static page (build-time generation)
- [ ] All content translated (TR/EN)
- [ ] SEO metadata is set

---

### T6.8: Build Contact page

**What:** Create the contact page with WhatsApp link, phone number, email, and social media links.

**Files:**
- `src/modules/contact/components/ContactInfo.tsx`
- `src/modules/contact/components/ContactCard.tsx`
- `src/app/(frontend)/[locale]/iletisim/page.tsx`
- `src/modules/contact/index.ts`

**Acceptance Criteria:**
- [ ] WhatsApp button with pre-filled message
- [ ] Phone number with click-to-call
- [ ] Email with mailto link
- [ ] Social media links (Instagram)
- [ ] Contact info comes from SiteSettings global
- [ ] All text translated
- [ ] SEO metadata is set

---

### T6.9: Build Custom 404 page

**What:** Create a custom "page not found" page with a "lost paw" themed design and links to popular pages.

**Files:**
- `src/app/(frontend)/[locale]/not-found.tsx`

**Acceptance Criteria:**
- [ ] Custom illustration or design (paw theme)
- [ ] "Page not found" message in both TR and EN
- [ ] Links to home, animals, donate pages
- [ ] Search suggestion or search bar
- [ ] Consistent with design system

---

## Milestone Acceptance Criteria

- [ ] Home page renders all sections with real CMS data
- [ ] Story page renders with full translated content
- [ ] Contact page displays working WhatsApp, phone, email links
- [ ] 404 page renders for unknown routes
- [ ] All pages have correct SEO metadata
- [ ] All content is available in both TR and EN
- [ ] Pages are responsive (320px–1920px)

## Verification

1. Navigate to `/tr` — verify all home sections render with data
2. Navigate to `/en` — verify English translations
3. Click featured animals/emergencies — verify links work
4. Navigate to `/tr/hikayem` — verify story page with timeline
5. Navigate to `/tr/iletisim` — click WhatsApp button, verify wa.me link
6. Navigate to `/tr/nonexistent-page` — verify 404 page
7. Run Lighthouse — verify SEO score 90+
