import { AnimalGrid, AnimalFilter, getAnimals } from "@/modules/animals"

export default async function AnimalsPage() {
  const animals = await getAnimals()
  return (
    <>
      <AnimalFilter />
      <AnimalGrid animals={animals} />
    </>
  )
}
