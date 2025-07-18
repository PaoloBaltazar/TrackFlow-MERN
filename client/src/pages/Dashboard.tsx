/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { MobileNavbar } from "@/components/MobileNavbar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsGrid } from "@/components/StatsGrid";
import { RecentTasksList } from "@/components/RecentTasksList";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { RecentDocumentsList } from "@/components/RecentDocumentsList";

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const [stats, setStats] = useState<{
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    users: number;
    documents: number;
    recentTasks: any[];
  } | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/dashboard");
      if (res.data.success) {
        setStats(res.data.stats);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch dashboard stats.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/user/data");
      if (res.data.success && res.data.userData) {
        const name = res.data.userData.name;
        const first = name.split(" ")[0];
        setFirstName(first);
      }
    } catch (err: any) {
      console.error("Error fetching user:", err);
    }
  };

  const determineGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = () => {
    const today = new Date();
    const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
    const day = today.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const month = today.toLocaleString("en-US", { month: "long" });

    return `${weekday}, ${day}${suffix} ${month}`;
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUser();
    setGreeting(determineGreeting());
    setFormattedDate(formatDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMobileMenuClick = () => {
    console.log("Mobile menu clicked");
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <MobileNavbar onMenuClick={handleMobileMenuClick} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Header */}
          <DashboardHeader
            firstName={firstName}
            greeting={greeting}
            formattedDate={formattedDate}
          />

          {/* Stats Cards */}
          <StatsGrid
            totalTasks={stats?.totalTasks || 0}
            completedTasks={stats?.completedTasks || 0}
            pendingTasks={stats?.pendingTasks || 0}
            users={stats?.users || 0}
            documents={stats?.documents || 0}
            loading={loading}
          />

          {/* Recent Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentTasksList
              tasks={stats?.recentTasks || []}
              loading={loading}
            />
            <RecentDocumentsList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
