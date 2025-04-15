
import React, { createContext, useContext, useState } from 'react';
import { AuthState, User } from '@/types/auth';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded credentials
const VALID_CREDENTIALS = {
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
  id: '1',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const user: User = {
        id: VALID_CREDENTIALS.id,
        email: VALID_CREDENTIALS.email,
        name: VALID_CREDENTIALS.name,
      };
      setAuthState({ user, isAuthenticated: true });
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      return true;
    }
    toast({
      title: "Error",
      description: "Invalid credentials",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
