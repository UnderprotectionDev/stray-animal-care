import type { TextFieldSingleValidation } from 'payload'
import {
  BlocksFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  LinkFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature, TextSizeFeature } from 'payload-lexical-typography'
import { Callout } from '@/blocks/Callout/config'
import { VideoEmbed } from '@/blocks/VideoEmbed/config'

export const defaultLexical = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures.filter((f) => f.key !== 'link' && f.key !== 'heading'),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BlocksFeature({ blocks: [Callout, VideoEmbed] }),
    EXPERIMENTAL_TableFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL gereklidir'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
    TextColorFeature({
      colors: [
        { label: 'Amber (Ana)', value: 'oklch(0.795 0.16 75)' },
        { label: 'Adaçayı Yeşili', value: 'oklch(0.78 0.1 155)' },
        { label: 'Terracotta', value: 'oklch(0.55 0.17 35)' },
        { label: 'Koyu', value: 'oklch(0.25 0.02 75)' },
        { label: 'Soluk', value: 'oklch(0.55 0.02 75)' },
      ],
    }),
    TextSizeFeature({
      sizes: [
        { value: '14px', label: '14px' },
        { value: '16px', label: '16px' },
        { value: '18px', label: '18px' },
        { value: '20px', label: '20px' },
        { value: '24px', label: '24px' },
        { value: '32px', label: '32px' },
      ],
    }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
