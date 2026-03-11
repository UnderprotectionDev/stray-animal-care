import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const NeedsList: CollectionConfig<'needs-list'> = {
  slug: 'needs-list',
  enableQueryPresets: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  labels: { singular: 'İhtiyaç Listesi', plural: 'İhtiyaç Listeleri' },
  admin: {
    defaultColumns: ['productName', 'urgency', 'stockStatus', 'order'],
    group: 'Destek & Raporlar',
    useAsTitle: 'productName',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'productName',
      label: 'Ürün Adı',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'brandDetail',
      label: 'Marka / Detay',
      type: 'text',
      localized: true,
    },
    {
      name: 'urgency',
      label: 'Aciliyet',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Acil', value: 'acil' },
        { label: 'Orta', value: 'orta' },
        { label: 'Yeterli', value: 'yeterli' },
      ],
    },
    {
      name: 'stockStatus',
      label: 'Stok Durumu',
      type: 'text',
      localized: true,
    },
    {
      name: 'order',
      label: 'Sıralama',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
