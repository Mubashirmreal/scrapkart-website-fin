import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactFormNew } from "@/components/contact-form-new" // Import the new form
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start recycling? Have questions? We're here to help you turn your waste into value.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                  <Phone className="w-8 h-8 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                  <Mail className="w-8 h-8 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Email</h3>
                    <p className="text-gray-600">hello@scrapkart.com</p>
                  </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Address</h3>
                    <p className="text-gray-600">123 Green Street, Eco City, EC 12345</p>
                  </div>
                </Card>
                <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow">
                  <Clock className="w-8 h-8 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Mon-Sat: 8:00 AM - 6:00 PM</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <ContactFormNew /> {/* Use the new form here */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
