import { createContext, useEffect, useState } from "react";
import api from "@/services/api";

interface AppContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const AppContext = createContext<AppContextType>({
  isLogin: false,
  setIsLogin: () => {},
  loading: true,
  user: null,
  setUser: () => {},
  login: async () => ({ success: false }),
  logout: async () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      if (res.data.success) {
        // Store token in localStorage if provided
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        // Check authentication status
        await checkAuth();
        return { success: true };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state and localStorage
      localStorage.removeItem("token");
      setIsLogin(false);
      setUser(null);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await api.post("/api/auth/is-auth");
      if (res.data.success && res.data.user) {
        setIsLogin(true);
        setUser(res.data.user);
      } else {
        setIsLogin(false);
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setIsLogin(false);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{ isLogin, setIsLogin, loading, user, setUser, login, logout }}
    >
      {children}
    </AppContext.Provider>
  );
};
