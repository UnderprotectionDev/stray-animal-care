import type { Block } from 'payload'
import { enabledField, sectionTitleField, viewAllFields } from '@/fields/homepageFields'

export const RecentPostsBlock: Block = {
  slug: 'homeRecentPosts',
  labels: { singular: 'Son Yazılar', plural: 'Son Yazılar' },
  fields: [
    enabledField(),
    sectionTitleField('Son Yazılar'),
    ...viewAllFields('Tüm Yazılar', '/gunluk'),
    { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 6, label: 'Gösterilecek Sayı' },
  ],
}
