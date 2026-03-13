import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Volunteers: CollectionConfig<'volunteers'> = {
  slug: 'volunteers',
  enableQueryPresets: true,
  access: {
    create: anyone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  trash: true,
  labels: { singular: 'Gönüllü', plural: 'Gönüllüler' },
  admin: {
    defaultColumns: ['name', 'email', 'areas', 'applicationStatus', 'createdAt'],
    group: 'Topluluk',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Ad Soyad',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'E-posta',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'phone',
      label: 'Telefon',
      type: 'text',
    },
    {
      name: 'areas',
      label: 'İlgi Alanları',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Besleme', value: 'besleme' },
        { label: 'Tedavi', value: 'tedavi' },
        { label: 'Nakliye', value: 'nakliye' },
        { label: 'Sahiplendirme', value: 'sahiplendirme' },
        { label: 'Etkinlik', value: 'etkinlik' },
      ],
    },
    {
      name: 'message',
      label: 'Mesaj',
      type: 'textarea',
    },
    {
      name: 'applicationStatus',
      label: 'Başvuru Durumu',
      type: 'select',
      defaultValue: 'beklemede',
      index: true,
      options: [
        { label: 'Beklemede', value: 'beklemede' },
        { label: 'Onaylandı', value: 'onaylandi' },
        { label: 'Reddedildi', value: 'reddedildi' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'appliedAt',
      label: 'Başvuru Tarihi',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            if (!value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
  ],
}
