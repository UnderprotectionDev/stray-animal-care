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

async function seed() {
  const payload = await getPayload({ config: await config })

  // ═══════════════════════════════════════════════════════════
  // 1. SiteSettings — homepage blocks, social links, bank accounts, stats
  // ═══════════════════════════════════════════════════════════
  console.log('Seeding SiteSettings...')
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
          sectionTitle: 'ANA SAYFA',
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
  console.log('SiteSettings seeded.')

  // ═══════════════════════════════════════════════════════════
  // 2. Header navigation
  // ═══════════════════════════════════════════════════════════
  console.log('Seeding Header...')
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
    },
  })
  console.log('Header seeded.')

  // ═══════════════════════════════════════════════════════════
  // 3. UIStrings — uses payload.db.updateGlobal() directly to bypass
  //    the locale-aware SELECT in getLatestGlobalVersion, which exceeds
  //    PostgreSQL's FUNC_MAX_ARGS (100) with 274+ localized fields.
  // ═══════════════════════════════════════════════════════════
  console.log('Seeding UIStrings (TR)...')

  // All UIStrings data — all leaf text fields are localized
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
        openMenu: 'Menüyü aç',
        closeMenu: 'Menüyü kapat',
      },
      languageSwitcher: { label: 'Dil seçimi' },
      mobileMenu: { title: 'Menü' },
      footer: {
        copyright: 'Tüm hakları saklıdır.',
        bankInfo: 'Banka Bilgileri',
        contactUs: 'İletişim',
        quickLinks: 'Hızlı Bağlantılar',
        international: 'Uluslararası Destek',
        copyIban: "IBAN'ı Kopyala",
        followUs: 'Bizi Takip Edin',
        description: 'Sokak hayvanlarına umut oluyoruz.',
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
        description: 'Aylık düzenli mama desteği sağlayarak hayvanlarımızın beslenmesine katkıda bulunun.',
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
    blog: {
      meta: {
        title: 'Günlük — Paws of Hope',
        description: 'Kurtarma hikayeleri, tedavi süreçleri, duyurular ve etkinliklerimizi takip edin.',
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
        description: 'Sokak hayvanlarının bakım, tedavi ve sıcak bir yuva bulmasına yardımcı oluyoruz.',
      },
      instagram: { title: "Instagram'da Biz", followUs: 'Takip Et' },
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
  }

  // Wrap all leaf string values with locale key for the DB adapter layer.
  // The high-level payload.updateGlobal() wraps locale data internally via
  // beforeChange hooks, but we bypass it to avoid the problematic SELECT.
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

  // Use payload.db.updateGlobal() directly — bypasses getLatestGlobalVersion
  // which runs a locale-aware SELECT exceeding PostgreSQL's 100-arg limit.
  // The DB adapter's updateGlobal only does a simple findFirst on the main table
  // (which has no localized columns), then upsertRow handles the _locales table.
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
