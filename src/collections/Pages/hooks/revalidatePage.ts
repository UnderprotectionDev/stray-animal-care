import { createCollectionRevalidateHooks } from '@/hooks/createRevalidateHook'

const { afterChange, afterDelete } = createCollectionRevalidateHooks({
  entityName: 'page',
  tags: ['pages-sitemap'],
  resolvePaths: (doc, locale) => {
    const slug = String(doc.slug ?? '')
    const path = slug === 'home' ? `/${locale}` : `/${locale}/${slug}`
    return [path]
  },
})

export const revalidatePage = afterChange
export const revalidateDelete = afterDelete
