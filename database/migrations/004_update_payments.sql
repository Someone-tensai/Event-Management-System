-- Run this in your PostgreSQL database

-- Add new columns to Payments
ALTER TABLE Payments
ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50),
ADD COLUMN IF NOT EXISTS payment_proof_url TEXT,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS verified_by INT,
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;

-- Update payment_status to include 'Rejected'
ALTER TABLE Payments DROP CONSTRAINT IF EXISTS payments_payment_status_check;
ALTER TABLE Payments
ADD CONSTRAINT payments_payment_status_check
CHECK (payment_status IN ('Pending', 'Verified', 'Rejected'));

-- Add foreign key for verified_by
ALTER TABLE Payments
ADD CONSTRAINT fk_payments_verified_by
FOREIGN KEY (verified_by) REFERENCES Users(user_id);

-- Create index for pending payments (for verification queue)
CREATE INDEX IF NOT EXISTS idx_payments_pending
ON Payments(payment_status) WHERE payment_status = 'Pending';