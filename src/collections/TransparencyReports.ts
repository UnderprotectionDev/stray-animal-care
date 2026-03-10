import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const TransparencyReports: CollectionConfig<'transparency-reports'> = {
  slug: 'transparency-reports',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  labels: { singular: 'Şeffaflık Raporu', plural: 'Şeffaflık Raporları' },
  admin: {
    defaultColumns: ['title', 'month', 'totalExpense', 'totalDonation'],
    group: 'Raporlar',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Başlık',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'month',
      label: 'Ay',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Giderler',
          fields: [
            {
              name: 'expenses',
              label: 'Giderler',
              type: 'array',
              fields: [
                {
                  name: 'category',
                  label: 'Kategori',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'amount',
                  label: 'Miktar',
                  type: 'number',
                },
              ],
            },
            {
              name: 'totalExpense',
              label: 'Toplam Gider',
              type: 'number',
            },
          ],
        },
        {
          label: 'Bağışlar',
          fields: [
            {
              name: 'totalDonation',
              label: 'Toplam Bağış',
              type: 'number',
            },
            {
              name: 'donorList',
              label: 'Bağışçı Listesi',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  label: 'İsim',
                  type: 'text',
                },
                {
                  name: 'amount',
                  label: 'Miktar',
                  type: 'number',
                },
              ],
            },
          ],
        },
        {
          label: 'Belgeler',
          fields: [
            {
              name: 'documents',
              label: 'Belgeler',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}
