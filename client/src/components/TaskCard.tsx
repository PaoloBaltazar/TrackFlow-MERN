import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, Clock, User, ChevronDown } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed';
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'Todo' | 'In Progress' | 'Completed') => void;
}

const TaskCard = ({ task, onStatusChange }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Todo': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return '✓';
      case 'In Progress': return '⏳';
      case 'Todo': return '📋';
      default: return '📋';
    }
  };

  return (
    <Card className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {task.title}
              </h3>
              <Badge className={`${getPriorityColor(task.priority)} border font-medium w-fit`}>
                {task.priority}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base line-clamp-2">{task.description}</p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="font-medium truncate">{task.assignee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                <span>Due: {task.dueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-500 flex-shrink-0" />
                <span className="hidden sm:inline">Created: {task.createdAt}</span>
                <span className="sm:hidden">{task.createdAt}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`${getStatusColor(task.status)} border-2 hover:shadow-md transition-all duration-200 font-medium px-3 sm:px-4 py-2 h-auto text-sm`}
                >
                  <span className="mr-2">{getStatusIcon(task.status)}</span>
                  <span className="hidden sm:inline">{task.status}</span>
                  <span className="sm:hidden">{task.status.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white border border-gray-200 shadow-lg">
                <DropdownMenuItem 
                  onClick={() => onStatusChange(task.id, 'Todo')}
                  className="flex items-center gap-2 cursor-pointer hover:bg-slate-50"
                >
                  <span>📋</span>
                  Todo
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onStatusChange(task.id, 'In Progress')}
                  className="flex items-center gap-2 cursor-pointer hover:bg-blue-50"
                >
                  <span>⏳</span>
                  In Progress
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onStatusChange(task.id, 'Completed')}
                  className="flex items-center gap-2 cursor-pointer hover:bg-emerald-50"
                >
                  <span>✓</span>
                  Completed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
