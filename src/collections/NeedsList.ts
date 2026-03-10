import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const NeedsList: CollectionConfig<'needs-list'> = {
  slug: 'needs-list',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['productName', 'urgency', 'stockStatus', 'order'],
    group: 'Support',
    useAsTitle: 'productName',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'productName',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'brandDetail',
      type: 'text',
      localized: true,
    },
    {
      name: 'urgency',
      type: 'select',
      required: true,
      options: [
        { label: 'Acil', value: 'acil' },
        { label: 'Orta', value: 'orta' },
        { label: 'Yeterli', value: 'yeterli' },
      ],
    },
    {
      name: 'stockStatus',
      type: 'text',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
