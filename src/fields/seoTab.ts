import type { Tab } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export function seoTab(opts?: { hasGenerateFn?: boolean }): Tab {
  const hasGenerateFn = opts?.hasGenerateFn ?? false

  return {
    name: 'meta',
    label: 'SEO',
    fields: [
      OverviewField({
        titlePath: 'meta.title',
        descriptionPath: 'meta.description',
        imagePath: 'meta.image',
      }),
      MetaTitleField(hasGenerateFn ? { hasGenerateFn: true } : {}),
      MetaImageField({
        relationTo: 'media',
      }),
      MetaDescriptionField({}),
      PreviewField({
        titlePath: 'meta.title',
        descriptionPath: 'meta.description',
        ...(hasGenerateFn ? { hasGenerateFn: true } : {}),
      }),
    ],
  }
}
