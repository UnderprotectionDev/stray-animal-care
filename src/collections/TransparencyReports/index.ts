import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import {
  revalidateTransparencyReport,
  revalidateTransparencyReportDelete,
} from './hooks/revalidateTransparencyReport'

export const TransparencyReports: CollectionConfig<'transparency-reports'> = {
  slug: 'transparency-reports',
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          data.totalExpense = (data.expenses ?? []).reduce(
            (sum: number, item: { amount?: number | null }) => sum + (item.amount ?? 0),
            0,
          )
          data.totalDonation = (data.donorList ?? []).reduce(
            (sum: number, item: { amount?: number | null }) => sum + (item.amount ?? 0),
            0,
          )
        }
        return data
      },
    ],
    afterChange: [revalidateTransparencyReport],
    afterDelete: [revalidateTransparencyReportDelete],
  },
  trash: true,
  labels: { singular: 'Şeffaflık Raporu', plural: 'Şeffaflık Raporları' },
  admin: {
    defaultColumns: ['title', 'month', 'totalExpense', 'totalDonation'],
    group: 'Destek & Raporlar',
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
                  label: 'Harcama Tutarı',
                  type: 'number',
                },
              ],
            },
            {
              name: 'totalExpense',
              label: 'Toplam Gider',
              type: 'number',
              admin: {
                readOnly: true,
                description: 'Otomatik hesaplanır (giderlerin toplamı)',
              },
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
              admin: {
                readOnly: true,
                description: 'Otomatik hesaplanır (bağışların toplamı)',
              },
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
                  label: 'Bağış Tutarı',
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
