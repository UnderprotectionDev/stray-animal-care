import { Link } from '@/i18n/navigation'
import React from 'react'
import { Phone, Mail } from 'lucide-react'

import type { SiteSetting, UiString } from '@/payload-types'

import { CopyButton } from '@/components/shared/CopyButton'
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

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/acil-vakalar', labelKey: 'emergency' },
  { href: '/gonullu-ol', labelKey: 'volunteer' },
  { href: '/gunluk', labelKey: 'blog' },
  { href: '/destek-ol', labelKey: 'donate' },
] as const

export async function Footer({ siteSettings, labels, headerLabels }: FooterProps) {
  const fl = (key: string) => (labels as Record<string, string | null | undefined> | null)?.[key] || key
  const hl = (key: string) => (headerLabels as Record<string, string | null | undefined> | null)?.[key] || key

  const socialLinks = getSocialLinks(siteSettings?.socialLinks)
  const contactLinks = getContactLinks(siteSettings?.socialLinks)

  return (
    <footer className="mt-auto border-t-[1.5px] border-palette-cream/20 bg-palette-black text-palette-cream">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12 md:px-8 md:py-16">
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
                    {Icon ? <Icon className="size-4" /> : <SocialIcon icon={link.type} className="size-4" />}
                    {link.type === 'whatsapp' ? getSocialLabel(link) : link.url}
                  </a>
                )
              })}
            </div>
          )}
        </div>

        {/* Column 2 — Quick Links */}
        <div className="space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider font-heading text-palette-yellow">
            {fl('quickLinks')}
          </h3>
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ href, labelKey }) => (
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

        {/* Column 3 — Bank Info */}
        <div className="space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider font-heading text-palette-yellow">
            {fl('bankInfo')}
          </h3>
          {siteSettings?.bankAccounts && siteSettings.bankAccounts.length > 0 && (
            <div className="space-y-3">
              {siteSettings.bankAccounts.map((account, i) => (
                <div key={account.id || i} className="rounded-none border border-white/20 bg-white/10 p-4 space-y-2">
                  {account.bankName && (
                    <p className="t-meta font-bold text-palette-yellow">{account.bankName}</p>
                  )}
                  {account.iban && (
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono break-all">{account.iban}</code>
                      <CopyButton
                        text={account.iban}
                        label={fl('copyIban')}
                        className="shrink-0 border-palette-cream/30 bg-transparent text-palette-cream hover:bg-white/10"
                      />
                    </div>
                  )}
                  {account.accountHolder && (
                    <p className="t-meta text-palette-cream/60">{account.accountHolder}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-palette-cream/20 px-6 py-4 md:flex-row md:px-8">
        <p className="t-meta text-palette-cream/50">
          &copy; {new Date().getFullYear()} Paws of Hope. {fl('copyright')}
        </p>
      </div>
    </footer>
  )
}
