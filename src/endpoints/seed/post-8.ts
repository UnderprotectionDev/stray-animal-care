import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post8: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'ilk-mama-toplama-etkinligimiz',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Instagram\'da yaptığımız çağrı beklemediğimiz bir karşılık buldu. İlk mama toplama etkinliğimizin hikayesi.'),
      heading('Bir Hikaye Paylaşmakla Başladı'),
      paragraph('Bir akşam Instagram\'da mama stoğumuzun tükendiğini paylaştık. Sadece durumu anlatmak istemiştik — bir çağrı niyetinde bile değildi. Ertesi sabah uyandığımızda onlarca mesaj vardı: "Nereye gönderelim?", "Hangi mama lazım?", "Ben de yardım etmek istiyorum." Bu ilgi bizi hem şaşırttı hem de derinden mutlu etti.'),
      heading('Etkinlik Günü'),
      paragraph('Mesajlara cevap verirken spontane bir fikir doğdu: bir mama toplama buluşması yapalım. Bir hafta içinde organize ettik — şehir merkezinde bir kafenin bahçesinde, cumartesi öğleden sonra. Sosyal medyada duyurduk ve beklentimiz düşüktü. Belki 5-10 kişi gelir diye düşünüyorduk.'),
      paragraph('Etkinlik gününe 20\'den fazla kişi mama, kedi kumu ve battaniye ile geldi. Toplam 45 kilo kuru mama, 12 kutu kedi kumu ve bir kucak dolusu battaniye toplandı. Ama asıl güzel olan rakamlar değildi — orada tanıştığımız insanların hikayeleri, kendi mahallelerinde besledikleri sokak hayvanlarını anlatmaları, birlikte bir şeyler yapma heyecanıydı.'),
      mediaBlock(blockImage.id),
      heading('Bundan Sonra'),
      paragraph('Bu etkinlik bize çok şey öğretti. Yardım etmek isteyen insanlar var, sadece nasıl yapacaklarını bilmeleri gerekiyor. Bundan sonra düzenli mama toplama günleri organize etmeyi planlıyoruz. Eğer siz de katılmak isterseniz, Instagram hesabımızı takip edin veya WhatsApp üzerinden bize ulaşın. Birlikte daha güçlüyüz.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Instagram\'da başlayan bir çağrının mama toplama etkinliğine dönüşme hikayesi.',
      image: heroImage.id,
      title: 'İlk Mama Toplama Etkinliğimiz',
    },
    relatedPosts: [],
    title: 'İlk Mama Toplama Etkinliğimiz',
  }
}
