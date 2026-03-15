import { createCollectionRevalidateHooks } from '@/hooks/createRevalidateHook'

const { afterChange, afterDelete } = createCollectionRevalidateHooks({
  entityName: 'animal',
  tags: ['animals-list', 'animals-sitemap'],
  paths: ['/{locale}/canlarimiz/{slug}', '/{locale}/canlarimiz'],
})

export const revalidateAnimal = afterChange
export const revalidateAnimalDelete = afterDelete
