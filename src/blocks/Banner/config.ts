import type { Block } from 'payload'

import { simpleRichText } from '@/fields/lexical'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Bilgi', value: 'info' },
        { label: 'Uyarı', value: 'warning' },
        { label: 'Hata', value: 'error' },
        { label: 'Başarılı', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: simpleRichText(),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}
