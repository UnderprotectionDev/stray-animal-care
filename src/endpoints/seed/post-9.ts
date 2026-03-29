import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post9: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'zeytin-trafik-kazasi-ve-tedavi-sureci',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Malatya\'da trafik kazası geçiren Zeytin\'in acil müdahale ve tedavi sürecini anlatıyoruz. Desteğinize ihtiyacımız var.'),
      heading('Acil Çağrı'),
      paragraph('Geçen hafta WhatsApp\'tan bir mesaj aldık: "Ana cadde üzerinde yaralı bir köpek var, kımıldayamıyor." Hemen adrese gittik. Genç, zeytin yeşili gözlü bir dişi köpek yol kenarına sığınmıştı. Arka bacağı anormal bir açıyla duruyordu, ağrıdan inliyordu ama yine de bize güvenle baktı. Onu nazikçe bir battaniyeye sarıp arabaya aldık.'),
      heading('Teşhis ve Tedavi'),
      paragraph('Veterinerdeki röntgen sonucu arka sol bacakta kırık tespit edildi. İç organ hasarı yoktu — bu büyük bir şanstı. Doktor kırığın cerrahi müdahale gerektirdiğini söyledi: plak ve vida ile sabitleme operasyonu. Operasyon başarıyla gerçekleştirildi, Zeytin uyanır uyanmaz kuyruk salladı.'),
      mediaBlock(blockImage.id),
      heading('İyileşme Süreci ve Maliyet'),
      paragraph('Zeytin şu an geçici bakımda, iyileşme sürecinde. Operasyon ve ilaç masrafları toplamda 3.000₺ tutuyor. Şu ana kadar 800₺ karşılayabildik ama kalan 2.200₺ için desteğe ihtiyacımız var. Zeytin\'in tamamen iyileşip yeniden koşabilmesi için bu tedavinin tamamlanması gerekiyor.'),
      paragraph('Trafik kazaları sokak hayvanlarının en sık karşılaştığı tehlikelerden biri. Sürücülerin dikkati, belediye ve vatandaş işbirliğiyle daha güvenli sokaklar oluşturulabilir. Ama şu an en acil olan Zeytin\'in tedavisini tamamlamak. Destek Ol sayfamızdan veya doğrudan IBAN üzerinden katkıda bulunabilirsiniz.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Trafik kazası geçiren Zeytin\'in acil müdahale, operasyon ve tedavi sürecinin hikayesi.',
      image: heroImage.id,
      title: 'Zeytin: Trafik Kazası ve Tedavi Süreci',
    },
    relatedPosts: [],
    title: 'Zeytin: Trafik Kazası ve Tedavi Süreci',
  }
}
