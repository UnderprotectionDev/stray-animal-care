import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const NeedsList: CollectionConfig<'needs-list'> = {
  slug: 'needs-list',
  orderable: true,
  enableQueryPresets: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  labels: { singular: 'İhtiyaç Listesi', plural: 'İhtiyaç Listeleri' },
  admin: {
    defaultColumns: ['productName', 'urgency', 'currentStock', 'stockStatus'],
    group: 'Destek & Raporlar',
    useAsTitle: 'productName',
    description: 'İhtiyaç duyulan mama ve malzemelerin stok takibi',
  },
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
      admin: {
        components: {
          Cell: '@/components/admin/cells/StatusBadgeCell#StatusBadgeCell',
        },
      },
    },
    {
      name: 'stockStatus',
      label: 'Stok Durumu',
      type: 'text',
      localized: true,
    },
    {
      name: 'currentStock',
      label: 'Mevcut Stok',
      type: 'number',
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Mevcut stok miktarı',
        components: {
          Cell: '@/components/admin/cells/ProgressBarCell#NeedsProgressCell',
        },
      },
    },
    {
      name: 'targetStock',
      label: 'Hedef Stok',
      type: 'number',
      min: 1,
      required: true,
      admin: {
        description: 'Hedeflenen minimum stok miktarı',
      },
    },
    {
      name: 'unit',
      label: 'Birim',
      type: 'select',
      options: [
        { label: 'Kutu', value: 'kutu' },
        { label: 'Kg', value: 'kg' },
        { label: 'Adet', value: 'adet' },
      ],
      admin: {
        description: 'Ürünün ölçü birimi',
      },
    },
    {
      name: 'priority',
      label: 'Öncelik',
      type: 'select',
      index: true,
      options: [
        { label: 'Acil', value: 'acil' },
        { label: 'Yüksek', value: 'yuksek' },
        { label: 'Orta', value: 'orta' },
        { label: 'Düşük', value: 'dusuk' },
      ],
    },
  ],
}
