import { createContext, ReactNode, useContext } from "react";

import type { User } from "./types";

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

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return value;
};
