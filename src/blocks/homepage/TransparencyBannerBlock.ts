import type { Block } from 'payload'
import { enabledField } from '@/fields/homepageFields'

export const TransparencyBannerBlock: Block = {
  slug: 'homeTransparencyBanner',
  labels: { singular: 'Şeffaflık Bannerı', plural: 'Şeffaflık Bannerı' },
  fields: [
    enabledField(),
    { name: 'title', type: 'text', localized: true, defaultValue: 'Şeffaflık', label: 'Başlık' },
    { name: 'description', type: 'textarea', localized: true, defaultValue: 'Tüm gelir ve giderlerimizi düzenli olarak paylaşıyoruz.', label: 'Açıklama' },
    { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Raporları Gör', label: 'CTA Metni' },
    { name: 'ctaLink', type: 'text', defaultValue: '/seffaflik', label: 'CTA Linki' },
  ],
}
