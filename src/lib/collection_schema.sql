-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Enable Row Level Security (RLS) on the table
ALTER TABLE catches ENABLE ROW LEVEL SECURITY;

-- 2. Add user_id column if it doesn't exist
-- This links each catch to a specific user
ALTER TABLE catches 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) DEFAULT auth.uid();

-- 3. Policy: Users can only see their own catches
CREATE POLICY "Users can select own catches"
ON catches
FOR SELECT
USING (auth.uid() = user_id);

-- 4. Policy: Users can only insert their own catches (as specific user)
CREATE POLICY "Users can insert own catches"
ON catches
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Optional: If you want to backfill existing data to the current user (RUN ONLY IF NEEDED)
-- UPDATE catches SET user_id = auth.uid() WHERE user_id IS NULL;
