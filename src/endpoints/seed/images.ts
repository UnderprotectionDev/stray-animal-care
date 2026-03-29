import type { Media } from '@/payload-types'
import { simpleLexicalContent } from './factories'

type SeedImage = {
  meta: Omit<Media, 'createdAt' | 'id' | 'updatedAt'>
  url: string
}

// ── Animal Profiles ──────────────────────────────────────────────
export const imgPortakal: SeedImage = {
  meta: {
    alt: 'Portakal — 3 yaşında turuncu tekir kedi, pencere kenarında güneşleniyor',
  },
  url: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=1200&q=80',
}

export const imgFindik: SeedImage = {
  meta: {
    alt: 'Fındık — 1 yaşında kahverengi genç kedi, meraklı bakışlarla kameraya bakıyor',
  },
  url: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=1200&q=80',
}

export const imgCesur: SeedImage = {
  meta: {
    alt: 'Cesur — 4 yaşında Kangal köpeği, sadık ve güçlü duruşuyla poz veriyor',
  },
  url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
}

export const imgZeytin: SeedImage = {
  meta: {
    alt: 'Zeytin — 2 yaşında siyah melez köpek, hüzünlü gözlerle bakıyor',
  },
  url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&q=80',
}

// ── Hero Images ──────────────────────────────────────────────────
export const imgHeroHome: SeedImage = {
  meta: {
    alt: 'Sokak kedisi şehir silueti önünde oturuyor — Paws of Hope ana sayfa',
  },
  url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1600&q=80',
}

export const imgHeroGeneral: SeedImage = {
  meta: {
    alt: 'Sokak köpeği kentsel manzarada yürüyor',
  },
  url: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=1600&q=80',
}

// ── Blog Post Images ─────────────────────────────────────────────
export const imgPostDeprem: SeedImage = {
  meta: {
    alt: 'Deprem sonrası enkazda kurtarılmayı bekleyen kedi',
    caption: simpleLexicalContent(['Deprem sonrası kurtarma çalışmalarından bir kare.']),
  },
  url: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&q=80',
}

export const imgPostPortakal: SeedImage = {
  meta: {
    alt: 'Mutlu turuncu tekir kedi yeni yuvasında',
    caption: simpleLexicalContent(["Portakal'ın tedavi sonrası yeni hayatından bir görüntü."]),
  },
  url: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=1200&q=80',
}

export const imgPostKis: SeedImage = {
  meta: {
    alt: 'Karlı sokakta yemek yiyen sokak kedileri',
    caption: simpleLexicalContent(['Kış aylarında besleme noktalarından bir kare.']),
  },
  url: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=1200&q=80',
}

export const imgPostCesur: SeedImage = {
  meta: {
    alt: 'Bakımlı ve sağlıklı büyük köpek parkta yürüyor',
    caption: simpleLexicalContent(["Cesur'un dönüşüm hikayesinden bir kare."]),
  },
  url: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=1200&q=80',
}

export const imgPostKisir: SeedImage = {
  meta: {
    alt: 'Veteriner kliniğinde kedi muayenesi',
    caption: simpleLexicalContent(['Kısırlaştırma kampanyasından bir görüntü.']),
  },
  url: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=1200&q=80',
}

export const imgPostFindik: SeedImage = {
  meta: {
    alt: 'İyileşme sürecinde battaniyeye sarılmış yavru kedi',
    caption: simpleLexicalContent(["Fındık'ın tedavi sürecinden bir kare."]),
  },
  url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=1200&q=80',
}

export const imgPostBesleme: SeedImage = {
  meta: {
    alt: 'Sokak kedileri mama kaplarının başında besleniyor',
    caption: simpleLexicalContent(['Günlük besleme turumuzdan bir görüntü.']),
  },
  url: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=1200&q=80',
}

export const imgPostEtkinlik: SeedImage = {
  meta: {
    alt: 'Hayvan sahiplendirme etkinliğinde gönüllüler ve köpekler',
    caption: simpleLexicalContent(['Topluluk etkinliğimizden bir kare.']),
  },
  url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80',
}

export const imgPostZeytin: SeedImage = {
  meta: {
    alt: 'Tedavi gören yaralı köpek veterinerde',
    caption: simpleLexicalContent(["Zeytin'in tedavi günlüğünden bir görüntü."]),
  },
  url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&q=80',
}

// ── Emergency / Emotional ────────────────────────────────────────
export const imgEmergencyVet: SeedImage = {
  meta: {
    alt: 'Veteriner kliniğinde tedavi edilen sokak köpeği',
  },
  url: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=1200&q=80',
}

export const imgEmergencyStreet: SeedImage = {
  meta: {
    alt: 'Soğuk yağmurlu bir günde sokakta bekleyen yalnız kedi',
  },
  url: 'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?w=1200&q=80',
}

// ── Before/After (Emergency Cases) ───────────────────────────────
export const imgBeforeZeytin: SeedImage = {
  meta: {
    alt: 'Zeytin — trafik kazası sonrası tedavi öncesi hali',
  },
  url: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=1200&q=80',
}

export const imgAfterZeytin: SeedImage = {
  meta: {
    alt: 'Zeytin — tedavi sonrası iyileşmiş ve sağlıklı hali',
  },
  url: 'https://images.unsplash.com/photo-1587559070757-f72a388edbba?w=1200&q=80',
}

export const imgBeforeFindik: SeedImage = {
  meta: {
    alt: 'Fındık — üst solunum yolu enfeksiyonu tedavi öncesi',
  },
  url: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=1200&q=80',
}

export const imgAfterFindik: SeedImage = {
  meta: {
    alt: 'Fındık — tedavi sonrası sağlıklı ve oyuncu hali',
  },
  url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1200&q=80',
}

// ── Story Steps (Hikayemiz & Misyon) ─────────────────────────────
export const imgStoryDeprem: SeedImage = {
  meta: {
    alt: 'Deprem sonrası yıkıntılar arasında yardım bekleyen sokak hayvanları',
  },
  url: 'https://images.unsplash.com/photo-1504006833117-8886a355efbf?w=1200&q=80',
}

export const imgStoryFeeding: SeedImage = {
  meta: {
    alt: 'İlk besleme noktasında mama bekleyen sokak kedileri',
  },
  url: 'https://images.unsplash.com/photo-1570824104453-508955ab713e?w=1200&q=80',
}

export const imgStoryVet: SeedImage = {
  meta: {
    alt: 'Veteriner kliniğinde tedavi gören sokak hayvanı',
  },
  url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1200&q=80',
}

export const imgStoryCommunity: SeedImage = {
  meta: {
    alt: 'Gönüllüler ve topluluk bir arada sokak hayvanları için çalışıyor',
  },
  url: 'https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=1200&q=80',
}

// ── Activity ─────────────────────────────────────────────────────
export const imgActivityFeeding: SeedImage = {
  meta: {
    alt: 'Gönüllüler sokak hayvanlarını besliyor',
  },
  url: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=1200&q=80',
}

/** All images in fetch order */
export const allImages = [
  imgPortakal, imgFindik, imgCesur, imgZeytin,
  imgHeroHome, imgHeroGeneral,
  imgPostDeprem, imgPostPortakal, imgPostKis, imgPostCesur,
  imgPostKisir, imgPostFindik, imgPostBesleme, imgPostEtkinlik, imgPostZeytin,
  imgEmergencyVet, imgEmergencyStreet,
  imgBeforeZeytin, imgAfterZeytin, imgBeforeFindik, imgAfterFindik,
  imgStoryDeprem, imgStoryFeeding, imgStoryVet, imgStoryCommunity,
  imgActivityFeeding,
] as const
