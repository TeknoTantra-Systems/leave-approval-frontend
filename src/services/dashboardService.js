import api from "./api";
import { LEAVE_STATUSES } from "@/constants/statuses";
import { ROLES } from "@/constants/roles";
import { mapStatusFromBackend } from "@/utils/transformers";

function unwrapData(response) {
  const body = response.data;
  if (body?.data?.data) return body.data.data;
  if (body?.data && Array.isArray(body.data)) return body.data;
  if (Array.isArray(body)) return body;
  return body?.data ?? body ?? [];
}

async function fetchLeaveRequestsForStats() {
  try {
    const { data } = await api.get("/leave-requests/my");
    return unwrapData(data);
  } catch {
    return [];
  }
}

async function fetchPendingCount(endpoint) {
  try {
    const { data } = await api.get(endpoint);
    const raw = unwrapData(data);
    return Array.isArray(raw) ? raw.length : 0;
  } catch {
    return 0;
  }
}

async function fetchUsersCount() {
  try {
    const { data } = await api.get("/users");
    const raw = unwrapData(data);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function buildRecentActivity(leaveRequests) {
  return leaveRequests.slice(0, 10).map((r) => {
    const status = mapStatusFromBackend(r.status);
    let title;
    if (status === LEAVE_STATUSES.PENDING) title = "Leave Request Pending";
    else if (status === LEAVE_STATUSES.APPROVED) title = "Leave Request Approved";
    else if (status === LEAVE_STATUSES.REJECTED) title = "Leave Request Rejected";
    else if (status === LEAVE_STATUSES.CLARIFICATION) title = "Clarification Needed";
    else if (status === LEAVE_STATUSES.ESCALATED) title = "Leave Escalated";
    else title = `Leave Request ${r.status ?? "Unknown"}`;

    return {
      id: String(r.id),
      title,
      subtitle: `${r.fromDate} - ${r.toDate}`,
      status,
      date: r.createdAt,
    };
  });
}

export async function getDashboardStats(role) {
  if (role === ROLES.EMPLOYEE) {
    const requests = await fetchLeaveRequestsForStats();
    return {
      pendingRequests: requests.filter((r) =>
        [LEAVE_STATUSES.PENDING, LEAVE_STATUSES.ESCALATED, LEAVE_STATUSES.CLARIFICATION].includes(
          mapStatusFromBackend(r.status)
        )
      ).length,
      approved: requests.filter((r) => mapStatusFromBackend(r.status) === LEAVE_STATUSES.APPROVED).length,
      rejected: requests.filter((r) => mapStatusFromBackend(r.status) === LEAVE_STATUSES.REJECTED).length,
      leaveBalance: 18,
    };
  }

  if (role === ROLES.MANAGER) {
    const [pendingCount, requests] = await Promise.all([
      fetchPendingCount("/manager/pending"),
      fetchLeaveRequestsForStats(),
    ]);
    return {
      pendingApprovals: pendingCount,
      approvedThisMonth: requests.filter((r) => mapStatusFromBackend(r.status) === LEAVE_STATUSES.APPROVED).length,
      rejected: requests.filter((r) => mapStatusFromBackend(r.status) === LEAVE_STATUSES.REJECTED).length,
      escalations: requests.filter((r) => mapStatusFromBackend(r.status) === LEAVE_STATUSES.ESCALATED).length,
    };
  }

  if (role === ROLES.HR) {
    const [hrPendingCount, managerPendingCount] = await Promise.all([
      fetchPendingCount("/hr/pending"),
      fetchPendingCount("/manager/pending"),
    ]);
    return {
      pendingHRApprovals: hrPendingCount,
      processedToday: hrPendingCount,
      leaveBalanceUpdates: 0,
      pendingManagerApprovals: managerPendingCount,
    };
  }

  if (role === ROLES.DIRECTOR) {
    const [directorPending, hrPending] = await Promise.all([
      fetchPendingCount("/director/pending"),
      fetchPendingCount("/hr/pending"),
    ]);
    return {
      pendingDirectorApprovals: directorPending,
      approvedThisQuarter: 0,
      escalatedRequests: hrPending,
      totalRequests: directorPending + hrPending,
    };
  }

  if (role === ROLES.APP_ADMIN) {
    const users = await fetchUsersCount();
    const arr = Array.isArray(users) ? users : [];
    const roleCounts = arr.reduce(
      (acc, u) => {
        acc[u.role] = (acc[u.role] || 0) + 1;
        return acc;
      },
      {}
    );
    return {
      totalEmployees: arr.length,
      totalManagers: roleCounts[ROLES.MANAGER] || 0,
      totalHR: roleCounts[ROLES.HR] || 0,
      totalDirectors: roleCounts[ROLES.DIRECTOR] || 0,
      pendingLeaveRequests: 0,
      approvedRequests: 0,
      rejectedRequests: 0,
      activeUsers: arr.length,
    };
  }

  return {};
}

export async function getRecentActivity(role) {
  try {
    if (role === ROLES.EMPLOYEE || role === ROLES.MANAGER) {
      const requests = await fetchLeaveRequestsForStats();
      return buildRecentActivity(requests);
    }
  } catch {
    // Fall through
  }
  return [];
}

export async function getLeaveBalance() {
  return {
    annual: { total: 20, used: 8, pending: 3 },
    sick: { total: 10, used: 2, pending: 0 },
    personal: { total: 5, used: 1, pending: 0 },
  };
}
