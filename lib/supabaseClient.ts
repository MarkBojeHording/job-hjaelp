// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Ensure these are correctly set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single Supabase client for use in the app
// This client is typically used on the client-side,
// while server-side operations (like in API routes) might create their own instance
// or use a different pattern depending on Next.js version/setup.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For more advanced setups, especially with Next.js App Router,
// you might also set up separate server-side clients if direct database
// operations are needed in Server Components/Actions:
// import { createServerClient } from '@supabase/ssr';
// export function createSupabaseServerClient() {
//   return createServerClient(supabaseUrl, supabaseAnonKey, {
//     cookies: {} // For server-side client, you'd pass cookies to handle session
//   });
// }
