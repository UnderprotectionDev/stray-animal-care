/**
 * Full seed script: populates all collections and globals with realistic Turkish data.
 *
 * Usage: pnpm tsx src/scripts/seed-data.ts
 *
 * WARNING: This will DELETE all existing data before seeding.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

// Simple Lexical richtext helper — creates a paragraph node
function richText(text: string) {
  return {
    root: {
      type: 'root',
      children: text.split('\n\n').map((paragraph) => ({
        type: 'paragraph',
        children: [{ type: 'text', text: paragraph, format: 0, detail: 0, mode: 'normal', style: '', version: 1 }],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      })),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

async function seed() {
  const payload = await getPayload({ config: await config })

  // ──────────────────────────────────────────────
  // 1. Clean existing data
  // ──────────────────────────────────────────────
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
  ] as const

  for (const slug of collectionsToClean) {
    const existing = await payload.find({ collection: slug, limit: 100, depth: 0 })
    for (const doc of existing.docs) {
      await payload.delete({ collection: slug, id: doc.id, context: { disableRevalidate: true } })
    }
    console.log(`  Cleaned ${slug} (${existing.docs.length} docs)`)
  }

  // ──────────────────────────────────────────────
  // 2. Categories
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // 3. Animals
  // ──────────────────────────────────────────────
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
      story: richText('Pamuk, Kadıköy sokaklarında bulundu. İlk geldiğinde çok korkak ve zayıftı. Haftalarca süren bakım ve sevgiyle şimdi en şımarık kedimiz oldu.\n\nHer sabah kapıda karşılar, misafirlere sürtünür. Kucakta uyumayı çok sever.'),
      needs: richText('Pamuk şu an kalıcı bakımda ve sağlığı yerinde. Düzenli veteriner kontrolleri devam ediyor.'),
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
      story: richText('Karamel, trafik kazası sonrası kurtarıldı. Sol arka bacağında kırık vardı. Ameliyat sonrası başarıyla iyileşti.\n\nŞimdi en enerjik köpeğimiz. Topla oynamayı ve uzun yürüyüşleri çok seviyor.'),
      needs: richText('Karamel\'in düzenli fizik tedavi seansları devam ediyor. Aylık kontrollerini aksatmıyoruz.'),
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
      story: richText('Minnoş, bir inşaat alanında annesiz bulundu. Sadece 3 haftalıktı. Biberonla büyüttük.\n\nŞimdi 6 aylık ve tedavisi devam ediyor. Göz enfeksiyonu için damla kullanıyoruz.'),
      needs: richText('Göz enfeksiyonu tedavisi devam ediyor. Kısırlaştırma operasyonu planlanıyor.'),
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
      story: richText('Boncuk, bir parkta iple bağlı halde terk edilmiş bulundu. Boyun bölgesinde ip izleri vardı.\n\nTedavi sürecinden sonra en sadık dostumuza dönüştü. İnsanlara güvenmeyi yeniden öğrendi.'),
      needs: richText('Boncuk sağlıklı durumda. Kalıcı yuva arayışı sürüyor.'),
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
      story: richText('Tekir, çatıdan düşme sonucu ağır yaralı olarak getirildi. Pelvis kırığı ve iç kanama tespit edildi.\n\nAcil ameliyata alındı. Yoğun bakım sürecinde. Durumu ciddi ama stabil.'),
      needs: richText('ACİL: Ameliyat sonrası yoğun bakım devam ediyor. Kan tahlilleri ve röntgen kontrolleri gerekiyor. Maddi destek ihtiyacı var.'),
    },
    {
      name: 'Zeytin',
      type: 'kopek' as const,
      age: '7 yaş',
      gender: 'erkek' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: false,
      location: 'Beyoğlu, İstanbul',
      weight: 22,
      microchipId: 'MC-2024-006',
      isSpayed: true,
      isVaccinated: true,
      story: richText('Zeytin, 7 yıldır sokakta yaşayan bir mahallenin sevgilisi. Yaşlılık nedeniyle eklem sorunları başlayınca yanımıza aldık.\n\nSakin, uyumlu ve çok efendi bir köpek. Diğer hayvanlara abilelik yapıyor.'),
      needs: richText('Eklem iltihabı için düzenli ilaç kullanıyor. Aylık veteriner kontrolü gerekiyor.'),
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
      story: richText('Fıstık, manav tezgahının altında doğmuş 4 kardeşten biri. Annesi araba çarpması sonucu kaybedildi.\n\nKardeşleriyle birlikte biberonla büyüttük. En oyuncu ve en cesur olan o.'),
      needs: richText('Kısırlaştırma operasyonu planlanıyor. Aşı takvimi devam ediyor.'),
    },
    {
      name: 'Çomar',
      type: 'kopek' as const,
      age: '5 yaş',
      gender: 'erkek' as const,
      animalStatus: 'tedavide' as const,
      featured: false,
      location: 'Sarıyer, İstanbul',
      weight: 30,
      microchipId: 'MC-2024-008',
      isSpayed: false,
      isVaccinated: true,
      story: richText('Çomar, orman kenarında zehirlenmiş halde bulundu. Acil müdahaleyle hayata döndürüldü.\n\nŞu an karaciğer değerleri takip ediliyor. Güçlü bir köpek, iyileşme süreci olumlu ilerliyor.'),
      needs: richText('Zehirlenme sonrası karaciğer tedavisi devam ediyor. Özel diyet uygulanıyor.'),
    },
    {
      name: 'Tarçın',
      type: 'kedi' as const,
      age: '4 yaş',
      gender: 'erkek' as const,
      animalStatus: 'kalici-bakim' as const,
      featured: false,
      location: 'Maltepe, İstanbul',
      weight: 5.1,
      microchipId: 'MC-2024-009',
      isSpayed: true,
      isVaccinated: true,
      story: richText('Tarçın, apartman bodrumunda sıkışmış halde bulundu. 3 gün boyunca kurtarılmayı beklemiş.\n\nŞimdi en rahat kedimiz. Güneşli pencerelerde uzanmayı ve kuş izlemeyi seviyor.'),
      needs: richText('Sağlık durumu iyi. Kalıcı yuva bekliyor.'),
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
      story: richText('Maviş, bir çöp konteynerinin içinde ağlayarak bulundu. Ciddi solunum yolu enfeksiyonu var.\n\nAcil veteriner müdahalesi yapıldı. Antibiyotik tedavisi başlandı. Durumu takip ediliyor.'),
      needs: richText('ACİL: Solunum yolu enfeksiyonu tedavisi devam ediyor. İlaç ve veteriner masrafları için destek gerekiyor.'),
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
      },
      context: { disableRevalidate: true },
    })
    animalIds.push(created.id as number)
    console.log(`  Created animal: ${animal.name}`)
  }

  // ──────────────────────────────────────────────
  // 4. Emergency Cases
  // ──────────────────────────────────────────────
  console.log('\nSeeding emergency cases...')

  const emergencyCasesData = [
    {
      title: 'Tekir — Pelvis Kırığı Ameliyatı',
      animal: animalIds[4], // Tekir
      caseStatus: 'aktif' as const,
      targetAmount: 15000,
      collectedAmount: 8750,
      description: richText('Tekir, 5. kattan düşme sonucu pelvis kırığı ve iç kanama ile getirildi. Acil ameliyat yapıldı.\n\nAmeliyat başarılı geçti ancak yoğun bakım süreci devam ediyor. İlaç ve bakım masrafları yüksek seyrediyor.'),
      updates: [
        { date: '2026-03-10', },
        { date: '2026-03-12', },
      ],
    },
    {
      title: 'Maviş — Solunum Yolu Enfeksiyonu',
      animal: animalIds[9], // Maviş
      caseStatus: 'aktif' as const,
      targetAmount: 5000,
      collectedAmount: 2100,
      description: richText('Maviş, ciddi solunum yolu enfeksiyonu ile bulundu. Antibiyotik tedavisi ve nebülizatör uygulaması devam ediyor.\n\nGünlük veteriner kontrolü gerekiyor. İyileşme süreci 2-3 hafta sürebilir.'),
    },
    {
      title: 'Çomar — Zehirlenme Tedavisi',
      animal: animalIds[7], // Çomar
      caseStatus: 'aktif' as const,
      targetAmount: 8000,
      collectedAmount: 6500,
      description: richText('Çomar, orman kenarında zehirlenmiş halde bulundu. Acil mide yıkama ve serum tedavisi uygulandı.\n\nKaraciğer değerleri yüksek. Özel diyet ve ilaç tedavisi devam ediyor.'),
    },
    {
      title: 'Paşa — Kırık Bacak Operasyonu',
      caseStatus: 'tamamlandi' as const,
      targetAmount: 12000,
      collectedAmount: 12000,
      description: richText('Paşa, trafik kazası sonrası sağ ön bacağında açık kırık tespit edildi. Platin takıldı.\n\n6 haftalık tedavi sürecinin ardından tamamen iyileşti. Şimdi yeni yuvasında mutlu bir şekilde yaşıyor.'),
    },
    {
      title: 'Duman — Göz Ameliyatı',
      caseStatus: 'tamamlandi' as const,
      targetAmount: 7000,
      collectedAmount: 7000,
      description: richText('Duman, her iki gözünde de ileri derece enfeksiyon ile getirildi. Sol göz kurtarılamadı ancak sağ göz ameliyatla tedavi edildi.\n\nTek gözüyle gayet iyi görüyor ve mutlu bir şekilde yaşamını sürdürüyor.'),
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
      },
      context: { disableRevalidate: true },
    })
    emergencyIds.push(created.id as number)
    console.log(`  Created emergency case: ${ec.title}`)
  }

  // ──────────────────────────────────────────────
  // 5. Vet Records
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // 6. Posts (Blog)
  // ──────────────────────────────────────────────
  console.log('\nSeeding posts...')

  // Get the first user as author
  const users = await payload.find({ collection: 'users', limit: 1 })
  const authorId = users.docs[0]?.id

  const postsData = [
    {
      title: 'Karamel\'in Mucize Hikayesi: Trafik Kazasından Yeni Hayata',
      excerpt: 'Trafik kazası sonrası hayata tutunan Karamel\'in ilham veren kurtarma hikayesi.',
      postCategory: 'kurtarma' as const,
      categories: [categories['kurtarma-hikayeleri']],
      content: richText('Karamel\'i ilk gördüğümüzde, yol kenarında hareketsiz yatıyordu. Sol arka bacağı kırıktı ve gözlerinde korku vardı. Hemen veterinere yetiştirdik.\n\nAmeliyat 3 saat sürdü. Bacağına platin takıldı. İlk hafta yoğun bakımda kaldı. Her gün yanında olduk, onu yalnız bırakmadık.\n\nİkinci haftada ayağa kalkmaya başladı. Üçüncü haftada ilk adımlarını attı. Bir ay sonra koşuyordu.\n\nŞimdi Karamel, en enerjik köpeğimiz. Her sabah bizi karşılıyor, parkta saatlerce oynuyor. Onun hikayesi, umudun asla bitmediğinin kanıtı.'),
      tags: [{ tag: 'kurtarma' }, { tag: 'köpek' }, { tag: 'başarı' }],
    },
    {
      title: 'Kış Aylarında Sokak Hayvanları İçin Yapabileceğiniz 5 Şey',
      excerpt: 'Soğuk kış günlerinde sokak hayvanlarına nasıl yardım edebileceğinizi anlattık.',
      postCategory: 'gunluk' as const,
      categories: [categories['gonullu-yazilari']],
      content: richText('Kış ayları sokak hayvanları için en zorlu dönemdir. İşte onlara yardım etmek için yapabileceğiniz 5 basit ama etkili şey:\n\n1. Su kapları koyun — Soğukta su kaynakları donar. Kapılarınızın önüne taze su bırakın.\n\n2. Barınak yapın — Strafor kutulardan basit ama etkili barınaklar yapabilirsiniz.\n\n3. Düzenli besleyin — Soğukta kaloriye ihtiyaçları artar. Kuru mama bırakın.\n\n4. Arabanızın altını kontrol edin — Kediler sıcaklık için motor bölgesine girer.\n\n5. Yaralı hayvan görürseniz bize ulaşın — 7/24 acil hattımız aktif.'),
      tags: [{ tag: 'kış' }, { tag: 'rehber' }, { tag: 'yardım' }],
    },
    {
      title: 'Mart Ayı Kısırlaştırma Kampanyası Başlıyor!',
      excerpt: 'Bu ay 50 sokak hayvanını ücretsiz kısırlaştırma hedefimiz var. Gönüllü desteğinizi bekliyoruz.',
      postCategory: 'duyuru' as const,
      categories: [categories['duyurular']],
      content: richText('Mart ayı boyunca Kadıköy ve Üsküdar bölgelerinde ücretsiz kısırlaştırma kampanyası düzenliyoruz.\n\nHedefimiz bu ay içinde en az 50 sokak hayvanını kısırlaştırmak. Kampanya kapsamında:\n\n- Yakalama ve nakliye ücretsiz\n- Ameliyat ve ilaç masrafları karşılanıyor\n- Ameliyat sonrası 48 saat bakım sağlanıyor\n\nGönüllü ihtiyacımız var! Özellikle nakliye ve yakalama konusunda yardıma ihtiyacımız var. Başvurmak için gönüllü formunu doldurun.'),
      tags: [{ tag: 'kampanya' }, { tag: 'kısırlaştırma' }, { tag: 'duyuru' }],
    },
    {
      title: 'Gönüllümüz Elif\'in Gözünden: İlk Kurtarma Deneyimim',
      excerpt: 'Gönüllü ekibimize katılan Elif, ilk kurtarma operasyonunu anlatıyor.',
      postCategory: 'gunluk' as const,
      categories: [categories['gonullu-yazilari']],
      content: richText('Merhaba, ben Elif. 3 aydır Umut Patileri\'nde gönüllüyüm. İlk kurtarma operasyonumu sizlerle paylaşmak istiyorum.\n\nBir akşam vakti, bir inşaat alanından yavru kedi sesleri geldiği ihbarı aldık. Ekiple birlikte gittik. 4 yavru kedi, annesiz, soğukta titriyordu.\n\nOnları sıcak battaniyelere sardık, biberonla besledik ve kliniğe götürdük. O gece uyumadım — her 2 saatte bir mama verdim.\n\nŞimdi 4\'ü de sağlıklı ve yuva arıyor. Bu deneyim hayatımı değiştirdi. Bir cana dokunmanın verdiği mutluluk tarif edilemez.'),
      tags: [{ tag: 'gönüllü' }, { tag: 'deneyim' }, { tag: 'hikaye' }],
    },
    {
      title: 'Pamuk\'un Sahiplendirme Günü: Yeni Yuvasına Kavuştu!',
      excerpt: 'Uzun süredir bakımımızda olan Pamuk, sonunda kalıcı yuvasını buldu.',
      postCategory: 'kurtarma' as const,
      categories: [categories['sahiplendirme'], categories['kurtarma-hikayeleri']],
      content: richText('Bugün çok özel bir gün. 8 aydır bakımımızda olan Pamuk, sonunda kalıcı yuvasını buldu!\n\nPamuk\'u sokaklardan kurtardığımızda çok korkak ve zayıftı. Haftalarca süren tedavi ve sevgiyle kendine geldi.\n\nYeni ailesi Ayşe ve Murat, ilk görüşte aşık oldu. Pamuk da onları hemen kabullendi — kucaklarına tırmanıp mırlamaya başladı.\n\nUğurlarken gözyaşlarımızı tutamadık ama biliyoruz ki en güzel yere gidiyor. Pamuk, yeni evinde çoktan kendine favori pencereyi seçmiş!'),
      tags: [{ tag: 'sahiplendirme' }, { tag: 'kedi' }, { tag: 'mutlu son' }],
    },
    {
      title: 'Nisan Ayı Mama Toplama Etkinliği — Detaylar ve Katılım Bilgisi',
      excerpt: 'Nisan ayı mama toplama etkinliğimizin detayları ve katılım bilgileri.',
      postCategory: 'etkinlik' as const,
      categories: [categories['duyurular']],
      content: richText('Nisan ayının ilk hafta sonu büyük mama toplama etkinliğimizi düzenliyoruz!\n\nTarih: 5-6 Nisan 2026\nSaat: 10:00 - 18:00\nYer: Kadıköy Sahil Parkı\n\nKabul edilen ürünler:\n- Kedi maması (kuru ve yaş)\n- Köpek maması (kuru ve yaş)\n- Kedi kumu\n- Veteriner ilaçları\n- Battaniye ve havlu\n\nGönüllü olarak katılmak isteyenler bize ulaşabilir. Her türlü katkı değerli!'),
      tags: [{ tag: 'etkinlik' }, { tag: 'mama toplama' }, { tag: 'katılım' }],
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
      },
      context: { disableRevalidate: true },
    })
    console.log(`  Created post: ${post.title}`)
  }

  // ──────────────────────────────────────────────
  // 7. Events
  // ──────────────────────────────────────────────
  console.log('\nSeeding events...')

  const eventsData = [
    {
      title: 'Bahar Sahiplendirme Günü',
      eventDate: '2026-04-12T10:00:00.000Z',
      endDate: '2026-04-12T17:00:00.000Z',
      eventType: 'sahiplendirme' as const,
      eventStatus: 'yaklasan' as const,
      location: 'Kadıköy Sahil Parkı, İstanbul',
      description: richText('Bahar geldi, yeni yuvalar arıyoruz! Kadıköy Sahil Parkı\'nda büyük sahiplendirme günümüze davetlisiniz.\n\n20\'den fazla kedi ve köpek yeni ailelerini bekliyor. Tüm hayvanlarımız kısırlaştırılmış, aşılı ve mikroçipli.\n\nEtkinlikte veteriner danışmanlık, çocuklar için hayvan sevgisi atölyesi ve mama bağış noktası da olacak.'),
    },
    {
      title: 'Nisan Mama Toplama Kampanyası',
      eventDate: '2026-04-05T10:00:00.000Z',
      endDate: '2026-04-06T18:00:00.000Z',
      eventType: 'mama-toplama' as const,
      eventStatus: 'yaklasan' as const,
      location: 'Kadıköy Sahil Parkı',
      description: richText('İki gün sürecek mama toplama kampanyamıza katılın. Kedi ve köpek maması, kum, ilaç ve bakım malzemeleri kabul ediyoruz.\n\nGeçen ay 500 kg mama toplamayı başardık. Bu ay hedefimiz 750 kg!'),
    },
    {
      title: 'Kısırlaştırma Kampanyası — Mart 2026',
      eventDate: '2026-03-15T09:00:00.000Z',
      endDate: '2026-03-31T18:00:00.000Z',
      eventType: 'bakim-gunu' as const,
      eventStatus: 'devam-ediyor' as const,
      location: 'Kadıköy & Üsküdar Bölgesi',
      description: richText('Mart ayı boyunca ücretsiz kısırlaştırma kampanyamız devam ediyor. Şu ana kadar 32 hayvan kısırlaştırıldı.\n\nBölgenizde kısırlaştırılması gereken sokak hayvanı varsa bize bildirin.'),
    },
    {
      title: 'Gönüllü Eğitim Semineri',
      eventDate: '2026-03-20T14:00:00.000Z',
      endDate: '2026-03-20T17:00:00.000Z',
      eventType: 'egitim' as const,
      eventStatus: 'yaklasan' as const,
      location: 'Online (Zoom)',
      description: richText('Yeni gönüllülerimiz için temel eğitim semineri düzenliyoruz.\n\nKonular:\n- Sokak hayvanlarına ilk yaklaşım\n- Yaralı hayvan taşıma teknikleri\n- Acil durum prosedürleri\n- Hijyen ve güvenlik kuralları'),
    },
    {
      title: 'Kış Besleme Maratonu',
      eventDate: '2026-02-01T08:00:00.000Z',
      endDate: '2026-02-28T20:00:00.000Z',
      eventType: 'diger' as const,
      eventStatus: 'tamamlandi' as const,
      location: 'İstanbul Geneli — 40 Nokta',
      description: richText('Şubat ayı boyunca süren kış besleme maratonumuz başarıyla tamamlandı!\n\n40 farklı noktada günlük besleme yapıldı. Toplam 2.400 kg mama dağıtıldı. 150 gönüllü katıldı.\n\nTüm destekçilerimize teşekkür ederiz!'),
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
      },
      context: { disableRevalidate: true },
    })
    console.log(`  Created event: ${event.title}`)
  }

  // ──────────────────────────────────────────────
  // 8. Volunteers
  // ──────────────────────────────────────────────
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
      data: vol,
      context: { disableRevalidate: true },
    })
    console.log(`  Created volunteer: ${vol.name}`)
  }

  // ──────────────────────────────────────────────
  // 9. Needs List
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // 10. Transparency Reports
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // 11. Globals (from existing seed-cms-content.ts)
  // ──────────────────────────────────────────────
  console.log('\nSeeding globals...')

  // Homepage blocks
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
      homepageBlocks: [
        {
          blockType: 'homeHero',
          enabled: true,
          sectionTitle: 'ANA SAYFA',
          // Content is managed via richText editor in admin
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
          // Content is managed via richText editor in admin
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
  console.log('  Homepage blocks seeded.')

  // Header
  await payload.updateGlobal({
    slug: 'header',
    locale: 'tr',
    context: { disableRevalidate: true },
    data: {
      brandName: 'UMUT PATİLERİ',
      navItems: [
        { link: { type: 'custom', url: '/' }, label: 'Ana Sayfa', isCta: false },
        { link: { type: 'custom', url: '/canlarimiz' }, label: 'Canlarımız', isCta: false },
        { link: { type: 'custom', url: '/acil-vakalar' }, label: 'Acil Vakalar', isCta: false },
        { link: { type: 'custom', url: '/gonullu-ol' }, label: 'Gönüllü Ol', isCta: false },
        { link: { type: 'custom', url: '/gunluk' }, label: 'Günlük', isCta: false },
        { link: { type: 'custom', url: '/destek-ol' }, label: 'Destek Ol', isCta: true },
      ],
    },
  })
  console.log('  Header seeded.')

  // Footer
  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      navItems: [
        { link: { type: 'custom', url: '/canlarimiz', label: 'Canlarımız' } },
        { link: { type: 'custom', url: '/acil-vakalar', label: 'Acil Vakalar' } },
        { link: { type: 'custom', url: '/seffaflik', label: 'Şeffaflık' } },
        { link: { type: 'custom', url: '/mama-malzeme', label: 'İhtiyaç Listesi' } },
        { link: { type: 'custom', url: '/gonullu-ol', label: 'Gönüllü Ol' } },
        { link: { type: 'custom', url: '/destek-ol', label: 'Destek Ol' } },
      ],
    },
  })
  console.log('  Footer seeded.')

  // UIStrings — skipped (235+ fields exceed PostgreSQL's 100-argument limit;
  // defaultValues auto-populate on first admin save)

  // ──────────────────────────────────────────────
  // Done!
  // ──────────────────────────────────────────────
  console.log('\n========================================')
  console.log('Seed complete!')
  console.log('========================================')
  console.log(`  Animals: ${animalsData.length}`)
  console.log(`  Emergency Cases: ${emergencyCasesData.length}`)
  console.log(`  Vet Records: ${vetRecordsData.length}`)
  console.log(`  Posts: ${postsData.length}`)
  console.log(`  Categories: ${categoryData.length}`)
  console.log(`  Events: ${eventsData.length}`)
  console.log(`  Volunteers: ${volunteersData.length}`)
  console.log(`  Needs List: ${needsData.length}`)
  console.log(`  Transparency Reports: ${reportsData.length}`)
  console.log(`  Globals: Header, Footer, SiteSettings, UIStrings`)

  // Revalidate Next.js cache (if dev server is running)
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
