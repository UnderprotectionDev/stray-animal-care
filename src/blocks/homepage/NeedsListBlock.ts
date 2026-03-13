import type { Block } from 'payload'

export const NeedsListBlock: Block = {
  slug: 'homeNeedsList',
  labels: { singular: 'İhtiyaç Listesi', plural: 'İhtiyaç Listesi' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Güncel İhtiyaçlar' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tüm Liste' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/mama-malzeme' },
    { name: 'limit', type: 'number', defaultValue: 5, min: 1, max: 10 },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'needed', type: 'text', localized: true, defaultValue: 'İhtiyaç' },
        { name: 'inStock', type: 'text', localized: true, defaultValue: 'Mevcut' },
        { name: 'stockLevel', type: 'text', localized: true, defaultValue: 'Stok Seviyesi' },
        { name: 'priorityAcil', type: 'text', localized: true, defaultValue: 'ACİL' },
        { name: 'priorityYuksek', type: 'text', localized: true, defaultValue: 'YÜKSEK' },
        { name: 'priorityOrta', type: 'text', localized: true, defaultValue: 'ORTA' },
        { name: 'priorityDusuk', type: 'text', localized: true, defaultValue: 'DÜŞÜK' },
        { name: 'unitKutu', type: 'text', localized: true, defaultValue: 'kutu' },
        { name: 'unitKg', type: 'text', localized: true, defaultValue: 'kg' },
        { name: 'unitAdet', type: 'text', localized: true, defaultValue: 'adet' },
      ],
    },
  ],
}
