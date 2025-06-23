import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { AppContext } from "@/context/AppContext";
import TrackFlowLogo from "@/components/TrackFlowLogo";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", { email, password });

      if (res.data.success) {
        setIsLogin(true);
        navigate("/");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Login error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <TrackFlowLogo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Sign in to TrackFlow
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <p className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
