import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config";

// If the Supabase project hasn't been created/configured yet, this stays
// null and the lead form shows a friendly "not connected yet" message
// instead of crashing.
export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
