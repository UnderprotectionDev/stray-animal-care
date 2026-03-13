import type { Block } from 'payload'

export const RecentPostsBlock: Block = {
  slug: 'homeRecentPosts',
  labels: { singular: 'Son Yazılar', plural: 'Son Yazılar' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, defaultValue: 'Son Yazılar' },
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: 'Tüm Yazılar' },
    { name: 'viewAllLink', type: 'text', defaultValue: '/gunluk' },
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 6 },
  ],
}
