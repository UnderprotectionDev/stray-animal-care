import type { Block } from 'payload'

export const SupportCardsBlock: Block = {
  slug: 'homeSupportCards',
  labels: { singular: 'Destek Kartları', plural: 'Destek Kartları' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'slogan', type: 'text', localized: true, defaultValue: 'Bir Can Kurtar' },
    { name: 'ibanTitle', type: 'text', localized: true, defaultValue: 'IBAN ile Bağış' },
    { name: 'internationalTitle', type: 'text', localized: true, defaultValue: 'Uluslararası Destek' },
    { name: 'volunteerTitle', type: 'text', localized: true, defaultValue: 'Gönüllü Ol' },
    { name: 'volunteerDescription', type: 'textarea', localized: true, defaultValue: 'Zamanınızı verin, saha ekibimize katılın.' },
    { name: 'internationalPlaceholder', type: 'text', localized: true, defaultValue: 'Yurtdışı ödeme seçenekleri hazırlanıyor.' },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'copy', type: 'text', localized: true, defaultValue: 'Kopyala' },
        { name: 'comingSoon', type: 'text', localized: true, defaultValue: 'Yakında' },
        { name: 'ibanPlaceholder', type: 'text', localized: true, defaultValue: 'Banka hesap bilgileri yakında eklenecek.' },
      ],
    },
  ],
}
