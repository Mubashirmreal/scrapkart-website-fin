import { TestDatabase } from "@/components/test-database"

export default function TestDatabasePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Connection Test</h1>
        <TestDatabase />
      </div>
    </div>
  )
}
