-- Add role column to users table
ALTER TABLE Users
ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'
CHECK (role IN ('user', 'admin'));

--add reset token and its expiry fields
ALTER TABLE Users
ADD COLUMN IF NOT EXISTS reset_token TEXT,
ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP;

--UPDATE PASSWORD COLUMN FOR BCYRPT HASHES 
ALTER TABLE Users
ALTER COLUMN password TYPE VARCHAR(255);


--create index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON Users(email);

--create index for reset token lookups
CREATE INDEX IF NOT EXISTS idx_user_reset_token ON Users(reset_token);


