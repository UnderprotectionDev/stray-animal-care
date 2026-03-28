import type { Block } from 'payload'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  labels: { singular: 'Ana Görsel', plural: 'Ana Görsel' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, label: 'Bölüm Başlığı', defaultValue: 'ANA SAYFA' },
    { name: 'tagline', type: 'text', localized: true, label: 'Kısa Açıklama', defaultValue: "2019'dan bu yana yüzlerce hayvanın hayatına dokunduk." },
    {
      name: 'rotatingWords',
      type: 'array',
      label: 'Rotating Words',
      labels: { singular: 'Word', plural: 'Words' },
      maxRows: 8,
      fields: [
        { name: 'word', type: 'text', localized: true, required: true },
      ],
    },
  ],
}
