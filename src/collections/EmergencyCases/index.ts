import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import {
  revalidateEmergencyCase,
  revalidateEmergencyCaseDelete,
} from './hooks/revalidateEmergencyCase'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const EmergencyCases: CollectionConfig<'emergency-cases'> = {
  slug: 'emergency-cases',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: { singular: 'Acil Vaka', plural: 'Acil Vakalar' },
  admin: {
    defaultColumns: ['title', 'caseStatus', 'collectedAmount', 'targetAmount', 'updatedAt'],
    group: 'İçerik',
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'emergency-cases', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'emergency-cases', req }),
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
              name: 'animal',
              label: 'Hayvan',
              type: 'relationship',
              relationTo: 'animals',
            },
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
              name: 'photos',
              label: 'Fotoğraflar',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
            {
              name: 'beforePhoto',
              label: 'Önce Fotoğrafı',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'afterPhoto',
              label: 'Sonra Fotoğrafı',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'İlerleme',
          fields: [
            {
              name: 'targetAmount',
              label: 'Hedef Miktar',
              type: 'number',
              required: true,
            },
            {
              name: 'collectedAmount',
              label: 'Toplanan Miktar',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'caseStatus',
              label: 'Vaka Durumu',
              type: 'select',
              required: true,
              defaultValue: 'aktif',
              options: [
                { label: 'Aktif', value: 'aktif' },
                { label: 'Tamamlandı', value: 'tamamlandi' },
              ],
            },
          ],
        },
        {
          label: 'Güncellemeler',
          fields: [
            {
              name: 'updates',
              label: 'Güncellemeler',
              type: 'array',
              fields: [
                {
                  name: 'date',
                  label: 'Tarih',
                  type: 'date',
                },
                {
                  name: 'text',
                  label: 'Metin',
                  type: 'richText',
                  localized: true,
                },
                {
                  name: 'photo',
                  label: 'Fotoğraf',
                  type: 'upload',
                  relationTo: 'media',
                },
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
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateEmergencyCase],
    afterDelete: [revalidateEmergencyCaseDelete],
  },
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
