import { createCollectionRevalidateHooks } from '@/hooks/createRevalidateHook'

const { afterChange, afterDelete } = createCollectionRevalidateHooks({
  entityName: 'emergency case',
  tags: ['emergency-list', 'emergency-sitemap'],
  paths: ['/{locale}/acil-vakalar/{slug}', '/{locale}/acil-vakalar'],
})

export const revalidateEmergencyCase = afterChange
export const revalidateEmergencyCaseDelete = afterDelete
