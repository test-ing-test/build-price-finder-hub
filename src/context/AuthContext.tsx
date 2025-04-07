
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Tables } from '@/integrations/supabase/types';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: 'email' | 'google' | 'facebook' | 'twitter', credentials?: { email: string; password: string }) => Promise<void>;
  signup: (credentials: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          const { id, email } = currentSession.user;
          
          // Use setTimeout to avoid Supabase AUTH_ACTIONS_DEADLOCK
          setTimeout(async () => {
            try {
              // Get user profile from profiles table
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('name, avatar_url')
                .eq('id', id)
                .single();
                
              if (error) throw error;
              
              setUser({
                id,
                email: email || '',
                name: profile?.name || email?.split('@')[0] || 'User',
                avatar: profile?.avatar_url || undefined,
              });
            } catch (err) {
              console.error('Error fetching user profile:', err);
              setUser({
                id,
                email: email || '',
                name: email?.split('@')[0] || 'User',
                avatar: undefined,
              });
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        const { id, email } = currentSession.user;
        
        // Fetch user profile data
        supabase
          .from('profiles')
          .select('name, avatar_url')
          .eq('id', id)
          .single()
          .then(({ data: profile, error }) => {
            if (error) {
              console.error('Error fetching user profile:', error);
              setUser({
                id,
                email: email || '',
                name: email?.split('@')[0] || 'User',
                avatar: undefined,
              });
            } else {
              setUser({
                id,
                email: email || '',
                name: profile?.name || email?.split('@')[0] || 'User',
                avatar: profile?.avatar_url || undefined,
              });
            }
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (provider: 'email' | 'google' | 'facebook' | 'twitter', credentials?: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      if (provider === 'email' && credentials) {
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
        
        if (error) throw error;
        toast.success('Successfully logged in');
      } else if (provider === 'google') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
      } else if (provider === 'facebook') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'facebook',
          options: {
            redirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
      } else if (provider === 'twitter') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'twitter',
          options: {
            redirectTo: window.location.origin
          }
        });
        
        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Login failed:', error.message);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: { email: string; password: string; name: string }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Successfully signed up! Please check your email for verification.');
    } catch (error: any) {
      console.error('Signup failed:', error.message);
      toast.error(`Signup failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.info('You have been logged out');
    } catch (error: any) {
      console.error('Logout failed:', error.message);
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup,
        logout,
        session
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
