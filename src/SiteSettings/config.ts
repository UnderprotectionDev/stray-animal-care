import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { SOCIAL_PLATFORM_OPTIONS } from '../constants/options'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'
import {
  HomeHeroBlock,
  StatsBlock,
  StoryBlock,
  OurWorkBlock,
  FeaturedAnimalsBlock,
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
              labels: { singular: 'Banka Hesabı', plural: 'Banka Hesapları' },
              minRows: 0,
              maxRows: 10,
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/components/admin/RowLabels#BankAccountRowLabel',
                },
              },
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
          label: 'Sosyal Medya',
          fields: [
            {
              name: 'socialLinks',
              label: 'Sosyal Medya & İletişim Linkleri',
              type: 'array',
              labels: { singular: 'Sosyal Link', plural: 'Sosyal Linkler' },
              maxRows: 12,
              fields: [
                {
                  name: 'type',
                  label: 'Platform',
                  type: 'select',
                  required: true,
                  options: SOCIAL_PLATFORM_OPTIONS,
                },
                {
                  name: 'customType',
                  label: 'Platform Adı',
                  type: 'text',
                  admin: {
                    condition: (_data, siblingData) => siblingData?.type === 'other',
                    description: 'Örn: Bluesky, Threads, Telegram',
                  },
                },
                {
                  name: 'url',
                  label: 'URL / Değer',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'URL, telefon numarası veya e-posta adresi',
                  },
                },
                {
                  name: 'label',
                  label: 'Etiket (opsiyonel)',
                  type: 'text',
                  localized: true,
                  admin: {
                    description: 'Varsayılan platform adı yerine özel etiket',
                  },
                },
              ],
              admin: {
                initCollapsed: true,
                components: {
                  RowLabel: '@/SiteSettings/SocialLinkRowLabel#SocialLinkRowLabel',
                },
              },
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
