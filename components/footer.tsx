import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Recycle, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Recycle className="w-8 h-8 text-emerald-400" />
              <span className="text-2xl font-bold">Scrapkart</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Transforming waste into value while building a sustainable future for everyone.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/Scrapkart/61555778645600/?rdid=F14nsmpSiBI93eq1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CaPKn8GeJ%2F"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-300 hover:text-emerald-400 p-2"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/scrapkart"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="text-gray-300 hover:text-emerald-400 p-2"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/scrapkart.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-emerald-400 p-2"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/scrap-kart-0352bb2b4/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-emerald-400 p-2"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400">Quick Links</h3>
            <nav className="space-y-3">
              <Link href="/" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Contact
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Pricing
              </Link>
              <Link href="#" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">+91 96181 02268</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">ceo@scrapkart.app</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-1" />
                <span className="text-gray-300">Edventure park, Masab Tank, Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-emerald-400">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">Get recycling tips and earn more with our newsletter.</p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 Scrapkart. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
