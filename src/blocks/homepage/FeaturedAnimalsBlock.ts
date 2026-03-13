import type { Block } from 'payload'

export const FeaturedAnimalsBlock: Block = {
  slug: 'homeFeaturedAnimals',
  labels: { singular: 'Öne Çıkan Hayvanlar', plural: 'Öne Çıkan Hayvanlar' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Canlarımız' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/canlarimiz' },
    { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 12 },
    { name: 'adoptCta', type: 'text', localized: true, defaultValue: 'YUVA OLUN' },
    { name: 'adoptCtaSecondaryLabel', type: 'text', localized: true, defaultValue: 'TÜM LİSTEYİ GÖR →' },
    {
      name: 'typeLabels',
      label: 'Tür Etiketleri',
      type: 'group',
      fields: [
        { name: 'kedi', type: 'text', localized: true, defaultValue: 'Kedi' },
        { name: 'kopek', type: 'text', localized: true, defaultValue: 'Köpek' },
      ],
    },
    {
      name: 'statusLabels',
      label: 'Durum Etiketleri',
      type: 'group',
      fields: [
        { name: 'tedavide', type: 'text', localized: true, defaultValue: 'Tedavide' },
        { name: 'kaliciBakim', type: 'text', localized: true, defaultValue: 'Kalıcı Bakım' },
        { name: 'acil', type: 'text', localized: true, defaultValue: 'Acil' },
      ],
    },
  ],
}
