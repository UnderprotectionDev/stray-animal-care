import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { approvedOrAuthenticated } from '../access/approvedOrAuthenticated'

export const SupporterComments: CollectionConfig<'supporter-comments'> = {
  slug: 'supporter-comments',
  access: {
    create: authenticated,
    delete: authenticated,
    read: approvedOrAuthenticated,
    update: authenticated,
  },
  labels: { singular: 'Destekçi Yorumu', plural: 'Destekçi Yorumları' },
  admin: {
    defaultColumns: ['name', 'approved', 'date', 'updatedAt'],
    group: 'Destek',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'İsim',
      type: 'text',
      required: true,
    },
    {
      name: 'comment',
      label: 'Yorum',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'date',
      label: 'Tarih',
      type: 'date',
      required: true,
    },
    {
      name: 'approved',
      label: 'Onaylı',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
