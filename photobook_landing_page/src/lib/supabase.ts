import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type WaitlistSubmission = {
  id?: string
  name: string
  email: string
  interest: 'pdf' | 'book' | 'both'
  created_at?: string
  ip_address?: string | null
  user_agent?: string
}
