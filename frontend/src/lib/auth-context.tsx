import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import { toast } from "./toast";

export interface Club {
  club_id: string;
  club_name: string;
  creator_id: number;
  invite_only: boolean;
  description: string;
  cover_image: string;
  logo: string;
  members: number;
  events: Event[];
}
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  type: "physical" | "online" | "hybrid";
  category: "academic" | "sports" | "cultural";
  image: string;
  qr_code: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  club: Club;
  refundPolicy: string;
  agenda?: string[];
}

export interface Booking {
  id: string;
  event_id: string;
  event_name: string;
  event_date: string;
  venue: string;
  tickets: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentProof?: string;
  qrCode?: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile_pic?: string;
  clubs: Club[];
  adminClubs: Club[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  isClubMember: boolean;
  isClubAdmin: (clubId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const refreshUser = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

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

  useEffect(() => {
    console.log(user);
  }, [user]);
  const login = async (username: string, password: string) => {
    try {
      await api.post("/users/login", { username, password });
      toast.success("Logged in Successfully");
      

    } catch (err) {
      toast.error("Login Failed " + err.response.data.error_code);
    }
    finally{
    const res = await api.get("/users/me");
    setUser(res.data);
    }
  };

  const logout = async () => {
    await api.get("/users/logout");

    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/users/register", { name, email, password });
      toast.success("Registered Successfully");
    } catch (err) {
      if(!err.response) {
        toast.error("Server Unreachable");
      }
      else toast.error("Registration Failed " + err.response.data.error_code);
      throw err;
    }
  };

  const isClubMember = (user?.clubs?.length || 0) > 0;

  const isClubAdmin = (clubId?: string) => {
    if (!user) return false;
    if (!clubId) return user.adminClubs.length > 0;
    return user.adminClubs.some((c) => c.club_id === clubId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        isClubMember,
        isClubAdmin,
        refreshUser,
      }}
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
