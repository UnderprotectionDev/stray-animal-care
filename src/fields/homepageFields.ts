import type { Field } from 'payload'

/** Checkbox to enable/disable a homepage block */
export function enabledField(): Field {
  return { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' }
}

/** Localized section title field */
export function sectionTitleField(defaultValue = ''): Field {
  return { name: 'sectionTitle', type: 'text', localized: true, label: 'Bölüm Başlığı', defaultValue }
}

/** View-all label + link field pair */
export function viewAllFields(defaultLabel = 'Tümünü Gör', defaultLink = '/'): Field[] {
  return [
    { name: 'viewAllLabel', type: 'text', localized: true, defaultValue: defaultLabel, label: 'Tümünü Gör Etiketi' },
    { name: 'viewAllLink', type: 'text', defaultValue: defaultLink, label: 'Tümünü Gör Linki' },
  ]
}
