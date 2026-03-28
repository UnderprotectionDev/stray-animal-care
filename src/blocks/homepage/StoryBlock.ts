import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const StoryBlock: Block = {
  slug: 'homeStory',
  labels: { singular: 'Hikaye', plural: 'Hikaye' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, label: 'Bölüm Başlığı', defaultValue: 'HİKAYEMİZ & MİSYON' },
    {
      name: 'steps',
      type: 'array',
      label: 'Hikaye Adımları',
      minRows: 1,
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/RowLabels#StoryStepRowLabel',
        },
      },
      fields: [
        { name: 'title', type: 'text', localized: true, required: true, label: 'Adım Başlığı' },
        { name: 'description', type: 'richText', editor: defaultLexical, localized: true, label: 'Açıklama' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Adım Görseli' },
      ],
    },
  ],
}
