import { NOTIFICATION_TYPES } from "@/constants/statuses";

const now = Date.now();
const mins = (n) => new Date(now - n * 60000).toISOString();
const hours = (n) => new Date(now - n * 3600000).toISOString();
const days = (n) => new Date(now - n * 86400000).toISOString();

let nextId = 100;

export const MOCK_NOTIFICATIONS = [
  {
    id: "N001",
    userId: "1",
    type: NOTIFICATION_TYPES.SUBMITTED,
    title: "Leave Request Submitted",
    message: "Your leave request LR005 for 5 days has been submitted and is pending manager approval.",
    relatedLeaveId: "LR005",
    isRead: false,
    createdAt: mins(15),
  },
  {
    id: "N002",
    userId: "1",
    type: NOTIFICATION_TYPES.REMINDER,
    title: "Approval Pending",
    message: "Your leave request LR005 is still awaiting manager approval. You may follow up with your manager.",
    relatedLeaveId: "LR005",
    isRead: false,
    createdAt: hours(2),
  },
  {
    id: "N003",
    userId: "1",
    type: NOTIFICATION_TYPES.BALANCE_UPDATED,
    title: "Leave Balance Updated",
    message: "Your annual leave balance has been updated. You now have 12 days remaining.",
    relatedLeaveId: null,
    isRead: false,
    createdAt: hours(5),
  },
  {
    id: "N004",
    userId: "1",
    type: NOTIFICATION_TYPES.APPROVED,
    title: "Leave Request Approved",
    message: "Your sick leave request LR002 for 2 days has been approved by your manager.",
    relatedLeaveId: "LR002",
    isRead: true,
    createdAt: days(1),
  },
  {
    id: "N005",
    userId: "1",
    type: NOTIFICATION_TYPES.REJECTED,
    title: "Leave Request Rejected",
    message: "Your personal leave request LR003 has been rejected. Reason: Too many pending tasks.",
    relatedLeaveId: "LR003",
    isRead: true,
    createdAt: days(3),
  },
  {
    id: "N006",
    userId: "2",
    type: NOTIFICATION_TYPES.SUBMITTED,
    title: "Leave Request Submitted",
    message: "Amit Kumar has submitted a leave request LR001 for 5 days (Annual Leave).",
    relatedLeaveId: "LR001",
    isRead: false,
    createdAt: mins(45),
  },
  {
    id: "N007",
    userId: "2",
    type: NOTIFICATION_TYPES.ESCALATED,
    title: "Leave Escalated to HR",
    message: "Deepa Nair's leave request LR004 (11 days) has been escalated to HR after your approval.",
    relatedLeaveId: "LR004",
    isRead: false,
    createdAt: hours(3),
  },
  {
    id: "N008",
    userId: "2",
    type: NOTIFICATION_TYPES.CLARIFICATION,
    title: "Clarification Needed",
    message: "Ananya Das's leave request LR008 requires clarification. Please review and respond.",
    relatedLeaveId: "LR008",
    isRead: true,
    createdAt: hours(8),
  },
  {
    id: "N009",
    userId: "2",
    type: NOTIFICATION_TYPES.BALANCE_UPDATED,
    title: "Team Leave Balance Alert",
    message: "Engineering team annual leave utilization has exceeded 75% for this quarter.",
    relatedLeaveId: null,
    isRead: true,
    createdAt: days(1),
  },
  {
    id: "N010",
    userId: "3",
    type: NOTIFICATION_TYPES.ESCALATED,
    title: "Leave Escalated to HR",
    message: "Deepa Nair's leave request LR004 (11 days) has been escalated for your review.",
    relatedLeaveId: "LR004",
    isRead: false,
    createdAt: hours(4),
  },
  {
    id: "N011",
    userId: "3",
    type: NOTIFICATION_TYPES.ESCALATED,
    title: "Leave Escalated to HR",
    message: "Sanjay Mehta's leave request LR009 (8 days) has been escalated for your review.",
    relatedLeaveId: "LR009",
    isRead: false,
    createdAt: hours(6),
  },
  {
    id: "N012",
    userId: "3",
    type: NOTIFICATION_TYPES.APPROVED,
    title: "Leave Approved",
    message: "You approved Kavitha Menon's maternity leave request LR006.",
    relatedLeaveId: "LR006",
    isRead: true,
    createdAt: days(2),
  },
  {
    id: "N013",
    userId: "3",
    type: NOTIFICATION_TYPES.CLARIFICATION,
    title: "Clarification Requested",
    message: "You requested clarification on Priya Kapoor's leave request LR010.",
    relatedLeaveId: "LR010",
    isRead: true,
    createdAt: days(3),
  },
  {
    id: "N014",
    userId: "4",
    type: NOTIFICATION_TYPES.ESCALATED,
    title: "Leave Escalated to Director",
    message: "Vikram Singh's leave request LR007 (26 days) has been escalated for your final approval.",
    relatedLeaveId: "LR007",
    isRead: false,
    createdAt: hours(7),
  },
  {
    id: "N015",
    userId: "4",
    type: NOTIFICATION_TYPES.BALANCE_UPDATED,
    title: "Leave Balance Updated",
    message: "Company-wide leave policy has been updated. Please review the revised leave entitlements.",
    relatedLeaveId: null,
    isRead: true,
    createdAt: days(5),
  },
];

export async function fetchNotifications(userId) {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_NOTIFICATIONS.filter((n) => n.userId === userId).map((n) => ({ ...n }));
}

export async function markNotificationAsRead(id) {
  await new Promise((r) => setTimeout(r, 150));
  const n = MOCK_NOTIFICATIONS.find((n) => n.id === id);
  if (!n) throw new Error("Notification not found");
  n.isRead = true;
  return { ...n };
}

export async function markAllNotificationsAsRead(userId) {
  await new Promise((r) => setTimeout(r, 200));
  MOCK_NOTIFICATIONS.filter((n) => n.userId === userId && !n.isRead).forEach((n) => {
    n.isRead = true;
  });
  return true;
}

export async function deleteNotification(id) {
  await new Promise((r) => setTimeout(r, 150));
  const idx = MOCK_NOTIFICATIONS.findIndex((n) => n.id === id);
  if (idx === -1) throw new Error("Notification not found");
  MOCK_NOTIFICATIONS.splice(idx, 1);
  return true;
}

export async function createNotification(data) {
  await new Promise((r) => setTimeout(r, 200));
  nextId += 1;
  const notification = {
    id: `N${String(nextId).padStart(3, "0")}`,
    ...data,
    isRead: false,
    createdAt: new Date().toISOString(),
  };
  MOCK_NOTIFICATIONS.unshift(notification);
  return { ...notification };
}
