import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const StoryBlock: Block = {
  slug: 'homeStory',
  labels: { singular: 'Hikaye', plural: 'Hikaye' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'sectionTitle', type: 'text', localized: true, label: 'Bölüm Başlığı', defaultValue: 'HİKAYEMİZ & MİSYON' },
    { name: 'founderImage', type: 'upload', relationTo: 'media', label: 'Kurucu Görseli' },
    { name: 'founderCaption', type: 'text', localized: true, label: 'Kurucu Alt Yazı', defaultValue: 'AYŞE KAYA, 2019' },
    { name: 'content', type: 'richText', editor: defaultLexical, localized: true, label: 'İçerik' },
  ],
}
