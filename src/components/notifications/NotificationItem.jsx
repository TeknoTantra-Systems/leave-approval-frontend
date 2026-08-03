import { NOTIFICATION_ICON_MAP, NOTIFICATION_ICON_BG, NOTIFICATION_ICON_COLOR, FALLBACK_ICON } from "./notificationIcons";
import NotificationTypeBadge from "./NotificationTypeBadge";
import { formatRelativeTime } from "@/utils/dateHelpers";
import Button from "@/components/ui/Button";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi2";

export default function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
  isRead,
}) {
  const Icon = NOTIFICATION_ICON_MAP[notification.type] ?? FALLBACK_ICON;
  const iconBg = NOTIFICATION_ICON_BG[notification.type] ?? "bg-blue-50 dark:bg-blue-900/20";
  const iconColor = NOTIFICATION_ICON_COLOR[notification.type] ?? "text-blue-600 dark:text-blue-400";

  return (
    <div
      className={`group flex items-start gap-3 border-b border-slate-100 px-5 py-4 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/20 ${
        !isRead ? "bg-blue-50/50 dark:bg-blue-900/10" : ""
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
          <NotificationTypeBadge type={notification.type} className="hidden sm:inline-flex" />
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {notification.message}
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
        {!isRead && (
          <Button
            variant="ghost"
            size="sm"
            icon={HiOutlineEye}
            onClick={() => onMarkRead(notification.id)}
            className="px-2 py-1.5"
            aria-label="Mark as read"
          />
        )}
        <Button
          variant="ghost"
          size="sm"
          icon={HiOutlineTrash}
          onClick={() => onDelete(notification.id)}
          className="px-2 py-1.5 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
          aria-label="Delete notification"
        />
      </div>
    </div>
  );
}
