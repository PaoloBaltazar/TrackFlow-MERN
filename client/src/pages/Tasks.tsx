import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Plus, User, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Completed";
  createdAt: string;
}

const Tasks = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Get current user from localStorage (from UserMenu component logic)
  const getCurrentUser = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        return null;
      }
    }
    return null;
  };

  const currentUser = getCurrentUser();
  const currentUserName = currentUser?.name || "John Doe"; // fallback to default

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Solutions Pages",
      description:
        "Complete review of quarterly financials and prepare summary",
      assignee: "John Smith",
      dueDate: "2024-03-17",
      priority: "Medium",
      status: "Todo",
      createdAt: "2024-01-01",
    },
    {
      id: "2",
      title: "Company pages",
      description: "Revise policies and procedures documentation",
      assignee: "Sarah Johnson",
      dueDate: "2024-03-17",
      priority: "Low",
      status: "Todo",
      createdAt: "2024-01-02",
    },
    {
      id: "3",
      title: "Help Center Pages",
      description: "Update help documentation",
      assignee: "Mike Wilson",
      dueDate: "2024-03-18",
      priority: "Low",
      status: "Todo",
      createdAt: "2024-01-03",
    },
    {
      id: "4",
      title: "Icon Custom",
      description: "Design custom icons",
      assignee: "Alex Davis",
      dueDate: "2024-03-18",
      priority: "Low",
      status: "Todo",
      createdAt: "2024-01-04",
    },
    {
      id: "5",
      title: "Order Flow",
      description: "Implement order processing flow",
      assignee: "John Doe",
      dueDate: "2024-03-17",
      priority: "High",
      status: "In Progress",
      createdAt: "2024-01-05",
    },
    {
      id: "6",
      title: "New Work Flow",
      description: "Create new workflow system",
      assignee: "Emma Wilson",
      dueDate: "2024-03-17",
      priority: "High",
      status: "In Progress",
      createdAt: "2024-01-06",
    },
    {
      id: "7",
      title: "About Us Illustration",
      description: "Design about us page illustrations",
      assignee: "John Doe",
      dueDate: "2024-03-17",
      priority: "Medium",
      status: "Completed",
      createdAt: "2024-01-07",
    },
  ]);

  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});

  const handleTaskCreate = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleStatusChange = (
    taskId: string,
    newStatus: "Todo" | "In Progress" | "Completed"
  ) => {
    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    // Check if current user is the assignee
    if (task.assignee !== currentUserName) {
      toast({
        title: "Access Denied",
        description: "You can only change the status of tasks assigned to you.",
        variant: "destructive",
      });
      return;
    }

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}.`,
    });
  };

  const toggleSection = (status: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      case "Medium":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Low":
        return "bg-gray-100 text-gray-600 border-gray-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const canChangeStatus = (task: Task) => {
    return task.assignee === currentUserName;
  };

  const tasksByStatus = tasks.reduce((acc, task) => {
    if (!acc[task.status]) acc[task.status] = [];
    acc[task.status].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const statusOrder = ["Todo", "In Progress", "Completed"];
  const statusLabels = {
    Todo: "Pending",
    "In Progress": "In Progress",
    Completed: "Completed",
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Tasks
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Overview of Pending and Completed Tasks</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <TaskForm onTaskCreate={handleTaskCreate} />
              </div>
            </div>
          </div>

          {/* Tasks by Status */}
          <Card className="bg-white">
            <div className="overflow-hidden">
              {statusOrder.map((status) => {
                const statusTasks = tasksByStatus[status] || [];
                const isCollapsed = collapsedSections[status];

                return (
                  <div
                    key={status}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    {/* Status Header */}
                    <div
                      className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50/50 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleSection(status)}
                    >
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                      <span className="font-medium text-gray-900">
                        {statusLabels[status]}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({statusTasks.length})
                      </span>
                    </div>

                    {/* Tasks Content */}
                    {!isCollapsed && statusTasks.length > 0 && (
                      <>
                        {/* Mobile Card View */}
                        {isMobile ? (
                          <div className="p-3 space-y-3">
                            {statusTasks.map((task) => (
                              <TaskCard
                                key={task.id}
                                task={task}
                                onStatusChange={handleStatusChange}
                              />
                            ))}
                          </div>
                        ) : (
                          /* Desktop Table View */
                          <Table>
                            <TableHeader>
                              <TableRow className="border-b border-gray-100">
                                <TableHead className="w-12"></TableHead>
                                <TableHead className="w-2/5 font-medium text-gray-600">
                                  Name
                                </TableHead>
                                <TableHead className="w-1/5 font-medium text-gray-600">
                                  Assignee
                                </TableHead>
                                <TableHead className="w-1/6 font-medium text-gray-600">
                                  Due Date
                                </TableHead>
                                <TableHead className="w-1/6 font-medium text-gray-600">
                                  Priority
                                </TableHead>
                                <TableHead className="w-8"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {statusTasks.map((task) => (
                                <TableRow
                                  key={task.id}
                                  className="hover:bg-gray-50/50 transition-colors"
                                >
                                  <TableCell className="w-12">
                                    <div className="w-6 h-6" />
                                  </TableCell>
                                  <TableCell className="w-2/5">
                                    <div className="flex flex-col">
                                      <span className="font-medium text-gray-900">
                                        {task.title}
                                      </span>
                                      <span className="text-sm text-gray-500 mt-1">
                                        {task.description}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-1/5">
                                    <div className="flex items-center gap-2">
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                          task.assignee === currentUserName
                                            ? "bg-blue-500"
                                            : "bg-gray-400"
                                        }`}
                                      >
                                        <User className="h-3 w-3 text-white" />
                                      </div>
                                      <span
                                        className={`${
                                          task.assignee === currentUserName
                                            ? "text-blue-700 font-medium"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {task.assignee}
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-1/6">
                                    <div className="flex items-center gap-2 text-gray-600">
                                      <Calendar className="h-4 w-4" />
                                      <span>{task.dueDate}</span>
                                    </div>
                                  </TableCell>
                                  <TableCell className="w-1/6">
                                    <Badge
                                      className={`${getPriorityColor(
                                        task.priority
                                      )} border text-xs`}
                                    >
                                      {task.priority} Priority
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="w-8">
                                    {canChangeStatus(task) ? (
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                          >
                                            <span className="text-gray-400">
                                              ⋯
                                            </span>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                          align="end"
                                          className="w-40 bg-white border border-gray-200 shadow-lg z-50"
                                        >
                                          {statusOrder.map((statusOption) => (
                                            <DropdownMenuItem
                                              key={statusOption}
                                              onClick={() =>
                                                handleStatusChange(
                                                  task.id,
                                                  statusOption as
                                                    | "Todo"
                                                    | "In Progress"
                                                    | "Completed"
                                                )
                                              }
                                              className="flex items-center gap-2 cursor-pointer"
                                            >
                                              {statusLabels[statusOption]}
                                            </DropdownMenuItem>
                                          ))}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    ) : (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        disabled
                                      >
                                        <span className="text-gray-300">⋯</span>
                                      </Button>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
