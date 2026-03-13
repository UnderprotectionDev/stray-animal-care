import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'

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

const _globals: GlobalSlug[] = ['header', 'footer', 'site-settings']

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    ...(['header', 'footer'] as const).map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
      }),
    ),
    payload.updateGlobal({
      slug: 'site-settings',
      data: {},
      depth: 0,
      context: {
        disableRevalidate: true,
      },
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
    where: {
      email: {
        equals: 'demo-author@example.com',
      },
    },
  })

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [demoAuthor, image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Demo Author',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    payload.create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author: demoAuthor }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author: demoAuthor }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author: demoAuthor }),
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
  })

  payload.logger.info(`— Seeding pages...`)

  await payload.create({
    collection: 'pages',
    depth: 0,
    data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        brandName: 'UMUT PATİLERİ',
        navItems: [
          {
            link: { type: 'custom', url: '/' },
            label: 'Ana Sayfa',
            isCta: false,
          },
          {
            link: { type: 'custom', url: '/canlarimiz' },
            label: 'Canlarımız',
            isCta: false,
          },
          {
            link: { type: 'custom', url: '/acil-vakalar' },
            label: 'Acil Vakalar',
            isCta: false,
          },
          {
            link: { type: 'custom', url: '/gonullu-ol' },
            label: 'Gönüllü Ol',
            isCta: false,
          },
          {
            link: { type: 'custom', url: '/gunluk' },
            label: 'Günlük',
            isCta: false,
          },
          {
            link: { type: 'custom', url: '/destek-ol' },
            label: 'Destek Ol',
            isCta: true,
          },
        ],
        socialLinks: [
          { label: 'Instagram', url: 'https://instagram.com/umutpatileri' },
          { label: 'Twitter', url: 'https://twitter.com/umutpatileri' },
        ],
      },
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
    }),
  ])

  // --- M4: Seed new collections ---
  payload.logger.info(`— Seeding animals...`)

  const _animal1 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Pamuk',
      type: 'kedi',
      age: '2 yas',
      gender: 'disi',
      animalStatus: 'kalici-bakim',
      featured: true,
      slug: 'pamuk',
      _status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

  const animal2 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Karamel',
      type: 'kedi',
      age: '1 yas',
      gender: 'erkek',
      animalStatus: 'tedavide',
      featured: false,
      slug: 'karamel',
      _status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

  const _animal3 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Boncuk',
      type: 'kopek',
      age: '3 yas',
      gender: 'disi',
      animalStatus: 'kalici-bakim',
      featured: true,
      slug: 'boncuk',
      _status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

  const animal4 = await payload.create({
    collection: 'animals',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      name: 'Karabas',
      type: 'kopek',
      age: '5 yas',
      gender: 'erkek',
      animalStatus: 'acil',
      featured: false,
      slug: 'karabas',
      _status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

  payload.logger.info(`— Seeding emergency cases...`)

  await payload.create({
    collection: 'emergency-cases',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Karabas Acil Ameliyat',
      animal: animal4.id,
      targetAmount: 5000,
      collectedAmount: 1200,
      caseStatus: 'aktif',
      slug: 'karabas-acil-ameliyat',
      _status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

  await payload.create({
    collection: 'emergency-cases',
    depth: 0,
    context: { disableRevalidate: true },
    data: {
      title: 'Karamel Goz Tedavisi',
      animal: animal2.id,
      targetAmount: 2000,
      collectedAmount: 2000,
      caseStatus: 'tamamlandi',
      slug: 'karamel-goz-tedavisi',
      _status: 'published',
      publishedAt: new Date().toISOString(),
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
        stockStatus: 'Tukenmek uzere',
        targetStock: 50,
        currentStock: 3,
        unit: 'kg',
        priority: 'acil',
      },
    }),
    payload.create({
      collection: 'needs-list',
      data: {
        productName: 'Kuru Mama (Kopek)',
        brandDetail: 'ProPlan Adult',
        urgency: 'acil',
        stockStatus: '2 torba kaldi',
        targetStock: 40,
        currentStock: 5,
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
        stockStatus: '5 kutu mevcut',
        targetStock: 20,
        currentStock: 5,
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
        targetStock: 10,
        currentStock: 8,
        unit: 'adet',
        priority: 'dusuk',
      },
    }),
  ])

  payload.logger.info(`— Seeding transparency report...`)

  await payload.create({
    collection: 'transparency-reports',
    data: {
      title: 'Subat 2026 Raporu',
      month: '2026-02-01T00:00:00.000Z',
      expenses: [
        { category: 'Veteriner', amount: 8500 },
        { category: 'Mama', amount: 4200 },
        { category: 'Barinma', amount: 2000 },
      ],
      totalExpense: 14700,
      totalDonation: 16000,
      donorList: [
        { name: 'Ayse Y.', amount: 5000 },
        { name: 'Mehmet K.', amount: 3000 },
        { name: 'Anonim', amount: 8000 },
      ],
    },
  })

  payload.logger.info(`— Seeding site settings...`)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      bankAccounts: [
        {
          bankName: 'Ziraat Bankasi',
          accountHolder: 'Paws of Hope Dernegi',
          iban: 'TR00 0000 0000 0000 0000 0000 00',
          currency: 'TRY',
        },
      ],
      phone: '+90 555 123 4567',
      email: 'info@pawsofhope.org',
      whatsapp: '+905551234567',
      instagram: 'pawsofhope',
      catsCount: 45,
      dogsCount: 30,
      treatedCount: 120,
      spayedCount: 85,
      vaccinatedCount: 200,
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
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
