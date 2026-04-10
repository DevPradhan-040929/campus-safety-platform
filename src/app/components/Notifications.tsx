import { ArrowLeft, Bell, Shield, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

interface Notification {
  id: string;
  type: "alert" | "update" | "success" | "info";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    apiFetch("/notifications")
      .then((data) => {
        setNotifications(data.map((n: any) => ({
          id: n._id,
          type: n.message.includes("update") ? "update" : "alert",
          title: "Status Update",
          message: n.message,
          timestamp: new Date(n.createdAt).toLocaleTimeString(),
          read: n.read || false,
        })));
      })
      .catch((err) => console.error(err));
  }, []);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "update":
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "info":
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationBg = (type: Notification["type"], read: boolean) => {
    if (read) return "bg-white";
    switch (type) {
      case "alert":
        return "bg-red-50";
      case "update":
        return "bg-blue-50";
      case "success":
        return "bg-green-50";
      case "info":
        return "bg-gray-50";
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center relative">
                <Bell className="w-5 h-5 text-white" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">
                  {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <button className="text-blue-600 hover:text-blue-700 text-sm">
                Mark all as read
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${getNotificationBg(
                notification.type,
                notification.read
              )} rounded-2xl shadow-sm border ${
                notification.read ? "border-gray-200" : "border-transparent"
              } p-5 hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-gray-900">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{notification.timestamp}</span>
                    {!notification.read && (
                      <button className="text-blue-600 hover:text-blue-700 text-xs">
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        )}

        {/* Emergency Contact Footer */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Emergency Services:</span>
                  <a href="tel:911" className="text-blue-600 hover:text-blue-700">
                    911
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Campus Security:</span>
                  <a href="tel:5551234567" className="text-blue-600 hover:text-blue-700">
                    (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Campus Health Center:</span>
                  <a href="tel:5551234568" className="text-blue-600 hover:text-blue-700">
                    (555) 123-4568
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
