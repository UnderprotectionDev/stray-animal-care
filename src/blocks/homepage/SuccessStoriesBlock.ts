import type { Block } from 'payload'

export const SuccessStoriesBlock: Block = {
  slug: 'homeSuccessStories',
  labels: { singular: 'Başarı Hikayeleri', plural: 'Başarı Hikayeleri' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Başarı Hikayeleri' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/acil-vakalar' },
    { name: 'limit', type: 'number', defaultValue: 4, min: 1, max: 8 },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'before', type: 'text', localized: true, defaultValue: 'Önce' },
        { name: 'after', type: 'text', localized: true, defaultValue: 'Sonra' },
        { name: 'completed', type: 'text', localized: true, defaultValue: 'TAMAMLANDI' },
        { name: 'collected', type: 'text', localized: true, defaultValue: 'Toplanan' },
        { name: 'target', type: 'text', localized: true, defaultValue: 'Hedef' },
        { name: 'funded', type: 'text', localized: true, defaultValue: 'fonlandı' },
      ],
    },
  ],
}
