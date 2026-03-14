import type { Block } from 'payload'

export const NeedsListBlock: Block = {
  slug: 'homeNeedsList',
  labels: { singular: 'İhtiyaç Listesi', plural: 'İhtiyaç Listesi' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Güncel İhtiyaçlar', label: 'Bölüm Başlığı' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tüm Liste', label: 'Tümünü Gör Etiketi' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/mama-malzeme', label: 'Tümünü Gör Linki' },
    { name: 'limit', type: 'number', defaultValue: 5, min: 1, max: 10, label: 'Gösterilecek Sayı' },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'needed', type: 'text', localized: true, defaultValue: 'İhtiyaç', label: 'İhtiyaç' },
        { name: 'inStock', type: 'text', localized: true, defaultValue: 'Mevcut', label: 'Mevcut' },
        { name: 'stockLevel', type: 'text', localized: true, defaultValue: 'Stok Seviyesi', label: 'Stok Seviyesi' },
        { name: 'priorityAcil', type: 'text', localized: true, defaultValue: 'ACİL', label: 'Öncelik: Acil' },
        { name: 'priorityYuksek', type: 'text', localized: true, defaultValue: 'YÜKSEK', label: 'Öncelik: Yüksek' },
        { name: 'priorityOrta', type: 'text', localized: true, defaultValue: 'ORTA', label: 'Öncelik: Orta' },
        { name: 'priorityDusuk', type: 'text', localized: true, defaultValue: 'DÜŞÜK', label: 'Öncelik: Düşük' },
        { name: 'unitKutu', type: 'text', localized: true, defaultValue: 'kutu', label: 'Birim: Kutu' },
        { name: 'unitKg', type: 'text', localized: true, defaultValue: 'kg', label: 'Birim: Kg' },
        { name: 'unitAdet', type: 'text', localized: true, defaultValue: 'adet', label: 'Birim: Adet' },
      ],
    },
  ],
}
