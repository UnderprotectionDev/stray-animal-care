# M7: Animal Profiles

## Description

Build the animals listing page with filter functionality and the animal detail page with photo gallery, story, needs, and status badge. This module lets visitors browse and learn about animals in care.

## Dependencies

- **M4** — CMS Collections & Global (Animals collection, Media)
- **M5** — Layout Module (Header, Footer, Breadcrumb)

## Scope

- Animals listing page (`/[locale]/canlarimiz`)
- Animal detail page (`/[locale]/canlarimiz/[slug]`)
- Cat/Dog filter (toggle/tabs)
- Animal card component
- Photo gallery with lightbox
- Status badges (in treatment, permanent care, emergency)
- Breadcrumb on detail page
- Loading skeletons

## Tasks

### T7.1: Build AnimalCard component

**What:** Create a reusable card component for displaying an animal's thumbnail, name, type, age, gender, and status badge.

**Files:**
- `src/modules/animals/components/AnimalCard.tsx`

**Acceptance Criteria:**
- [x] Displays photo (card-sized image from Media), name, type icon, age, gender, status badge
- [x] Status badge colors: `tedavide` (yellow), `kalici-bakim` (green), `acil` (red)
- [x] Card links to `/[locale]/canlarimiz/[slug]`
- [x] Hover effect on desktop
- [x] Responsive: card width adjusts to grid

---

### T7.2: Build AnimalFilter component

**What:** Create a filter component that allows users to filter by animal type (cat/dog/all).

**Files:**
- `src/modules/animals/components/AnimalFilter.tsx`

**Acceptance Criteria:**
- [x] Three options: All, Cats (kedi), Dogs (kopek)
- [x] Filter state synced to URL via Nuqs (`?type=kedi`)
- [x] Filter updates the displayed animal list without full page reload
- [x] Active filter is visually indicated
- [x] Labels are translated (TR/EN)

---

### T7.3: Build Animals listing page

**What:** Assemble the listing page with filter and animal cards grid. Fetch animals from PayloadCMS.

**Files:**
- `src/modules/animals/components/AnimalList.tsx`
- `src/app/(frontend)/[locale]/canlarimiz/page.tsx`
- `src/modules/animals/lib/queries.ts`
- `src/modules/animals/index.ts`

**Acceptance Criteria:**
- [x] Grid layout: 1 col mobile, 2 cols tablet, 3-4 cols desktop
- [x] Filter component above grid
- [x] Animals fetched from CMS local API with locale
- [x] ISR with 60-second revalidation
- [x] SEO metadata with generateMetadata
- [x] Empty state message when no animals match filter
- [ ] Loading skeleton while data loads

---

### T7.4: Build photo gallery with lightbox

**What:** Create a photo gallery component for the animal detail page that supports multiple images with a lightbox viewer.

**Files:**
- `src/modules/animals/components/PhotoGallery.tsx`
- `src/modules/animals/components/Lightbox.tsx`

**Acceptance Criteria:**
- [x] Displays all photos from the animal's `photos` field
- [x] Main photo is hero-sized, thumbnails below
- [x] Clicking a photo opens a lightbox overlay
- [x] Lightbox supports prev/next navigation and close (Escape key)
- [x] Images use Next.js Image with proper sizing
- [x] Accessible: focus management, keyboard navigation

---

### T7.5: Build Animal detail page

**What:** Create the detail page for a single animal showing gallery, profile info, story, needs, and status.

**Files:**
- `src/modules/animals/components/AnimalDetail.tsx`
- `src/modules/animals/components/AnimalProfile.tsx`
- `src/app/(frontend)/[locale]/canlarimiz/[slug]/page.tsx`

**Acceptance Criteria:**
- [x] Photo gallery at top (T7.4)
- [x] Profile section: name, type, age, gender, status badge
- [x] Story section: rich text content
- [x] Needs section: rich text content
- [x] Breadcrumb: Home > Animals > Animal Name
- [x] ISR with 300-second revalidation
- [x] SEO metadata with animal-specific title and description
- [x] `generateStaticParams` for static generation of all animal pages
- [x] 404 if slug doesn't match any animal

---

### T7.6: Build loading skeletons

**What:** Create skeleton/loading UI components for the animals list and detail pages.

**Files:**
- `src/modules/animals/components/skeletons/AnimalCardSkeleton.tsx`
- `src/modules/animals/components/skeletons/AnimalDetailSkeleton.tsx`
- `src/app/(frontend)/[locale]/canlarimiz/loading.tsx`
- `src/app/(frontend)/[locale]/canlarimiz/[slug]/loading.tsx`

**Acceptance Criteria:**
- [ ] Skeleton mimics the card layout (photo placeholder, text lines)
- [ ] Skeleton mimics the detail layout (gallery, profile, text blocks)
- [ ] Skeletons use shadcn/ui Skeleton component
- [ ] Loading states appear while data fetches

> **Note:** Skeleton components not yet implemented — deferred to M10 polish pass.

---

## Milestone Acceptance Criteria

- [x] Animals listing page shows all animals from CMS
- [x] Cat/Dog filter works and syncs to URL
- [x] Animal detail page shows complete profile with gallery
- [x] Lightbox opens, navigates, and closes correctly
- [x] Status badges display correct colors
- [x] Breadcrumb shows correct hierarchy on detail page
- [x] Both pages work in TR and EN
- [ ] Loading skeletons display during data fetch _(deferred to M10)_
- [x] SEO metadata is correct on both pages

## Verification

1. Navigate to `/tr/canlarimiz` — verify grid of animal cards
2. Click "Cats" filter — verify only cats are shown, URL updates to `?type=kedi`
3. Click an animal card — verify detail page loads with gallery, profile, story
4. Click a gallery photo — verify lightbox opens with navigation
5. Check breadcrumb: Home > Canlarimiz > Animal Name
6. Switch to English — verify all labels and content switch
7. Navigate to `/tr/canlarimiz/nonexistent` — verify 404
8. View page source — verify SEO metadata

---

## Post-Implementation: Code Review Fixes (2026-03-10)

CodeRabbit automated review identified and fixed the following issues in this milestone's components:

| File | Fix |
|------|-----|
| `AnimalFilter.tsx` | Added `type="button"` and `aria-pressed` to filter buttons for accessibility |
| `AnimalList.tsx` | Removed non-null assertion on `animalStatus`; safe lookup with `''` fallback |
| `AnimalCard.tsx` | Guarded `StatusBadge` render; `statusVariantMap` lookup uses `?? 'pending'` fallback |
| `AnimalDetail.tsx` | Added `p !== null` check in photo filter; extracted `const status` to guard `StatusBadge` and `statusLabel`; replaced hardcoded Turkish WhatsApp message with `t('detail.whatsappMessage', { name })` |
| `PhotoGallery.tsx` | Added `type="button"` to hero and thumbnail buttons; removed redundant `sm:grid-cols-4`; improved hero `aria-label` |
| `canlarimiz/page.tsx` | Replaced unsafe `locale as Locale` cast with validated check against `locales` array |
