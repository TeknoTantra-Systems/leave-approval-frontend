import { MOCK_RECENT_ACTIVITIES, MOCK_LEAVE_REQUESTS, MOCK_LEAVE_BALANCE, MOCK_DASHBOARD_STATS } from "./mock/dashboardMock";

export async function getDashboardStats(role) {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_DASHBOARD_STATS[role] ?? {};
}

export async function getRecentActivity(role) {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_RECENT_ACTIVITIES[role] ?? [];
}

export async function getLeaveRequests() {
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_LEAVE_REQUESTS];
}

export async function getLeaveRequestById(id) {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_LEAVE_REQUESTS.find((r) => r.id === id) ?? null;
}

export async function getLeaveBalance(role) {
  await new Promise((r) => setTimeout(r, 200));
  return MOCK_LEAVE_BALANCE[role] ?? {};
}
