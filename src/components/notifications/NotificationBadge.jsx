import { NOTIFICATION_TYPE_DOT_COLORS, NOTIFICATION_TYPE_LABELS } from "@/constants/statuses";
import { capitalize } from "@/utils/formatters";

export default function NotificationBadge({ count = 0, className = "" }) {
  if (count <= 0) return null;

  return (
    <span
      className={`absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ${className}`}
      aria-label={`${count} unread notification${count === 1 ? "" : "s"}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function NotificationDot({ type, className = "" }) {
  const dotColor = NOTIFICATION_TYPE_DOT_COLORS[type] ?? "bg-slate-500";
  return (
    <span
      className={`inline-block h-2 w-2 shrink-0 rounded-full ${dotColor} ${className}`}
      aria-label={NOTIFICATION_TYPE_LABELS[type] ?? capitalize(type)}
    />
  );
}
