# 03 — Technical Specifications

---

## 3.1 Tech Stack

| Layer               | Technology                                                     |
| ------------------- | -------------------------------------------------------------- |
| Framework           | Next.js 15 (App Router)                                        |
| Language            | TypeScript                                                     |
| Styling             | Tailwind CSS 4                                                 |
| UI Library          | shadcn/ui (base-vega style, @base-ui/react)                    |
| CMS                 | PayloadCMS 3.x (embedded in Next.js)                           |
| Database            | PostgreSQL (Neon — serverless, @payloadcms/db-postgres)        |
| Hosting             | Vercel                                                         |
| Media Storage       | Vercel Blob (@payloadcms/storage-vercel-blob)                  |
| Analytics           | Vercel Analytics                                               |
| Animation           | GSAP + @gsap/react (primary) + motion (secondary) + OGL (WebGL)|
| i18n (Routing)      | next-intl (middleware, routing only — no JSON translation files)|
| i18n (Content)      | PayloadCMS localization (tr default, en with fallback)         |
| i18n (UI Text)      | UIStrings global (~235 localized fields, 12 tabs)              |
| SEO                 | Next.js Metadata API + PayloadCMS SEO Plugin                   |
| Form Validation     | Zod + TanStack Form                                            |
| Package Manager     | pnpm                                                           |
| Linting             | ESLint (next/core-web-vitals + next/typescript)                |
| Rich Text           | Lexical (@payloadcms/richtext-lexical) + TextColorFeature + TextSizeFeature |
| Search              | PayloadCMS fullText search + Nuqs (URL state)                  |
| State Management    | Nuqs (search/filter URL state)                                 |

---

## 3.2 Architecture

### File Structure

```
stray-animal-care/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── [locale]/
│   │   │   │   ├── page.tsx                      # Homepage (block-driven)
│   │   │   │   ├── hikayem/page.tsx              # My Story
│   │   │   │   ├── calismalarimiz/page.tsx       # Our Work
│   │   │   │   ├── canlarimiz/
│   │   │   │   │   ├── page.tsx                  # Our Animals
│   │   │   │   │   └── [slug]/page.tsx           # Animal Detail
│   │   │   │   ├── destek-ol/page.tsx            # Support Us
│   │   │   │   ├── mama-malzeme/page.tsx         # Food & Supplies
│   │   │   │   ├── acil-vakalar/
│   │   │   │   │   ├── page.tsx                  # Emergency Cases
│   │   │   │   │   └── [slug]/page.tsx           # Case Detail
│   │   │   │   ├── seffaflik/page.tsx            # Transparency
│   │   │   │   ├── posts/
│   │   │   │   │   ├── page.tsx                  # Blog List
│   │   │   │   │   └── [slug]/page.tsx           # Blog Detail
│   │   │   │   ├── gonullu-ol/page.tsx           # Volunteer
│   │   │   │   ├── gelecek-vizyonu/page.tsx      # Future Vision
│   │   │   │   ├── [slug]/page.tsx               # CMS Pages (catch-all)
│   │   │   │   └── not-found.tsx                 # Custom 404
│   │   │   ├── layout.tsx                        # Frontend layout
│   │   │   └── globals.css                       # Global styles + design tokens
│   │   ├── (payload)/
│   │   │   ├── admin/[[...segments]]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── importMap.js
│   │   │   ├── api/[...slug]/route.ts
│   │   │   └── layout.tsx
│   │   ├── layout.tsx                            # Root layout
│   │   ├── error.tsx                             # Error boundary
│   │   └── global-error.tsx                      # Global error boundary
│   │
│   ├── collections/              # PayloadCMS collection definitions
│   │   ├── Animals/
│   │   ├── EmergencyCases/
│   │   ├── VetRecords/
│   │   ├── Events/
│   │   ├── Volunteers/
│   │   ├── Pages/
│   │   ├── Posts/
│   │   ├── Categories/
│   │   ├── NeedsList/
│   │   ├── TransparencyReports/
│   │   ├── Media/
│   │   └── Users/
│   │
│   ├── modules/                  # Feature modules (domain-based)
│   │   ├── animals/              # components/ + lib/ + index.ts
│   │   ├── blog/
│   │   ├── donate/
│   │   ├── emergency/
│   │   ├── our-work/
│   │   ├── supplies/
│   │   └── transparency/
│   │
│   ├── components/
│   │   ├── home/                 # Homepage section components
│   │   ├── shared/               # Reusable components (Section, Container, etc.)
│   │   ├── fancy/                # Animation components (FlowingMenu, etc.)
│   │   └── ui/                   # shadcn/ui components
│   │
│   ├── blocks/
│   │   ├── homepage/             # 10 homepage block type definitions
│   │   ├── ArchiveBlock/
│   │   ├── Banner/
│   │   ├── CallToAction/
│   │   ├── Code/
│   │   ├── Content/
│   │   ├── MediaBlock/
│   │   ├── Mission/
│   │   ├── RelatedPosts/
│   │   └── Timeline/
│   │
│   ├── globals/
│   │   └── UIStrings/            # UIStrings global (12 tabs, ~235 localized fields)
│   │
│   ├── Header/                   # Header global config + components
│   ├── Footer/                   # Footer component
│   ├── SiteSettings/             # SiteSettings global config
│   │
│   ├── fields/                   # Reusable field configs (defaultLexical, link, linkGroup)
│   ├── hooks/                    # Payload lifecycle hooks
│   ├── access/                   # Access control functions
│   ├── search/                   # Search field overrides and sync hooks
│   ├── heros/                    # Hero section components
│   ├── utilities/                # Utility functions (shadcn utils alias: @/utilities/ui)
│   ├── providers/                # React context providers
│   │
│   ├── i18n/                     # next-intl config (routing only, no JSON translations)
│   │   ├── config.ts
│   │   ├── request.ts
│   │   └── navigation.ts         # Link, redirect, usePathname, useRouter
│   │
│   ├── middleware.ts              # next-intl middleware
│   ├── payload.config.ts
│   └── payload-types.ts          # Auto-generated types
│
├── tests/
│   ├── int/                      # Integration tests (*.int.spec.ts)
│   ├── e2e/                      # E2E tests (Playwright)
│   └── helpers/                  # Shared test helpers
│
├── public/
│   ├── images/
│   └── favicon.ico
├── docs/
├── next.config.ts
├── tailwind.config.mjs
├── .eslintrc.json
├── tsconfig.json
├── package.json
└── .env
```

### Module Structure

Each module in `src/modules/` contains:
```
modules/<module-name>/
├── components/           # React components
├── lib/                  # Utility functions, queries, constants
└── index.ts              # Barrel exports (REQUIRED)
```

> **Note:** Collection definitions live in `src/collections/`, NOT inside modules. Modules contain only frontend components and query logic.

### Homepage Block System

The homepage uses a CMS-driven block builder configured in `SiteSettings.homepageBlocks`. 10 block types defined in `src/blocks/homepage/`:

`homeHero`, `homeStats`, `homeStory`, `homeOurWork`, `homeFeaturedAnimals`, `homeActiveEmergencies`, `homeSupportCards`, `homeNeedsList`, `homeRecentPosts`, `homeTransparencyBanner`

`RenderHomepageBlocks.tsx` maps blocks to components with special behavior:
- Each block has an `enabled` flag — disabled blocks render nothing
- `homeRecentPosts` + `homeTransparencyBanner` are combined into a single `PostsAndTransparency` component when both enabled
- `SectionDividerBand` components are injected programmatically after `homeStory` and `homeSupportCards`
- Data is fetched optimistically in `page.tsx` — only collections needed by active blocks are queried

### Routing Structure

| URL                             | Page               | Dynamic |
| ------------------------------- | ------------------ | ------- |
| `/[locale]`                     | Home Page          | No      |
| `/[locale]/hikayem`             | My Story           | No      |
| `/[locale]/calismalarimiz`      | Our Work           | No      |
| `/[locale]/canlarimiz`          | Our Animals        | No      |
| `/[locale]/canlarimiz/[slug]`   | Animal Detail      | Yes     |
| `/[locale]/destek-ol`           | Support Us         | No      |
| `/[locale]/mama-malzeme`        | Food & Supplies    | No      |
| `/[locale]/acil-vakalar`        | Emergency Cases    | No      |
| `/[locale]/acil-vakalar/[slug]` | Case Detail        | Yes     |
| `/[locale]/seffaflik`           | Transparency       | No      |
| `/[locale]/posts`               | Blog List          | No      |
| `/[locale]/posts/[slug]`        | Blog Detail        | Yes     |
| `/[locale]/gonullu-ol`          | Volunteer          | No      |
| `/[locale]/gelecek-vizyonu`     | Future Vision      | No      |
| `/[locale]/[slug]`              | CMS Pages          | Yes     |
| `/admin`                        | CMS Admin Panel    | —       |
| `/admin/hayvan-takip`           | Animal Tracking    | —       |
| `/admin/vaka-takip`             | Case Tracking      | —       |
| `/admin/gonullu-yonetim`        | Volunteer Mgmt     | —       |

---

## 3.3 PayloadCMS Collection Schemas

> **Note:** All collections automatically include `createdAt` and `updatedAt` fields added by PayloadCMS. Database uses `push: true` — schema changes are auto-synced, no migration workflow.

### Collection: Animals

```typescript
{
  slug: 'animals',
  labels: { singular: 'Hayvan', plural: 'Hayvanlar' },
  fields: [
    // General tab
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'type', type: 'select', options: ['kedi', 'kopek'], required: true },
    { name: 'age', type: 'text', localized: true },
    { name: 'gender', type: 'select', options: ['erkek', 'disi'], required: true },
    { name: 'animalStatus', type: 'select', options: ['tedavide', 'kalici-bakim', 'acil'], required: true },
    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'story', type: 'richText', localized: true },
    { name: 'needs', type: 'richText', localized: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    // Health tab
    { name: 'location', type: 'text', localized: true },
    { name: 'weight', type: 'number' },
    { name: 'microchipId', type: 'text' },
    { name: 'isSpayed', type: 'checkbox' },
    { name: 'isVaccinated', type: 'checkbox' },
  ]
}
```

### Collection: Posts

```typescript
{
  slug: 'posts',
  labels: { singular: 'Yazi', plural: 'Yazilar' },
  // versions/drafts enabled, SEO plugin
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'categories', type: 'relationship', relationTo: 'categories', hasMany: true },
    { name: 'publishedAt', type: 'date' },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'relatedPosts', type: 'relationship', relationTo: 'posts', hasMany: true },
  ]
}
```

### Collection: Emergency Cases

```typescript
{
  slug: 'emergency-cases',
  labels: { singular: 'Acil Vaka', plural: 'Acil Vakalar' },
  // trash: true enabled
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'animal', type: 'relationship', relationTo: 'animals' },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'richText', required: true, localized: true },
    { name: 'targetAmount', type: 'number', required: true },
    { name: 'collectedAmount', type: 'number', defaultValue: 0 },
    { name: 'caseStatus', type: 'select', options: ['aktif', 'tamamlandi'], required: true },
    // Note: uses `caseStatus` (not `status`) to avoid conflict with Payload's _status enum
    { name: 'updates', type: 'array', fields: [
      { name: 'date', type: 'date' },
      { name: 'text', type: 'richText', localized: true },
      { name: 'photo', type: 'upload', relationTo: 'media' },
    ]},
    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'beforePhoto', type: 'upload', relationTo: 'media' },
    { name: 'afterPhoto', type: 'upload', relationTo: 'media' },
  ]
}
```

### Collection: Needs List

```typescript
{
  slug: 'needs-list',
  labels: { singular: 'Ihtiyac', plural: 'Ihtiyac Listesi' },
  fields: [
    { name: 'productName', type: 'text', required: true, localized: true },
    { name: 'brandDetail', type: 'text', localized: true },
    { name: 'priority', type: 'select', options: ['acil', 'yuksek', 'orta', 'dusuk'], required: true },
    { name: 'currentStock', type: 'number' },
    { name: 'targetStock', type: 'number', required: true },
    { name: 'unit', type: 'select', options: ['kutu', 'kg', 'adet'] },
    { name: 'order', type: 'number' },
  ]
}
```

### Collection: Transparency Reports

```typescript
{
  slug: 'transparency-reports',
  labels: { singular: 'Seffaflik Raporu', plural: 'Seffaflik Raporlari' },
  // trash: true enabled
  fields: [
    { name: 'month', type: 'date', required: true },
    { name: 'title', type: 'text', localized: true },
    { name: 'expenses', type: 'array', fields: [
      { name: 'category', type: 'text', localized: true },
      { name: 'amount', type: 'number' },
    ]},
    { name: 'totalExpense', type: 'number', required: true },
    { name: 'totalDonation', type: 'number', required: true },
    { name: 'documents', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'donorList', type: 'array', fields: [
      { name: 'name', type: 'text' },
    ]},
  ]
}
```

### Collection: VetRecords

```typescript
{
  slug: 'vet-records',
  labels: { singular: 'Veteriner Kaydi', plural: 'Veteriner Kayitlari' },
  // admin-only, trash: true
  fields: [
    { name: 'animal', type: 'relationship', relationTo: 'animals', required: true },
    { name: 'recordType', type: 'select', options: ['muayene', 'ameliyat', 'asilama', 'tedavi'] },
    { name: 'date', type: 'date', required: true },
    { name: 'description', type: 'richText', localized: true },
    { name: 'medications', type: 'array', fields: [
      { name: 'name', type: 'text' },
      { name: 'dosage', type: 'text' },
    ]},
    { name: 'documents', type: 'upload', relationTo: 'media', hasMany: true },
  ]
}
```

### Collection: Events

```typescript
{
  slug: 'events',
  labels: { singular: 'Etkinlik', plural: 'Etkinlikler' },
  // versions/drafts, SEO, trash: true, revalidation hooks
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true },
    { name: 'date', type: 'date', required: true },
    { name: 'description', type: 'richText', localized: true },
    { name: 'location', type: 'text', localized: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ]
}
```

### Collection: Volunteers

```typescript
{
  slug: 'volunteers',
  labels: { singular: 'Gonullu', plural: 'Gonulluler' },
  // public create (anyone can submit), trash: true
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text' },
    { name: 'applicationStatus', type: 'select', options: ['beklemede', 'onaylandi', 'reddedildi'] },
    { name: 'appliedAt', type: 'date' }, // auto-set on create
    { name: 'areas', type: 'select', hasMany: true, options: ['besleme', 'saglik', 'gecici-bakim'] },
  ]
}
```

### Collection: Pages

```typescript
{
  slug: 'pages',
  // CMS page builder with blocks, versions/drafts, SEO
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'layout', type: 'blocks', blocks: [/* ArchiveBlock, Banner, CallToAction, Code, Content, MediaBlock, Mission, RelatedPosts, Timeline */] },
  ]
}
```

### Collection: Categories

```typescript
{
  slug: 'categories',
  // nested docs plugin enabled
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true },
  ]
}
```

### Collection: Media

```typescript
{
  slug: 'media',
  // Uses Vercel Blob storage via @payloadcms/storage-vercel-blob
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 300, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', required: true, localized: true },
  ]
}
```

### Global: Site Settings

Uses a tabs-based layout (`src/SiteSettings/config.ts`):

```typescript
{
  slug: 'site-settings',
  label: 'Site Ayarlari',
  fields: [
    { type: 'tabs', tabs: [
      // Tab 1: Ana Sayfa (Homepage)
      {
        label: 'Ana Sayfa',
        fields: [
          { name: 'homepageBlocks', type: 'blocks', blocks: [
            // 10 block types: homeHero, homeStats, homeStory, homeOurWork,
            // homeFeaturedAnimals, homeActiveEmergencies, homeSupportCards,
            // homeNeedsList, homeRecentPosts, homeTransparencyBanner
            // Each block has an `enabled` flag
          ]},
        ],
      },
      // Tab 2: Banka Bilgileri (Bank Info)
      {
        label: 'Banka Bilgileri',
        fields: [
          { name: 'bankAccounts', type: 'array', maxRows: 10, fields: [
            { name: 'bankName', type: 'text', required: true },
            { name: 'accountHolder', type: 'text', required: true },
            { name: 'iban', type: 'text', required: true },
            { name: 'currency', type: 'select', options: ['TRY', 'USD', 'EUR'] },
          ]},
        ],
      },
      // Tab 3: Sosyal Medya (Social Media)
      {
        label: 'Sosyal Medya',
        fields: [
          { name: 'phone', type: 'text' },
          { name: 'email', type: 'text' },
          { name: 'whatsapp', type: 'text' },
          { name: 'instagram', type: 'text' },
        ],
      },
      // Tab 4: Istatistikler (Statistics)
      {
        label: 'Istatistikler',
        fields: [
          { name: 'catsCount', type: 'number' },
          { name: 'dogsCount', type: 'number' },
          { name: 'treatedCount', type: 'number' },
          { name: 'spayedCount', type: 'number' },
          { name: 'vaccinatedCount', type: 'number' },
        ],
      },
    ]},
  ]
}
```

### Global: Header

CMS-driven navigation (`src/Header/config.ts`):

```typescript
{
  slug: 'header',
  fields: [
    { name: 'brand', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'navItems', type: 'array', fields: [
      { name: 'link', type: 'group', /* link fields */ },
    ]},
    { name: 'socialLinks', type: 'array', fields: [/* platform, url */] },
  ]
}
```

### Global: UIStrings

All user-facing text managed in CMS (`src/globals/UIStrings/config.ts`):

```typescript
{
  slug: 'ui-strings',
  label: 'UI Strings',
  // 12 tabs covering every frontend page/section
  // ~235 localized fields total
  // Tabs: Genel (General), Ana Sayfa (Home), Header, Footer,
  //   Hayvanlar (Animals), Acil Vakalar (Emergency), Destek (Donate),
  //   Seffaflik (Transparency), Blog, Gonullu (Volunteer),
  //   Mama Malzeme (Supplies), Arama (Search)
}
```

> **Note:** next-intl is used for **routing only** (locale prefix handling). All user-facing text comes from the UIStrings global — there are no JSON translation files.

---

## 3.4 Integration Details

### WhatsApp Integration

- **Purpose:** Redirect to WhatsApp for volunteer applications and emergency case reports
- **Method:** `wa.me/{phone}?text={encoded_message}` URL format
- **Usage Areas:**
  - Volunteer page: "Hello, I would like to volunteer..."
  - Emergency Case Report: "Hello, I would like to report an emergency case..."
  - Contact page: General communication
- **Behavior:** Opens WhatsApp app on mobile, WhatsApp Web on desktop

### Instagram Integration

> **Note:** Instagram API integration is **not implemented**. Instagram links are provided as external links to the Instagram profile. Full API integration is deferred/placeholder.

### SEO

- **Next.js Metadata API:** Dynamic meta tags via `generateMetadata()` for each page
- **PayloadCMS SEO Plugin:** Collection-level SEO metadata management (title, description, OG image)
- **Sitemap:** Auto-generated via Next.js App Router sitemap.ts
- **Structured Data:** JSON-LD (Organization, Article, BreadcrumbList)
- **robots.txt:** Generated via Next.js App Router robots.ts

### Vercel Analytics

- **Purpose:** Page view tracking, visitor counts, performance monitoring
- **Integration:** `@vercel/analytics` package, automatic Next.js integration

---

## 3.5 Caching Strategy

| Page Type                            | Strategy | Revalidation                    |
| ------------------------------------ | -------- | ------------------------------- |
| Home Page                            | ISR      | 60 seconds                      |
| Animal list                          | ISR      | 60 seconds                      |
| Animal detail                        | ISR      | 300 seconds                     |
| Blog list                            | ISR      | 60 seconds                      |
| Blog detail                          | ISR      | 300 seconds                     |
| Emergency cases                      | ISR      | 30 seconds (urgent updates)     |
| Transparency                         | ISR      | 3600 seconds (rarely changes)   |
| Static pages (my story, vision)      | Static   | Build time                      |

---

## 3.6 Error Handling Strategy

| Scenario                  | Behavior                                              |
| ------------------------- | ----------------------------------------------------- |
| PayloadCMS API error      | Error boundary + user-friendly message                |
| Network error             | Retry button + offline message                        |
| 404 Not Found             | Custom-designed "lost paw" page                       |
| 500 Server Error          | Custom-designed error page + contact redirect         |
| Form submission error     | Inline error messages (Zod validation)                |

### Error Boundary Structure

- `src/app/error.tsx` — Route segment error boundary
- `src/app/global-error.tsx` — Root layout error boundary (wraps the entire application)
- `src/app/(frontend)/[locale]/not-found.tsx` — Custom 404 page

---

## 3.7 Security

| Area                | Measure                                                      |
| ------------------- | ------------------------------------------------------------ |
| CMS Access          | PayloadCMS admin panel protected by email/password           |
| Environment Vars    | All API keys and DB connection in `.env` file                |
| CSRF                | PayloadCMS built-in CSRF protection                          |
| Content Security    | CSP (Content Security Policy) headers                        |
| XSS                 | Rich text content is sanitized (PayloadCMS built-in)         |
| SQL Injection       | PayloadCMS ORM layer used (no direct SQL)                    |
| Image Upload        | MIME type validation, file size limit (max 5MB)              |
| HTTPS               | Automatic SSL/TLS on Vercel                                  |
| Dependency Security | Regular `pnpm audit` and Dependabot                           |

---

## 3.8 Performance Targets

| Metric                         | Target  |
| ------------------------------ | ------- |
| Largest Contentful Paint (LCP) | < 2.5s  |
| First Input Delay (FID)        | < 100ms |
| Cumulative Layout Shift (CLS)  | < 0.1   |
| Time to First Byte (TTFB)      | < 600ms |
| Lighthouse Performance         | 90+     |
| Lighthouse Accessibility       | 90+     |
| Lighthouse SEO                 | 90+     |
| Bundle Size (First Load JS)    | < 150KB |

### Performance Strategies

- Next.js Image Optimization (WebP, lazy loading)
- ISR (Incremental Static Regeneration) for dynamic pages
- Font optimization (self-hosted via next/font)
- Critical CSS inlining (Tailwind purge)
- PayloadCMS local API usage (no HTTP request, direct DB query)
- Vercel Blob for media storage (CDN-backed)

---

## 3.9 PayloadCMS Admin Panel Customization

### Custom Admin Views

| View Path               | Purpose                                |
| ----------------------- | -------------------------------------- |
| `/admin/hayvan-takip`   | Animal tracking dashboard              |
| `/admin/vaka-takip`     | Emergency case tracking                |
| `/admin/gonullu-yonetim`| Volunteer management                   |

### Rich Text Editor Configuration

Lexical editor (`@payloadcms/richtext-lexical`) with:
- Standard formats: Heading (H2-H4), Bold, Italic, Link, Image, Blockquote, List (ordered/unordered)
- Custom features: TextColorFeature, TextSizeFeature (via `payload-lexical-typography`)

### Admin Navigation Grouping

| Group (Turkish)       | Collections                                     |
| --------------------- | ----------------------------------------------- |
| Icerik Yonetimi       | Pages, Posts, Categories                        |
| Hayvan Bakim          | Animals, EmergencyCases, VetRecords             |
| Topluluk              | Events, Volunteers                              |
| Destek & Raporlar     | NeedsList, TransparencyReports                  |
| Sistem                | Media, Users                                    |

### Globals

| Global        | Purpose                                          |
| ------------- | ------------------------------------------------ |
| Header        | CMS-driven navigation, brand, logo, social links |
| SiteSettings  | Homepage blocks, bank info, social media, stats  |
| UIStrings     | All frontend UI text (~235 localized fields)     |

---

## 3.10 Testing Strategy

- **Integration tests**: `tests/int/**/*.int.spec.ts` — Vitest with jsdom, tsconfig paths resolved
- **E2E tests**: `tests/e2e/` — Playwright (Chromium), auto-starts dev server
- **Test helpers**: `tests/helpers/`
- **Coverage targets**: 80% for utilities/lib, 60% for components, critical paths 100%
- **CI config**: Run integration on every PR, E2E nightly + before release
- **Accessibility testing**: axe-core integration, Lighthouse CI for accessibility score

---

## 3.11 Deployment & DevOps

- **Platform**: Vercel (automatic deployments from main branch)
- **Preview deployments**: Every PR gets a preview URL
- **Environment variables**: Managed via Vercel dashboard (DATABASE_URL, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN, etc.)
- **Database schema sync**: Uses `push: true` — PayloadCMS auto-syncs schema on startup (no migration files)
- **Monitoring**: Vercel Analytics + Vercel Speed Insights
- **Rollback**: Vercel instant rollback to previous deployment
- **Branch strategy**: main (production), feature branches → PR → merge
- **CI pipeline**: ESLint check → Type check → Integration tests → Build → Deploy

---

## 3.12 API Endpoint Specifications

- **PayloadCMS REST API**: Auto-generated at `/api/{collection-slug}` (GET list, GET by ID, POST create, PATCH update, DELETE)
- **PayloadCMS Local API**: Used in server components for direct DB access (no HTTP overhead) — `payload.find()`, `payload.findByID()`, `payload.create()`
- **Authentication**: PayloadCMS admin routes require JWT auth; public API is read-only

---

## 3.13 UI State Patterns

- **Loading states**: Skeleton components. Use Next.js `loading.tsx` for route-level loading.
  - Animal cards: Gray shimmer boxes matching card layout
  - Blog list: Title + excerpt placeholder lines
  - Emergency cases: Progress bar skeleton
- **Error states**: Module-level error boundaries with friendly messages + retry button + link to home. Use the project's Vivid Brutalist design language.
- **Empty states**: Custom illustrations (paw-themed) with helpful messages
- **Toast notifications**: For IBAN copy success, form submissions, errors. Use shadcn/ui Toast component.

---

## 3.14 SEO Strategy (Expanded)

- **Target keywords (TR)**: sokak hayvanlari, sokak kedisi yardim, hayvan bagisi, hayvan koruma, deprem hayvanlari, mama bagisi
- **Target keywords (EN)**: stray animal donation turkey, animal rescue hatay, stray cat help turkey
- **Structured data** (JSON-LD):
  - Organization: site-wide (name, logo, contact, social profiles)
  - Article: blog posts (headline, datePublished, author, image)
  - BreadcrumbList: all detail pages (animals, blog, emergency)
  - WebSite: with SearchAction for site search
- **Open Graph**: Every page gets og:title, og:description, og:image (default + per-page)
- **hreflang**: `<link rel="alternate" hreflang="tr" />` and `hreflang="en"` on all pages
- **Sitemap**: Auto-generated via Next.js App Router `sitemap.ts`, includes all dynamic pages
- **robots.txt**: Allow all crawlers, disallow `/admin`, reference sitemap
- **Image SEO**: All images have alt text (enforced by Media collection), WebP format, descriptive filenames

---

## 3.15 Responsive Breakpoints & Layout Behavior

| Component | Mobile (<640px) | Tablet (640-1024px) | Desktop (>1024px) |
|-----------|----------------|--------------------|--------------------|
| Navigation | Hamburger menu | Hamburger or compact | Full horizontal nav |
| Hero section | Stacked (image top, text bottom) | Side-by-side | Side-by-side editorial split |
| Animal cards | 1 column | 2 columns | 3-4 columns |
| Emergency cards | 1 column, full width | 2 columns | 3 columns |
| Blog grid | 1 column | 2 columns | Bento grid (featured 2col×2row + small cards) |
| Footer | Stacked sections | 2-column grid | 4-column grid |
| IBAN display | Full width, large tap target | Inline with copy button | Inline with copy button |
| Stats counters | 2x2 grid | 4 inline | 4 inline with animations |
| Donate CTA | Sticky bottom bar | Sticky bottom bar | Header button + in-page |
| Image galleries | Swipe carousel | 2-col grid | 3-col grid with lightbox |

- Tailwind CSS 4 breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Mobile-first approach: base styles target mobile, breakpoints add complexity
- Touch targets: minimum 44x44px on mobile (WCAG 2.1 AA)
- Container max-width: 1280px with responsive padding (16px mobile, 24px tablet, 32px desktop)
