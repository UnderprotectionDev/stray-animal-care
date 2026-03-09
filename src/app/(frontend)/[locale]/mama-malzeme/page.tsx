import { NeedsTable, ShippingInfo, SponsorProgram, getNeedsList } from "@/modules/supplies"

export default async function SuppliesPage() {
  const needs = await getNeedsList()
  return (
    <>
      <NeedsTable needs={needs} />
      <ShippingInfo />
      <SponsorProgram />
    </>
  )
}
