
import React from 'react';
import { UserMenu } from '@/components/UserMenu';
import { NotificationCenter } from '@/components/NotificationCenter';

export const DashboardHeader = () => {
  return (
    <div className="hidden md:block mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationCenter />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
