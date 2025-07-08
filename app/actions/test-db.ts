"use server"

import { neon } from "@neondatabase/serverless"

const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.NEON_POSTGRES_URL ||
  process.env.NEON_POSTGRES_PRISMA_URL ||
  process.env.NEON_DATABASE_URL_UNPOOLED

export async function testDatabaseConnection() {
  console.log("=== DATABASE CONNECTION TEST ===")

  const result: any = {
    timestamp: new Date().toISOString(),
    environmentVariables: {},
    connectionString: null,
    connectionTest: null,
    tableExists: null,
    sampleData: null,
    error: null,
  }

  // Check environment variables
  const envVars = [
    "DATABASE_URL",
    "NEON_DATABASE_URL",
    "NEON_POSTGRES_URL",
    "NEON_POSTGRES_PRISMA_URL",
    "NEON_DATABASE_URL_UNPOOLED",
  ]

  envVars.forEach((varName) => {
    result.environmentVariables[varName] = process.env[varName] ? "SET" : "NOT SET"
  })

  result.connectionString = connectionString ? "AVAILABLE" : "MISSING"

  if (!connectionString) {
    result.error = "No database connection string found"
    return result
  }

  try {
    const sql = neon(connectionString)

    // Test basic connection
    console.log("Testing basic connection...")
    const connectionTest = await sql`SELECT 1 as test, NOW() as current_time`
    result.connectionTest = {
      success: true,
      data: connectionTest,
    }
    console.log("Connection test successful:", connectionTest)

    // Check if table exists
    console.log("Checking if pickup_requests table exists...")
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'pickup_requests'
      ) as table_exists;
    `
    result.tableExists = tableCheck[0]?.table_exists || false
    console.log("Table exists:", result.tableExists)

    // If table exists, get sample data
    if (result.tableExists) {
      console.log("Getting sample data...")
      const sampleData = await sql`
        SELECT COUNT(*) as total_records FROM pickup_requests
      `
      result.sampleData = sampleData
      console.log("Sample data:", sampleData)
    }
  } catch (error) {
    console.error("Database test error:", error)
    result.error = error instanceof Error ? error.message : "Unknown error"
  }

  console.log("=== TEST COMPLETE ===")
  console.log("Result:", result)

  return result
}
