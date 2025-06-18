import { createContext, useEffect, useState } from "react";
import api from "@/services/api";

interface AppContextType {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.post("/api/auth/is-auth");
        if (res.data.success && res.data.user) {
          setIsLogin(true);
          setUser(res.data.user);
        } else {
          setIsLogin(false);
          setUser(null);
        }
      } catch {
        setIsLogin(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AppContext.Provider
      value={{ isLogin, setIsLogin, loading, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};
