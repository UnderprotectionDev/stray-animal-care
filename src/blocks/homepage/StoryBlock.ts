import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { enabledField, sectionTitleField } from '@/fields/homepageFields'

export const StoryBlock: Block = {
  slug: 'homeStory',
  labels: { singular: 'Hikaye', plural: 'Hikaye' },
  fields: [
    enabledField(),
    sectionTitleField('HİKAYEMİZ & MİSYON'),
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
