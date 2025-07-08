import { HeroSection } from "@/components/hero-section"
import ValuePropositions from "@/components/value-propositions"
import { SocialProof } from "@/components/social-proof"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ValuePropositions />
      <SocialProof />
      <HowItWorks />
      <Footer />
    </main>
  )
}
