import type { Block } from 'payload'

export const OurWorkBlock: Block = {
  slug: 'homeOurWork',
  labels: { singular: 'Çalışmalarımız', plural: 'Çalışmalarımız' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Çalışmalarımız', label: 'Bölüm Başlığı' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör', label: 'Tümünü Gör Etiketi' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/calismalarimiz', label: 'Tümünü Gör Linki' },
    { name: 'photoCountTemplate', type: 'text', localized: true, defaultValue: '{count} fotoğraf', label: 'Fotoğraf Sayısı Şablonu' },
    {
      name: 'activities',
      label: 'Aktiviteler',
      type: 'array',
      labels: { singular: 'Aktivite', plural: 'Aktiviteler' },
      minRows: 0,
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/RowLabels#ActivityRowLabel',
        },
      },
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
        { name: 'title', type: 'text', localized: true, required: true, label: 'Başlık' },
        { name: 'description', type: 'textarea', localized: true, label: 'Açıklama' },
        { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, label: 'Görseller' },
      ],
    },
  ],
}
