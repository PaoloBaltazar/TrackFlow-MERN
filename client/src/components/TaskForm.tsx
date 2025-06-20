/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Todo" | "In Progress" | "Completed";
  createdAt: string;
}

interface TaskFormProps {
  onTaskCreate: (task: Task) => void;
}

interface Employee {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreate }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "Medium",
  });

  // Fetch employees when modal is opened
  useEffect(() => {
    if (open) {
      const fetchEmployees = async () => {
        try {
          const res = await api.get("/api/user/employees");
          if (res.data.success) {
            setEmployees(res.data.users);
          } else {
            toast({ title: "Error", description: "Failed to fetch users" });
          }
        } catch (err: any) {
          toast({
            title: "Error",
            description: err.response?.data?.message || "Could not load users",
          });
        }
      };

      fetchEmployees();
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/task", formData);
      if (res.data.success) {
        toast({
          title: "Task Created",
          description: "Task was successfully added!",
        });
        onTaskCreate(res.data.task);
        setFormData({
          title: "",
          description: "",
          assignee: "",
          dueDate: "",
          priority: "Medium",
        });
        setOpen(false);
      } else {
        toast({ title: "Failed", description: res.data.message });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs sm:text-sm">
          + Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Assignee</Label>
            <select
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="" disabled>
                Select employee
              </option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {`${emp.name} (${emp.department} - ${emp.role})`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Due Date</Label>
            <Input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>Priority</Label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
