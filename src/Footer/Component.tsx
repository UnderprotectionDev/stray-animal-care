import { Link } from '@/i18n/navigation'
import React from 'react'
import { Phone, Mail } from 'lucide-react'

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
  siteSettings: SiteSetting | null
  labels?: FooterLabels | null
  headerLabels?: HeaderLabels | null
}

const EXPLORE_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/gunluk', labelKey: 'blog' },
  { href: '/gelecek-vizyonu', labelKey: 'vision' },
] as const

const SUPPORT_ITEMS = [
  { href: '/destek-ol', labelKey: 'donate' },
  { href: '/gonullu-ol', labelKey: 'volunteer' },
  { href: '/acil-vakalar', labelKey: 'emergency' },
  { href: '/ihtiyac-listesi', labelKey: 'supplies' },
] as const

export async function Footer({ siteSettings, labels, headerLabels }: FooterProps) {
  const fl = (key: string) =>
    (labels as Record<string, string | null | undefined> | null)?.[key] || key
  const hl = (key: string) =>
    (headerLabels as Record<string, string | null | undefined> | null)?.[key] || key

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
              PATİLERİN
              <br />
              UMUDU
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
