import type { Field } from 'payload'

type HomepageBlockData = {
  enabled?: boolean | null
}

function isHomepageBlockEnabled(options: any): boolean {
  const rawPath = options?.path
  const path = Array.isArray(rawPath) ? rawPath.join('.') : String(rawPath ?? '')
  const match = path.match(/homepageBlocks\.(\d+)\./)

  if (!match) return true

  const index = Number(match[1])
  const blocks = (options?.data as { homepageBlocks?: HomepageBlockData[] } | undefined)
    ?.homepageBlocks

  if (!Array.isArray(blocks)) return true

  return blocks[index]?.enabled !== false
}

/** Checkbox to enable/disable a homepage block */
export function enabledField(): Field {
  return { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' }
}

/** Localized section title field */
export function sectionTitleField(defaultValue = ''): Field {
  return {
    name: 'sectionTitle',
    type: 'text',
    localized: true,
    label: 'Bölüm Başlığı',
    defaultValue,
  }
}

/** View-all label + link field pair */
export function viewAllFields(defaultLabel = 'Tümünü Gör', defaultLink = '/'): Field[] {
  return [
    {
      name: 'viewAllLabel',
      type: 'text',
      localized: true,
      defaultValue: defaultLabel,
      label: 'Tümünü Gör Etiketi',
    },
    { name: 'viewAllLink', type: 'text', defaultValue: defaultLink, label: 'Tümünü Gör Linki' },
  ]
}

/** Required validation that is skipped when the homepage block is disabled */
export function requiredWhenEnabled(message = 'Bu alan zorunludur') {
  return (value: unknown, options: any) => {
    if (!isHomepageBlockEnabled(options)) return true

    if (typeof value === 'string') return value.trim().length > 0 || message
    if (Array.isArray(value)) return value.length > 0 || message

    return (value !== null && value !== undefined) || message
  }
}

/** Min rows validation that is skipped when the homepage block is disabled */
export function minRowsWhenEnabled(minRows: number, message?: string) {
  return (value: unknown, options: any) => {
    if (!isHomepageBlockEnabled(options)) return true

    if (!Array.isArray(value) || value.length < minRows) {
      return message ?? `En az ${minRows} kayıt girmelisiniz`
    }

    return true
  }
}
