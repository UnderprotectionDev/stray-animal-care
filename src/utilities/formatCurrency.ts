export function formatCurrency(amount: number, minimumFractionDigits = 0): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits,
  }).format(amount)
}
