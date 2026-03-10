# M6 Core Pages — Design Document

> Created: 2026-03-10

## Overview

Implement skeleton versions of the core pages: Home, Story (via CMS blocks), Contact, and 404. Focus on CMS structure and page scaffolding — visual polish comes later.

## Decisions

### Home Page
- **Custom code sections** (hardcoded structure in code, not CMS blocks)
- **Monolithic data fetching**: Single fetch point using `Promise.all` for all collections
- **Section order**: Hero > Stats > Featured Animals > Active Emergencies > Support Methods > Supporter Comments > Blog > Instagram
- **ISR**: `revalidate = 60`

### Story Page
- Uses **Pages collection** with 2 new custom blocks:
  - **TimelineBlock**: Vertical timeline with items (time, title, description)
  - **MissionBlock**: Mission statement with rich text, image, goals list, CTA
- Admin panel editable — content managed via Payload CMS

### Contact Page
- Dedicated route at `/[locale]/iletisim`
- Pulls data from **SiteSettings** global (phone, email, whatsapp, instagram)
- 4 contact cards grid layout

### 404 Page
- i18n support via `useTranslations`
- 3 navigation links: Home, Animals, Donate
- Decorative paw print icon

## Section Components (Home)

| Component | Type | Data Source |
|-----------|------|-------------|
| HomeHero | Server | i18n translations |
| StatsSection | Server | SiteSettings prop |
| CountUpNumber | Client | props (IntersectionObserver + rAF) |
| FeaturedAnimals | Server | animals collection prop |
| ActiveEmergencies | Server | emergency-cases collection prop |
| SupportCards | Server | SiteSettings + i18n |
| SupporterCommentsSection | Server | supporter-comments prop |
| SupporterCommentsCarousel | Client | props (embla carousel) |
| RecentPosts | Server | posts collection prop |
| InstagramFeedPlaceholder | Server | SiteSettings prop |

## New CMS Blocks

### TimelineBlock
```
slug: 'timeline'
fields:
  - title (text, localized, required)
  - items (array):
    - time (text, localized)
    - title (text, localized, required)
    - description (textarea, localized)
```

### MissionBlock
```
slug: 'mission'
fields:
  - title (text, localized, required)
  - content (richText / Lexical)
  - image (upload, media)
  - goals (array):
    - text (text, localized, required)
  - ctaLabel (text, localized)
  - ctaLink (text)
```

## Reused Existing Components
- Section, Container, Heading (shared)
- CopyButton, WhatsAppButton, StatusBadge, ProgressBar (shared)
- PageBreadcrumb (shared)
- Card, Button (shadcn/ui)
- Carousel (shadcn/ui embla wrapper)
- Link from `@/i18n/navigation`
