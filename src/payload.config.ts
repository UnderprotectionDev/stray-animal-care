import { postgresAdapter } from '@payloadcms/db-postgres'
import { tr } from '@payloadcms/translations/languages/tr'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Animals } from './collections/Animals'
import { Categories } from './collections/Categories'
import { EmergencyCases } from './collections/EmergencyCases'
import { Events } from './collections/Events'
import { Media } from './collections/Media'
import { NeedsList } from './collections/NeedsList'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { TransparencyReports } from './collections/TransparencyReports'
import { Users } from './collections/Users'
import { VetRecords } from './collections/VetRecords'
import { Volunteers } from './collections/Volunteers'
import { Header } from './Header/config'
import { SiteSettings } from './SiteSettings/config'
import { UIStrings } from './globals/UIStrings/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    fallbackLanguage: 'tr',
    supportedLanguages: { tr },
    translations: {
      tr: {
        'plugin-translator': {
          resolver_copy_buttonLabel: 'Diğer dilden kopyala',
          resolver_copy_errorMessage: 'Veri kopyalanırken bir hata oluştu',
          resolver_copy_modalTitle: 'Kopyalanacak dili seçin',
          resolver_copy_submitButtonLabelEmpty: 'Yalnızca boş alanları kopyala',
          resolver_copy_submitButtonLabelFull: 'Tümünü kopyala',
          resolver_copy_successMessage: 'Başarıyla kopyalandı. Sayfa yenileniyor...',
        },
      },
    },
  },
  localization: {
    locales: [
      { label: 'Türkçe', code: 'tr' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'tr',
    fallback: true,
  },
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      afterNavLinks: ['@/components/admin/CustomNavLinks#CustomNavLinks'],
      views: {
        dashboard: {
          Component: '@/components/admin/DashboardView#DashboardView',
        },
        'hayvan-takip': {
          Component: '@/components/admin/views/AnimalTrackingView#AnimalTrackingView',
          path: '/hayvan-takip',
        },
        'vaka-takip': {
          Component: '@/components/admin/views/CaseTrackingView#CaseTrackingView',
          path: '/vaka-takip',
        },
        'gonullu-yonetim': {
          Component: '@/components/admin/views/VolunteerManagementView#VolunteerManagementView',
          path: '/gonullu-yonetim',
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  collections: [Pages, Posts, Media, Categories, Users, Animals, EmergencyCases, VetRecords, Events, Volunteers, NeedsList, TransparencyReports],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, SiteSettings, UIStrings],
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
