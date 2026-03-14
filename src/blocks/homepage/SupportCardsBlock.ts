import type { Block } from 'payload'

export const SupportCardsBlock: Block = {
  slug: 'homeSupportCards',
  labels: { singular: 'Destek Kartları', plural: 'Destek Kartları' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'slogan', type: 'text', localized: true, defaultValue: 'Bir Can Kurtar', label: 'Slogan' },
    { name: 'ibanTitle', type: 'text', localized: true, defaultValue: 'IBAN ile Bağış', label: 'IBAN Başlığı' },
    { name: 'internationalTitle', type: 'text', localized: true, defaultValue: 'Uluslararası Destek', label: 'Uluslararası Başlık' },
    { name: 'volunteerTitle', type: 'text', localized: true, defaultValue: 'Gönüllü Ol', label: 'Gönüllü Başlığı' },
    { name: 'volunteerDescription', type: 'textarea', localized: true, defaultValue: 'Zamanınızı verin, saha ekibimize katılın.', label: 'Gönüllü Açıklaması' },
    { name: 'internationalPlaceholder', type: 'text', localized: true, defaultValue: 'Yurtdışı ödeme seçenekleri hazırlanıyor.', label: 'Uluslararası Yer Tutucu' },
    {
      name: 'labels',
      label: 'Etiketler',
      type: 'group',
      fields: [
        { name: 'copy', type: 'text', localized: true, defaultValue: 'Kopyala', label: 'Kopyala' },
        { name: 'comingSoon', type: 'text', localized: true, defaultValue: 'Yakında', label: 'Yakında' },
        { name: 'ibanPlaceholder', type: 'text', localized: true, defaultValue: 'Banka hesap bilgileri yakında eklenecek.', label: 'IBAN Yer Tutucu' },
      ],
    },
  ],
}
