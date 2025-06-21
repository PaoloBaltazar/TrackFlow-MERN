import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, TrendingUp } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  assignee: {
    name: string;
  };
  dueDate: string;
  status: string;
}

interface RecentTasksListProps {
  tasks: Task[];
  loading: boolean;
}

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-100";
    default:
      return "bg-amber-50 text-amber-700 border-amber-100";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-3 w-3" />;
    case "In Progress":
      return <Clock className="h-3 w-3" />;
    default:
      return <TrendingUp className="h-3 w-3" />;
  }
};

export const RecentTasksList: React.FC<RecentTasksListProps> = ({
  tasks,
  loading,
}) => {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  const handleViewAll = () => {
    navigate("/tasks"); // ✅ Redirect to Task page
  };

  return (
    <Card className="bg-white border rounded-3xl border-gray-100 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Tasks
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track your latest assignments
            </p>
          </div>
          <Button
            onClick={handleViewAll} // ✅ Add onClick
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            View All
          </Button>
        </div>
      </div>
      <div className="p-8">
        {loading ? (
          <p className="text-gray-500 text-sm">Loading recent tasks...</p>
        ) : (
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No recent tasks available.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="group p-4 rounded-lg bg-gray-50/50 border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Assigned to {task.assignee?.name || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusStyles(
                          task.status
                        )}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status}
                      </span>
                      <p className="text-xs text-gray-400">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Card>
  );
};
