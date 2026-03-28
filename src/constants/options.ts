import type { Option } from 'payload'

export const ANIMAL_TYPE_OPTIONS: Option[] = [
  { label: 'Kedi', value: 'kedi' },
  { label: 'Köpek', value: 'kopek' },
]

export const ANIMAL_GENDER_OPTIONS: Option[] = [
  { label: 'Erkek', value: 'erkek' },
  { label: 'Dişi', value: 'disi' },
  { label: 'Bilinmiyor', value: 'bilinmiyor' },
]

export const ANIMAL_STATUS_OPTIONS: Option[] = [
  { label: 'Tedavide', value: 'tedavide' },
  { label: 'Kalıcı Bakım', value: 'kalici-bakim' },
  { label: 'Acil', value: 'acil' },
]

export const EVENT_TYPE_OPTIONS: Option[] = [
  { label: 'Sahiplendirme', value: 'sahiplendirme' },
  { label: 'Mama Toplama', value: 'mama-toplama' },
  { label: 'Bakım Günü', value: 'bakim-gunu' },
  { label: 'Eğitim', value: 'egitim' },
  { label: 'Diğer', value: 'diger' },
]

export const EVENT_STATUS_OPTIONS: Option[] = [
  { label: 'Yaklaşan', value: 'yaklasan' },
  { label: 'Devam Ediyor', value: 'devam-ediyor' },
  { label: 'Tamamlandı', value: 'tamamlandi' },
  { label: 'İptal', value: 'iptal' },
]

export const VOLUNTEER_AREA_OPTIONS: Option[] = [
  { label: 'Besleme', value: 'besleme' },
  { label: 'Tedavi', value: 'tedavi' },
  { label: 'Nakliye', value: 'nakliye' },
  { label: 'Sahiplendirme', value: 'sahiplendirme' },
  { label: 'Etkinlik', value: 'etkinlik' },
]

export const APPLICATION_STATUS_OPTIONS: Option[] = [
  { label: 'Beklemede', value: 'beklemede' },
  { label: 'Onaylandı', value: 'onaylandi' },
  { label: 'Reddedildi', value: 'reddedildi' },
]

export const SOCIAL_PLATFORM_OPTIONS: Option[] = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'X (Twitter)', value: 'x-twitter' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'GitHub', value: 'github' },
  { label: 'Web Sitesi', value: 'website' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Telefon', value: 'phone' },
  { label: 'E-posta', value: 'email' },
  { label: 'Diğer', value: 'other' },
]
