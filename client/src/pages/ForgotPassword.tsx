import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "@/services/api"; // make sure this points to your configured Axios instance

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      return toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
    }

    try {
      const res = await api.post("/api/auth/send-reset-otp", { email });
      if (res.data.success) {
        toast({
          title: "OTP Sent",
          description: res.data.message || `Code sent to ${email}`,
        });
        setStep("otp");
      } else {
        toast({
          title: "Failed",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send OTP",
        variant: "destructive",
      });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6 || !newPassword) {
      return toast({
        title: "Error",
        description: "Make sure OTP is 6 digits and new password is filled",
        variant: "destructive",
      });
    }

    try {
      const res = await api.post("/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast({ title: "Success", description: res.data.message });
        setStep("success");
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await api.post("/api/auth/send-reset-otp", { email });
      if (res.data.success) {
        toast({ title: "OTP Resent", description: res.data.message });
        setOtp("");
      } else {
        toast({
          title: "Error",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <Link to="/login" className="absolute left-8">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          </div>
          <p className="text-gray-600">
            {step === "email" &&
              "Enter your email to receive a verification code"}
            {step === "otp" && "Enter the verification code and new password"}
            {step === "success" && "Password reset completed"}
          </p>
        </CardHeader>

        <CardContent>
          {step === "email" && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Verification Code
              </Button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <p className="text-sm text-gray-500 mb-4">Sent to {email}</p>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                  >
                    <InputOTPGroup>
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>

              <div>
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Reset Password
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Didn’t receive the code? Resend
                </button>
              </div>
            </form>
          )}

          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Verification Successful
                </h3>
                <p className="text-gray-600 mb-6">
                  Your password has been reset. You can now log in.
                </p>
              </div>
              <Link to="/login" className="block">
                <Button className="w-full">Back to Login</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
