import { Link } from '@/i18n/navigation'
import React from 'react'
import { Phone, Mail } from 'lucide-react'

import type { Locale } from '@/i18n/config'
import type { SiteSetting, UiString } from '@/payload-types'

import { SocialIcon } from '@/utilities/socialIcons'
import {
  getSocialLinks,
  getContactLinks,
  formatSocialUrl,
  getSocialLabel,
} from '@/utilities/socialLinks'

type FooterLabels = NonNullable<UiString['layout']>['footer']
type HeaderLabels = NonNullable<UiString['layout']>['header']

type FooterProps = {
  locale: Locale
  siteSettings: SiteSetting | null
  labels?: FooterLabels | null
  headerLabels?: HeaderLabels | null
}

const DEFAULT_BRAND_LINES: Record<Locale, [string, string]> = {
  tr: ['PATİLERİN', 'UMUDU'],
  en: ['PAWS OF', 'HOPE'],
}

const DEFAULT_FOOTER_LABELS: Record<Locale, Record<string, string>> = {
  tr: {
    copyright: 'Tum haklari saklidir.',
    explore: 'Kesfet',
    support: 'Destek',
    description: 'Sokak hayvanlarina umut oluyoruz.',
    missionTitle: 'Hayata Deger Kat',
    missionText: 'Her patili can bir yuva, her destek bir umut.',
    donateButton: 'Destek Ol',
    volunteerButton: 'Gonullu Ol',
    emergencyLine: 'Acil Hat',
    madeWithLove: 'Sokak hayvanlari icin sevgiyle yapildi',
  },
  en: {
    copyright: 'All rights reserved.',
    explore: 'Explore',
    support: 'Support',
    description: 'We bring hope to stray animals.',
    missionTitle: 'Make a Difference',
    missionText: 'Every paw deserves a home, every support brings hope.',
    donateButton: 'Donate',
    volunteerButton: 'Volunteer',
    emergencyLine: 'Emergency Hotline',
    madeWithLove: 'Made with love for stray animals',
  },
}

const isLikelyTurkish = (value: string) => {
  const turkishChars = /[ÇçĞğİıÖöŞşÜü]/
  const turkishWords =
    /\b(ana sayfa|destek|gönüllü|gonullu|acil|ihtiyaç|ihtiyac|keşfet|kesfet|hayata değer kat|hayata deger kat)\b/i
  return turkishChars.test(value) || turkishWords.test(value)
}

const DEFAULT_HEADER_LABELS: Record<Locale, Record<string, string>> = {
  tr: {
    home: 'Ana Sayfa',
    blog: 'Blog',
    vision: 'Gelecek Vizyonu',
    donate: 'Destek Ol',
    volunteer: 'Gonullu Ol',
    emergency: 'Acil Durumlar',
    supplies: 'Ihtiyac Listesi',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    vision: 'Future Vision',
    donate: 'Donate',
    volunteer: 'Volunteer',
    emergency: 'Emergencies',
    supplies: 'Needs List',
  },
}

const EXPLORE_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/gunluk', labelKey: 'blog' },
  { href: '/gelecek-vizyonu', labelKey: 'vision' },
] as const

const SUPPORT_ITEMS = [
  { href: '/destek-ol', labelKey: 'donate' },
  { href: '/gonullu-ol', labelKey: 'volunteer' },
  { href: '/acil-vakalar', labelKey: 'emergency' },
  { href: '/ihtiyac-listesi', labelKey: 'supplies' },
] as const

export async function Footer({ locale, siteSettings, labels, headerLabels }: FooterProps) {
  const fallbackFooterLabels = DEFAULT_FOOTER_LABELS[locale]
  const fallbackHeaderLabels = DEFAULT_HEADER_LABELS[locale]
  const [brandTop, brandBottom] = DEFAULT_BRAND_LINES[locale]

  const getCMSLabel = (source: Record<string, string | null | undefined> | null, key: string) => {
    const raw = source?.[key]
    if (!raw) return undefined
    if (locale === 'en' && isLikelyTurkish(raw)) return undefined
    return raw
  }

  const fl = (key: string) =>
    getCMSLabel(labels as Record<string, string | null | undefined> | null, key) ||
    fallbackFooterLabels[key] ||
    key
  const hl = (key: string) =>
    getCMSLabel(headerLabels as Record<string, string | null | undefined> | null, key) ||
    fallbackHeaderLabels[key] ||
    key

  const socialLinks = getSocialLinks(siteSettings?.socialLinks)
  const contactLinks = getContactLinks(siteSettings?.socialLinks)

  const emergencyPhone = contactLinks.find((l) => l.type === 'phone')

  return (
    <footer className="sticky z-0 bottom-0 left-0 w-full bg-palette-black text-palette-cream">
      <div className="relative overflow-hidden w-full h-full">
        <div className="grid grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-8 md:py-16">
          {/* Column 1 — Brand + Contact */}
          <div className="space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-heading font-bold text-[2rem] uppercase leading-tight">
                {brandTop}
                <br />
                {brandBottom}
              </span>
            </Link>
            <p className="t-meta text-palette-cream/70">{fl('description')}</p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={formatSocialUrl(link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-palette-cream/60 transition-colors hover:text-palette-coral"
                    aria-label={getSocialLabel(link)}
                  >
                    <SocialIcon icon={link.type} className="size-5" />
                  </a>
                ))}
              </div>
            )}
            {contactLinks.length > 0 && (
              <div className="flex flex-col gap-3 pt-2">
                {contactLinks.map((link) => {
                  const IconMap: Record<string, typeof Phone> = { phone: Phone, email: Mail }
                  const Icon = IconMap[link.type]
                  return (
                    <a
                      key={link.id}
                      href={formatSocialUrl(link)}
                      target={link.type === 'whatsapp' ? '_blank' : undefined}
                      rel={link.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                      className="t-meta inline-flex items-center gap-2 text-palette-cream/70 transition-colors hover:text-palette-cream"
                    >
                      {Icon ? (
                        <Icon className="size-4" />
                      ) : (
                        <SocialIcon icon={link.type} className="size-4" />
                      )}
                      {link.type === 'whatsapp' ? getSocialLabel(link) : link.url}
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Column 2 — Keşfet */}
          <div className="space-y-4">
            <h3 className="t-meta font-heading font-bold uppercase tracking-wider text-palette-yellow">
              {fl('explore')}
            </h3>
            <nav className="flex flex-col gap-2">
              {EXPLORE_ITEMS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className="t-meta text-palette-cream/70 transition-colors hover:text-palette-cream"
                >
                  {hl(labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Destek */}
          <div className="space-y-4">
            <h3 className="t-meta font-heading font-bold uppercase tracking-wider text-palette-yellow">
              {fl('support')}
            </h3>
            <nav className="flex flex-col gap-2">
              {SUPPORT_ITEMS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className="t-meta text-palette-cream/70 transition-colors hover:text-palette-cream"
                >
                  {hl(labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4 — Mission + CTA */}
          <div className="space-y-5">
            <h3 className="t-meta font-heading font-bold uppercase tracking-wider text-palette-yellow">
              {fl('missionTitle')}
            </h3>
            <p className="t-meta text-palette-cream/70">{fl('missionText')}</p>
            <div className="flex flex-col gap-3">
              <Link
                href="/destek-ol"
                className="btn-health inline-flex items-center justify-center px-5 py-2.5 text-center font-heading text-sm font-bold uppercase"
              >
                {fl('donateButton')}
              </Link>
              <Link
                href="/gonullu-ol"
                className="inline-flex items-center justify-center border-[1.5px] border-palette-cream px-5 py-2.5 text-center font-heading text-sm font-bold uppercase text-palette-cream transition-colors hover:bg-palette-cream hover:text-palette-black"
              >
                {fl('volunteerButton')}
              </Link>
            </div>
            {emergencyPhone && (
              <div className="pt-1">
                <a
                  href={formatSocialUrl(emergencyPhone)}
                  className="t-meta inline-flex items-center gap-2 text-palette-yellow transition-colors hover:text-palette-cream"
                >
                  <Phone className="size-4" />
                  <span>
                    {fl('emergencyLine')}: {emergencyPhone.url}
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-2 border-t border-palette-cream/20 px-6 py-4 md:flex-row md:px-8">
          <p className="t-meta text-palette-cream/50">
            &copy; {new Date().getFullYear()} Paws of Hope. {fl('copyright')}
          </p>
          <p className="t-meta text-palette-cream/50">{fl('madeWithLove')}</p>
        </div>
      </div>
    </footer>
  )
}
