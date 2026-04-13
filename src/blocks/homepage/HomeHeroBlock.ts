import type { Block } from 'payload'
import { enabledField, sectionTitleField } from '@/fields/homepageFields'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  labels: { singular: 'Ana Görsel', plural: 'Ana Görsel' },
  fields: [
    enabledField(),
    sectionTitleField('HER CAN DEĞERLİ'),
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      label: 'Kısa Açıklama',
      defaultValue: "2019'dan bu yana yüzlerce hayvanın hayatına dokunduk.",
    },
    {
      name: 'rotatingWords',
      type: 'array',
      label: 'Rotating Words',
      labels: { singular: 'Word', plural: 'Words' },
      maxRows: 8,
      fields: [
        {
          name: 'word',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
