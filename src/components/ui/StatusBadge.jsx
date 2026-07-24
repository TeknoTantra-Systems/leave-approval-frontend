import { LEAVE_STATUS_LABELS, LEAVE_STATUS_COLORS } from "@/constants/statuses";
import { ROLE_LABELS, ROLE_COLORS } from "@/constants/roles";
import { capitalize } from "@/utils/formatters";

export default function StatusBadge({ status, type = "leave", className = "" }) {
  let label;
  let colorClasses;

  if (type === "role") {
    label = ROLE_LABELS[status] ?? capitalize(status);
    colorClasses = ROLE_COLORS[status] ?? "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
  } else {
    label = LEAVE_STATUS_LABELS[status] ?? capitalize(status);
    colorClasses = LEAVE_STATUS_COLORS[status] ?? "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
}
