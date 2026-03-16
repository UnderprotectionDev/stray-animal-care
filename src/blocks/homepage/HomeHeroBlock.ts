import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  labels: { singular: 'Ana Görsel', plural: 'Ana Görsel' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, label: 'Bölüm Başlığı', defaultValue: 'ANA SAYFA' },
    { name: 'content', type: 'richText', editor: defaultLexical, localized: true, label: 'İçerik' },
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
    { name: 'leftImage', type: 'upload', relationTo: 'media', label: 'Sol Görsel' },
    { name: 'rightImage', type: 'upload', relationTo: 'media', label: 'Sağ Görsel' },
  ],
}
