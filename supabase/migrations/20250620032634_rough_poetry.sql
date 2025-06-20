/*
  # Make interest column nullable

  1. Changes
    - Remove NOT NULL constraint from `interest` column in `waitlist_submissions` table
    - Allow users to submit without selecting an interest option

  2. Security
    - No changes to RLS policies needed
*/

-- Make the interest column nullable
ALTER TABLE waitlist_submissions 
ALTER COLUMN interest DROP NOT NULL;