
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import TaskHeader from '@/components/TaskHeader';
import TaskCard from '@/components/TaskCard';

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

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review Q4 Financial Report',
      description: 'Complete review of quarterly financials and prepare summary',
      assignee: 'John Smith',
      dueDate: '2024-01-15',
      priority: 'High',
      status: 'In Progress',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Update Employee Handbook',
      description: 'Revise policies and procedures documentation',
      assignee: 'Sarah Johnson',
      dueDate: '2024-01-20',
      priority: 'Medium',
      status: 'Todo',
      createdAt: '2024-01-02'
    },
    {
      id: '3',
      title: 'Client Presentation Prep',
      description: 'Prepare slides for upcoming client meeting',
      assignee: 'Mike Wilson',
      dueDate: '2024-01-12',
      priority: 'High',
      status: 'Completed',
      createdAt: '2024-01-03'
    }
  ]);

  const handleTaskCreate = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleStatusChange = (taskId: string, newStatus: 'Todo' | 'In Progress' | 'Completed') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <TaskHeader onTaskCreate={handleTaskCreate} />

          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onStatusChange={handleStatusChange} 
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
