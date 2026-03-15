import { createCollectionRevalidateHooks } from '@/hooks/createRevalidateHook'

const { afterChange, afterDelete } = createCollectionRevalidateHooks({
  entityName: 'event',
  tags: ['events-list', 'events-sitemap'],
  checkStatus: false,
})

export const revalidateEvent = afterChange
export const revalidateEventDelete = afterDelete
