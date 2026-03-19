"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiClient } from "@/lib/api";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await apiClient.get<User>("/v1/auth/profile");
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    } catch {
      localStorage.removeItem("accessToken");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post<{ user: User; accessToken: string }>(
      "/v1/auth/login",
      { email, password }
    );
    if (res.success && res.data) {
      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || "Login failed" };
  };

  const register = async (username: string, email: string, password: string) => {
    const res = await apiClient.post<{ user: User; accessToken: string }>(
      "/v1/auth/register",
      { username, email, password }
    );
    if (res.success && res.data) {
      localStorage.setItem("accessToken", res.data.accessToken);
      setUser(res.data.user);
      return { success: true, message: res.message };
    }
    return { success: false, message: res.message || "Registration failed" };
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    apiClient.post("/v1/auth/logout", {});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
