import { HeroSection } from "../components/hero-section"
import { FeaturedDestinations } from "../components/featured-destinations"
import { PopularTours } from "../components/popular-tours"
import { WhyChooseUs } from "../components/why-choose-us"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedDestinations />
      <PopularTours />
      <WhyChooseUs />
    </main>
  )
}