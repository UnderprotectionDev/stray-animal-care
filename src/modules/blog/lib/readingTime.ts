/**
 * Calculate estimated reading time from Lexical rich text JSON content.
 * Traverses the node tree recursively to extract all text.
 */
function extractText(node: any): string {
  if (!node) return ''

  if (typeof node.text === 'string') {
    return node.text
  }

  if (Array.isArray(node.children)) {
    return node.children.map(extractText).join(' ')
  }

  if (node.root) {
    return extractText(node.root)
  }

  return ''
}

const WORDS_PER_MINUTE = 200

export function calculateReadingTime(content: any): number {
  const text = extractText(content)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE))
}
