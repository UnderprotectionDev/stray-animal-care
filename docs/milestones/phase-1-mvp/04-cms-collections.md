# M4: CMS Collections & Global

## Description

Define all 6 PayloadCMS collections and the SiteSettings global with full field schemas, localization, and seed data. This milestone makes CMS content manageable through the admin panel.

## Dependencies

- **M1** — Project Scaffolding & Infrastructure
- **M3** — Internationalization (i18n) — needed for localized field configuration

## Scope

- 6 Collections: Animals, BlogPosts, EmergencyCases, NeedsList, TransparencyReports, Media
- 1 Global: SiteSettings
- PayloadCMS SEO Plugin integration
- Admin panel navigation grouping
- Seed data script for development
- Auto-generated TypeScript types

## Tasks

### T4.1: Create Media collection

**What:** Define the Media collection with upload configuration, image sizes, and alt text field. This is a dependency for all other collections that reference uploaded files.

**Files:**
- `src/modules/media/collection.ts`
- `src/modules/media/index.ts`

**Acceptance Criteria:**
- [x] Upload accepts PNG, JPEG, WebP, SVG, and PDF
- [x] Three image sizes generated: thumbnail (300x300), card (600x400), hero (1920x1080)
- [x] `alt` field is required and localized (TR/EN)
- [x] Max file size is enforced (5MB)
- [x] Media appears in admin panel under appropriate group

---

### T4.2: Create Animals collection

**What:** Define the Animals collection with all fields from the PRD schema including name, type, status, photos, story, and needs.

**Files:**
- `src/modules/animals/collection.ts`
- `src/modules/animals/index.ts`

**Acceptance Criteria:**
- [x] All fields match PRD schema (name, slug, type, age, gender, status, photos, story, needs, featured)
- [x] `name`, `age`, `story`, `needs` fields are localized
- [x] `slug` is unique and required
- [x] `type` select: `kedi`, `kopek`
- [x] `status` select: `tedavide`, `kalici-bakim`, `acil`
- [x] `photos` is a hasMany upload relationship to Media
- [x] SEO plugin fields are included

---

### T4.3: Create BlogPosts collection

**What:** Define the BlogPosts collection with title, content, category, tags, cover image, and publication status.

**Files:**
- `src/modules/blog/collection.ts`
- `src/modules/blog/index.ts`

**Acceptance Criteria:**
- [x] All fields match PRD schema (title, slug, category, tags, date, content, coverImage, excerpt, published)
- [x] `title`, `content`, `excerpt` fields are localized
- [x] `tags` is an array of text fields
- [x] `category` options: `kurtarma`, `tedavi`, `gunluk`, `duyuru`, `etkinlik`
- [x] `published` checkbox defaults to `false`
- [x] SEO plugin fields are included

---

### T4.4: Create EmergencyCases collection

**What:** Define the EmergencyCases collection with progress tracking, timeline updates, and before/after photos.

**Files:**
- `src/modules/emergency/collection.ts`
- `src/modules/emergency/index.ts`

**Acceptance Criteria:**
- [x] All fields match PRD schema (title, animal, slug, description, targetAmount, collectedAmount, status, updates, photos, beforePhoto, afterPhoto)
- [x] `title`, `description` fields are localized
- [x] `updates` array has date, text (localized richText), and photo fields
- [x] `animal` is a relationship to the Animals collection
- [x] `status` options: `aktif`, `tamamlandi`
- [x] `collectedAmount` defaults to 0

---

### T4.5: Create NeedsList collection

**What:** Define the NeedsList collection for supply/needs tracking with urgency levels and ordering.

**Files:**
- `src/modules/supplies/collection.ts`
- `src/modules/supplies/index.ts`

**Acceptance Criteria:**
- [x] All fields match PRD schema (productName, brandDetail, urgency, stockStatus, order)
- [x] `productName`, `brandDetail`, `stockStatus` fields are localized
- [x] `urgency` options: `acil`, `orta`, `yeterli`
- [x] `order` field allows manual sorting

---

### T4.6: Create TransparencyReports collection

**What:** Define the TransparencyReports collection for monthly financial reports with expense breakdowns and document uploads.

**Files:**
- `src/modules/transparency/collection.ts`
- `src/modules/transparency/index.ts`

**Acceptance Criteria:**
- [x] All fields match PRD schema (month, title, expenses array, totalExpense, totalDonation, documents, donorList)
- [x] `title`, `expenses.category` fields are localized
- [x] `documents` is a hasMany upload relationship to Media
- [x] `expenses` is an array with category and amount

---

### T4.7: Create SiteSettings global

**What:** Define the SiteSettings global for IBAN info, contact details, international payment links, and statistics.

**Files:**
- `src/modules/settings/global.ts`
- `src/modules/settings/index.ts`

**Acceptance Criteria:**
- [x] All fields match PRD schema (bankName, accountHolder, iban, phone, email, whatsapp, instagram, paypalLink, wiseLink, stats group)
- [x] Stats group includes: catsCount, dogsCount, treatedCount, spayedCount, vaccinatedCount
- [x] Global is accessible in admin panel under "Settings" group

---

### T4.8: Register collections and global in Payload config

**What:** Import all collections and the global into `payload.config.ts` and configure admin panel navigation groups.

**Files:**
- `src/payload.config.ts`

**Acceptance Criteria:**
- [x] All 6 collections are registered in the config
- [x] SiteSettings global is registered
- [x] Admin navigation groups: Content (Animals, Blog Posts, Emergency Cases), Support (Needs List), Reports (Transparency Reports), Settings (Site Settings)
- [x] PayloadCMS SEO plugin is installed and configured

---

### T4.9: Install PayloadCMS SEO plugin

**What:** Add the `@payloadcms/plugin-seo` package and configure it for collections that need SEO metadata.

**Files:**
- `src/payload.config.ts` (plugin config)

**Acceptance Criteria:**
- [x] SEO plugin is installed
- [x] SEO fields (title, description, image) appear in Animals, BlogPosts, EmergencyCases collections
- [x] Generated types include SEO fields

---

### T4.10: Generate TypeScript types

**What:** Run PayloadCMS type generation to create the auto-generated types file.

**Files:**
- `src/types/payload-types.ts` (auto-generated)

**Acceptance Criteria:**
- [x] `pnpm run generate:types` produces `payload-types.ts`
- [x] All collections and globals have corresponding TypeScript interfaces
- [x] Types are importable throughout the project

---

### T4.11: Create seed data script

**What:** Build a seed script that populates the database with sample data for development — sample animals, blog posts, emergency cases, etc.

**Files:**
- `src/seed/index.ts`
- `src/seed/data/animals.ts`
- `src/seed/data/blog-posts.ts`
- `src/seed/data/emergency-cases.ts`
- `src/seed/data/needs-list.ts`
- `src/seed/data/site-settings.ts`
- `package.json` (add `seed` script)

**Acceptance Criteria:**
- [x] `pnpm run seed` populates the database with sample data
- [x] At least 4 animals (2 cats, 2 dogs) with both TR and EN content
- [x] At least 2 blog posts with both locales
- [x] At least 2 emergency cases (1 active, 1 completed)
- [x] At least 4 needs list items with varying urgency
- [x] SiteSettings populated with placeholder IBAN, contact, and stats

---

## Milestone Acceptance Criteria

- [x] All 6 collections are visible in the admin panel
- [x] SiteSettings global is editable in the admin panel
- [x] Localized fields show TR/EN tabs in admin
- [x] Seed data is loaded and visible
- [x] TypeScript types are generated and match the schemas
- [x] Media uploads work (image upload, resize, alt text)
- [x] Admin navigation groups are correctly organized

## Verification

1. Open `/admin` — confirm all collections appear in the sidebar
2. Create a new Animal via admin — confirm all fields are present including locale tabs
3. Upload an image — confirm thumbnail, card, and hero sizes are generated
4. Edit SiteSettings — confirm all fields are editable
5. Run `pnpm run seed` — confirm sample data appears in collections
6. Run `pnpm run generate:types` — confirm types file is created
7. Verify admin navigation groups match the specification
