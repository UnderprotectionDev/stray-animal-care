import type { Block, Field } from 'payload'

import { contentRichText } from '@/fields/lexical'
import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'Üçte Bir',
        value: 'oneThird',
      },
      {
        label: 'Yarım',
        value: 'half',
      },
      {
        label: 'Üçte İki',
        value: 'twoThirds',
      },
      {
        label: 'Tam',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: contentRichText(),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      labels: { singular: 'Kolon', plural: 'Kolonlar' },
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
