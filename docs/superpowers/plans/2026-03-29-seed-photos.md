# Seed Photos Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 4 generic PayloadCMS template images with 22 curated Unsplash photos that evoke empathy for stray animals, mapped to specific animals, posts, emergency cases, and hero sections.

**Architecture:** Single `images.ts` file defines all 22 photo metadata entries with fixed Unsplash URLs. The seed `index.ts` fetches all images in parallel, creates Media documents, then passes them to post/animal/emergency-case creators. Each post gets a unique heroImage and blockImage instead of cycling through 3 shared images.

**Tech Stack:** TypeScript, PayloadCMS seed system, Unsplash static URLs (no API key needed)

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| **Create** | `src/endpoints/seed/images.ts` | All 22 photo definitions (alt, caption, Unsplash URL) |
| **Delete** | `src/endpoints/seed/image-1.ts` | Replaced by images.ts |
| **Delete** | `src/endpoints/seed/image-2.ts` | Replaced by images.ts |
| **Delete** | `src/endpoints/seed/image-3.ts` | Replaced by images.ts |
| **Delete** | `src/endpoints/seed/image-hero-1.ts` | Replaced by images.ts |
| **Modify** | `src/endpoints/seed/index.ts` | New image imports, parallel fetch, updated wiring |
| **Modify** | `src/endpoints/seed/post-1.ts` | No change needed (uses PostArgs as-is) |
| **No change** | `src/endpoints/seed/post-2.ts` through `post-9.ts` | PostArgs interface unchanged |
| **No change** | `src/endpoints/seed/home.ts` | HomeArgs interface unchanged |
| **No change** | `src/endpoints/seed/factories.ts` | No changes needed |

---

### Task 1: Create images.ts with all 22 photo definitions

**Files:**
- Create: `src/endpoints/seed/images.ts`

- [ ] **Step 1: Create the images.ts file**

This file exports all photo metadata. Each entry has a key, alt text (Turkish), optional Lexical caption, and Unsplash URL. The URL format uses `https://images.unsplash.com/photo-{ID}?w=1200&q=80` for consistent sizing.

```ts
// src/endpoints/seed/images.ts
import type { Media } from '@/payload-types'
import { simpleLexicalContent } from './factories'

type SeedImage = {
  meta: Omit<Media, 'createdAt' | 'id' | 'updatedAt'>
  url: string
}

// ── Animal Profiles ──────────────────────────────────────────────
export const imgPortakal: SeedImage = {
  meta: {
    alt: 'Portakal — 3 yaşında turuncu tekir kedi, pencere kenarında güneşleniyor',
  },
  url: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=1200&q=80',
}

export const imgFindik: SeedImage = {
  meta: {
    alt: 'Fındık — 1 yaşında kahverengi genç kedi, meraklı bakışlarla kameraya bakıyor',
  },
  url: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&q=80',
}

export const imgCesur: SeedImage = {
  meta: {
    alt: 'Cesur — 4 yaşında Kangal köpeği, sadık ve güçlü duruşuyla poz veriyor',
  },
  url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
}

export const imgZeytin: SeedImage = {
  meta: {
    alt: 'Zeytin — 2 yaşında siyah melez köpek, hüzünlü gözlerle bakıyor',
  },
  url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&q=80',
}

// ── Hero Images ──────────────────────────────────────────────────
export const imgHeroHome: SeedImage = {
  meta: {
    alt: 'Sokak kedisi şehir silueti önünde oturuyor — Paws of Hope ana sayfa',
  },
  url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1600&q=80',
}

export const imgHeroGeneral: SeedImage = {
  meta: {
    alt: 'Sokak köpeği kentsel manzarada yürüyor',
  },
  url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80',
}

// ── Blog Post Images ─────────────────────────────────────────────
export const imgPostDeprem: SeedImage = {
  meta: {
    alt: 'Deprem sonrası enkazda kurtarılmayı bekleyen kedi',
    caption: simpleLexicalContent(['Deprem sonrası kurtarma çalışmalarından bir kare.']),
  },
  url: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&q=80',
}

export const imgPostPortakal: SeedImage = {
  meta: {
    alt: 'Mutlu turuncu tekir kedi yeni yuvasında',
    caption: simpleLexicalContent(["Portakal'ın tedavi sonrası yeni hayatından bir görüntü."]),
  },
  url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200&q=80',
}

export const imgPostKis: SeedImage = {
  meta: {
    alt: 'Karlı sokakta yemek yiyen sokak kedileri',
    caption: simpleLexicalContent(['Kış aylarında besleme noktalarından bir kare.']),
  },
  url: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1200&q=80',
}

export const imgPostCesur: SeedImage = {
  meta: {
    alt: 'Bakımlı ve sağlıklı büyük köpek parkta yürüyor',
    caption: simpleLexicalContent(["Cesur'un dönüşüm hikayesinden bir kare."]),
  },
  url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&q=80',
}

export const imgPostKisir: SeedImage = {
  meta: {
    alt: 'Veteriner kliniğinde kedi muayenesi',
    caption: simpleLexicalContent(['Kısırlaştırma kampanyasından bir görüntü.']),
  },
  url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&q=80',
}

export const imgPostFindik: SeedImage = {
  meta: {
    alt: 'İyileşme sürecinde battaniyeye sarılmış yavru kedi',
    caption: simpleLexicalContent(["Fındık'ın tedavi sürecinden bir kare."]),
  },
  url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80',
}

export const imgPostBesleme: SeedImage = {
  meta: {
    alt: 'Sokak kedileri mama kaplarının başında besleniyor',
    caption: simpleLexicalContent(['Günlük besleme turumuzdan bir görüntü.']),
  },
  url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&q=80',
}

export const imgPostEtkinlik: SeedImage = {
  meta: {
    alt: 'Hayvan sahiplendirme etkinliğinde gönüllüler ve köpekler',
    caption: simpleLexicalContent(['Topluluk etkinliğimizden bir kare.']),
  },
  url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80',
}

export const imgPostZeytin: SeedImage = {
  meta: {
    alt: 'Tedavi gören yaralı köpek veterinerde',
    caption: simpleLexicalContent(["Zeytin'in tedavi günlüğünden bir görüntü."]),
  },
  url: 'https://images.unsplash.com/photo-1612531386530-97d40e3bfbeb?w=1200&q=80',
}

// ── Emergency / Emotional ────────────────────────────────────────
export const imgEmergencyVet: SeedImage = {
  meta: {
    alt: 'Veteriner kliniğinde tedavi edilen sokak köpeği',
  },
  url: 'https://images.unsplash.com/photo-1583337130417-13104dec14a8?w=1200&q=80',
}

export const imgEmergencyStreet: SeedImage = {
  meta: {
    alt: 'Soğuk yağmurlu bir günde sokakta bekleyen yalnız kedi',
  },
  url: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?w=1200&q=80',
}

// ── Before/After (Emergency Cases) ───────────────────────────────
export const imgBeforeZeytin: SeedImage = {
  meta: {
    alt: 'Zeytin — trafik kazası sonrası tedavi öncesi hali',
  },
  url: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=1200&q=80',
}

export const imgAfterZeytin: SeedImage = {
  meta: {
    alt: 'Zeytin — tedavi sonrası iyileşmiş ve sağlıklı hali',
  },
  url: 'https://images.unsplash.com/photo-1587559070757-f72a388edbba?w=1200&q=80',
}

export const imgBeforeFindik: SeedImage = {
  meta: {
    alt: 'Fındık — üst solunum yolu enfeksiyonu tedavi öncesi',
  },
  url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&q=80',
}

export const imgAfterFindik: SeedImage = {
  meta: {
    alt: 'Fındık — tedavi sonrası sağlıklı ve oyuncu hali',
  },
  url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&q=80',
}

// ── Activity ─────────────────────────────────────────────────────
export const imgActivityFeeding: SeedImage = {
  meta: {
    alt: 'Gönüllüler sokak hayvanlarını besliyor',
  },
  url: 'https://images.unsplash.com/photo-1450778869180-e77d3c79db18?w=1200&q=80',
}

/** All images in fetch order */
export const allImages = [
  imgPortakal, imgFindik, imgCesur, imgZeytin,
  imgHeroHome, imgHeroGeneral,
  imgPostDeprem, imgPostPortakal, imgPostKis, imgPostCesur,
  imgPostKisir, imgPostFindik, imgPostBesleme, imgPostEtkinlik, imgPostZeytin,
  imgEmergencyVet, imgEmergencyStreet,
  imgBeforeZeytin, imgAfterZeytin, imgBeforeFindik, imgAfterFindik,
  imgActivityFeeding,
] as const
```

- [ ] **Step 2: Verify file compiles**

Run: `npx tsc --noEmit src/endpoints/seed/images.ts 2>&1 | head -20`

Expected: No errors (or only unrelated project errors)

- [ ] **Step 3: Commit**

```bash
git add src/endpoints/seed/images.ts
git commit -m "feat(seed): add 22 curated Unsplash photo definitions in images.ts"
```

---

### Task 2: Delete old image files

**Files:**
- Delete: `src/endpoints/seed/image-1.ts`
- Delete: `src/endpoints/seed/image-2.ts`
- Delete: `src/endpoints/seed/image-3.ts`
- Delete: `src/endpoints/seed/image-hero-1.ts`

- [ ] **Step 1: Delete the 4 old image files**

```bash
rm src/endpoints/seed/image-1.ts src/endpoints/seed/image-2.ts src/endpoints/seed/image-3.ts src/endpoints/seed/image-hero-1.ts
```

- [ ] **Step 2: Commit**

```bash
git add -u src/endpoints/seed/image-1.ts src/endpoints/seed/image-2.ts src/endpoints/seed/image-3.ts src/endpoints/seed/image-hero-1.ts
git commit -m "chore(seed): remove old generic template image files"
```

---

### Task 3: Rewrite index.ts to use new images

**Files:**
- Modify: `src/endpoints/seed/index.ts`

This is the largest task. The seed index needs to:
1. Import from `./images` instead of individual image files
2. Fetch all 22 images in parallel
3. Create all Media documents
4. Wire each post to its unique heroImage + blockImage
5. Add `photos` to animal seed data
6. Add `photos`, `beforePhoto`, `afterPhoto` to emergency case seed data

- [ ] **Step 1: Rewrite index.ts**

Replace the entire file content. Key changes from current version:
- Imports: `allImages` + named exports from `./images` (not `image-1`, `image-2` etc.)
- `fetchFileByURL` stays the same
- Media seeding: fetch all 22 URLs in parallel, create all 22 Media docs
- Posts: each post gets its own unique `heroImage` and `blockImage` pair
- Animals: add `photos: [imageDoc.id]` to each animal
- Emergency cases: add `photos`, `beforePhoto`, `afterPhoto` fields

The full replacement for `src/endpoints/seed/index.ts`:

```ts
import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { home } from './home'
import {
  allImages,
  imgPortakal, imgFindik, imgCesur, imgZeytin,
  imgHeroHome, imgHeroGeneral,
  imgPostDeprem, imgPostPortakal, imgPostKis, imgPostCesur,
  imgPostKisir, imgPostFindik, imgPostBesleme, imgPostEtkinlik, imgPostZeytin,
  imgEmergencyVet, imgEmergencyStreet,
  imgBeforeZeytin, imgAfterZeytin, imgBeforeFindik, imgAfterFindik,
  imgActivityFeeding,
} from './images'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { post4 } from './post-4'
import { post5 } from './post-5'
import { post6 } from './post-6'
import { post7 } from './post-7'
import { post8 } from './post-8'
import { post9 } from './post-9'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'search',
  'animals',
  'emergency-cases',
  'needs-list',
  'transparency-reports',
]

const _globals: GlobalSlug[] = ['header', 'site-settings']

const categories = ['Kurtarma', 'Tedavi', 'Günlük', 'Duyuru', 'Etkinlik', 'Kısırlaştırma']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: { navItems: [] },
      depth: 0,
      context: { disableRevalidate: true },
    }),
    payload.updateGlobal({
      slug: 'site-settings',
      data: {},
      depth: 0,
      context: { disableRevalidate: true },
    }),
  ])

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  payload.logger.info(`— Seeding demo author and user...`)

  await payload.delete({
    collection: 'users',
    depth: 0,
    where: { email: { equals: 'demo-author@example.com' } },
  })

  payload.logger.info(`— Fetching ${allImages.length} images from Unsplash...`)

  const imageBuffers = await Promise.all(allImages.map((img) => fetchFileByURL(img.url)))

  payload.logger.info(`— Creating media documents...`)

  const demoAuthor = await payload.create({
    collection: 'users',
    data: {
      name: 'Paws of Hope',
      email: 'demo-author@example.com',
      password: 'password',
    },
  })

  // Create all media documents in parallel
  const mediaDocs = await Promise.all(
    allImages.map((img, i) =>
      payload.create({
        collection: 'media',
        data: img.meta,
        file: imageBuffers[i],
      }),
    ),
  )

  // Build a lookup map: image reference -> Media doc
  const img = new Map(allImages.map((ref, i) => [ref, mediaDocs[i]]))

  // Seed categories
  await Promise.all(
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: { title: category, slug: category },
      }),
    ),
  )

  payload.logger.info(`— Seeding posts...`)

  // Each post gets a unique hero + block image pair
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post1({ heroImage: img.get(imgPostDeprem)!, blockImage: img.get(imgActivityFeeding)!, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post2({ heroImage: img.get(imgPostPortakal)!, blockImage: img.get(imgPortakal)!, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post3({ heroImage: img.get(imgPostKis)!, blockImage: img.get(imgEmergencyStreet)!, author: demoAuthor }),
  })

  const post4Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post4({ heroImage: img.get(imgPostCesur)!, blockImage: img.get(imgCesur)!, author: demoAuthor }),
  })

  const post5Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post5({ heroImage: img.get(imgPostKisir)!, blockImage: img.get(imgEmergencyVet)!, author: demoAuthor }),
  })

  const post6Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post6({ heroImage: img.get(imgPostFindik)!, blockImage: img.get(imgFindik)!, author: demoAuthor }),
  })

  const post7Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post7({ heroImage: img.get(imgPostBesleme)!, blockImage: img.get(imgActivityFeeding)!, author: demoAuthor }),
  })

  const post8Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post8({ heroImage: img.get(imgPostEtkinlik)!, blockImage: img.get(imgPostBesleme)!, author: demoAuthor }),
  })

  const post9Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: { disableRevalidate: true },
    data: post9({ heroImage: img.get(imgPostZeytin)!, blockImage: img.get(imgZeytin)!, author: demoAuthor }),
  })

  // Link related posts
  await Promise.all([
    payload.update({ id: post1Doc.id, collection: 'posts', data: { relatedPosts: [post2Doc.id, post4Doc.id] } }),
    payload.update({ id: post2Doc.id, collection: 'posts', data: { relatedPosts: [post6Doc.id, post4Doc.id] } }),
    payload.update({ id: post3Doc.id, collection: 'posts', data: { relatedPosts: [post7Doc.id, post8Doc.id] } }),
    payload.update({ id: post4Doc.id, collection: 'posts', data: { relatedPosts: [post2Doc.id, post6Doc.id] } }),
    payload.update({ id: post5Doc.id, collection: 'posts', data: { relatedPosts: [post9Doc.id, post1Doc.id] } }),
    payload.update({ id: post6Doc.id, collection: 'posts', data: { relatedPosts: [post2Doc.id, post9Doc.id] } }),
    payload.update({ id: post7Doc.id, collection: 'posts', data: { relatedPosts: [post3Doc.id, post8Doc.id] } }),
    payload.update({ id: post8Doc.id, collection: 'posts', data: { relatedPosts: [post7Doc.id, post5Doc.id] } }),
    payload.update({ id: post9Doc.id, collection: 'posts', data: { relatedPosts: [post6Doc.id, post5Doc.id] } }),
  ])

  payload.logger.info(`— Seeding pages...`)

  await payload.create({
    collection: 'pages',
    depth: 0,
    data: home({ heroImage: img.get(imgHeroHome)!, metaImage: img.get(imgHeroGeneral)! }),
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        brandName: 'PAWS OF HOPE',
        navItems: [
          { link: { type: 'custom', url: '/' }, label: 'Ana Sayfa', isCta: false },
          { link: { type: 'custom', url: '/calismalarimiz' }, label: 'Çalışmalarımız', isCta: false },
          { link: { type: 'custom', url: '/acil-vakalar' }, label: 'Acil Vakalar', isCta: false },
          { link: { type: 'custom', url: '/gonullu-ol' }, label: 'Gönüllü Ol', isCta: false },
          { link: { type: 'custom', url: '/gunluk' }, label: 'Günlük', isCta: false },
          { link: { type: 'custom', url: '/destek-ol' }, label: 'Destek Ol', isCta: true },
        ],
      },
    }),
  ])

  payload.logger.info(`— Seeding animals...`)

  const _animal1 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Portakal',
      type: 'kedi',
      age: '3 yaş',
      gender: 'disi',
      animalStatus: 'kalici-bakim',
      featured: true,
      slug: 'portakal',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      photos: [img.get(imgPortakal)!.id],
    },
  })

  const animal2 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Fındık',
      type: 'kedi',
      age: '1 yaş',
      gender: 'erkek',
      animalStatus: 'kalici-bakim',
      featured: false,
      slug: 'findik',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      photos: [img.get(imgFindik)!.id],
    },
  })

  const _animal3 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Cesur',
      type: 'kopek',
      age: '4 yaş',
      gender: 'erkek',
      animalStatus: 'kalici-bakim',
      featured: true,
      slug: 'cesur',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      photos: [img.get(imgCesur)!.id],
    },
  })

  const animal4 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Zeytin',
      type: 'kopek',
      age: '2 yaş',
      gender: 'disi',
      animalStatus: 'acil',
      featured: false,
      slug: 'zeytin',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      photos: [img.get(imgZeytin)!.id],
    },
  })

  payload.logger.info(`— Seeding emergency cases...`)

  await payload.create({
    collection: 'emergency-cases',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Zeytin Trafik Kazası Tedavisi',
      animal: animal4.id,
      targetAmount: 3000,
      collectedAmount: 800,
      caseStatus: 'aktif',
      slug: 'zeytin-trafik-kazasi-tedavisi',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      photos: [img.get(imgEmergencyVet)!.id],
      beforePhoto: img.get(imgBeforeZeytin)!.id,
      afterPhoto: img.get(imgAfterZeytin)!.id,
    },
  })

  await payload.create({
    collection: 'emergency-cases',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Fındık Üst Solunum Yolu Enfeksiyonu',
      animal: animal2.id,
      targetAmount: 1500,
      collectedAmount: 1500,
      caseStatus: 'tamamlandi',
      slug: 'findik-ust-solunum-yolu-enfeksiyonu',
      _status: 'published',
      publishedAt: new Date().toISOString(),
      photos: [img.get(imgPostFindik)!.id],
      beforePhoto: img.get(imgBeforeFindik)!.id,
      afterPhoto: img.get(imgAfterFindik)!.id,
    },
  })

  payload.logger.info(`— Seeding needs list...`)

  await Promise.all([
    payload.create({
      collection: 'needs-list',
      data: {
        productName: 'Kuru Mama (Kedi)',
        brandDetail: 'ProPlan / Royal Canin',
        urgency: 'acil',
        stockStatus: 'Tükenmek üzere',
        targetStock: 30,
        currentStock: 3,
        unit: 'kg',
        priority: 'acil',
      },
    }),
    payload.create({
      collection: 'needs-list',
      data: {
        productName: 'Kuru Mama (Köpek)',
        brandDetail: 'ProPlan Adult',
        urgency: 'acil',
        stockStatus: '1 torba kaldı',
        targetStock: 25,
        currentStock: 4,
        unit: 'kg',
        priority: 'acil',
      },
    }),
    payload.create({
      collection: 'needs-list',
      data: {
        productName: 'Kedi Kumu',
        brandDetail: 'Ever Clean',
        urgency: 'orta',
        stockStatus: '3 kutu mevcut',
        targetStock: 10,
        currentStock: 3,
        unit: 'kutu',
        priority: 'orta',
      },
    }),
    payload.create({
      collection: 'needs-list',
      data: {
        productName: 'Veteriner Malzemesi',
        brandDetail: 'Bandaj, antiseptik',
        urgency: 'yeterli',
        stockStatus: 'Stokta yeterli',
        targetStock: 5,
        currentStock: 4,
        unit: 'adet',
        priority: 'dusuk',
      },
    }),
  ])

  payload.logger.info(`— Seeding transparency report...`)

  await payload.create({
    collection: 'transparency-reports',
    data: {
      title: 'Şubat 2026 Raporu',
      month: '2026-02-01T00:00:00.000Z',
      expenses: [
        { category: 'Veteriner', amount: 3500 },
        { category: 'Mama', amount: 2000 },
        { category: 'Malzeme', amount: 500 },
      ],
      totalExpense: 6000,
      totalDonation: 6500,
      donorList: [
        { name: 'Anonim', amount: 2500 },
        { name: 'Ayşe H.', amount: 2000 },
        { name: 'Instagram Takipçileri', amount: 2000 },
      ],
    },
  })

  payload.logger.info(`— Seeding site settings...`)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      bankAccounts: [
        {
          bankName: 'Ziraat Bankası',
          accountHolder: 'Paws of Hope',
          iban: 'TR00 0000 0000 0000 0000 0000 00',
          currency: 'TRY',
        },
      ],
      socialLinks: [
        { type: 'instagram', url: 'https://instagram.com/pawsofhope' },
        { type: 'whatsapp', url: '+905551234567' },
        { type: 'phone', url: '+905551234567' },
        { type: 'email', url: 'info@pawsofhope.org' },
      ],
      catsCount: 60,
      dogsCount: 40,
      treatedCount: 30,
      spayedCount: 15,
      vaccinatedCount: 55,
    },
    context: { disableRevalidate: true },
  })

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop()?.split('?')[0] || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: 'image/jpeg',
    size: data.byteLength,
  }
}
```

**Key differences from original:**
1. `fetchFileByURL` now strips query params from filename (`split('?')[0]`)
2. `mimetype` is `'image/jpeg'` (Unsplash serves JPEG, not webp)
3. All 22 images fetched in one `Promise.all` batch
4. Map-based lookup for image->doc wiring
5. Each post gets unique heroImage + blockImage (no cycling through 3)
6. Animals get `photos` array
7. Emergency cases get `photos`, `beforePhoto`, `afterPhoto`

- [ ] **Step 2: Verify TypeScript compiles**

Run: `tsc --noEmit 2>&1 | grep "seed/index" | head -10`

Expected: No errors from seed/index.ts

- [ ] **Step 3: Commit**

```bash
git add src/endpoints/seed/index.ts
git commit -m "feat(seed): rewrite index.ts to use 22 curated Unsplash photos

- Each post gets unique hero + block image (no more cycling 3 images)
- Animals now have profile photos
- Emergency cases have photos, before/after images
- All images fetched in parallel from Unsplash"
```

---

### Task 4: Verify Unsplash URLs are accessible

**Files:** None (verification only)

- [ ] **Step 1: Test that all 22 Unsplash URLs return 200**

```bash
# Extract URLs from images.ts and test each one
urls=(
  "https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=1200&q=80"
  "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&q=80"
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80"
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&q=80"
  "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1600&q=80"
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80"
  "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&q=80"
  "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200&q=80"
  "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1200&q=80"
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&q=80"
  "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&q=80"
  "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80"
  "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&q=80"
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80"
  "https://images.unsplash.com/photo-1612531386530-97d40e3bfbeb?w=1200&q=80"
  "https://images.unsplash.com/photo-1583337130417-13104dec14a8?w=1200&q=80"
  "https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?w=1200&q=80"
  "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=1200&q=80"
  "https://images.unsplash.com/photo-1587559070757-f72a388edbba?w=1200&q=80"
  "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&q=80"
  "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&q=80"
  "https://images.unsplash.com/photo-1450778869180-e77d3c79db18?w=1200&q=80"
)

for url in "${urls[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$status $url"
done
```

Expected: All 22 lines show `200` status. If any URL returns non-200, find a replacement photo on Unsplash and update `images.ts`.

- [ ] **Step 2: Visually verify key photos match their descriptions**

Open in browser to confirm:
- `imgPortakal` URL shows an orange tabby cat
- `imgCesur` URL shows a large shepherd-type dog
- `imgZeytin` URL shows a dark/black dog with sad expression
- `imgFindik` URL shows a brown young cat

If any photo doesn't match the description, find a better Unsplash photo and update the URL + photo ID in `images.ts`.

---

### Task 5: Run seed and verify

**Files:** None (testing only)

- [ ] **Step 1: Run the seed script**

Run: `pnpm run seed`

Expected: All log lines print without errors:
```
— Clearing collections and globals...
— Fetching 22 images from Unsplash...
— Creating media documents...
— Seeding posts...
— Seeding pages...
— Seeding globals...
— Seeding animals...
— Seeding emergency cases...
— Seeding needs list...
— Seeding transparency report...
— Seeding site settings...
Seeded database successfully!
```

- [ ] **Step 2: Verify in admin panel**

1. Go to `/admin/collections/media` — should show 22 media items with Unsplash photos
2. Go to `/admin/collections/animals` — each animal should have a photo in the "Fotoğraflar" field
3. Go to `/admin/collections/emergency-cases` — each case should have photos, beforePhoto, afterPhoto
4. Go to `/admin/collections/posts` — each post should have a unique hero image

- [ ] **Step 3: Verify frontend**

1. Homepage hero should show a cat + city scene
2. Blog posts should each have a distinct image
3. Animal cards should show profile photos

- [ ] **Step 4: Final commit if any URL fixes were needed**

```bash
git add -A
git commit -m "fix(seed): adjust Unsplash URLs after verification"
```

(Skip this step if no fixes were needed)
