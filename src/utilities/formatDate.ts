export function formatDate(date: string | Date, locale: string): string {
  const parsed = date instanceof Date ? date : new Date(date)
  if (isNaN(parsed.getTime())) return ''
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}
