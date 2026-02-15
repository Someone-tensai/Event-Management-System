import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
export interface User {
  id: string;
  name: string;
  email: string;
  profile_pic?: string;
  clubs: string[];
  adminClubs: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  isClubMember: boolean;
  isClubAdmin: (clubId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(()=>{
    console.log(user);
  },[user])
  const login = async (username: string, password: string) => {
    await api.post(
      "/users/login",
      { username, password },
    );

    const res = await api.get("/users/me", {
    });

    setUser(res.data);
  };

  const logout = async () => {
    await api.post(
      "/users/logout",
      {},
    );

    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post(
      "/users/register",
      { name, email, password },
    );

    const res = await api.get("/auth/me", {
      withCredentials: true,
    });

    setUser(res.data);
  };

  const isClubMember = (user?.clubs?.length || 0) > 0;

  const isClubAdmin = (clubId?: string) => {
    if (!user) return false;
    if (!clubId) return user.adminClubs.length > 0;
    return user.adminClubs.includes(clubId);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, isClubMember, isClubAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
