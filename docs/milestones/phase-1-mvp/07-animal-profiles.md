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
- [ ] Displays photo (card-sized image from Media), name, type icon, age, gender, status badge
- [ ] Status badge colors: `tedavide` (yellow), `kalici-bakim` (green), `acil` (red)
- [ ] Card links to `/[locale]/canlarimiz/[slug]`
- [ ] Hover effect on desktop
- [ ] Responsive: card width adjusts to grid

---

### T7.2: Build AnimalFilter component

**What:** Create a filter component that allows users to filter by animal type (cat/dog/all).

**Files:**
- `src/modules/animals/components/AnimalFilter.tsx`

**Acceptance Criteria:**
- [ ] Three options: All, Cats (kedi), Dogs (kopek)
- [ ] Filter state synced to URL via Nuqs (`?type=kedi`)
- [ ] Filter updates the displayed animal list without full page reload
- [ ] Active filter is visually indicated
- [ ] Labels are translated (TR/EN)

---

### T7.3: Build Animals listing page

**What:** Assemble the listing page with filter and animal cards grid. Fetch animals from PayloadCMS.

**Files:**
- `src/modules/animals/components/AnimalList.tsx`
- `src/app/(frontend)/[locale]/canlarimiz/page.tsx`
- `src/modules/animals/lib/queries.ts`
- `src/modules/animals/index.ts`

**Acceptance Criteria:**
- [ ] Grid layout: 1 col mobile, 2 cols tablet, 3-4 cols desktop
- [ ] Filter component above grid
- [ ] Animals fetched from CMS local API with locale
- [ ] ISR with 60-second revalidation
- [ ] SEO metadata with generateMetadata
- [ ] Empty state message when no animals match filter
- [ ] Loading skeleton while data loads

---

### T7.4: Build photo gallery with lightbox

**What:** Create a photo gallery component for the animal detail page that supports multiple images with a lightbox viewer.

**Files:**
- `src/modules/animals/components/PhotoGallery.tsx`
- `src/modules/animals/components/Lightbox.tsx`

**Acceptance Criteria:**
- [ ] Displays all photos from the animal's `photos` field
- [ ] Main photo is hero-sized, thumbnails below
- [ ] Clicking a photo opens a lightbox overlay
- [ ] Lightbox supports prev/next navigation and close (Escape key)
- [ ] Images use Next.js Image with proper sizing
- [ ] Accessible: focus management, keyboard navigation

---

### T7.5: Build Animal detail page

**What:** Create the detail page for a single animal showing gallery, profile info, story, needs, and status.

**Files:**
- `src/modules/animals/components/AnimalDetail.tsx`
- `src/modules/animals/components/AnimalProfile.tsx`
- `src/app/(frontend)/[locale]/canlarimiz/[slug]/page.tsx`

**Acceptance Criteria:**
- [ ] Photo gallery at top (T7.4)
- [ ] Profile section: name, type, age, gender, status badge
- [ ] Story section: rich text content
- [ ] Needs section: rich text content
- [ ] Breadcrumb: Home > Animals > Animal Name
- [ ] ISR with 300-second revalidation
- [ ] SEO metadata with animal-specific title and description
- [ ] `generateStaticParams` for static generation of all animal pages
- [ ] 404 if slug doesn't match any animal

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

---

## Milestone Acceptance Criteria

- [ ] Animals listing page shows all animals from CMS
- [ ] Cat/Dog filter works and syncs to URL
- [ ] Animal detail page shows complete profile with gallery
- [ ] Lightbox opens, navigates, and closes correctly
- [ ] Status badges display correct colors
- [ ] Breadcrumb shows correct hierarchy on detail page
- [ ] Both pages work in TR and EN
- [ ] Loading skeletons display during data fetch
- [ ] SEO metadata is correct on both pages

## Verification

1. Navigate to `/tr/canlarimiz` — verify grid of animal cards
2. Click "Cats" filter — verify only cats are shown, URL updates to `?type=kedi`
3. Click an animal card — verify detail page loads with gallery, profile, story
4. Click a gallery photo — verify lightbox opens with navigation
5. Check breadcrumb: Home > Canlarimiz > Animal Name
6. Switch to English — verify all labels and content switch
7. Navigate to `/tr/canlarimiz/nonexistent` — verify 404
8. View page source — verify SEO metadata
