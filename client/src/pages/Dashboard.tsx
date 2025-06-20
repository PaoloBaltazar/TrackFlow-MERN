/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { MobileNavbar } from "@/components/MobileNavbar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { StatsGrid } from "@/components/StatsGrid";
import { RecentTasksList } from "@/components/RecentTasksList";
import api from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleMobileMenuClick = () => {
    console.log("Mobile menu clicked");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <MobileNavbar onMenuClick={handleMobileMenuClick} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:hidden mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          {/* Desktop Header */}
          <DashboardHeader />

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
          <div className="w-full">
            <RecentTasksList
              tasks={stats?.recentTasks || []}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
