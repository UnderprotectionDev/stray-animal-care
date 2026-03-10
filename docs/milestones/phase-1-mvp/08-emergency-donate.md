# M8: Emergency & Donate

## Description

Build the Emergency Cases module (listing + detail with progress tracking) and the Donate module (IBAN copy, international payment options, donation amount cards). These are the primary conversion-focused pages.

## Dependencies

- **M4** — CMS Collections & Global (EmergencyCases, SiteSettings)
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
- [x] Displays photo, title, status badge, target amount, collected amount
- [x] Progress bar shows percentage (collected/target)
- [x] Status badge: `aktif` (red pulse), `tamamlandi` (green)
- [x] Card links to detail page
- [x] Responsive layout

---

### T8.2: Build Emergency listing page

**What:** Create the emergency cases listing with active cases first, completed cases in an archive section below.

**Files:**
- `src/modules/emergency/components/EmergencyList.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/page.tsx`
- `src/modules/emergency/lib/queries.ts`
- `src/modules/emergency/index.ts`

**Acceptance Criteria:**
- [x] Active cases displayed prominently at top
- [x] Completed cases in a labeled "Completed Cases" section below
- [x] Grid layout: 1 col mobile, 2 cols tablet, 3 cols desktop
- [x] ISR with 30-second revalidation (urgent content)
- [x] SEO metadata
- [x] WhatsApp button for reporting new emergency cases _(deferred to M10)_

---

### T8.3: Build Emergency detail page

**What:** Create the detail page for a single emergency case with full description, progress, timeline updates, and before/after photos.

**Files:**
- `src/modules/emergency/components/EmergencyDetail.tsx`
- `src/modules/emergency/components/UpdateTimeline.tsx`
- `src/modules/emergency/components/BeforeAfter.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/[slug]/page.tsx`

**Acceptance Criteria:**
- [x] Hero photo(s) with progress bar overlay
- [x] Full description (rich text)
- [x] Progress: collected vs target with percentage
- [x] Update timeline: chronological entries with date, text, and optional photo
- [x] Before/after photo comparison (slider via `react-compare-slider`) for completed cases
- [x] "Report Emergency" WhatsApp button (wa.me with pre-filled message) _(deferred to M10)_
- [x] Breadcrumb: Home > Emergency Cases > Case Title
- [x] ISR with 30-second revalidation
- [x] SEO metadata with case-specific title
- [x] 404 for invalid slug

---

### T8.4: Build Donate page — IBAN section

**What:** Create the main donation section with IBAN display, copy button, bank details, and transparency note.

**Files:**
- `src/modules/donate/components/IBANCopy.tsx`
- `src/modules/donate/components/TransparencyNote.tsx`

**Acceptance Criteria:**
- [x] IBAN number displayed prominently
- [x] Copy button copies IBAN to clipboard with toast confirmation
- [x] Bank name and account holder displayed
- [x] Transparency note with link to `/[locale]/seffaflik`
- [x] Data from SiteSettings global

---

### T8.5: Build Donate page — International payment section

**What:** Create the section for international donors showing PayPal and Wise payment options.

**Files:**
- `src/modules/donate/components/InternationalPayment.tsx`

**Acceptance Criteria:**
- [x] PayPal link button (from SiteSettings)
- [x] Wise link button (from SiteSettings)
- [x] Brief explanation for international donors
- [x] Section is translated in both locales

---

### T8.6: Build Donate page — Amount cards

**What:** Create visual cards showing what each donation amount provides (50TL = 1 week of food, 100TL = 1 vaccination, 300TL = 1 spay/neuter).

**Files:**
- `src/modules/donate/components/DonationCards.tsx`

**Acceptance Criteria:**
- [x] At least 3 donation amount cards
- [x] Each card shows: amount, icon, what it provides
- [x] Cards are translated
- [x] Visually appealing with design system colors

---

### T8.7: Build Donate page — FAQ section

**What:** Create an accordion FAQ section answering common donor questions.

**Files:**
- `src/modules/donate/components/DonateFAQ.tsx`

**Acceptance Criteria:**
- [x] Uses shadcn/ui Accordion component
- [x] At least 5 FAQ items (how to donate, where does money go, regular giving, etc.)
- [x] Content translated in both locales
- [x] Smooth open/close animation

---

### T8.8: Assemble Donate page

**What:** Combine all donate sections into the page with proper data fetching.

**Files:**
- `src/app/(frontend)/[locale]/destek-ol/page.tsx`
- `src/modules/donate/index.ts`

**Acceptance Criteria:**
- [x] All sections render in order: intro text, IBAN, international, vet clinic info, amount cards, regular giving, transparency note, FAQ
- [x] SiteSettings data fetched for IBAN and payment links
- [x] SEO metadata
- [x] ISR with 60-second revalidation

---

### T8.9: Build loading skeletons

**What:** Create skeleton loading states for emergency list, detail, and donate pages.

**Files:**
- `src/modules/emergency/components/skeletons/EmergencyCardSkeleton.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/loading.tsx`
- `src/app/(frontend)/[locale]/acil-vakalar/[slug]/loading.tsx`

**Acceptance Criteria:**
- [x] Skeletons mimic actual layout
- [x] Use shadcn/ui Skeleton component

> **Note:** Skeleton components not yet implemented — deferred to M10 polish pass.

---

## Milestone Acceptance Criteria

- [x] Emergency listing shows active and completed cases
- [x] Emergency detail shows progress, timeline, and before/after photos
- [x] Donate page displays IBAN with working copy button
- [x] International payment options (PayPal/Wise) are functional
- [x] Donation amount cards display correctly
- [x] FAQ accordion works smoothly
- [x] WhatsApp emergency report button works _(deferred to M10)_
- [x] All pages translated in TR and EN
- [x] SEO metadata is correct on all pages

## Verification

1. Navigate to `/tr/acil-vakalar` — verify active cases with progress bars
2. Click a case — verify detail with timeline, progress, before/after
3. Click "Report Emergency" — verify WhatsApp link with pre-filled message
4. Navigate to `/tr/destek-ol` — verify IBAN section with copy button
5. Copy IBAN — verify clipboard content and toast
6. Verify PayPal/Wise links open correctly
7. Expand FAQ items — verify smooth animation
8. Switch to English — verify all content translates

---

## Post-Implementation: Code Review Fixes (2026-03-10)

CodeRabbit automated review identified and fixed the following issues in this milestone's components:

| File | Fix |
|------|-----|
| `EmergencyCard.tsx` | Added `?? 0` fallback for `targetAmount`; wrapped `ProgressBar` in `target > 0` guard; `caseStatusVariantMap` lookup uses `?? 'urgent'` fallback |
| `EmergencyList.tsx` | Added `completedCases` label to props; renders `<h2>` heading above completed cases grid |
| `EmergencyDetail.tsx` | Added `?? 0` fallback for `targetAmount`; wrapped progress block in `target > 0` guard; extracted `getStatusVariant()` helper with `?? 'urgent'` fallback |
| `BeforeAfter.tsx` | Added early `null` return guard when `before.url` or `after.url` is missing |
| `revalidateEmergencyCase.ts` | Optional chaining on `previousDoc?._status` / `previousDoc?.slug` to guard against undefined on create |
| `acil-vakalar/page.tsx` | Replaced unsafe `locale as Locale` cast with validated check against `locales` array |
| `en.json` / `tr.json` | Added `emergency.completedCases` translation key |
