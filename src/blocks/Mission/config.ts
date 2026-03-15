import type { Block } from 'payload'

export const MissionBlock: Block = {
  slug: 'mission',
  interfaceName: 'MissionBlock',
  labels: {
    singular: 'Misyon',
    plural: 'Misyonlar',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      localized: true,
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'İçerik',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Görsel',
      relationTo: 'media',
    },
    {
      name: 'goals',
      type: 'array',
      label: 'Hedefler',
      labels: { singular: 'Hedef', plural: 'Hedefler' },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Metin',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      label: 'CTA Metni',
      localized: true,
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Linki',
    },
  ],
}
