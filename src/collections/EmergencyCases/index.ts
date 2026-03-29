import type { CollectionConfig } from 'payload'

import { accessPresets } from '../../access/presets'
import {
  revalidateEmergencyCase,
  revalidateEmergencyCaseDelete,
} from './hooks/revalidateEmergencyCase'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { contentRichText } from '../../fields/lexical'
import { seoTab } from '../../fields/seoTab'
import { relaxedVersions } from '../../fields/versionsConfig'
import { publishedAtField } from '../../fields/publishedAt'
import { slugField } from 'payload'

export const EmergencyCases: CollectionConfig<'emergency-cases'> = {
  slug: 'emergency-cases',
  orderable: true,
  enableQueryPresets: true,
  access: accessPresets.publicReadAdminWrite,
  labels: { singular: 'Acil Vaka', plural: 'Acil Vakalar' },
  admin: {
    defaultColumns: ['title', 'caseStatus', 'collectedAmount', 'targetAmount', 'updatedAt'],
    group: 'Hayvan Bakım',
    useAsTitle: 'title',
    description: 'Acil tedavi gerektiren vaka kampanyaları',
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
              index: true,
            },
            {
              name: 'description',
              label: 'Açıklama',
              type: 'richText',
              localized: true,
              editor: contentRichText(),
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
              admin: {
                description: 'Toplam hedeflenen bağış miktarı (₺)',
              },
            },
            {
              name: 'collectedAmount',
              label: 'Toplanan Miktar',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Şu ana kadar toplanan bağış miktarı (₺)',
                components: {
                  Cell: '@/components/admin/cells/ProgressBarCell#EmergencyProgressCell',
                },
              },
            },
            {
              name: 'caseStatus',
              label: 'Vaka Durumu',
              type: 'select',
              required: true,
              index: true,
              defaultValue: 'aktif',
              options: [
                { label: 'Aktif', value: 'aktif' },
                { label: 'Tamamlandı', value: 'tamamlandi' },
              ],
              admin: {
                components: {
                  Cell: '@/components/admin/cells/StatusBadgeCell#StatusBadgeCell',
                },
              },
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
              labels: { singular: 'Güncelleme', plural: 'Güncellemeler' },
              admin: {
                description: 'Her güncelleme sitede kronolojik olarak gösterilir',
                initCollapsed: true,
                components: {
                  RowLabel: '@/collections/EmergencyCases/UpdateRowLabel#UpdateRowLabel',
                },
              },
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
        seoTab(),
      ],
    },
    publishedAtField(),
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateEmergencyCase],
    afterDelete: [revalidateEmergencyCaseDelete],
  },
  trash: true,
  versions: relaxedVersions,
}
