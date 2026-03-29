import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post5: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'kisirlas-tirma-neden-bu-kadar-onemli',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Sokak hayvanı popülasyonunu kontrol etmenin en insancıl yolu: kısırlaştırma. Neden bu kadar önemli ve biz neler yapıyoruz?'),
      heading('Rakamların Acı Gerçeği'),
      paragraph('Kısırlaştırılmamış bir dişi kedi, yılda ortalama 3 kez doğum yapabilir ve her seferinde 4-6 yavru dünyaya getirebilir. Bu, tek bir kedinin yılda 12-18 yeni yavru anlamına geliyor. İki yıl içinde bu sayı geometrik olarak artıyor. Sokaklarda zaten yeterli mama ve barınma imkanı yokken, kontrolsüz çoğalma hem mevcut hayvanların yaşam kalitesini düşürüyor hem de yeni doğan yavruların büyük çoğunluğunu açlık ve hastalıkla karşı karşıya bırakıyor.'),
      heading('Bizim Yaklaşımımız'),
      paragraph('Bakımımız altına aldığımız her hayvanı kısırlaştırıyoruz. Ayrıca besleme noktalarında düzenli gördüğümüz sahipsiz hayvanları da veterinere götürüp kısırlaştırma işlemini yaptırıyoruz. Şu ana kadar 15 hayvanın kısırlaştırma masrafını karşıladık. Hedefimiz bu sayıyı her ay artırmak.'),
      mediaBlock(blockImage.id),
      heading('Nasıl Destek Olabilirsiniz?'),
      paragraph('Bir kısırlaştırma operasyonunun maliyeti kedilerde ortalama 500-800₺, köpeklerde 800-1.200₺ arasında değişiyor. "Kısırlaştırma sponsoru" olarak belirli bir hayvanın operasyon masrafını karşılayabilirsiniz. Operasyon sonrası fotoğraf ve veteriner belgesiyle bilgilendirme yapıyoruz. Kısırlaştırma, sokak hayvanlarına yapılabilecek en uzun vadeli yatırım.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Sokak hayvanı popülasyonu kontrolünde kısırlaştırmanın önemi ve Paws of Hope\'un çalışmaları.',
      image: heroImage.id,
      title: 'Kısırlaştırma Neden Bu Kadar Önemli?',
    },
    relatedPosts: [],
    title: 'Kısırlaştırma Neden Bu Kadar Önemli?',
  }
}
