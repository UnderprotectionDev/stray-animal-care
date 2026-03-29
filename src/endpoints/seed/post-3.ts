import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post3: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'kis-geliyor-sokak-hayvanlari-icin-hazirliklar',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Soğuk aylar kapıda. Besleme noktalarını kışa hazırlıyoruz ve desteğinize her zamankinden çok ihtiyacımız var.'),
      heading('Kış Neden Bu Kadar Kritik?'),
      paragraph('Kış ayları sokak hayvanları için yılın en zorlu dönemi. Özellikle Malatya gibi karasal iklime sahip şehirlerde gece sıcaklıkları eksi 15\'e kadar düşebiliyor. Hayvanların vücut ısısını korumak için kalori ihtiyacı neredeyse iki katına çıkıyor. Temiz su kaynakları donuyor, yiyecek bulmak zorlaşıyor. Hasta ve yaşlı hayvanlar için bu koşullar hayati tehlike oluşturuyor.'),
      heading('Besleme Noktalarını Hazırlıyoruz'),
      paragraph('Mevcut 3 besleme noktamızı kış koşullarına göre yeniden düzenliyoruz. Rüzgar ve yağmurdan korunaklı alanlar oluşturuyor, donmayı engellemek için yalıtımlı su kapları yerleştiriyoruz. Mama miktarlarını artırıyoruz çünkü soğukta hayvanlar daha çok yiyor. Ayrıca yeni mahallelerden gelen talepler doğrultusunda ek besleme noktaları açmayı planlıyoruz.'),
      mediaBlock(blockImage.id),
      heading('En Çok İhtiyaç Duyduğumuz Malzemeler'),
      paragraph('Kış döneminde en acil ihtiyaçlarımız kuru mama (kedi ve köpek), konserve mama, kedi kumu ve battaniye. Mama stokumuz şu an kritik seviyede — sadece birkaç günlük yetecek kadar kaldı. Online sipariş vererek adresimize gönderim yapabilir, IBAN üzerinden maddi destek sağlayabilir veya besleme turlarına gönüllü olarak katılabilirsiniz.'),
      paragraph('Unutmayın: bir poşet mama, bir hayvanın bir hafta boyunca karnının doyması demek. Küçük gibi görünen her katkı, soğukta titreyen bir can için büyük fark yaratıyor.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Kış ayları öncesi sokak hayvanları için besleme noktası hazırlıkları ve acil ihtiyaç listesi.',
      image: heroImage.id,
      title: 'Kış Geliyor: Sokak Hayvanları İçin Hazırlıklar',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Kış Geliyor: Sokak Hayvanları İçin Hazırlıklar',
  }
}
