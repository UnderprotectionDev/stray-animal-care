import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { Instagram, Phone, Mail, MessageCircle, ExternalLink } from 'lucide-react'

import type { SiteSetting } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { Logo } from '@/components/Logo/Logo'
import { CopyButton } from '@/components/shared/CopyButton'
import { Separator } from '@/components/ui/separator'

type FooterProps = {
  siteSettings: SiteSetting
}

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/canlarimiz', labelKey: 'animals' },
  { href: '/acil-durumlar', labelKey: 'emergency' },
  { href: '/posts', labelKey: 'blog' },
  { href: '/donate', labelKey: 'donate' },
] as const

export async function Footer({ siteSettings }: FooterProps) {
  const t = await getTranslations('layout.footer')
  const tHeader = await getTranslations('layout.header')

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="text-sm text-white/70">{t('description')}</p>
            <div className="flex items-center gap-3">
              {siteSettings.instagram && (
                <a
                  href={siteSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram className="size-5" />
                </a>
              )}
              {siteSettings.whatsapp && (
                <a
                  href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-white"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="size-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
              {t('quickLinks')}
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map(({ href, labelKey }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {labelKey === 'home' ? tHeader('home') : tHeader(labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bank Info Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
              {t('bankInfo')}
            </h3>
            {(siteSettings.bankName || siteSettings.iban) && (
              <div className="rounded-lg bg-white/5 p-4 space-y-2">
                {siteSettings.bankName && (
                  <p className="text-sm text-white/70">{siteSettings.bankName}</p>
                )}
                {siteSettings.accountHolder && (
                  <p className="text-sm font-medium">{siteSettings.accountHolder}</p>
                )}
                {siteSettings.iban && (
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-white/80 break-all">{siteSettings.iban}</code>
                    <CopyButton
                      text={siteSettings.iban}
                      label={t('copyIban')}
                      className="shrink-0 border-white/20 text-white hover:bg-white/10 hover:text-white"
                    />
                  </div>
                )}
              </div>
            )}
            {(siteSettings.paypalLink || siteSettings.wiseLink) && (
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                  {t('international')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {siteSettings.paypalLink && (
                    <a
                      href={siteSettings.paypalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/20"
                    >
                      PayPal <ExternalLink className="size-3" />
                    </a>
                  )}
                  {siteSettings.wiseLink && (
                    <a
                      href={siteSettings.wiseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/20"
                    >
                      Wise <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider">
              {t('contactUs')}
            </h3>
            <div className="flex flex-col gap-3">
              {siteSettings.phone && (
                <a
                  href={`tel:${siteSettings.phone}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="size-4" />
                  {siteSettings.phone}
                </a>
              )}
              {siteSettings.email && (
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="size-4" />
                  {siteSettings.email}
                </a>
              )}
              {siteSettings.whatsapp && (
                <a
                  href={`https://wa.me/${siteSettings.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Paws of Hope. {t('copyright')}
          </p>
          <ThemeSelector />
        </div>
      </div>
    </footer>
  )
}
