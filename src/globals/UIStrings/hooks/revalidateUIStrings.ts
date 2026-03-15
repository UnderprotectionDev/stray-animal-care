import { createGlobalRevalidateHook } from '@/hooks/createRevalidateHook'

export const revalidateUIStrings = createGlobalRevalidateHook({
  entityName: 'UI strings',
  tags: ['global_ui-strings'],
})
