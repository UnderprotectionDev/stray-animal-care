/**
 * Seed script: populates SiteSettings, Header, and UIStrings globals
 * with default Turkish content.
 *
 * Usage: pnpm tsx src/scripts/seed-cms-content.ts
 *
 * UIStrings seeding uses payload.db.updateGlobal() directly to bypass
 * the locale-aware SELECT in getLatestGlobalVersion, which exceeds
 * PostgreSQL's FUNC_MAX_ARGS (100) limit for 274+ localized fields.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'
import { bold, italic, lexicalRoot, paragraph, quote, ul } from './lexical-builders'

async function seed() {
  const payload = await getPayload({ config: await config })

  console.log('Seeding SiteSettings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'tr',
    context: { disableRevalidate: true },
    data: {
      socialLinks: [
        { type: 'instagram', url: 'https://instagram.com/pawsofhope' },
        { type: 'whatsapp', url: '+905551234567' },
        { type: 'phone', url: '+905551234567' },
        { type: 'email', url: 'info@pawsofhope.org' },
      ],
      bankAccounts: [
        {
          bankName: 'Ziraat Bankası',
          accountHolder: 'Paws of Hope',
          iban: 'TR00 0000 0000 0000 0000 0000 00',
          currency: 'TRY',
        },
      ],
      catsCount: 60,
      dogsCount: 40,
      treatedCount: 30,
      spayedCount: 15,
      vaccinatedCount: 55,
      feedingPointsCount: 3,
      homepageBlocks: [
        {
          blockType: 'homeHero',
          enabled: true,
          sectionTitle: 'HER CAN DEĞERLİ',
          tagline: 'Her gün yaklaşık 100 kedi ve köpeğin beslenmesine, tedavisine ve bakımına katkı sağlıyoruz.',
          rotatingWords: [
            { word: 'Besliyoruz' },
            { word: 'Tedavi Ediyoruz' },
            { word: 'Koruyoruz' },
            { word: 'Umut Oluyoruz' },
          ],
        },
        {
          blockType: 'homeStats',
          enabled: true,
          metrics: [
            { label: 'METRİK 01 // BESLEME', value: '~100', name: 'GÜNLÜK BESLENEN' },
            { label: 'METRİK 02 // TEDAVİ', value: '30', name: 'TEDAVİ EDİLEN' },
            { label: 'METRİK 03 // KISIRLAŞTIRMA', value: '15', name: 'KISIRLAŞTIRILAN' },
            { label: 'METRİK 04 // NOKTA', value: '03', name: 'BESLEME NOKTASI' },
          ],
        },
        {
          blockType: 'homeStory',
          enabled: true,
          sectionTitle: 'HİKAYEMİZ & MİSYON',
          steps: [
            {
              title: 'ÇOCUKLUK',
              description: lexicalRoot(
                paragraph(
                  'Türkiye\'nin en güney illerinden biri olan ',
                  bold('Hatay\'da'),
                  ' doğdum. Ailenin ve şehrin kozmopolit yapısı sayesinde farklı kültürlerle iç içe büyürken ',
                  bold('doğaya ve hayvanlara'),
                  ' karşı güçlü bir sevgi ve duyarlılık geliştirdim.',
                ),
              ),
            },
            {
              title: 'DEPREM',
              description: lexicalRoot(
                paragraph(
                  '2023 yılında yaşanan büyük deprem hayatımda ',
                  bold('derin izler'),
                  ' bıraktı. Yakın ailemden, akrabalarımdan ve arkadaşlarımdan kayıplar yaşadım. Doğduğum ve uzun yıllar yaşadığım şehir büyük ölçüde yıkıma uğradı.',
                ),
              ),
            },
            {
              title: 'YENİDEN BAŞLANGIÇ',
              description: lexicalRoot(
                paragraph(
                  'Bu zor süreçte yaşadığım psikolojik travmaları aşabilmek ve hayata yeniden tutunabilmek için ',
                  bold('sokak hayvanlarına'),
                  ' daha fazla yardım etmeyi kendime bir amaç edindim. Küçüklüğümden beri sevdiğim ve destek olduğum bu canlılara yöneldim.',
                ),
              ),
            },
            {
              title: 'BUGÜN',
              description: lexicalRoot(
                paragraph(
                  'Bireysel bir gönüllü olarak her gün yaklaşık ',
                  bold('100 kedi ve köpeğin'),
                  ' beslenmesine katkı sağlıyorum. Kısırlaştırma çalışmalarına destek veriyor, sağlık sorunları yaşayan hayvanların veteriner desteğine ulaşmasına yardımcı oluyorum.',
                ),
                ul(
                  [bold('Günlük besleme'), ' — ~100 kedi ve köpek'],
                  [bold('Kısırlaştırma'), ' — kontrollü çoğalma için destek'],
                  [bold('Veteriner'), ' — tedavi ve sağlık desteği'],
                ),
                quote(
                  italic('"Sizlerin desteğiyle bu çalışmaları daha sürdürülebilir hale getirmeyi hedefliyoruz."'),
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
          activities: [
            { key: 'feeding', title: 'Besleme', description: 'Her gün 3 noktada düzenli besleme yapıyoruz.' },
            { key: 'treatment', title: 'Tedavi', description: 'Hasta ve yaralı hayvanların tedavilerini karşılıyoruz.' },
            { key: 'spaying', title: 'Kısırlaştırma', description: 'Kontrollü çoğalma için kısırlaştırma desteği sağlıyoruz.' },
            { key: 'emergency', title: 'Acil Müdahale', description: 'Acil durumlarda müdahale ediyoruz.' },
            { key: 'vaccination', title: 'Aşılama', description: 'Hayvanların aşılama ihtiyaçlarını karşılıyoruz.' },
            { key: 'shelter', title: 'Barınma', description: 'Tedavi sürecinde geçici barınma desteği sağlıyoruz.' },
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
          volunteerDescription: 'Zamanınızı verin, besleme çalışmalarına katılın.',
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
  console.log('SiteSettings seeded.')

  console.log('Seeding Header...')
  await payload.updateGlobal({
    slug: 'header',
    locale: 'tr',
    context: { disableRevalidate: true },
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
  })
  console.log('Header seeded.')

  console.log('Seeding UIStrings (TR)...')

  const uiStringsData: Record<string, unknown> = {
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
      siteDescription: 'Deprem sonrası sokak hayvanlarının beslenmesine, tedavisine ve bakımına destek sağlıyoruz.',
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
      languageSwitcher: { label: 'Dil seçimi' },
      mobileMenu: { title: 'Menü' },
      footer: {
        copyright: 'Tüm hakları saklıdır.',
        contactUs: 'İletişim',
        explore: 'Keşfet',
        support: 'Destek',
        followUs: 'Bizi Takip Edin',
        description: 'Deprem sonrası sokak hayvanlarına umut oluyoruz.',
        missionTitle: 'Hayata Değer Kat',
        missionText: 'Sokakta yaşam mücadelesi veren hayvanların temel ihtiyaçlarına ulaşmalarını sağlamak için çalışıyoruz.',
        donateButton: 'Destek Ol',
        volunteerButton: 'Gönüllü Ol',
        emergencyLine: 'Acil Hat',
        madeWithLove: 'Sokak hayvanları için sevgiyle yapıldı',
      },
      breadcrumb: { home: 'Ana Sayfa' },
      mobileDonate: { cta: 'Destek Ol' },
    },
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
    animals: {
      meta: {
        title: 'Canlarımız — Paws of Hope',
        description: 'Bakımımız altındaki sokak hayvanlarını tanıyın. Tedavi, bakım ve desteğe ihtiyaç duyan kediler ve köpekler.',
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
        subtitle: 'Sokak hayvanlarının mama, tedavi ve bakım ihtiyaçları bireysel çabalarla karşılanmaya çalışılmaktadır. Sizin desteğinizle daha fazla hayvana ulaşabiliriz.',
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
        placeholder: 'Yurtdışı ödeme seçenekleri (PayPal, Wise) hazırlanıyor.',
      },
      volunteer: {
        title: 'GÖNÜLLÜ OL',
        description: 'Zamanınızı verin, besleme çalışmalarına katılın. Hatay ve Malatya\'da saha desteği sağlayın.',
        cta: 'BAŞVURU FORMU →',
      },
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
        foodDescription: '1 haftalık mama masrafını karşılar.',
        vetTitle: 'Veteriner Ziyareti',
        vetDescription: 'Rutin muayene ve aşı masrafını karşılar.',
        surgeryTitle: 'Cerrahi Destek',
        surgeryDescription: 'Kısırlaştırma veya acil müdahale masrafını karşılar.',
      },
      faq: {
        title: 'Sık Sorulan Sorular',
        q1: 'Bağışım nereye gidiyor?',
        a1: 'Tüm bağışlar doğrudan hayvan bakım, tedavi ve mama masraflarına harcanmaktadır. Şeffaflık raporlarımızda detaylı harcama bilgisini görebilirsiniz.',
        q2: 'Bu bir dernek mi?',
        a2: 'Şu anda bireysel gönüllü olarak çalışıyoruz. İlerleyen süreçte bir dernek çatısı altında daha profesyonel bir şekilde çalışmayı hedefliyoruz.',
        q3: 'Düzenli bağış yapabilir miyim?',
        a3: 'Evet! Aylık sabit bağış yapmak için banka otomatik ödeme talimatı verebilirsiniz.',
        q4: 'Yurt dışından bağış kabul ediyor musunuz?',
        a4: 'Evet, uluslararası bağış seçenekleri (PayPal, Wise) yakında aktif olacak. Lütfen bizimle iletişime geçin.',
        q5: 'Bağış yerine malzeme gönderebilir miyim?',
        a5: 'Evet! İhtiyaç listesini inceleyerek mama, kedi kumu, ilaç ve battaniye gibi malzemeler gönderebilirsiniz.',
      },
      transparency: {
        title: 'Şeffaf Yönetim',
        description: 'Yapılan tüm destekleri şeffaf bir şekilde paylaşıyoruz. Katkılarınızın gerçekten ihtiyaç sahibi hayvanlara ulaştığını gösterebilmek en önemli hedeflerimizden biri.',
        reports: 'Şeffaflık Raporları',
      },
    },
    supplies: {
      meta: {
        title: 'Mama & Malzeme — Paws of Hope',
        description: 'İhtiyaç listemizi inceleyin. Mama, ilaç, kedi kumu ve diğer malzemelere desteğinizi bekliyoruz.',
      },
      title: 'Mama & Malzeme İhtiyaçları',
      subtitle: 'Hayvanlarımızın güncel ihtiyaç listesini burada bulabilirsiniz.',
      table: { product: 'Ürün', brand: 'Marka / Detay', urgency: 'Aciliyet', stock: 'Stok Durumu' },
      urgency: { acil: 'Acil', orta: 'Orta', yeterli: 'Yeterli' },
      shipping: {
        title: 'Nasıl Gönderebilirsiniz?',
        description: 'Aşağıdaki yöntemlerle malzeme desteğinde bulunabilirsiniz.',
        cargo: 'Kargo ile gönderim yapabilirsiniz.',
        inPerson: 'Elden teslim için bizimle iletişime geçin.',
        online: 'Online sipariş vererek adresimize gönderebilirsiniz.',
      },
      sponsor: {
        title: 'Mama Sponsoru Ol',
        description: 'Düzenli mama desteği sağlayarak hayvanlarımızın beslenmesine katkıda bulunun.',
        cta: 'Destek Ol',
      },
      empty: 'Şu anda ihtiyaç listesi bulunmuyor.',
    },
    transparency: {
      meta: {
        title: 'Şeffaflık Raporları — Paws of Hope',
        description: 'Gelir ve gider raporlarımızı inceleyin. Bağışlarınızın nereye gittiğini şeffaf olarak paylaşıyoruz.',
      },
      title: 'Şeffaflık Raporları',
      subtitle: 'Yapılan tüm destekleri ve harcamaları açık ve düzenli şekilde paylaşıyoruz.',
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
    blog: {
      meta: {
        title: 'Günlük — Paws of Hope',
        description: 'Kurtarma hikayeleri, tedavi süreçleri, duyurular ve günlük çalışmalarımızı takip edin.',
      },
      title: 'Günlük',
      subtitle: 'Hikayelerimizi, duyurularımızı ve güncel gelişmeleri takip edin.',
      filter: { all: 'Tümü', kurtarma: 'Kurtarma', tedavi: 'Tedavi', gunluk: 'Günlük', duyuru: 'Duyuru', etkinlik: 'Etkinlik' },
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
    volunteer: {
      meta: {
        title: 'Gönüllü Ol — Paws of Hope',
        description: 'Sokak hayvanları için gönüllü olun. Besleme, tedavi desteği ve daha fazlası.',
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
      faq: {
        title: 'Sık Sorulan Sorular',
        q1: 'Gönüllü olmak için ne yapmalıyım?',
        a1: 'WhatsApp üzerinden bizimle iletişime geçmeniz yeterli. Size uygun alanları birlikte belirleyelim.',
        q2: 'Gönüllülük için deneyim gerekli mi?',
        a2: 'Hayır, herhangi bir deneyim gerekmez. Hayvanseverliğiniz yeterli!',
        q3: 'Ne kadar zaman ayırmalıyım?',
        a3: 'Tamamen size bağlı. Haftada birkaç saat bile büyük fark yaratır.',
        q4: 'Hangi şehirlerde gönüllü olabilirim?',
        a4: 'Şu anda Hatay ve Malatya\'da aktif çalışıyoruz. Bu şehirlerdeyseniz sahada destek olabilirsiniz.',
      },
      cta: {
        title: 'Aramıza Katılın!',
        description: 'Gönüllü olmak için WhatsApp üzerinden bizimle iletişime geçin.',
        whatsappMessage: 'Merhaba, gönüllü olmak istiyorum.',
      },
    },
    vision: {
      meta: {
        title: 'Gelecek Vizyonu — Paws of Hope',
        description: 'Sokak hayvanları için sürdürülebilir bir destek ağı oluşturma hedefimizi keşfedin.',
      },
      title: 'Gelecek Vizyonu',
      subtitle: 'Daha fazla hayvana ulaşmak için birlikte çalışıyoruz.',
      association: {
        title: 'Dernek Kurma Hedefimiz',
        description: 'Gönüllülerin bir araya gelerek daha güçlü bir yapı oluşturmasını ve ilerleyen süreçte bir dernek çatısı altında daha profesyonel, şeffaf ve etkili çalışmalar yürütmeyi hedefliyoruz.',
      },
      shortTerm: {
        title: 'Kısa Vadeli Hedefler',
        shelterTitle: 'Daha Fazla Hayvana Ulaşmak',
        shelterDescription: 'Besleme noktası sayısını artırarak daha fazla sokak hayvanına düzenli beslenme sağlamak.',
        spayTitle: 'Kısırlaştırma Desteği',
        spayDescription: 'Kontrollü çoğalmayı sağlamak için kısırlaştırma çalışmalarını sürdürmek.',
        volunteersTitle: 'Gönüllü Ağını Genişletmek',
        volunteersDescription: 'Bireysel çabaları topluluk dayanışmasına dönüştürmek.',
        clinicTitle: 'Veteriner İşbirliği',
        clinicDescription: 'Düzenli veteriner desteği için kalıcı işbirlikleri kurmak.',
      },
      longTerm: {
        title: 'Uzun Vadeli Hedefler',
        ngoTitle: 'Resmi Dernek Statüsü',
        ngoDescription: 'Yasal bir dernek kurarak çalışmaları kurumsal bir yapı altında sürdürmek.',
        vetClinicTitle: 'Şeffaf ve Etkili Yapı',
        vetClinicDescription: 'Tüm desteklerin nasıl kullanıldığını gösterecek profesyonel bir şeffaflık sistemi kurmak.',
        fosterTitle: 'Sürdürülebilir Destek Ağı',
        fosterDescription: 'Türkiye genelinde sokak hayvanlarının yaşam koşullarını iyileştirmeye yönelik sürdürülebilir bir destek ağı oluşturmak.',
        awarenessTitle: 'Farkındalık Kampanyaları',
        awarenessDescription: 'Toplumda hayvan refahı konusunda farkındalık oluşturmak.',
      },
      network: {
        title: 'Değerlerimiz',
        description: 'Şeffaflık, Merhamet ve Saygı, Sürdürülebilirlik, Topluluk Dayanışması — bu dört değer çalışmalarımızın temelini oluşturuyor.',
      },
      cta: {
        title: 'Bu Vizyonu Birlikte Gerçekleştirelim',
        description: 'Geleceği birlikte inşa etmek için bağış yapın veya gönüllü olun.',
        donate: 'Destek Ol',
        volunteer: 'Gönüllü Ol',
      },
    },
    contact: {
      meta: {
        title: 'İletişim — Paws of Hope',
        description: 'Bizimle iletişime geçin. WhatsApp, telefon, e-posta veya Instagram üzerinden ulaşabilirsiniz.',
      },
      title: 'İletişim',
      subtitle: 'Bizimle iletişime geçmekten çekinmeyin.',
      whatsapp: { label: 'WhatsApp', description: 'Bize WhatsApp üzerinden yazın.', message: 'Merhaba, Paws of Hope hakkında bilgi almak istiyorum.' },
      phone: { label: 'Telefon', description: 'Bizi arayabilirsiniz.' },
      email: { label: 'E-posta', description: 'E-posta gönderin.' },
      instagram: { label: 'Instagram', description: "Bizi Instagram'da takip edin." },
    },
    notFound: {
      title: 'Sayfa Bulunamadı',
      message: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
      goHome: 'Ana Sayfaya Git',
      viewAnimals: 'Canlarımız',
      donate: 'Destek Ol',
    },
    home: {
      meta: {
        title: 'Paws of Hope — Sokak Hayvanlarına Umut',
        description: 'Deprem sonrası sokak hayvanlarının beslenmesine, tedavisine ve bakımına destek sağlıyoruz.',
      },
      instagram: { title: "Instagram'da Biz", followUs: 'Takip Et' },
      volunteerCta: {
        title: 'Gönüllü Ol',
        description: 'Sokak hayvanları için bir fark yaratmak ister misiniz? Besleme çalışmalarımıza katılın, tedavi süreçlerinde destek olun.',
        cta: 'Gönüllü Ol →',
      },
    },
    ourWork: {
      meta: {
        title: 'Çalışmalarımız — Paws of Hope',
        description: 'Günlük besleme, tedavi, kısırlaştırma ve acil müdahale çalışmalarımızı keşfedin.',
      },
      title: 'Çalışmalarımız',
      subtitle: 'Sokak hayvanları için yaptığımız çalışmaları keşfedin.',
    },
  }

  function wrapWithLocale(obj: Record<string, unknown>, locale: string): Record<string, unknown> {
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

  const localizedData = wrapWithLocale(uiStringsData, 'tr')

  await payload.db.updateGlobal({
    slug: 'ui-strings',
    data: localizedData,
    req: { payload, transactionID: undefined },
    returning: false,
  })
  console.log('UIStrings seeded.')

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
