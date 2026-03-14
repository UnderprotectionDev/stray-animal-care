import type { Block } from 'payload'

export const SuccessStoriesBlock: Block = {
  slug: 'homeSuccessStories',
  labels: { singular: 'Başarı Hikayeleri', plural: 'Başarı Hikayeleri' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Başarı Hikayeleri', label: 'Bölüm Başlığı' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör', label: 'Tümünü Gör Etiketi' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/acil-vakalar', label: 'Tümünü Gör Linki' },
    { name: 'limit', type: 'number', defaultValue: 4, min: 1, max: 8, label: 'Gösterilecek Sayı' },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'before', type: 'text', localized: true, defaultValue: 'Önce', label: 'Önce' },
        { name: 'after', type: 'text', localized: true, defaultValue: 'Sonra', label: 'Sonra' },
        { name: 'completed', type: 'text', localized: true, defaultValue: 'TAMAMLANDI', label: 'Tamamlandı' },
        { name: 'collected', type: 'text', localized: true, defaultValue: 'Toplanan', label: 'Toplanan' },
        { name: 'target', type: 'text', localized: true, defaultValue: 'Hedef', label: 'Hedef' },
        { name: 'funded', type: 'text', localized: true, defaultValue: 'fonlandı', label: 'Fonlandı' },
      ],
    },
  ],
}
