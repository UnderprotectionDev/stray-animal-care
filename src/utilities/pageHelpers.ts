import type { Metadata } from 'next'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { locales, defaultLocale, type Locale } from '@/i18n/config'
import type { UiString } from '@/payload-types'

/**
 * Normalize a locale string to a valid Locale type.
 * Falls back to defaultLocale if the value is not in the supported locales list.
 */
export function normalizeLocale(locale: string): Locale {
  return locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
}

/**
 * Generate page metadata from UI strings.
 * Fetches the ui-strings global and extracts meta.title / meta.description
 * for the given section key.
 *
 * @param locale - The current locale string
 * @param section - The top-level key on UiString (e.g. 'donate', 'volunteer', 'ourWork')
 * @param fallbackTitle - Fallback title if CMS value is missing
 * @param fallbackDescription - Fallback description (defaults to '')
 */
export async function generatePageMetadata(
  locale: string,
  section: keyof UiString,
  fallbackTitle: string,
  fallbackDescription = '',
): Promise<Metadata> {
  let ui: UiString | null = null
  try {
    ui = (await getCachedGlobal('ui-strings', 0, locale)()) as UiString | null
  } catch {
    // Silently fall back to defaults
  }
  const sectionData = ui?.[section] as Record<string, unknown> | undefined
  const meta = sectionData?.meta as { title?: string; description?: string } | undefined
  return {
    title: meta?.title || fallbackTitle,
    description: meta?.description || fallbackDescription,
  }
}
