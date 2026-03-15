import type { Block } from 'payload'

import { contentRichText } from '@/fields/lexical'
import { linkGroup } from '../../fields/linkGroup'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      editor: contentRichText({ headingSizes: ['h1', 'h2', 'h3', 'h4'] }),
      label: false,
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    plural: 'Eylem Çağrıları',
    singular: 'Eylem Çağrısı',
  },
}
