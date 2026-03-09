import { EmergencyDetail, getEmergencyCaseBySlug } from "@/modules/emergency"

export default async function EmergencyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const emergencyCase = await getEmergencyCaseBySlug(slug)
  return <EmergencyDetail emergencyCase={emergencyCase} />
}
