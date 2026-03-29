import type { CollectionConfig } from 'payload'

import { accessPresets } from '../../access/presets'
import { EVENT_TYPE_OPTIONS, EVENT_STATUS_OPTIONS } from '../../constants/options'
import { revalidateEvent, revalidateEventDelete } from './hooks/revalidateEvent'
import { contentRichText } from '../../fields/lexical'
import { seoTab } from '../../fields/seoTab'
import { standardVersions } from '../../fields/versionsConfig'
import { publishedAtField } from '../../fields/publishedAt'
import { slugField } from 'payload'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  enableQueryPresets: true,
  access: accessPresets.publicReadAdminWrite,
  labels: { singular: 'Etkinlik', plural: 'Etkinlikler' },
  admin: {
    defaultColumns: ['title', 'eventDate', 'eventType', 'eventStatus', 'updatedAt'],
    group: 'Topluluk',
    useAsTitle: 'title',
    description: 'Etkinlikleri oluşturun ve yönetin',
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
      type: 'tabs',
      tabs: [
        {
          label: 'İçerik',
          fields: [
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              localized: true,
              editor: contentRichText(),
            },
            {
              name: 'coverImage',
              label: 'Kapak Görseli',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'location',
              label: 'Konum',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Detaylar',
          fields: [
            {
              name: 'eventDate',
              label: 'Başlangıç Tarihi',
              type: 'date',
              required: true,
              admin: {
                description: 'Etkinliğin başlangıç tarih ve saati',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'endDate',
              label: 'Bitiş Tarihi',
              type: 'date',
              admin: {
                description: 'Boş bırakılabilir',
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
              validate: (value, { siblingData }) => {
                const data = siblingData as Record<string, unknown>
                if (value && data?.eventDate && new Date(String(value)) < new Date(String(data.eventDate))) {
                  return 'Bitiş tarihi, başlangıç tarihinden sonra olmalıdır'
                }
                return true
              },
            },
            {
              name: 'eventType',
              label: 'Etkinlik Türü',
              type: 'select',
              index: true,
              options: EVENT_TYPE_OPTIONS,
            },
            {
              name: 'eventStatus',
              label: 'Etkinlik Durumu',
              type: 'select',
              index: true,
              defaultValue: 'yaklasan',
              options: EVENT_STATUS_OPTIONS,
              admin: {
                components: {
                  Cell: '@/components/admin/cells/StatusBadgeCell#StatusBadgeCell',
                },
              },
            },
          ],
        },
        seoTab(),
      ],
    },
    publishedAtField(),
    slugField({ useAsSlug: 'title' }),
  ],
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateEventDelete],
  },
  trash: true,
  versions: standardVersions,
}
