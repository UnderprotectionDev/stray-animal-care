import type { Block } from 'payload'
import { enabledField, sectionTitleField, viewAllFields } from '@/fields/homepageFields'

export const ActiveEmergenciesBlock: Block = {
  slug: 'homeActiveEmergencies',
  labels: { singular: 'Aktif Acil Vakalar', plural: 'Aktif Acil Vakalar' },
  fields: [
    enabledField(),
    sectionTitleField('Acil Vakalar'),
    ...viewAllFields('Tümünü Gör', '/acil-vakalar'),
    { name: 'tickerText', type: 'text', localized: true, defaultValue: 'ACİL MÜDAHALE GEREKİYOR /// KLİNİK DESTEĞİ BEKLİYOR /// DESTEK OLUN', label: 'Kayan Yazı Metni' },
    { name: 'limit', type: 'number', defaultValue: 5, min: 1, max: 10, label: 'Gösterilecek Sayı' },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'case', type: 'text', localized: true, defaultValue: 'Vaka', label: 'Vaka' },
        { name: 'active', type: 'text', localized: true, defaultValue: 'AKTİF', label: 'Aktif' },
      ],
    },
  ],
}
