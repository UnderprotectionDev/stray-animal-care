/**
 * Seed script: populates UIStrings global and SiteSettings homepage blocks
 * with default Turkish content.
 *
 * Usage: pnpm tsx src/scripts/seed-cms-content.ts
 *
 * NOTE: UIStrings fields already have defaultValues in the config,
 * so they auto-populate when first saved in admin. This script is
 * a convenience for setting up homepage blocks with the default order.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config: await config })

  console.log('Seeding homepage blocks...')

  // Set up default homepage blocks in order
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'tr',
    context: { disableRevalidate: true },
    data: {
      homepageBlocks: [
        {
          blockType: 'homeHero',
          enabled: true,
          urgentBadge: 'ACİL DURUM SÜRÜYOR',
          headline: 'BİR İNSAN.\nBİNLERCE\nCAN.',
          description: 'İstanbul\'un sokaklarında sistemli kurtarma operasyonu. Her can bir nefes, her nefes kaydedilen bir umut. Sadece beslemiyor, rehabilite ediyor ve kalıcı yuvalar buluyoruz.',
          quoteText: 'Birini kurtarmak dünyayı değiştirmez. Ama o birinin dünyasını değiştirir.',
          quoteAuthor: 'AYŞE',
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
          founderCaption: 'AYŞE KAYA, 2019',
          founderName: 'Ayşe',
          originTitle: 'BAŞLANGIÇ',
          originQuote: 'Birini kurtarmak dünyayı değiştirmez. Ama o birinin dünyasını değiştirir.',
          originParagraph1: 'Her şey 2019\'da soğuk bir kış gecesi, kapımın önünde titreyen yaralı bir kediyle başladı. Onu veterinere götürdüm, tedavi ettirdim ve o gece fark ettim — bu sadece bir kedi değildi, bir sorumluluktu.',
          originParagraph2: 'O günden bu yana yüzlerce can kurtardık. Her birinin hikayesi farklı ama hepsinin ortak noktası aynı: onlara sahip çıkacak birinin olması yeterli.',
          missionText: 'Misyonumuz net: Acil tıbbi müdahale gerektiren vakalara anında ulaşmak, sokaklardaki popülasyonu etik yöntemlerle kontrol altına almak ve kalıcı yuva bulana kadar onlara güvenli bir sığınak olmak.',
        },
        {
          blockType: 'homeOurWork',
          enabled: true,
          sectionTitle: 'Çalışmalarımız',
          viewAllLabel: 'Tümünü Gör',
          viewAllLink: '/calismalarimiz',
          photoCountTemplate: '{count} fotoğraf',
          activities: [
            { key: 'feeding', title: 'Besleme', description: 'Her gün 40+ noktada düzenli besleme yapıyoruz.' },
            { key: 'treatment', title: 'Tedavi', description: 'Hasta ve yaralı hayvanların tedavilerini karşılıyoruz.' },
            { key: 'spaying', title: 'Kısırlaştırma', description: 'Popülasyon kontrolü için kampanyalar düzenliyoruz.' },
            { key: 'emergency', title: 'Acil Müdahale', description: 'Acil durumlarda 7/24 müdahale ediyoruz.' },
            { key: 'vaccination', title: 'Aşılama', description: 'Düzenli aşılama programı uyguluyoruz.' },
            { key: 'shelter', title: 'Barınma', description: 'Tedavi sürecinde geçici barınma sağlıyoruz.' },
          ],
        },
        {
          blockType: 'homeFeaturedAnimals',
          enabled: true,
          sectionTitle: 'Canlarımız',
          viewAllLabel: 'Tümünü Gör',
          viewAllLink: '/canlarimiz',
          limit: 6,
          typeLabels: { kedi: 'Kedi', kopek: 'Köpek' },
          statusLabels: { tedavide: 'Tedavide', kaliciBakim: 'Kalıcı Bakım', acil: 'Acil' },
        },
        {
          blockType: 'homeSuccessStories',
          enabled: true,
          sectionTitle: 'Başarı Hikayeleri',
          viewAllLabel: 'Tümünü Gör',
          viewAllLink: '/acil-vakalar',
          limit: 4,
          labels: {
            before: 'Önce',
            after: 'Sonra',
            completed: 'TAMAMLANDI',
            collected: 'Toplanan',
            target: 'Hedef',
            funded: 'fonlandı',
          },
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
            codeRed: 'KOD KIZIL: VAKA',
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
          limit: 3,
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

  console.log('Homepage blocks seeded successfully.')

  // Seed header navigation
  console.log('Seeding header navigation...')
  await payload.updateGlobal({
    slug: 'header',
    locale: 'tr',
    context: { disableRevalidate: true },
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
  })
  console.log('Header navigation seeded.')

  // Touch UIStrings to trigger defaultValue population
  console.log('Initializing UIStrings with defaults...')
  try {
    await payload.updateGlobal({
      slug: 'ui-strings',
      locale: 'tr',
      context: { disableRevalidate: true },
      data: {},
    })
    console.log('UIStrings initialized.')
  } catch (err) {
    console.log('UIStrings already initialized or error:', err)
  }

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
