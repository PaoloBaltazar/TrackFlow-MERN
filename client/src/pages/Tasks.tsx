/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
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
import { Plus, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import TaskForm from "@/components/TaskForm";
import api from "@/services/api";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignee: {
    _id: string;
    name: string;
    department: string;
    role: string;
  };
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Completed";
  createdAt: string;
}

const Tasks = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<
    "incomplete" | "pending" | "complete"
  >("incomplete");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/task");
      if (res.data.success) {
        setTasks(res.data.tasks);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch tasks.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreate = () => {
    fetchTasks();
    toast({ title: "Task Created", description: "New task has been added." });
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: "Todo" | "In Progress" | "Completed"
  ) => {
    try {
      const res = await api.put(`/api/task/${taskId}/status`, { newStatus });
      if (res.data.success) {
        const updatedTask = res.data.task;
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: updatedTask.status } : task
          )
        );
        toast({
          title: "Task Updated",
          description: `Task status changed to ${newStatus}.`,
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to update status",
      });
    }
  };

  const handleDeleteClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedTaskId) return;

    try {
      const res = await api.delete(`/api/task/${selectedTaskId}`);
      if (res.data.success) {
        setTasks((prev) => prev.filter((task) => task._id !== selectedTaskId));
        toast({
          title: "🗑️ Task Deleted",
          description: "The task was successfully deleted.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Failed to delete task",
      });
    } finally {
      setDeleteModalOpen(false);
      setSelectedTaskId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Todo":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            Not started
          </Badge>
        );
      case "In Progress":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Pending
          </Badge>
        );
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Completed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            Unknown
          </Badge>
        );
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (selectedTab === "pending") return task.status === "In Progress";
    if (selectedTab === "complete") return task.status === "Completed";
    return true; // Show all tasks for "All Task" tab
  });

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <div className="mb-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
                Task
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Track, manage, and complete your tasks efficiently
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-3 sm:gap-6 mb-4 sm:mb-6 overflow-x-auto">
              {["incomplete", "pending", "complete"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setSelectedTab(tab as "incomplete" | "pending" | "complete")
                  }
                  className={`pb-2 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    selectedTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "incomplete"
                    ? "All Task" // ← CHANGED THIS LINE
                    : tab === "pending"
                    ? "Pending Task"
                    : "Complete Task"}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <TaskForm onTaskCreate={handleTaskCreate} />
            </div>
          </div>

          {/* Table */}
          <Card className="bg-white shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-6 text-gray-600 text-center">
                Loading tasks...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead>Subject</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Priority
                      </TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-8 sm:w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks.map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-gray-500">
                            {task.description}
                          </div>
                        </TableCell>
                        <TableCell>
                          {task.assignee?.name || "Unassigned"}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {task.priority}
                        </TableCell>
                        <TableCell>
                          {new Date(task.dueDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                ⋯
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {["Todo", "In Progress", "Completed"].map(
                                (status) => (
                                  <DropdownMenuItem
                                    key={status}
                                    onClick={() =>
                                      handleStatusChange(
                                        task._id,
                                        status as Task["status"]
                                      )
                                    }
                                  >
                                    {status}
                                  </DropdownMenuItem>
                                )
                              )}
                              <DropdownMenuItem
                                onClick={() => handleDeleteClick(task._id)}
                                className="text-red-600 focus:text-red-700"
                              >
                                Delete Task
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </Layout>
  );
};

export default Tasks;
