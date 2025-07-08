"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { testDatabaseConnection } from "@/app/actions/test-db"

export function TestDatabase() {
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runTest = async () => {
    setIsLoading(true)
    try {
      const result = await testDatabaseConnection()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Button onClick={runTest} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? "Testing..." : "Test Database Connection"}
        </Button>

        {testResult && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </Card>
  )
}
