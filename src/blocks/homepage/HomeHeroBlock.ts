import type { Block } from 'payload'

export const HomeHeroBlock: Block = {
  slug: 'homeHero',
  labels: { singular: 'Hero', plural: 'Hero' },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true, label: 'Aktif' },
    { name: 'urgentBadge', type: 'text', localized: true, defaultValue: 'ACİL DURUM SÜRÜYOR' },
    { name: 'headline', type: 'textarea', localized: true, defaultValue: 'BİR İNSAN.\nBİNLERCE\nCAN.' },
    { name: 'description', type: 'textarea', localized: true, defaultValue: 'İstanbul\'un sokaklarında sistemli kurtarma operasyonu. Her can bir nefes, her nefes kaydedilen bir umut. Sadece beslemiyor, rehabilite ediyor ve kalıcı yuvalar buluyoruz.' },
    { name: 'quoteText', type: 'text', localized: true, defaultValue: 'Birini kurtarmak dünyayı değiştirmez. Ama o birinin dünyasını değiştirir.' },
    { name: 'quoteAuthor', type: 'text', localized: true, defaultValue: 'AYŞE' },
    { name: 'leftImage', type: 'upload', relationTo: 'media', label: 'Sol Görsel (Kedi)' },
    { name: 'rightImage', type: 'upload', relationTo: 'media', label: 'Sağ Görsel (Köpek)' },
  ],
}
