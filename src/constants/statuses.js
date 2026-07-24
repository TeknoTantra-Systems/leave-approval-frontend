export const LEAVE_STATUSES = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  CLARIFICATION: "clarification",
  ESCALATED: "escalated",
  CANCELLED: "cancelled",
};

export const LEAVE_STATUS_LABELS = {
  [LEAVE_STATUSES.PENDING]: "Pending",
  [LEAVE_STATUSES.APPROVED]: "Approved",
  [LEAVE_STATUSES.REJECTED]: "Rejected",
  [LEAVE_STATUSES.CLARIFICATION]: "Clarification",
  [LEAVE_STATUSES.ESCALATED]: "Escalated",
  [LEAVE_STATUSES.CANCELLED]: "Cancelled",
};

export const LEAVE_STATUS_COLORS = {
  [LEAVE_STATUSES.PENDING]: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  [LEAVE_STATUSES.APPROVED]: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  [LEAVE_STATUSES.REJECTED]: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  [LEAVE_STATUSES.CLARIFICATION]: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  [LEAVE_STATUSES.ESCALATED]: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  [LEAVE_STATUSES.CANCELLED]: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
};

export const APPROVAL_STATUSES = {
  PENDING_MANAGER: "pending_manager",
  PENDING_HR: "pending_hr",
  PENDING_DIRECTOR: "pending_director",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const APPROVAL_STATUS_LABELS = {
  [APPROVAL_STATUSES.PENDING_MANAGER]: "Pending Manager",
  [APPROVAL_STATUSES.PENDING_HR]: "Pending HR",
  [APPROVAL_STATUSES.PENDING_DIRECTOR]: "Pending Director",
  [APPROVAL_STATUSES.APPROVED]: "Approved",
  [APPROVAL_STATUSES.REJECTED]: "Rejected",
};

export const NOTIFICATION_TYPES = {
  SUBMITTED: "submitted",
  APPROVED: "approved",
  REJECTED: "rejected",
  REMINDER: "reminder",
  ESCALATED: "escalated",
  CLARIFICATION: "clarification",
};

export const NOTIFICATION_TYPE_LABELS = {
  [NOTIFICATION_TYPES.SUBMITTED]: "Submitted",
  [NOTIFICATION_TYPES.APPROVED]: "Approved",
  [NOTIFICATION_TYPES.REJECTED]: "Rejected",
  [NOTIFICATION_TYPES.REMINDER]: "Reminder",
  [NOTIFICATION_TYPES.ESCALATED]: "Escalated",
  [NOTIFICATION_TYPES.CLARIFICATION]: "Clarification Request",
};
