import {
  fetchLeaveRequests,
  fetchLeaveRequestById,
  fetchLeaveBalance,
  submitLeaveRequest,
  fetchPendingApprovals,
  updateDecision,
  requestClarification,
} from "./mock/leaveMock";

export async function getLeaveRequests() {
  return fetchLeaveRequests();
}

export async function getLeaveRequestById(id) {
  return fetchLeaveRequestById(id);
}

export async function getMyLeaveRequests(employeeId) {
  const all = await fetchLeaveRequests();
  return all.filter((r) => r.employeeId === employeeId);
}

export async function submitNewLeaveRequest(data) {
  return submitLeaveRequest(data);
}

export async function getLeaveBalance(employeeId) {
  void employeeId;
  return fetchLeaveBalance();
}

export async function getPendingApprovalsForRole(role) {
  return fetchPendingApprovals(role);
}

export async function approveLeaveRequest(id, role, remarks) {
  return updateDecision(id, role, "approved", remarks);
}

export async function rejectLeaveRequest(id, role, remarks) {
  return updateDecision(id, role, "rejected", remarks);
}

export async function requestClarificationOnLeave(id, role, remarks) {
  return requestClarification(id, role, remarks);
}
