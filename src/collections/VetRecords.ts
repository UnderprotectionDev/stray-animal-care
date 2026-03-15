import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const VetRecords: CollectionConfig<'vet-records'> = {
  slug: 'vet-records',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  labels: { singular: 'Veteriner Kaydı', plural: 'Veteriner Kayıtları' },
  admin: {
    defaultColumns: ['animal', 'recordType', 'date', 'veterinarian'],
    group: 'Hayvan Bakım',
    useAsTitle: 'recordType',
  },
  trash: true,
  orderable: true,
  fields: [
    {
      name: 'animal',
      label: 'Hayvan',
      type: 'relationship',
      relationTo: 'animals',
      required: true,
    },
    {
      name: 'recordType',
      label: 'Kayıt Türü',
      type: 'select',
      required: true,
      options: [
        { label: 'Muayene', value: 'muayene' },
        { label: 'Aşı', value: 'asi' },
        { label: 'Kısırlaştırma', value: 'kisirlastirma' },
        { label: 'Ameliyat', value: 'ameliyat' },
        { label: 'Tedavi', value: 'tedavi' },
        { label: 'Kontrol', value: 'kontrol' },
      ],
    },
    {
      name: 'date',
      label: 'Tarih',
      type: 'date',
      required: true,
    },
    {
      name: 'veterinarian',
      label: 'Veteriner',
      type: 'text',
    },
    {
      name: 'clinic',
      label: 'Klinik',
      type: 'text',
    },
    {
      name: 'diagnosis',
      label: 'Teşhis',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'treatment',
      label: 'Tedavi',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'medications',
      label: 'İlaçlar',
      type: 'array',
      labels: { singular: 'İlaç', plural: 'İlaçlar' },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/RowLabels#MedicationRowLabel',
        },
      },
      fields: [
        {
          name: 'name',
          label: 'İlaç Adı',
          type: 'text',
          required: true,
        },
        {
          name: 'dosage',
          label: 'Dozaj',
          type: 'text',
        },
        {
          name: 'duration',
          label: 'Süre',
          type: 'text',
        },
      ],
    },
    {
      name: 'cost',
      label: 'Maliyet (₺)',
      type: 'number',
      min: 0,
    },
    {
      name: 'documents',
      label: 'Belgeler',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'notes',
      label: 'Notlar',
      type: 'textarea',
      localized: true,
    },
  ],
}
