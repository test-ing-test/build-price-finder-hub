
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'email' | 'google' | 'facebook' | 'twitter';
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (provider: 'email' | 'google' | 'facebook' | 'twitter', credentials?: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('buildprice_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (provider: 'email' | 'google' | 'facebook' | 'twitter', credentials?: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user based on provider
      let mockUser: User;
      
      if (provider === 'email' && credentials) {
        mockUser = {
          id: `user-${Math.random().toString(36).substr(2, 9)}`,
          name: credentials.email.split('@')[0],
          email: credentials.email,
          provider: 'email'
        };
      } else if (provider === 'google') {
        mockUser = {
          id: `google-${Math.random().toString(36).substr(2, 9)}`,
          name: 'Google User',
          email: 'user@gmail.com',
          avatar: 'https://lh3.googleusercontent.com/a/default-user',
          provider: 'google'
        };
      } else if (provider === 'facebook') {
        mockUser = {
          id: `fb-${Math.random().toString(36).substr(2, 9)}`,
          name: 'Facebook User',
          email: 'user@facebook.com',
          avatar: 'https://graph.facebook.com/default-user/picture',
          provider: 'facebook'
        };
      } else {
        mockUser = {
          id: `twitter-${Math.random().toString(36).substr(2, 9)}`,
          name: 'Twitter User',
          email: 'user@twitter.com',
          avatar: 'https://pbs.twimg.com/profile_images/default_profile_normal.png',
          provider: 'twitter'
        };
      }
      
      // Save user to localStorage
      localStorage.setItem('buildprice_user', JSON.stringify(mockUser));
      setUser(mockUser);
      toast.success(`Welcome, ${mockUser.name}!`);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('buildprice_user');
    setUser(null);
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
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
