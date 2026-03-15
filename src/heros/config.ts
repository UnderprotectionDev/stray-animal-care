import type { Field } from 'payload'

import { contentRichText } from '@/fields/lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Tür',
      options: [
        {
          label: 'Yok',
          value: 'none',
        },
        {
          label: 'Yüksek Etki',
          value: 'highImpact',
        },
        {
          label: 'Orta Etki',
          value: 'mediumImpact',
        },
        {
          label: 'Düşük Etki',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: contentRichText({ headingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
