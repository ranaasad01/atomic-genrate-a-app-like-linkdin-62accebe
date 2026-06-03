"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CURRENT_USER } from "@/lib/mock-data";

interface AuthUser {
  id: string;
  name: string;
  headline: string;
  avatar: string;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("proconnect_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const mockUser: AuthUser = {
      id: CURRENT_USER.id,
      name: CURRENT_USER.name,
      headline: CURRENT_USER.headline,
      avatar: CURRENT_USER.avatar,
      email: email || CURRENT_USER.email,
    };
    setUser(mockUser);
    localStorage.setItem("proconnect_user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("proconnect_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
