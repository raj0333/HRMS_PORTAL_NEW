import React, { createContext, useState, useCallback } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  const login = useCallback(async (email: string, password: string) => {
    // Mock authentication
    if (email === 'admin@hrms.com' && password === 'admin123') {
      const mockUser: User = {
        id: '1',
        email,
        name: 'Admin User',
        role: 'super_admin',
        department: 'HR',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else if (email === 'hr@hrms.com' && password === 'hr123') {
      const mockUser: User = {
        id: '2',
        email,
        name: 'HR Manager',
        role: 'hr',
        department: 'HR',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else if (email === 'emp@hrms.com' && password === 'emp123') {
      const mockUser: User = {
        id: '3',
        email,
        name: 'Employee User',
        role: 'employee',
        department: 'IT',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'employee',
      department: 'IT',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
