export function formatDate(date: string | Date, locale = "tr-TR") {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}
