import { Link } from '@/i18n/navigation'
import React from 'react'
import { Phone, Mail } from 'lucide-react'

import type { SiteSetting, UiString } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
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
    <footer className="mt-auto border-t border-border bg-background">
      <div className="g-1 md:g-4 border-t border-border">
        {/* Brand Column */}
        <div className="panel space-y-4">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
          <p className="t-meta text-muted-foreground">{fl('description')}</p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={formatSocialUrl(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={getSocialLabel(link)}
                >
                  <SocialIcon icon={link.type} className="size-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links Column */}
        <div className="panel space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider">
            {fl('quickLinks')}
          </h3>
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className="t-meta text-muted-foreground transition-colors hover:text-foreground"
              >
                {hl(labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bank Info Column */}
        <div className="panel space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider">
            {fl('bankInfo')}
          </h3>
          {siteSettings?.bankAccounts && siteSettings.bankAccounts.length > 0 && (
            <div className="space-y-3">
              {siteSettings.bankAccounts.map((account, i) => (
                <div key={account.id || i} className="border border-border p-4 space-y-2">
                  {account.bankName && (
                    <p className="t-meta text-muted-foreground">{account.bankName}</p>
                  )}
                  {account.accountHolder && (
                    <p className="t-meta font-bold">{account.accountHolder}</p>
                  )}
                  {account.iban && (
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono break-all">{account.iban}</code>
                      <CopyButton
                        text={account.iban}
                        label={fl('copyIban')}
                        className="shrink-0"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Column */}
        <div className="panel space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider">
            {fl('contactUs')}
          </h3>
          {contactLinks.length > 0 && (
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => {
                const IconMap: Record<string, typeof Phone> = { phone: Phone, email: Mail }
                const Icon = IconMap[link.type]
                return (
                  <a
                    key={link.id}
                    href={formatSocialUrl(link)}
                    target={link.type === 'whatsapp' ? '_blank' : undefined}
                    rel={link.type === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    className="t-meta inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {Icon ? <Icon className="size-4" /> : <SocialIcon icon={link.type} className="size-4" />}
                    {link.type === 'whatsapp' ? getSocialLabel(link) : link.url}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="panel flex flex-col items-center justify-between gap-4 border-t border-border py-4 md:flex-row">
        <p className="t-meta text-muted-foreground">
          &copy; {new Date().getFullYear()} Paws of Hope. {fl('copyright')}
        </p>
      </div>
    </footer>
  )
}
