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
  admin: {
    defaultColumns: ['name', 'approved', 'date', 'updatedAt'],
    group: 'Support',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
