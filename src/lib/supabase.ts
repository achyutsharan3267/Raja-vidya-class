import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * The client is intentionally undefined until the public Vite variables are set.
 * This lets the app show a useful setup error instead of failing during startup.
 */
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : undefined;

export function getSupabaseClient() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.",
    );
  }

  return supabase;
}
