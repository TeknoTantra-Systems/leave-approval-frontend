import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/common";
import { Card, StatusBadge, EmptyState } from "@/components/ui";
import { LEAVE_TYPE_LABELS } from "@/constants/leaveTypes";
import { ROUTES } from "@/constants/routes";
import { formatDate, formatDateTime } from "@/utils/dateHelpers";
import { getLeaveRequestById } from "@/services/leaveService";
import { HiOutlineArrowLeft, HiOutlineDocumentText, HiCheckCircle, HiXCircle, HiClock, HiExclamationTriangle } from "react-icons/hi2";

const TIMELINE_ICONS = {
  Applied: HiClock,
  "Manager Approved": HiCheckCircle,
  "Manager Rejected": HiXCircle,
  "HR Approved": HiCheckCircle,
  "HR Rejected": HiXCircle,
  "Director Approved": HiCheckCircle,
  "Director Rejected": HiXCircle,
  "Escalated to HR": HiExclamationTriangle,
  "Escalated to Director": HiExclamationTriangle,
};

const TIMELINE_COLORS = {
  Applied: "text-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400",
  "Manager Approved": "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Manager Rejected": "text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
  "HR Approved": "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
  "HR Rejected": "text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
  "Director Approved": "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Director Rejected": "text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400",
  "Escalated to HR": "text-amber-500 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
  "Escalated to Director": "text-amber-500 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400",
};

function DecisionCard({ title, name, decision, remarks, date }) {
  if (!decision) return null;
  return (
    <Card padding="p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </h4>
        <StatusBadge status={decision === "approved" ? "approved" : "rejected"} />
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        By: <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
      </p>
      {remarks && (
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Remarks: {remarks}
        </p>
      )}
      {date && (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {formatDateTime(date)}
        </p>
      )}
    </Card>
  );
}

export default function LeaveDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const data = await getLeaveRequestById(id);
      setRequest(data);
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="space-y-6">
        <Link
          to={ROUTES.LEAVE_HISTORY}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to Leave History
        </Link>
        <Card>
          <EmptyState
            icon={HiOutlineDocumentText}
            title="Leave request not found"
            description={`No leave request found with ID #${id}.`}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to={ROUTES.LEAVE_HISTORY}
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <PageHeader
          title={`Leave Request ${request.id}`}
          description={`Applied on ${formatDate(request.appliedOn)}`}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Current Status:
        </span>
        <StatusBadge status={request.status} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card padding="p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Leave Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Employee</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {request.employeeName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Employee ID</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {request.employeeId}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Department</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {request.department}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Leave Type</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {LEAVE_TYPE_LABELS[request.leaveType] ?? request.leaveType}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Start Date</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {formatDate(request.startDate)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">End Date</p>
                <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                  {formatDate(request.endDate)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Days</p>
                <p className="mt-0.5 text-sm font-bold text-slate-700 dark:text-slate-200">
                  {request.totalDays}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Reason</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {request.reason}
              </p>
            </div>
          </Card>

          <Card padding="p-6">
            <h3 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Approval Timeline
            </h3>
            <div className="relative ml-2 border-l-2 border-slate-200 pl-6 dark:border-slate-700">
              {request.timeline.map((event, index) => {
                const Icon = TIMELINE_ICONS[event.action] ?? HiClock;
                const colorClass = TIMELINE_COLORS[event.action] ?? "text-slate-500 bg-slate-50 dark:bg-slate-700 dark:text-slate-400";
                return (
                  <div key={index} className="relative mb-6 last:mb-0">
                    <div className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full ${colorClass}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {event.action}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        by {event.by} &middot; {formatDateTime(event.date)}
                      </p>
                      {event.remarks && (
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {event.remarks}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <DecisionCard
            title="Manager Decision"
            name={request.managerName}
            decision={request.managerDecision}
            remarks={request.managerRemarks}
            date={request.managerDecidedOn}
          />
          {request.totalDays > 3 && (
            <DecisionCard
              title="HR Decision"
              name={request.hrDecision ? "Anjali Gupta" : null}
              decision={request.hrDecision}
              remarks={request.hrRemarks}
              date={request.hrDecidedOn}
            />
          )}
          {request.totalDays > 10 && (
            <DecisionCard
              title="Director Decision"
              name={request.directorDecision ? "Vikram Singh" : null}
              decision={request.directorDecision}
              remarks={request.directorRemarks}
              date={request.directorDecidedOn}
            />
          )}

          {request.totalDays > 3 && !request.hrDecision && request.status !== "rejected" && (
            <Card padding="p-4">
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <HiExclamationTriangle className="h-4 w-4 shrink-0" />
                Awaiting HR approval
              </div>
            </Card>
          )}
          {request.totalDays > 10 && !request.directorDecision && request.hrDecision === "approved" && (
            <Card padding="p-4">
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <HiExclamationTriangle className="h-4 w-4 shrink-0" />
                Awaiting Director approval
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
