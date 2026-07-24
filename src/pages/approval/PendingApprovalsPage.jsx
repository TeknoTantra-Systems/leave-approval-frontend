import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function PendingApprovalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Pending Approvals
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Review and act on pending leave requests
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
            <HiOutlineClipboardDocumentList className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Pending approvals will be listed here
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Review, approve, or reject leave requests assigned to you.
          </p>
        </div>
      </div>
    </div>
  );
}
