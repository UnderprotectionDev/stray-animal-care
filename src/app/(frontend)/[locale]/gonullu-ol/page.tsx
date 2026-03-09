import {
  VolunteerAreaCards,
  Requirements,
  VolunteerFAQ,
  VolunteerStats,
} from "@/modules/volunteer"

export default function VolunteerPage() {
  return (
    <>
      <VolunteerAreaCards />
      <Requirements />
      <VolunteerStats />
      <VolunteerFAQ />
    </>
  )
}
