import { createCollectionRevalidateHooks } from '@/hooks/createRevalidateHook'

const { afterChange, afterDelete } = createCollectionRevalidateHooks({
  entityName: 'transparency report',
  tags: ['transparency-reports', 'tr', 'en'],
  checkStatus: false,
})

export const revalidateTransparencyReport = afterChange
export const revalidateTransparencyReportDelete = afterDelete
