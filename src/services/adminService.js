import api from "./api";
import {
  fetchApprovalMatrix,
  updateApprovalMatrix,
  fetchAdminLeaveRequests,
  fetchSystemActivity,
} from "./mock/adminMock";

export async function getAllUsers() {
  const { data } = await api.get("/users");
  return data.data;
}

export async function getUserById(id) {
  const { data } = await api.get(`/users/${id}`);
  return data.data;
}

export async function createNewUser(userData) {
  const { data } = await api.post("/users", userData);
  return data.data;
}

export async function updateExistingUser(id, userData) {
  const { data } = await api.put(`/users/${id}`, userData);
  return data.data;
}

export async function removeUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data.data;
}

export async function toggleUserStatus(id) {
  const { data } = await api.put(`/users/${id}/toggle-status`);
  return data.data;
}

export async function getDepartments() {
  const { data } = await api.get("/departments");
  return data.data;
}

export async function createNewDepartment(departmentData) {
  const { data } = await api.post("/departments", departmentData);
  return data.data;
}

export async function updateExistingDepartment(id, departmentData) {
  const { data } = await api.put(`/departments/${id}`, departmentData);
  return data.data;
}

export async function removeDepartment(id) {
  const { data } = await api.delete(`/departments/${id}`);
  return data.data;
}

export async function getLeaveTypes() {
  const { data } = await api.get("/leave-types");
  return data.data;
}

export async function createNewLeaveType(leaveTypeData) {
  const { data } = await api.post("/leave-types", leaveTypeData);
  return data.data;
}

export async function updateExistingLeaveType(id, leaveTypeData) {
  const { data } = await api.put(`/leave-types/${id}`, leaveTypeData);
  return data.data;
}

export async function removeLeaveType(id) {
  const { data } = await api.delete(`/leave-types/${id}`);
  return data.data;
}

export async function getApprovalMatrix() {
  return fetchApprovalMatrix();
}

export async function updateMatrix(matrix) {
  return updateApprovalMatrix(matrix);
}

export async function getAdminLeaveRequests() {
  return fetchAdminLeaveRequests();
}

export async function getSystemActivity() {
  return fetchSystemActivity();
}
