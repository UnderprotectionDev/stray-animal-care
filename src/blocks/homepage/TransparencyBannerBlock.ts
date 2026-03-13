import type { Block } from 'payload'

export const TransparencyBannerBlock: Block = {
  slug: 'homeTransparencyBanner',
  labels: { singular: 'Şeffaflık Bannerı', plural: 'Şeffaflık Bannerı' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'title', type: 'text', localized: true, defaultValue: 'Şeffaflık' },
    { name: 'description', type: 'textarea', localized: true, defaultValue: 'Tüm gelir ve giderlerimizi düzenli olarak paylaşıyoruz.' },
    { name: 'ctaLabel', type: 'text', localized: true, defaultValue: 'Raporları Gör' },
    { name: 'ctaLink', type: 'text', defaultValue: '/seffaflik' },
  ],
}
