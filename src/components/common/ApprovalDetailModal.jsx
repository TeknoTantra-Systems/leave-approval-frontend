import Modal from "@/components/ui/Modal";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import { LEAVE_TYPE_LABELS } from "@/constants/leaveTypes";
import { formatDate, formatDateTime } from "@/utils/dateHelpers";
import { HiCheckCircle, HiXCircle, HiChatBubbleLeftEllipsis } from "react-icons/hi2";

export default function ApprovalDetailModal({
  isOpen,
  onClose,
  request,
  role,
  onApprove,
  onReject,
  onClarify,
  isLoading,
}) {
  if (!request) return null;

  const canAct =
    request.status !== "approved" &&
    request.status !== "rejected";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Request ${request.id}`} maxWidth="max-w-2xl">
      <div className="max-h-[70vh] space-y-5 overflow-y-auto">
        <div className="flex items-center gap-3">
          <StatusBadge status={request.status} />
          {request.totalDays > 3 && role === "manager" && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Will escalate to HR after approval
            </span>
          )}
          {request.totalDays > 10 && role === "hr" && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Will escalate to Director after approval
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Employee</p>
            <p className="font-medium text-slate-700 dark:text-slate-200">{request.employeeName}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Employee ID</p>
            <p className="font-medium text-slate-700 dark:text-slate-200">{request.employeeId}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Department</p>
            <p className="font-medium text-slate-700 dark:text-slate-200">{request.department}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Leave Type</p>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {LEAVE_TYPE_LABELS[request.leaveType] ?? request.leaveType}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Duration</p>
            <p className="font-medium text-slate-700 dark:text-slate-200">
              {formatDate(request.startDate)} - {formatDate(request.endDate)}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Days</p>
            <p className="font-bold text-slate-700 dark:text-slate-200">{request.totalDays}</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Reason</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{request.reason}</p>
        </div>

        {request.timeline.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Timeline</p>
            <div className="relative ml-1 border-l-2 border-slate-200 pl-4 dark:border-slate-700">
              {request.timeline.map((event, i) => (
                <div key={i} className="relative mb-3 last:mb-0">
                  <div className="absolute -left-[21px] top-0.5 h-2.5 w-2.5 rounded-full border-2 border-blue-500 bg-white dark:bg-slate-800" />
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    {event.action}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {event.by} &middot; {formatDateTime(event.date)}
                  </p>
                  {event.remarks && (
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      {event.remarks}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {canAct && (
          <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
            <Button
              variant="primary"
              size="sm"
              icon={HiCheckCircle}
              onClick={() => onApprove(request)}
              isLoading={isLoading}
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              icon={HiXCircle}
              onClick={() => onReject(request)}
              isLoading={isLoading}
            >
              Reject
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={HiChatBubbleLeftEllipsis}
              onClick={() => onClarify(request)}
              isLoading={isLoading}
            >
              Request Clarification
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
