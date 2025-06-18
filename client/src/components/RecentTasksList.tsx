
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, TrendingUp } from 'lucide-react';

const recentTasks = [
  { id: 1, title: 'Q4 Financial Report', assignee: 'John Doe', dueDate: '2024-06-15', status: 'In Progress' },
  { id: 2, title: 'Marketing Campaign Docs', assignee: 'Jane Smith', dueDate: '2024-06-18', status: 'Pending' },
  { id: 3, title: 'Employee Handbook Update', assignee: 'Mike Johnson', dueDate: '2024-06-20', status: 'Completed' },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'In Progress':
      return 'bg-blue-50 text-blue-700 border-blue-100';
    default:
      return 'bg-amber-50 text-amber-700 border-amber-100';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle className="h-3 w-3" />;
    case 'In Progress':
      return <Clock className="h-3 w-3" />;
    default:
      return <TrendingUp className="h-3 w-3" />;
  }
};

export const RecentTasksList = () => {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
            <p className="text-sm text-gray-500 mt-1">Track your latest assignments</p>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-50">
            View All
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div 
              key={task.id} 
              className="group p-4 rounded-lg bg-gray-50/50 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Assigned to {task.assignee}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusStyles(task.status)}`}>
                    {getStatusIcon(task.status)}
                    {task.status}
                  </span>
                  <p className="text-xs text-gray-400">Due: {task.dueDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
