import { ViewPickupRequests } from "@/components/view-pickup-requests"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Pickup Requests Admin</h1>
        <ViewPickupRequests />
      </div>
    </div>
  )
}
