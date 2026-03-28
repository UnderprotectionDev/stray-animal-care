/**
 * Composable Lexical JSON node builders for seed data.
 * Produces valid Lexical editor state JSON matching PayloadCMS's rich text format.
 */

type TextNode = {
  type: 'text'
  detail: 0
  format: number
  mode: 'normal'
  style: ''
  text: string
  version: 1
}

type LinkNode = {
  type: 'link'
  children: TextNode[]
  direction: 'ltr'
  fields: {
    linkType: 'custom'
    newTab: boolean
    url: string
  }
  format: ''
  indent: 0
  version: 3
}

type InlineNode = TextNode | LinkNode

type ParagraphNode = {
  type: 'paragraph'
  children: InlineNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  textFormat: 0
  version: 1
}

type HeadingNode = {
  type: 'heading'
  children: InlineNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  tag: 'h1' | 'h2' | 'h3' | 'h4'
  version: 1
}

type ListItemNode = {
  type: 'listitem'
  children: InlineNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  value: number
  version: 1
}

type ListNode = {
  type: 'list'
  children: ListItemNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  listType: 'bullet' | 'number'
  start: 1
  tag: 'ul' | 'ol'
  version: 1
}

type QuoteNode = {
  type: 'quote'
  children: InlineNode[]
  direction: 'ltr'
  format: ''
  indent: 0
  version: 1
}

type HorizontalRuleNode = {
  type: 'horizontalrule'
  version: 1
}

type BannerBlockNode = {
  type: 'block'
  fields: {
    blockName: string
    blockType: 'banner'
    content: RootNode
    style: 'info' | 'warning' | 'error' | 'success'
  }
  format: ''
  version: 2
}

type CalloutBlockNode = {
  type: 'block'
  fields: {
    blockName: string
    blockType: 'callout'
    variant: 'info' | 'warning' | 'success' | 'error'
    title?: string
    content: RootNode
  }
  format: ''
  version: 2
}

type BlockNode =
  | ParagraphNode
  | HeadingNode
  | ListNode
  | QuoteNode
  | HorizontalRuleNode
  | BannerBlockNode
  | CalloutBlockNode

type RootNode = {
  root: {
    type: 'root'
    children: BlockNode[]
    direction: 'ltr'
    format: ''
    indent: 0
    version: 1
  }
}

/** Create a text node. format bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, 32=subscript, 64=superscript */
export function text(content: string, format: number = 0): TextNode {
  return { type: 'text', detail: 0, format, mode: 'normal', style: '', text: content, version: 1 }
}

export function bold(content: string): TextNode {
  return text(content, 1)
}

export function italic(content: string): TextNode {
  return text(content, 2)
}

export function boldItalic(content: string): TextNode {
  return text(content, 3)
}

export function underline(content: string): TextNode {
  return text(content, 8)
}

export function strikethrough(content: string): TextNode {
  return text(content, 4)
}

export function inlineCode(content: string): TextNode {
  return text(content, 16)
}

export function superscript(content: string): TextNode {
  return text(content, 64)
}

export function subscriptText(content: string): TextNode {
  return text(content, 32)
}

type InlineInput = string | TextNode | LinkNode

function toInlineNodes(children: InlineInput[]): InlineNode[] {
  return children.map((child) => (typeof child === 'string' ? text(child) : child))
}

export function link(url: string, children: InlineInput[], newTab = false): LinkNode {
  return {
    type: 'link',
    children: toInlineNodes(children) as TextNode[],
    direction: 'ltr',
    fields: {
      linkType: 'custom',
      newTab,
      url,
    },
    format: '',
    indent: 0,
    version: 3,
  }
}

export function paragraph(...children: InlineInput[]): ParagraphNode {
  return {
    type: 'paragraph',
    children: toInlineNodes(children),
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
    version: 1,
  }
}

export function heading(tag: 'h1' | 'h2' | 'h3' | 'h4', ...children: InlineInput[]): HeadingNode {
  return {
    type: 'heading',
    children: toInlineNodes(children),
    direction: 'ltr',
    format: '',
    indent: 0,
    tag,
    version: 1,
  }
}

export function quote(...children: InlineInput[]): QuoteNode {
  return {
    type: 'quote',
    children: toInlineNodes(children),
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  }
}

export function ul(...items: InlineInput[][]): ListNode {
  return {
    type: 'list',
    children: items.map((item, i) => ({
      type: 'listitem' as const,
      children: toInlineNodes(item),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      value: i + 1,
      version: 1 as const,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    listType: 'bullet',
    start: 1,
    tag: 'ul',
    version: 1,
  }
}

export function ol(...items: InlineInput[][]): ListNode {
  return {
    type: 'list',
    children: items.map((item, i) => ({
      type: 'listitem' as const,
      children: toInlineNodes(item),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      value: i + 1,
      version: 1 as const,
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    listType: 'number',
    start: 1,
    tag: 'ol',
    version: 1,
  }
}

export function hr(): HorizontalRuleNode {
  return { type: 'horizontalrule', version: 1 }
}

export function banner(style: 'info' | 'warning' | 'error' | 'success', content: RootNode): BannerBlockNode {
  return {
    type: 'block',
    fields: {
      blockName: '',
      blockType: 'banner',
      content,
      style,
    },
    format: '',
    version: 2,
  }
}

export function callout(variant: 'info' | 'warning' | 'success' | 'error', content: RootNode, title?: string): CalloutBlockNode {
  return {
    type: 'block',
    fields: {
      blockName: '',
      blockType: 'callout',
      variant,
      content,
      ...(title ? { title } : {}),
    },
    format: '',
    version: 2,
  }
}

export function lexicalRoot(...children: BlockNode[]): RootNode {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}
