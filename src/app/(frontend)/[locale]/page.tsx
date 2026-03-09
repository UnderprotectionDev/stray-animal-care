import {
  HeroSection,
  StatsCounter,
  RecentRescue,
  SupportCards,
  TestimonialSlider,
  VideoSection,
} from "@/modules/home"

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsCounter />
      <RecentRescue />
      <SupportCards />
      <VideoSection />
      <TestimonialSlider />
    </>
  )
}
