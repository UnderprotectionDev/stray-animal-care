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
  admin: {
    defaultColumns: ['title', 'month', 'totalExpense', 'totalDonation'],
    group: 'Reports',
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'month',
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
          label: 'Expenses',
          fields: [
            {
              name: 'expenses',
              type: 'array',
              fields: [
                {
                  name: 'category',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'amount',
                  type: 'number',
                },
              ],
            },
            {
              name: 'totalExpense',
              type: 'number',
            },
          ],
        },
        {
          label: 'Donations',
          fields: [
            {
              name: 'totalDonation',
              type: 'number',
            },
            {
              name: 'donorList',
              type: 'array',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                },
                {
                  name: 'amount',
                  type: 'number',
                },
              ],
            },
          ],
        },
        {
          label: 'Documents',
          fields: [
            {
              name: 'documents',
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
