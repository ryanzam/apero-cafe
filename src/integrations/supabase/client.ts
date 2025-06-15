import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_APP_URL
const supabaseKey = process.env.VITE_APP_ANON_KEY

export const supabase = createClient(supabaseUrl as string, supabaseKey as string)