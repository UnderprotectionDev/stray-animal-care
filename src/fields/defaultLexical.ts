import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'
import { TextColorFeature, TextSizeFeature } from 'payload-lexical-typography'

export const defaultLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    TextColorFeature({
      colors: [
        { label: 'Amber (Primary)', value: 'oklch(0.795 0.16 75)' },
        { label: 'Sage Green', value: 'oklch(0.78 0.1 155)' },
        { label: 'Terracotta', value: 'oklch(0.55 0.17 35)' },
        { label: 'Dark', value: 'oklch(0.25 0.02 75)' },
        { label: 'Muted', value: 'oklch(0.55 0.02 75)' },
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
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})
