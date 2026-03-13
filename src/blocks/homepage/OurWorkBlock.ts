import type { Block } from 'payload'

export const OurWorkBlock: Block = {
  slug: 'homeOurWork',
  labels: { singular: 'Çalışmalarımız', plural: 'Çalışmalarımız' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Çalışmalarımız' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/calismalarimiz' },
    { name: 'photoCountTemplate', type: 'text', localized: true, defaultValue: '{count} fotoğraf' },
    {
      name: 'activities',
      label: 'Aktiviteler',
      type: 'array',
      minRows: 0,
      maxRows: 10,
      fields: [
        {
          name: 'key',
          label: 'Anahtar',
          type: 'select',
          required: true,
          options: [
            { label: 'Besleme', value: 'feeding' },
            { label: 'Tedavi', value: 'treatment' },
            { label: 'Kısırlaştırma', value: 'spaying' },
            { label: 'Acil Müdahale', value: 'emergency' },
            { label: 'Aşılama', value: 'vaccination' },
            { label: 'Barınma', value: 'shelter' },
          ],
        },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'images', type: 'upload', relationTo: 'media', hasMany: true },
      ],
    },
  ],
}
