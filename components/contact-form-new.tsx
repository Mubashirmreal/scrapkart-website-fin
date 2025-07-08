"use client"

import { useEffect, useRef } from "react"
import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { submitContactMessage } from "@/app/actions/contact-message"

export function ContactFormNew() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  // Assign formAction directly to the form's action prop.
  // React will automatically pass FormData to submitContactMessage.
  const [state, formAction, isPending] = useActionState(submitContactMessage, null)

  useEffect(() => {
    if (state) {
      if (state.success) {
        alert(state.message)
        formRef.current?.reset() // Reset the form on success
        router.push("/") // Redirect to landing page
      } else {
        alert(state.message)
      }
    }
  }, [state, router])

  return (
    <Card className="p-8 bg-white shadow-lg">
      <form ref={formRef} action={formAction} className="space-y-6">
        {" "}
        {/* Direct assignment of formAction */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <Input id="name" name="name" type="text" required className="w-full" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input id="email" name="email" type="email" required className="w-full" placeholder="your@example.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <Input id="phone" name="phone" type="tel" className="w-full" placeholder="Your phone number (optional)" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Anything that we should know *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full"
            placeholder="Tell us about your query or needs..."
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Card>
  )
}
