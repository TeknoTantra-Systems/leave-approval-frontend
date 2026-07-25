import {
  fetchAllUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  deactivateUser,
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  fetchLeaveTypes,
  createLeaveType,
  updateLeaveType,
  deleteLeaveType,
  fetchApprovalMatrix,
  updateApprovalMatrix,
  fetchAdminLeaveRequests,
  fetchSystemActivity,
} from "./mock/adminMock";

export async function getAllUsers() {
  return fetchAllUsers();
}

export async function getUserById(id) {
  return fetchUserById(id);
}

export async function createNewUser(data) {
  return createUser(data);
}

export async function updateExistingUser(id, data) {
  return updateUser(id, data);
}

export async function removeUser(id) {
  return deleteUser(id);
}

export async function toggleUserStatus(id) {
  return deactivateUser(id);
}

export async function getDepartments() {
  return fetchDepartments();
}

export async function createNewDepartment(data) {
  return createDepartment(data);
}

export async function updateExistingDepartment(id, data) {
  return updateDepartment(id, data);
}

export async function removeDepartment(id) {
  return deleteDepartment(id);
}

export async function getLeaveTypes() {
  return fetchLeaveTypes();
}

export async function createNewLeaveType(data) {
  return createLeaveType(data);
}

export async function updateExistingLeaveType(id, data) {
  return updateLeaveType(id, data);
}

export async function removeLeaveType(id) {
  return deleteLeaveType(id);
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
