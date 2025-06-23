import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import api from "@/services/api";
import TrackFlowLogo from "@/components/TrackFlowLogo";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    handleResendOTP();
  }, []);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/auth/verify-email", { otp });

      if (res.data.success) {
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified!",
        });
        setIsVerified(true);
      } else {
        toast({
          title: "Verification Failed",
          description: res.data.message || "Invalid OTP",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Server Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const res = await api.post("/api/auth/send-verify-otp");

      if (res.data.success) {
        toast({
          title: "OTP Sent",
          description: "A new verification code was sent to your email.",
        });
      } else {
        toast({
          title: "Failed to Send OTP",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not send OTP. Please try again.",
        variant: "destructive",
      });
    }
    setOtp("");
  };

  const handleContinue = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <TrackFlowLogo />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Verify Your Email
          </h1>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        {!isVerified ? (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
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
        ) : (
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
                Email Verified!
              </h3>
              <p className="text-gray-600 mb-6">
                Your email has been successfully verified. You can now log in.
              </p>
            </div>
            <Button
              onClick={handleContinue}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Continue to Login
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VerifyEmail;
