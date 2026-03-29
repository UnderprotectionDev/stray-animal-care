import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post4: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'cesurun-hikayesi-terk-edilmis-bir-dostun-yeniden-dogusu',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Deprem sonrası sahipleri tarafından terk edilen Cesur, sokaklarda haftalarca tek başına hayatta kaldı. Bu onun hikayesi.'),
      heading('Boş Bir Bahçede Bekleyen Köpek'),
      paragraph('Cesur\'u ilk kez Hatay\'ın Antakya ilçesinde, terk edilmiş bir evin bahçesinde gördük. Depremden hasar görmüş binanın önünde, sanki sahiplerinin dönmesini bekliyormuş gibi oturuyordu. Komşular anlattı: depremden önce o evde yaşayan bir aile vardı. Deprem sonrası başka şehre taşınmak zorunda kalmışlar, köpeklerini bırakıp gitmişlerdi.'),
      paragraph('Cesur zayıflamıştı, kaburgaları sayılıyordu. Ama insanlara karşı hâlâ güven dolu gözlerle bakıyordu — belli ki daha önce sevgi görmüş, eve alışmış bir köpekti. Yanına yaklaştığımızda kuyruğunu salladı.'),
      mediaBlock(blockImage.id),
      heading('Yavaş Ama Kararlı Bir İyileşme'),
      paragraph('Veteriner kontrolünde ciddi bir sağlık sorunu yoktu — sadece yetersiz beslenme ve hafif parazit. Düzenli mama, vitamin takviyesi ve bol sevgiyle kısa sürede toparlandı. Kısırlaştırma ve aşıları tamamlandı. Cesur adını hak ediyordu: tüm bu süreci büyük bir sakinlikle atlattı.'),
      paragraph('Bugün kalıcı bakımımız altında, besleme noktalarındaki en sadık misafirimiz. Her sabah tam saatinde orada, kuyruğunu sallayarak bizi karşılıyor. Deprem birçok hayvanı sahipsiz bıraktı ama Cesur gibi dostlar yeni bir aile buldu.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Deprem sonrası sahipleri tarafından terk edilen Cesur\'un bulunma ve iyileşme hikayesi.',
      image: heroImage.id,
      title: 'Cesur\'un Hikayesi: Terk Edilmiş Bir Dostun Yeniden Doğuşu',
    },
    relatedPosts: [],
    title: 'Cesur\'un Hikayesi: Terk Edilmiş Bir Dostun Yeniden Doğuşu',
  }
}
