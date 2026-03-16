import type { Block } from 'payload'

export const RecentPostsBlock: Block = {
  slug: 'homeRecentPosts',
  labels: { singular: 'Son Yazılar', plural: 'Son Yazılar' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Son Yazılar', label: 'Bölüm Başlığı' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tüm Yazılar', label: 'Tümünü Gör Etiketi' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/gunluk', label: 'Tümünü Gör Linki' },
    { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 6, label: 'Gösterilecek Sayı' },
  ],
}
