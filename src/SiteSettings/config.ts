import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Bank Info',
          fields: [
            {
              name: 'bankName',
              type: 'text',
            },
            {
              name: 'accountHolder',
              type: 'text',
            },
            {
              name: 'iban',
              type: 'text',
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'email',
              type: 'text',
            },
            {
              name: 'whatsapp',
              type: 'text',
            },
            {
              name: 'instagram',
              type: 'text',
            },
          ],
        },
        {
          label: 'International',
          fields: [
            {
              name: 'paypalLink',
              type: 'text',
            },
            {
              name: 'wiseLink',
              type: 'text',
            },
          ],
        },
        {
          label: 'Stats',
          fields: [
            {
              name: 'catsCount',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'dogsCount',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'treatedCount',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'spayedCount',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'vaccinatedCount',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
