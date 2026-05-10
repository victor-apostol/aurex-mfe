import { createContext, ReactNode } from 'react';

import type { User } from './types';

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (name?: string) => Promise<void>;
  logoutUser: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
  value: AuthContextValue;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
  return <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>;
};
