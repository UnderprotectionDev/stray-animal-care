import {
  IBANCopy,
  DonationAmountCards,
  InternationalPayment,
  VetClinicInfo,
  MonthlyDonation,
  DonationFAQ,
} from "@/modules/donate"

export default function DonatePage() {
  return (
    <>
      <IBANCopy />
      <DonationAmountCards />
      <InternationalPayment />
      <VetClinicInfo />
      <MonthlyDonation />
      <DonationFAQ />
    </>
  )
}
