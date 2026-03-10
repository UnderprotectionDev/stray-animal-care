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
  admin: {
    defaultColumns: ['title', 'caseStatus', 'collectedAmount', 'targetAmount', 'updatedAt'],
    group: 'Content',
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'animal',
              type: 'relationship',
              relationTo: 'animals',
            },
            {
              name: 'description',
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
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
            {
              name: 'beforePhoto',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'afterPhoto',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Progress',
          fields: [
            {
              name: 'targetAmount',
              type: 'number',
              required: true,
            },
            {
              name: 'collectedAmount',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'caseStatus',
              type: 'select',
              required: true,
              defaultValue: 'aktif',
              options: [
                { label: 'Aktif', value: 'aktif' },
                { label: 'Tamamlandi', value: 'tamamlandi' },
              ],
            },
          ],
        },
        {
          label: 'Updates',
          fields: [
            {
              name: 'updates',
              type: 'array',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                },
                {
                  name: 'text',
                  type: 'richText',
                  localized: true,
                },
                {
                  name: 'photo',
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
