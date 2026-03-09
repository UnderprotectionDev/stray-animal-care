import { EmergencyList, CompletedArchive, getEmergencyCases } from "@/modules/emergency"

export default async function EmergencyPage() {
  const cases = await getEmergencyCases()
  return (
    <>
      <EmergencyList cases={cases} />
      <CompletedArchive />
    </>
  )
}
