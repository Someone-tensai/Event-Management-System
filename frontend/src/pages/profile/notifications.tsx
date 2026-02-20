import { Bell } from "lucide-react";

export function NotificationsPage() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Notifications
      </h2>

      <div className="text-center py-12">
        <Bell className="size-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No notifications
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          You're all caught up!
        </p>
      </div>
    </div>
  );
}
