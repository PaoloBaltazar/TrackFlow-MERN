import React, { useEffect, useState } from "react";
import { X, Info, ArrowLeft, FileText, Users, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import api from "@/services/api";
import { formatDistanceToNow } from "date-fns";

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

  useEffect(() => {
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

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n._id !== id));
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
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    Notifications
                  </h1>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">
                    You have {unreadCount} notifications to go through
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-full sm:w-auto"
                >
                  Mark all as Read
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {loading ? (
              <p className="text-gray-500">Loading notifications...</p>
            ) : (
              Object.entries(groupedNotifications).map(
                ([dateGroup, groupNotifications]) => (
                  <div key={dateGroup}>
                    <h2 className="text-lg font-medium text-gray-700 mb-4">
                      {dateGroup}
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                      {groupNotifications.map((notification) => (
                        <Card
                          key={notification._id}
                          className={`bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
                            !notification.isRead ? "ring-2 ring-blue-50" : ""
                          }`}
                        >
                          <div className="p-4 sm:p-6">
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 ${getIconBgColor(
                                  notification.type
                                )}`}
                              >
                                <div
                                  className={getIconColor(notification.type)}
                                >
                                  {getNotificationIcon(notification.icon)}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {notification.title || "Notification"}
                                      </h3>
                                      <span className="text-xs text-gray-500">
                                        {notification.timeAgo}
                                      </span>
                                      {!notification.isRead && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                      {notification.message}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-1 ml-4">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-medium px-3"
                                      onClick={() =>
                                        markAsRead(notification._id)
                                      }
                                    >
                                      View
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        deleteNotification(notification._id)
                                      }
                                      className="hover:bg-gray-100 p-1"
                                    >
                                      <X className="h-4 w-4 text-gray-400" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
