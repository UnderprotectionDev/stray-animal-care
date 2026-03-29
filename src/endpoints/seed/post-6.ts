import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post6: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'findik-sogukta-titreyen-bir-yavru',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Malatya\'nın en soğuk gecelerinden birinde, bir çöp konteynerinin arkasında titreyen minicik bir yavru kedi bulduk.'),
      heading('Eksi 10 Derecede Bir Miyavlama'),
      paragraph('Ocak ayının ortasıydı ve Malatya dondurucu bir soğuk dalgasının etkisi altındaydı. Akşam besleme turundaydık — normalde hızlı geçtiğimiz bir sokakta, çöp konteynerinin arkasından çok zayıf bir miyavlama sesi geldi. Eğilip baktığımızda, avucumuzun içine sığacak kadar küçük, fındık rengi bir yavru kedi gördük. Tüyleri ıslaktı, gözleri yapışmıştı, nefes alışı hırıltılıydı.'),
      paragraph('Montumuzun içine sarıp doğruca acil veterinere götürdük. Fındık adını verdik — hem rengi hem de avucumuzda fındık kadar küçük durduğu için.'),
      mediaBlock(blockImage.id),
      heading('Kritik Günler'),
      paragraph('Veteriner ciddi bir üst solunum yolu enfeksiyonu ve hipotermi teşhisi koydu. İlk 48 saat kritikti. Sıcak tutulan bir kutuya yerleştirildi, saat başı enjektörle ılık mama ve ilaç verildi. İkinci gecenin sonunda ateşi düştü ve ilk kez kendi pençesiyle mama kabına uzandı.'),
      paragraph('On gün süren tedavinin ardından Fındık tamamen iyileşti. Bugün sağlıklı, oyuncu ve inanılmaz sevecen bir kedi. Kısırlaştırması yapıldı, aşıları tamamlandı. Kalıcı bakımımız altında güvenle yaşıyor. O soğuk gecede durup dinlemeseydik, Fındık\'ı kaybedebilirdik. Bazen bir hayatı kurtaran şey sadece birkaç saniyelik dikkattir.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Malatya\'da kış soğuğunda bulunan yavru kedi Fındık\'ın kurtarılma ve tedavi hikayesi.',
      image: heroImage.id,
      title: 'Fındık: Soğukta Titreyen Bir Yavru',
    },
    relatedPosts: [],
    title: 'Fındık: Soğukta Titreyen Bir Yavru',
  }
}
