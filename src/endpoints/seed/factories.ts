/**
 * Seed data factories for creating Lexical content structures.
 * Reduces boilerplate in post-*.ts files.
 */

/** Create a Lexical text node */
export function textNode(text: string) {
  return {
    type: 'text' as const,
    detail: 0,
    format: 0,
    mode: 'normal' as const,
    style: '',
    text,
    version: 1,
  }
}

/** Create a Lexical paragraph node */
export function paragraph(text: string) {
  return {
    type: 'paragraph' as const,
    children: [textNode(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

/** Create a Lexical heading node */
export function heading(text: string, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2') {
  return {
    type: 'heading' as const,
    children: [textNode(text)],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    tag,
    version: 1,
  }
}

/** Create a Lexical media block node */
export function mediaBlock(mediaId: number | string) {
  return {
    type: 'block' as const,
    fields: {
      blockName: '',
      blockType: 'mediaBlock' as const,
      media: mediaId,
    },
    format: '' as const,
    version: 2,
  }
}

/**
 * Create a complete Lexical root structure from an array of child nodes.
 * Children can be created with paragraph(), heading(), mediaBlock(), etc.
 */
export function lexicalRoot(children: { [k: string]: unknown; type: string; version: number }[]) {
  return {
    root: {
      type: 'root' as const,
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

/**
 * Create a simple Lexical content from an array of paragraphs.
 * For more complex content with headings/blocks, use lexicalRoot() directly.
 */
export function simpleLexicalContent(paragraphs: string[]) {
  return lexicalRoot(paragraphs.map(paragraph))
}
