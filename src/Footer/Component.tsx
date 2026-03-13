import { Link } from '@/i18n/navigation'
import React from 'react'
import { Instagram, Phone, Mail, MessageCircle } from 'lucide-react'

import type { SiteSetting, UiString } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { CopyButton } from '@/components/shared/CopyButton'

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

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="g-1 md:g-4 border-t border-border">
        {/* Brand Column */}
        <div className="panel space-y-4">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
          <p className="t-meta text-muted-foreground">{fl('description')}</p>
          <div className="flex items-center gap-3">
            {siteSettings?.instagram && (
              <a
                href={siteSettings?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            )}
            {siteSettings?.whatsapp && (
              <a
                href={`https://wa.me/${siteSettings?.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="WhatsApp"
              >
                <MessageCircle className="size-5" />
              </a>
            )}
          </div>
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
          {(siteSettings?.bankName || siteSettings?.iban) && (
            <div className="border border-border p-4 space-y-2">
              {siteSettings?.bankName && (
                <p className="t-meta text-muted-foreground">{siteSettings?.bankName}</p>
              )}
              {siteSettings?.accountHolder && (
                <p className="t-meta font-bold">{siteSettings?.accountHolder}</p>
              )}
              {siteSettings?.iban && (
                <div className="flex items-center gap-2">
                  <code className="text-xs font-mono break-all">{siteSettings?.iban}</code>
                  <CopyButton
                    text={siteSettings?.iban}
                    label={fl('copyIban')}
                    className="shrink-0"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contact Column */}
        <div className="panel space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider">
            {fl('contactUs')}
          </h3>
          <div className="flex flex-col gap-3">
            {siteSettings?.phone && (
              <a
                href={`tel:${siteSettings?.phone}`}
                className="t-meta inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Phone className="size-4" />
                {siteSettings?.phone}
              </a>
            )}
            {siteSettings?.email && (
              <a
                href={`mailto:${siteSettings?.email}`}
                className="t-meta inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-4" />
                {siteSettings?.email}
              </a>
            )}
            {siteSettings?.whatsapp && (
              <a
                href={`https://wa.me/${siteSettings?.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            )}
          </div>
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
