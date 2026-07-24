import { NOTIFICATION_TYPE_COLORS, NOTIFICATION_TYPE_DOT_COLORS } from "@/constants/statuses";
import { NOTIFICATION_TYPE_LABELS } from "@/constants/statuses";
import { capitalize } from "@/utils/formatters";

export default function NotificationTypeBadge({ type, variant = "badge", className = "" }) {
  const label = NOTIFICATION_TYPE_LABELS[type] ?? capitalize(type);
  const colorClasses = NOTIFICATION_TYPE_COLORS[type] ?? "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400";
  const dotColor = NOTIFICATION_TYPE_DOT_COLORS[type] ?? "bg-slate-500";

  if (variant === "dot") {
    return (
      <span className={`inline-block h-2 w-2 rounded-full ${dotColor} ${className}`} aria-hidden="true" />
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
}
