import type { Block } from 'payload'
import { enabledField } from '@/fields/homepageFields'

export const StatsBlock: Block = {
  slug: 'homeStats',
  labels: { singular: 'İstatistikler', plural: 'İstatistikler' },
  fields: [
    enabledField(),
    {
      name: 'metrics',
      label: 'Metrikler',
      type: 'array',
      labels: { singular: 'Metrik', plural: 'Metrikler' },
      minRows: 0,
      maxRows: 8,
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          label: 'Etiket',
        },
        {
          name: 'value',
          type: 'text',
          localized: true,
          label: 'Değer',
        },
        {
          name: 'name',
          type: 'text',
          localized: true,
          label: 'İsim',
        },
      ],
      defaultValue: [
        { label: 'METRİK 01 // OPERASYONEL', value: '347', name: 'KURTARILAN' },
        { label: 'METRİK 02 // TRANSFER', value: '89', name: 'YENİ BULDU' },
        { label: 'METRİK 03 // LOJİSTİK', value: '2.4K', name: 'BESLENDİ' },
        { label: 'METRİK 04 // SÜREKLİLİK', value: '04', name: 'AKTİF YUVA' },
      ],
    },
  ],
}
