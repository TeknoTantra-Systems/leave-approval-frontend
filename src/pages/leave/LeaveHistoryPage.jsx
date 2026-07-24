import { HiOutlineClock } from "react-icons/hi2";

export default function LeaveHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Leave History
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          View all your past leave requests
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
            <HiOutlineClock className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Leave history table will be implemented here
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            A searchable and filterable table showing all your past and current leave requests.
          </p>
        </div>
      </div>
    </div>
  );
}
