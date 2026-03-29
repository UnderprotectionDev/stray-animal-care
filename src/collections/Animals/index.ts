import type { CollectionConfig } from 'payload'

import { accessPresets } from '../../access/presets'
import { ANIMAL_TYPE_OPTIONS, ANIMAL_GENDER_OPTIONS, ANIMAL_STATUS_OPTIONS } from '../../constants/options'
import { revalidateAnimal, revalidateAnimalDelete } from './hooks/revalidateAnimal'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { contentRichText } from '../../fields/lexical'
import { seoTab } from '../../fields/seoTab'
import { relaxedVersions } from '../../fields/versionsConfig'
import { publishedAtField } from '../../fields/publishedAt'
import { slugField } from 'payload'

export const Animals: CollectionConfig<'animals'> = {
  slug: 'animals',
  orderable: true,
  enableQueryPresets: true,
  access: accessPresets.publicReadAdminWrite,
  labels: { singular: 'Hayvan', plural: 'Hayvanlar' },
  admin: {
    defaultColumns: ['name', 'type', 'animalStatus', 'updatedAt'],
    group: 'Hayvan Bakım',
    useAsTitle: 'name',
    description: 'Bakım altındaki sokak hayvanları kayıtları',
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
      admin: {
        placeholder: 'örn: Pamuk, Karabaş',
      },
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
              editor: contentRichText(),
              admin: {
                description: 'Hayvanın kurtarılma hikayesi — ziyaretçiler bunu okuyacak',
              },
            },
            {
              name: 'needs',
              label: 'İhtiyaçlar',
              type: 'richText',
              localized: true,
              editor: contentRichText(),
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
              options: ANIMAL_TYPE_OPTIONS,
              admin: {
                components: {
                  Cell: '@/components/admin/cells/TypeIconCell#TypeIconCell',
                },
              },
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
              index: true,
              options: ANIMAL_GENDER_OPTIONS,
            },
            {
              name: 'animalStatus',
              label: 'Hayvan Durumu',
              type: 'select',
              required: true,
              index: true,
              options: ANIMAL_STATUS_OPTIONS,
              admin: {
                description: 'Tedavide: aktif tedavi | Kalıcı Bakım: barınakta | Acil: acil müdahale',
                components: {
                  Cell: '@/components/admin/cells/StatusBadgeCell#StatusBadgeCell',
                },
              },
            },
            {
              name: 'featured',
              label: 'Öne Çıkan',
              type: 'checkbox',
              defaultValue: false,
              index: true,
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
              admin: {
                description: 'Kilogram cinsinden',
                placeholder: 'örn: 4.5',
              },
            },
            {
              name: 'microchipId',
              label: 'Mikroçip Numarası',
              type: 'text',
              unique: true,
              index: true,
              admin: {
                description: '15 haneli mikroçip numarası',
              },
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
        seoTab(),
      ],
    },
    publishedAtField(),
    slugField({ useAsSlug: 'name' }),
  ],
  hooks: {
    afterChange: [revalidateAnimal],
    afterDelete: [revalidateAnimalDelete],
  },
  versions: relaxedVersions,
}
