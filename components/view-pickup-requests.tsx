"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getAllPickupRequests } from "@/app/actions/get-pickup-requests"

export function ViewPickupRequests() {
  const [requests, setRequests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRequests = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await getAllPickupRequests()
      if (result.success) {
        setRequests(result.data || [])
      } else {
        setError(result.message || "Failed to load requests")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadRequests()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">All Pickup Requests</h2>
        <Button onClick={loadRequests} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? "Loading..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-red-700">Error: {error}</p>
        </Card>
      )}

      <div className="grid gap-4">
        {requests.length === 0 && !isLoading && !error && (
          <Card className="p-8 text-center">
            <p className="text-gray-500">No pickup requests found</p>
          </Card>
        )}

        {requests.map((request, index) => (
          <Card key={request.id || index} className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Request #{request.id}</h3>
                <p>
                  <strong>Name:</strong> {request.full_name}
                </p>
                <p>
                  <strong>Email:</strong> {request.email_address}
                </p>
                <p>
                  <strong>Phone:</strong> {request.mobile_number}
                </p>
              </div>
              <div>
                <p>
                  <strong>Waste Type:</strong> {request.waste_type}
                </p>
                <p>
                  <strong>Weight:</strong> {request.estimated_weight}
                </p>
                <p>
                  <strong>Location:</strong> {request.pickup_location}
                </p>
                <p>
                  <strong>Status:</strong> {request.status || "pending"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Date:</strong> {request.preferred_date}
                </p>
                <p>
                  <strong>Time:</strong> {request.preferred_time}
                </p>
                <p>
                  <strong>Submitted:</strong> {new Date(request.created_at).toLocaleString()}
                </p>
                <p>
                  <strong>Updates:</strong> {request.keep_updated ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p>
                <strong>Address:</strong> {request.full_address}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Total Records: {requests.length}</h3>
        <p className="text-blue-700 text-sm">This shows all pickup requests stored in your Neon database.</p>
      </Card>
    </div>
  )
}
