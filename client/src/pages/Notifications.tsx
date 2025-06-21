import React, { useEffect, useState } from "react";
import {
  X,
  Info,
  ArrowLeft,
  FileText,
  Users,
  Upload,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { formatDistanceToNow } from "date-fns";
import { DashboardHeader } from "@/components/DashboardHeader";

interface Notification {
  _id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  icon?: "document" | "user" | "upload" | "info";
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  timeAgo?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/api/notification");
      if (res.data.success) {
        const formatted = res.data.notifications.map((n: Notification) => ({
          ...n,
          timeAgo: formatDistanceToNow(new Date(n.createdAt), {
            addSuffix: true,
          }),
        }));
        setNotifications(formatted);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/api/notification/${id}/read`, { isRead: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      await api.put(`/api/notification/${id}/read`, { isRead: false });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: false } : n))
      );
    } catch (err) {
      console.error("Failed to mark as unread", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/api/notification/mark-all-read");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await api.delete(`/api/notification/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  const getNotificationIcon = (icon?: string) => {
    switch (icon) {
      case "document":
        return <FileText className="h-5 w-5" />;
      case "user":
        return <Users className="h-5 w-5" />;
      case "upload":
        return <Upload className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getIconBgColor = (type?: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-100";
      case "warning":
        return "bg-amber-100";
      case "error":
        return "bg-red-100";
      default:
        return "bg-blue-100";
    }
  };

  const getIconColor = (type?: string) => {
    switch (type) {
      case "success":
        return "text-emerald-600";
      case "warning":
        return "text-amber-600";
      case "error":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  const groupedNotifications = notifications.reduce((groups, notification) => {
    const group = notification.timeAgo?.includes("ago") ? "Today" : "Earlier";
    if (!groups[group]) groups[group] = [];
    groups[group].push(notification);
    return groups;
  }, {} as Record<string, Notification[]>);

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Notifications</h1>
                  <p className="text-gray-600 text-sm">
                    You have {unreadCount} unread notifications
                  </p>
                </div>
              </div>
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-50"
                >
                  Mark all as read
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              Object.entries(groupedNotifications).map(([group, notifs]) => (
                <div key={group}>
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    {group}
                  </h2>
                  <div className="space-y-3">
                    {notifs.map((notification) => (
                      <Card
                        key={notification._id}
                        className={`p-4 border ${
                          !notification.isRead ? "" : ""
                        }`}
                      >
                        <div className="flex gap-4">
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${getIconBgColor(
                              notification.type
                            )}`}
                          >
                            <span
                              className={`w-5 h-5 ${getIconColor(
                                notification.type
                              )}`}
                            >
                              {getNotificationIcon(notification.icon)}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                    {notification.title || "Notification"}
                                  </h3>
                                  <span className="text-xs text-gray-500">
                                    {notification.timeAgo}
                                  </span>
                                  {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {notification.message}
                                </p>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {notification.isRead ? (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        markAsUnread(notification._id)
                                      }
                                    >
                                      Mark as Unread
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        markAsRead(notification._id)
                                      }
                                    >
                                      Mark as Read
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={() =>
                                      deleteNotification(notification._id)
                                    }
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
