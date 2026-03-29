import type { Block } from 'payload'
import { enabledField, sectionTitleField, viewAllFields } from '@/fields/homepageFields'

export const FeaturedAnimalsBlock: Block = {
  slug: 'homeFeaturedAnimals',
  labels: { singular: 'Öne Çıkan Hayvanlar', plural: 'Öne Çıkan Hayvanlar' },
  fields: [
    enabledField(),
    sectionTitleField('Canlarımız'),
    ...viewAllFields('Tümünü Gör', '/canlarimiz'),
    { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 12, label: 'Gösterilecek Sayı' },
    { name: 'adoptCta', type: 'text', localized: true, defaultValue: 'YUVA OLUN', label: 'Sahiplen CTA Metni' },
    { name: 'adoptCtaSecondaryLabel', type: 'text', localized: true, defaultValue: 'TÜM LİSTEYİ GÖR →', label: 'Sahiplen İkincil CTA' },
    {
      name: 'typeLabels',
      label: 'Tür Etiketleri',
      type: 'group',
      fields: [
        { name: 'kedi', type: 'text', localized: true, defaultValue: 'Kedi', label: 'Kedi' },
        { name: 'kopek', type: 'text', localized: true, defaultValue: 'Köpek', label: 'Köpek' },
      ],
    },
    {
      name: 'statusLabels',
      label: 'Durum Etiketleri',
      type: 'group',
      fields: [
        { name: 'tedavide', type: 'text', localized: true, defaultValue: 'Tedavide', label: 'Tedavide' },
        { name: 'kaliciBakim', type: 'text', localized: true, defaultValue: 'Kalıcı Bakım', label: 'Kalıcı Bakım' },
        { name: 'acil', type: 'text', localized: true, defaultValue: 'Acil', label: 'Acil' },
      ],
    },
    {
      name: 'genderLabels',
      label: 'Cinsiyet Etiketleri',
      type: 'group',
      fields: [
        { name: 'erkek', type: 'text', localized: true, defaultValue: 'Erkek', label: 'Erkek' },
        { name: 'disi', type: 'text', localized: true, defaultValue: 'Dişi', label: 'Dişi' },
        { name: 'bilinmiyor', type: 'text', localized: true, defaultValue: 'Bilinmiyor', label: 'Bilinmiyor' },
      ],
    },
    {
      name: 'booleanLabels',
      label: 'Boolean Etiketleri',
      type: 'group',
      fields: [
        { name: 'spayedYes', type: 'text', localized: true, defaultValue: 'Kısır', label: 'Kısırlaştırılmış' },
        { name: 'spayedNo', type: 'text', localized: true, defaultValue: 'Kısır Değil', label: 'Kısırlaştırılmamış' },
        { name: 'vaccinatedYes', type: 'text', localized: true, defaultValue: 'Aşılı', label: 'Aşılanmış' },
        { name: 'vaccinatedNo', type: 'text', localized: true, defaultValue: 'Aşısız', label: 'Aşılanmamış' },
      ],
    },
  ],
}
