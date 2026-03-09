import {
  MonthlyReport,
  DonationComparison,
  DonorList,
  getTransparencyReports,
} from "@/modules/transparency"

export default async function TransparencyPage() {
  const reports = await getTransparencyReports()
  return (
    <>
      <MonthlyReport reports={reports} />
      <DonationComparison />
      <DonorList />
    </>
  )
}
