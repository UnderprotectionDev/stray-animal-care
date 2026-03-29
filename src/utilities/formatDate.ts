/** Map app locale to Intl locale code */
function toIntlLocale(locale: string): string {
  if (locale === 'en') return 'en-GB'
  if (locale === 'tr') return 'tr-TR'
  return locale
}

export function formatDate(date: string | Date, locale: string): string {
  const parsed = date instanceof Date ? date : new Date(date)
  if (isNaN(parsed.getTime())) return ''
  return new Intl.DateTimeFormat(toIntlLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}

export function formatMonth(date: string | Date, locale: string): string {
  // Handle YYYY-MM format by appending day
  const raw = typeof date === 'string' && /^\d{4}-\d{2}$/.test(date) ? `${date}-01` : date
  const parsed = raw instanceof Date ? raw : new Date(raw)
  if (isNaN(parsed.getTime())) return ''
  return new Intl.DateTimeFormat(toIntlLocale(locale), {
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}
