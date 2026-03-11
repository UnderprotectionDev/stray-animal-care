import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateEvent, revalidateEventDelete } from './hooks/revalidateEvent'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  enableQueryPresets: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: { singular: 'Etkinlik', plural: 'Etkinlikler' },
  admin: {
    defaultColumns: ['title', 'eventDate', 'eventType', 'eventStatus', 'updatedAt'],
    group: 'Topluluk',
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
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
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
              options: [
                { label: 'Sahiplendirme', value: 'sahiplendirme' },
                { label: 'Mama Toplama', value: 'mama-toplama' },
                { label: 'Bakım Günü', value: 'bakim-gunu' },
                { label: 'Eğitim', value: 'egitim' },
                { label: 'Diğer', value: 'diger' },
              ],
            },
            {
              name: 'eventStatus',
              label: 'Etkinlik Durumu',
              type: 'select',
              index: true,
              defaultValue: 'yaklasan',
              options: [
                { label: 'Yaklaşan', value: 'yaklasan' },
                { label: 'Devam Ediyor', value: 'devam-ediyor' },
                { label: 'Tamamlandı', value: 'tamamlandi' },
                { label: 'İptal', value: 'iptal' },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({}),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      label: 'Yayınlanma Tarihi',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField({ useAsSlug: 'title' }),
  ],
  hooks: {
    afterChange: [revalidateEvent],
    afterDelete: [revalidateEventDelete],
  },
  trash: true,
  versions: {
    drafts: {
      autosave: {
        interval: 500,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
