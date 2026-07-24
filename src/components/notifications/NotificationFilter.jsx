import { NOTIFICATION_TYPES, NOTIFICATION_TYPE_LABELS } from "@/constants/statuses";

const TYPE_FILTER_OPTIONS = [
  { value: "", label: "All Types" },
  ...Object.values(NOTIFICATION_TYPES).map((t) => ({
    value: t,
    label: NOTIFICATION_TYPE_LABELS[t] ?? t,
  })),
];

const READ_FILTER_OPTIONS = [
  { value: "", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "read", label: "Read" },
];

export default function NotificationFilter({
  typeFilter,
  onTypeFilterChange,
  readFilter,
  onReadFilterChange,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <select
        value={typeFilter}
        onChange={(e) => onTypeFilterChange(e.target.value)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        aria-label="Filter by notification type"
      >
        {TYPE_FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex rounded-lg border border-slate-200 dark:border-slate-600">
        {READ_FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onReadFilterChange(opt.value)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              readFilter === opt.value
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            } first:rounded-l-lg last:rounded-r-lg`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
