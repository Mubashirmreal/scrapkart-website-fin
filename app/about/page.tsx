import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Recycle, Users, Truck, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Scrapkart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing waste management by making recycling profitable, convenient, and environmentally
            responsible for everyone.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To create a sustainable future by transforming waste into valuable resources while empowering
                communities to earn from their recyclable materials.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">500+</div>
                  <div className="text-gray-600">Tons Recycled</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">10K+</div>
                  <div className="text-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Recycling facility with workers sorting materials"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Recycle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                Every action we take is guided by our commitment to environmental protection.
              </p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">Building stronger communities through collaborative recycling efforts.</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Truck className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">Dependable pickup services and transparent pricing you can trust.</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <Award className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">Striving for the highest standards in service and environmental impact.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
