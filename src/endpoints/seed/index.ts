import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { home } from './home'
import {
  allImages,
  imgPortakal,
  imgFindik,
  imgCesur,
  imgZeytin,
  imgHeroHome,
  imgHeroGeneral,
  imgPostDeprem,
  imgPostPortakal,
  imgPostKis,
  imgPostCesur,
  imgPostKisir,
  imgPostFindik,
  imgPostBesleme,
  imgPostEtkinlik,
  imgPostZeytin,
  imgEmergencyVet,
  imgEmergencyStreet,
  imgBeforeZeytin,
  imgAfterZeytin,
  imgBeforeFindik,
  imgAfterFindik,
  imgStoryDeprem,
  imgStoryFeeding,
  imgStoryVet,
  imgStoryCommunity,
  imgActivityFeeding,
} from './images'
import { simpleLexicalContent } from './factories'
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
      data: {
        navItems: [],
      },
      depth: 0,
      context: {
        disableRevalidate: true,
      },
    }),
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

  payload.logger.info(`— Fetching all 26 images in parallel...`)

  const imageBuffers = await Promise.all(allImages.map((ref) => fetchFileByURL(ref.url)))

  payload.logger.info(`— Creating media docs and demo author...`)

  const [demoAuthor, ...mediaDocs] = await Promise.all([
    payload.create({
      collection: 'users',
      data: {
        name: 'Paws of Hope',
        email: 'demo-author@example.com',
        password: 'password',
      },
    }),
    ...allImages.map((ref, i) =>
      payload.create({
        collection: 'media',
        data: ref.meta,
        file: imageBuffers[i],
      }),
    ),
  ])

  // Build a Map from image reference → created Media document
  const img = new Map(allImages.map((ref, i) => [ref, mediaDocs[i]]))

  // Seed categories
  await Promise.all(
    categories.map((category) =>
      payload.create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
      }),
    ),
  )

  payload.logger.info(`— Seeding posts...`)

  const post1Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({
      heroImage: img.get(imgPostDeprem)!,
      blockImage: img.get(imgActivityFeeding)!,
      author: demoAuthor,
    }),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({
      heroImage: img.get(imgPostPortakal)!,
      blockImage: img.get(imgPortakal)!,
      author: demoAuthor,
    }),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({
      heroImage: img.get(imgPostKis)!,
      blockImage: img.get(imgEmergencyStreet)!,
      author: demoAuthor,
    }),
  })

  const post4Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post4({
      heroImage: img.get(imgPostCesur)!,
      blockImage: img.get(imgCesur)!,
      author: demoAuthor,
    }),
  })

  const post5Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post5({
      heroImage: img.get(imgPostKisir)!,
      blockImage: img.get(imgEmergencyVet)!,
      author: demoAuthor,
    }),
  })

  const post6Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post6({
      heroImage: img.get(imgPostFindik)!,
      blockImage: img.get(imgFindik)!,
      author: demoAuthor,
    }),
  })

  const post7Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post7({
      heroImage: img.get(imgPostBesleme)!,
      blockImage: img.get(imgActivityFeeding)!,
      author: demoAuthor,
    }),
  })

  const post8Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post8({
      heroImage: img.get(imgPostEtkinlik)!,
      blockImage: img.get(imgPostBesleme)!,
      author: demoAuthor,
    }),
  })

  const post9Doc = await payload.create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post9({
      heroImage: img.get(imgPostZeytin)!,
      blockImage: img.get(imgZeytin)!,
      author: demoAuthor,
    }),
  })

  // Link related posts — each post gets 2 thematically related posts
  await Promise.all([
    payload.update({
      id: post1Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post2Doc.id, post4Doc.id] }, // deprem → kurtarma hikayeleri
    }),
    payload.update({
      id: post2Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post6Doc.id, post4Doc.id] }, // portakal → fındık, cesur
    }),
    payload.update({
      id: post3Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post7Doc.id, post8Doc.id] }, // kış → besleme turu, etkinlik
    }),
    payload.update({
      id: post4Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post2Doc.id, post6Doc.id] }, // cesur → portakal, fındık
    }),
    payload.update({
      id: post5Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post9Doc.id, post1Doc.id] }, // kısırlaştırma → tedavi, deprem
    }),
    payload.update({
      id: post6Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post2Doc.id, post9Doc.id] }, // fındık → portakal, zeytin
    }),
    payload.update({
      id: post7Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post3Doc.id, post8Doc.id] }, // besleme turu → kış, etkinlik
    }),
    payload.update({
      id: post8Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post7Doc.id, post5Doc.id] }, // etkinlik → besleme turu, kısırlaştırma
    }),
    payload.update({
      id: post9Doc.id,
      collection: 'posts',
      data: { relatedPosts: [post6Doc.id, post5Doc.id] }, // zeytin → fındık, kısırlaştırma
    }),
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
          {
            link: { type: 'custom', url: '/' },
            label: 'Ana Sayfa',
            isCta: false,
          },
          {
            link: { type: 'custom', url: '/calismalarimiz' },
            label: 'Çalışmalarımız',
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
      homepageBlocks: [
        {
          blockType: 'homeStory',
          enabled: true,
          sectionTitle: 'HİKAYEMİZ & MİSYON',
          steps: [
            {
              title: 'Deprem ve Başlangıç',
              description: simpleLexicalContent([
                '6 Şubat 2023 depremi binlerce sokak hayvanının hayatını alt üst etti. Sahipleri kaybeden, besleme noktaları yıkılan hayvanlar sokaklarda kaldı. İşte o günden sonra harekete geçtik.',
              ]),
              image: img.get(imgStoryDeprem)!.id,
            },
            {
              title: 'İlk Adımlar',
              description: simpleLexicalContent([
                'Birkaç noktaya mama bırakarak başladık. Zamanla bu birkaç nokta düzenli besleme turlarına dönüştü. Her gün yaklaşık 100 kedi ve köpeğin beslenmesine katkı sağlar hale geldik.',
              ]),
              image: img.get(imgStoryFeeding)!.id,
            },
            {
              title: 'Tedavi & Kısırlaştırma',
              description: simpleLexicalContent([
                'Sadece mama değil — kısırlaştırma çalışmalarına destek veriyor, hasta ve yaralı hayvanların veterinere ulaşmasına yardımcı oluyoruz.',
              ]),
              image: img.get(imgStoryVet)!.id,
            },
            {
              title: 'Topluluk & Gelecek',
              description: simpleLexicalContent([
                'Tüm bu çalışmaları büyük ölçüde bireysel imkanlarla yürütüyoruz. Hedefimiz sizlerin desteğiyle daha sürdürülebilir hale getirmek ve daha fazla hayvana ulaşabilmek.',
              ]),
              image: img.get(imgStoryCommunity)!.id,
            },
          ],
        },
      ],
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
  const filename = url.split('/').pop()?.split('?')[0] || `file-${Date.now()}`

  return {
    name: filename,
    data: Buffer.from(data),
    mimetype: 'image/jpeg',
    size: data.byteLength,
  }
}
