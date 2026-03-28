import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Archivo, Archivo_Black, Space_Mono } from 'next/font/google'
import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'

const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hero-variable',
  display: 'swap',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-heading',
  weight: '400',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-mono',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { MobileDonateBar } from '@/components/shared/MobileDonateBar'
import { CustomCursor } from '@/components/CustomCursor'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import type { SiteSetting, UiString } from '@/payload-types'

import '../globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const { isEnabled } = await draftMode()

  let siteSettings: SiteSetting | null = null
  let ui: UiString | null = null
  try {
    siteSettings = (await getCachedGlobal('site-settings', 1, locale)()) as SiteSetting
  } catch {
    // site-settings fetch failed — continue with null
  }
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed — continue with null
  }

  const layoutLabels = ui?.layout
  const headerLabels = layoutLabels?.header
  const searchLabels = ui?.search
  const footerLabels = layoutLabels?.footer
  const mobileDonateLabel = layoutLabels?.mobileDonate?.cta

  return (
    <html
      className={cn(archivo.variable, archivoBlack.variable, spaceMono.variable)}
      lang={locale}
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={{}}>
            <NuqsAdapter>
            <CustomCursor>
            <div className="content-above-footer">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:border focus:border-border"
              >
                {layoutLabels?.skipToContent || 'İçeriğe geç'}
              </a>
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
              <Header locale={locale} headerLabels={headerLabels} searchLabels={searchLabels} siteSettings={siteSettings} />
              <main id="main-content" className="flex-1 pb-20 md:pb-0">
                {children}
              </main>
            </div>
            <Footer siteSettings={siteSettings} labels={footerLabels} headerLabels={headerLabels} />
            <MobileDonateBar label={mobileDonateLabel} />
            </CustomCursor>
            </NuqsAdapter>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // ui-strings fetch failed
  }

  return {
    metadataBase: new URL(getServerSideURL()),
    openGraph: mergeOpenGraph({
      title: ui?.layout?.siteTitle || 'Paws of Hope',
      description: ui?.layout?.siteDescription || '',
      locale,
    }),
    twitter: {
      card: 'summary_large_image',
      creator: '@pawsofhope',
    },
  }
}
