import type { SiteSetting } from '@/payload-types'

export type SocialLinkItem = NonNullable<SiteSetting['socialLinks']>[number]

const SOCIAL_TYPES = new Set([
  'instagram',
  'x-twitter',
  'facebook',
  'youtube',
  'tiktok',
  'linkedin',
  'github',
  'website',
  'other',
])

const CONTACT_TYPES = new Set(['whatsapp', 'phone', 'email'])

const TYPE_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  'x-twitter': 'X (Twitter)',
  facebook: 'Facebook',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  whatsapp: 'WhatsApp',
  phone: 'Telefon',
  email: 'E-posta',
  website: 'Web Sitesi',
}

/** Find a single link by type (e.g. 'whatsapp', 'phone', 'email') */
export function getSocialLink(
  links: SocialLinkItem[] | null | undefined,
  type: string,
): SocialLinkItem | undefined {
  return links?.find((l) => l.type === type)
}

/** Filter only social media links (not phone/email/whatsapp) */
export function getSocialLinks(
  links: SocialLinkItem[] | null | undefined,
): SocialLinkItem[] {
  return links?.filter((l) => SOCIAL_TYPES.has(l.type)) ?? []
}

/** Filter only contact links (phone/email/whatsapp) */
export function getContactLinks(
  links: SocialLinkItem[] | null | undefined,
): SocialLinkItem[] {
  return links?.filter((l) => CONTACT_TYPES.has(l.type)) ?? []
}

/** Format URL based on type */
export function formatSocialUrl(link: SocialLinkItem): string {
  switch (link.type) {
    case 'phone':
      return `tel:${link.url}`
    case 'email':
      return `mailto:${link.url}`
    case 'whatsapp':
      return `https://wa.me/${link.url.replace(/\D/g, '')}`
    default:
      return link.url
  }
}

/** Get display label for a link */
export function getSocialLabel(link: SocialLinkItem): string {
  if (link.type === 'other') {
    return link.label || link.customType || 'Diğer'
  }
  return link.label || TYPE_LABELS[link.type] || link.type
}

/** Get the Lucide icon name for a type */
export function getSocialIconName(type: string): string {
  const map: Record<string, string> = {
    instagram: 'instagram',
    'x-twitter': 'x-twitter',
    facebook: 'facebook',
    youtube: 'youtube',
    tiktok: 'tiktok',
    linkedin: 'linkedin',
    github: 'github',
    whatsapp: 'message-circle',
    phone: 'phone',
    email: 'mail',
    website: 'globe',
  }
  return map[type] || 'globe'
}
