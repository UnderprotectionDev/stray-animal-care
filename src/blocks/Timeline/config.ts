import type { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: {
    singular: 'Zaman Çizelgesi',
    plural: 'Zaman Çizelgeleri',
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
      name: 'items',
      type: 'array',
      label: 'Öğeler',
      labels: { singular: 'Öğe', plural: 'Öğeler' },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/RowLabels#TimelineRowLabel',
        },
      },
      fields: [
        {
          name: 'time',
          type: 'text',
          label: 'Zaman',
          localized: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Başlık',
          localized: true,
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Açıklama',
          localized: true,
        },
      ],
    },
  ],
}
