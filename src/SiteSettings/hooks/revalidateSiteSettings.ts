import { createGlobalRevalidateHook } from '@/hooks/createRevalidateHook'

export const revalidateSiteSettings = createGlobalRevalidateHook({
  entityName: 'site settings',
  tags: ['global_site-settings'],
})
