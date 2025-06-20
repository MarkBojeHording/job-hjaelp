// app/api/job-preferences/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

// Initialize Supabase client
// IMPORTANT: Replace with your actual Supabase URL and ANON_KEY
// For server-side, it's safer to use service_role key for admin tasks if needed,
// but for user-specific data via RLS, anon key is fine if combined with auth.uid()
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // Ensure you have this in your .env.local
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Ensure you have this in your .env.local

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- GET Request Handler (To retrieve user's job preferences) ---
export async function GET(request: Request) {
  try {
    // Get the authenticated user's ID
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Query Supabase for the user's job preferences
    // RLS policies on 'job_preferences' table (auth.uid() = user_id) will ensure
    // the user can only fetch their own data.
    const { data, error } = await supabase
      .from('job_preferences')
      .select('*')
      .eq('user_id', user.id) // Filter by user_id
      .single(); // Expecting only one row per user due to UNIQUE constraint

    if (error) {
      console.error('Error fetching job preferences:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      // No preferences found for this user yet
      return NextResponse.json({ message: 'No job preferences found for this user.' }, { status: 200 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error in GET /api/job-preferences:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// --- POST Request Handler (To save or update user's job preferences) ---
export async function POST(request: Request) {
  try {
    const preferences = await request.json(); // Parse the request body

    // Get the authenticated user's ID
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    // Attempt to insert or update the job preferences using upsert
    // The 'user_id' in the `preferences` object will automatically be set by the frontend
    // or you can explicitly add it here. RLS INSERT/UPDATE policies will enforce ownership.
    const { error } = await supabase
      .from('job_preferences')
      .upsert({ ...preferences, user_id: user.id }, { onConflict: 'user_id' }); // 'user_id' is the unique constraint

    if (error) {
      console.error('Error saving/updating job preferences:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Job preferences saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error in POST /api/job-preferences:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// You can add PUT, DELETE handlers as needed for other operations
// export async function PUT(request: Request) { ... }
// export async function DELETE(request: Request) { ... }
