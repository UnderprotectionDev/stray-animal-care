import { RequiredDataFromCollectionSlug } from 'payload'
import type { PostArgs } from './post-1'
import { heading, paragraph, mediaBlock, lexicalRoot } from './factories'

export const post7: (args: PostArgs) => RequiredDataFromCollectionSlug<'posts'> = ({
  heroImage,
  blockImage,
  author,
}) => {
  return {
    slug: 'bir-besleme-turunun-hikayesi',
    _status: 'published',
    authors: [author],
    content: lexicalRoot([
      heading('Sabah 6\'da başlayan, 3 saat süren ve yaklaşık 100 cana dokunan bir günün kaydı.'),
      heading('Sabah 06:00 — Hazırlık'),
      paragraph('Gün başlamadan mama poşetlerini tartıyor, su bidonlarını dolduruyor ve arabanın bagajına yüklüyoruz. Bugünkü tur için yaklaşık 8 kilo kedi maması, 5 kilo köpek maması ve 20 litre su hazırladık. İlaç çantamız da yanımızda — göz damlası, yara spreyi ve parazit ilacı her zaman arabada bulunur.'),
      heading('06:30 — İlk Nokta: Pazar Yeri Arkası'),
      paragraph('İlk besleme noktamız şehir merkezindeki pazar yerinin arkası. Burası yaklaşık 25-30 kedinin düzenli uğradığı bir alan. Arabayı park ettiğimizde zaten birkaçı bizi bekliyordu — mama poşetinin sesini tanıyorlar. Kaplara mama ve temiz su koyuyoruz. Bir kedinin gözünde akıntı var, göz damlası uyguluyoruz. Durumu kötüleşirse veterinere götürmemiz gerekecek.'),
      mediaBlock(blockImage.id),
      heading('07:15 — İkinci Nokta: Okul Çevresi'),
      paragraph('İkinci noktamız bir okulun çevresindeki park alanı. Burada hem kediler hem de köpekler var — toplam yaklaşık 35 hayvan. Köpekler daha çekingen, ama düzenli geldiğimiz için artık yaklaşıyorlar. Cesur burada — her zamanki gibi kuyruğunu sallayarak karşılıyor. Köpek mamalarını ayrı kaplara koyuyoruz, kedilerin yerlerine köpeklerin ulaşamayacağı yükseltilmiş noktalar hazırladık.'),
      heading('08:30 — Üçüncü Nokta ve Dönüş'),
      paragraph('Son noktamız bir sanayi bölgesinin kenarı. Burada daha az hayvan var ama hepsi düzenli bakıma ihtiyaç duyuyor. Kalan mamayı ve suyu bırakıyoruz. Kapları temizleyip yenileriyle değiştiriyoruz. Toplam 3 saat, yaklaşık 100 hayvana ulaştık. Eve dönerken yarınki tur için mama stokunu kontrol ediyoruz — azalıyor, yeni destek lazım.'),
      paragraph('Bu tur her gün, yağmurda, karda, yazın sıcağında tekrarlanıyor. Monoton gibi görünebilir ama her günün kendine özgü sürprizleri var — yeni bir yavru, iyileşen bir yara, ilk kez yaklaşan çekingen bir kedi. Bu anlar bizi motive ediyor.'),
    ]),
    heroImage: heroImage.id,
    meta: {
      description:
        'Sabah 6\'dan itibaren 3 besleme noktasında yaklaşık 100 hayvanı beslediğimiz bir günün detaylı kaydı.',
      image: heroImage.id,
      title: 'Bir Besleme Turunun Hikayesi',
    },
    relatedPosts: [],
    title: 'Bir Besleme Turunun Hikayesi',
  }
}
