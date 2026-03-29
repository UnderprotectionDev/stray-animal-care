import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { accessPresets } from '../../access/presets'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'
import { seoTab } from '../../fields/seoTab'
import { livePreviewVersions } from '../../fields/versionsConfig'
import { publishedAtField } from '../../fields/publishedAt'
import { slugField } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  enableQueryPresets: true,
  labels: { singular: 'Yazı', plural: 'Yazılar' },
  access: accessPresets.publicReadAdminWrite,
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'İçerik Yönetimi',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Başlık',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'excerpt',
              label: 'Özet',
              type: 'textarea',
              localized: true,
              maxLength: 300,
            },
            {
              name: 'heroImage',
              label: 'Ana Görsel',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: 'İçerik',
        },
        {
          fields: [
            {
              name: 'relatedPosts',
              label: 'İlgili Yazılar',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              label: 'Kategoriler',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'tags',
              label: 'Etiketler',
              type: 'array',
              labels: { singular: 'Etiket', plural: 'Etiketler' },
              localized: true,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/components/admin/RowLabels#TagRowLabel',
                },
              },
              fields: [
                {
                  name: 'tag',
                  label: 'Etiket',
                  type: 'text',
                },
              ],
            },
          ],
          label: 'Meta',
        },
        seoTab({ hasGenerateFn: true }),
      ],
    },
    {
      name: 'postCategory',
      label: 'Yazı Kategorisi',
      type: 'select',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'Kurtarma', value: 'kurtarma' },
        { label: 'Tedavi', value: 'tedavi' },
        { label: 'Gunluk', value: 'gunluk' },
        { label: 'Duyuru', value: 'duyuru' },
        { label: 'Etkinlik', value: 'etkinlik' },
      ],
    },
    publishedAtField(),
    {
      name: 'authors',
      label: 'Yazarlar',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: livePreviewVersions,
}
