import { createClient } from '@supabase/supabase-js'
import { getConfig } from '../../config';

console.log(getConfig().SUPABASE_URL);

const SUPABASE_URL = getConfig().SUPABASE_URL ?? ''
const SUPABASE_KEY = getConfig().SUPABASE_KEY ?? ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)