import type { Block } from 'payload'
import { enabledField, sectionTitleField, viewAllFields } from '@/fields/homepageFields'

export const NeedsListBlock: Block = {
  slug: 'homeNeedsList',
  labels: { singular: 'İhtiyaç Listesi', plural: 'İhtiyaç Listesi' },
  fields: [
    enabledField(),
    sectionTitleField('Güncel İhtiyaçlar'),
    ...viewAllFields('Tüm Liste', '/mama-malzeme'),
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
        { name: 'ctaButton', type: 'text', localized: true, defaultValue: 'Bu İhtiyacı Karşıla', label: 'CTA Düğme Metni' },
        { name: 'ctaLink', type: 'text', defaultValue: '/destek-ol', label: 'CTA Link' },
        { name: 'shippingCargo', type: 'text', localized: true, defaultValue: 'Kargo ile gönderin', label: 'Kargo Bilgisi' },
        { name: 'shippingInPerson', type: 'text', localized: true, defaultValue: 'Elden teslim edin', label: 'Elden Teslim' },
        { name: 'shippingOnline', type: 'text', localized: true, defaultValue: 'Online satın alın', label: 'Online Satın Al' },
        { name: 'priorityDescAcil', type: 'text', localized: true, defaultValue: 'Stok kritik seviyede', label: 'Öncelik Açıklama: Acil' },
        { name: 'priorityDescYuksek', type: 'text', localized: true, defaultValue: 'Stok hızla azalıyor', label: 'Öncelik Açıklama: Yüksek' },
        { name: 'priorityDescOrta', type: 'text', localized: true, defaultValue: 'Stok yeterli, yakında gerekebilir', label: 'Öncelik Açıklama: Orta' },
        { name: 'priorityDescDusuk', type: 'text', localized: true, defaultValue: 'Stok durumu iyi', label: 'Öncelik Açıklama: Düşük' },
        { name: 'lastUpdated', type: 'text', localized: true, defaultValue: 'Son güncelleme', label: 'Son Güncelleme Etiketi' },
      ],
    },
  ],
}
