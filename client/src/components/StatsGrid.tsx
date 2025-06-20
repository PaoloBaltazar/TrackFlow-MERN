// components/StatsGrid.tsx
import React from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { LayoutDashboard, Users, FilePlus, Upload } from "lucide-react";

interface StatsGridProps {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  users: number;
  documents: number;
  loading: boolean;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  totalTasks,
  completedTasks,
  pendingTasks,
  users,
  documents,
  loading,
}) => {
  const completionRate = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <DashboardCard
        title="Total Tasks"
        value={loading ? "..." : totalTasks}
        description="All deliverables"
        icon={<FilePlus className="h-6 w-6 text-blue-600" />}
      />
      <DashboardCard
        title="Team Members"
        value={loading ? "..." : users}
        description="Active employees"
        icon={<Users className="h-6 w-6 text-emerald-600" />}
      />
      <DashboardCard
        title="Documents"
        value={loading ? "..." : documents}
        description="Uploaded files"
        icon={<Upload className="h-6 w-6 text-violet-600" />}
      />
      <DashboardCard
        title="Completed"
        value={loading ? "..." : `${completionRate}%`}
        description="This month"
        icon={<LayoutDashboard className="h-6 w-6 text-orange-600" />}
      />
    </div>
  );
};
