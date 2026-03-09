import { AnimalDetail, getAnimalBySlug } from "@/modules/animals"

export default async function AnimalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const animal = await getAnimalBySlug(slug)
  return <AnimalDetail animal={animal} />
}
