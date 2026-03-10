import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Ayarlar',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banka Bilgileri',
          fields: [
            {
              name: 'bankName',
              label: 'Banka Adı',
              type: 'text',
            },
            {
              name: 'accountHolder',
              label: 'Hesap Sahibi',
              type: 'text',
            },
            {
              name: 'iban',
              label: 'IBAN',
              type: 'text',
            },
          ],
        },
        {
          label: 'İletişim',
          fields: [
            {
              name: 'phone',
              label: 'Telefon',
              type: 'text',
            },
            {
              name: 'email',
              label: 'E-posta',
              type: 'text',
            },
            {
              name: 'whatsapp',
              label: 'WhatsApp',
              type: 'text',
            },
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
            },
          ],
        },
        {
          label: 'Uluslararası',
          fields: [
            {
              name: 'paypalLink',
              label: 'PayPal Linki',
              type: 'text',
            },
            {
              name: 'wiseLink',
              label: 'Wise Linki',
              type: 'text',
            },
          ],
        },
        {
          label: 'İstatistikler',
          fields: [
            {
              name: 'catsCount',
              label: 'Kedi Sayısı',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'dogsCount',
              label: 'Köpek Sayısı',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'treatedCount',
              label: 'Tedavi Edilen',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'spayedCount',
              label: 'Kısırlaştırılan',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'vaccinatedCount',
              label: 'Aşılanan',
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
