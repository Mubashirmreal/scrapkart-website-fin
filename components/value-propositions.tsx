"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { IndianRupee, Recycle, Truck, Smartphone, Award } from "lucide-react"

export default function ValuePropositions() {
  const values = [
    {
      icon: IndianRupee,
      title: "Transparent Pricing",
      description: "Get fair, competitive rates for all your recyclable materials with no hidden fees.",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Recycle,
      title: "Eco-Friendly Process",
      description: "State-of-the-art recycling facilities that minimize environmental impact.",
      bgColor: "bg-green-50",
    },
    {
      icon: Truck,
      title: "Fast Pickup",
      description: "Same-day or next-day pickup service with our eco-friendly electric vehicles.",
      bgColor: "bg-teal-50",
    },
    {
      icon: Smartphone,
      title: "Instant Payments",
      description: "Get paid immediately after pickup through UPI, bank transfer, or digital wallet.",
      bgColor: "bg-emerald-50",
    },
    {
      icon: Award,
      title: "24/7 Support",
      description: "Round-the-clock customer support to help you with all your recycling needs.",
      bgColor: "bg-blue-50",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const renderIcon = (IconComponent: any, className: string) => {
    return <IconComponent className={className} />
  }

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Scrapkart?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've revolutionized recycling to make it profitable, convenient, and environmentally responsible.
          </p>
        </motion.div>

        {/* Uneven Grid Layout */}
        <motion.div
          className="grid grid-cols-12 grid-rows-8 gap-4 h-[600px] shadow-2xl rounded-2xl p-6 bg-white"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Card 1 - Large */}
          <motion.div
            variants={cardVariants}
            className="col-span-12 md:col-span-7 row-span-4"
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              className={`p-8 ${values[0].bgColor} border-0 hover:shadow-xl transition-all duration-300 group h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <motion.div
                    className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderIcon(values[0].icon, "w-8 h-8 text-emerald-600")}
                  </motion.div>
                  <div className="ml-4">
                    <motion.h3
                      className="text-2xl font-bold text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {values[0].title}
                    </motion.h3>
                  </div>
                </div>
                <motion.p
                  className="text-gray-700 text-lg flex-grow leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {values[0].description}
                </motion.p>
              </div>
            </Card>
          </motion.div>

          {/* Card 2 - Medium */}
          <motion.div
            variants={cardVariants}
            className="col-span-12 md:col-span-5 row-span-4"
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              className={`p-6 ${values[1].bgColor} border-0 hover:shadow-xl transition-all duration-300 group h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderIcon(values[1].icon, "w-6 h-6 text-emerald-600")}
                  </motion.div>
                  <div className="ml-3">
                    <motion.h3
                      className="text-xl font-bold text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {values[1].title}
                    </motion.h3>
                  </div>
                </div>
                <motion.p
                  className="text-gray-700 text-base flex-grow leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {values[1].description}
                </motion.p>
              </div>
            </Card>
          </motion.div>

          {/* Card 3 - Small */}
          <motion.div
            variants={cardVariants}
            className="col-span-6 md:col-span-4 row-span-4"
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              className={`p-4 ${values[2].bgColor} border-0 hover:shadow-xl transition-all duration-300 group h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <motion.div
                    className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderIcon(values[2].icon, "w-5 h-5 text-emerald-600")}
                  </motion.div>
                </div>
                <motion.h3
                  className="text-lg font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {values[2].title}
                </motion.h3>
                <motion.p
                  className="text-gray-700 text-sm flex-grow leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {values[2].description}
                </motion.p>
              </div>
            </Card>
          </motion.div>

          {/* Card 4 - Medium Wide */}
          <motion.div
            variants={cardVariants}
            className="col-span-6 md:col-span-5 row-span-4"
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              className={`p-6 ${values[3].bgColor} border-0 hover:shadow-xl transition-all duration-300 group h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderIcon(values[3].icon, "w-6 h-6 text-emerald-600")}
                  </motion.div>
                  <div className="ml-3">
                    <motion.h3
                      className="text-xl font-bold text-gray-900"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {values[3].title}
                    </motion.h3>
                  </div>
                </div>
                <motion.p
                  className="text-gray-700 text-base flex-grow leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {values[3].description}
                </motion.p>
              </div>
            </Card>
          </motion.div>

          {/* Card 5 - Tall */}
          <motion.div
            variants={cardVariants}
            className="col-span-12 md:col-span-3 row-span-4"
            whileHover={{
              y: -10,
              transition: { duration: 0.3 },
            }}
          >
            <Card
              className={`p-6 ${values[4].bgColor} border-0 hover:shadow-xl transition-all duration-300 group h-full`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <motion.div
                    className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderIcon(values[4].icon, "w-6 h-6 text-emerald-600")}
                  </motion.div>
                </div>
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {values[4].title}
                </motion.h3>
                <motion.p
                  className="text-gray-700 text-base flex-grow leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {values[4].description}
                </motion.p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
