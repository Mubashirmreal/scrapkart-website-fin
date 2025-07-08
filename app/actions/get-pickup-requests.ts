"use server"

import { neon } from "@neondatabase/serverless"

const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.NEON_POSTGRES_URL ||
  process.env.NEON_POSTGRES_PRISMA_URL ||
  process.env.NEON_DATABASE_URL_UNPOOLED

const sql = connectionString ? neon(connectionString) : null

export async function getAllPickupRequests() {
  console.log("=== FETCHING ALL PICKUP REQUESTS ===")

  try {
    if (!sql) {
      return {
        success: false,
        message: "Database connection not configured",
        error: "No database connection string found",
      }
    }

    console.log("Executing query to fetch all pickup requests...")
    const result = await sql`
      SELECT 
        id,
        waste_type,
        estimated_weight,
        pickup_location,
        preferred_date,
        preferred_time,
        full_name,
        mobile_number,
        email_address,
        full_address,
        keep_updated,
        created_at,
        status
      FROM pickup_requests 
      ORDER BY created_at DESC
    `

    console.log(`Found ${result.length} pickup requests`)
    console.log("Sample data:", result.slice(0, 2)) // Log first 2 records

    return {
      success: true,
      data: result,
      count: result.length,
    }
  } catch (error) {
    console.error("Error fetching pickup requests:", error)
    return {
      success: false,
      message: "Failed to fetch pickup requests",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getPickupRequestStats() {
  try {
    if (!sql) {
      return {
        success: false,
        message: "Database connection not configured",
      }
    }

    const stats = await sql`
      SELECT 
        COUNT(*) as total_requests,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_requests,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_requests,
        COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_requests
      FROM pickup_requests
    `

    return {
      success: true,
      data: stats[0],
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return {
      success: false,
      message: "Failed to fetch statistics",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
