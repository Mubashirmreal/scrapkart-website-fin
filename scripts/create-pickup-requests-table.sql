-- Create pickup_requests table to store form submissions
CREATE TABLE IF NOT EXISTS pickup_requests (
    id SERIAL PRIMARY KEY,
    waste_type VARCHAR(50) NOT NULL,
    estimated_weight VARCHAR(100) NOT NULL,
    pickup_location VARCHAR(100) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    mobile_number VARCHAR(10) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    full_address TEXT NOT NULL,
    keep_updated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pickup_requests_email ON pickup_requests(email_address);
CREATE INDEX IF NOT EXISTS idx_pickup_requests_mobile ON pickup_requests(mobile_number);
CREATE INDEX IF NOT EXISTS idx_pickup_requests_date ON pickup_requests(preferred_date);
CREATE INDEX IF NOT EXISTS idx_pickup_requests_status ON pickup_requests(status);
