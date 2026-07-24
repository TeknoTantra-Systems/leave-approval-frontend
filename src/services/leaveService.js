import {
  fetchLeaveRequests,
  fetchLeaveRequestById,
  fetchLeaveBalance,
  submitLeaveRequest,
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
