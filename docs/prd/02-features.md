# 02 — Features & User Experience

---

## 2.1 Personalar

### Persona 1: Yurticinden Bagisci — "Ayse" (28, Istanbul)

- **Profil:** Sosyal medya aktif, hayvan sever, duzenli geliri var
- **Motivasyon:** Deprem bolgesindeki hayvanlara yardim etmek istiyor
- **Davranis:** Instagram'dan siteye gelir, hikayeyi okur, IBAN'a bagis yapar
- **Bariyer:** Paranin nasil kullanildigini gormek ister (seffaflik)
- **Basari:** Seffaflik Kosesi'ni gorunce guven duyar ve duzenli bagisci olur

### Persona 2: Yurtdisindan Bagisci — "Sarah" (35, Berlin)

- **Profil:** Turkiye'yi ziyaret etmis, hayvan haklari duyarli, Ingilizce konusan
- **Motivasyon:** Uluslararasi platformlardan (PayPal/Wise) destek olmak istiyor
- **Davranis:** Ingilizce icerikle siteyi kesfeder, PayPal/Wise ile bagis yapar
- **Bariyer:** IBAN islemlerini yapamaz, dil bariyeri olabilir
- **Basari:** Ingilizce icerik + PayPal/Wise ile kolayca bagis yapar

### Persona 3: Mama/Malzeme Bagiscisi — "Mehmet" (45, Hatay)

- **Profil:** Yerel, para gonderemez ama malzeme gonderebilir
- **Motivasyon:** Fiziksel olarak yardim etmek istiyor
- **Davranis:** Ihtiyac listesini kontrol eder, online siparis verir
- **Bariyer:** Neye ihtiyac oldugunu bilmek ister
- **Basari:** Guncel ihtiyac listesinden dogru urunu satin alir

### Persona 4: Gonullu Aday — "Zeynep" (22, Universite Ogrencisi)

- **Profil:** Veterinerlik ogrencisi, sahada deneyim kazanmak istiyor
- **Motivasyon:** Staj/deneyim + hayvan sevgisi
- **Davranis:** Gonullu Ol sayfasini okur, WhatsApp'tan basvurur
- **Bariyer:** Ne yapacagini net bilmek ister
- **Basari:** Gonulluluk alanlarini gorur, kolay basvurur

### Persona 5: Sosyal Medya Kesfedici — "Can" (20, Ogrenci)

- **Profil:** Instagram'da hayvan icerigi takip eden, dusuk butceli
- **Motivasyon:** Paylasarak destek olmak
- **Davranis:** Siteyi gezer, icerik paylarir, belki kucuk bagis yapar
- **Bariyer:** Buyuk bagis yapamaz
- **Basari:** Icerik paylasimi + kucuk bagis + gonullu basvurusu

---

## 2.2 User Stories

### Epic 1: Bagis Deneyimi

| ID     | Story                                                                                                                             | Oncelik |
| ------ | --------------------------------------------------------------------------------------------------------------------------------- | ------- |
| US-1.1 | Ziyaretci olarak, IBAN bilgilerini kolayca kopyalayabilmek istiyorum, boylece hizlica bagis yapabilirim                           | P0      |
| US-1.2 | Yurtdisi bagisci olarak, PayPal/Wise bilgilerini gorebilmek istiyorum, boylece uluslararasi transfer yapabilirim                  | P0      |
| US-1.3 | Bagisci olarak, bagis miktarlarinin somut karsiligini gorebilmek istiyorum (50TL = 1 haftalik mama), boylece motivasyonum artar   | P0      |
| US-1.4 | Ziyaretci olarak, her sayfanin footer'inda IBAN bilgilerini gorebilmek istiyorum, boylece herhangi bir sayfadan bagis yapabilirim | P0      |
| US-1.5 | Bagisci olarak, veteriner klinigine nasil direkt odeme yapabilecegimi ogrenebilmek istiyorum                                      | P1      |
| US-1.6 | Potansiyel duzenli bagisci olarak, aylik bagis programi hakkinda bilgi alabilmek istiyorum                                        | P1      |

### Epic 2: Hayvan Profilleri & Kesfetme

| ID     | Story                                                                                                           | Oncelik |
| ------ | --------------------------------------------------------------------------------------------------------------- | ------- |
| US-2.1 | Ziyaretci olarak, bakimdaki hayvanlari kedi/kopek olarak filtreleyerek gorebilmek istiyorum                     | P0      |
| US-2.2 | Ziyaretci olarak, bir hayvanin detay sayfasinda fotograf galerisi, hikaye ve ihtiyaclarini gorebilmek istiyorum | P0      |
| US-2.3 | Ziyaretci olarak, hayvanlarin durum badge'lerini (tedavide/acil/kalici bakim) gorebilmek istiyorum              | P1      |

### Epic 3: Acil Vakalar

| ID     | Story                                                                                          | Oncelik |
| ------ | ---------------------------------------------------------------------------------------------- | ------- |
| US-3.1 | Ziyaretci olarak, aktif acil vakalari ve her biri icin ilerleme cubugunu gorebilmek istiyorum  | P0      |
| US-3.2 | Ziyaretci olarak, bir acil vakanin tedavi surecini kronolojik olarak takip edebilmek istiyorum | P0      |
| US-3.3 | Ziyaretci olarak, tamamlanan vakalarin once/sonra fotograflarini gorebilmek istiyorum          | P1      |
| US-3.4 | Ziyaretci olarak, acil bir vaka bildirmek icin WhatsApp'a yonlendirilmek istiyorum             | P1      |

### Epic 4: Seffaflik & Guven

| ID     | Story                                                                                                        | Oncelik |
| ------ | ------------------------------------------------------------------------------------------------------------ | ------- |
| US-4.1 | Bagisci olarak, aylik harcama raporlarini gorebilmek istiyorum, boylece paramın nasil kullanildigini bilirim | P0      |
| US-4.2 | Bagisci olarak, veteriner makbuzlarini ve mama fislerini gorebilmek istiyorum                                | P0      |
| US-4.3 | Ziyaretci olarak, toplam bagis vs toplam harcama karsilastirmasini gorebilmek istiyorum                      | P1      |
| US-4.4 | Bagisci olarak, izin verirsem ismimin bagisci listesinde gorunmesini istiyorum                               | P2      |

### Epic 5: Icerik & Blog

| ID     | Story                                                                                | Oncelik |
| ------ | ------------------------------------------------------------------------------------ | ------- |
| US-5.1 | Ziyaretci olarak, blog yazilarini kategori ve tarihe gore filtreleyebilmek istiyorum | P1      |
| US-5.2 | Ziyaretci olarak, blog yazilarini sosyal medyada paylasabilmek istiyorum             | P1      |
| US-5.3 | Ziyaretci olarak, Instagram akisini sitede canli gorebilmek istiyorum                | P1      |

### Epic 6: Gonulluluk & Iletisim

| ID     | Story                                                                                             | Oncelik |
| ------ | ------------------------------------------------------------------------------------------------- | ------- |
| US-6.1 | Gonullu aday olarak, gonulluluk alanlarini ve kosullarini gorebilmek istiyorum                    | P0      |
| US-6.2 | Gonullu aday olarak, WhatsApp uzerinden basvuru yapabilmek istiyorum                              | P0      |
| US-6.3 | Ziyaretci olarak, iletisim bilgilerine (WhatsApp, telefon, e-posta) kolayca ulasabilmek istiyorum | P0      |

### Epic 7: Mama & Malzeme Yardimi

| ID     | Story                                                                                  | Oncelik |
| ------ | -------------------------------------------------------------------------------------- | ------- |
| US-7.1 | Bagisci olarak, guncel ihtiyac listesini aciliyet derecesine gore gorebilmek istiyorum | P0      |
| US-7.2 | Bagisci olarak, gonderim yontemlerini ogrenebilmek istiyorum                           | P0      |
| US-7.3 | Bagisci olarak, mama sponsor ol programi hakkinda bilgi alabilmek istiyorum            | P1      |

### Epic 8: CMS Yonetimi

| ID     | Story                                                                                                   | Oncelik |
| ------ | ------------------------------------------------------------------------------------------------------- | ------- |
| US-8.1 | Site yoneticisi olarak, hayvan profillerini CMS uzerinden ekleyip guncelleyebilmek istiyorum            | P0      |
| US-8.2 | Site yoneticisi olarak, acil vaka bilgilerini ve ilerleme durumlarini guncelleyebilmek istiyorum        | P0      |
| US-8.3 | Site yoneticisi olarak, destekci yorumlarini onaylayip yayinlayabilmek istiyorum                        | P0      |
| US-8.4 | Site yoneticisi olarak, aylik seffaflik raporlarini yukleyebilmek istiyorum                             | P0      |
| US-8.5 | Site yoneticisi olarak, ihtiyac listesini guncelleyebilmek istiyorum                                    | P0      |
| US-8.6 | Site yoneticisi olarak, blog yazilari yazabilmek ve yayinlayabilmek istiyorum                           | P0      |
| US-8.7 | Site yoneticisi olarak, genel site ayarlarini (IBAN, iletisim, istatistikler) degistirebilmek istiyorum | P0      |

### Epic 9: Coklu Dil

| ID     | Story                                                                                                           | Oncelik |
| ------ | --------------------------------------------------------------------------------------------------------------- | ------- |
| US-9.1 | Uluslararasi ziyaretci olarak, siteyi Ingilizce gorebilmek istiyorum                                            | P0      |
| US-9.2 | Turk ziyaretci olarak, siteyi Turkce gorebilmek istiyorum                                                       | P0      |
| US-9.3 | Site yoneticisi olarak, her icerik parcasinin Turkce ve Ingilizce versiyonlarini CMS'den yonetebilmek istiyorum | P0      |

### Epic 10: Arama & Navigasyon

| ID      | Story                                                                                                          | Oncelik |
| ------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| US-10.1 | Ziyaretci olarak, site genelinde hayvan, blog ve acil vaka arayabilmek istiyorum                               | P1      |
| US-10.2 | Ziyaretci olarak, detay sayfalarda breadcrumb navigasyonu ile konumumu gorebilmek istiyorum                     | P1      |
| US-10.3 | Ziyaretci olarak, 404 sayfasinda ana sayfaya veya populer sayfalara yonlendirilmek istiyorum                   | P1      |

---

## 2.3 Acceptance Criteria

### AC-1: IBAN Kopyalama

- [x] IBAN numarasi tek tikla panoya kopyalanir
- [x] Kopyalama sonrasi "Kopyalandi!" toast bildirimi gosterilir
- [x] Footer'daki IBAN tum sayfalarda gorunur
- [x] Mobilde de kopyalama islemi calisir

### AC-2: Hayvan Kartlari

- [x] Kedi/kopek filtresi calisir (toggle veya tab)
- [x] Her kartta: fotograf, isim, tur, yas, cinsiyet, durum badge'i gorunur
- [x] Kart tiklandiginda detay sayfasi acilir
- [x] Detay sayfasinda fotograf galerisi, hikaye ve ihtiyaclar listelenir
- [x] CMS'den eklenen hayvanlar otomatik olarak sayfada gorunur

### AC-3: Acil Vaka Ilerleme

- [x] Ilerleme cubugu toplanan/hedef tutari gosterir
- [x] Yuzde hesabi dogru calisir
- [x] Guncelleme gecmisi kronolojik sirada gorunur
- [x] Tamamlanan vakalar arsiv bolumune tasinir

### AC-4: Seffaflik Raporu

- [x] Aylik raporlar tarih sirasina gore listelenir
- [x] Her raporda harcama kalemleri, toplam bagis ve toplam harcama gorunur
- [x] Belge fotograflari (makbuz, fis) lightbox ile buyutulur
- [x] Bagis vs harcama karsilastirmasi gorsel olarak sunulur

### AC-5: Coklu Dil

- [x] Dil degistirici header'da gorunur (TR/EN)
- [x] Sayfa icerikleri secilen dilde render edilir
- [x] URL yapisi dil kodunu icerir (/tr/..., /en/...)
- [x] CMS'de her collection icin dil versiyonlari yonetilebilir
- [x] Varsayilan dil: Turkce

### AC-6: Responsive Tasarim

- [x] Tum sayfalar 320px-1920px arasinda duzgun gorunur
- [x] Mobilde hamburger menu calisir
- [x] Mobilde sticky "Bagis Yap" CTA gorunur
- [x] Tablet'te 2 kolon, desktop'ta 3-4 kolon grid uygulanir
- [x] Custom cursor sadece desktop'ta aktif, mobilde devre disi

### AC-7: Instagram Entegrasyonu

- [x] Instagram Basic Display API ile son postlar cekilir
- [x] En az 6-9 post grid olarak gorunur
- [x] Her post tiklandiginda Instagram'a yonlendirir
- [x] API hatasi durumunda graceful fallback (statik gorseller veya gizle)

### AC-8: WhatsApp Yonlendirme

- [x] Gonullu basvuru "Basvur" butonu wa.me linkine yonlendirir
- [x] Acil vaka bildirimi wa.me linkine yonlendirir
- [x] WhatsApp linki on-doldurulmus mesaj icerir
- [x] Mobilde WhatsApp uygulamasini acar, desktop'ta WhatsApp Web acar

### AC-9: SEO & Sosyal Medya

- [x] Her sayfa icin meta title ve description tanimli
- [x] Open Graph ve Twitter Card meta tagleri mevcut
- [x] Sitemap.xml otomatik uretilir
- [x] Yapilandirilmis veri (JSON-LD) uygulanir (Organization, Article)
- [x] Tum gorsellerde alt text zorunlu

### AC-10: Site Geneli Arama

- [ ] Arama cubugu header'da veya modal olarak erisebilir
- [ ] Hayvan, blog yazisi ve acil vakalar aranabilir
- [ ] Arama sonuclari URL state ile senkronize (Nuqs)
- [ ] Sonuc bulunamadiginda kullanici dostu mesaj gosterilir

---

## 2.4 Non-Goals (Kapsam Disi)

- Sahiplendirme sayfasi veya fonksiyonu
- Online odeme entegrasyonu (iyzico/Stripe) — ileride eklenecek
- Kullanici hesabi / giris sistemi (bagiscilar icin)
- Mobil uygulama (native iOS/Android)
- E-ticaret / online magaza
- Forum veya topluluk alani
- Canli sohbet (chatbot)
- Otomatik bagis takip sistemi (banka entegrasyonu)
- Veteriner klinigine direkt online odeme entegrasyonu
- Hayvan sahiplendirme / evlat edinme sureci
- Push bildirim sistemi

---

## 2.5 Kullanici Akisi

```
Instagram/Sosyal Medya → Ana Sayfa (duygusal bag)
  → Hikayem (kisisel bag)
    → Calismalarimiz / Canlarimiz (ne yapildigini gor)
      → Seffaflik Kosesi (guven olustur)
        → Destek Ol (harekete gec)
          → IBAN Kopyala / PayPal / Wise (bagis yap)

Alternatif akislar:
- Ana Sayfa → Acil Vakalar → Destek Ol
- Ana Sayfa → Mama & Malzeme → Siparis ver
- Ana Sayfa → Gonullu Ol → WhatsApp basvuru
- Herhangi bir sayfa → Footer IBAN → Bagis yap
- Herhangi bir sayfa → Arama → Sonuc → Detay sayfasi
```

**Temel Ilke:** Ziyaretci, bagis yapma noktasina en fazla 2 tikla ulasir. IBAN bilgileri her sayfanin footer'inda surekli gorunur.
