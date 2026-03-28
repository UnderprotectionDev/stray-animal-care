import type { GlobalConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { revalidateUIStrings } from './hooks/revalidateUIStrings'

const t = (name: string, label: string, defaultValue: string) => ({
  name,
  label,
  type: 'text' as const,
  localized: true,
  defaultValue,
})

const ta = (name: string, label: string, defaultValue: string) => ({
  name,
  label,
  type: 'textarea' as const,
  localized: true,
  defaultValue,
})

export const UIStrings: GlobalConfig = {
  slug: 'ui-strings',
  label: 'Arayüz Metinleri',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Ayarlar',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ortak & Düzen',
          fields: [
            {
              name: 'common',
              label: 'Ortak',
              type: 'group',
              fields: [
                t('siteName', 'Site Adı', 'Paws of Hope'),
                t('search', 'Arama', 'Ara'),
                t('loading', 'Yükleniyor', 'Yükleniyor...'),
                t('goHome', 'Ana Sayfa', 'Ana Sayfaya Git'),
                t('notFound', 'Bulunamadı', 'Sayfa bulunamadı'),
                t('backToHome', 'Ana Sayfaya Dön', 'Ana Sayfaya Dön'),
              ],
            },
            {
              name: 'layout',
              label: 'Düzen',
              type: 'group',
              fields: [
                t('skipToContent', 'İçeriğe Geç', 'İçeriğe geç'),
                t('siteTitle', 'Site Başlığı', 'Paws of Hope — Sokak Hayvanları Bakımı'),
                ta('siteDescription', 'Site Açıklaması', 'Sokak hayvanlarının bakım, tedavi ve sıcak bir yuva bulmasına yardımcı oluyoruz.'),
                {
                  name: 'header',
                  label: 'Üst Menü',
                  type: 'group',
                  fields: [
                    t('home', 'Ana Sayfa', 'Ana Sayfa'),
                    t('posts', 'Yazılar', 'Yazılar'),
                    t('search', 'Ara', 'Ara'),
                    t('animals', 'Canlarımız', 'Canlarımız'),
                    t('emergency', 'Acil Durumlar', 'Acil Durumlar'),
                    t('blog', 'Blog', 'Blog'),
                    t('donate', 'Destek Ol', 'Destek Ol'),
                    t('volunteer', 'Gönüllü Ol', 'Gönüllü Ol'),
                    t('vision', 'Gelecek Vizyonu', 'Gelecek Vizyonu'),
                    t('supplies', 'İhtiyaç Listesi', 'İhtiyaç Listesi'),
                    t('openMenu', 'Menüyü Aç', 'Menüyü aç'),
                    t('closeMenu', 'Menüyü Kapat', 'Menüyü kapat'),
                  ],
                },
                {
                  name: 'languageSwitcher',
                  label: 'Dil Seçici',
                  type: 'group',
                  fields: [
                    t('label', 'Etiket', 'Dil seçimi'),
                  ],
                },
                {
                  name: 'mobileMenu',
                  label: 'Mobil Menü',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Menü'),
                  ],
                },
                {
                  name: 'footer',
                  label: 'Alt Bilgi',
                  type: 'group',
                  fields: [
                    t('copyright', 'Telif Hakkı', 'Tüm hakları saklıdır.'),
                    t('contactUs', 'İletişim', 'İletişim'),
                    t('explore', 'Keşfet', 'Keşfet'),
                    t('support', 'Destek', 'Destek'),
                    t('followUs', 'Bizi Takip Edin', 'Bizi Takip Edin'),
                    ta('description', 'Açıklama', 'Sokak hayvanlarına umut oluyoruz.'),
                    t('missionTitle', 'Misyon Başlığı', 'Hayata Değer Kat'),
                    ta('missionText', 'Misyon Metni', 'Her patili can bir yuva, her destek bir umut.'),
                    t('donateButton', 'Destek Butonu', 'Destek Ol'),
                    t('volunteerButton', 'Gönüllü Butonu', 'Gönüllü Ol'),
                    t('emergencyLine', 'Acil Hat', 'Acil Hat'),
                    t('madeWithLove', 'Sevgiyle Yapıldı', 'Sokak hayvanları için sevgiyle yapıldı 🐾'),
                  ],
                },
                {
                  name: 'breadcrumb',
                  label: 'İz Bırakma',
                  type: 'group',
                  fields: [
                    t('home', 'Ana Sayfa', 'Ana Sayfa'),
                  ],
                },
                {
                  name: 'mobileDonate',
                  label: 'Mobil Bağış',
                  type: 'group',
                  fields: [
                    t('cta', 'CTA', 'Destek Ol'),
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Arama & Yazılar',
          fields: [
            {
              name: 'search',
              label: 'Arama',
              type: 'group',
              fields: [
                t('title', 'Başlık', 'Arama'),
                t('placeholder', 'Placeholder', 'Ara...'),
                t('noResults', 'Sonuç Yok', 'Sonuç bulunamadı.'),
                {
                  name: 'modal',
                  label: 'Arama Modalı',
                  type: 'group',
                  fields: [
                    t('placeholder', 'Placeholder', 'Sayfa, yazı veya hayvan ara...'),
                    t('noResults', 'Sonuç Yok', 'Sonuç bulunamadı.'),
                    t('shortcut', 'Kısayol', 'Aramayı aç'),
                  ],
                },
              ],
            },
            {
              name: 'posts',
              label: 'Yazılar',
              type: 'group',
              fields: [
                t('title', 'Başlık', 'Yazılar'),
                t('readMore', 'Devamını Oku', 'Devamını Oku'),
                t('noPosts', 'Yazı Yok', 'Henüz yazı bulunmuyor.'),
              ],
            },
          ],
        },

        {
          label: 'Hayvanlar',
          fields: [
            {
              name: 'animals',
              label: 'Hayvanlar',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Canlarımız — Paws of Hope'),
                    ta('description', 'Açıklama', 'Sokak hayvanlarımızı tanıyın. Tedavi, bakım ve yuva arayan kediler ve köpekler.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Canlarımız'),
                ta('subtitle', 'Alt Başlık', 'Tedavi ve bakımımız altındaki tüm dostlarımızla tanışın.'),
                {
                  name: 'filter',
                  label: 'Filtre',
                  type: 'group',
                  fields: [
                    t('all', 'Tümü', 'Tümü'),
                    t('kedi', 'Kedi', 'Kediler'),
                    t('kopek', 'Köpek', 'Köpekler'),
                    t('noResults', 'Sonuç Yok', 'Bu filtreyle eşleşen hayvan bulunamadı.'),
                    t('tedavide', 'Tedavide', 'Tedavide'),
                    t('kaliciBakim', 'Kalıcı Bakım', 'Kalıcı Bakım'),
                    t('acil', 'Acil', 'Acil'),
                  ],
                },
                {
                  name: 'detail',
                  label: 'Detay',
                  type: 'group',
                  fields: [
                    t('story', 'Hikaye', 'Hikayesi'),
                    t('needs', 'İhtiyaçlar', 'İhtiyaçları'),
                    t('photos', 'Fotoğraflar', 'Fotoğraflar'),
                    t('type', 'Tür', 'Tür'),
                    t('age', 'Yaş', 'Yaş'),
                    t('gender', 'Cinsiyet', 'Cinsiyet'),
                    t('status', 'Durum', 'Durum'),
                    t('erkek', 'Erkek', 'Erkek'),
                    t('disi', 'Dişi', 'Dişi'),
                    t('bilinmiyor', 'Bilinmiyor', 'Bilinmiyor'),
                    t('back', 'Geri', 'Canlarımıza Dön'),
                    t('donate', 'Destek Ol', 'Destek Ol'),
                    t('noPhotos', 'Fotoğraf Yok', 'Fotoğraf bulunmuyor.'),
                    t('whatsappMessage', 'WhatsApp Mesajı', '{name} hakkında bilgi almak istiyorum.'),
                  ],
                },
                {
                  name: 'lightbox',
                  label: 'Işık Kutusu',
                  type: 'group',
                  fields: [
                    t('close', 'Kapat', 'Kapat'),
                    t('prev', 'Önceki', 'Önceki'),
                    t('next', 'Sonraki', 'Sonraki'),
                    t('imageOf', 'Görsel', '{current} / {total}'),
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Acil Vakalar',
          fields: [
            {
              name: 'emergency',
              label: 'Acil Vakalar',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Acil Vakalar — Paws of Hope'),
                    ta('description', 'Açıklama', 'Acil yardıma ihtiyaç duyan hayvanlar. Tedavi masraflarına destek olun.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Acil Vakalar'),
                t('activeCases', 'Aktif Vakalar', 'Aktif Vakalar'),
                t('collected', 'Toplanan', 'Toplanan'),
                t('target', 'Hedef', 'Hedef'),
                t('progress', 'İlerleme', 'İlerleme'),
                t('noActive', 'Aktif Vaka Yok', 'Şu anda aktif acil vaka bulunmuyor.'),
                t('completedCases', 'Tamamlanan', 'Tamamlanan Vakalar'),
                t('donateButton', 'Destek Butonu', 'Destek Ol'),
                {
                  name: 'detail',
                  label: 'Detay',
                  type: 'group',
                  fields: [
                    t('description', 'Açıklama', 'Açıklama'),
                    t('updates', 'Güncellemeler', 'Güncellemeler'),
                    t('beforeAfter', 'Önce / Sonra', 'Önce / Sonra'),
                    t('before', 'Önce', 'Önce'),
                    t('after', 'Sonra', 'Sonra'),
                    t('relatedAnimal', 'İlgili Hayvan', 'İlgili Hayvan'),
                    t('noUpdates', 'Güncelleme Yok', 'Henüz güncelleme bulunmuyor.'),
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Destek Ol',
          fields: [
            {
              name: 'donate',
              label: 'Destek Ol',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Destek Ol — Paws of Hope'),
                    ta('description', 'Açıklama', 'Sokak hayvanlarına destek olmak için bağış yapın. IBAN ile bağış kabul ediyoruz.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Destek Ol'),
                t('subtitle', 'Alt Başlık', 'Her katkınız bir cana umut olur.'),
                {
                  name: 'hero',
                  label: 'Hero',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'BİR CAN KURTAR'),
                    t('badge', 'Rozet', 'HAYAT KURTAR'),
                    ta('subtitle', 'Alt Başlık', 'Her katkınız bir cana umut olur. Bağışlarınız doğrudan tedavi, mama ve barınma masraflarına harcanır.'),
                  ],
                },
                {
                  name: 'iban',
                  label: 'IBAN',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'IBAN İLE BAĞIŞ'),
                    t('bank', 'Banka', 'Banka'),
                    t('accountHolder', 'Hesap Sahibi', 'Hesap Sahibi'),
                    t('iban', 'IBAN', 'IBAN'),
                    t('copy', 'Kopyala', 'IBAN\'ı Kopyala'),
                    t('placeholder', 'Placeholder', 'Banka hesap bilgileri yakında eklenecek.'),
                  ],
                },
                {
                  name: 'international',
                  label: 'Uluslararası',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Uluslararası Destek'),
                    t('comingSoon', 'Yakında', 'YAKINDA'),
                    t('placeholder', 'Placeholder', 'Yurtdışı ödeme seçenekleri hazırlanıyor.'),
                  ],
                },
                {
                  name: 'volunteer',
                  label: 'Gönüllü',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'GÖNÜLLÜ OL'),
                    ta('description', 'Açıklama', 'Zamanınızı verin, saha ekibimize katılın. Besleme, tedavi ve kurtarma operasyonlarında destek olun.'),
                    t('cta', 'CTA', 'BAŞVURU FORMU →'),
                  ],
                },
                {
                  name: 'ticker',
                  label: 'Kayan Yazı',
                  type: 'group',
                  fields: [
                    t('slogan1', 'Slogan 1', 'YAŞAM HAKKINA SAYGI'),
                    t('slogan2', 'Slogan 2', 'DESTEK OL HAYAT KURTAR'),
                    t('slogan3', 'Slogan 3', 'HER CAN DEĞERLİ'),
                    t('cats', 'Kedi', 'KEDİ'),
                    t('dogs', 'Köpek', 'KÖPEK'),
                    t('treated', 'Tedavi', 'TEDAVİ EDİLEN'),
                  ],
                },
                {
                  name: 'cards',
                  label: 'Kartlar',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Bağışınız Neye Yarar?'),
                    t('foodTitle', 'Mama Başlık', 'Mama Desteği'),
                    ta('foodDescription', 'Mama Açıklama', '1 aylık mama masrafını karşılar.'),
                    t('vetTitle', 'Veteriner Başlık', 'Veteriner Ziyareti'),
                    ta('vetDescription', 'Veteriner Açıklama', 'Rutin muayene ve aşı masrafını karşılar.'),
                    t('surgeryTitle', 'Cerrahi Başlık', 'Cerrahi Destek'),
                    ta('surgeryDescription', 'Cerrahi Açıklama', 'Küçük bir operasyon masrafını karşılar.'),
                  ],
                },
                {
                  name: 'faq',
                  label: 'SSS',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Sık Sorulan Sorular'),
                    t('q1', 'Soru 1', 'Bağışım nereye gidiyor?'),
                    ta('a1', 'Cevap 1', 'Tüm bağışlar doğrudan hayvan bakım, tedavi ve mama masraflarına harcanmaktadır. Şeffaflık raporlarımızda detaylı harcama bilgisini görebilirsiniz.'),
                    t('q2', 'Soru 2', 'Bağış makbuzu alabilir miyim?'),
                    ta('a2', 'Cevap 2', 'Vergi makbuzu için lütfen e-posta veya WhatsApp üzerinden bizimle iletişime geçin.'),
                    t('q3', 'Soru 3', 'Düzenli bağış yapabilir miyim?'),
                    ta('a3', 'Cevap 3', 'Evet! Aylık sabit bağış yapmak için banka otomatik ödeme talimatı verebilirsiniz.'),
                    t('q4', 'Soru 4', 'Yurt dışından bağış kabul ediyor musunuz?'),
                    ta('a4', 'Cevap 4', 'Evet, uluslararası bağış seçenekleri yakında aktif olacak. Lütfen bizimle iletişime geçin.'),
                    t('q5', 'Soru 5', 'Bağış yerine malzeme gönderebilir miyim?'),
                    ta('a5', 'Cevap 5', 'Evet! İhtiyaç listesi için bize ulaşın. Mama, kedi kumu, ilaç ve battaniye gibi malzemeler kabul ediyoruz.'),
                  ],
                },
                {
                  name: 'transparency',
                  label: 'Şeffaflık',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Şeffaf Yönetim'),
                    ta('description', 'Açıklama', 'Tüm gelir ve giderleri düzenli olarak yayınlıyoruz. Bağışlarınızın nereye gittiğini her zaman görebilirsiniz.'),
                    t('reports', 'Raporlar', 'Şeffaflık Raporları'),
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Mama & Malzeme',
          fields: [
            {
              name: 'supplies',
              label: 'Mama & Malzeme',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Mama & Malzeme — Paws of Hope'),
                    ta('description', 'Açıklama', 'İhtiyaç listemizi inceleyin. Mama, ilaç, kedi kumu ve diğer malzemelere desteğinizi bekliyoruz.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Mama & Malzeme İhtiyaçları'),
                ta('subtitle', 'Alt Başlık', 'Hayvanlarımızın güncel ihtiyaç listesini burada bulabilirsiniz.'),
                {
                  name: 'hero',
                  label: 'Hero',
                  type: 'group',
                  fields: [
                    t('rotatingWord1', 'Dönen Kelime 1', 'MAMA'),
                    t('rotatingWord2', 'Dönen Kelime 2', 'İLAÇ'),
                    t('rotatingWord3', 'Dönen Kelime 3', 'KUM'),
                    t('badgeLabel', 'Badge Etiketi', 'Aktif İhtiyaç'),
                  ],
                },
                {
                  name: 'stats',
                  label: 'İstatistikler',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Stok Durumu'),
                    t('totalItems', 'Toplam Ürün', 'Toplam Ürün'),
                    t('urgentItems', 'Acil İhtiyaç', 'Acil İhtiyaç'),
                    t('coverage', 'Stok Karşılama', 'Stok Karşılama'),
                  ],
                },
                {
                  name: 'divider',
                  label: 'Bant Yazıları',
                  type: 'group',
                  fields: [
                    t('text1', 'Metin 1', 'MAMA'),
                    t('text2', 'Metin 2', 'İLAÇ'),
                    t('text3', 'Metin 3', 'KEDİ KUMU'),
                    t('text4', 'Metin 4', 'DESTEK OL'),
                  ],
                },
                {
                  name: 'needsSection',
                  label: 'İhtiyaç Bölümü',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'İhtiyaç Listesi'),
                  ],
                },
                {
                  name: 'table',
                  label: 'Tablo',
                  type: 'group',
                  fields: [
                    t('product', 'Ürün', 'Ürün'),
                    t('brand', 'Marka', 'Marka / Detay'),
                    t('urgency', 'Aciliyet', 'Aciliyet'),
                    t('stock', 'Stok', 'Stok Durumu'),
                  ],
                },
                {
                  name: 'urgency',
                  label: 'Aciliyet',
                  type: 'group',
                  fields: [
                    t('acil', 'Acil', 'Acil'),
                    t('orta', 'Orta', 'Orta'),
                    t('yeterli', 'Yeterli', 'Yeterli'),
                  ],
                },
                {
                  name: 'shipping',
                  label: 'Gönderim',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Nasıl Gönderebilirsiniz?'),
                    ta('description', 'Açıklama', 'Aşağıdaki yöntemlerle malzeme desteğinde bulunabilirsiniz.'),
                    t('cargo', 'Kargo', 'Kargo ile gönderim yapabilirsiniz.'),
                    t('inPerson', 'Elden', 'Elden teslim için bizimle iletişime geçin.'),
                    t('online', 'Online', 'Online sipariş vererek adresimize gönderebilirsiniz.'),
                  ],
                },
                {
                  name: 'sponsor',
                  label: 'Sponsor',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Mama Sponsoru Ol'),
                    ta('description', 'Açıklama', 'Aylık düzenli mama desteği sağlayarak hayvanlarımızın beslenmesine katkıda bulunun.'),
                    t('cta', 'CTA', 'Destek Ol'),
                  ],
                },
                t('empty', 'Boş', 'Şu anda ihtiyaç listesi bulunmuyor.'),
              ],
            },
          ],
        },

        {
          label: 'Şeffaflık',
          fields: [
            {
              name: 'transparency',
              label: 'Şeffaflık',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Şeffaflık Raporları — Paws of Hope'),
                    ta('description', 'Açıklama', 'Gelir ve gider raporlarımızı inceleyin. Bağışlarınızın nereye gittiğini şeffaf olarak paylaşıyoruz.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Şeffaflık Raporları'),
                t('subtitle', 'Alt Başlık', 'Tüm gelir ve giderleri düzenli olarak yayınlıyoruz.'),
                {
                  name: 'hero',
                  label: 'Hero',
                  type: 'group',
                  fields: [
                    t('rotatingWord1', 'Dönen Kelime 1', 'Şeffaflık'),
                    t('rotatingWord2', 'Dönen Kelime 2', 'Güven'),
                    t('rotatingWord3', 'Dönen Kelime 3', 'Hesap Verebilirlik'),
                    t('badgeLabel', 'Badge Etiketi', 'Rapor Yayınlandı'),
                  ],
                },
                {
                  name: 'stats',
                  label: 'İstatistikler',
                  type: 'group',
                  fields: [
                    t('totalIncome', 'Toplam Gelir', 'Toplam Gelir'),
                    t('totalExpenses', 'Toplam Gider', 'Toplam Gider'),
                    t('donorCount', 'Bağışçı Sayısı', 'Bağışçı Sayısı'),
                    t('reportCount', 'Rapor Sayısı', 'Rapor Sayısı'),
                  ],
                },
                {
                  name: 'report',
                  label: 'Rapor',
                  type: 'group',
                  fields: [
                    t('expenses', 'Giderler', 'Giderler'),
                    t('totalExpense', 'Toplam Gider', 'Toplam Gider'),
                    t('donations', 'Bağışlar', 'Bağışlar'),
                    t('totalDonation', 'Toplam Bağış', 'Toplam Bağış'),
                    t('category', 'Kategori', 'Kategori'),
                    t('amount', 'Miktar', 'Miktar'),
                    t('comparison', 'Karşılaştırma', 'Bağış / Gider Oranı'),
                    t('documents', 'Belgeler', 'Belgeler'),
                    t('surplus', 'Fazla', 'Fazla'),
                    t('deficit', 'Açık', 'Açık'),
                  ],
                },
                t('reportsHeading', 'Raporlar Başlığı', 'Aylık Raporlar'),
                t('empty', 'Boş', 'Henüz şeffaflık raporu yayınlanmadı.'),
                t('currency', 'Para Birimi', '₺'),
              ],
            },
          ],
        },

        {
          label: 'Blog',
          fields: [
            {
              name: 'blog',
              label: 'Blog',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Günlük — Paws of Hope'),
                    ta('description', 'Açıklama', 'Kurtarma hikayeleri, tedavi süreçleri, duyurular ve etkinliklerimizi takip edin.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Günlük'),
                ta('subtitle', 'Alt Başlık', 'Hikayelerimizi, duyurularımızı ve güncel gelişmeleri takip edin.'),
                {
                  name: 'filter',
                  label: 'Filtre',
                  type: 'group',
                  fields: [
                    t('all', 'Tümü', 'Tümü'),
                    t('kurtarma', 'Kurtarma', 'Kurtarma'),
                    t('tedavi', 'Tedavi', 'Tedavi'),
                    t('gunluk', 'Günlük', 'Günlük'),
                    t('duyuru', 'Duyuru', 'Duyuru'),
                    t('etkinlik', 'Etkinlik', 'Etkinlik'),
                  ],
                },
                t('readMore', 'Devamını Oku', 'Devamını Oku'),
                {
                  name: 'share',
                  label: 'Paylaş',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Paylaş'),
                    t('twitter', 'Twitter', 'Twitter\'da Paylaş'),
                    t('facebook', 'Facebook', 'Facebook\'ta Paylaş'),
                    t('whatsapp', 'WhatsApp', 'WhatsApp\'ta Paylaş'),
                    t('copy', 'Kopyala', 'Bağlantıyı Kopyala'),
                    t('copied', 'Kopyalandı', 'Kopyalandı!'),
                  ],
                },
                t('tags', 'Etiketler', 'Etiketler'),
                t('empty', 'Boş', 'Henüz yazı bulunmuyor.'),
                t('back', 'Geri', 'Günlüğe Dön'),
              ],
            },
          ],
        },

        {
          label: 'Gönüllü',
          fields: [
            {
              name: 'volunteer',
              label: 'Gönüllü',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gönüllü Ol — Paws of Hope'),
                    ta('description', 'Açıklama', 'Sokak hayvanları için gönüllü olun. Geçici bakım, sağlık desteği, besleme ve daha fazlası.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Gönüllü Ol'),
                ta('subtitle', 'Alt Başlık', 'Sokak hayvanlarına yardım etmek için aramıza katılın.'),
                {
                  name: 'areas',
                  label: 'Alanlar',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gönüllülük Alanları'),
                    t('fosterTitle', 'Geçici Bakım Başlık', 'Geçici Bakım'),
                    ta('fosterDescription', 'Geçici Bakım Açıklama', 'Tedavi sürecindeki hayvanlara evinizde geçici bakım sağlayın.'),
                    t('healthTitle', 'Sağlık Başlık', 'Sağlık Desteği'),
                    ta('healthDescription', 'Sağlık Açıklama', 'Veteriner ziyaretlerinde ve tedavi süreçlerinde yardımcı olun.'),
                    t('feedingTitle', 'Besleme Başlık', 'Besleme'),
                    ta('feedingDescription', 'Besleme Açıklama', 'Günlük besleme turlarına katılın ve besleme noktalarını yönetin.'),
                    t('shelterTitle', 'Barınak Başlık', 'Barınak Yapımı'),
                    ta('shelterDescription', 'Barınak Açıklama', 'Sokak hayvanları için barınak ve kulübe yapımına katkıda bulunun.'),
                  ],
                },
                {
                  name: 'stats',
                  label: 'İstatistikler',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gönüllü Ailemiz'),
                    t('volunteers', 'Gönüllüler', 'Aktif Gönüllü'),
                    t('animalsHelped', 'Yardım Edilen', 'Yardım Edilen Hayvan'),
                    t('feedingPoints', 'Besleme Noktası', 'Besleme Noktası'),
                  ],
                },
                {
                  name: 'faq',
                  label: 'SSS',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Sık Sorulan Sorular'),
                    t('q1', 'Soru 1', 'Gönüllü olmak için ne yapmalıyım?'),
                    ta('a1', 'Cevap 1', 'WhatsApp üzerinden bizimle iletişime geçmeniz yeterli. Size uygun alanları birlikte belirleyelim.'),
                    t('q2', 'Soru 2', 'Gönüllülük için deneyim gerekli mi?'),
                    ta('a2', 'Cevap 2', 'Hayır, herhangi bir deneyim gerekmez. Hayvanseverliğiniz yeterli! Gerekli eğitimi biz sağlıyoruz.'),
                    t('q3', 'Soru 3', 'Ne kadar zaman ayırmalıyım?'),
                    ta('a3', 'Cevap 3', 'Tamamen size bağlı. Haftada birkaç saat bile büyük fark yaratır.'),
                    t('q4', 'Soru 4', 'Geçici bakım için evimde ne gerekli?'),
                    ta('a4', 'Cevap 4', 'Temel ihtiyaçları (mama, kum, ilaç) biz karşılıyoruz. Sizden sadece sevgi ve ilgi bekliyoruz.'),
                  ],
                },
                {
                  name: 'timeline',
                  label: 'Süreç',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gönüllü Süreci'),
                    t('step1Title', 'Adım 1 Başlık', 'Başvuru'),
                    ta('step1Desc', 'Adım 1 Açıklama', 'WhatsApp üzerinden iletişime geçin, ilgi alanınızı birlikte belirleyelim.'),
                    t('step2Title', 'Adım 2 Başlık', 'Eğitim'),
                    ta('step2Desc', 'Adım 2 Açıklama', 'Kısa bir oryantasyon eğitimi ile saha çalışmalarımızı tanıyın.'),
                    t('step3Title', 'Adım 3 Başlık', 'Aktif Gönüllü'),
                    ta('step3Desc', 'Adım 3 Açıklama', 'Ekibimize katılarak sahadaki faaliyetlerde aktif rol alın.'),
                  ],
                },
                {
                  name: 'testimonials',
                  label: 'Hikayeler',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gönüllü Hikayeleri'),
                    ta('t1Quote', 'Hikaye 1 Alıntı', 'İlk besleme turumda 12 kediye mama verdim. O anki mutluluk tarif edilemez. Artık her hafta sonu sahada oluyorum.'),
                    t('t1Name', 'Hikaye 1 İsim', 'Ayşe K.'),
                    t('t1Role', 'Hikaye 1 Alan', 'Besleme Gönüllüsü'),
                    ta('t2Quote', 'Hikaye 2 Alıntı', 'Geçici bakım verdiğim yavru kedinin sahiplenildiğini görmek hayatımın en güzel anlarından biriydi.'),
                    t('t2Name', 'Hikaye 2 İsim', 'Mehmet A.'),
                    t('t2Role', 'Hikaye 2 Alan', 'Geçici Bakım Gönüllüsü'),
                    ta('t3Quote', 'Hikaye 3 Alıntı', 'Veteriner ziyaretlerinde yardımcı oluyorum. Her iyileşen hayvan bize güç veriyor.'),
                    t('t3Name', 'Hikaye 3 İsim', 'Zeynep D.'),
                    t('t3Role', 'Hikaye 3 Alan', 'Sağlık Desteği Gönüllüsü'),
                  ],
                },
                {
                  name: 'divider',
                  label: 'Bant Yazıları',
                  type: 'group',
                  fields: [
                    t('text1', 'Yazı 1', 'GÖNÜLLÜ OL'),
                    t('text2', 'Yazı 2', 'HAYAT KURTAR'),
                    t('text3', 'Yazı 3', 'FARK YARAT'),
                    t('text4', 'Yazı 4', 'BİRLİKTE GÜÇLÜYÜZ'),
                  ],
                },
                {
                  name: 'cta',
                  label: 'CTA',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Aramıza Katılın!'),
                    ta('description', 'Açıklama', 'Gönüllü olmak için WhatsApp üzerinden bizimle iletişime geçin.'),
                    t('whatsappMessage', 'WhatsApp Mesajı', 'Merhaba, gönüllü olmak istiyorum.'),
                    t('buttonLabel', 'Buton Yazısı', 'WHATSAPP İLE BAŞVUR'),
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'Vizyon',
          fields: [
            {
              name: 'vision',
              label: 'Vizyon',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gelecek Vizyonu — Paws of Hope'),
                    ta('description', 'Açıklama', 'Sokak hayvanları için geleceğe dair hedeflerimizi ve vizyonumuzu keşfedin.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Gelecek Vizyonu'),
                ta('subtitle', 'Alt Başlık', 'Her adımda daha güzel bir gelecek inşa ediyoruz.'),
                {
                  name: 'association',
                  label: 'Dernek',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Dernek Kurma Hedefimiz'),
                    ta('description', 'Açıklama', 'Resmi bir dernek kurarak çalışmalarımızı yasal bir çatı altında sürdürmeyi, bağış toplama kapasitemizi artırmayı ve daha fazla hayvana ulaşmayı hedefliyoruz.'),
                  ],
                },
                {
                  name: 'shortTerm',
                  label: 'Kısa Vade',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Kısa Vadeli Hedefler (1 Yıl)'),
                    t('shelterTitle', 'Barınak Başlık', 'Tam Donanımlı Barınak'),
                    ta('shelterDescription', 'Barınak Açıklama', 'Tedavi sürecindeki hayvanlar için güvenli ve donanımlı bir barınak kurmak.'),
                    t('spayTitle', 'Kısırlaştırma Başlık', '200+ Kısırlaştırma'),
                    ta('spayDescription', 'Kısırlaştırma Açıklama', 'Popülasyon kontrolü için yılda en az 200 hayvanı kısırlaştırmak.'),
                    t('volunteersTitle', 'Gönüllü Başlık', '50 Aktif Gönüllü'),
                    ta('volunteersDescription', 'Gönüllü Açıklama', 'Gönüllü ağımızı genişleterek 50 aktif gönüllüye ulaşmak.'),
                    t('clinicTitle', 'Klinik Başlık', 'Veteriner Kliniği Ortaklığı'),
                    ta('clinicDescription', 'Klinik Açıklama', 'İndirimli tedavi için veteriner klinikleriyle kalıcı ortaklıklar kurmak.'),
                  ],
                },
                {
                  name: 'longTerm',
                  label: 'Uzun Vade',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Uzun Vadeli Hedefler (3-5 Yıl)'),
                    t('ngoTitle', 'Dernek Başlık', 'Resmi Dernek Statüsü'),
                    ta('ngoDescription', 'Dernek Açıklama', 'Yasal bir dernek kurarak şeffaf ve sürdürülebilir bir yapı oluşturmak.'),
                    t('vetClinicTitle', 'Klinik Başlık', 'Toplum Destekli Klinik'),
                    ta('vetClinicDescription', 'Klinik Açıklama', 'Bağışçılarımızın desteğiyle sokak hayvanlarına özel bir veteriner kliniği açmak.'),
                    t('fosterTitle', 'Geçici Bakım Başlık', 'Şehir Genelinde Geçici Bakım Ağı'),
                    ta('fosterDescription', 'Geçici Bakım Açıklama', 'Her mahallede geçici bakım gönüllüleri ile kapsamlı bir ağ oluşturmak.'),
                    t('awarenessTitle', 'Farkındalık Başlık', 'Ulusal Farkındalık Kampanyası'),
                    ta('awarenessDescription', 'Farkındalık Açıklama', 'Sokak hayvanları hakları için ulusal çapta farkındalık kampanyaları düzenlemek.'),
                  ],
                },
                {
                  name: 'network',
                  label: 'Ağ',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Büyüyen Gönüllü Ağımız'),
                    ta('description', 'Açıklama', 'Her gün büyüyen gönüllü ailemizle daha fazla hayvana ulaşıyoruz. Siz de bu değişimin parçası olun.'),
                  ],
                },
                {
                  name: 'cta',
                  label: 'CTA',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Bu Vizyonu Birlikte Gerçekleştirelim'),
                    ta('description', 'Açıklama', 'Geleceği birlikte inşa etmek için bağış yapın veya gönüllü olun.'),
                    t('donate', 'Destek Ol', 'Destek Ol'),
                    t('volunteer', 'Gönüllü Ol', 'Gönüllü Ol'),
                  ],
                },
              ],
            },
          ],
        },

        {
          label: 'İletişim & 404',
          fields: [
            {
              name: 'contact',
              label: 'İletişim',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'İletişim — Paws of Hope'),
                    ta('description', 'Açıklama', 'Bizimle iletişime geçin. WhatsApp, telefon, e-posta veya Instagram üzerinden ulaşabilirsiniz.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'İletişim'),
                ta('subtitle', 'Alt Başlık', 'Bizimle iletişime geçmekten çekinmeyin.'),
                {
                  name: 'whatsapp',
                  label: 'WhatsApp',
                  type: 'group',
                  fields: [
                    t('label', 'Etiket', 'WhatsApp'),
                    t('description', 'Açıklama', 'Bize WhatsApp üzerinden yazın.'),
                    t('message', 'Mesaj', 'Merhaba, Paws of Hope hakkında bilgi almak istiyorum.'),
                  ],
                },
                {
                  name: 'phone',
                  label: 'Telefon',
                  type: 'group',
                  fields: [
                    t('label', 'Etiket', 'Telefon'),
                    t('description', 'Açıklama', 'Bizi arayabilirsiniz.'),
                  ],
                },
                {
                  name: 'email',
                  label: 'E-posta',
                  type: 'group',
                  fields: [
                    t('label', 'Etiket', 'E-posta'),
                    t('description', 'Açıklama', 'E-posta gönderin.'),
                  ],
                },
                {
                  name: 'instagram',
                  label: 'Instagram',
                  type: 'group',
                  fields: [
                    t('label', 'Etiket', 'Instagram'),
                    t('description', 'Açıklama', 'Bizi Instagram\'da takip edin.'),
                  ],
                },
              ],
            },
            {
              name: 'notFound',
              label: '404',
              type: 'group',
              fields: [
                t('title', 'Başlık', 'Sayfa Bulunamadı'),
                ta('message', 'Mesaj', 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'),
                t('goHome', 'Ana Sayfa', 'Ana Sayfaya Git'),
                t('viewAnimals', 'Canlarımız', 'Canlarımız'),
                t('donate', 'Destek Ol', 'Destek Ol'),
              ],
            },
          ],
        },

        {
          label: 'Ana Sayfa (Ek)',
          fields: [
            {
              name: 'home',
              label: 'Ana Sayfa',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Paws of Hope — Sokak Hayvanlarına Umut'),
                    ta('description', 'Açıklama', 'Sokak hayvanlarının bakım, tedavi ve sıcak bir yuva bulmasına yardımcı oluyoruz.'),
                  ],
                },
                {
                  name: 'instagram',
                  label: 'Instagram',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Instagram\'da Biz'),
                    t('followUs', 'Takip Et', 'Takip Et'),
                  ],
                },
                {
                  name: 'volunteerCta',
                  label: 'Gönüllü CTA',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Gönüllü Ol'),
                    ta('description', 'Açıklama', 'Sokak hayvanları için bir fark yaratmak ister misiniz? Besleme, tedavi, geçici bakım veya farkındalık çalışmalarımıza katılın.'),
                    t('cta', 'CTA', 'Gönüllü Ol →'),
                  ],
                },
              ],
            },
            {
              name: 'ourWork',
              label: 'Çalışmalarımız',
              type: 'group',
              fields: [
                {
                  name: 'meta',
                  label: 'SEO',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Çalışmalarımız — Paws of Hope'),
                    ta('description', 'Açıklama', 'Besleme, tedavi, kısırlaştırma, acil müdahale, aşılama ve barınma çalışmalarımızı keşfedin.'),
                  ],
                },
                t('title', 'Sayfa Başlığı', 'Çalışmalarımız'),
                ta('subtitle', 'Alt Başlık', 'Sokak hayvanları için yaptığımız çalışmaları keşfedin.'),
                {
                  name: 'stats',
                  label: 'İstatistikler',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Etkimiz'),
                    t('treated', 'Tedavi Edilen', 'Tedavi Edilen'),
                    t('spayed', 'Kısırlaştırılan', 'Kısırlaştırılan'),
                    t('vaccinated', 'Aşılanan', 'Aşılanan'),
                    t('feedingPoints', 'Besleme Noktası', 'Besleme Noktası'),
                    t('cats', 'Kedi', 'Kedi'),
                    t('dogs', 'Köpek', 'Köpek'),
                  ],
                },
                {
                  name: 'process',
                  label: 'Süreç',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Nasıl Çalışıyoruz'),
                    t('step1Title', 'Adım 1 Başlık', 'Bildirim'),
                    ta('step1Desc', 'Adım 1 Açıklama', 'Vatandaşlardan gelen bildirimlerle ihtiyaç sahibi hayvanları tespit ediyoruz.'),
                    t('step2Title', 'Adım 2 Başlık', 'Müdahale'),
                    ta('step2Desc', 'Adım 2 Açıklama', 'Ekibimiz en kısa sürede bildirilen lokasyona giderek müdahale ediyor.'),
                    t('step3Title', 'Adım 3 Başlık', 'Tedavi'),
                    ta('step3Desc', 'Adım 3 Açıklama', 'Veteriner hekimlerle iş birliği içinde gerekli tedaviyi sağlıyoruz.'),
                    t('step4Title', 'Adım 4 Başlık', 'Takip'),
                    ta('step4Desc', 'Adım 4 Açıklama', 'Tedavi sonrasında uzun vadeli takip ve bakım sürecini yönetiyoruz.'),
                  ],
                },
                {
                  name: 'faq',
                  label: 'SSS',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Sık Sorulan Sorular'),
                    t('q1', 'Soru 1', 'Ne tür hayvanlara yardım ediyorsunuz?'),
                    ta('a1', 'Cevap 1', 'Başta kediler ve köpekler olmak üzere tüm sokak hayvanlarına yardım ediyoruz.'),
                    t('q2', 'Soru 2', 'Acil bir hayvan gördüm, ne yapmalıyım?'),
                    ta('a2', 'Cevap 2', 'WhatsApp hattımızdan bize ulaşarak hayvanın konumunu ve durumunu bildirin.'),
                    t('q3', 'Soru 3', 'Çalışmalarınızı nasıl destekleyebilirim?'),
                    ta('a3', 'Cevap 3', 'Bağış yapabilir, gönüllü olabilir veya ihtiyaç listemizdeki malzemeleri temin edebilirsiniz.'),
                    t('q4', 'Soru 4', 'Tedavi masraflarını nasıl karşılıyorsunuz?'),
                    ta('a4', 'Cevap 4', 'Bağışçılarımızın desteği ve veteriner ortaklıklarımız sayesinde tedavi masraflarını karşılıyoruz.'),
                  ],
                },
                {
                  name: 'divider',
                  label: 'Bant Yazıları',
                  type: 'group',
                  fields: [
                    t('text1', 'Yazı 1', 'BESLEME'),
                    t('text2', 'Yazı 2', 'TEDAVİ'),
                    t('text3', 'Yazı 3', 'KISIRLAŞTIRMA'),
                    t('text4', 'Yazı 4', 'AŞILAMA'),
                  ],
                },
                {
                  name: 'cta',
                  label: 'CTA',
                  type: 'group',
                  fields: [
                    t('title', 'Başlık', 'Birlikte Daha Güçlüyüz'),
                    ta('description', 'Açıklama', 'Her katkı bir hayat kurtarır. Çalışmalarımıza destek olun.'),
                    t('donateLabel', 'Bağış Butonu', 'DESTEK OL'),
                    t('volunteerLabel', 'Gönüllü Butonu', 'GÖNÜLLÜ OL'),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateUIStrings],
  },
}
