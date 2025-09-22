import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedDestinations } from "@/components/FeaturedDestinations"
import { PopularTours } from "@/components/PopularTours"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Footer } from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedDestinations />
        <PopularTours />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}
