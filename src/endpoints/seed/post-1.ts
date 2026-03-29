import type { Media, User } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export type PostArgs = {
  heroImage: Media
  blockImage: Media
  author: User
}

export const post1: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'deprem-sonrasi-sokaklarda-hayat-mucadelesi',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('6 Şubat 2023 depremi, on binlerce insanın yanı sıra sokaklardaki binlerce hayvanın da hayatını alt üst etti. İşte o günden bu yana yaşananlar.'),
      heading('Depremin Görünmeyen Mağdurları'),
      paragraph('Deprem haberleri her yerde insanların dramını anlattı — ama sokaklarda sessizce acı çeken binlerce kedi ve köpekten çok az söz edildi. Hatay ve Malatya başta olmak üzere depremden etkilenen şehirlerde sahipleri hayatını kaybeden ya da göç etmek zorunda kalan evcil hayvanlar bir anda sokağa kaldı. Zaten sokakta yaşayan hayvanların besleme noktaları yıkıldı, düzenli su ve mama bırakan insanlar artık yoktu.'),
      paragraph('Kışın soğuğunda aç, susuz ve yaralı hayvanlar sokaklarda hayatta kalmaya çalışıyordu. Veteriner klinikleri hasar görmüştü, ilaç ve malzeme bulmak bile zordu. Her köşede yardıma muhtaç bir can vardı.'),
      heading('İyileşmenin Başladığı Yer'),
      paragraph('Deprem hepimizi derinden sarstı. Yakınlarımızı kaybettik, doğduğumuz şehrin yıkılışını izledik. Ama tam da bu en karanlık dönemde, sokak hayvanlarına uzanan el aynı zamanda kendi iyileşmemizin de başlangıcı oldu. İlk günlerde birkaç noktaya mama bırakarak başladık. Zamanla bu birkaç nokta düzenli besleme turlarına dönüştü.'),
      mediaBlock(blockImage.id),
      heading('Bugün Neredeyiz?'),
      paragraph('Bugün hem Hatay\'da hem de Malatya\'da her gün yaklaşık 100 kedi ve köpeğin beslenmesine katkı sağlıyoruz. Sadece mama değil — kısırlaştırma çalışmalarına destek veriyor, hasta ve yaralı hayvanların veterinere ulaşmasına yardımcı oluyoruz. Tüm bu çalışmaları büyük ölçüde bireysel imkanlarla yürütüyoruz.'),
      paragraph('Hedefimiz bu çalışmaları sizlerin desteğiyle daha sürdürülebilir hale getirmek ve daha fazla hayvana ulaşabilmek. Her mama poşeti, her veteriner ziyareti, her paylaşım fark yaratıyor.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        '2023 depreminin ardından Hatay ve Malatya sokaklarında hayvanlar için başlayan besleme ve tedavi çalışmalarının hikayesi.',
      image: heroImage.id,
      title: 'Deprem Sonrası Sokaklarda Hayat Mücadelesi',
    },
    relatedPosts: [],
    title: 'Deprem Sonrası Sokaklarda Hayat Mücadelesi',
  }
}
