"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smartphone, Clock, Recycle, IndianRupee, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: "Book via App",
      description:
        "Download our app and schedule a pickup at your convenience. Select the type and quantity of materials.",
      step: "01",
    },
    {
      icon: Clock,
      title: "Schedule Pickup",
      description: "Choose your preferred time slot. Our team will arrive punctually with proper equipment.",
      step: "02",
    },
    {
      icon: Recycle,
      title: "We Recycle",
      description: "We weigh, sort, and process your materials at our eco-friendly facilities with full transparency.",
      step: "03",
    },
    {
      icon: IndianRupee,
      title: "Get Paid",
      description: "Receive instant payment through your preferred method - UPI, bank transfer, or digital wallet.",
      step: "04",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to turn your waste into cash while helping the environment
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 transform -translate-y-1/2 z-0"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.div>

          <motion.div
            className="grid lg:grid-cols-4 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="p-8 text-center bg-white hover:shadow-xl transition-all duration-300 group relative">
                  {/* Step Number */}
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {step.step}
                  </motion.div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <motion.div
                      className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-200 transition-colors"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <step.icon className="w-8 h-8 text-emerald-600" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.h3
                    className="text-xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-lg font-semibold group transition-all duration-300"
              onClick={() => {
                const heroSection = document.querySelector("section")
                heroSection?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Start Recycling Today
              <motion.div
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>
          <motion.p
            className="text-gray-600 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            Join thousands of satisfied customers earning from their waste
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
