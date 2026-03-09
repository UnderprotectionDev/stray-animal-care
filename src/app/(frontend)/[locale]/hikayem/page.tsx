import {
  PersonalIntro,
  EarthquakeStory,
  DailyRoutineTimeline,
  Goals,
} from "@/modules/story"

export default function StoryPage() {
  return (
    <>
      <PersonalIntro />
      <EarthquakeStory />
      <DailyRoutineTimeline />
      <Goals />
    </>
  )
}
