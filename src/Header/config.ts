import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Başlık Menüsü',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Başlık çubuğunda gösterilecek logo (opsiyonel — yoksa marka adı metin olarak gösterilir)',
      },
    },
    {
      name: 'brandName',
      label: 'Marka Adı',
      type: 'text',
      localized: true,
      defaultValue: 'UMUT PATİLERİ',
      admin: {
        description: 'Logo yoksa veya alt metin olarak gösterilecek marka adı',
      },
    },
    {
      name: 'navItems',
      label: 'Navigasyon Öğeleri',
      type: 'array',
      fields: [
        link({
          appearances: false,
          disableLabel: true,
        }),
        {
          name: 'label',
          label: 'Etiket',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'image',
          label: 'Menü Görseli',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Menü açıldığında gösterilecek görsel',
          },
        },
        {
          name: 'isCta',
          label: 'CTA Butonu',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Bu öğeyi bağış butonu olarak işaretle',
          },
        },
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
