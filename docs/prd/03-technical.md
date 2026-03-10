# 03 — Technical Specifications

---

## 3.1 Tech Stack

| Layer               | Technology                                                     |
| ------------------- | -------------------------------------------------------------- |
| Framework           | Next.js 15 (App Router)                                        |
| Language            | TypeScript                                                     |
| Styling             | Tailwind CSS 4                                                 |
| UI Library          | shadcn/ui                                                      |
| CMS                 | PayloadCMS 3.x (embedded in Next.js)                           |
| Database            | PostgreSQL (Neon — serverless, @payloadcms/db-postgres)        |
| Hosting             | Vercel                                                         |
| Analytics           | Vercel Analytics                                               |
| Animation           | Motion (general animations) + GSAP (scroll/timeline)           |
| i18n (Frontend)     | next-intl (middleware, server/client component, type-safe)     |
| i18n (CMS)          | PayloadCMS i18n (collection field localization)                |
| SEO                 | Next.js Metadata API + PayloadCMS SEO Plugin                   |
| Form Validation     | Zod + TanStack Form                                            |
| Package Manager     | Bun                                                            |
| Linting/Formatting  | Biome (single tool replacing ESLint + Prettier)                |
| Search              | PayloadCMS fullText search + Nuqs (URL state)                  |
| State Management    | Nuqs (search/filter URL state), global state added later if needed |

---

## 3.2 Architecture

### Modular File Structure

The project uses a page-based module architecture. Each page maps 1:1 to a module. CMS collection definitions are co-located inside the relevant module as a `collection.ts` file. Global definitions are kept in the `settings` module as a `global.ts` file.

```
stray-animal-care/
├── src/
│   ├── app/
│   │   ├── (frontend)/
│   │   │   ├── [locale]/
│   │   │   │   ├── page.tsx                      # → modules/home
│   │   │   │   ├── hikayem/page.tsx              # → modules/story
│   │   │   │   ├── calismalarimiz/page.tsx       # → modules/our-work
│   │   │   │   ├── canlarimiz/
│   │   │   │   │   ├── page.tsx                  # → modules/animals
│   │   │   │   │   └── [slug]/page.tsx           # → modules/animals
│   │   │   │   ├── destek-ol/page.tsx            # → modules/donate
│   │   │   │   ├── mama-malzeme/page.tsx         # → modules/supplies
│   │   │   │   ├── acil-vakalar/
│   │   │   │   │   ├── page.tsx                  # → modules/emergency
│   │   │   │   │   └── [slug]/page.tsx           # → modules/emergency
│   │   │   │   ├── seffaflik/page.tsx            # → modules/transparency
│   │   │   │   ├── gunluk/
│   │   │   │   │   ├── page.tsx                  # → modules/blog
│   │   │   │   │   └── [slug]/page.tsx           # → modules/blog
│   │   │   │   ├── gonullu-ol/page.tsx           # → modules/volunteer
│   │   │   │   ├── gelecek-vizyonu/page.tsx      # → modules/vision
│   │   │   │   ├── iletisim/page.tsx             # → modules/contact
│   │   │   │   └── not-found.tsx                 # Custom 404
│   │   │   └── layout.tsx                        # → modules/layout
│   │   ├── (payload)/
│   │   │   ├── admin/[[...segments]]/
│   │   │   │   ├── page.tsx
│   │   │   │   └── importMap.js
│   │   │   ├── api/[...slug]/route.ts
│   │   │   └── layout.tsx
│   │   ├── layout.tsx                            # Root layout
│   │   ├── error.tsx                             # Error boundary
│   │   ├── global-error.tsx                      # Global error boundary
│   │   └── globals.css
│   │
│   ├── modules/                # Feature modules (page-based 1:1)
│   │   ├── home/               # Home Page
│   │   ├── story/              # My Story
│   │   ├── our-work/           # Our Work
│   │   ├── animals/            # Our Animals
│   │   │   └── collection.ts   #   → Animals collection
│   │   ├── donate/             # Support Us
│   │   │   └── collection.ts   #   → SupporterComments collection
│   │   ├── supplies/           # Food & Supplies
│   │   │   └── collection.ts   #   → NeedsList collection
│   │   ├── emergency/          # Emergency Cases
│   │   │   └── collection.ts   #   → EmergencyCases collection
│   │   ├── transparency/       # Transparency Corner
│   │   │   └── collection.ts   #   → TransparencyReports collection
│   │   ├── blog/               # Blog
│   │   │   └── collection.ts   #   → BlogPosts collection
│   │   ├── volunteer/          # Volunteer
│   │   ├── vision/             # Future Vision
│   │   ├── contact/            # Contact
│   │   ├── layout/             # Header + Footer
│   │   ├── instagram/          # Instagram API integration
│   │   ├── search/             # Site-wide search
│   │   ├── media/              # Media management
│   │   │   └── collection.ts   #   → Media collection
│   │   ├── settings/           # Site settings
│   │   │   └── global.ts       #   → SiteSettings global
│   │   └── shared/             # Shared components
│   │
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   │
│   ├── i18n/                   # Translations
│   │   ├── tr.json
│   │   ├── en.json
│   │   └── config.ts
│   │
│   ├── lib/                    # General utilities
│   │   └── utils.ts            # cn() etc.
│   │
│   ├── payload.config.ts
│   └── payload-types.ts        # Auto-generated types
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── docs/
│   ├── PRD.md                  # Index
│   └── prd/                    # Modular PRD files
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── biome.json
├── package.json
└── .env.local
```

Each module has the following structure (as needed):
```
modules/<module-name>/
├── components/           # React components
│   └── skeletons/       # Loading state components (optional)
├── hooks/               # Custom React hooks (optional)
├── lib/                 # Utility functions, queries, constants (optional)
├── collection.ts        # PayloadCMS collection definition (optional, CMS modules only)
├── global.ts            # PayloadCMS global definition (optional, settings module only)
└── index.ts             # Barrel exports (REQUIRED)
```

> **Note:** Collection definitions are co-located inside the relevant module, not in a separate `src/collections/` directory. This approach ensures modules are self-contained units. All collections and globals are imported and registered in the `payload.config.ts` file.

page.tsx files are kept thin — import + data fetch only, UI lives in the module.

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
| `/[locale]/gunluk`              | Blog List          | No      |
| `/[locale]/gunluk/[slug]`       | Blog Detail        | Yes     |
| `/[locale]/gonullu-ol`          | Volunteer          | No      |
| `/[locale]/gelecek-vizyonu`     | Future Vision      | No      |
| `/[locale]/iletisim`            | Contact            | No      |
| `/admin`                        | CMS Admin Panel    | —       |

---

## 3.3 PayloadCMS Collection Schemas

> **Note:** All collections automatically include `createdAt` and `updatedAt` fields added by PayloadCMS.

### Collection 1: Animals

```typescript
{
  slug: 'animals',
  labels: { singular: 'Hayvan', plural: 'Hayvanlar' },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'type', type: 'select', options: ['kedi', 'kopek'], required: true },
    { name: 'age', type: 'text', localized: true },
    { name: 'gender', type: 'select', options: ['erkek', 'disi'], required: true },
    { name: 'status', type: 'select', options: ['tedavide', 'kalici-bakim', 'acil'], required: true },
    { name: 'photos', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'story', type: 'richText', localized: true },
    { name: 'needs', type: 'richText', localized: true },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ]
}
```

### Collection 2: Blog Posts

```typescript
{
  slug: 'blog-posts',
  labels: { singular: 'Blog Yazisi', plural: 'Blog Yazilari' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'category', type: 'select', options: ['kurtarma', 'tedavi', 'gunluk', 'duyuru', 'etkinlik'], localized: false },
    { name: 'tags', type: 'array', fields: [
      { name: 'tag', type: 'text' },
    ]},
    { name: 'date', type: 'date', required: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'published', type: 'checkbox', defaultValue: false },
  ]
}
```

### Collection 3: Emergency Cases

```typescript
{
  slug: 'emergency-cases',
  labels: { singular: 'Acil Vaka', plural: 'Acil Vakalar' },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'animal', type: 'relationship', relationTo: 'animals' },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'richText', required: true, localized: true },
    { name: 'targetAmount', type: 'number', required: true },
    { name: 'collectedAmount', type: 'number', defaultValue: 0 },
    { name: 'status', type: 'select', options: ['aktif', 'tamamlandi'], required: true },
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

### Collection 4: Needs List

```typescript
{
  slug: 'needs-list',
  labels: { singular: 'Ihtiyac', plural: 'Ihtiyac Listesi' },
  fields: [
    { name: 'productName', type: 'text', required: true, localized: true },
    { name: 'brandDetail', type: 'text', localized: true },
    { name: 'urgency', type: 'select', options: ['acil', 'orta', 'yeterli'], required: true },
    { name: 'stockStatus', type: 'text', localized: true },
    { name: 'order', type: 'number' },
  ]
}
```

### Collection 5: Transparency Reports

```typescript
{
  slug: 'transparency-reports',
  labels: { singular: 'Seffaflik Raporu', plural: 'Seffaflik Raporlari' },
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

### Collection 6: Supporter Comments

```typescript
{
  slug: 'supporter-comments',
  labels: { singular: 'Destekci Yorumu', plural: 'Destekci Yorumlari' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'comment', type: 'textarea', required: true, localized: true },
    { name: 'date', type: 'date', required: true },
    { name: 'approved', type: 'checkbox', defaultValue: false },
  ]
}
```

### Collection 7: Media

```typescript
{
  slug: 'media',
  upload: {
    staticDir: 'media',
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

```typescript
{
  slug: 'site-settings',
  label: 'Genel Ayarlar',
  fields: [
    // IBAN Details
    { name: 'bankName', type: 'text' },
    { name: 'accountHolder', type: 'text' },
    { name: 'iban', type: 'text' },
    // Contact
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'whatsapp', type: 'text' },
    { name: 'instagram', type: 'text' },
    // International Payment
    { name: 'paypalLink', type: 'text' },
    { name: 'wiseLink', type: 'text' },
    // Statistics
    { name: 'stats', type: 'group', fields: [
      { name: 'catsCount', type: 'number' },
      { name: 'dogsCount', type: 'number' },
      { name: 'treatedCount', type: 'number' },
      { name: 'spayedCount', type: 'number' },
      { name: 'vaccinatedCount', type: 'number' },
    ]},
  ]
}
```

---

## 3.4 Integration Details

### Instagram Basic Display API

- **Purpose:** Display live Instagram posts on the home page and relevant pages
- **Endpoint:** `https://graph.instagram.com/me/media`
- **Fields:** `id, caption, media_type, media_url, permalink, timestamp`
- **Token Renewal:** Long-lived token (60 days), automatic renewal mechanism
- **Cache:** ISR (Incremental Static Regeneration) with 1-hour cache
- **Fallback:** Static placeholder images displayed if API fails
- **Display:** 6-9 posts, grid layout, clicking redirects to Instagram

### WhatsApp Integration

- **Purpose:** Redirect to WhatsApp for volunteer applications and emergency case reports
- **Method:** `wa.me/{phone}?text={encoded_message}` URL format
- **Usage Areas:**
  - Volunteer page: "Hello, I would like to volunteer..."
  - Emergency Case Report: "Hello, I would like to report an emergency case..."
  - Contact page: General communication
- **Behavior:** Opens WhatsApp app on mobile, WhatsApp Web on desktop

### SEO

- **Next.js Metadata API:** Dynamic meta tags via `generateMetadata()` for each page
- **PayloadCMS SEO Plugin:** Collection-level SEO metadata management (title, description, OG image)
- **Sitemap:** Auto-generated via `next-sitemap` or Next.js App Router sitemap.ts
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
| Instagram feed                       | ISR      | 3600 seconds (1 hour)           |

---

## 3.6 Error Handling Strategy

| Scenario                  | Behavior                                              |
| ------------------------- | ----------------------------------------------------- |
| PayloadCMS API error      | Error boundary + user-friendly message                |
| Instagram API down        | Placeholder image grid fallback                       |
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
| Environment Vars    | All API keys and DB connection in `.env.local` file          |
| CSRF                | PayloadCMS built-in CSRF protection                          |
| Content Security    | CSP (Content Security Policy) headers                        |
| Rate Limiting       | Rate limits on Instagram API and form submissions            |
| XSS                 | Rich text content is sanitized (PayloadCMS built-in)         |
| SQL Injection       | PayloadCMS ORM layer used (no direct SQL)                    |
| Image Upload        | MIME type validation, file size limit (max 5MB)              |
| HTTPS               | Automatic SSL/TLS on Vercel                                  |
| Supporter Comments  | Moderation system — only approved comments are displayed     |
| Dependency Security | Regular `bun audit` and Dependabot                           |

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
- Instagram API result caching (1 hour)
- PayloadCMS local API usage (no HTTP request, direct DB query)

---

## 3.9 PayloadCMS Admin Panel Customization

### Dashboard Widgets

- Active emergency case count
- Total animal count (cat/dog breakdown)
- Latest published blog post
- Pending supporter comments count

### Rich Text Editor Configuration

Supported formats: Heading (H2-H4), Bold, Italic, Link, Image, Blockquote, List (ordered/unordered)

### Admin Navigation Grouping

| Group     | Collections                           |
| --------- | ------------------------------------- |
| Content   | Animals, Blog Posts, Emergency Cases  |
| Support   | Needs List, Supporter Comments        |
| Reports   | Transparency Reports                  |
| Settings  | Site Settings                         |

---

## 3.10 Testing Strategy

- **Unit tests**: Vitest + Testing Library for components and utilities
- **Integration tests**: Testing Library for module-level flows
- **E2E tests**: Playwright for critical user journeys (donation flow, animal browsing, emergency case view)
- **Coverage targets**: 80% for utilities/lib, 60% for components, critical paths 100%
- **CI config**: Run unit/integration on every PR, E2E nightly + before release
- **Accessibility testing**: axe-core integration in Vitest, Lighthouse CI for accessibility score
- Include a test directory structure: `__tests__/` co-located in each module

---

## 3.11 Deployment & DevOps

- **Platform**: Vercel (automatic deployments from main branch)
- **Preview deployments**: Every PR gets a preview URL
- **Environment variables**: Managed via Vercel dashboard (DATABASE_URL, PAYLOAD_SECRET, INSTAGRAM_TOKEN, etc.)
- **Database migrations**: PayloadCMS handles migrations automatically on deployment
- **Monitoring**: Vercel Analytics + Vercel Speed Insights
- **Rollback**: Vercel instant rollback to previous deployment
- **Branch strategy**: main (production), feature branches → PR → merge
- **CI pipeline**: Biome lint/format check → Type check → Unit tests → Build → Deploy

---

## 3.12 API Endpoint Specifications

- **PayloadCMS REST API**: Auto-generated at `/api/{collection-slug}` (GET list, GET by ID, POST create, PATCH update, DELETE)
- **PayloadCMS Local API**: Used in server components for direct DB access (no HTTP overhead) — `payload.find()`, `payload.findByID()`, `payload.create()`
- **Custom API routes**:
  - `POST /api/contact` — Contact form submission (rate limited: 5/min per IP)
  - `GET /api/instagram/feed` — Cached Instagram feed proxy (1hr cache)
  - Future: `POST /api/payment/create`, `POST /api/payment/webhook` (M11)
- **Rate limiting**: Apply to all public-facing custom endpoints
- **Authentication**: PayloadCMS admin routes require JWT auth; public API is read-only

---

## 3.13 UI State Patterns

- **Loading states**: Skeleton components co-located in each module's `components/skeletons/` dir. Use Next.js `loading.tsx` for route-level loading.
  - Animal cards: Gray shimmer boxes matching card layout
  - Blog list: Title + excerpt placeholder lines
  - Emergency cases: Progress bar skeleton
- **Error states**: Module-level error boundaries with friendly messages + retry button + link to home. Use the project's warm design language.
- **Empty states**: Custom illustrations (paw-themed) with helpful messages:
  - No animals found: "No animals match your filter. Try adjusting your search."
  - No emergency cases: "Great news! No active emergency cases right now."
  - No blog posts: "New stories coming soon. Follow us on Instagram!"
- **Toast notifications**: For IBAN copy success, form submissions, errors. Use shadcn/ui Toast component.

---

## 3.14 SEO Strategy (Expanded)

- **Target keywords (TR)**: sokak hayvanları, sokak kedisi yardım, hayvan bağışı, hayvan koruma, deprem hayvanları, mama bağışı
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
| Hero section | Stacked (image top, text bottom) | Side-by-side | Side-by-side with parallax |
| Animal cards | 1 column | 2 columns | 3-4 columns |
| Emergency cards | 1 column, full width | 2 columns | 3 columns |
| Blog grid | 1 column | 2 columns | 3 columns |
| Footer | Stacked sections | 2-column grid | 4-column grid |
| IBAN display | Full width, large tap target | Inline with copy button | Inline with copy button |
| Stats counters | 2x2 grid | 4 inline | 4 inline with animations |
| Donate CTA | Sticky bottom bar | Sticky bottom bar | Header button + in-page |
| Image galleries | Swipe carousel | 2-col grid | 3-col grid with lightbox |

- Tailwind CSS 4 breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- Mobile-first approach: base styles target mobile, breakpoints add complexity
- Touch targets: minimum 44x44px on mobile (WCAG 2.1 AA)
- Container max-width: 1280px with responsive padding (16px mobile, 24px tablet, 32px desktop)
