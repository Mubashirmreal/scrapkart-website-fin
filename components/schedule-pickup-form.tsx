"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { submitPickupRequest } from "@/app/actions/pickup-request"

interface FormData {
  wasteType: string
  estimatedWeight: string
  pickupLocation: string
  preferredDate: string
  preferredTime: string
  fullName: string
  mobileNumber: string
  emailAddress: string
  fullAddress: string
  keepUpdated: boolean
}

export function SchedulePickupForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; requestId?: number } | null>(
    null,
  )
  const [formData, setFormData] = useState<FormData>({
    wasteType: "",
    estimatedWeight: "",
    pickupLocation: "",
    preferredDate: "",
    preferredTime: "",
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    fullAddress: "",
    keepUpdated: false,
  })

  const wasteTypes = ["Plastic", "Paper", "Metal", "E-Waste", "Mixed"]

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const result = await submitPickupRequest(formData)
      setSubmitResult(result)

      if (result.success) {
        console.log("Form submitted successfully:", result)
        nextStep()
      } else {
        // Handle error - you might want to show an error message
        console.error("Submission failed:", result.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step <= currentStep ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    scale: step === currentStep ? 1.1 : 1,
                    backgroundColor: step <= currentStep ? "#059669" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </motion.div>
                {step < 3 && (
                  <motion.div
                    className={`w-16 h-1 mx-2 transition-all duration-500 ${
                      step < currentStep ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: step < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <motion.p
              className="text-gray-600"
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Step {currentStep} of 3
            </motion.p>
          </div>
        </motion.div>

        {/* Error Message */}
        {submitResult && !submitResult.success && (
          <motion.div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-red-700 text-center">{submitResult.message}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Card className="p-8 bg-white shadow-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Tell Us About Your Waste</h2>
                  <p className="text-gray-600 text-center mb-8">Help us prepare for your pickup</p>
                </motion.div>

                <div className="space-y-6">
                  {/* Waste Type */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-3">Waste Type *</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {wasteTypes.map((type, index) => (
                        <motion.button
                          key={type}
                          type="button"
                          onClick={() => handleInputChange("wasteType", type)}
                          className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                            formData.wasteType === type
                              ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                              : "border-gray-200 hover:border-emerald-300"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Estimated Weight */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Weight or Volume *</label>
                    <input
                      type="text"
                      placeholder="e.g., 10 kg or 2 bags"
                      value={formData.estimatedWeight}
                      onChange={(e) => handleInputChange("estimatedWeight", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </motion.div>

                  {/* Pickup Location */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      Pickup Location *
                    </label>
                    <select
                      value={formData.pickupLocation}
                      onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Select pickup location</option>
                      <option value="Hyderabad">Hyderabad</option>
                    </select>
                  </motion.div>

                  {/* Date and Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-1" />
                        Preferred Time *
                      </label>
                      <input
                        type="time"
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange("preferredTime", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  className="flex justify-end mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={nextStep}
                      disabled={
                        !formData.wasteType ||
                        !formData.estimatedWeight ||
                        !formData.pickupLocation ||
                        !formData.preferredDate ||
                        !formData.preferredTime
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold"
                    >
                      Next: Your Details
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Card className="p-8 bg-white shadow-xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Your Information</h2>
                  <p className="text-gray-600 text-center mb-8">We need these details to schedule your pickup</p>
                </motion.div>

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline w-4 h-4 mr-1" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "")
                        handleInputChange("fullName", value)
                      }}
                      pattern="[a-zA-Z\s]+"
                      title="Please enter only letters and spaces"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your 10-digit mobile number"
                      value={formData.mobileNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                        handleInputChange("mobileNumber", value)
                      }}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Please enter exactly 10 digits"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.emailAddress}
                      onChange={(e) => handleInputChange("emailAddress", e.target.value)}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Home className="inline w-4 h-4 mr-1" />
                      Full Address *
                    </label>
                    <textarea
                      placeholder="Enter your complete address"
                      value={formData.fullAddress}
                      onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      rows={3}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.keepUpdated}
                        onChange={(e) => handleInputChange("keepUpdated", e.target.checked)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Keep me updated about green tips and offers</span>
                    </label>
                  </motion.div>
                </div>

                <motion.div
                  className="flex justify-between mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 text-lg font-semibold bg-transparent"
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="mr-2 w-5 h-5" />
                      Back
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSubmit}
                      disabled={
                        isSubmitting ||
                        !formData.fullName ||
                        !formData.mobileNumber ||
                        formData.mobileNumber.length !== 10 ||
                        !formData.emailAddress ||
                        !formData.emailAddress.includes("@") ||
                        !formData.fullAddress
                      }
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <CheckCircle className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Card className="p-12 bg-white shadow-xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                >
                  <CheckCircle className="w-20 h-20 text-emerald-600 mx-auto mb-6" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h2>
                  <p className="text-xl text-gray-600 mb-2">Your request has been submitted successfully.</p>
                  {submitResult?.requestId && (
                    <p className="text-sm text-gray-500 mb-8">Request ID: #{submitResult.requestId}</p>
                  )}
                </motion.div>

                <motion.div
                  className="space-y-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Email Confirmation</h3>
                    <p className="text-gray-600">
                      We've sent a confirmation email to {formData.emailAddress}. Please check spam/junk folder if not
                      seen.
                    </p>
                  </div>

                  <div className="bg-emerald-50 p-6 rounded-lg">
                    <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Next Steps</h3>
                    <p className="text-gray-600">
                      Our team will reach out to {formData.mobileNumber} shortly to confirm your pickup schedule.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-lg font-semibold"
                  >
                    Return to Homepage
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
