# 03 — Technical Specifications

---

## 3.1 Tech Stack

| Katman              | Teknoloji                                                      |
| ------------------- | -------------------------------------------------------------- |
| Framework           | Next.js 15 (App Router)                                        |
| Dil                 | TypeScript                                                     |
| Styling             | Tailwind CSS 4                                                 |
| UI Kutuphanesi      | shadcn/ui                                                      |
| CMS                 | PayloadCMS 3.x (Next.js icine gomulu)                          |
| Veritabani          | PostgreSQL (Neon — serverless, @payloadcms/db-postgres)        |
| Hosting             | Vercel                                                         |
| Analitik            | Vercel Analytics                                               |
| Animasyon           | Motion (genel animasyonlar) + GSAP (scroll/timeline)           |
| i18n (Frontend)     | next-intl (middleware, server/client component, type-safe)     |
| i18n (CMS)          | PayloadCMS i18n (collection field localization)                |
| SEO                 | Next.js Metadata API + PayloadCMS SEO Plugin                   |
| Form Validation     | Zod + TanStack Form                                            |
| Package Manager     | Bun                                                            |
| Linting/Formatting  | Biome (ESLint + Prettier yerine tek arac)                      |
| Search              | PayloadCMS fullText search + Nuqs (URL state)                  |
| State Management    | Nuqs (search/filter URL state), global state gerekirse sonra   |

---

## 3.2 Mimari

### Moduler Dosya Yapisi

Proje sayfa bazli modul mimarisi kullanir. Her sayfa 1:1 bir module eslesir. CMS collection tanimlari PayloadCMS convention'a uygun olarak `src/collections/` altinda tutulur.

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
│   ├── collections/            # PayloadCMS collection tanimlari
│   │   ├── Animals.ts
│   │   ├── BlogPosts.ts
│   │   ├── EmergencyCases.ts
│   │   ├── NeedsList.ts
│   │   ├── TransparencyReports.ts
│   │   ├── SupporterComments.ts
│   │   └── Media.ts
│   │
│   ├── globals/                # PayloadCMS global tanimlari
│   │   └── SiteSettings.ts
│   │
│   ├── modules/                # Feature modulleri (sayfa bazli 1:1)
│   │   ├── home/               # Ana Sayfa
│   │   ├── story/              # Hikayem
│   │   ├── our-work/           # Calismalarimiz
│   │   ├── animals/            # Canlarimiz
│   │   ├── donate/             # Destek Ol
│   │   ├── supplies/           # Mama & Malzeme
│   │   ├── emergency/          # Acil Vakalar
│   │   ├── transparency/       # Seffaflik Kosesi
│   │   ├── blog/               # Gunluk (Blog)
│   │   ├── volunteer/          # Gonullu Ol
│   │   ├── vision/             # Gelecek Vizyonu
│   │   ├── contact/            # Iletisim
│   │   ├── layout/             # Header + Footer
│   │   ├── instagram/          # Instagram API entegrasyonu
│   │   ├── search/             # Site geneli arama
│   │   └── shared/             # Ortak componentler
│   │
│   ├── components/
│   │   └── ui/                 # shadcn/ui componentleri
│   │
│   ├── i18n/                   # Ceviriler
│   │   ├── tr.json
│   │   ├── en.json
│   │   └── config.ts
│   │
│   ├── lib/                    # Genel yardimcilar
│   │   └── utils.ts            # cn() vb.
│   │
│   ├── payload.config.ts
│   └── payload-types.ts        # Otomatik uretilen tipler
│
├── public/
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── docs/
│   ├── PRD.md                  # Index
│   └── prd/                    # Moduler PRD dosyalari
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── biome.json
├── package.json
└── .env.local
```

Her modul su yapiya sahiptir (ihtiyac kadar):
```
modules/<module-name>/
├── components/           # React componentleri
│   └── skeletons/       # Loading state componentleri (opsiyonel)
├── hooks/               # Custom React hooks (opsiyonel)
├── lib/                 # Utility fonksiyonlar, queries, constants (opsiyonel)
└── index.ts             # Barrel exports (ZORUNLU)
```

page.tsx dosyalari ince tutulur — sadece import + data fetch, UI moduldedir.

### Routing Yapisi

| URL                             | Sayfa            | Dinamik |
| ------------------------------- | ---------------- | ------- |
| `/[locale]`                     | Ana Sayfa        | Hayir   |
| `/[locale]/hikayem`             | Hikayem          | Hayir   |
| `/[locale]/calismalarimiz`      | Calismalarimiz   | Hayir   |
| `/[locale]/canlarimiz`          | Canlarimiz       | Hayir   |
| `/[locale]/canlarimiz/[slug]`   | Hayvan Detay     | Evet    |
| `/[locale]/destek-ol`           | Destek Ol        | Hayir   |
| `/[locale]/mama-malzeme`        | Mama & Malzeme   | Hayir   |
| `/[locale]/acil-vakalar`        | Acil Vakalar     | Hayir   |
| `/[locale]/acil-vakalar/[slug]` | Vaka Detay       | Evet    |
| `/[locale]/seffaflik`           | Seffaflik Kosesi | Hayir   |
| `/[locale]/gunluk`              | Blog Listesi     | Hayir   |
| `/[locale]/gunluk/[slug]`       | Blog Detay       | Evet    |
| `/[locale]/gonullu-ol`          | Gonullu Ol       | Hayir   |
| `/[locale]/gelecek-vizyonu`     | Gelecek Vizyonu  | Hayir   |
| `/[locale]/iletisim`            | Iletisim         | Hayir   |
| `/admin`                        | CMS Admin Panel  | —       |

---

## 3.3 PayloadCMS Collection Semalari

> **Not:** Tum collection'larda `createdAt` ve `updatedAt` alanlari PayloadCMS tarafindan otomatik eklenir.

### Collection 1: Hayvanlar (Animals)

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

### Collection 2: Blog Yazilari (Blog Posts)

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

### Collection 3: Acil Vakalar (Emergency Cases)

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

### Collection 4: Ihtiyac Listesi (Needs List)

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

### Collection 5: Seffaflik Raporlari (Transparency Reports)

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

### Collection 6: Destekci Yorumlari (Supporter Comments)

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

### Global: Genel Ayarlar (Site Settings)

```typescript
{
  slug: 'site-settings',
  label: 'Genel Ayarlar',
  fields: [
    // IBAN Bilgileri
    { name: 'bankName', type: 'text' },
    { name: 'accountHolder', type: 'text' },
    { name: 'iban', type: 'text' },
    // Iletisim
    { name: 'phone', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'whatsapp', type: 'text' },
    { name: 'instagram', type: 'text' },
    // Yurtdisi Odeme
    { name: 'paypalLink', type: 'text' },
    { name: 'wiseLink', type: 'text' },
    // Istatistikler
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

## 3.4 Entegrasyon Detaylari

### Instagram Basic Display API

- **Amac:** Ana sayfada ve ilgili sayfalarda Instagram postlarini canli gostermek
- **Endpoint:** `https://graph.instagram.com/me/media`
- **Alanlar:** `id, caption, media_type, media_url, permalink, timestamp`
- **Token Yenileme:** Long-lived token (60 gun), otomatik yenileme mekanizmasi
- **Cache:** ISR (Incremental Static Regeneration) ile 1 saat cache
- **Fallback:** API hatasi durumunda statik placeholder gorseller gosterilir
- **Gosterim:** 6-9 post, grid layout, tiklandiginda Instagram'a yonlendirme

### WhatsApp Entegrasyonu

- **Amac:** Gonullu basvuru ve acil vaka bildirimi icin WhatsApp'a yonlendirme
- **Yontem:** `wa.me/{phone}?text={encoded_message}` URL formati
- **Kullanim Alanlari:**
  - Gonullu Ol sayfasi: "Merhaba, gonullu olmak istiyorum..."
  - Acil Vaka Bildirimi: "Merhaba, acil bir vaka bildirmek istiyorum..."
  - Iletisim sayfasi: Genel iletisim
- **Davranis:** Mobilde WhatsApp uygulamasini, desktop'ta WhatsApp Web'i acar

### SEO

- **Next.js Metadata API:** Her sayfa icin `generateMetadata()` ile dinamik meta taglar
- **PayloadCMS SEO Plugin:** Collection bazli SEO meta verileri yonetimi (title, description, OG image)
- **Sitemap:** `next-sitemap` veya Next.js App Router sitemap.ts ile otomatik uretim
- **Structured Data:** JSON-LD (Organization, Article, BreadcrumbList)
- **robots.txt:** Next.js App Router robots.ts ile uretim

### Vercel Analytics

- **Amac:** Sayfa goruntulenme, ziyaretci sayisi, performans takibi
- **Entegrasyon:** `@vercel/analytics` paketi, otomatik Next.js entegrasyonu

---

## 3.5 Caching Stratejisi

| Sayfa Tipi                       | Strateji | Revalidation                 |
| -------------------------------- | -------- | ---------------------------- |
| Ana Sayfa                        | ISR      | 60 saniye                    |
| Hayvan listesi                   | ISR      | 60 saniye                    |
| Hayvan detay                     | ISR      | 300 saniye                   |
| Blog listesi                     | ISR      | 60 saniye                    |
| Blog detay                       | ISR      | 300 saniye                   |
| Acil vakalar                     | ISR      | 30 saniye (acil guncelleme)  |
| Seffaflik                        | ISR      | 3600 saniye (nadiren degisir)|
| Statik sayfalar (hikayem, vizyon)| Static   | Build time                   |
| Instagram feed                   | ISR      | 3600 saniye (1 saat)         |

---

## 3.6 Error Handling Stratejisi

| Senaryo                   | Davranis                                              |
| ------------------------- | ----------------------------------------------------- |
| PayloadCMS API hatasi     | Error boundary + kullanici dostu mesaj                 |
| Instagram API down        | Placeholder gorsel grid fallback                       |
| Network error             | Retry butonu + offline mesaji                          |
| 404 Not Found             | Ozel tasarimli "kayip pati" sayfasi                    |
| 500 Server Error          | Ozel tasarimli hata sayfasi + iletisim yonlendirmesi  |
| Form submission hatasi    | Inline hata mesajlari (Zod validation)                |

### Error Boundary Yapisi

- `src/app/error.tsx` — Route segment error boundary
- `src/app/global-error.tsx` — Root layout error boundary (tum uygulamayi sarar)
- `src/app/(frontend)/[locale]/not-found.tsx` — Custom 404 sayfasi

---

## 3.7 Guvenlik

| Alan                | Onlem                                                        |
| ------------------- | ------------------------------------------------------------ |
| CMS Erisim          | PayloadCMS admin panel e-posta/sifre ile korunur             |
| Ortam Degiskenleri  | Tum API anahtarlari ve DB baglantisi `.env.local` dosyasinda |
| CSRF                | PayloadCMS dahili CSRF korumasi                              |
| Icerik Guvenlik     | CSP (Content Security Policy) header'lari                    |
| Rate Limiting       | Instagram API ve form submission'larda rate limit            |
| XSS                 | Rich text icerik sanitize edilir (PayloadCMS dahili)         |
| SQL Injection       | PayloadCMS ORM katmani kullanilir (dogrudan SQL yok)         |
| Gorsel Upload       | MIME type dogrulama, dosya boyutu sinirlamasi (max 5MB)      |
| HTTPS               | Vercel uzerinde otomatik SSL/TLS                             |
| Destekci Yorumlari  | Moderasyon sistemi — sadece onaylanan yorumlar gorunur       |
| Dependency Guvenlik | Duzenli `bun audit` ve Dependabot                            |

---

## 3.8 Performans Hedefleri

| Metrik                         | Hedef   |
| ------------------------------ | ------- |
| Largest Contentful Paint (LCP) | < 2.5s  |
| First Input Delay (FID)        | < 100ms |
| Cumulative Layout Shift (CLS)  | < 0.1   |
| Time to First Byte (TTFB)      | < 600ms |
| Lighthouse Performance         | 90+     |
| Lighthouse Accessibility       | 90+     |
| Lighthouse SEO                 | 90+     |
| Bundle Size (First Load JS)    | < 150KB |

### Performans Stratejileri

- Next.js Image Optimization (WebP, lazy loading)
- ISR (Incremental Static Regeneration) dinamik sayfalar icin
- Font optimization (next/font ile self-hosted)
- Critical CSS inlining (Tailwind purge)
- Instagram API sonuclarini cache'leme (1 saat)
- PayloadCMS local API kullanimi (HTTP istegi yok, dogrudan DB sorgusu)

---

## 3.9 PayloadCMS Admin Panel Ozellestirmesi

### Dashboard Widgetlari

- Aktif acil vaka sayisi
- Toplam hayvan sayisi (kedi/kopek ayrimi)
- Son yayinlanan blog yazisi
- Bekleyen destekci yorumlari sayisi

### Rich Text Editor Yapilandirmasi

Desteklenen formatlar: Heading (H2-H4), Bold, Italic, Link, Image, Blockquote, List (ordered/unordered)

### Admin Navigation Gruplama

| Grup      | Collection'lar                        |
| --------- | ------------------------------------- |
| Icerik    | Animals, Blog Posts, Emergency Cases  |
| Destek    | Needs List, Supporter Comments        |
| Raporlar  | Transparency Reports                  |
| Ayarlar   | Site Settings                         |
