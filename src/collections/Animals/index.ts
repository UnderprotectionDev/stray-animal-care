import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { revalidateAnimal, revalidateAnimalDelete } from './hooks/revalidateAnimal'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

export const Animals: CollectionConfig<'animals'> = {
  slug: 'animals',
  enableQueryPresets: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: { singular: 'Hayvan', plural: 'Hayvanlar' },
  admin: {
    defaultColumns: ['name', 'type', 'animalStatus', 'updatedAt'],
    group: 'Hayvan Bakım',
    useAsTitle: 'name',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({ slug: data?.slug as string, collection: 'animals', req }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({ slug: data?.slug as string, collection: 'animals', req }),
  },
  fields: [
    {
      name: 'name',
      label: 'İsim',
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
              name: 'photos',
              label: 'Fotoğraflar',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
            },
            {
              name: 'story',
              label: 'Hikaye',
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
              name: 'needs',
              label: 'İhtiyaçlar',
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
          ],
        },
        {
          label: 'Detaylar',
          fields: [
            {
              name: 'type',
              label: 'Tür',
              type: 'select',
              required: true,
              index: true,
              options: [
                { label: 'Kedi', value: 'kedi' },
                { label: 'Köpek', value: 'kopek' },
              ],
            },
            {
              name: 'age',
              label: 'Yaş',
              type: 'text',
              localized: true,
            },
            {
              name: 'gender',
              label: 'Cinsiyet',
              type: 'select',
              required: true,
              options: [
                { label: 'Erkek', value: 'erkek' },
                { label: 'Dişi', value: 'disi' },
                { label: 'Bilinmiyor', value: 'bilinmiyor' },
              ],
            },
            {
              name: 'animalStatus',
              label: 'Hayvan Durumu',
              type: 'select',
              required: true,
              index: true,
              options: [
                { label: 'Tedavide', value: 'tedavide' },
                { label: 'Kalıcı Bakım', value: 'kalici-bakim' },
                { label: 'Acil', value: 'acil' },
              ],
            },
            {
              name: 'featured',
              label: 'Öne Çıkan',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                position: 'sidebar',
              },
            },
          ],
        },
        {
          label: 'Sağlık Bilgileri',
          fields: [
            {
              name: 'location',
              label: 'Konum',
              type: 'text',
              localized: true,
            },
            {
              name: 'weight',
              label: 'Kilo (kg)',
              type: 'number',
            },
            {
              name: 'microchipId',
              label: 'Mikroçip Numarası',
              type: 'text',
            },
            {
              name: 'isSpayed',
              label: 'Kısırlaştırılmış',
              type: 'checkbox',
              defaultValue: false,
              index: true,
            },
            {
              name: 'isVaccinated',
              label: 'Aşılı',
              type: 'checkbox',
              defaultValue: false,
              index: true,
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
    slugField({ useAsSlug: 'name' }),
  ],
  hooks: {
    afterChange: [revalidateAnimal],
    afterDelete: [revalidateAnimalDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 3000,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
