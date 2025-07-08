"use server"

import { neon } from "@neondatabase/serverless"

// Try multiple possible environment variable names
const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.NEON_POSTGRES_URL ||
  process.env.NEON_POSTGRES_PRISMA_URL ||
  process.env.NEON_DATABASE_URL_UNPOOLED

if (!connectionString) {
  console.error(
    "Available environment variables:",
    Object.keys(process.env).filter((key) => key.includes("NEON") || key.includes("DATABASE")),
  )
}

const sql = connectionString ? neon(connectionString) : null

interface PickupRequestData {
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

export async function submitPickupRequest(data: PickupRequestData) {
  console.log("=== PICKUP REQUEST DEBUG ===")
  console.log("1. Form data received:", data)
  console.log("2. Environment variables check:")
  console.log("   DATABASE_URL exists:", !!process.env.DATABASE_URL)
  console.log("   DATABASE_URL value:", process.env.DATABASE_URL ? "SET" : "NOT SET")
  console.log("   Connection string:", connectionString ? "AVAILABLE" : "MISSING")

  try {
    // Check if database connection is available
    if (!sql) {
      console.log("3. ERROR: No SQL connection available")
      return {
        success: false,
        message: "Database connection not configured. Please contact support.",
        error: "No database connection string found in environment variables",
      }
    }

    console.log("3. SQL connection available, attempting to insert...")

    // Test connection first
    const testResult = await sql`SELECT 1 as test`
    console.log("4. Database connection test:", testResult)

    // Check if table exists
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'pickup_requests'
      );
    `
    console.log("5. Table exists check:", tableCheck)

    // Insert the pickup request into the database
    console.log("6. Attempting to insert data...")
    const result = await sql`
      INSERT INTO pickup_requests (
        waste_type,
        estimated_weight,
        pickup_location,
        preferred_date,
        preferred_time,
        full_name,
        mobile_number,
        email_address,
        full_address,
        keep_updated
      ) VALUES (
        ${data.wasteType},
        ${data.estimatedWeight},
        ${data.pickupLocation},
        ${data.preferredDate},
        ${data.preferredTime},
        ${data.fullName},
        ${data.mobileNumber},
        ${data.emailAddress},
        ${data.fullAddress},
        ${data.keepUpdated}
      )
      RETURNING id, created_at
    `

    console.log("7. Insert result:", result)

    if (result.length > 0) {
      console.log("8. SUCCESS: Data inserted with ID:", result[0].id)
      return {
        success: true,
        message: "Pickup request submitted successfully!",
        requestId: result[0].id,
        submittedAt: result[0].created_at,
      }
    } else {
      console.log("8. ERROR: Insert returned no results")
      throw new Error("Failed to insert pickup request")
    }
  } catch (error) {
    console.error("=== ERROR DETAILS ===")
    console.error("Error submitting pickup request:", error)
    console.error("Error type:", typeof error)
    console.error("Error message:", error instanceof Error ? error.message : "Unknown error")
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    // Check if it's a table not found error
    if (error instanceof Error && error.message.includes('relation "pickup_requests" does not exist')) {
      console.log("ERROR TYPE: Table does not exist")
      return {
        success: false,
        message: "Database table not found. Please run the setup script first.",
        error: "Table 'pickup_requests' does not exist",
      }
    }

    console.log("ERROR TYPE: General database error")
    return {
      success: false,
      message: "Failed to submit pickup request. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getPickupRequestById(id: number) {
  try {
    if (!sql) {
      return {
        success: false,
        message: "Database connection not configured",
        error: "No database connection string found",
      }
    }

    const result = await sql`
      SELECT * FROM pickup_requests WHERE id = ${id}
    `

    if (result.length > 0) {
      return {
        success: true,
        data: result[0],
      }
    } else {
      return {
        success: false,
        message: "Pickup request not found",
      }
    }
  } catch (error) {
    console.error("Error fetching pickup request:", error)
    return {
      success: false,
      message: "Failed to fetch pickup request",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
