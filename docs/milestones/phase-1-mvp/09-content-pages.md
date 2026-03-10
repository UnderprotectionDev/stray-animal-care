# M9: Content Pages

## Description

Build the remaining content pages: Supplies (needs list), Transparency (financial reports), Our Work (activities showcase), and Blog (listing + detail with tags/categories). These pages provide transparency, engagement, and SEO value.

## Dependencies

- **M4** — CMS Collections & Global (NeedsList, TransparencyReports, BlogPosts)
- **M5** — Layout Module (Header, Footer, Breadcrumb)

## Scope

- Supplies page (`/[locale]/mama-malzeme`)
- Transparency page (`/[locale]/seffaflik`)
- Our Work page (`/[locale]/calismalarimiz`)
- Blog listing page (`/[locale]/gunluk`)
- Blog detail page (`/[locale]/gunluk/[slug]`)
- Category, tag, and date filters for blog
- Social sharing for blog posts

## Tasks

### T9.1: Build Supplies page

**What:** Create the supplies/needs page showing the current needs list from CMS, organized by urgency, with shipping instructions.

**Files:**
- `src/modules/supplies/components/NeedsTable.tsx`
- `src/modules/supplies/components/ShippingInfo.tsx`
- `src/modules/supplies/components/SponsorProgram.tsx`
- `src/modules/supplies/lib/queries.ts`
- `src/app/(frontend)/[locale]/mama-malzeme/page.tsx`
- `src/modules/supplies/index.ts`

**Acceptance Criteria:**
- [x] Needs list displayed as a table/card grid sorted by urgency
- [x] Urgency badges: `acil` (red), `orta` (yellow), `yeterli` (green)
- [x] Product name, brand detail, and stock status shown per item
- [x] Shipping methods section with instructions
- [x] "Items we cannot accept" section
- [x] Feed sponsor program section
- [x] Data from NeedsList collection
- [x] ISR with 60-second revalidation
- [x] SEO metadata

---

### T9.2: Build Transparency page

**What:** Create the transparency page showing monthly financial reports with expense breakdowns, donation vs expense comparison, and document uploads.

**Files:**
- `src/modules/transparency/components/ReportList.tsx`
- `src/modules/transparency/components/ReportCard.tsx`
- `src/modules/transparency/components/ExpenseBreakdown.tsx`
- `src/modules/transparency/components/DonationComparison.tsx`
- `src/modules/transparency/lib/queries.ts`
- `src/app/(frontend)/[locale]/seffaflik/page.tsx`
- `src/modules/transparency/index.ts`

**Acceptance Criteria:**
- [x] Monthly reports listed in reverse chronological order
- [x] Each report shows: month, expense categories with amounts, total expense, total donation
- [x] Visual comparison chart (donation vs expense)
- [x] Document thumbnails (receipts, invoices) open in lightbox
- [x] Optional donor list (names of donors who gave permission)
- [x] Data from TransparencyReports collection
- [x] ISR with 3600-second revalidation
- [x] SEO metadata

---

### T9.3: Build Our Work page

**What:** Create the activities showcase page with sections for daily feeding, treatment, spaying, emergency response, vaccination, and shelter building.

**Files:**
- `src/modules/our-work/components/ActivitySection.tsx`
- `src/modules/our-work/components/PhotoGrid.tsx`
- `src/app/(frontend)/[locale]/calismalarimiz/page.tsx`
- `src/modules/our-work/index.ts`

**Acceptance Criteria:**
- [x] Six activity sections: feeding (~100 cats/dogs), treatment/rehabilitation, spaying, emergency response, vaccination, shelter building
- [x] Each section has a description and photo gallery
- [x] Content is translated (TR/EN)
- [x] Static page (build-time generation)
- [x] SEO metadata

---

### T9.4: Build BlogCard component

**What:** Create a card component for displaying a blog post preview with cover image, title, date, category, and excerpt.

**Files:**
- `src/modules/blog/components/BlogCard.tsx`

**Acceptance Criteria:**
- [x] Displays cover image, title, date, category badge, excerpt
- [x] Card links to `/[locale]/gunluk/[slug]`
- [x] Category badge is color-coded
- [x] Responsive layout

---

### T9.5: Build Blog filter component

**What:** Create filter controls for the blog listing — category tabs and tag filter.

**Files:**
- `src/modules/blog/components/BlogFilter.tsx`

**Acceptance Criteria:**
- [x] Category tabs: All, Rescue, Treatment, Daily, Announcement, Event
- [x] Tag filter (if tags exist in posts)
- [x] Filter state synced to URL via Nuqs
- [x] Labels translated (TR/EN)

---

### T9.6: Build Blog listing page

**What:** Assemble the blog listing page with filters and blog cards grid.

**Files:**
- `src/modules/blog/components/BlogList.tsx`
- `src/modules/blog/lib/queries.ts`
- `src/app/(frontend)/[locale]/gunluk/page.tsx`
- `src/modules/blog/index.ts`

**Acceptance Criteria:**
- [x] Blog cards in grid: 1 col mobile, 2 cols tablet, 3 cols desktop
- [x] Only `published: true` posts are shown
- [x] Category and tag filters work
- [x] Posts sorted by date (newest first)
- [x] ISR with 60-second revalidation
- [x] SEO metadata
- [x] Empty state when no posts match filter

---

### T9.7: Build Blog detail page

**What:** Create the blog post detail page with full rich text content, cover image, metadata, tags, and social sharing buttons.

**Files:**
- `src/modules/blog/components/BlogDetail.tsx`
- `src/modules/blog/components/SocialShare.tsx`
- `src/modules/blog/components/TagList.tsx`
- `src/app/(frontend)/[locale]/gunluk/[slug]/page.tsx`

**Acceptance Criteria:**
- [x] Cover image as hero
- [x] Title, date, category badge
- [x] Full rich text content rendered
- [x] Tag list displayed
- [x] Social share buttons (Twitter, Facebook, WhatsApp, copy link)
- [x] Breadcrumb: Home > Blog > Post Title
- [x] ISR with 300-second revalidation
- [x] SEO metadata with post-specific OG tags
- [x] `generateStaticParams` for all published posts
- [x] 404 for invalid slug or unpublished posts

---

### T9.8: Build loading skeletons

**What:** Create skeleton loading states for supplies, transparency, and blog pages.

**Files:**
- `src/app/(frontend)/[locale]/mama-malzeme/loading.tsx`
- `src/app/(frontend)/[locale]/seffaflik/loading.tsx`
- `src/app/(frontend)/[locale]/gunluk/loading.tsx`
- `src/app/(frontend)/[locale]/gunluk/[slug]/loading.tsx`

**Acceptance Criteria:**
- [x] Each loading state mimics the page layout
- [x] Uses shadcn/ui Skeleton component

---

## Milestone Acceptance Criteria

- [x] Supplies page displays needs list sorted by urgency
- [x] Transparency page shows monthly reports with expense breakdowns
- [x] Our Work page showcases all activity areas with photos
- [x] Blog listing shows published posts with working filters
- [x] Blog detail renders rich text content with social sharing
- [x] All pages translated in TR and EN
- [x] All dynamic pages have correct ISR timing
- [x] SEO metadata is correct on all pages

## Verification

1. Navigate to `/tr/mama-malzeme` — verify needs table with urgency badges
2. Navigate to `/tr/seffaflik` — verify reports with expense breakdown
3. Navigate to `/tr/calismalarimiz` — verify activity sections with photos
4. Navigate to `/tr/gunluk` — verify blog cards, click category filter
5. Click a blog post — verify detail with rich text, tags, social share
6. Click social share buttons — verify correct URLs
7. Check breadcrumb on blog detail page
8. Switch to English — verify translations across all pages
