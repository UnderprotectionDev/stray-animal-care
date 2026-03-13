import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'
import {
  HomeHeroBlock,
  StatsBlock,
  StoryBlock,
  OurWorkBlock,
  FeaturedAnimalsBlock,
  SuccessStoriesBlock,
  ActiveEmergenciesBlock,
  SupportCardsBlock,
  NeedsListBlock,
  RecentPostsBlock,
  TransparencyBannerBlock,
} from '../blocks/homepage'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Ayarlar',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Ana Sayfa',
          fields: [
            {
              name: 'homepageBlocks',
              label: 'Ana Sayfa Blokları',
              type: 'blocks',
              blocks: [
                HomeHeroBlock,
                StatsBlock,
                StoryBlock,
                OurWorkBlock,
                FeaturedAnimalsBlock,
                SuccessStoriesBlock,
                ActiveEmergenciesBlock,
                SupportCardsBlock,
                NeedsListBlock,
                RecentPostsBlock,
                TransparencyBannerBlock,
              ],
              admin: {
                description: 'Ana sayfa bölümlerini sıralayın, etkinleştirin veya devre dışı bırakın.',
              },
            },
          ],
        },
        {
          label: 'Banka Bilgileri',
          fields: [
            {
              name: 'bankAccounts',
              label: 'Banka Hesapları',
              type: 'array',
              minRows: 0,
              maxRows: 10,
              fields: [
                {
                  name: 'bankName',
                  label: 'Banka Adı',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'accountHolder',
                  label: 'Hesap Sahibi',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'iban',
                  label: 'IBAN',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'currency',
                  label: 'Para Birimi',
                  type: 'select',
                  defaultValue: 'TRY',
                  options: [
                    { label: 'TRY', value: 'TRY' },
                    { label: 'USD', value: 'USD' },
                    { label: 'EUR', value: 'EUR' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'İletişim',
          fields: [
            {
              name: 'phone',
              label: 'Telefon',
              type: 'text',
            },
            {
              name: 'email',
              label: 'E-posta',
              type: 'text',
            },
            {
              name: 'whatsapp',
              label: 'WhatsApp',
              type: 'text',
            },
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
            },
          ],
        },
        {
          label: 'İstatistikler',
          fields: [
            {
              name: 'catsCount',
              label: 'Kedi Sayısı',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'dogsCount',
              label: 'Köpek Sayısı',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'treatedCount',
              label: 'Tedavi Edilen',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'spayedCount',
              label: 'Kısırlaştırılan',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'vaccinatedCount',
              label: 'Aşılanan',
              type: 'number',
              defaultValue: 0,
            },
            {
              name: 'feedingPointsCount',
              label: 'Besleme Noktası Sayısı',
              type: 'number',
              defaultValue: 0,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
