# Content & SEO Strategy

> Last updated: 2026-03-10

---

## Target Keywords

### Turkish (Primary Market)

| Keyword                          | Search Intent | Target Page          | Priority |
| -------------------------------- | ------------- | -------------------- | -------- |
| sokak hayvanlari yardim          | Informational | Home, Our Work       | High     |
| sokak kedisi bagis               | Transactional | Donate               | High     |
| hayvan koruma dernegi            | Navigational  | Home, My Story       | High     |
| deprem hayvanlari                | Informational | Emergency Cases      | Medium   |
| mama bagisi                      | Transactional | Food & Supplies      | High     |
| acil hayvan yardim               | Transactional | Emergency Cases      | High     |
| sokak hayvanlari nasil yardim edilir | Informational | Blog            | Medium   |
| hayvan gonullusu olmak           | Informational | Volunteer            | Medium   |
| hatay sokak hayvanlari           | Local         | Home, Our Work       | High     |
| malatya hayvan bakim             | Local         | Home, Our Work       | Medium   |
| seffaf bagis dernegi             | Trust         | Transparency         | Medium   |
| sokak kopegi sahiplendirme       | Informational | Animals              | Low      |

### English (Secondary Market)

| Keyword                          | Search Intent | Target Page          | Priority |
| -------------------------------- | ------------- | -------------------- | -------- |
| stray animal donation turkey     | Transactional | Donate               | High     |
| animal rescue hatay              | Informational | Emergency Cases      | High     |
| help stray cats turkey           | Transactional | Donate, Home         | High     |
| animal charity turkey            | Navigational  | Home                 | Medium   |
| turkey earthquake animals        | Informational | Emergency Cases      | Medium   |
| donate to animal shelter turkey  | Transactional | Donate               | Medium   |
| stray dog rescue turkey          | Informational | Animals, Blog        | Low      |
| volunteer animal care turkey     | Informational | Volunteer            | Low      |

---

## Per-Page SEO Templates

### Title Formula

```
[Primary Keyword] | [Page Purpose] — Paws of Hope
```

Examples:

| Page             | Turkish Title                                            | English Title                                         |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| Home             | Sokak Hayvanlari Icin Yardim — Paws of Hope             | Help Stray Animals in Turkey — Paws of Hope           |
| Donate           | Sokak Hayvanlarina Bagis Yap — Paws of Hope             | Donate to Stray Animals — Paws of Hope                |
| Animals          | Bakiminizdaki Canlilar — Paws of Hope                   | Our Animals — Paws of Hope                            |
| Emergency        | Acil Hayvan Vakalari — Paws of Hope                     | Emergency Animal Cases — Paws of Hope                 |
| Blog             | Gunluk — Sokak Hayvanlari Haberleri — Paws of Hope      | Journal — Stray Animal Stories — Paws of Hope         |

### Meta Description Formula

```
[What the page offers] + [emotional hook or CTA] + [location context]. [Max 155 characters]
```

Examples:

- **Donate (TR):** "Hatay ve Malatya'daki sokak kedileri ve kopeklerine mama, tedavi ve bakim destegi verin. IBAN ile kolayca bagis yapin."
- **Donate (EN):** "Support stray cats and dogs in Hatay & Malatya, Turkey. Your donation provides food, medical care, and shelter. Donate via bank transfer."

### OG Image Strategy

| Page Type     | OG Image Approach                                        |
| ------------- | -------------------------------------------------------- |
| Home          | Static branded image with logo and tagline               |
| Animal detail | Dynamic — animal photo with name overlay (via Vercel OG) |
| Blog post     | Dynamic — post title with featured image background      |
| Emergency     | Dynamic — case title with urgency indicator              |
| Default       | Static branded fallback image                            |

Dynamic OG images are generated using `@vercel/og` at the `/api/og` endpoint.

---

## Structured Data Plan

### Site-Wide: Organization

Applied in the root layout on every page.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Paws of Hope",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "description": "Stray animal care and donation platform in Turkey",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hatay",
    "addressCountry": "TR"
  },
  "sameAs": [
    "https://instagram.com/pawsofhope",
    "https://twitter.com/pawsofhope"
  ]
}
```

### Blog Posts: Article

Applied on each blog post detail page.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "name": "Paws of Hope" },
  "image": "...",
  "description": "..."
}
```

### Detail Pages: BreadcrumbList

Applied on animal detail, blog post, and emergency case pages.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://example.com/tr" },
    { "@type": "ListItem", "position": 2, "name": "Canlarimiz", "item": "https://example.com/tr/canlarimiz" },
    { "@type": "ListItem", "position": 3, "name": "Pamuk" }
  ]
}
```

### Home Page: WebSite with SearchAction

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://example.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://example.com/tr/arama?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

## Content Calendar

### Blog Posts

| Frequency     | Content Type                     | Examples                                        |
| ------------- | -------------------------------- | ----------------------------------------------- |
| Weekly (1x)   | Animal story / update            | "Pamuk's Recovery Journey", "New Arrivals"       |
| Biweekly (1x) | Educational content              | "How to Help Stray Animals", "Spay/Neuter Guide" |
| Monthly (1x)  | Transparency / impact report     | "March Donations Summary", "What Your Help Achieved" |
| As needed     | Event announcements              | Adoption events, volunteer drives                |

**Target:** 2-4 posts per month.

### Emergency Case Updates

- Published as new cases arise (no fixed schedule)
- Updated in real-time as treatment progresses
- Closed with a final status update when resolved

### Transparency Reports

- Published monthly
- Include: total donations received, expenses breakdown, animal care statistics
- Linked from the Transparency page

### Seasonal Content Opportunities

| Period         | Content Focus                                          |
| -------------- | ------------------------------------------------------ |
| Winter         | Cold weather feeding campaigns, shelter needs           |
| Spring         | Kitten season, spay/neuter awareness                    |
| Summer         | Water stations, heat safety for strays                  |
| Ramadan        | Charitable giving, sadaka (alms) campaigns              |
| Oct 4          | World Animal Day — special campaign                     |
| Feb 6          | Earthquake anniversary — memorial and ongoing impact    |

---

## Image SEO

### File Naming Convention

```
[animal-name]-[description]-[location].webp
```

Examples:

- `pamuk-rescued-kitten-hatay.webp`
- `emergency-case-dog-treatment-malatya.webp`
- `feeding-station-winter-hatay.webp`

### Alt Text Requirements

Every image must have descriptive alt text that:

- Describes the content of the image in plain language
- Includes the animal's name if applicable
- Is written in the current page locale (TR or EN)
- Does not start with "Image of" or "Photo of"

Examples:

- TR: "Pamuk, tedavi sonrasi iyilesen beyaz kedi"
- EN: "Pamuk, a white cat recovering after treatment"

### Technical Requirements

| Requirement     | Specification                                |
| --------------- | -------------------------------------------- |
| Format          | WebP (with JPEG fallback for OG images)      |
| Max file size   | 200KB for thumbnails, 500KB for hero images  |
| Dimensions      | Responsive via Next.js Image (srcset)        |
| Lazy loading    | Default for below-fold images                |
| Priority        | `priority` prop for hero/above-fold images   |

---

## Internal Linking Strategy

### Core Principle

Every page should link to the donation page. Every content piece should connect to related content.

### Link Patterns

| From Page        | Links To                                              |
| ---------------- | ----------------------------------------------------- |
| Home             | All main sections, featured animals, latest blog      |
| Animal detail    | Donate, related animals, emergency cases (if any)     |
| Blog post        | Related animals, donate, related blog posts            |
| Emergency case   | Donate (urgent CTA), animal detail (if linked)        |
| Transparency     | Donate, individual reports                             |
| Supplies         | Donate, specific needs                                 |
| All pages        | Donate CTA in footer and/or sidebar                   |

### Blog Post Internal Links

Each blog post should include at least:

- 1 link to an animal detail page
- 1 link to the donation page
- 1 link to another relevant blog post or section

---

## Social Sharing Optimization

### Open Graph Tags

Applied on every page via Next.js Metadata API:

```ts
export const metadata: Metadata = {
  openGraph: {
    title: "...",
    description: "...",
    url: "...",
    siteName: "Paws of Hope",
    images: [{ url: "/api/og?title=...", width: 1200, height: 630 }],
    locale: "tr_TR",
    alternateLocale: "en_US",
    type: "website", // or "article" for blog posts
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
    images: ["/api/og?title=..."],
  },
};
```

### WhatsApp Preview Optimization

WhatsApp uses OG tags for link previews. Ensure:

- `og:title` is concise (under 65 characters)
- `og:description` is compelling (under 155 characters)
- `og:image` is exactly 1200x630px for best display
- Turkish characters render correctly in the preview

WhatsApp sharing is a primary sharing method for the Turkish audience.

### Platform-Specific Considerations

| Platform   | Key Factor                                    |
| ---------- | --------------------------------------------- |
| WhatsApp   | Primary sharing channel — optimize OG image   |
| Instagram  | Stories with link stickers — visual-first      |
| Twitter/X  | Summary large image card — concise titles      |
| Facebook   | OG tags — full description visible             |

---

## Related Docs

- [Technical PRD](../prd/03-technical.md) — SEO implementation details
- [Design System](../prd/04-design-system.md) — visual identity for OG images
- [Glossary](../reference/glossary.md) — Turkish terms used in content
- [Features PRD](../prd/02-features.md) — page-level requirements
