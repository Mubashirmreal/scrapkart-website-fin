"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export function SocialProof() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [counter, setCounter] = useState(0)

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homemaker",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Scrapkart made recycling so easy! I earned ₹2,500 last month just from household waste. The pickup was prompt and payment was instant.",
    },
    {
      name: "Rajesh Kumar",
      role: "Small Business Owner",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "As a shop owner, I generate a lot of cardboard waste. Scrapkart's regular pickup service has been a game-changer for my business.",
    },
    {
      name: "Anita Patel",
      role: "Environmental Activist",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Finally, a service that makes environmental responsibility profitable! I've been using Scrapkart for 6 months and love their transparency.",
    },
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Animated counter
  useEffect(() => {
    const target = 500
    const increment = target / 100
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev < target) {
          return Math.min(prev + increment, target)
        }
        return target
      })
    }, 50)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-gray-600">See what our customers say about their recycling experience</p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12 items-center">
          {/* Testimonial Carousel */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-white border-emerald-100">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center mb-6">
                      <motion.img
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentTestimonial ? "bg-emerald-600" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentTestimonial(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevTestimonial}
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextTestimonial}
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
