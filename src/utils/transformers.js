import { LEAVE_STATUSES } from "@/constants/statuses";

const STATUS_BACKEND_TO_FRONTEND = {
  PENDING: LEAVE_STATUSES.PENDING,
  PENDING_REVIEW: LEAVE_STATUSES.PENDING,
  CLARIFICATION_REQUIRED: LEAVE_STATUSES.CLARIFICATION,
  PENDING_DIRECTOR: LEAVE_STATUSES.ESCALATED,
  APPROVED: LEAVE_STATUSES.APPROVED,
  REJECTED: LEAVE_STATUSES.REJECTED,
  WITHDRAWN: LEAVE_STATUSES.CANCELLED,
};

const STATUS_FRONTEND_TO_BACKEND = {
  [LEAVE_STATUSES.PENDING]: "PENDING",
  [LEAVE_STATUSES.APPROVED]: "APPROVED",
  [LEAVE_STATUSES.REJECTED]: "REJECTED",
  [LEAVE_STATUSES.CLARIFICATION]: "CLARIFICATION_REQUIRED",
  [LEAVE_STATUSES.ESCALATED]: "PENDING_DIRECTOR",
  [LEAVE_STATUSES.CANCELLED]: "WITHDRAWN",
};

const ACTION_FRONTEND_TO_BACKEND = {
  approved: "APPROVE",
  rejected: "REJECT",
  clarify: "REQUEST_CLARIFICATION",
};

export function mapStatusFromBackend(status) {
  return STATUS_BACKEND_TO_FRONTEND[status] ?? status?.toLowerCase() ?? "";
}

export function mapStatusToBackend(status) {
  return STATUS_FRONTEND_TO_BACKEND[status] ?? status?.toUpperCase() ?? "";
}

export function mapActionToBackend(action) {
  return ACTION_FRONTEND_TO_BACKEND[action] ?? action?.toUpperCase() ?? "";
}

export function mapBackendLeaveRequest(backend, { usersMap = {}, leaveTypesMap = {} } = {}) {
  const user = usersMap[backend.userId] ?? {};
  const leaveTypeValue = leaveTypesMap[backend.leaveTypeId] ?? "";

  return {
    id: String(backend.id),
    employeeName: user.name ?? "",
    employeeId: user.employeeId ?? "",
    department: typeof user.department === "object" ? user.department?.name : (user.department ?? ""),
    leaveType: leaveTypeValue,
    startDate: backend.fromDate,
    endDate: backend.toDate,
    totalDays: backend.totalDays,
    reason: backend.reason,
    status: mapStatusFromBackend(backend.status),
    appliedOn: backend.createdAt,
    managerId: backend.managerId,
    leaveTypeId: backend.leaveTypeId,
    userId: backend.userId,
    attachment: backend.attachment,
    timeline: [{ action: "Applied", by: user.name ?? "Unknown", date: backend.createdAt, remarks: "" }],
  };
}

export function mapBackendLeaveWithHistory(backend, history = [], { usersMap = {}, leaveTypesMap = {} } = {}) {
  const base = mapBackendLeaveRequest(backend, { usersMap, leaveTypesMap });
  const timeline = mapApprovalHistoryToTimeline(history, usersMap);

  const managerEvent = timeline.find((e) => e.action.startsWith("Manager"));
  const hrEvent = timeline.find((e) => e.action.startsWith("HR"));
  const directorEvent = timeline.find((e) => e.action.startsWith("Director"));

  return {
    ...base,
    managerName: managerEvent?.by ?? null,
    managerDecision: managerEvent?.action.includes("Approved") ? "approved" : managerEvent?.action.includes("Rejected") ? "rejected" : null,
    managerRemarks: managerEvent?.remarks ?? null,
    managerDecidedOn: managerEvent?.date ?? null,
    hrDecision: hrEvent?.action.includes("Approved") ? "approved" : hrEvent?.action.includes("Rejected") ? "rejected" : null,
    hrRemarks: hrEvent?.remarks ?? null,
    hrDecidedOn: hrEvent?.date ?? null,
    directorDecision: directorEvent?.action.includes("Approved") ? "approved" : directorEvent?.action.includes("Rejected") ? "rejected" : null,
    directorRemarks: directorEvent?.remarks ?? null,
    directorDecidedOn: directorEvent?.date ?? null,
    timeline,
  };
}

export function mapApprovalHistoryToTimeline(history = [], usersMap = {}) {
  return history.map((entry) => {
    const actedByUser = entry.actedByUser ?? usersMap[entry.actionBy] ?? {};
    let actionLabel = entry.action;

    if (entry.action === "SUBMITTED") actionLabel = "Applied";
    else if (entry.action === "APPROVED" && entry.newStatus === "PENDING_REVIEW") actionLabel = "Manager Approved";
    else if (entry.action === "APPROVED" && entry.newStatus === "PENDING_DIRECTOR") actionLabel = "HR Approved";
    else if (entry.action === "APPROVED" && entry.newStatus === "APPROVED") actionLabel = "Approved";
    else if (entry.action === "REJECTED") actionLabel = entry.previousStatus === "PENDING" ? "Manager Rejected" : "Rejected";
    else if (entry.action === "REQUEST_CLARIFICATION") actionLabel = "Clarification Requested";
    else if (entry.action === "CLARIFICATION_RESPONSE") actionLabel = "Clarification Submitted";
    else if (entry.action === "WITHDRAWN") actionLabel = "Withdrawn";
    else if (entry.action === "ESCALATED") actionLabel = `Escalated to ${entry.newStatus === "PENDING_DIRECTOR" ? "Director" : "HR"}`;

    return {
      action: actionLabel,
      by: actedByUser.name ?? "System",
      date: entry.createdAt,
      remarks: entry.comments ?? "",
    };
  });
}

export function mapBackendNotification(notif) {
  return {
    id: String(notif.id),
    title: notif.title,
    message: notif.message,
    type: notif.type?.toLowerCase() ?? "",
    isRead: notif.isRead,
    createdAt: notif.createdAt,
    relatedLeaveRequestId: notif.relatedLeaveRequestId,
  };
}

export function mapFrontendLeaveToBackend(data, leaveTypesList = []) {
  const typeEntry = leaveTypesList.find((lt) => lt.value === data.leaveType);
  return {
    leaveTypeId: typeEntry?.id ?? typeEntry?.backendId ?? data.leaveTypeId,
    fromDate: data.startDate,
    toDate: data.endDate,
    reason: data.reason,
  };
}
