import { NOTIFICATION_ICON_MAP, NOTIFICATION_ICON_BG, NOTIFICATION_ICON_COLOR, FALLBACK_ICON } from "./notificationIcons";
import NotificationTypeBadge from "./NotificationTypeBadge";
import { formatRelativeTime } from "@/utils/dateHelpers";
import { HiOutlineTrash } from "react-icons/hi2";

export default function NotificationCard({ notification, onMarkRead, onDelete, isRead }) {
  const Icon = NOTIFICATION_ICON_MAP[notification.type] ?? FALLBACK_ICON;
  const iconBg = NOTIFICATION_ICON_BG[notification.type] ?? "bg-blue-50 dark:bg-blue-900/20";
  const iconColor = NOTIFICATION_ICON_COLOR[notification.type] ?? "text-blue-600 dark:text-blue-400";

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
        !isRead
          ? "border-blue-200 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-900/10"
          : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      }`}
    >
      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {!isRead && (
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" aria-label="Unread" />
          )}
          <h4 className={`text-sm ${!isRead ? "font-semibold text-slate-800 dark:text-white" : "font-medium text-slate-700 dark:text-slate-200"}`}>
            {notification.title}
          </h4>
        </div>
        <NotificationTypeBadge type={notification.type} className="mt-1" />
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {notification.message}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {formatRelativeTime(notification.createdAt)}
          </p>
          <div className="flex items-center gap-2">
            {!isRead && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                Mark read
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
              aria-label="Delete notification"
            >
              <HiOutlineTrash className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
