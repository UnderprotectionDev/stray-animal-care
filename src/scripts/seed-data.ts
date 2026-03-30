/**
 * Full seed script: populates all collections, globals, media and UIStrings with realistic Turkish data.
 *
 * Usage: pnpm tsx src/scripts/seed-data.ts
 *
 * WARNING: This will DELETE all existing data before seeding.
 */

import 'dotenv/config'
import * as fs from 'fs'
import * as path from 'path'
import type { File } from 'payload'
import { getPayload } from 'payload'
import config from '../payload.config'
import { banner, bold, heading, hr, inlineCode, italic, lexicalRoot, link, ol, paragraph, quote, strikethrough, subscriptText, superscript, text, ul } from './lexical-builders'

async function fetchFileByURL(url: string): Promise<File & { data: Buffer }> {
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
    mimetype: `image/${url.split('.').pop()?.split('?')[0] || 'webp'}`,
    size: data.byteLength,
  } as File & { data: Buffer }
}

async function seed() {
  const payload = await getPayload({ config: await config })

  console.log('Cleaning existing data...')

  const collectionsToClean = [
    'vet-records',
    'emergency-cases',
    'animals',
    'posts',
    'categories',
    'events',
    'volunteers',
    'needs-list',
    'transparency-reports',
    'media',
  ] as const

  for (const slug of collectionsToClean) {
    const existing = await payload.find({ collection: slug, limit: 100, depth: 0 })
    for (const doc of existing.docs) {
      await payload.delete({ collection: slug, id: doc.id, context: { disableRevalidate: true } })
    }
    console.log(`  Cleaned ${slug} (${existing.docs.length} docs)`)
  }

  const mediaDir = path.resolve(process.cwd(), 'public/media')
  if (fs.existsSync(mediaDir)) {
    const files = fs.readdirSync(mediaDir)
    for (const file of files) {
      const filePath = path.join(mediaDir, file)
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath)
      }
    }
    console.log(`  Cleared public/media/ (${files.length} files)`)
  }

  console.log('\nSeeding categories...')

  const categoryData = [
    { title: 'Kurtarma Hikayeleri', slug: 'kurtarma-hikayeleri' },
    { title: 'Tedavi Günlüğü', slug: 'tedavi-gunlugu' },
    { title: 'Duyurular', slug: 'duyurular' },
    { title: 'Gönüllü Yazıları', slug: 'gonullu-yazilari' },
    { title: 'Sahiplendirme', slug: 'sahiplendirme' },
  ]

  const categories: Record<string, number> = {}
  for (const cat of categoryData) {
    const created = await payload.create({
      collection: 'categories',
      data: cat,
      context: { disableRevalidate: true },
    })
    categories[cat.slug] = created.id as number
    console.log(`  Created category: ${cat.title}`)
  }

  console.log('\nSeeding media...')

  const imageUrls: Record<string, { url: string; alt: string }> = {
    'cat-1': { url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80&fm=webp', alt: 'Turuncu kedi portresi' },
    'cat-2': { url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&q=80&fm=webp', alt: 'Gri tekir kedi' },
    'cat-3': { url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=1200&q=80&fm=webp', alt: 'Sarı kedi yavrusu' },
    'cat-4': { url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1200&q=80&fm=webp', alt: 'Beyaz kedi' },
    'cat-5': { url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80&fm=webp', alt: 'Siyah beyaz kedi' },
    'cat-6': { url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200&q=80&fm=webp', alt: 'Mavi gözlü kedi' },
    'dog-1': { url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80&fm=webp', alt: 'Golden Retriever' },
    'dog-2': { url: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=1200&q=80&fm=webp', alt: 'Sokak köpeği portresi' },
    'dog-3': { url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1200&q=80&fm=webp', alt: 'Labrador köpek' },
    'dog-4': { url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80&fm=webp', alt: 'İki köpek koşuyor' },
    'dog-5': { url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80&fm=webp', alt: 'Yavru köpek' },
    'post-hero-1': { url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80&fm=webp', alt: 'Kurtarma hikayesi görseli' },
    'post-hero-2': { url: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1200&q=80&fm=webp', alt: 'Kış aylarında sokak hayvanları' },
    'post-hero-3': { url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=1200&q=80&fm=webp', alt: 'Veteriner muayenesi' },
    'post-hero-4': { url: 'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=1200&q=80&fm=webp', alt: 'Gönüllü çalışması' },
    'post-hero-5': { url: 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=1200&q=80&fm=webp', alt: 'Sahiplendirilen mutlu kedi' },
    'post-hero-6': { url: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1200&q=80&fm=webp', alt: 'Topluluk etkinliğinde hayvanlar' },
    'event-cover-1': { url: 'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=1200&q=80&fm=webp', alt: 'Sahiplendirme etkinliği' },
    'event-cover-2': { url: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=1200&q=80&fm=webp', alt: 'Mama toplama kampanyası' },
    'story-hatay': { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80&fm=webp', alt: 'Hatay sokaklarında büyüyen çocuk — merhamet dolu bir çocukluk' },
    'story-earthquake': { url: 'https://images.unsplash.com/photo-1677233861362-c3aa97f11638?w=1200&q=80&fm=webp', alt: 'Deprem sonrası yıkılmış binalar ve enkaz' },
    'story-first-feeding': { url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&q=80&fm=webp', alt: 'Sokak kedilerine mama veren kişi' },
    'story-daily': { url: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80&fm=webp', alt: 'Sokak hayvanlarını besleyen gönüllü' },
    'story-health': { url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&q=80&fm=webp', alt: 'Veterinerde tedavi gören sokak hayvanı' },
    'story-vision': { url: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=1200&q=80&fm=webp', alt: 'Gönüllüler hayvanlarla birlikte' },
    'activity-feeding': { url: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=1200&q=80&fm=webp', alt: 'Sokak kedilerine mama verme' },
    'activity-treatment': { url: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=1200&q=80&fm=webp', alt: 'Veterinerde tedavi gören köpek' },
    'activity-spaying': { url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80&fm=webp', alt: 'Veteriner kliniğinde ameliyat hazırlığı' },
    'activity-emergency': { url: 'https://plus.unsplash.com/premium_photo-1663133490553-eccfbb5c7ed9?w=1200&q=80&fm=webp', alt: 'Yaralı hayvana acil müdahale' },
    'activity-vaccination': { url: 'https://images.unsplash.com/photo-1700665537604-412e89a285c3?w=1200&q=80&fm=webp', alt: 'Veteriner hekim hayvan aşılıyor' },
    'activity-shelter': { url: 'https://images.unsplash.com/photo-1548366086-7f1b76106622?w=1200&q=80&fm=webp', alt: 'Barınakta bakılan yavru kediler' },
    // Emergency case specific images (unique per case)
    'emergency-tekir': { url: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&q=80&fm=webp', alt: 'Veterinerde tedavi gören kedi' },
    'emergency-mavis': { url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1200&q=80&fm=webp', alt: 'Hasta yavru kedi' },
    'emergency-comar': { url: 'https://images.unsplash.com/photo-1530041539828-114de669390e?w=1200&q=80&fm=webp', alt: 'Veterinerde tedavi gören köpek' },
    'emergency-boncuk': { url: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=1200&q=80&fm=webp', alt: 'Cilt tedavisi gören köpek' },
    'emergency-pasa-before': { url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1200&q=80&fm=webp', alt: 'Yaralı köpek tedavi öncesi' },
    'emergency-pasa-after': { url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1200&q=80&fm=webp', alt: 'İyileşen köpek mutlu hali' },
    'emergency-duman-before': { url: 'https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=1200&q=80&fm=webp', alt: 'Hasta kedi tedavi öncesi' },
    'emergency-duman-after': { url: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=1200&q=80&fm=webp', alt: 'İyileşen kedi mutlu hali' },
  }

  const mediaIds: Record<string, number> = {}
  const imageKeys = Object.keys(imageUrls)

  for (let i = 0; i < imageKeys.length; i += 4) {
    const batch = imageKeys.slice(i, i + 4)
    await Promise.allSettled(
      batch.map(async (key) => {
        const { url, alt } = imageUrls[key]
        try {
          const file = await fetchFileByURL(url)
          const media = await payload.create({
            collection: 'media',
            data: { alt },
            file,
            context: { disableRevalidate: true },
          })
          mediaIds[key] = media.id as number
          console.log(`  Created media: ${key} (${alt})`)
        } catch (err) {
          console.warn(`  Warning: Failed to fetch image ${key}: ${(err as Error).message}`)
        }
      }),
    )
    if (i + 4 < imageKeys.length) {
      await new Promise((r) => setTimeout(r, 500))
    }
  }

  console.log(`  Total media created: ${Object.keys(mediaIds).length}/${imageKeys.length}`)

  console.log('\nSeeding animals...')

  const animalsData = [
    {
      name: 'Pamuk',
      type: 'kedi' as const,
      age: '2 yaş',
      gender: 'disi' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: true,
      location: 'Kadıköy, İstanbul',
      weight: 3.5,
      microchipId: 'MC-2024-001',
      isSpayed: true,
      isVaccinated: true,
      photos: mediaIds['cat-1'] ? [mediaIds['cat-1']] : [],
      story: lexicalRoot(
        heading('h3', 'Pamuk\'un Kurtarma Hikayesi'),
        paragraph('Pamuk, ', bold('Kadıköy sokaklarında'), ' titrerken bulundu. İlk geldiğinde çok korkak ve zayıftı — insanlara yaklaşmak bir yana, dokunulmaya bile izin vermiyordu. Haftalarca süren sabırlı bakım ve sevgiyle yavaş yavaş güvenmeye başladı.'),
        quote('İlk kez kucağıma tırmandığı günü asla unutmayacağım. Gözlerindeki korku yerini huzura bırakmıştı.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Şimdi en şımarık kedimiz Pamuk. Her sabah kapıda karşılar, misafirlere sürtünür. Kucakta uyumayı ve güneşli pencerelerde uzanmayı çok sever. ', bold('Tam bir ev kedisi'), ' oldu.'),
      ),
      needs: lexicalRoot(
        paragraph(bold('Durum: Sağlıklı'), ' — Pamuk şu an kalıcı bakımda ve sağlığı yerinde.'),
        ul(
          ['Düzenli veteriner kontrolleri (3 ayda bir)'],
          ['Karma aşı rapeli (yıllık)'],
          ['Diş kontrolü planlanıyor'],
        ),
        paragraph('Pamuk\'un bakımına katkıda bulunmak ister misiniz? ', link('/destek-ol', [bold('Bağış yaparak destekleyin')]), '.'),
      ),
    },
    {
      name: 'Karamel',
      type: 'kopek' as const,
      age: '4 yaş',
      gender: 'erkek' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: true,
      location: 'Beşiktaş, İstanbul',
      weight: 18,
      microchipId: 'MC-2024-002',
      isSpayed: true,
      isVaccinated: true,
      photos: mediaIds['dog-1'] ? [mediaIds['dog-1']] : [],
      story: lexicalRoot(
        heading('h3', 'Karamel\'in Kurtarma Hikayesi'),
        paragraph('Karamel, ', bold('Beşiktaş\'ta bir trafik kazası'), ' sonrası yol kenarında hareketsiz yatarken bulundu. Sol arka bacağında ', bold('açık kırık'), ' vardı ve gözlerinde derin bir korku okunuyordu. Hemen en yakın veteriner kliniğine yetiştirdik.'),
        paragraph('Ameliyat 3 saat sürdü. Bacağına platin takıldı. İlk hafta yoğun bakımda kaldı — her gün yanında olduk, onu yalnız bırakmadık.'),
        quote('İlk kez kendi başına ayağa kalktığında, odadaki herkesin gözleri dolmuştu. O an, tüm çabamızın karşılığını almıştık.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Şimdi Karamel, en enerjik köpeğimiz. Topla oynamayı, uzun yürüyüşleri ve parkta koşmayı çok seviyor. ', bold('Tam bir savaşçı'), ' — hayata tutunmanın en güzel örneği.'),
      ),
      needs: lexicalRoot(
        heading('h4', 'Devam Eden Tedavi'),
        paragraph('Karamel\'in iyileşme süreci çok olumlu ilerliyor ancak düzenli takip gerekiyor.'),
        paragraph(strikethrough('Yoğun bakım — tamamlandı'), ' ', bold('(iyileşti!)')),
        ul(
          ['Fizik tedavi seansları (haftada 2 kez)'],
          ['Aylık ortopedi kontrolü'],
          ['Platin çıkarma değerlendirmesi (1 ay sonra)'],
          ['Eklem takviyesi — Glukozamin 500mg/gün', superscript('1')],
        ),
        paragraph(superscript('1'), italic(' Dozaj veteriner kontrolünde ayarlanmaktadır.')),
      ),
    },
    {
      name: 'Minnoş',
      type: 'kedi' as const,
      age: '6 ay',
      gender: 'disi' as const,
      animalStatus: 'tedavide' as const,
      featured: true,
      location: 'Üsküdar, İstanbul',
      weight: 1.8,
      microchipId: 'MC-2024-003',
      isSpayed: false,
      isVaccinated: true,
      photos: mediaIds['cat-2'] ? [mediaIds['cat-2']] : [],
      story: lexicalRoot(
        heading('h3', 'Minnoş\'un Hikayesi'),
        paragraph('Minnoş, ', bold('Üsküdar\'da bir inşaat alanında'), ' annesiz, soğukta titrerken bulundu. Sadece ', bold('3 haftalıktı'), ' — gözleri henüz tam açılmamıştı. İnşaat işçileri miyavlamayı duyup bize haber verdi.'),
        paragraph('Gönüllülerimiz hemen bölgeye gitti. Minnoş\'u sıcak bir battaniyeye sarıp kliniğe götürdük. İlk günlerde her 2 saatte bir biberonla besledik. Gece nöbetleri tuttuk.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Şimdi 6 aylık ve harika büyüyor! Ancak ', bold('göz enfeksiyonu'), ' tedavisi devam ediyor. Antibiyotikli göz damlası kullanıyoruz. Oyuncu, meraklı ve çok sevecen bir kedi oldu.'),
      ),
      needs: lexicalRoot(
        heading('h4', 'Devam Eden Tedavi'),
        paragraph('İlaç takip kodu: ', inlineCode('CONJ-ABX-2024')),
        ul(
          ['Göz enfeksiyonu (konjunktivit) — antibiyotikli damla 2x3/gün'],
          ['Oral antibiyotik kürü (7 gün kaldı)'],
          ['Kısırlaştırma operasyonu planlanıyor'],
          ['Aşı takvimi devam ediyor (karma + kuduz)'],
        ),
      ),
    },
    {
      name: 'Boncuk',
      type: 'kopek' as const,
      age: '1.5 yaş',
      gender: 'disi' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: true,
      location: 'Bakırköy, İstanbul',
      weight: 8,
      microchipId: 'MC-2024-004',
      isSpayed: true,
      isVaccinated: true,
      photos: mediaIds['dog-2'] ? [mediaIds['dog-2']] : [],
      story: lexicalRoot(
        heading('h3', 'Boncuk\'un Hikayesi'),
        paragraph('Boncuk, ', bold('Bakırköy\'de bir parkta'), ' iple ağaca bağlı halde terk edilmiş bulundu. Boyun bölgesinde derin ip izleri vardı — uzun süre bağlı kaldığı anlaşılıyordu. Susuz ve bitkin haldeydi.'),
        paragraph('İlk günlerde insanlara yaklaşmak istemiyordu. Her eli uzatana ürkekçe bakıyordu. Sabırlı ve nazik bir yaklaşımla, günler içinde güvenmeye başladı.'),
        quote('Boncuk ilk kez kuyruğunu salladığında, terk edilmişliğin yaralarının iyileşmeye başladığını anladık.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Tedavi sürecinden sonra Boncuk, ', bold('en sadık dostumuza'), ' dönüştü. İnsanlara güvenmeyi yeniden öğrendi. Artık her gelen misafire sevinçle koşuyor. Kalıcı bir yuva arıyoruz.'),
      ),
      needs: lexicalRoot(
        paragraph(bold('Durum: Sağlıklı'), ' — Boncuk fiziksel olarak tamamen iyileşti.'),
        paragraph(strikethrough('Boyun yarası tedavisi — iyileşti'), ' ', bold('(tam iyileşme)')),
        paragraph('Kalıcı yuva arayışı sürüyor. Kısırlaştırılmış, aşıları tam ve mikroçipli. ', bold('Bahçeli bir ev'), ' ideal olacaktır.'),
      ),
    },
    {
      name: 'Tekir',
      type: 'kedi' as const,
      age: '3 yaş',
      gender: 'erkek' as const,
      animalStatus: 'acil' as const,
      featured: true,
      location: 'Şişli, İstanbul',
      weight: 4.2,
      microchipId: 'MC-2024-005',
      isSpayed: false,
      isVaccinated: false,
      photos: mediaIds['cat-3'] ? [mediaIds['cat-3']] : [],
      story: lexicalRoot(
        heading('h3', 'Tekir — Acil Vaka'),
        paragraph('Tekir, ', bold('Şişli\'de 5. kattan düşme'), ' sonucu ağır yaralı olarak getirildi. Yapılan muayenede ', bold('pelvis kırığı ve iç kanama'), ' tespit edildi. Durumu kritikti.'),
        paragraph('Derhal ', link('/acil-vakalar', [bold('İstanbul Veteriner Cerrahi Merkezi')]), '\'ne götürüldü. Pelvis fiksasyonu ve iç kanama kontrolü başarıyla yapıldı. Ameliyat 4 saat sürdü. Şu an yoğun bakım sürecinde — durumu ciddi ama stabil.'),
        quote('Veteriner ekibimiz gece boyunca başından ayrılmadı. Tekir güçlü bir savaşçı.'),
      ),
      needs: lexicalRoot(
        paragraph(bold('ACİL:'), ' Ameliyat sonrası yoğun bakım devam ediyor. Maddi destek ihtiyacı var.'),
        ul(
          ['Yoğun bakım takibi (günlük)'],
          ['Kan tahlilleri ve röntgen kontrolleri'],
          ['Ağrı kesici ve antibiyotik tedavisi'],
          ['Fizik tedavi (iyileşme sonrası planlanıyor)'],
        ),
      ),
    },
    {
      name: 'Zeytin',
      type: 'kopek' as const,
      age: '7 yaş',
      gender: 'erkek' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: true,
      location: 'Beyoğlu, İstanbul',
      weight: 22,
      microchipId: 'MC-2024-006',
      isSpayed: true,
      isVaccinated: true,
      photos: mediaIds['dog-3'] ? [mediaIds['dog-3']] : [],
      story: lexicalRoot(
        heading('h3', 'Zeytin\'in Hikayesi'),
        paragraph('Zeytin, ', bold('7 yıldır Beyoğlu sokaklarında'), ' yaşayan bir mahallenin sevgilisiydi. Bakkaldan, kahveciden, tüm esnaftan sevgi ve mama görürdü. Ancak yaşlılık nedeniyle ', bold('eklem sorunları'), ' başlayınca hareket etmekte zorlanmaya başladı.'),
        paragraph('Mahalleli bize haber verdi. Zeytin\'i yanımıza aldık ve tedavisine başladık. Sakin, uyumlu ve çok efendi bir köpek — diğer hayvanlara abilelik yapıyor, yavruları koruyor.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Kalıcı bakımda mutlu ve huzurlu. İlaçlarıyla ağrısı kontrol altında. Bahçede yavaş tempolu yürüyüşleri ve güneşlenmeyi seviyor.'),
      ),
      needs: lexicalRoot(
        heading('h4', 'Devam Eden Tedavi'),
        paragraph('Eklem iltihabı (', bold('osteoartrit'), ') nedeniyle sürekli tedavi altında.'),
        ul(
          ['Karprofen — 4mg/kg', superscript('*'), ' günde 1 (anti-inflamatuar)'],
          ['Glukozamin takviyesi — günlük 1 tablet'],
          ['Aylık veteriner kontrolü'],
          ['Kilo takibi (eklem yükünü azaltmak için)'],
        ),
        paragraph(superscript('*'), italic(' mg/kg = miligram per kilogram vücut ağırlığı')),
      ),
    },
    {
      name: 'Fıstık',
      type: 'kedi' as const,
      age: '1 yaş',
      gender: 'disi' as const,
      animalStatus: 'tedavide' as const,
      featured: true,
      location: 'Ataşehir, İstanbul',
      weight: 2.8,
      microchipId: 'MC-2024-007',
      isSpayed: false,
      isVaccinated: true,
      photos: mediaIds['cat-4'] ? [mediaIds['cat-4']] : [],
      story: lexicalRoot(
        heading('h3', 'Fıstık\'ın Hikayesi'),
        paragraph('Fıstık, ', bold('Ataşehir\'de bir manav tezgahının altında'), ' doğmuş 4 kardeşten biri. Anneleri araba çarpması sonucu kaybedildi. Manavcı amca yavruları fark edip bize ulaştı.'),
        paragraph('4 yavruyu birlikte aldık. Henüz göz açmamışlardı. Gönüllülerimiz nöbet tutarak her 2 saatte bir biberonla besledi. Gece gündüz demeden emzirdik, sıcak tuttuk.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Fıstık 4 kardeşin en oyuncusu ve en cesuru. Her şeyi merak eder, her yere tırmanır. ', bold('Enerjisi hiç bitmiyor!'), ' Kardeşleri de sağlıklı büyüyor.'),
      ),
      needs: lexicalRoot(
        paragraph(bold('Durum: Tedavide'), ' — genel sağlığı iyi, rutin takip devam ediyor.'),
        ul(
          ['Kısırlaştırma operasyonu planlanıyor'],
          ['Aşı takvimi devam ediyor (karma + kuduz)'],
          ['Parazit kontrolü (aylık)'],
        ),
      ),
    },
    {
      name: 'Çomar',
      type: 'kopek' as const,
      age: '5 yaş',
      gender: 'erkek' as const,
      animalStatus: 'tedavide' as const,
      featured: true,
      location: 'Sarıyer, İstanbul',
      weight: 30,
      microchipId: 'MC-2024-008',
      isSpayed: false,
      isVaccinated: true,
      photos: mediaIds['dog-4'] ? [mediaIds['dog-4']] : [],
      story: lexicalRoot(
        heading('h3', 'Çomar\'ın Kurtarma Hikayesi'),
        paragraph('Çomar, ', bold('Sarıyer\'de orman kenarında'), ' hareketsiz yatarken bulundu. Zehirlenme belirtileri açıktı — ağız köpüğü, titreme ve bilinç bulanıklığı. ', bold('Organofosfor zehirlenmesi'), ' şüphesiyle acil müdahale başlatıldı.'),
        paragraph('Mide yıkama, aktif kömür uygulaması ve serum tedavisiyle hayata döndürüldü. İlk 48 saat kritikti. Atropin tedavisiyle belirtiler kontrol altına alındı.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Çomar güçlü bir köpek ve iyileşme süreci olumlu ilerliyor. Karaciğer değerleri hâlâ yüksek ama düşüş trendinde. İştahı açıldı, yürüyüşe çıkabiliyor.'),
      ),
      needs: lexicalRoot(
        heading('h4', 'Devam Eden Tedavi'),
        paragraph('Zehirlenme sonrası ', bold('karaciğer tedavisi'), ' devam ediyor. Bol temiz H', subscriptText('2'), 'O (su) içmesi sağlanıyor.'),
        paragraph('Son lab sonuçları: ', inlineCode('AST: 120 U/L'), ', ', inlineCode('ALT: 95 U/L'), ' — düşüş trendinde.'),
        ul(
          ['Silibinin (karaciğer koruyucu) — 20mg/kg, 14 gün'],
          ['Özel karaciğer diyeti uygulanıyor'],
          ['Haftalık kan tahlili kontrolü'],
          ['Genel durum ve iştah takibi'],
        ),
      ),
    },
    {
      name: 'Tarçın',
      type: 'kedi' as const,
      age: '4 yaş',
      gender: 'erkek' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: true,
      location: 'Maltepe, İstanbul',
      weight: 5.1,
      microchipId: 'MC-2024-009',
      isSpayed: true,
      isVaccinated: true,
      photos: mediaIds['cat-5'] ? [mediaIds['cat-5']] : [],
      story: lexicalRoot(
        heading('h3', 'Tarçın\'ın Hikayesi'),
        paragraph('Tarçın, ', bold('Maltepe\'de bir apartman bodrumunda'), ' sıkışmış halde bulundu. Komşular 3 gündür gelen miyavlamaları duymuş ama kaynağını bulamamış. Sonunda bir tesisatçı bodrumda Tarçın\'ı fark etti.'),
        paragraph('Kurtarma ekibimiz bölgeye gitti. Tarçın dar bir boru aralığına sıkışmıştı. Sabırla ve dikkatle çıkardık. Susuz ve aç ama sağlıklıydı.'),
        heading('h3', 'Şimdiki Hali'),
        paragraph('Şimdi en rahat kedimiz Tarçın. Güneşli pencerelerde uzanmayı, kuş izlemeyi ve battaniye altında uyumayı seviyor. ', bold('Kalıcı yuva bekliyor'), ' — sakin, uyumlu bir ev kedisi.'),
      ),
      needs: lexicalRoot(
        paragraph(bold('Durum: Sağlıklı'), ' — sağlık durumu mükemmel.'),
        paragraph('Kısırlaştırılmış, aşıları tam, mikroçipli. Kalıcı yuva arıyoruz. Sakin bir ev ve sabırlı bir aile ideal olacaktır.'),
      ),
    },
    {
      name: 'Maviş',
      type: 'kedi' as const,
      age: '8 ay',
      gender: 'disi' as const,
      animalStatus: 'acil' as const,
      featured: true,
      location: 'Fatih, İstanbul',
      weight: 2.1,
      microchipId: 'MC-2024-010',
      isSpayed: false,
      isVaccinated: false,
      photos: mediaIds['cat-6'] ? [mediaIds['cat-6']] : [],
      story: lexicalRoot(
        heading('h3', 'Maviş — Acil Vaka'),
        paragraph('Maviş, ', bold('Fatih\'te bir çöp konteynerinin içinde'), ' ağlayarak bulundu. Sadece 8 aylık ve ciddi ', bold('solunum yolu enfeksiyonu'), ' (rinotrakeitis) vardı. Nefes almakta güçlük çekiyordu.'),
        paragraph('Acil veteriner müdahalesi yapıldı. Antibiyotik ve nebülizatör tedavisi başlatıldı. İlk 24 saatte belirgin iyileşme gözlendi ancak tedavi süreci 2-3 hafta sürecek.'),
        quote('Çöp konteynerinden çıkardığımızda gözleri kapanıktı, nefes almaya çalışıyordu. Şimdi her geçen gün biraz daha güçleniyor.'),
      ),
      needs: lexicalRoot(
        paragraph(bold('ACİL:'), ' Solunum yolu enfeksiyonu tedavisi devam ediyor. İlaç ve veteriner masrafları için ', link('/destek-ol', [bold('acil destek')]), ' gerekiyor.'),
        paragraph('İlaç takip kodu: ', inlineCode('RESP-DOX-2024'), ' / ', inlineCode('RESP-LYS-2024')),
        ul(
          ['Doksisiklin — 10mg/kg 2x1, 14 gün'],
          ['L-Lizin — 250mg 2x1, 21 gün'],
          ['Günlük nebülizatör uygulaması'],
          ['Veteriner kontrolü (gün aşırı)'],
        ),
      ),
    },
  ]

  const animalIds: number[] = []
  for (const animal of animalsData) {
    const created = await payload.create({
      collection: 'animals',
      locale: 'tr',
      data: {
        ...animal,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      context: { disableRevalidate: true },
    })
    animalIds.push(created.id as number)
    console.log(`  Created animal: ${animal.name}`)
  }

  console.log('\nSeeding emergency cases...')

  const emergencyCasesData = [
    {
      title: 'Tekir — Pelvis Kırığı Ameliyatı',
      animal: animalIds[4], // Tekir
      caseStatus: 'aktif' as const,
      targetAmount: 15000,
      collectedAmount: 8750,
      photos: mediaIds['emergency-tekir'] ? [mediaIds['emergency-tekir']] : [],
      description: lexicalRoot(
        heading('h3', 'Yüksekten Düşme — Pelvis Kırığı'),
        paragraph('Tekir, ', bold('5. kattan düşme'), ' sonucu pelvis kırığı ve iç kanama ile acil olarak getirildi. Durumu kritikti — bilinç bulanıklığı ve ', bold('iç kanama belirtileri'), ' vardı.'),
        heading('h4', 'Yapılan Müdahale'),
        ul(
          ['Acil röntgen ve ultrason — pelvis kırığı + iç kanama tespiti'],
          ['Pelvis fiksasyonu ameliyatı (4 saat)'],
          ['İç kanama kontrol altına alındı'],
          ['Yoğun bakıma transfer'],
        ),
        heading('h4', 'Mevcut Durum'),
        paragraph('Ameliyat başarılı geçti. Yoğun bakım devam ediyor. İlaç ve bakım masrafları yüksek seyrediyor. ', bold('Hedef: 15.000 ₺')),
        quote('Tekir güçlü bir savaşçı. Veteriner ekibimiz her geçen gün umutlanıyor.'),
      ),
      updates: [
        {
          date: '2026-03-10',
          text: lexicalRoot(
            paragraph(bold('Acil ameliyat yapıldı.'), ' Pelvis fiksasyonu başarıyla tamamlandı. İç kanama kontrol altına alındı. Tekir yoğun bakıma transfer edildi.'),
          ),
        },
        {
          date: '2026-03-12',
          text: lexicalRoot(
            paragraph(bold('Yoğun bakımda 2. gün.'), ' Olumlu gelişmeler:'),
            ul(
              ['Kendi başına su içmeye başladı'],
              ['Kan değerleri iyileşme trendinde — ', inlineCode('HGB: 8.2 g/dL'), ', ', inlineCode('WBC: 14.3 K/µL')],
              ['Ağrı kesici dozajı düşürüldü'],
            ),
          ),
        },
      ],
    },
    {
      title: 'Maviş — Solunum Yolu Enfeksiyonu',
      animal: animalIds[9], // Maviş
      caseStatus: 'aktif' as const,
      targetAmount: 5000,
      collectedAmount: 2100,
      photos: mediaIds['emergency-mavis'] ? [mediaIds['emergency-mavis']] : [],
      description: lexicalRoot(
        heading('h3', 'Ciddi Solunum Yolu Enfeksiyonu'),
        paragraph('Maviş, çöp konteynerinde ciddi ', bold('solunum yolu enfeksiyonu'), ' (rinotrakeitis) ile bulundu. Nefes almakta büyük güçlük çekiyordu. Gözleri ve burnu akıntılıydı.'),
        heading('h4', 'Tedavi Planı'),
        ul(
          ['Antibiyotik tedavisi (Doksisiklin — 14 gün)'],
          ['Günlük nebülizatör uygulaması'],
          ['L-Lizin takviyesi (21 gün)'],
          ['Günlük veteriner kontrolü'],
        ),
        paragraph('İyileşme süreci ', bold('2-3 hafta'), ' sürebilir. Günlük takip kritik önemde.'),
      ),
      updates: [
        {
          date: '2026-03-11',
          text: lexicalRoot(
            paragraph(bold('Maviş çöp konteynerinde bulundu.'), ' Ciddi solunum güçlüğü vardı. Acil antibiyotik ve nebülizatör tedavisi başlatıldı. İlk müdahale sonrası nefes alışı biraz rahatladı.'),
          ),
        },
      ],
    },
    {
      title: 'Çomar — Zehirlenme Tedavisi',
      animal: animalIds[7], // Çomar
      caseStatus: 'aktif' as const,
      targetAmount: 8000,
      collectedAmount: 6500,
      photos: mediaIds['emergency-comar'] ? [mediaIds['emergency-comar']] : [],
      description: lexicalRoot(
        heading('h3', 'Zehirlenme Vakası — Organofosfor Şüphesi'),
        paragraph('Çomar, orman kenarında ', bold('zehirlenmiş'), ' halde bulundu. Belirtiler: ağız köpüğü, titreme, bilinç bulanıklığı. ', bold('Organofosfor'), ' zehirlenmesi şüphesiyle acil müdahale başlatıldı.'),
        heading('h4', 'Yapılan Müdahale'),
        ul(
          ['Acil mide yıkama + aktif kömür uygulaması'],
          ['IV sıvı tedavisi'],
          ['Atropin sülfat (0.04mg/kg IV)'],
          ['Karaciğer koruyucu (Silibinin)'],
        ),
        heading('h4', 'Mevcut Durum'),
        paragraph('Karaciğer değerleri yüksek ancak düşüş trendinde. Özel diyet ve ilaç tedavisi devam ediyor. Çomar iştahını geri kazandı.'),
      ),
      updates: [
        {
          date: '2026-03-07',
          text: lexicalRoot(
            paragraph(bold('Çomar orman kenarında hareketsiz bulundu.'), ' Zehirlenme belirtileri: ağız köpüğü, titreme. Acil mide yıkama ve serum tedavisi uygulandı.'),
          ),
        },
        {
          date: '2026-03-09',
          text: lexicalRoot(
            paragraph(bold('Karaciğer değerleri:'), ' Hâlâ yüksek ama düşüş trendinde.'),
            ul(
              ['Özel karaciğer diyeti başlatıldı'],
              ['Çomar yemeye başladı — iştahı geri dönüyor'],
              ['Genel durumu iyi, ayağa kalkabiliyor'],
            ),
          ),
        },
      ],
    },
    {
      title: 'Paşa — Kırık Bacak Operasyonu',
      caseStatus: 'tamamlandi' as const,
      targetAmount: 12000,
      collectedAmount: 12000,
      photos: mediaIds['emergency-pasa-before'] ? [mediaIds['emergency-pasa-before']] : [],
      beforePhoto: mediaIds['emergency-pasa-before'] || undefined,
      afterPhoto: mediaIds['emergency-pasa-after'] || undefined,
      description: lexicalRoot(
        heading('h3', 'Trafik Kazası — Açık Kırık'),
        paragraph('Paşa, trafik kazası sonrası sağ ön bacağında ', bold('açık kırık'), ' tespit edildi. Acil ameliyata alındı ve bacağına platin takıldı.'),
        heading('h4', 'Tedavi Süreci'),
        ul(
          [strikethrough('Acil ameliyat — platin fiksasyonu'), ' ', bold('(tamamlandı)')],
          [strikethrough('6 hafta yoğun bakım + fizik tedavi'), ' ', bold('(tamamlandı)')],
          [strikethrough('Haftalık röntgen kontrolleri'), ' ', bold('(tamamlandı)')],
        ),
        paragraph(strikethrough('Hedef: 12.000 ₺'), ' — ', bold('hedefe ulaşıldı!')),
        paragraph(bold('Sonuç: Tam iyileşme!'), ' 6 haftalık tedavi sürecinin ardından Paşa tamamen iyileşti. Koşuyor, oynuyor ve yeni yuvasında mutlu bir şekilde yaşıyor.'),
        quote('Paşa\'nın ilk koşusu, tüm ekip için en güzel ödüldü.'),
      ),
      updates: [
        {
          date: '2026-01-15',
          text: lexicalRoot(
            paragraph(bold('Acil ameliyat tamamlandı.'), ' Sağ ön bacakta açık kırık — platin fiksasyonu yapıldı. Paşa yoğun bakımda.'),
          ),
        },
        {
          date: '2026-02-01',
          text: lexicalRoot(
            paragraph(bold('Platin kontrolü:'), ' Kaynama başlamış! Fizik tedavi başlatıldı. Paşa ilk adımlarını attı.'),
          ),
        },
        {
          date: '2026-03-01',
          text: lexicalRoot(
            paragraph(bold('Paşa tamamen iyileşti!'), ' Koşuyor, oynuyor. Yeni ailesi Ayşe ve Murat ile tanıştı. ', bold('Sahiplendirme tamamlandı.')),
          ),
        },
      ],
    },
    {
      title: 'Duman — Göz Ameliyatı',
      caseStatus: 'tamamlandi' as const,
      targetAmount: 7000,
      collectedAmount: 7000,
      photos: mediaIds['emergency-duman-before'] ? [mediaIds['emergency-duman-before']] : [],
      beforePhoto: mediaIds['emergency-duman-before'] || undefined,
      afterPhoto: mediaIds['emergency-duman-after'] || undefined,
      description: lexicalRoot(
        heading('h3', 'İleri Derece Göz Enfeksiyonu'),
        paragraph('Duman, her iki gözünde de ', bold('ileri derece enfeksiyon'), ' ile getirildi. Gözleri neredeyse tamamen kapanmıştı. Durumu acildi.'),
        heading('h4', 'Tedavi Süreci'),
        ul(
          [strikethrough('Sol göz — enükleasyon ameliyatı'), ' ', bold('(tamamlandı)')],
          [strikethrough('Sağ göz ameliyatla tedavi'), ' ', bold('(tamamlandı)')],
          [strikethrough('Antibiyotik ve anti-inflamatuar tedavi'), ' ', bold('(tamamlandı)')],
        ),
        paragraph(bold('Sonuç: Başarılı iyileşme!'), ' Duman tek gözüyle gayet iyi görüyor ve mutlu bir şekilde yaşamını sürdürüyor. Kalıcı bakımda.'),
        quote('Duman\'ın tek gözüyle dünyayı keşfetmesi, yaşam sevgisinin en güzel kanıtı.'),
      ),
      updates: [
        {
          date: '2026-01-20',
          text: lexicalRoot(
            paragraph(bold('Duman çok kötü durumda getirildi.'), ' Her iki gözde ileri derece enfeksiyon. Sol göz kurtarılamadı, sağ göz ameliyata alındı.'),
          ),
        },
        {
          date: '2026-02-10',
          text: lexicalRoot(
            paragraph(bold('Sağ göz ameliyatı başarılı.'), ' Duman tek gözüyle görmeye başladı. Enfeksiyon kontrol altında.'),
          ),
        },
        {
          date: '2026-03-05',
          text: lexicalRoot(
            paragraph(bold('Tam iyileşme!'), ' Duman tek gözüyle harika görüyor, oynuyor ve mutlu. Kalıcı bakımda devam edecek.'),
          ),
        },
      ],
    },
    {
      title: 'Boncuk — Cilt Hastalığı Tedavisi',
      animal: animalIds[3], // Boncuk
      caseStatus: 'aktif' as const,
      targetAmount: 6000,
      collectedAmount: 1800,
      photos: mediaIds['emergency-boncuk'] ? [mediaIds['emergency-boncuk']] : [],
      description: lexicalRoot(
        heading('h3', 'Yaygın Uyuz — Ciddi Cilt Hastalığı'),
        paragraph('Boncuk, Bakırköy sokaklarında ', bold('yaygın uyuz (demodikoz)'), ' nedeniyle tüyleri dökülmüş ve cildinde açık yaralar oluşmuş halde bulundu. Vücudunun %60\'ından fazlası etkilenmişti.'),
        heading('h4', 'Tedavi Planı'),
        ul(
          ['Cilt kazıntısı ve kan testi — demodikoz tespiti'],
          ['İvermektin tedavisi (haftalık, 8-12 hafta)'],
          ['Antibiyotik (sekonder enfeksiyonlar için)'],
          ['Özel medicinal şampuan ile haftalık banyo'],
          ['Bağışıklık güçlendirici vitamin takviyesi'],
        ),
        heading('h4', 'Mevcut Durum'),
        paragraph('Tedavinin 1. haftası tamamlandı. Kaşıntı biraz azaldı ancak tüy dökülmesi devam ediyor. ', bold('Tam iyileşme 2-3 ay sürebilir.'), ' Uzun süreli ilaç ve bakım masrafları yüksek.'),
        quote('Boncuk çok sakin ve sevecen bir köpek. Tedavi sürecinde hiç huysuzluk yapmıyor.'),
      ),
      updates: [
        {
          date: '2026-03-13',
          text: lexicalRoot(
            paragraph(bold('Boncuk sokakta bulundu.'), ' Ciddi tüy dökülmesi ve cilt yaraları vardı. Cilt kazıntısı sonucu demodikoz tespit edildi. İvermektin ve antibiyotik tedavisi başlatıldı.'),
          ),
        },
        {
          date: '2026-03-15',
          text: lexicalRoot(
            paragraph(bold('Tedavi 2. günü:'), ' Olumlu gelişmeler var.'),
            ul(
              ['Kaşıntı azalmaya başladı'],
              ['İştahı iyi, mama yiyor'],
              ['İlk medicinal banyo yapıldı — cilt yaraları temizlendi'],
            ),
          ),
        },
      ],
    },
  ]

  const emergencyIds: number[] = []
  for (const ec of emergencyCasesData) {
    const created = await payload.create({
      collection: 'emergency-cases',
      locale: 'tr',
      data: {
        ...ec,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      context: { disableRevalidate: true },
    })
    emergencyIds.push(created.id as number)
    console.log(`  Created emergency case: ${ec.title}`)
  }

  console.log('\nSeeding vet records...')

  const vetRecordsData = [
    {
      animal: animalIds[0], // Pamuk
      recordType: 'muayene' as const,
      date: '2026-03-01',
      veterinarian: 'Dr. Mehmet Yılmaz',
      clinic: 'Kadıköy Veteriner Kliniği',
      diagnosis: 'Genel sağlık kontrolü — herhangi bir sorun yok',
      treatment: 'Rutin muayene yapıldı, tüm değerler normal',
      cost: 500,
    },
    {
      animal: animalIds[0], // Pamuk
      recordType: 'asi' as const,
      date: '2026-03-01',
      veterinarian: 'Dr. Mehmet Yılmaz',
      clinic: 'Kadıköy Veteriner Kliniği',
      diagnosis: 'Karma aşı rapel',
      treatment: 'Karma aşı (FVRCP) rapel dozu uygulandı',
      medications: [{ name: 'FVRCP Aşısı', dosage: '1 doz', duration: 'Tek seferlik' }],
      cost: 350,
    },
    {
      animal: animalIds[1], // Karamel
      recordType: 'kontrol' as const,
      date: '2026-03-05',
      veterinarian: 'Dr. Aylin Demir',
      clinic: 'Beşiktaş Pet Kliniği',
      diagnosis: 'Bacak kırığı kontrol — iyileşme tamamlanmış',
      treatment: 'Platin çıkarma değerlendirmesi yapıldı, 1 ay sonra kontrol',
      cost: 400,
    },
    {
      animal: animalIds[2], // Minnoş
      recordType: 'tedavi' as const,
      date: '2026-03-08',
      veterinarian: 'Dr. Can Özkan',
      clinic: 'Üsküdar Hayvan Hastanesi',
      diagnosis: 'Göz enfeksiyonu (konjunktivit)',
      treatment: 'Antibiyotikli göz damlası ve oral antibiyotik başlandı',
      medications: [
        { name: 'Tobramisin göz damlası', dosage: '2x3 damla/gün', duration: '10 gün' },
        { name: 'Amoksisilin', dosage: '50mg 2x1', duration: '7 gün' },
      ],
      cost: 800,
    },
    {
      animal: animalIds[4], // Tekir
      recordType: 'ameliyat' as const,
      date: '2026-03-10',
      veterinarian: 'Prof. Dr. Hakan Sarı',
      clinic: 'İstanbul Veteriner Cerrahi Merkezi',
      diagnosis: 'Pelvis kırığı ve iç kanama',
      treatment: 'Pelvis fiksasyonu ameliyatı yapıldı. İç kanama kontrol altına alındı.',
      medications: [
        { name: 'Meloksikam', dosage: '0.1mg/kg', duration: '5 gün' },
        { name: 'Sefazolin', dosage: '25mg/kg IV', duration: '7 gün' },
        { name: 'Tramadol', dosage: '2mg/kg', duration: '5 gün' },
      ],
      cost: 12000,
    },
    {
      animal: animalIds[5], // Zeytin
      recordType: 'muayene' as const,
      date: '2026-02-20',
      veterinarian: 'Dr. Mehmet Yılmaz',
      clinic: 'Kadıköy Veteriner Kliniği',
      diagnosis: 'Eklem iltihabı (osteoartrit)',
      treatment: 'Anti-inflamatuar ilaç ve eklem takviyesi başlandı',
      medications: [
        { name: 'Karprofen', dosage: '4mg/kg günde 1', duration: 'Sürekli' },
        { name: 'Glukozamin takviyesi', dosage: '1 tablet/gün', duration: 'Sürekli' },
      ],
      cost: 600,
    },
    {
      animal: animalIds[7], // Çomar
      recordType: 'tedavi' as const,
      date: '2026-03-07',
      veterinarian: 'Dr. Aylin Demir',
      clinic: 'Beşiktaş Pet Kliniği',
      diagnosis: 'Akut zehirlenme — organofosfor şüphesi',
      treatment: 'Mide yıkama, aktif kömür, IV sıvı ve atropin tedavisi uygulandı',
      medications: [
        { name: 'Atropin sülfat', dosage: '0.04mg/kg IV', duration: '3 gün' },
        { name: 'Silibinin (karaciğer koruyucu)', dosage: '20mg/kg', duration: '14 gün' },
      ],
      cost: 4500,
    },
    {
      animal: animalIds[9], // Maviş
      recordType: 'tedavi' as const,
      date: '2026-03-11',
      veterinarian: 'Dr. Can Özkan',
      clinic: 'Üsküdar Hayvan Hastanesi',
      diagnosis: 'Üst solunum yolu enfeksiyonu (rinotrakeitis)',
      treatment: 'Antibiyotik, nebülizatör ve destek tedavisi başlandı',
      medications: [
        { name: 'Doksisiklin', dosage: '10mg/kg 2x1', duration: '14 gün' },
        { name: 'L-Lizin', dosage: '250mg 2x1', duration: '21 gün' },
      ],
      cost: 1200,
    },
  ]

  for (const vr of vetRecordsData) {
    await payload.create({
      collection: 'vet-records',
      locale: 'tr',
      data: vr,
      context: { disableRevalidate: true },
    })
    console.log(`  Created vet record: ${vr.recordType} for animal #${vr.animal}`)
  }

  console.log('\nSeeding posts...')

  const users = await payload.find({ collection: 'users', limit: 1 })
  const authorId = users.docs[0]?.id

  const postsData = [
    // Post 1: Deprem Sonrası Sokaklarda Hayat Mücadelesi
    {
      title: 'Deprem Sonrası Sokaklarda Hayat Mücadelesi',
      excerpt: '2023 depreminin ardından Hatay ve Malatya sokaklarında hayvanlar için başlayan besleme ve tedavi çalışmalarının hikayesi.',
      postCategory: 'kurtarma' as const,
      categories: [categories['kurtarma-hikayeleri']],
      heroImage: mediaIds['post-hero-1'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Depremin Görünmeyen Mağdurları'),
        paragraph('6 Şubat 2023 depremi sadece insanları değil, ', bold('binlerce sokak hayvanını'), ' da derinden etkiledi. Hatay ve Malatya sokaklarında sahipleri hayatını kaybeden ya da göç eden hayvanlar, yıkıntıların arasında tek başına kaldı.'),
        paragraph('Besleme noktaları yerle bir olmuştu. Düzenli beslenen kediler ve köpekler bir anda ', italic('aç, susuz ve korkuyla'), ' baş başa kalmıştı. Bölgeye ilk ulaştığımızda gördüğümüz manzara yürek burkucuydu — her köşede yardım bekleyen gözler.'),
        hr(),
        heading('h2', 'İyileşmenin Başladığı Yer'),
        paragraph('Hayvanlara yardım etmek, aynı zamanda ', bold('ekibimiz için de bir iyileşme süreciydi.'), ' Yıkımın ortasında bir cana dokunmak, hepimize güç verdi.'),
        paragraph('Birkaç besleme noktasıyla başladık. Günde iki kez düzenli turlar oluşturduk. Her turda yeni hayvanlar keşfettik — bazıları yaralı, bazıları sadece aç. Yerel gönüllülerle ağımızı genişlettik ve besleme noktalarını ', bold('12\'ye'), ' çıkardık.'),
        quote('İlk besleme turumuzda bir kedi koşarak ayaklarımıza geldi. Günlerdir bir şey yemediği belliydi. O an, burada olmamız gerektiğini anladık.'),
        hr(),
        heading('h2', 'Bugün Neredeyiz?'),
        paragraph('Bugün her gün yaklaşık ', bold('100 kedi ve köpeği'), ' düzenli olarak besliyoruz. Beslemenin yanı sıra kısırlaştırma ve veteriner bakımı çalışmalarını da sürdürüyoruz.'),
        paragraph('Hedefimiz bu çalışmaları ', bold('topluluk desteğiyle sürdürülebilir'), ' hale getirmek. Besleme noktalarının bakımı, mama temini ve veteriner masrafları için desteğe ihtiyacımız var.'),
        paragraph(link('/destek-ol', [bold('Siz de bu mücadeleye ortak olabilirsiniz')]), '.'),
      ),
      tags: [{ tag: 'deprem' }, { tag: 'kurtarma' }, { tag: 'hatay' }, { tag: 'malatya' }],
    },
    // Post 2: Portakal'ın Kurtuluş Hikayesi
    {
      title: 'Portakal\'ın Kurtuluş Hikayesi',
      excerpt: 'Hatay\'da deprem sonrası bulunan Portakal\'ın tedavi süreci ve yeni hayatının hikayesi.',
      postCategory: 'kurtarma' as const,
      categories: [categories['kurtarma-hikayeleri'], categories['tedavi-gunlugu']],
      heroImage: mediaIds['post-hero-2'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Yıkıntıların Arasından Gelen Ses'),
        paragraph('Hatay\'da deprem sonrası arama çalışmalarımız sırasında, yarı yıkılmış bir binanın bodrum katından zayıf bir miyavlama duyduk. İçeri girdiğimizde, ', bold('turuncu tüylü, zayıf ama parlak gözlü bir kedi'), ' bulduk.'),
        paragraph('Tüyleri matlaşmış, kaburgaları sayılıyordu ama gözlerindeki ışık sönmemişti. Ona hemen ', italic('Portakal'), ' adını verdik — turuncu rengi ve tatlı yüzü tam da bu ismi hak ediyordu.'),
        hr(),
        heading('h2', 'Zor Bir Tedavi Süreci'),
        paragraph('Veteriner muayenesinde durum ciddiydi:'),
        ul(
          [bold('Ciddi dehidrasyon'), ' — damar yoluyla sıvı tedavisi başlandı'],
          [bold('Üst solunum yolu enfeksiyonu'), ' — antibiyotik tedavisi uygulandı'],
          [bold('Uyuz'), ' — özel şampuan ve ilaç tedavisi planlandı'],
        ),
        paragraph('İlk günler kritik geçti. Portakal\'ı saatlerce gözetledik. ', bold('3. günde ilk kez kendi başına yemeye başladı'), ' — bu bizim için büyük bir zaferdi.'),
        paragraph('İki hafta sonra tüyleri parlamaya başlamış, kilo almaya başlamıştı. Her gün biraz daha güçleniyordu.'),
        quote('Portakal\'ın ilk kez kendi başına mama yediği anı hiç unutmayacağım. Küçük bir adım gibi görünebilir, ama bizim için her şeydi.'),
        hr(),
        heading('h2', 'Şimdi Nerede?'),
        paragraph('Portakal artık kalıcı bakımımız altında. ', bold('Kısırlaştırıldı, aşıları tamamlandı'), ' ve düzenli veteriner kontrollerini aksatmıyoruz.'),
        paragraph('Günlük rutini var — her sabah aynı saatte kapıya koşuyor, mama saatini biliyor. Misafirlerimizin favorisi, herkese kafa atıyor ve mırıldanıyor.'),
        paragraph(italic('Portakal gibi yüzlerce can yardım bekliyor. '), link('/canlarimiz', [bold('Tüm canlarımızı tanıyın')]), '.'),
      ),
      tags: [{ tag: 'kedi' }, { tag: 'kurtarma' }, { tag: 'tedavi' }, { tag: 'portakal' }],
    },
    // Post 3: Kış Geliyor: Sokak Hayvanları İçin Hazırlıklar
    {
      title: 'Kış Geliyor: Sokak Hayvanları İçin Hazırlıklar',
      excerpt: 'Kış ayları öncesi sokak hayvanları için besleme noktası hazırlıkları ve acil ihtiyaç listesi.',
      postCategory: 'etkinlik' as const,
      categories: [categories['duyurular']],
      heroImage: mediaIds['post-hero-3'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Kış Neden Bu Kadar Kritik?'),
        paragraph('Malatya\'da kış aylarında sıcaklık ', bold('eksi 15°C\'ye'), ' kadar düşebiliyor. Sokak hayvanları için bu dönem hayatta kalma mücadelesi demek.'),
        paragraph('Soğukta kalori ihtiyacı ', bold('iki katına'), ' çıkıyor. Su kaynakları donuyor. Barınak bulamayan hayvanlar hipotermi riskiyle karşı karşıya kalıyor. Her kış, en kırılgan canları kaybediyoruz.'),
        quote('Geçen kış, bir besleme noktamızda donma tehlikesi geçiren 3 yavru kediyi son anda kurtardık. Bu kış daha hazırlıklı olmalıyız.'),
        hr(),
        heading('h2', 'Besleme Noktalarını Hazırlıyoruz'),
        paragraph('Bu kış için ', bold('3 ana besleme noktasını'), ' güçlendiriyoruz:'),
        ul(
          [bold('Rüzgar geçirmez alanlar'), ' — besleme noktalarına rüzgar kırıcı bariyerler yerleştiriyoruz'],
          [bold('Yalıtımlı su kapları'), ' — suyun donmasını engelleyen özel kaplar temin ediyoruz'],
          [bold('Artırılmış mama miktarı'), ' — günlük mama dağıtımını %50 artırıyoruz'],
        ),
        paragraph('Ayrıca yeni besleme noktaları planlamaya başladık. Özellikle sanayi bölgesi kenarı ve okul çevreleri için ek noktalar gerekiyor.'),
        hr(),
        heading('h2', 'En Çok İhtiyaç Duyduğumuz Malzemeler'),
        paragraph('Kış hazırlıkları için stoklar ', bold('kritik seviyede'), '. En çok ihtiyaç duyduğumuz malzemeler:'),
        ul(
          [bold('Kuru mama'), ' — kedi ve köpek (en az 200 kg)'],
          [bold('Konserve mama'), ' — soğukta daha çok tercih ediliyor'],
          [bold('Kedi kumu'), ' — geçici bakım için şart'],
          [bold('Battaniye ve eski giysiler'), ' — barınak yapımında kullanılıyor'],
        ),
        paragraph('Yardımlarınızı ', link('/mama-malzeme', [bold('mama ve malzeme sayfamızdan')]), ' koordine edebilirsiniz.'),
      ),
      tags: [{ tag: 'kış' }, { tag: 'besleme' }, { tag: 'hazırlık' }, { tag: 'ihtiyaç' }],
    },
    // Post 4: Cesur'un Hikayesi
    {
      title: 'Cesur\'un Hikayesi: Terk Edilmiş Bir Dostun Yeniden Doğuşu',
      excerpt: 'Deprem sonrası sahipleri tarafından terk edilen Cesur\'un bulunma ve iyileşme hikayesi.',
      postCategory: 'kurtarma' as const,
      categories: [categories['kurtarma-hikayeleri']],
      heroImage: mediaIds['post-hero-4'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Boş Bir Bahçede Bekleyen Köpek'),
        paragraph('Antakya\'da deprem sonrası mahalle taramalarımız sırasında, terkedilmiş bir evin bahçesinde bekleyen bir köpek bulduk. Sahipleri deprem sonrası tahliye edilmişti — ', bold('Cesur geride bırakılmıştı.')),
        paragraph('Zayıflamıştı, kaburgaları sayılıyordu ama gözlerinde hâlâ ', italic('bir güven, bir beklenti'), ' vardı. Sanki sahiplerinin döneceğinden emindi. Bize yaklaştığında kuyruğunu salladı — bu kadar acıya rağmen insanlara güveni sarsılmamıştı.'),
        quote('Cesur\'u ilk gördüğümde, kapının önünde oturmuş bekliyordu. Kimseyi beklemediğini bilmiyordu. O an yüreğim parçalandı.'),
        hr(),
        heading('h2', 'Yavaş Ama Kararlı Bir İyileşme'),
        paragraph('Veteriner kontrolünde ciddi bir sağlık sorunu yoktu — ', bold('yetersiz beslenme ve hafif parazit'), ' dışında. Bu, Cesur\'un güçlü bir bünye yapısına sahip olduğunu gösteriyordu.'),
        paragraph('Düzenli beslenme, vitamin takviyesi ve bol sevgiyle hızla toparlandı:'),
        ul(
          [bold('İlk hafta'), ' — düzenli mama ve temiz su, parazit tedavisi'],
          [bold('İkinci hafta'), ' — kilo almaya başladı, enerjisi arttı'],
          [bold('Üçüncü hafta'), ' — kısırlaştırıldı ve aşıları tamamlandı'],
        ),
        hr(),
        heading('h2', 'Şimdi Nerede?'),
        paragraph('Cesur artık kalıcı bakımımızda ve ', bold('besleme noktalarının en sadık ziyaretçisi.'), ' Her sabah aynı saatte geliyor, kuyruğunu sallayarak ekibi karşılıyor.'),
        paragraph('Onun hikayesi bize şunu öğretti: terk edilmek son değil. ', italic('Yeni bir başlangıç her zaman mümkün.')),
        paragraph(link('/canlarimiz', [bold('Cesur ve diğer canlarımızı tanıyın')]), '.'),
      ),
      tags: [{ tag: 'köpek' }, { tag: 'kurtarma' }, { tag: 'cesur' }, { tag: 'deprem' }],
    },
    // Post 5: Kısırlaştırma Neden Bu Kadar Önemli?
    {
      title: 'Kısırlaştırma Neden Bu Kadar Önemli?',
      excerpt: 'Sokak hayvanı popülasyonu kontrolünde kısırlaştırmanın önemi ve Paws of Hope\'un çalışmaları.',
      postCategory: 'duyuru' as const,
      categories: [categories['duyurular']],
      heroImage: mediaIds['post-hero-5'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Rakamların Acı Gerçeği'),
        paragraph('Kısırlaştırılmamış bir dişi kedi yılda ortalama ', bold('3 kez doğum'), ' yapabilir ve her seferinde ', bold('4-6 yavru'), ' dünyaya getirir. Bu da yılda ', bold('12-18 yeni yavru'), ' demek — sadece bir kediden.'),
        paragraph('Kontrolsüz üreme, sokak hayvanı popülasyonunun hızla artmasına yol açıyor. Artan popülasyon demek:'),
        ul(
          ['Daha fazla açlık ve yetersiz beslenme'],
          ['Hastalıkların hızla yayılması'],
          ['Yavrular arasında yüksek ölüm oranı'],
          ['Hayvanlar arası kavgalar ve yaralanmalar'],
        ),
        quote('Bir kediyi kısırlaştırmak, 5 yıl içinde potansiyel olarak 200\'den fazla yavrunun sokakta kalmasını önler. Bu bir hayat kurtarma eylemidir.'),
        hr(),
        heading('h2', 'Bizim Yaklaşımımız'),
        paragraph('Bakımımızdaki ', bold('tüm hayvanlar kısırlaştırılıyor.'), ' Ama bununla kalmıyoruz — besleme noktalarında gördüğümüz sokak hayvanlarını da kısırlaştırma programımıza dahil ediyoruz.'),
        paragraph('Şu ana kadar ', bold('15 hayvanı'), ' kısırlaştırdık. Hedefimiz bu sayıyı her ay artırmak. Veteriner ekibimizle düzenli kısırlaştırma günleri planlıyoruz.'),
        hr(),
        heading('h2', 'Nasıl Destek Olabilirsiniz?'),
        paragraph('Kısırlaştırma maliyetleri:'),
        ul(
          [bold('Kediler:'), ' 500-800₺ arası'],
          [bold('Köpekler:'), ' 800-1.200₺ arası'],
        ),
        paragraph('Belirli bir hayvanın kısırlaştırma masrafını ', bold('sponsor olarak'), ' üstlenebilirsiniz. Operasyon sonrası fotoğraflar ve veteriner sertifikası tarafınıza iletilir.'),
        paragraph(link('/destek-ol', [bold('Kısırlaştırma sponsoru olun')]), '.'),
      ),
      tags: [{ tag: 'kısırlaştırma' }, { tag: 'popülasyon' }, { tag: 'sağlık' }],
    },
    // Post 6: Fındık: Soğukta Titreyen Bir Yavru
    {
      title: 'Fındık: Soğukta Titreyen Bir Yavru',
      excerpt: 'Malatya\'da kış soğuğunda bulunan yavru kedi Fındık\'ın kurtarılma ve tedavi hikayesi.',
      postCategory: 'kurtarma' as const,
      categories: [categories['kurtarma-hikayeleri'], categories['tedavi-gunlugu']],
      heroImage: mediaIds['post-hero-6'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Eksi 10 Derecede Bir Miyavlama'),
        paragraph('Ocak ayının ortasında, Malatya\'da gece sıcaklığı ', bold('eksi 10°C'), '\'ye düşmüştü. Bir çöp konteynerinin arkasından gelen zayıf bir miyavlama, gece turundaki gönüllümüzün dikkatini çekti.'),
        paragraph('Bulduğumuz manzara yürek burkucuydu: ', bold('avuç içine sığacak kadar küçük bir yavru kedi.'), ' Tüyleri ıslaktı, gözleri yapışmıştı, nefesi hırıltılıydı. Rengi fındık rengiydi — adı da böyle konuldu.'),
        quote('Fındık\'ı elime aldığımda, buz gibiydi. Ceketimin içine koydum ve koşarak araca döndüm. Her saniye önemliydi.'),
        hr(),
        heading('h2', 'Kritik Günler'),
        paragraph('Veteriner muayenesinde tanı ağırdı:'),
        ul(
          [bold('Ciddi solunum yolu enfeksiyonu')],
          [bold('Hipotermi'), ' — vücut ısısı tehlikeli seviyede düşüktü'],
        ),
        paragraph('İlk ', bold('48 saat'), ' ısıtılmış kutuda geçti. Saatlik biberonla besleme yapıldı. Antibiyotik tedavisi başlandı. İkinci gecenin sonunda ateşi düştü ama ', bold('kendi başına yemeye başladı'), ' — bu dönüm noktasıydı.'),
        hr(),
        heading('h2', 'İyileşme'),
        paragraph('10 gün sonra Fındık tamamen toparlanmıştı. Gözleri açılmış, tüyleri kabarık ve parlaktı. Artık kutusundan çıkıyor, her şeyi keşfetmek istiyordu.'),
        paragraph(bold('Kısırlaştırıldı, aşıları yapıldı'), ' ve kalıcı bakımımıza alındı. Şimdi sağlıklı ve oyuncu bir kedi — en sevdiği oyun kağıt top kovalamak.'),
        paragraph(italic('Kış aylarında Fındık gibi yüzlerce yavru soğukla savaşıyor. '), link('/destek-ol', [bold('Onlara sıcak bir şans verin')]), '.'),
      ),
      tags: [{ tag: 'kedi' }, { tag: 'yavru' }, { tag: 'kurtarma' }, { tag: 'fındık' }, { tag: 'kış' }],
    },
    // Post 7: Bir Besleme Turunun Hikayesi
    {
      title: 'Bir Besleme Turunun Hikayesi',
      excerpt: 'Sabah 6\'dan itibaren 3 besleme noktasında yaklaşık 100 hayvanı beslediğimiz bir günün detaylı kaydı.',
      postCategory: 'gunluk' as const,
      categories: [categories['gonullu-yazilari']],
      heroImage: mediaIds['post-hero-1'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Sabah 06:00 — Hazırlık'),
        paragraph('Güneş henüz doğmamış. Mutfakta mama porsiyonlarını tartıyoruz, su bidonlarını dolduruyoruz. Araca yüklenen malzemeler:'),
        ul(
          [bold('~8 kg kedi maması'), ' (kuru ve yaş karışık)'],
          [bold('~5 kg köpek maması')],
          [bold('20 litre temiz su')],
          ['İlk yardım malzemeleri — göz damlası, yara spreyi, eldiven'],
        ),
        paragraph('Her şey hazır. Yola çıkıyoruz.'),
        hr(),
        heading('h2', '06:30 — İlk Nokta: Pazar Yeri Arkası'),
        paragraph('İlk durağımız pazar yeri arkası. Burada ', bold('25-30 düzenli kedimiz'), ' var. Bizi tanıyorlar — araba sesini duyunca koşarak geliyorlar.'),
        paragraph('Mama kaplarını yerleştirirken, gözlerinde enfeksiyon belirtisi olan bir kediye ', bold('göz damlası'), ' uyguladık. Durumunu takip edeceğiz — iyileşmezse veterinere götüreceğiz.'),
        hr(),
        heading('h2', '07:15 — İkinci Nokta: Okul Çevresi'),
        paragraph('İkinci nokta bir ilkokul çevresi. Burada kedi ve köpek karışık ', bold('yaklaşık 35 hayvan'), ' var. Köpekler biraz daha çekingen — ayrı kaplarla, biraz mesafeli besliyoruz.'),
        paragraph('Çocuklar okula gelmeye başlayınca hayvanlar onlarla da ilgileniyor. ', italic('Bu etkileşim aslında güzel — hayvan sevgisi küçük yaşta başlıyor.')),
        hr(),
        heading('h2', '08:30 — Üçüncü Nokta ve Dönüş'),
        paragraph('Son durağımız sanayi bölgesi kenarı. Burası daha ıssız, hayvan sayısı daha az ama ', bold('en zor koşullardaki hayvanlar burada.')),
        paragraph('Toplam: ', bold('3 saat, 3 nokta, yaklaşık 100 hayvan.'), ' Eve dönüyoruz — yorgunuz ama içimiz huzurlu.'),
        quote('Bu işi neden yapıyoruz diye soran olursa: her sabah bizi gördüklerinde koşarak gelen o gözler yüzünden. Onlar için buradayız.'),
        paragraph(link('/gonullu-ol', [bold('Siz de besleme turlarına katılabilirsiniz')]), '.'),
      ),
      tags: [{ tag: 'besleme' }, { tag: 'günlük' }, { tag: 'gönüllü' }, { tag: 'rutin' }],
    },
    // Post 8: İlk Mama Toplama Etkinliğimiz
    {
      title: 'İlk Mama Toplama Etkinliğimiz',
      excerpt: 'Instagram\'da başlayan bir çağrının mama toplama etkinliğine dönüşme hikayesi.',
      postCategory: 'etkinlik' as const,
      categories: [categories['duyurular']],
      heroImage: mediaIds['post-hero-2'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Bir Hikaye Paylaşmakla Başladı'),
        paragraph('Instagram\'da mama stoklarımızın tükendiğini paylaştık. Basit bir hikaye — besleme turundaki boş mama çuvallarının fotoğrafı ve ', italic('"Bu hafta mama bulamıyoruz"'), ' yazısı.'),
        paragraph('Beklediğimiz şey birkaç paylaşımdı. Ama gelen yanıt bizi şaşırttı: ', bold('düzinelerce mesaj, onlarca yardım teklifi.'), ' İnsanlar mama göndermek, bizzat getirmek, hatta toplama noktası olmak istiyordu.'),
        quote('O hikayeyi paylaştığımda, 2 saat içinde 40\'tan fazla mesaj geldi. İnsanlar yardım etmek istiyor — sadece nasıl yapacaklarını bilmiyorlardı.'),
        hr(),
        heading('h2', 'Etkinlik Günü'),
        paragraph('Spontan bir şekilde organize ettik. Bir kafe bahçesi, birkaç masa, sosyal medya duyurusu. Beklentimiz düşüktü — ', italic('belki 5-10 kişi gelir'), ' diye düşünüyorduk.'),
        paragraph(bold('20\'den fazla kişi katıldı.'), ' Topladığımız bağışlar:'),
        ul(
          [bold('45 kg'), ' kuru ve yaş mama'],
          [bold('12 kutu'), ' kedi kumu'],
          ['Battaniye ve havlular'],
          ['İlk yardım malzemeleri'],
        ),
        paragraph('Ama en değerli olan topladığımız malzemeler değildi — ', bold('insanların paylaştığı hikayelerdi.'), ' Herkesin mahallelerinde baktıkları bir sokak hayvanı vardı. Herkesin anlatacak bir hikayesi vardı.'),
        hr(),
        heading('h2', 'Bundan Sonra'),
        paragraph('Bu deneyim bize önemli bir şey öğretti: insanlar yardım etmek istiyor ama ', bold('yönlendirmeye ihtiyaçları var.'), ' Nereye mama bırakacaklarını, yaralı bir hayvan gördüklerinde ne yapacaklarını bilmiyorlar.'),
        paragraph('Düzenli etkinlikler planlamaya başlıyoruz. Her ay bir toplama günü, her hafta bir bilgilendirme paylaşımı. ', italic('Topluluk büyüdükçe, ulaşabileceğimiz hayvan sayısı da artacak.')),
        paragraph(link('/iletisim', [bold('Bir sonraki etkinliğimize katılmak için bize ulaşın')]), '.'),
      ),
      tags: [{ tag: 'etkinlik' }, { tag: 'mama' }, { tag: 'topluluk' }, { tag: 'instagram' }],
    },
    // Post 9: Zeytin: Trafik Kazası ve Tedavi Süreci
    {
      title: 'Zeytin: Trafik Kazası ve Tedavi Süreci',
      excerpt: 'Trafik kazası geçiren Zeytin\'in acil müdahale, operasyon ve tedavi sürecinin hikayesi.',
      postCategory: 'kurtarma' as const,
      categories: [categories['kurtarma-hikayeleri'], categories['tedavi-gunlugu']],
      heroImage: mediaIds['post-hero-3'] || undefined,
      content: lexicalRoot(
        heading('h2', 'Acil Çağrı'),
        paragraph('WhatsApp hattımıza gelen mesaj kısa ve acildi: ', bold('"Ana yolda yaralı köpek, hareket edemiyor."'), ' Hemen yola çıktık.'),
        paragraph('Bulduğumuz genç bir dişi köpekti. Zeytin yeşili gözleri vardı — adını oradan aldı. ', bold('Arka sol bacağı anormal bir açıdaydı'), ', ama bize doğru baktığında gözlerinde ne öfke ne de panik vardı. Sadece yardım bekliyordu.'),
        paragraph('Dikkatli bir şekilde sedyeye aldık ve ', bold('acil veteriner kliniğine'), ' yetiştirdik.'),
        quote('Zeytin\'i araca taşırken tek bir ses bile çıkarmadı. O gözlerdeki güven, bize verilen en büyük sorumluluktu.'),
        hr(),
        heading('h2', 'Teşhis ve Tedavi'),
        paragraph('Röntgen sonuçları:'),
        ul(
          [bold('Arka sol bacakta kırık'), ' — temiz kırık, ameliyat gerekli'],
          ['İç organ hasarı ', bold('yok'), ' — bu büyük bir şanstı'],
        ),
        paragraph('Ameliyata alındı. ', bold('Plaka ve vida'), ' ile bacak sabitlendi. Operasyon başarılı geçti. Zeytin anesteziden çıktığında kuyruğunu salladı — herkesin gözleri doldu.'),
        hr(),
        heading('h2', 'İyileşme Süreci ve Maliyet'),
        paragraph('Zeytin şu anda geçici bakım evinde dinleniyor. Günlük pansumanlar yapılıyor, haftalık veteriner kontrolleri devam ediyor.'),
        paragraph(bold('Toplam tedavi maliyeti: 3.000₺')),
        ul(
          ['Karşılanan: ', bold('800₺')],
          ['Hâlâ ihtiyaç duyulan: ', bold('2.200₺')],
        ),
        paragraph('Trafik kazaları, sokak hayvanları için ', bold('en sık karşılaşılan tehlikelerden biri.'), ' Hız sınırlarına uyulması, gece sürüşlerinde dikkatli olunması hayat kurtarır.'),
        paragraph(link('/destek-ol', [bold('Zeytin\'in tedavi masraflarına destek olun')]), '.'),
      ),
      tags: [{ tag: 'köpek' }, { tag: 'acil' }, { tag: 'tedavi' }, { tag: 'zeytin' }, { tag: 'trafik' }],
    },
  ]

  for (const post of postsData) {
    await payload.create({
      collection: 'posts',
      locale: 'tr',
      data: {
        ...post,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        ...(authorId ? { authors: [authorId] } : {}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      context: { disableRevalidate: true },
    })
    console.log(`  Created post: ${post.title}`)
  }

  console.log('\nSeeding events...')

  const eventsData = [
    {
      title: 'Bahar Sahiplendirme Günü',
      eventDate: '2026-04-12T10:00:00.000Z',
      endDate: '2026-04-12T17:00:00.000Z',
      eventType: 'sahiplendirme' as const,
      eventStatus: 'yaklasan' as const,
      location: 'Kadıköy Sahil Parkı, İstanbul',
      coverImage: mediaIds['event-cover-1'] || undefined,
      description: lexicalRoot(
        heading('h3', 'Bahar Sahiplendirme Günü Detayları'),
        paragraph('Bahar geldi, yeni yuvalar arıyoruz! ', bold('Kadıköy Sahil Parkı\'nda'), ' büyük sahiplendirme günümüze davetlisiniz.'),
        paragraph(bold('20\'den fazla kedi ve köpek'), ' yeni ailelerini bekliyor. Tüm hayvanlarımız kısırlaştırılmış, aşılı ve mikroçipli. ', link('/canlarimiz', ['Canlarımızı önceden tanıyın'], false), '.'),
        heading('h3', 'Etkinlik Programı'),
        ul(
          [bold('10:00-12:00'), ' — Sahiplendirme başvuruları ve tanışma'],
          [bold('12:00-14:00'), ' — Veteriner danışmanlık (ücretsiz)'],
          [bold('14:00-16:00'), ' — Çocuklar için hayvan sevgisi atölyesi'],
          [bold('10:00-17:00'), ' — Mama bağış noktası (sürekli açık)'],
        ),
        quote('Her sahiplendirme, bir can kurtarmaktır. Gel, yeni dostunla tanış!'),
      ),
    },
    {
      title: 'Nisan Mama Toplama Kampanyası',
      eventDate: '2026-04-05T10:00:00.000Z',
      endDate: '2026-04-06T18:00:00.000Z',
      eventType: 'mama-toplama' as const,
      eventStatus: 'yaklasan' as const,
      location: 'Kadıköy Sahil Parkı',
      coverImage: mediaIds['event-cover-2'] || undefined,
      description: lexicalRoot(
        heading('h3', 'Nisan Mama Toplama Detayları'),
        paragraph('İki gün sürecek mama toplama kampanyamıza katılın! ', bold('Kedi ve köpek maması, kum, ilaç ve bakım malzemeleri'), ' kabul ediyoruz.'),
        ul(
          ['Kedi maması (kuru/yaş)'],
          ['Köpek maması (kuru/yaş)'],
          ['Kedi kumu'],
          ['Veteriner ilaçları'],
          ['Battaniye ve havlu'],
        ),
        paragraph('Geçen ay ', bold('500 kg'), ' mama toplamayı başardık. Bu ay hedefimiz ', bold('750 kg!')),
        quote('Her kilo mama, onlarca sokak hayvanının karnını doyurur. Katkınız için teşekkürler!'),
      ),
    },
    {
      title: 'Kısırlaştırma Kampanyası — Mart 2026',
      eventDate: '2026-03-15T09:00:00.000Z',
      endDate: '2026-03-31T18:00:00.000Z',
      eventType: 'bakim-gunu' as const,
      eventStatus: 'devam-ediyor' as const,
      location: 'Kadıköy & Üsküdar Bölgesi',
      description: lexicalRoot(
        heading('h3', 'Kısırlaştırma Kampanyası — Mart 2026'),
        paragraph('Mart ayı boyunca ücretsiz kısırlaştırma kampanyamız devam ediyor. Şu ana kadar ', bold('32 hayvan'), ' kısırlaştırıldı. Hedef: ', bold('50 hayvan.')),
        paragraph('Bölgenizde kısırlaştırılması gereken sokak hayvanı varsa bize bildirin. Yakalama ve nakliye ekibimiz hazır.'),
        quote('Kısırlaştırma = insancıl popülasyon kontrolü. Bir operasyon, yüzlerce yavrunun sokakta kalmasını önler.'),
      ),
    },
    {
      title: 'Gönüllü Eğitim Semineri',
      eventDate: '2026-03-20T14:00:00.000Z',
      endDate: '2026-03-20T17:00:00.000Z',
      eventType: 'egitim' as const,
      eventStatus: 'yaklasan' as const,
      location: 'Online (Zoom)',
      description: lexicalRoot(
        heading('h3', 'Gönüllü Eğitim Semineri — Online'),
        paragraph('Yeni gönüllülerimiz için temel eğitim semineri düzenliyoruz. ', bold('Zoom üzerinden'), ' katılabilirsiniz.'),
        heading('h4', 'Seminer Konuları'),
        ul(
          ['Sokak hayvanlarına ilk yaklaşım teknikleri'],
          ['Yaralı hayvan taşıma ve güvenli tutma'],
          ['Acil durum prosedürleri ve iletişim protokolü'],
          ['Hijyen ve kişisel güvenlik kuralları'],
        ),
        paragraph(bold('Süre:'), ' 3 saat (14:00 - 17:00)', text(' | '), bold('Platform:'), ' Zoom'),
        paragraph('Toplantı bilgisi: ', inlineCode('Meeting ID: 123-456-789')),
        paragraph('Seminere katılmak için ', link('/gonullu-ol', [bold('gönüllü başvurusu yapın')]), '.'),
      ),
    },
    {
      title: 'Kış Besleme Maratonu',
      eventDate: '2026-02-01T08:00:00.000Z',
      endDate: '2026-02-28T20:00:00.000Z',
      eventType: 'diger' as const,
      eventStatus: 'tamamlandi' as const,
      location: 'İstanbul Geneli — 40 Nokta',
      description: lexicalRoot(
        heading('h3', 'Kış Besleme Maratonu — Tamamlandı!'),
        paragraph('Şubat ayı boyunca süren kış besleme maratonumuz ', bold('başarıyla tamamlandı!')),
        paragraph(strikethrough('Hedef: 2.000 kg'), ' — ', bold('AŞILDI!'), ' Toplam ', bold('2.400 kg'), ' mama dağıtıldı.'),
        ul(
          [bold('40'), ' farklı noktada günlük besleme yapıldı'],
          [bold('2.400 kg'), ' mama dağıtıldı ', strikethrough('(hedef: 2.000 kg)')],
          [bold('150'), ' gönüllü katıldı'],
          [bold('28'), ' gün boyunca kesintisiz sürdürüldü'],
        ),
        quote('Bu başarı sizlerin sayesinde! Tüm gönüllülerimize ve destekçilerimize sonsuz teşekkürler.'),
      ),
    },
  ]

  for (const event of eventsData) {
    await payload.create({
      collection: 'events',
      locale: 'tr',
      data: {
        ...event,
        _status: 'published',
        publishedAt: new Date().toISOString(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      context: { disableRevalidate: true },
    })
    console.log(`  Created event: ${event.title}`)
  }

  console.log('\nSeeding volunteers...')

  const volunteersData = [
    {
      name: 'Elif Yıldırım',
      email: 'elif.yildirim@example.com',
      phone: '0532 111 2233',
      areas: ['besleme', 'sahiplendirme'],
      message: 'Hayvanlara çok düşkünüm, hafta sonları yardım edebilirim.',
      applicationStatus: 'onaylandi' as const,
    },
    {
      name: 'Burak Kaya',
      email: 'burak.kaya@example.com',
      phone: '0533 222 3344',
      areas: ['nakliye', 'besleme'],
      message: 'Aracım var, nakliye konusunda yardımcı olabilirim.',
      applicationStatus: 'onaylandi' as const,
    },
    {
      name: 'Selin Arslan',
      email: 'selin.arslan@example.com',
      phone: '0534 333 4455',
      areas: ['tedavi', 'etkinlik'],
      message: 'Veteriner fakültesi 4. sınıf öğrencisiyim, klinik desteği verebilirim.',
      applicationStatus: 'onaylandi' as const,
    },
    {
      name: 'Mert Çelik',
      email: 'mert.celik@example.com',
      phone: '0535 444 5566',
      areas: ['besleme'],
      message: 'Kadıköy bölgesinde yaşıyorum, günlük besleme rotalarına katılmak istiyorum.',
      applicationStatus: 'beklemede' as const,
    },
    {
      name: 'Zeynep Demir',
      email: 'zeynep.demir@example.com',
      phone: '0536 555 6677',
      areas: ['etkinlik', 'sahiplendirme'],
      message: 'Sosyal medya yönetimi ve etkinlik organizasyonu konusunda deneyimim var.',
      applicationStatus: 'onaylandi' as const,
    },
    {
      name: 'Ali Öztürk',
      email: 'ali.ozturk@example.com',
      phone: '0537 666 7788',
      areas: ['nakliye', 'tedavi'],
      message: 'Emekli veteriner hekimim, gönüllü olarak katkı sağlamak istiyorum.',
      applicationStatus: 'onaylandi' as const,
    },
    {
      name: 'Derya Koç',
      email: 'derya.koc@example.com',
      phone: '0538 777 8899',
      areas: ['besleme', 'etkinlik'],
      message: 'Üsküdar bölgesinde besleme noktalarına yardım edebilirim.',
      applicationStatus: 'beklemede' as const,
    },
  ]

  for (const vol of volunteersData) {
    await payload.create({
      collection: 'volunteers',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: vol as any,
      context: { disableRevalidate: true },
    })
    console.log(`  Created volunteer: ${vol.name}`)
  }

  console.log('\nSeeding needs list...')

  const needsData = [
    {
      productName: 'Kedi Maması (Kuru)',
      brandDetail: 'Pro Plan / Royal Canin',
      urgency: 'acil' as const,
      stockStatus: 'Kritik seviyede',
      currentStock: 5,
      targetStock: 50,
      unit: 'kg' as const,
      priority: 'acil' as const,
    },
    {
      productName: 'Köpek Maması (Kuru)',
      brandDetail: 'Acana / Orijen',
      urgency: 'acil' as const,
      stockStatus: 'Çok az kaldı',
      currentStock: 8,
      targetStock: 80,
      unit: 'kg' as const,
      priority: 'acil' as const,
    },
    {
      productName: 'Kedi Kumu',
      brandDetail: 'Ever Clean / Cat Step',
      urgency: 'orta' as const,
      stockStatus: 'Orta seviye',
      currentStock: 12,
      targetStock: 30,
      unit: 'kutu' as const,
      priority: 'yuksek' as const,
    },
    {
      productName: 'Yaş Mama (Kedi)',
      brandDetail: 'Gourmet / Sheba',
      urgency: 'orta' as const,
      stockStatus: 'Yeterli değil',
      currentStock: 20,
      targetStock: 100,
      unit: 'adet' as const,
      priority: 'orta' as const,
    },
    {
      productName: 'Yaş Mama (Köpek)',
      brandDetail: 'Cesar / Pedigree',
      urgency: 'orta' as const,
      stockStatus: 'Az kaldı',
      currentStock: 15,
      targetStock: 80,
      unit: 'adet' as const,
      priority: 'yuksek' as const,
    },
    {
      productName: 'Göz Damlası',
      brandDetail: 'Tobramisin / Gentamisin',
      urgency: 'acil' as const,
      stockStatus: 'Bitmek üzere',
      currentStock: 2,
      targetStock: 20,
      unit: 'adet' as const,
      priority: 'acil' as const,
    },
    {
      productName: 'Pire / Kene Damlası',
      brandDetail: 'Frontline / Bravecto',
      urgency: 'orta' as const,
      stockStatus: 'Orta',
      currentStock: 10,
      targetStock: 40,
      unit: 'adet' as const,
      priority: 'orta' as const,
    },
    {
      productName: 'Battaniye',
      brandDetail: 'Polar battaniye (60x80cm)',
      urgency: 'yeterli' as const,
      stockStatus: 'Yeterli',
      currentStock: 25,
      targetStock: 30,
      unit: 'adet' as const,
      priority: 'dusuk' as const,
    },
    {
      productName: 'Mama Kabı',
      brandDetail: 'Paslanmaz çelik',
      urgency: 'yeterli' as const,
      stockStatus: 'Yeterli',
      currentStock: 40,
      targetStock: 50,
      unit: 'adet' as const,
      priority: 'dusuk' as const,
    },
    {
      productName: 'Taşıma Kafesi',
      brandDetail: 'Orta boy, plastik',
      urgency: 'orta' as const,
      stockStatus: 'Yetersiz',
      currentStock: 3,
      targetStock: 15,
      unit: 'adet' as const,
      priority: 'yuksek' as const,
    },
  ]

  for (const need of needsData) {
    await payload.create({
      collection: 'needs-list',
      locale: 'tr',
      data: need,
      context: { disableRevalidate: true },
    })
    console.log(`  Created need: ${need.productName}`)
  }

  console.log('\nSeeding transparency reports...')

  const reportsData = [
    {
      title: 'Şubat 2026 Şeffaflık Raporu',
      month: '2026-02-01',
      totalExpense: 45000,
      totalDonation: 52000,
      expenses: [
        { category: 'Veteriner Masrafları', amount: 18000 },
        { category: 'Mama ve Malzeme', amount: 12000 },
        { category: 'İlaç', amount: 5000 },
        { category: 'Nakliye', amount: 3000 },
        { category: 'Barınma', amount: 4000 },
        { category: 'Genel Giderler', amount: 3000 },
      ],
      donorList: [
        { name: 'Ayşe K.', amount: 5000 },
        { name: 'Mehmet Y.', amount: 3000 },
        { name: 'Selin A.', amount: 2000 },
        { name: 'Anonim', amount: 15000 },
        { name: 'Burak K.', amount: 1000 },
        { name: 'Çeşitli bağışçılar', amount: 26000 },
      ],
    },
    {
      title: 'Ocak 2026 Şeffaflık Raporu',
      month: '2026-01-01',
      totalExpense: 38000,
      totalDonation: 41000,
      expenses: [
        { category: 'Veteriner Masrafları', amount: 15000 },
        { category: 'Mama ve Malzeme', amount: 10000 },
        { category: 'İlaç', amount: 4000 },
        { category: 'Nakliye', amount: 2500 },
        { category: 'Barınma', amount: 3500 },
        { category: 'Genel Giderler', amount: 3000 },
      ],
      donorList: [
        { name: 'Zeynep D.', amount: 4000 },
        { name: 'Ali Ö.', amount: 2500 },
        { name: 'Anonim', amount: 12000 },
        { name: 'Çeşitli bağışçılar', amount: 22500 },
      ],
    },
    {
      title: 'Aralık 2025 Şeffaflık Raporu',
      month: '2025-12-01',
      totalExpense: 42000,
      totalDonation: 48000,
      expenses: [
        { category: 'Veteriner Masrafları', amount: 16000 },
        { category: 'Mama ve Malzeme', amount: 14000 },
        { category: 'İlaç', amount: 3500 },
        { category: 'Nakliye', amount: 2000 },
        { category: 'Barınma', amount: 3500 },
        { category: 'Genel Giderler', amount: 3000 },
      ],
      donorList: [
        { name: 'Yılbaşı Kampanyası', amount: 20000 },
        { name: 'Anonim', amount: 10000 },
        { name: 'Çeşitli bağışçılar', amount: 18000 },
      ],
    },
  ]

  for (const report of reportsData) {
    await payload.create({
      collection: 'transparency-reports',
      locale: 'tr',
      data: report,
      context: { disableRevalidate: true },
    })
    console.log(`  Created report: ${report.title}`)
  }

  console.log('\nSeeding globals...')

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'tr',
    context: { disableRevalidate: true },
    data: {
      socialLinks: [
        { type: 'instagram', url: 'https://instagram.com/umutpatileri' },
        { type: 'x-twitter', url: 'https://twitter.com/umutpatileri' },
        { type: 'whatsapp', url: '+905551234567' },
        { type: 'phone', url: '+905551234567' },
        { type: 'email', url: 'info@umutpatileri.org' },
      ],
      bankAccounts: [
        {
          bankName: 'Ziraat Bankası',
          accountHolder: 'Umut Patileri Derneği',
          iban: 'TR00 0001 0000 0000 0000 0000 00',
          currency: 'TRY',
        },
        {
          bankName: 'İş Bankası',
          accountHolder: 'Umut Patileri Derneği',
          iban: 'TR00 0006 4000 0000 0000 0000 00',
          currency: 'EUR',
        },
      ],
      catsCount: 42,
      dogsCount: 28,
      treatedCount: 347,
      spayedCount: 89,
      vaccinatedCount: 156,
      feedingPointsCount: 4,
      homepageBlocks: [
        {
          blockType: 'homeHero',
          enabled: true,
          sectionTitle: 'HER CAN DEĞERLİ',
          tagline: "2019'dan bu yana yüzlerce hayvanın hayatına dokunduk.",
          rotatingWords: [
            { word: 'Besliyoruz' },
            { word: 'Tedavi Ediyoruz' },
            { word: 'Sahiplendiriyoruz' },
            { word: 'Umut Oluyoruz' },
          ],
        },
        {
          blockType: 'homeStats',
          enabled: true,
          metrics: [
            { label: 'METRİK 01 // OPERASYONEL', value: '347', name: 'KURTARILAN' },
            { label: 'METRİK 02 // TRANSFER', value: '89', name: 'YENİ BULDU' },
            { label: 'METRİK 03 // LOJİSTİK', value: '2.4K', name: 'BESLENDİ' },
            { label: 'METRİK 04 // SÜREKLİLİK', value: '04', name: 'AKTİF YUVA' },
          ],
        },
        {
          blockType: 'homeStory',
          enabled: true,
          sectionTitle: 'HİKAYEMİZ & MİSYON',
          steps: [
            {
              title: 'HATAY\'DA BÜYÜMEK',
              ...(mediaIds['story-hatay'] ? { image: mediaIds['story-hatay'] } : {}),
              description: lexicalRoot(
                paragraph(
                  '1981 yılında, Türkiye\'nin en ',
                  bold('kozmopolit'),
                  ' şehirlerinden biri olan Hatay\'da dünyaya geldi kurucumuz. Farklı kültürlerin bir arada yaşadığı bu şehirde büyümek, tüm canlılara karşı derin bir ',
                  bold('merhamet ve saygı'),
                  ' duygusu aşıladı.',
                ),
                paragraph(
                  'Beden eğitimi alanında eğitim aldıktan sonra, 2007 yılından itibaren ',
                  bold('yaşlı ve engelli bakım'),
                  ' alanında çalışmaya başladı. Yaklaşık 11 yıldır bir bakım kurumunda yönetici olarak görev yapıyor.',
                ),
              ),
            },
            {
              title: '6 ŞUBAT FELAKETİ',
              ...(mediaIds['story-earthquake'] ? { image: mediaIds['story-earthquake'] } : {}),
              description: lexicalRoot(
                paragraph(
                  '2023 yılında yaşanan ',
                  bold('yıkıcı depremler'),
                  ', Hatay\'ı yerle bir etti. Aile üyelerini, akrabalarını ve yakın arkadaşlarını kaybetti. Doğup büyüdüğü şehir büyük ölçüde yıkıma uğradı.',
                ),
                quote(
                  italic('"Deprem her şeyi aldı, ama içimdeki merhameti alamadı."'),
                ),
              ),
            },
            {
              title: 'YENİDEN DOĞUŞ',
              ...(mediaIds['story-first-feeding'] ? { image: mediaIds['story-first-feeding'] } : {}),
              description: lexicalRoot(
                paragraph(
                  'Depremin bıraktığı derin travmaları aşabilmek ve hayata yeniden tutunabilmek için küçüklüğünden beri sevdiği ',
                  bold('sokak hayvanlarına'),
                  ' yardım etmeyi kendine amaç edindi. ',
                  bold('Acı, amaca dönüştü.'),
                ),
                paragraph(
                  'Hem Hatay\'da hem de şu anda yaşadığı Malatya\'da — iki deprem şehrinde — hem insanların hem hayvanların yaşam koşulları çok zorlaştı. Bireysel olarak sokaklardaki canlara ulaşmaya başladı.',
                ),
              ),
            },
            {
              title: 'HER GÜN SAHADA',
              ...(mediaIds['story-daily'] ? { image: mediaIds['story-daily'] } : {}),
              description: lexicalRoot(
                paragraph(
                  'Bugün bireysel bir gönüllü olarak her gün yaklaşık ',
                  bold('100 kedi ve köpeğin'),
                  ' beslenmesine katkı sağlıyor. Büyük ölçüde kişisel imkanlarla yürütülen bu çalışma, adanmışlığın en somut örneği.',
                ),
                ul(
                  [bold('~100 hayvan'), ' her gün düzenli besleniyor'],
                  [bold('Kısırlaştırma'), ' çalışmalarına destek veriliyor'],
                  [bold('Hasta hayvanlar'), ' için veteriner erişimi sağlanıyor'],
                ),
              ),
            },
            {
              title: 'ŞEFFAFLIK İLKESİ',
              ...(mediaIds['story-health'] ? { image: mediaIds['story-health'] } : {}),
              description: lexicalRoot(
                paragraph(
                  'Bu platformu kurmasının en önemli nedeni, yapılan tüm desteklerin ',
                  bold('şeffaf bir şekilde paylaşılması'),
                  ' ve katkıların gerçekten ihtiyaç sahibi hayvanlara ulaştığının gösterilmesidir.',
                ),
                ul(
                  [bold('Şeffaflık'), ' — Tüm destekler ve harcamalar açıkça paylaşılır'],
                  [bold('Merhamet ve Saygı'), ' — Tüm canlıların yaşam hakkına saygı duyulur'],
                  [bold('Sürdürülebilirlik'), ' — Uzun vadeli iyileştirmeler hedeflenir'],
                  [bold('Topluluk Dayanışması'), ' — Birlikte daha güçlüyüz'],
                ),
              ),
            },
            {
              title: 'GELECEK VİZYONU',
              ...(mediaIds['story-vision'] ? { image: mediaIds['story-vision'] } : {}),
              description: lexicalRoot(
                paragraph(
                  'Bireysel çabaları ',
                  bold('dayanışma ağına'),
                  ' dönüştürmek en büyük hedef. Türkiye genelinde sürdürülebilir bir destek ağı kurmak, gönüllü topluluğu oluşturmak ve ',
                  bold('resmi bir dernek'),
                  ' çatısı altında daha profesyonel çalışmalar yürütmek yolunda.',
                ),
                quote(
                  italic('"Sokak hayvanlarının temel ihtiyaçlarına — mama, sağlık, güvenli yaşam — erişimini sağlamak için varız."'),
                ),
                paragraph(
                  'Bireysel bir mücadeleden doğan bu hareket, toplumsal bir ',
                  bold('farkındalık ve dayanışma'),
                  ' hareketine dönüşüyor.',
                ),
              ),
            },
          ],
        },
        {
          blockType: 'homeOurWork',
          enabled: true,
          sectionTitle: 'Çalışmalarımız',
          viewAllLabel: 'Tümünü Gör',
          viewAllLink: '/calismalarimiz',
          photoCountTemplate: '{count} fotoğraf',
          galleryVariant: 'circular',
          activities: [
            { key: 'feeding', title: 'Besleme', description: 'Her gün 40+ noktada düzenli besleme yapıyoruz.', images: [mediaIds['activity-feeding']].filter(Boolean) },
            { key: 'treatment', title: 'Tedavi', description: 'Hasta ve yaralı hayvanların tedavilerini karşılıyoruz.', images: [mediaIds['activity-treatment']].filter(Boolean) },
            { key: 'spaying', title: 'Kısırlaştırma', description: 'Popülasyon kontrolü için kampanyalar düzenliyoruz.', images: [mediaIds['activity-spaying']].filter(Boolean) },
            { key: 'emergency', title: 'Acil Müdahale', description: 'Acil durumlarda 7/24 müdahale ediyoruz.', images: [mediaIds['activity-emergency']].filter(Boolean) },
            { key: 'vaccination', title: 'Aşılama', description: 'Düzenli aşılama programı uyguluyoruz.', images: [mediaIds['activity-vaccination']].filter(Boolean) },
            { key: 'shelter', title: 'Barınma', description: 'Tedavi sürecinde geçici barınma sağlıyoruz.', images: [mediaIds['activity-shelter']].filter(Boolean) },
          ],
        },
        {
          blockType: 'homeFeaturedAnimals',
          enabled: false,
          sectionTitle: 'Canlarımız',
          viewAllLabel: 'Tümünü Gör',
          viewAllLink: '/canlarimiz',
          limit: 10,
          typeLabels: { kedi: 'Kedi', kopek: 'Köpek' },
          statusLabels: { tedavide: 'Tedavide', kaliciBakim: 'Kalıcı Bakım', acil: 'Acil' },
        },
        {
          blockType: 'homeActiveEmergencies',
          enabled: true,
          sectionTitle: 'Acil Vakalar',
          viewAllLabel: 'Tümünü Gör',
          viewAllLink: '/acil-vakalar',
          tickerText: 'ACİL MÜDAHALE GEREKİYOR /// KLİNİK DESTEĞİ BEKLİYOR /// DESTEK OLUN',
          limit: 5,
          labels: {
            case: 'Vaka',
            active: 'AKTİF',
          },
        },
        {
          blockType: 'homeSupportCards',
          enabled: true,
          slogan: 'Bir Can Kurtar',
          ibanTitle: 'IBAN ile Bağış',
          internationalTitle: 'Uluslararası Destek',
          volunteerTitle: 'Gönüllü Ol',
          volunteerDescription: 'Zamanınızı verin, saha ekibimize katılın.',
          internationalPlaceholder: 'Yurtdışı ödeme seçenekleri hazırlanıyor.',
          labels: {
            copy: 'Kopyala',
            comingSoon: 'Yakında',
            ibanPlaceholder: 'Banka hesap bilgileri yakında eklenecek.',
          },
        },
        {
          blockType: 'homeNeedsList',
          enabled: true,
          sectionTitle: 'Güncel İhtiyaçlar',
          viewAllLabel: 'Tüm Liste',
          viewAllLink: '/mama-malzeme',
          limit: 5,
          labels: {
            needed: 'İhtiyaç',
            inStock: 'Mevcut',
            stockLevel: 'Stok Seviyesi',
            priorityAcil: 'ACİL',
            priorityYuksek: 'YÜKSEK',
            priorityOrta: 'ORTA',
            priorityDusuk: 'DÜŞÜK',
            unitKutu: 'kutu',
            unitKg: 'kg',
            unitAdet: 'adet',
          },
        },
        {
          blockType: 'homeRecentPosts',
          enabled: true,
          sectionTitle: 'Son Yazılar',
          viewAllLabel: 'Tüm Yazılar',
          viewAllLink: '/gunluk',
          limit: 6,
        },
        {
          blockType: 'homeTransparencyBanner',
          enabled: true,
          title: 'Şeffaflık',
          description: 'Tüm gelir ve giderlerimizi düzenli olarak paylaşıyoruz.',
          ctaLabel: 'Raporları Gör',
          ctaLink: '/seffaflik',
        },
      ],
    },
  })
  console.log('  SiteSettings seeded (homepage blocks + bank accounts + statistics).')

  await payload.updateGlobal({
    slug: 'header',
    locale: 'tr',
    context: { disableRevalidate: true },
    data: {
      brandName: 'UMUT PATİLERİ',
      navItems: [
        { link: { type: 'custom', url: '/' }, label: 'Ana Sayfa', isCta: false },
        { link: { type: 'custom', url: '/calismalarimiz' }, label: 'Çalışmalarımız', isCta: false },
        { link: { type: 'custom', url: '/acil-vakalar' }, label: 'Acil Vakalar', isCta: false },
        { link: { type: 'custom', url: '/gonullu-ol' }, label: 'Gönüllü Ol', isCta: false },
        { link: { type: 'custom', url: '/gunluk' }, label: 'Günlük', isCta: false },
        { link: { type: 'custom', url: '/destek-ol' }, label: 'Destek Ol', isCta: true },
      ],
    },
  })
  console.log('  Header seeded.')

  console.log('\nSeeding UIStrings (TR)...')

  const uiStringsBatches: Array<{ label: string; data: Record<string, unknown> }> = [
    {
      label: 'common + layout (header)',
      data: {
        common: {
          siteName: 'Paws of Hope',
          search: 'Ara',
          loading: 'Yükleniyor...',
          goHome: 'Ana Sayfaya Git',
          notFound: 'Sayfa bulunamadı',
          backToHome: 'Ana Sayfaya Dön',
        },
        layout: {
          skipToContent: 'İçeriğe geç',
          siteTitle: 'Paws of Hope — Sokak Hayvanları Bakımı',
          siteDescription: 'Sokak hayvanlarının bakım, tedavi ve sıcak bir yuva bulmasına yardımcı oluyoruz.',
          header: {
            home: 'Ana Sayfa',
            posts: 'Yazılar',
            search: 'Ara',
            animals: 'Canlarımız',
            emergency: 'Acil Durumlar',
            blog: 'Blog',
            donate: 'Destek Ol',
            volunteer: 'Gönüllü Ol',
            vision: 'Gelecek Vizyonu',
            supplies: 'İhtiyaç Listesi',
            openMenu: 'Menüyü aç',
            closeMenu: 'Menüyü kapat',
          },
          languageSwitcher: {
            label: 'Dil seçimi',
          },
          mobileMenu: {
            title: 'Menü',
          },
        },
      },
    },
    {
      label: 'layout (footer, breadcrumb, mobileDonate)',
      data: {
        layout: {
          footer: {
            copyright: 'Tüm hakları saklıdır.',
            contactUs: 'İletişim',
            explore: 'Keşfet',
            support: 'Destek',
            followUs: 'Bizi Takip Edin',
            description: 'Sokak hayvanlarına umut oluyoruz.',
            missionTitle: 'Hayata Değer Kat',
            missionText: 'Her patili can bir yuva, her destek bir umut.',
            donateButton: 'Destek Ol',
            volunteerButton: 'Gönüllü Ol',
            emergencyLine: 'Acil Hat',
            madeWithLove: 'Sokak hayvanları için sevgiyle yapıldı 🐾',
          },
          breadcrumb: {
            home: 'Ana Sayfa',
          },
          mobileDonate: {
            cta: 'Destek Ol',
          },
        },
      },
    },
    {
      label: 'search + posts',
      data: {
        search: {
          title: 'Arama',
          placeholder: 'Ara...',
          noResults: 'Sonuç bulunamadı.',
          modal: {
            placeholder: 'Sayfa, yazı veya hayvan ara...',
            noResults: 'Sonuç bulunamadı.',
            shortcut: 'Aramayı aç',
          },
        },
        posts: {
          title: 'Yazılar',
          readMore: 'Devamını Oku',
          noPosts: 'Henüz yazı bulunmuyor.',
        },
      },
    },
    {
      label: 'animals (meta, filter)',
      data: {
        animals: {
          meta: {
            title: 'Canlarımız — Paws of Hope',
            description: 'Sokak hayvanlarımızı tanıyın. Tedavi, bakım ve yuva arayan kediler ve köpekler.',
          },
          title: 'Canlarımız',
          subtitle: 'Tedavi ve bakımımız altındaki tüm dostlarımızla tanışın.',
          filter: {
            all: 'Tümü',
            kedi: 'Kediler',
            kopek: 'Köpekler',
            noResults: 'Bu filtreyle eşleşen hayvan bulunamadı.',
            tedavide: 'Tedavide',
            kaliciBakim: 'Kalıcı Bakım',
            acil: 'Acil',
          },
        },
      },
    },
    {
      label: 'animals (detail, lightbox)',
      data: {
        animals: {
          detail: {
            story: 'Hikayesi',
            needs: 'İhtiyaçları',
            photos: 'Fotoğraflar',
            type: 'Tür',
            age: 'Yaş',
            gender: 'Cinsiyet',
            status: 'Durum',
            erkek: 'Erkek',
            disi: 'Dişi',
            bilinmiyor: 'Bilinmiyor',
            back: 'Canlarımıza Dön',
            donate: 'Destek Ol',
            noPhotos: 'Fotoğraf bulunmuyor.',
            whatsappMessage: '{name} hakkında bilgi almak istiyorum.',
          },
          lightbox: {
            close: 'Kapat',
            prev: 'Önceki',
            next: 'Sonraki',
            imageOf: '{current} / {total}',
          },
        },
      },
    },
    {
      label: 'emergency',
      data: {
        emergency: {
          meta: {
            title: 'Acil Vakalar — Paws of Hope',
            description: 'Acil yardıma ihtiyaç duyan hayvanlar. Tedavi masraflarına destek olun.',
          },
          title: 'Acil Vakalar',
          activeCases: 'Aktif Vakalar',
          collected: 'Toplanan',
          target: 'Hedef',
          progress: 'İlerleme',
          noActive: 'Şu anda aktif acil vaka bulunmuyor.',
          completedCases: 'Tamamlanan Vakalar',
          donateButton: 'Destek Ol',
          detail: {
            description: 'Açıklama',
            updates: 'Güncellemeler',
            beforeAfter: 'Önce / Sonra',
            before: 'Önce',
            after: 'Sonra',
            relatedAnimal: 'İlgili Hayvan',
            noUpdates: 'Henüz güncelleme bulunmuyor.',
          },
        },
      },
    },
    {
      label: 'donate (part 1)',
      data: {
        donate: {
          meta: {
            title: 'Destek Ol — Paws of Hope',
            description: 'Sokak hayvanlarına destek olmak için bağış yapın. IBAN ile bağış kabul ediyoruz.',
          },
          title: 'Destek Ol',
          subtitle: 'Her katkınız bir cana umut olur.',
          hero: {
            title: 'BİR CAN KURTAR',
            badge: 'HAYAT KURTAR',
            subtitle: 'Her katkınız bir cana umut olur. Bağışlarınız doğrudan tedavi, mama ve barınma masraflarına harcanır.',
          },
          iban: {
            title: 'IBAN İLE BAĞIŞ',
            bank: 'Banka',
            accountHolder: 'Hesap Sahibi',
            iban: 'IBAN',
            copy: "IBAN'ı Kopyala",
            placeholder: 'Banka hesap bilgileri yakında eklenecek.',
          },
          international: {
            title: 'Uluslararası Destek',
            comingSoon: 'YAKINDA',
            placeholder: 'Yurtdışı ödeme seçenekleri hazırlanıyor.',
          },
          volunteer: {
            title: 'GÖNÜLLÜ OL',
            description: 'Zamanınızı verin, saha ekibimize katılın. Besleme, tedavi ve kurtarma operasyonlarında destek olun.',
            cta: 'BAŞVURU FORMU →',
          },
        },
      },
    },
    {
      label: 'donate (part 2)',
      data: {
        donate: {
          ticker: {
            slogan1: 'YAŞAM HAKKINA SAYGI',
            slogan2: 'DESTEK OL HAYAT KURTAR',
            slogan3: 'HER CAN DEĞERLİ',
            cats: 'KEDİ',
            dogs: 'KÖPEK',
            treated: 'TEDAVİ EDİLEN',
          },
          cards: {
            title: 'Bağışınız Neye Yarar?',
            foodTitle: 'Mama Desteği',
            foodDescription: '1 aylık mama masrafını karşılar.',
            vetTitle: 'Veteriner Ziyareti',
            vetDescription: 'Rutin muayene ve aşı masrafını karşılar.',
            surgeryTitle: 'Cerrahi Destek',
            surgeryDescription: 'Küçük bir operasyon masrafını karşılar.',
          },
          faq: {
            title: 'Sık Sorulan Sorular',
            q1: 'Bağışım nereye gidiyor?',
            a1: 'Tüm bağışlar doğrudan hayvan bakım, tedavi ve mama masraflarına harcanmaktadır. Şeffaflık raporlarımızda detaylı harcama bilgisini görebilirsiniz.',
            q2: 'Bağış makbuzu alabilir miyim?',
            a2: 'Vergi makbuzu için lütfen e-posta veya WhatsApp üzerinden bizimle iletişime geçin.',
            q3: 'Düzenli bağış yapabilir miyim?',
            a3: 'Evet! Aylık sabit bağış yapmak için banka otomatik ödeme talimatı verebilirsiniz.',
            q4: 'Yurt dışından bağış kabul ediyor musunuz?',
            a4: 'Evet, uluslararası bağış seçenekleri yakında aktif olacak. Lütfen bizimle iletişime geçin.',
            q5: 'Bağış yerine malzeme gönderebilir miyim?',
            a5: 'Evet! İhtiyaç listesi için bize ulaşın. Mama, kedi kumu, ilaç ve battaniye gibi malzemeler kabul ediyoruz.',
          },
          transparency: {
            title: 'Şeffaf Yönetim',
            description: 'Tüm gelir ve giderleri düzenli olarak yayınlıyoruz. Bağışlarınızın nereye gittiğini her zaman görebilirsiniz.',
            reports: 'Şeffaflık Raporları',
          },
        },
      },
    },
    {
      label: 'supplies',
      data: {
        supplies: {
          meta: {
            title: 'Mama & Malzeme — Paws of Hope',
            description: 'İhtiyaç listemizi inceleyin. Mama, ilaç, kedi kumu ve diğer malzemelere desteğinizi bekliyoruz.',
          },
          title: 'Mama & Malzeme İhtiyaçları',
          subtitle: 'Hayvanlarımızın güncel ihtiyaç listesini burada bulabilirsiniz.',
          table: {
            product: 'Ürün',
            brand: 'Marka / Detay',
            urgency: 'Aciliyet',
            stock: 'Stok Durumu',
          },
          urgency: {
            acil: 'Acil',
            orta: 'Orta',
            yeterli: 'Yeterli',
          },
          shipping: {
            title: 'Nasıl Gönderebilirsiniz?',
            description: 'Aşağıdaki yöntemlerle malzeme desteğinde bulunabilirsiniz.',
            cargo: 'Kargo ile gönderim yapabilirsiniz.',
            inPerson: 'Elden teslim için bizimle iletişime geçin.',
            online: 'Online sipariş vererek adresimize gönderebilirsiniz.',
          },
          sponsor: {
            title: 'Mama Sponsoru Ol',
            description: 'Aylık düzenli mama desteği sağlayarak hayvanlarımızın beslenmesine katkıda bulunun.',
            cta: 'Destek Ol',
          },
          empty: 'Şu anda ihtiyaç listesi bulunmuyor.',
        },
      },
    },
    {
      label: 'transparency',
      data: {
        transparency: {
          meta: {
            title: 'Şeffaflık Raporları — Paws of Hope',
            description: 'Gelir ve gider raporlarımızı inceleyin. Bağışlarınızın nereye gittiğini şeffaf olarak paylaşıyoruz.',
          },
          title: 'Şeffaflık Raporları',
          subtitle: 'Tüm gelir ve giderleri düzenli olarak yayınlıyoruz.',
          report: {
            expenses: 'Giderler',
            totalExpense: 'Toplam Gider',
            donations: 'Bağışlar',
            totalDonation: 'Toplam Bağış',
            category: 'Kategori',
            amount: 'Miktar',
            comparison: 'Bağış / Gider Oranı',
            documents: 'Belgeler',
          },
          empty: 'Henüz şeffaflık raporu yayınlanmadı.',
          currency: '₺',
        },
      },
    },
    {
      label: 'blog',
      data: {
        blog: {
          meta: {
            title: 'Günlük — Paws of Hope',
            description: 'Kurtarma hikayeleri, tedavi süreçleri, duyurular ve etkinliklerimizi takip edin.',
          },
          title: 'Günlük',
          subtitle: 'Hikayelerimizi, duyurularımızı ve güncel gelişmeleri takip edin.',
          filter: {
            all: 'Tümü',
            kurtarma: 'Kurtarma',
            tedavi: 'Tedavi',
            gunluk: 'Günlük',
            duyuru: 'Duyuru',
            etkinlik: 'Etkinlik',
          },
          readMore: 'Devamını Oku',
          share: {
            title: 'Paylaş',
            twitter: "Twitter'da Paylaş",
            facebook: "Facebook'ta Paylaş",
            whatsapp: "WhatsApp'ta Paylaş",
            copy: 'Bağlantıyı Kopyala',
            copied: 'Kopyalandı!',
          },
          tags: 'Etiketler',
          empty: 'Henüz yazı bulunmuyor.',
          back: 'Günlüğe Dön',
        },
      },
    },
    {
      label: 'volunteer',
      data: {
        volunteer: {
          meta: {
            title: 'Gönüllü Ol — Paws of Hope',
            description: 'Sokak hayvanları için gönüllü olun. Geçici bakım, sağlık desteği, besleme ve daha fazlası.',
          },
          title: 'Gönüllü Ol',
          subtitle: 'Sokak hayvanlarına yardım etmek için aramıza katılın.',
          areas: {
            title: 'Gönüllülük Alanları',
            fosterTitle: 'Geçici Bakım',
            fosterDescription: 'Tedavi sürecindeki hayvanlara evinizde geçici bakım sağlayın.',
            healthTitle: 'Sağlık Desteği',
            healthDescription: 'Veteriner ziyaretlerinde ve tedavi süreçlerinde yardımcı olun.',
            feedingTitle: 'Besleme',
            feedingDescription: 'Günlük besleme turlarına katılın ve besleme noktalarını yönetin.',
            shelterTitle: 'Barınak Yapımı',
            shelterDescription: 'Sokak hayvanları için barınak ve kulübe yapımına katkıda bulunun.',
          },
          stats: {
            title: 'Gönüllü Ailemiz',
            volunteers: 'Aktif Gönüllü',
            animalsHelped: 'Yardım Edilen Hayvan',
            feedingPoints: 'Besleme Noktası',
          },
        },
      },
    },
    {
      label: 'volunteer (faq, cta)',
      data: {
        volunteer: {
          faq: {
            title: 'Sık Sorulan Sorular',
            q1: 'Gönüllü olmak için ne yapmalıyım?',
            a1: 'WhatsApp üzerinden bizimle iletişime geçmeniz yeterli. Size uygun alanları birlikte belirleyelim.',
            q2: 'Gönüllülük için deneyim gerekli mi?',
            a2: 'Hayır, herhangi bir deneyim gerekmez. Hayvanseverliğiniz yeterli! Gerekli eğitimi biz sağlıyoruz.',
            q3: 'Ne kadar zaman ayırmalıyım?',
            a3: 'Tamamen size bağlı. Haftada birkaç saat bile büyük fark yaratır.',
            q4: 'Geçici bakım için evimde ne gerekli?',
            a4: 'Temel ihtiyaçları (mama, kum, ilaç) biz karşılıyoruz. Sizden sadece sevgi ve ilgi bekliyoruz.',
          },
          cta: {
            title: 'Aramıza Katılın!',
            description: 'Gönüllü olmak için WhatsApp üzerinden bizimle iletişime geçin.',
            whatsappMessage: 'Merhaba, gönüllü olmak istiyorum.',
          },
        },
      },
    },
    {
      label: 'vision (part 1)',
      data: {
        vision: {
          meta: {
            title: 'Gelecek Vizyonu — Paws of Hope',
            description: 'Sokak hayvanları için geleceğe dair hedeflerimizi ve vizyonumuzu keşfedin.',
          },
          title: 'Gelecek Vizyonu',
          subtitle: 'Her adımda daha güzel bir gelecek inşa ediyoruz.',
          association: {
            title: 'Dernek Kurma Hedefimiz',
            description: 'Resmi bir dernek kurarak çalışmalarımızı yasal bir çatı altında sürdürmeyi, bağış toplama kapasitemizi artırmayı ve daha fazla hayvana ulaşmayı hedefliyoruz.',
          },
          shortTerm: {
            title: 'Kısa Vadeli Hedefler (1 Yıl)',
            shelterTitle: 'Tam Donanımlı Barınak',
            shelterDescription: 'Tedavi sürecindeki hayvanlar için güvenli ve donanımlı bir barınak kurmak.',
            spayTitle: '200+ Kısırlaştırma',
            spayDescription: 'Popülasyon kontrolü için yılda en az 200 hayvanı kısırlaştırmak.',
            volunteersTitle: '50 Aktif Gönüllü',
            volunteersDescription: 'Gönüllü ağımızı genişleterek 50 aktif gönüllüye ulaşmak.',
            clinicTitle: 'Veteriner Kliniği Ortaklığı',
            clinicDescription: 'İndirimli tedavi için veteriner klinikleriyle kalıcı ortaklıklar kurmak.',
          },
        },
      },
    },
    {
      label: 'vision (part 2)',
      data: {
        vision: {
          longTerm: {
            title: 'Uzun Vadeli Hedefler (3-5 Yıl)',
            ngoTitle: 'Resmi Dernek Statüsü',
            ngoDescription: 'Yasal bir dernek kurarak şeffaf ve sürdürülebilir bir yapı oluşturmak.',
            vetClinicTitle: 'Toplum Destekli Klinik',
            vetClinicDescription: 'Bağışçılarımızın desteğiyle sokak hayvanlarına özel bir veteriner kliniği açmak.',
            fosterTitle: 'Şehir Genelinde Geçici Bakım Ağı',
            fosterDescription: 'Her mahallede geçici bakım gönüllüleri ile kapsamlı bir ağ oluşturmak.',
            awarenessTitle: 'Ulusal Farkındalık Kampanyası',
            awarenessDescription: 'Sokak hayvanları hakları için ulusal çapta farkındalık kampanyaları düzenlemek.',
          },
          network: {
            title: 'Büyüyen Gönüllü Ağımız',
            description: 'Her gün büyüyen gönüllü ailemizle daha fazla hayvana ulaşıyoruz. Siz de bu değişimin parçası olun.',
          },
          cta: {
            title: 'Bu Vizyonu Birlikte Gerçekleştirelim',
            description: 'Geleceği birlikte inşa etmek için bağış yapın veya gönüllü olun.',
            donate: 'Destek Ol',
            volunteer: 'Gönüllü Ol',
          },
        },
      },
    },
    {
      label: 'contact + notFound',
      data: {
        contact: {
          meta: {
            title: 'İletişim — Paws of Hope',
            description: 'Bizimle iletişime geçin. WhatsApp, telefon, e-posta veya Instagram üzerinden ulaşabilirsiniz.',
          },
          title: 'İletişim',
          subtitle: 'Bizimle iletişime geçmekten çekinmeyin.',
          whatsapp: {
            label: 'WhatsApp',
            description: 'Bize WhatsApp üzerinden yazın.',
            message: 'Merhaba, Paws of Hope hakkında bilgi almak istiyorum.',
          },
          phone: {
            label: 'Telefon',
            description: 'Bizi arayabilirsiniz.',
          },
          email: {
            label: 'E-posta',
            description: 'E-posta gönderin.',
          },
          instagram: {
            label: 'Instagram',
            description: "Bizi Instagram'da takip edin.",
          },
        },
        notFound: {
          title: 'Sayfa Bulunamadı',
          message: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
          goHome: 'Ana Sayfaya Git',
          viewAnimals: 'Canlarımız',
          donate: 'Destek Ol',
        },
      },
    },
    {
      label: 'home + ourWork',
      data: {
        home: {
          meta: {
            title: 'Paws of Hope — Sokak Hayvanlarına Umut',
            description: 'Sokak hayvanlarının bakım, tedavi ve sıcak bir yuva bulmasına yardımcı oluyoruz.',
          },
          instagram: {
            title: "Instagram'da Biz",
            followUs: 'Takip Et',
          },
          volunteerCta: {
            title: 'Gönüllü Ol',
            description: 'Sokak hayvanları için bir fark yaratmak ister misiniz? Besleme, tedavi, geçici bakım veya farkındalık çalışmalarımıza katılın.',
            cta: 'Gönüllü Ol →',
          },
        },
        ourWork: {
          meta: {
            title: 'Çalışmalarımız — Paws of Hope',
            description: 'Besleme, tedavi, kısırlaştırma, acil müdahale, aşılama ve barınma çalışmalarımızı keşfedin.',
          },
          title: 'Çalışmalarımız',
          subtitle: 'Sokak hayvanları için yaptığımız çalışmaları keşfedin.',
        },
      },
    },
  ]

  function deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    for (const [key, value] of Object.entries(source)) {
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value) &&
        typeof target[key] === 'object' &&
        target[key] !== null &&
        !Array.isArray(target[key])
      ) {
        target[key] = deepMerge(target[key] as Record<string, unknown>, value as Record<string, unknown>)
      } else {
        target[key] = value
      }
    }
    return target
  }

  let mergedTR: Record<string, unknown> = {}
  for (const batch of uiStringsBatches) {
    mergedTR = deepMerge(mergedTR, batch.data)
  }

  function wrapWithLocale(
    obj: Record<string, unknown>,
    locale: string,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = { [locale]: value }
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = wrapWithLocale(value as Record<string, unknown>, locale)
      } else {
        result[key] = value
      }
    }
    return result
  }

  const localizedData = wrapWithLocale(mergedTR, 'tr')

  const enBlogData = wrapWithLocale(
    {
      blog: {
        title: 'Blog',
        subtitle: 'Stories from Paws of Hope',
        readMore: 'Read More',
        empty: 'No posts yet.',
        tags: 'Tags',
        filter: {
          all: 'All',
          kurtarma: 'Rescue',
          tedavi: 'Treatment',
          gunluk: 'Daily',
          duyuru: 'Announcement',
          etkinlik: 'Event',
        },
        share: {
          title: 'Share',
          twitter: 'Twitter',
          facebook: 'Facebook',
          whatsapp: 'WhatsApp',
          copy: 'Copy Link',
          copied: 'Copied!',
        },
        meta: {
          title: 'Blog — Paws of Hope',
          description: 'Paws of Hope blog posts and news.',
        },
      },
    },
    'en',
  )
  deepMerge(localizedData, enBlogData)

  await payload.db.updateGlobal({
    slug: 'ui-strings',
    data: localizedData,
    req: { payload, transactionID: undefined },
    returning: false,
  })
  console.log('  UIStrings seeded (TR + EN blog) via direct DB call.')

  console.log('\n========================================')
  console.log('Seed complete!')
  console.log('========================================')
  console.log(`  Media: ${Object.keys(mediaIds).length}/${Object.keys(imageUrls).length}`)
  console.log(`  Animals: ${animalsData.length}`)
  console.log(`  Emergency Cases: ${emergencyCasesData.length}`)
  console.log(`  Vet Records: ${vetRecordsData.length}`)
  console.log(`  Posts: ${postsData.length}`)
  console.log(`  Categories: ${categoryData.length}`)
  console.log(`  Events: ${eventsData.length}`)
  console.log(`  Volunteers: ${volunteersData.length}`)
  console.log(`  Needs List: ${needsData.length}`)
  console.log(`  Transparency Reports: ${reportsData.length}`)
  console.log(`  Globals: Header, SiteSettings (bank accounts + statistics), UIStrings (TR + EN blog)`)

  try {
    const res = await fetch('http://localhost:3000/api/revalidate', { method: 'POST' })
    if (res.ok) {
      console.log('\nNext.js cache revalidated successfully.')
    } else {
      console.log('\nWarning: Cache revalidation returned', res.status)
    }
  } catch {
    console.log('\nDev server not running — skipping cache revalidation.')
  }

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
