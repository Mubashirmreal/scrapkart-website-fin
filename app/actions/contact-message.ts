"use server"

import { neon } from "@neondatabase/serverless"

const connectionString =
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.NEON_POSTGRES_URL ||
  process.env.NEON_POSTGRES_PRISMA_URL ||
  process.env.NEON_DATABASE_URL_UNPOOLED

const sql = connectionString ? neon(connectionString) : null

export async function submitContactMessage(formData: FormData) {
  console.log("=== CONTACT MESSAGE SUBMISSION DEBUG ===")
  console.log("1. Server Action: submitContactMessage called.")
  console.log("2. Received FormData object.")

  // Extract data from FormData
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phoneNumber = formData.get("phone") as string | null // Phone is optional
  const message = formData.get("message") as string

  console.log("3. Parsed data:", { name, email, phoneNumber, message })

  // Server-side validation
  if (!name || !email || !message) {
    console.error("4. Validation Error: Missing required fields.")
    return {
      success: false,
      message: "Please fill in all required fields (Name, Email, Message).",
      error: "Missing required fields",
    }
  }
  if (!email.includes("@") || !email.includes(".")) {
    console.error("4. Validation Error: Invalid email format.")
    return {
      success: false,
      message: "Please enter a valid email address.",
      error: "Invalid email format",
    }
  }

  try {
    if (!sql) {
      console.error("5. Error: Database connection not configured.")
      return {
        success: false,
        message: "Database connection not configured. Please contact support.",
        error: "No database connection string found in environment variables",
      }
    }

    console.log("5. SQL connection available. Attempting to insert data into database...")

    // Test connection first (optional, but good for debugging)
    const testResult = await sql`SELECT 1 as test_connection`
    console.log("6. Database connection test result:", testResult)

    // Check if table exists (optional, but good for debugging)
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'contact_messages'
      ) as table_exists;
    `
    console.log("7. Table 'contact_messages' exists check:", tableCheck[0]?.table_exists)

    const result = await sql`
      INSERT INTO contact_messages (
        name,
        email,
        phone_number,
        message
      ) VALUES (
        ${name},
        ${email},
        ${phoneNumber},
        ${message}
      )
      RETURNING id, created_at
    `

    console.log("8. Insert query executed. Result:", result)

    if (result.length > 0) {
      console.log("9. SUCCESS: Contact message inserted with ID:", result[0].id)
      return {
        success: true,
        message: "Your message has been submitted successfully!",
        messageId: result[0].id,
        submittedAt: result[0].created_at,
      }
    } else {
      console.error("9. ERROR: Insert returned no results (this should not happen on success).")
      throw new Error("Failed to insert contact message")
    }
  } catch (error) {
    console.error("=== ERROR DETAILS ===")
    console.error("Error submitting contact message:", error)
    console.error("Error type:", typeof error)
    console.error("Error message:", error instanceof Error ? error.message : "Unknown error")
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace")

    if (error instanceof Error && error.message.includes('relation "contact_messages" does not exist')) {
      console.error("ERROR TYPE: Table 'contact_messages' does not exist.")
      return {
        success: false,
        message: "Database table 'contact_messages' not found. Please run the setup script first.",
        error: "Table 'contact_messages' does not exist",
      }
    }
    console.error("ERROR TYPE: General database error during insert.")
    return {
      success: false,
      message: "Failed to submit your message. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
