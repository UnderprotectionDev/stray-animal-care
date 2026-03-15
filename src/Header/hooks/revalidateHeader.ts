import { createGlobalRevalidateHook } from '@/hooks/createRevalidateHook'

export const revalidateHeader = createGlobalRevalidateHook({
  entityName: 'header',
  tags: ['global_header'],
})
