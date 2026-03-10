# M4: CMS Collections & Global

## Description

Define all 7 PayloadCMS collections and the SiteSettings global with full field schemas, localization, and seed data. This milestone makes CMS content manageable through the admin panel.

## Dependencies

- **M1** — Project Scaffolding & Infrastructure
- **M3** — Internationalization (i18n) — needed for localized field configuration

## Scope

- 7 Collections: Animals, BlogPosts, EmergencyCases, NeedsList, TransparencyReports, SupporterComments, Media
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
- [ ] Upload accepts PNG, JPEG, WebP, SVG, and PDF
- [ ] Three image sizes generated: thumbnail (300x300), card (600x400), hero (1920x1080)
- [ ] `alt` field is required and localized (TR/EN)
- [ ] Max file size is enforced (5MB)
- [ ] Media appears in admin panel under appropriate group

---

### T4.2: Create Animals collection

**What:** Define the Animals collection with all fields from the PRD schema including name, type, status, photos, story, and needs.

**Files:**
- `src/modules/animals/collection.ts`
- `src/modules/animals/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (name, slug, type, age, gender, status, photos, story, needs, featured)
- [ ] `name`, `age`, `story`, `needs` fields are localized
- [ ] `slug` is unique and required
- [ ] `type` select: `kedi`, `kopek`
- [ ] `status` select: `tedavide`, `kalici-bakim`, `acil`
- [ ] `photos` is a hasMany upload relationship to Media
- [ ] SEO plugin fields are included

---

### T4.3: Create BlogPosts collection

**What:** Define the BlogPosts collection with title, content, category, tags, cover image, and publication status.

**Files:**
- `src/modules/blog/collection.ts`
- `src/modules/blog/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (title, slug, category, tags, date, content, coverImage, excerpt, published)
- [ ] `title`, `content`, `excerpt` fields are localized
- [ ] `tags` is an array of text fields
- [ ] `category` options: `kurtarma`, `tedavi`, `gunluk`, `duyuru`, `etkinlik`
- [ ] `published` checkbox defaults to `false`
- [ ] SEO plugin fields are included

---

### T4.4: Create EmergencyCases collection

**What:** Define the EmergencyCases collection with progress tracking, timeline updates, and before/after photos.

**Files:**
- `src/modules/emergency/collection.ts`
- `src/modules/emergency/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (title, animal, slug, description, targetAmount, collectedAmount, status, updates, photos, beforePhoto, afterPhoto)
- [ ] `title`, `description` fields are localized
- [ ] `updates` array has date, text (localized richText), and photo fields
- [ ] `animal` is a relationship to the Animals collection
- [ ] `status` options: `aktif`, `tamamlandi`
- [ ] `collectedAmount` defaults to 0

---

### T4.5: Create NeedsList collection

**What:** Define the NeedsList collection for supply/needs tracking with urgency levels and ordering.

**Files:**
- `src/modules/supplies/collection.ts`
- `src/modules/supplies/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (productName, brandDetail, urgency, stockStatus, order)
- [ ] `productName`, `brandDetail`, `stockStatus` fields are localized
- [ ] `urgency` options: `acil`, `orta`, `yeterli`
- [ ] `order` field allows manual sorting

---

### T4.6: Create TransparencyReports collection

**What:** Define the TransparencyReports collection for monthly financial reports with expense breakdowns and document uploads.

**Files:**
- `src/modules/transparency/collection.ts`
- `src/modules/transparency/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (month, title, expenses array, totalExpense, totalDonation, documents, donorList)
- [ ] `title`, `expenses.category` fields are localized
- [ ] `documents` is a hasMany upload relationship to Media
- [ ] `expenses` is an array with category and amount

---

### T4.7: Create SupporterComments collection

**What:** Define the SupporterComments collection with moderation (approved checkbox) for displaying testimonials.

**Files:**
- `src/modules/donate/collection.ts`
- `src/modules/donate/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (name, comment, date, approved)
- [ ] `comment` field is localized
- [ ] `approved` defaults to `false` (moderation workflow)

---

### T4.8: Create SiteSettings global

**What:** Define the SiteSettings global for IBAN info, contact details, international payment links, and statistics.

**Files:**
- `src/modules/settings/global.ts`
- `src/modules/settings/index.ts`

**Acceptance Criteria:**
- [ ] All fields match PRD schema (bankName, accountHolder, iban, phone, email, whatsapp, instagram, paypalLink, wiseLink, stats group)
- [ ] Stats group includes: catsCount, dogsCount, treatedCount, spayedCount, vaccinatedCount
- [ ] Global is accessible in admin panel under "Settings" group

---

### T4.9: Register collections and global in Payload config

**What:** Import all collections and the global into `payload.config.ts` and configure admin panel navigation groups.

**Files:**
- `src/payload.config.ts`

**Acceptance Criteria:**
- [ ] All 7 collections are registered in the config
- [ ] SiteSettings global is registered
- [ ] Admin navigation groups: Content (Animals, Blog Posts, Emergency Cases), Support (Needs List, Supporter Comments), Reports (Transparency Reports), Settings (Site Settings)
- [ ] PayloadCMS SEO plugin is installed and configured

---

### T4.10: Install PayloadCMS SEO plugin

**What:** Add the `@payloadcms/plugin-seo` package and configure it for collections that need SEO metadata.

**Files:**
- `src/payload.config.ts` (plugin config)

**Acceptance Criteria:**
- [ ] SEO plugin is installed
- [ ] SEO fields (title, description, image) appear in Animals, BlogPosts, EmergencyCases collections
- [ ] Generated types include SEO fields

---

### T4.11: Generate TypeScript types

**What:** Run PayloadCMS type generation to create the auto-generated types file.

**Files:**
- `src/types/payload-types.ts` (auto-generated)

**Acceptance Criteria:**
- [ ] `pnpm run generate:types` produces `payload-types.ts`
- [ ] All collections and globals have corresponding TypeScript interfaces
- [ ] Types are importable throughout the project

---

### T4.12: Create seed data script

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
- [ ] `pnpm run seed` populates the database with sample data
- [ ] At least 4 animals (2 cats, 2 dogs) with both TR and EN content
- [ ] At least 2 blog posts with both locales
- [ ] At least 2 emergency cases (1 active, 1 completed)
- [ ] At least 4 needs list items with varying urgency
- [ ] SiteSettings populated with placeholder IBAN, contact, and stats

---

## Milestone Acceptance Criteria

- [ ] All 7 collections are visible in the admin panel
- [ ] SiteSettings global is editable in the admin panel
- [ ] Localized fields show TR/EN tabs in admin
- [ ] Seed data is loaded and visible
- [ ] TypeScript types are generated and match the schemas
- [ ] Media uploads work (image upload, resize, alt text)
- [ ] Admin navigation groups are correctly organized

## Verification

1. Open `/admin` — confirm all collections appear in the sidebar
2. Create a new Animal via admin — confirm all fields are present including locale tabs
3. Upload an image — confirm thumbnail, card, and hero sizes are generated
4. Edit SiteSettings — confirm all fields are editable
5. Run `pnpm run seed` — confirm sample data appears in collections
6. Run `pnpm run generate:types` — confirm types file is created
7. Verify admin navigation groups match the specification
