import { createClient } from '@supabase/supabase-js'
import { getConfig } from '../../config';

const SUPABASE_URL = getConfig().VITE_SUPABASE_URL ?? ''
const SUPABASE_KEY = getConfig().VITE_SUPABASE_KEY ?? ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)