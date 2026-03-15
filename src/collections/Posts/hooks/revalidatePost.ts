import { createCollectionRevalidateHooks } from '@/hooks/createRevalidateHook'

const { afterChange, afterDelete } = createCollectionRevalidateHooks({
  entityName: 'post',
  tags: ['posts-sitemap', 'blog-list'],
  paths: ['/{locale}/gunluk/{slug}', '/{locale}/gunluk'],
})

export const revalidatePost = afterChange
export const revalidateDelete = afterDelete
