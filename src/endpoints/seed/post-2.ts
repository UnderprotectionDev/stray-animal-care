import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post2: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'portakalin-kurtarilis-hikayesi',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Hatay\'da yıkılmış bir binanın kenarında bulunan turuncu kedimiz Portakal\'ın tedavi süreci ve yeni hayatı.'),
      heading('Yıkıntıların Arasından Gelen Ses'),
      paragraph('Deprem sonrası Hatay\'da besleme turu yapıyorduk. En çok zarar gören mahallelerden birinde, yarı yıkık bir binanın kenarından zayıf bir miyavlama sesi geldi. Yaklaştığımızda molozların arasına sığınmış, bitkin ama gözleri hâlâ ışıl ışıl parlayan turuncu bir kedi bulduk.'),
      paragraph('Muhtemelen sahiplerinin terk ettiği ya da kaybettiği bir evde yaşamış, deprem sonrası sokakta kalmıştı. Titreyen küçük bedeni kucağımıza aldığımızda hâlâ mırıldanıyordu. O andan itibaren adı Portakal oldu.'),
      mediaBlock(blockImage.id),
      heading('Zor Bir Tedavi Süreci'),
      paragraph('Portakal\'ı hemen veterinere götürdük. Ciddi dehidrasyon, üst solunum yolu enfeksiyonu ve uyuz tespit edildi. İlk günler kritikti — damar yoluyla sıvı desteği, antibiyotik ve uyuz tedavisi birlikte başlatıldı. Yemek yemiyordu, enjektörle mama veriyorduk.'),
      paragraph('Üçüncü günde ilk kez kendi başına mama yedi. O anı unutamıyoruz — küçük bir zafer gibi hissettik. İki hafta süren yoğun tedavinin ardından tüyleri parlamaya, kilosu artmaya başladı. Artık pencere kenarında güneşlenip mırıldanan, oyun oynamak isteyen bir kedi vardı karşımızda.'),
      heading('Şimdi Nerede?'),
      paragraph('Bugün Portakal kalıcı bakımımız altında sağlıklı ve mutlu bir şekilde yaşıyor. Kısırlaştırıldı, aşıları tamamlandı. Her sabah mama saatini bilen bir rutini var artık — kapı açılır açılmaz koşarak geliyor.'),
      paragraph('Portakal\'ın hikayesi, deprem sonrası sokaklarda hayata tutunan yüzlerce hayvanın sadece biri. Her birinin bir ismi, bir hikayesi ve yardıma ihtiyacı var. Sizin desteğinizle daha fazla Portakal\'a ulaşabiliriz.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Hatay\'da deprem sonrası bulunan Portakal\'ın tedavi süreci ve yeni hayatının hikayesi.',
      image: heroImage.id,
      title: 'Portakal\'ın Kurtuluş Hikayesi',
    },
    relatedPosts: [], // this is populated by the seed script
    title: 'Portakal\'ın Kurtuluş Hikayesi',
  }
}
