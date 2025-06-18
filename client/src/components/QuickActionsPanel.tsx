
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FilePlus, Upload, Users } from 'lucide-react';

export const QuickActionsPanel = () => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <p className="text-sm text-gray-500 mt-1">Frequently used actions</p>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          <Button 
            className="w-full justify-start h-12 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100 hover:border-blue-200" 
            variant="outline"
          >
            <FilePlus className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Add New Task</div>
              <div className="text-xs opacity-70">Create a deliverable</div>
            </div>
          </Button>
          <Button 
            className="w-full justify-start h-12 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-100 hover:border-emerald-200" 
            variant="outline"
          >
            <Upload className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Upload Document</div>
              <div className="text-xs opacity-70">Add files to project</div>
            </div>
          </Button>
          <Button 
            className="w-full justify-start h-12 bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-100 hover:border-violet-200" 
            variant="outline"
          >
            <Users className="mr-3 h-5 w-5" />
            <div className="text-left">
              <div className="font-medium">Manage Team</div>
              <div className="text-xs opacity-70">View team members</div>
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
};
