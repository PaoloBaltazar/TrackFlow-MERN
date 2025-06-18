import React, { useState } from "react";
import { X, Check, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: string;
  read: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Task Assigned",
      message: 'You have been assigned to "Review Q4 Financial Report"',
      type: "info",
      timestamp: "2024-01-10 09:30",
      read: false,
    },
    {
      id: "2",
      title: "Document Uploaded",
      message: 'New document "Contract_2024.pdf" has been uploaded',
      type: "success",
      timestamp: "2024-01-10 08:15",
      read: false,
    },
    {
      id: "3",
      title: "Task Due Soon",
      message: 'Task "Client Presentation Prep" is due in 2 days',
      type: "warning",
      timestamp: "2024-01-09 16:45",
      read: true,
    },
    {
      id: "4",
      title: "System Maintenance",
      message:
        "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
      type: "info",
      timestamp: "2024-01-09 14:30",
      read: true,
    },
    {
      id: "5",
      title: "Task Completed",
      message: 'Task "Monthly Report" has been marked as completed',
      type: "success",
      timestamp: "2024-01-09 11:20",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-emerald-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-emerald-400";
      case "warning":
        return "border-l-amber-400";
      case "error":
        return "border-l-red-400";
      default:
        return "border-l-blue-400";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "warning":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "error":
        return "bg-red-50 text-red-700 border-red-100";
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Notifications
                </h1>
                <p className="text-gray-600 mt-2">
                  Stay updated with your latest activities
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-600">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </span>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white border-red-500">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <Card className="p-8 text-center bg-white border border-gray-200 shadow-sm">
                <p className="text-gray-500">No notifications</p>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`group bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-l-4 ${getTypeColor(
                    notification.type
                  )} ${!notification.read ? "ring-2 ring-blue-50" : ""}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getTypeIcon(notification.type)}
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {notification.title}
                          </h3>
                          <Badge
                            className={`${getTypeBadge(
                              notification.type
                            )} border`}
                          >
                            {notification.type}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        <p className="text-sm text-gray-400">
                          {notification.timestamp}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                            className="hover:bg-gray-100"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete notification"
                          className="hover:bg-gray-100"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
