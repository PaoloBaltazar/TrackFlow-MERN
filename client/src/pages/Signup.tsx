import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";

const departments = [
  "Finance",
  "Marketing",
  "Human Resources",
  "Operations",
  "IT",
];

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    role: "",
  });

  const [step, setStep] = useState<1 | 2>(1);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStepOneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, email, password } = signupForm;

    if (!fullName || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!signupForm.department) {
      toast({
        title: "Error",
        description: "Please select a department",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await api.post("/api/auth/signup", signupForm);

      if (res.data.success) {
        toast({
          title: "Account Created!",
          description: "You have successfully signed up. Redirecting...",
        });
        navigate("/");
      } else {
        toast({
          title: "Signup Failed",
          description: res.data.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Signup Error",
        description: err?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <CardHeader className="text-center pb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">
            {step === 1 ? "Sign up to get started" : "Select your department"}
          </p>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <form onSubmit={handleStepOneSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={signupForm.fullName}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Next
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Select Department</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      type="button"
                      variant={
                        signupForm.department === dept ? "default" : "outline"
                      }
                      onClick={() =>
                        setSignupForm({ ...signupForm, department: dept })
                      }
                    >
                      {dept}
                    </Button>
                  ))}
                </div>

                <div className="mt-4">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    value={signupForm.role}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, role: e.target.value })
                    }
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="Intern">Intern</option>
                    <option value="Junior Staff">Junior Staff</option>
                    <option value="Senior Staff">Senior Staff</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Manager">Manager</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Director">Director</option>
                    <option value="Executive">Executive</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Consultant">Consultant</option>
                  </select>
                </div>
              </div>

              <Button className="w-full" onClick={handleFinalSubmit}>
                Create Account
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
