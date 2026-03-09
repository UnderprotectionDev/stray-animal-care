# 05 — Roadmap & Risks

---

## 5.1 Riskler

| Risk                                                   | Etki   | Olasilik | Azaltma Stratejisi                                         |
| ------------------------------------------------------ | ------ | -------- | ---------------------------------------------------------- |
| Instagram API token suresi dolmasi                     | Orta   | Yuksek   | Otomatik token yenileme mekanizmasi + fallback gorseller   |
| Instagram Basic Display API deprecation                | Yuksek | Orta     | Instagram Graph API'ye gecis plani hazir tutulacak         |
| CMS icerik yonetim zorlugu (teknik bilgi gerektirmesi) | Orta   | Orta     | Basit ve anlasilir admin panel tasarimi, kullanim kilavuzu |
| Yuksek gorsel yukleme trafikinden performans dususu    | Orta   | Dusuk    | Image optimization, CDN, lazy loading, boyut sinirlamasi   |
| Dil ceviri tutarsizligi (TR/EN)                        | Dusuk  | Yuksek   | next-intl + PayloadCMS i18n ile zorunlu alan kontrolu      |
| Vercel ucretsiz plan limitlerinin asilmasi             | Orta   | Orta     | Kullanim takibi, gerekirse Pro plan'a gecis                |
| PostgreSQL harici servis kesintisi                     | Yuksek | Dusuk    | Neon serverless — otomatik scaling + yedekleme             |
| WhatsApp mesaj spam'i                                  | Dusuk  | Dusuk    | Rate limiting uyarisi, CAPTCHA ekleme (gerekirse)          |
| SEO indeksleme gecikmesi                               | Dusuk  | Orta     | Sitemap submit, Google Search Console aktif kullanimi      |
| Bagis donusum oraninin dusuk kalmasi                   | Yuksek | Orta     | A/B test ile CTA optimizasyonu, kullanici geri bildirimi   |

---

## 5.2 Teknik Borc & Gelecek Iyilestirmeler

| Ozellik                                                    | Oncelik | Zaman Dilimi |
| ---------------------------------------------------------- | ------- | ------------ |
| Online odeme entegrasyonu (iyzico/Stripe)                  | Yuksek  | Phase 2      |
| E-posta bildirim sistemi (yeni bagisci, acil vaka)         | Orta    | Phase 2      |
| PWA (Progressive Web App)                                  | Dusuk   | Phase 3      |
| Admin dashboard (analitik, ozet istatistikler)             | Orta    | Phase 2      |
| Otomatik sosyal medya paylasimi (blog → Instagram/Twitter) | Dusuk   | Phase 3      |
| Hayvan sahiplendirme modulu                                | Dusuk   | Phase 3+     |
| Dernek kurulumu sonrasi yasal uyumlu donusum               | Yuksek  | Phase 3      |

---

## 5.3 Roadmap

### Phase 1: Lansman (MVP) — Hedef: 6-8 Hafta

**Hafta 1-2: Temel Altyapi**

- [ ] Next.js + PayloadCMS 3.x projesi kurulumu (Bun)
- [ ] PostgreSQL baglantisi (Neon)
- [ ] Tailwind CSS + shadcn/ui yapilandirmasi
- [ ] Biome yapilandirmasi (lint + format)
- [ ] PayloadCMS collection ve global tanimlari
- [ ] next-intl yapilandirmasi (TR/EN)
- [ ] Moduler dizin yapisi olusturma

**Hafta 3-4: Layout & Cekirdek Sayfalar**

- [ ] Header (navigasyon, dil degistirici, arama, "Bagis Yap" CTA)
- [ ] Footer (IBAN, sosyal medya, hizli linkler)
- [ ] Ana Sayfa (hero, istatistikler, bolumler)
- [ ] Hikayem sayfasi
- [ ] Destek Ol sayfasi (IBAN kopyalama, bagis kartlari)
- [ ] Iletisim sayfasi
- [ ] Custom 404 & error sayfalari

**Hafta 5-6: Icerik Sayfalari**

- [ ] Canlarimiz (hayvan kartlari, filtre, detay, breadcrumb)
- [ ] Acil Vakalar (vaka kartlari, ilerleme cubugu, guncelleme gecmisi)
- [ ] Calismalarimiz
- [ ] Mama & Malzeme Yardimi
- [ ] Seffaflik Kosesi
- [ ] Gunluk / Blog (listesi + detay, tags filtre)
- [ ] Site geneli arama (SearchBar, SearchResults, SearchModal)

**Hafta 7-8: Son Sayfalar & Polish**

- [ ] Gonullu Ol
- [ ] Gelecek Vizyonu
- [ ] Instagram API entegrasyonu
- [ ] Destekci yorumlari (moderasyonlu)
- [ ] Custom cursor (pati izi)
- [ ] Animasyonlar (Motion + GSAP)
- [ ] SEO (Next.js Metadata API, sitemap, JSON-LD, Open Graph)
- [ ] Breadcrumb navigasyonu (hayvan, vaka, blog detay sayfalari)
- [ ] Skeleton/loading UI tum dinamik sayfalarda
- [ ] Responsive test (mobil, tablet, desktop)
- [ ] Accessibility test (WCAG 2.1 AA)
- [ ] Placeholder gorseller ekleme
- [ ] Performans optimizasyonu
- [ ] Vercel deploy

### Phase 2: Buyume — Lansmandan 1-3 Ay Sonra

- [ ] Online odeme entegrasyonu (iyzico/Stripe)
- [ ] E-posta bildirim sistemi
- [ ] Admin dashboard gelistirmeleri
- [ ] A/B test ile CTA optimizasyonu
- [ ] Gercek gorsellerin CMS'e yuklenmesi
- [ ] Kullanici geri bildirimine gore UI iyilestirmeleri

### Phase 3: Olgunlasma — 3-6 Ay Sonra

- [ ] PWA eklenmesi
- [ ] Otomatik sosyal medya entegrasyonu
- [ ] Gelismis analitik ve raporlama
- [ ] Dernek kurulumu sonrasi yasal uyumluluk
- [ ] Topluluk ozellikleri (forum, etkinlik takvimi)

---

## 5.4 Sayfa Detaylari Referansi

### Sayfa 1 — Ana Sayfa

**Bolumleri:** Hero (buyuk gorsel, baslik, 2 CTA), Tanitim metni, Istatistik sayaclari, Guncel calismalar ozeti, Acil vakalar (CMS'ten), Son kurtarma hikayesi (once/sonra), Destek yonlendirme kartlari, Instagram akisi (canli API), Fotograf galerisi/slider, Tanitim videosu, Destekci yorumlari (CMS'ten moderasyonlu)

### Sayfa 2 — Hikayem

**Bolumleri:** Kisisel tanitim, Deprem hikayesi, Gunluk rutin timeline, Neden bu siteyi actim, Tanitim videosu alani, Hedeflerim

### Sayfa 3 — Calismalarimiz

**Bolumleri:** Gunluk besleme (~100 kedi/kopek) + galeri, Tedavi/rehabilitasyon, Kisirlastarma, Acil mudahale, Asilama, Kulube/barinak yapma (her bolumde fotograf galerisi)

### Sayfa 4 — Canlarimiz

**Bolumleri:** Kedi/kopek filtre, Hayvan kartlari grid (CMS'ten), Her kart: fotograf, isim, tur, yas, cinsiyet, durum badge, Detay: fotograf galerisi, profil, hikaye, ihtiyaclar, Breadcrumb navigasyonu

### Sayfa 5 — Destek Ol

**Bolumleri:** Destek & seffaflik metni, IBAN + kopyala, Yurtdisi secenekler (PayPal/Wise), Veteriner klinik bilgisi, Bagis miktari kartlari (50TL=1 haftalik mama, 100TL=1 asi, 300TL=1 kisirlastarma), Duzenli bagis programi, Seffaflik notu + link, SSS accordion

### Sayfa 6 — Mama & Malzeme Yardimi

**Bolumleri:** Giris metni, Ihtiyac listesi tablosu (CMS'ten), Gonderim yontemleri, Kabul edilmeyen listesi, En cok ihtiyac vurgusu, Mama sponsor programi

### Sayfa 7 — Acil Vakalar

**Bolumleri:** Aktif vakalar (CMS'ten), Vaka kartlari (fotograf, durum, hedef, toplanan, ilerleme cubugu), Guncelleme gecmisi (kronoloji), Tamamlanan arsiv (once/sonra), WhatsApp'a acil vaka bildirimi, Breadcrumb navigasyonu

### Sayfa 8 — Seffaflik Kosesi

**Bolumleri:** Aylik harcama raporu (CMS'ten), Veteriner makbuzlari/faturalar, Mama fisleri, Bagis vs harcama karsilastirmasi, Aylik rapor arsivi, Bagisci listesi (izinle), Fotografli faaliyet paylasimlari

### Sayfa 9 — Gunluk (Blog)

**Bolumleri:** Blog listesi, Kategori + tarih + tag filtresi, Blog kartlari (kapak, baslik, tarih, kategori, ozet), Blog detay (kapak, tarih, kategori, tags, rich text, sosyal paylasim), Breadcrumb navigasyonu

### Sayfa 10 — Gonullu Ol

**Bolumleri:** Gonulluluk alanlari kartlari (foster, saglik, besleme), Kosullar, SSS accordion, Gonullu istatistigi, WhatsApp'a basvuru yonlendirme

### Sayfa 11 — Gelecek Vizyonu

**Bolumleri:** Dernek kurma hedefi, Kisa vadeli hedefler (1 yil), Uzun vadeli hedefler (3-5 yil), Gonullu agi buyutme, Destek cagrisi

### Sayfa 12 — Iletisim

**Bolumleri:** WhatsApp (wa.me linki), Telefon, E-posta, Sosyal medya linkleri
