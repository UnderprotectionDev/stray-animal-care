import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

/**
 * Simple rich text — rootFeatures + FixedToolbar + InlineToolbar.
 * Usage: Banner, Media captions, simple fields.
 */
export function simpleRichText() {
  return lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })
}

/**
 * Content-level rich text — rootFeatures + HeadingFeature + FixedToolbar + InlineToolbar.
 * Usage: Animals story, Events description, EmergencyCases, Content block, Hero.
 */
export function contentRichText(opts?: {
  headingSizes?: ('h1' | 'h2' | 'h3' | 'h4')[]
}) {
  const headingSizes = opts?.headingSizes ?? ['h2', 'h3', 'h4']
  return lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: headingSizes }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ],
  })
}
