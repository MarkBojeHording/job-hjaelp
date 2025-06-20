// contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js'; // Import Supabase's User type
import { supabase } from '@/lib/supabaseClient'; // Ensure this path is correct for your Supabase client instance

// Define the shape of your application's user, potentially extending SupabaseUser
// We'll use SupabaseUser directly for simplicity in this context.
// If you need custom fields like 'name' or 'avatar', access them via user.user_metadata
interface AppUser extends SupabaseUser {
  // You can extend SupabaseUser if you add custom fields directly to the user table
  // but for common profile data, user_metadata is often preferred.
  // Example for convenience (though data comes from user_metadata.name):
  display_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean; // Renamed from 'loading' in previous example, matches your current code
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>; // Removed 'name' as direct arg for Supabase signUp
  logout: () => Promise<void>; // Logout is async for Supabase
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Supabase session provides the user object
      if (session?.user) {
        // Map SupabaseUser to AppUser if you have extra fields to derive/add
        const currentUser: AppUser = {
          ...session.user,
          // Example: if you store name in user_metadata:
          display_name: session.user.user_metadata?.name as string | undefined,
          avatar_url: session.user.user_metadata?.avatar as string | undefined,
        };
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new Error(error.message || 'Login fejlede');
      }
      // Session change will be handled by onAuthStateChange listener
    } catch (error: any) {
      console.error('Login error:', error);
      throw error; // Re-throw to allow component to catch and display toast
    } finally {
      setIsLoading(false);
    }
  };

  // Supabase signUp doesn't directly take a 'name'.
  // Name (and other profile info) can be added via user_metadata after signup,
  // or via a separate profile update function.
  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Supabase signUp returns user, but requires email confirmation by default.
      // The user object becomes available after email confirmation.
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw new Error(error.message || 'Registrering fejlede');
      }

      // Optional: Update user metadata immediately after signup if you want to store name
      // Note: This requires the user to be signed in, which happens instantly but session might not be ready.
      // Consider doing this in a separate profile setup step after email confirmation for robustness.
      // if (data.user) {
      //   await supabase.auth.updateUser({
      //     data: { name: initialName }, // This 'name' would be passed if needed
      //   });
      // }

      // Session change will be handled by onAuthStateChange listener if successful
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error; // Re-throw to allow component to catch and display toast
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message || 'Logout fejlede');
      }
      // Session change to null will be handled by onAuthStateChange listener
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user, // Derive isAuthenticated from user state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
