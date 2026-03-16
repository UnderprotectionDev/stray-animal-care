import type { Block } from 'payload'

export const ActiveEmergenciesBlock: Block = {
  slug: 'homeActiveEmergencies',
  labels: { singular: 'Aktif Acil Vakalar', plural: 'Aktif Acil Vakalar' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Acil Vakalar', label: 'Bölüm Başlığı' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tümünü Gör', label: 'Tümünü Gör Etiketi' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/acil-vakalar', label: 'Tümünü Gör Linki' },
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
