const { createClient } = require('@supabase/supabase-js');
import { getConfig } from '../../config';

const SUPABASE_URL = getConfig().SUPABASE_URL ?? ''
const SUPABASE_KEY = getConfig().SUPABASE_KEY ?? ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)