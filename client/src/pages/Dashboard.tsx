import React from 'react';
import { Layout } from '@/components/Layout';
import { MobileNavbar } from '@/components/MobileNavbar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { StatsGrid } from '@/components/StatsGrid';
import { RecentTasksList } from '@/components/RecentTasksList';

const Dashboard = () => {
  const handleMobileMenuClick = () => {
    // This function would typically trigger the sidebar
    // For now, we'll keep it as a placeholder since the Layout component
    // handles the sidebar state internally
    console.log('Mobile menu clicked');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        {/* Mobile-only navbar */}
        <MobileNavbar onMenuClick={handleMobileMenuClick} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile header with title - adjusted for navbar */}
          <div className="md:hidden mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Desktop header */}
          <DashboardHeader />

          {/* Stats Cards */}
          <StatsGrid />

          {/* Main Content - Recent Tasks taking full width */}
          <div className="w-full">
            <RecentTasksList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
