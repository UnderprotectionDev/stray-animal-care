import type { Block } from 'payload'
import { enabledField, sectionTitleField, viewAllFields } from '@/fields/homepageFields'

export const OurWorkBlock: Block = {
  slug: 'homeOurWork',
  labels: { singular: 'Çalışmalarımız', plural: 'Çalışmalarımız' },
  fields: [
    enabledField(),
    sectionTitleField('Çalışmalarımız'),
    ...viewAllFields('Tümünü Gör', '/calismalarimiz'),
    {
      name: 'photoCountTemplate',
      type: 'text',
      localized: true,
      defaultValue: '{count} fotoğraf',
      label: 'Fotoğraf Sayısı Şablonu',
    },
    {
      name: 'galleryVariant',
      label: 'Galeri Görünümü',
      type: 'select',
      defaultValue: 'stacking',
      options: [
        { label: 'Izgara', value: 'grid' },
        { label: 'Dairesel Galeri (3D)', value: 'circular' },
        { label: 'Yığın Kartlar (Varsayılan)', value: 'stacking' },
      ],
      admin: { description: 'Aktivite kartlarının görüntülenme şekli' },
    },
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
          options: [
            { label: 'Besleme', value: 'feeding' },
            { label: 'Tedavi', value: 'treatment' },
            { label: 'Kısırlaştırma', value: 'spaying' },
            { label: 'Acil Müdahale', value: 'emergency' },
            { label: 'Aşılama', value: 'vaccination' },
            { label: 'Barınma', value: 'shelter' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: 'Başlık',
        },
        { name: 'description', type: 'textarea', localized: true, label: 'Açıklama' },
        { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, label: 'Görseller' },
      ],
    },
  ],
}
