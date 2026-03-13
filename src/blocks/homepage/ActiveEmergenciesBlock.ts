import type { Block } from 'payload'

export const ActiveEmergenciesBlock: Block = {
  slug: 'homeActiveEmergencies',
  labels: { singular: 'Aktif Acil Vakalar', plural: 'Aktif Acil Vakalar' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Acil Vakalar' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/acil-vakalar' },
    { name: 'tickerText', type: 'text', localized: true, defaultValue: 'ACİL MÜDAHALE GEREKİYOR /// KLİNİK DESTEĞİ BEKLİYOR /// DESTEK OLUN' },
    { name: 'limit', type: 'number', defaultValue: 5, min: 1, max: 10 },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'codeRed', type: 'text', localized: true, defaultValue: 'KOD KIZIL: VAKA' },
        { name: 'case', type: 'text', localized: true, defaultValue: 'Vaka' },
        { name: 'active', type: 'text', localized: true, defaultValue: 'AKTİF' },
      ],
    },
  ],
}
