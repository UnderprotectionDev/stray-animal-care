import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Plus_Jakarta_Sans, Inter, Caveat } from 'next/font/google'
import React from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['400', '700'],
  display: 'swap',
})

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { MobileDonateBar } from '@/components/shared/MobileDonateBar'
import { PawCursor } from '@/components/shared/PawCursor'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import type { SiteSetting } from '@/payload-types'

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
  const messages = await getMessages()
  const t = await getTranslations('layout')
  const siteSettings: SiteSetting = await getCachedGlobal('site-settings', 1)()

  return (
    <html
      className={cn(plusJakarta.variable, inter.variable, caveat.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <NuqsAdapter>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
            >
              {t('skipToContent')}
            </a>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            <Header />
            <main id="main-content" className="flex-1 pb-20 md:pb-0">
              {children}
            </main>
            <Footer siteSettings={siteSettings} />
            <MobileDonateBar />
            <PawCursor />
            </NuqsAdapter>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'layout' })

  return {
    metadataBase: new URL(getServerSideURL()),
    openGraph: mergeOpenGraph({
      title: t('siteTitle'),
      description: t('siteDescription'),
      locale,
    }),
    twitter: {
      card: 'summary_large_image',
      creator: '@pawsofhope',
    },
  }
}
