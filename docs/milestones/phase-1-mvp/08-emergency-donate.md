# M8: Emergency & Donate

## Description

Build the Emergency Cases module (listing + detail with progress tracking) and the Donate module (IBAN copy, international payment options, donation amount cards). These are the primary conversion-focused pages.

## Dependencies

- **M4** — CMS Collections & Global (EmergencyCases, SupporterComments, SiteSettings)
- **M5** — Layout Module (Header, Footer, Breadcrumb)

## Scope

- Emergency cases listing page (`/[locale]/acil-vakalar`)
- Emergency case detail page (`/[locale]/acil-vakalar/[slug]`)
- Donate page (`/[locale]/destek-ol`)
- Progress bar for donation targets
- Timeline/update history for cases
- Before/after photo comparison
- IBAN copy-to-clipboard
- Donation amount cards (50TL = 1 week of food, etc.)
- FAQ accordion

## Tasks

### T8.1: Build EmergencyCard component

**What:** Create a card component for displaying an emergency case with photo, title, status, target/collected amounts, and progress bar.

**Files:**
- `src/modules/emergency/components/EmergencyCard.tsx`

**Acceptance Criteria:**
- [ ] Displays photo, title, status badge, target amount, collected amount
- [ ] Progress bar shows percentage (collected/target)
- [ ] Status badge: `aktif` (red pulse), `tamamlandi` (green)
- [ ] Card links to detail page
- [ ] Responsive layout

---

### T8.2: Build Emergency listing page

**What:** Create the emergency cases listing with active cases first, completed cases in an archive section below.

**Files:**
- `src/modules/emergency/components/EmergencyList.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/page.tsx`
- `src/modules/emergency/lib/queries.ts`
- `src/modules/emergency/index.ts`

**Acceptance Criteria:**
- [ ] Active cases displayed prominently at top
- [ ] Completed cases in a collapsible "Archive" section below
- [ ] Grid layout: 1 col mobile, 2 cols tablet, 3 cols desktop
- [ ] ISR with 30-second revalidation (urgent content)
- [ ] SEO metadata
- [ ] WhatsApp button for reporting new emergency cases

---

### T8.3: Build Emergency detail page

**What:** Create the detail page for a single emergency case with full description, progress, timeline updates, and before/after photos.

**Files:**
- `src/modules/emergency/components/EmergencyDetail.tsx`
- `src/modules/emergency/components/UpdateTimeline.tsx`
- `src/modules/emergency/components/BeforeAfter.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/[slug]/page.tsx`

**Acceptance Criteria:**
- [ ] Hero photo(s) with progress bar overlay
- [ ] Full description (rich text)
- [ ] Progress: collected vs target with percentage
- [ ] Update timeline: chronological entries with date, text, and optional photo
- [ ] Before/after photo comparison (side-by-side or slider) for completed cases
- [ ] "Report Emergency" WhatsApp button (wa.me with pre-filled message)
- [ ] Breadcrumb: Home > Emergency Cases > Case Title
- [ ] ISR with 30-second revalidation
- [ ] SEO metadata with case-specific title
- [ ] 404 for invalid slug

---

### T8.4: Build Donate page — IBAN section

**What:** Create the main donation section with IBAN display, copy button, bank details, and transparency note.

**Files:**
- `src/modules/donate/components/IBANCopy.tsx`
- `src/modules/donate/components/TransparencyNote.tsx`

**Acceptance Criteria:**
- [ ] IBAN number displayed prominently
- [ ] Copy button copies IBAN to clipboard with toast confirmation
- [ ] Bank name and account holder displayed
- [ ] Transparency note with link to `/[locale]/seffaflik`
- [ ] Data from SiteSettings global

---

### T8.5: Build Donate page — International payment section

**What:** Create the section for international donors showing PayPal and Wise payment options.

**Files:**
- `src/modules/donate/components/InternationalPayment.tsx`

**Acceptance Criteria:**
- [ ] PayPal link button (from SiteSettings)
- [ ] Wise link button (from SiteSettings)
- [ ] Brief explanation for international donors
- [ ] Section is translated in both locales

---

### T8.6: Build Donate page — Amount cards

**What:** Create visual cards showing what each donation amount provides (50TL = 1 week of food, 100TL = 1 vaccination, 300TL = 1 spay/neuter).

**Files:**
- `src/modules/donate/components/DonationCards.tsx`

**Acceptance Criteria:**
- [ ] At least 3 donation amount cards
- [ ] Each card shows: amount, icon, what it provides
- [ ] Cards are translated
- [ ] Visually appealing with design system colors

---

### T8.7: Build Donate page — FAQ section

**What:** Create an accordion FAQ section answering common donor questions.

**Files:**
- `src/modules/donate/components/DonateFAQ.tsx`

**Acceptance Criteria:**
- [ ] Uses shadcn/ui Accordion component
- [ ] At least 5 FAQ items (how to donate, where does money go, regular giving, etc.)
- [ ] Content translated in both locales
- [ ] Smooth open/close animation

---

### T8.8: Assemble Donate page

**What:** Combine all donate sections into the page with proper data fetching.

**Files:**
- `src/app/(frontend)/[locale]/destek-ol/page.tsx`
- `src/modules/donate/index.ts`

**Acceptance Criteria:**
- [ ] All sections render in order: intro text, IBAN, international, vet clinic info, amount cards, regular giving, transparency note, FAQ
- [ ] SiteSettings data fetched for IBAN and payment links
- [ ] SEO metadata
- [ ] ISR with 60-second revalidation

---

### T8.9: Build loading skeletons

**What:** Create skeleton loading states for emergency list, detail, and donate pages.

**Files:**
- `src/modules/emergency/components/skeletons/EmergencyCardSkeleton.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/loading.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/[slug]/loading.tsx`

**Acceptance Criteria:**
- [ ] Skeletons mimic actual layout
- [ ] Use shadcn/ui Skeleton component

---

## Milestone Acceptance Criteria

- [ ] Emergency listing shows active and archived cases
- [ ] Emergency detail shows progress, timeline, and before/after photos
- [ ] Donate page displays IBAN with working copy button
- [ ] International payment options (PayPal/Wise) are functional
- [ ] Donation amount cards display correctly
- [ ] FAQ accordion works smoothly
- [ ] WhatsApp emergency report button works
- [ ] All pages translated in TR and EN
- [ ] SEO metadata is correct on all pages

## Verification

1. Navigate to `/tr/acil-vakalar` — verify active cases with progress bars
2. Click a case — verify detail with timeline, progress, before/after
3. Click "Report Emergency" — verify WhatsApp link with pre-filled message
4. Navigate to `/tr/destek-ol` — verify IBAN section with copy button
5. Copy IBAN — verify clipboard content and toast
6. Verify PayPal/Wise links open correctly
7. Expand FAQ items — verify smooth animation
8. Switch to English — verify all content translates
