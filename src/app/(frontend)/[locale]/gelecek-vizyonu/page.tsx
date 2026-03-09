import {
  AssociationGoal,
  ShortTermGoals,
  LongTermGoals,
  SupportCall,
} from "@/modules/vision"

export default function VisionPage() {
  return (
    <>
      <AssociationGoal />
      <ShortTermGoals />
      <LongTermGoals />
      <SupportCall />
    </>
  )
}
