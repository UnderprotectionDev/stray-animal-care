import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { Instagram, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react'

import type { SiteSetting } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { CopyButton } from '@/components/shared/CopyButton'

type FooterProps = {
  siteSettings: SiteSetting | null
}

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/acil-vakalar', labelKey: 'emergency' },
  { href: '/gonullu-ol', labelKey: 'volunteer' },
  { href: '/gunluk', labelKey: 'blog' },
  { href: '/destek-ol', labelKey: 'donate' },
] as const

export async function Footer({ siteSettings }: FooterProps) {
  const t = await getTranslations('layout.footer')
  const tHeader = await getTranslations('layout.header')

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="g-1 md:g-4 border-t border-border">
        {/* Brand Column */}
        <div className="panel space-y-4">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
          <p className="t-meta text-muted-foreground">{t('description')}</p>
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
            {t('quickLinks')}
          </h3>
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className="t-meta text-muted-foreground transition-colors hover:text-foreground"
              >
                {labelKey === 'home' ? tHeader('home') : tHeader(labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bank Info Column */}
        <div className="panel space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider">
            {t('bankInfo')}
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
                    label={t('copyIban')}
                    className="shrink-0"
                  />
                </div>
              )}
            </div>
          )}
          {(siteSettings?.paypalLink || siteSettings?.wiseLink) && (
            <div className="space-y-2">
              <p className="t-meta font-bold uppercase tracking-wider text-muted-foreground">
                {t('international')}
              </p>
              <div className="flex flex-wrap gap-2">
                {siteSettings?.paypalLink && (
                  <a
                    href={siteSettings?.paypalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta text-xs py-1 px-3"
                  >
                    PayPal <ExternalLink className="size-3" />
                  </a>
                )}
                {siteSettings?.wiseLink && (
                  <a
                    href={siteSettings?.wiseLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta text-xs py-1 px-3"
                  >
                    Wise <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Contact Column */}
        <div className="panel space-y-4">
          <h3 className="t-meta font-bold uppercase tracking-wider">
            {t('contactUs')}
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
          &copy; {new Date().getFullYear()} Paws of Hope. {t('copyright')}
        </p>
      </div>
    </footer>
  )
}
