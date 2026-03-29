declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      REVALIDATION_SECRET?: string
      CRON_SECRET?: string
      PREVIEW_SECRET?: string
      BLOB_READ_WRITE_TOKEN?: string
    }
  }
}

export {}
