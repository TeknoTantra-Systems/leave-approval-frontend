import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatRelativeTime } from "@/utils/dateHelpers";

export default function RecentActivity({ items = [], title = "Recent Activity", viewAllPath }) {
  return (
    <Card padding="p-0">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h3>
        {viewAllPath && (
          <Link
            to={viewAllPath}
            className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View All
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          No recent activity
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between px-5 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                  {item.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                  {item.subtitle}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-3">
                <StatusBadge status={item.status} />
                <span className="whitespace-nowrap text-xs text-slate-400 dark:text-slate-500">
                  {formatRelativeTime(item.date)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
