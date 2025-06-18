
import React from 'react';
import TaskForm from './TaskForm';

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

interface TaskHeaderProps {
  onTaskCreate: (task: Task) => void;
}

const TaskHeader = ({ onTaskCreate }: TaskHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tasks Management
          </h1>
          <p className="text-gray-600">Organize and track your team's deliverables</p>
        </div>
        
        <TaskForm onTaskCreate={onTaskCreate} />
      </div>
    </div>
  );
};

export default TaskHeader;
