import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { AppContext } from "@/context/AppContext";

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
        navigate("/"); // ← Redirect to dashboard after login
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Login error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">DocTracker</h1>
          <p className="text-gray-600 mt-2">Document Management System</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Forgot password
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
