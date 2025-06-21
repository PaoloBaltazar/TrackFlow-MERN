import React, { useEffect, useState, useContext } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/context/AppContext";
import api from "@/services/api";

interface UserType {
  name: string;
  email?: string;
  role?: string;
  isAccountVerified?: boolean;
}

interface UserMenuProps {
  profileOnly?: boolean;
}

export const UserMenu = ({ profileOnly = false }: UserMenuProps) => {
  const { isLogin, setIsLogin } = useContext(AppContext);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/user/data"); // ✅ updated endpoint
        if (res.data.success && res.data.userData) {
          setUser(res.data.userData); // ✅ expected: { name, email?, role? }
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLogin) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [isLogin]);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsLogin(false);
    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div
        className={`flex items-center ${profileOnly ? "gap-0" : "gap-3"} p-3`}
      >
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
        {!profileOnly && (
          <div className="text-left">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        )}
      </div>
    );
  }

  if (!isLogin || !user) {
    return (
      <Button variant="outline" onClick={() => navigate("/login")}>
        Login
      </Button>
    );
  }

  const AvatarInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={
            profileOnly ? "p-2 h-auto" : "flex items-center gap-3 p-3 h-auto"
          }
        >
          <Avatar className={profileOnly ? "h-8 w-8" : "h-10 w-10"}>
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
              {AvatarInitials}
            </AvatarFallback>
          </Avatar>
          {/* ❌ Removed name and role display here */}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-lg bg-blue-100 text-blue-700 font-semibold">
                {AvatarInitials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              {user.email && (
                <p className="text-sm text-gray-600">{user.email}</p>
              )}
              {user.role && (
                <p className="text-sm text-blue-600">{user.role}</p>
              )}

              {user.isAccountVerified === false && (
                <p
                  onClick={() => navigate("/verify-email")}
                  className="text-sm text-red-600 cursor-pointer hover:underline"
                >
                  Account not verified. Click to verify.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <User className="h-4 w-4 mr-2" />
              Profile Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Preferences
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
