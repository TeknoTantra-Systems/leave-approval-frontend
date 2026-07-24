import { HiOutlineDocumentText } from "react-icons/hi2";

export default function ApplyLeavePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Apply for Leave
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Submit a new leave request
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
            <HiOutlineDocumentText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Form will be implemented in Phase 6
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            The leave application form will allow you to select leave type, dates, and provide a reason.
          </p>
        </div>
      </div>
    </div>
  );
}
