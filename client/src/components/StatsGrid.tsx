
import React from 'react';
import { DashboardCard } from '@/components/DashboardCard';
import { LayoutDashboard, Users, FilePlus, Upload } from 'lucide-react';

export const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <DashboardCard
        title="Total Tasks"
        value={24}
        description="Active deliverables"
        icon={<FilePlus className="h-6 w-6 text-blue-600" />}
        trend={{ value: "12%", positive: true }}
      />
      <DashboardCard
        title="Team Members"
        value={8}
        description="Active employees"
        icon={<Users className="h-6 w-6 text-emerald-600" />}
      />
      <DashboardCard
        title="Documents"
        value={156}
        description="Uploaded files"
        icon={<Upload className="h-6 w-6 text-violet-600" />}
        trend={{ value: "8%", positive: true }}
      />
      <DashboardCard
        title="Completed"
        value="85%"
        description="This month"
        icon={<LayoutDashboard className="h-6 w-6 text-orange-600" />}
        trend={{ value: "5%", positive: true }}
      />
    </div>
  );
};
