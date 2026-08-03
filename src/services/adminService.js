import api from "./api";

const DEFAULT_APPROVAL_MATRIX = [
  { id: "AM001", maxDays: 3, approvers: ["manager"], description: "Leave requests up to 3 days" },
  { id: "AM002", maxDays: 10, approvers: ["manager", "hr"], description: "Leave requests 4-10 days" },
  { id: "AM003", maxDays: null, approvers: ["manager", "hr", "director"], description: "Leave requests over 10 days" },
];

function unwrapData(response) {
  const body = response.data;
  if (body?.data?.data) return body.data.data;
  if (body?.data && Array.isArray(body.data)) return body.data;
  if (Array.isArray(body)) return body;
  return body?.data ?? body ?? [];
}

export async function getAllUsers() {
  const { data } = await api.get("/users");
  const raw = unwrapData(data);
  return Array.isArray(raw) ? raw : [];
}

export async function getUserById(id) {
  const { data } = await api.get(`/users/${id}`);
  return data.data ?? data;
}

export async function createNewUser(userData) {
  const { data } = await api.post("/users", userData);
  return data.data ?? data;
}

export async function updateExistingUser(id, userData) {
  const { data } = await api.put(`/users/${id}`, userData);
  return data.data ?? data;
}

export async function removeUser(id) {
  const { data } = await api.delete(`/users/${id}`);
  return data.data ?? data;
}

export async function toggleUserStatus(id) {
  return removeUser(id);
}

export async function getDepartments() {
  const { data } = await api.get("/departments");
  const raw = unwrapData(data);
  return Array.isArray(raw) ? raw : [];
}

export async function createNewDepartment(departmentData) {
  const { data } = await api.post("/departments", departmentData);
  return data.data ?? data;
}

export async function updateExistingDepartment(id, departmentData) {
  const { data } = await api.put(`/departments/${id}`, departmentData);
  return data.data ?? data;
}

export async function removeDepartment(id) {
  const { data } = await api.delete(`/departments/${id}`);
  return data.data ?? data;
}

export async function getLeaveTypes() {
  const { data } = await api.get("/leave-types");
  const raw = unwrapData(data);
  return Array.isArray(raw) ? raw : [];
}

export async function createNewLeaveType(leaveTypeData) {
  const { data } = await api.post("/leave-types", leaveTypeData);
  return data.data ?? data;
}

export async function updateExistingLeaveType(id, leaveTypeData) {
  const { data } = await api.put(`/leave-types/${id}`, leaveTypeData);
  return data.data ?? data;
}

export async function removeLeaveType(id) {
  const { data } = await api.delete(`/leave-types/${id}`);
  return data.data ?? data;
}

export async function getApprovalMatrix() {
  return [...DEFAULT_APPROVAL_MATRIX];
}

export async function updateMatrix(matrix) {
  return matrix.map((am, idx) => ({
    ...am,
    id: am.id || `AM${String(idx + 1).padStart(3, "0")}`,
  }));
}

export async function getAdminLeaveRequests() {
  try {
    const { data } = await api.get("/leave-requests/my");
    const raw = unwrapData(data);
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export async function getSystemActivity() {
  try {
    const { data } = await api.get("/notifications");
    const raw = unwrapData(data);
    return Array.isArray(raw)
      ? raw.map((n) => ({
          id: String(n.id),
          action: n.title,
          user: n.message,
          timestamp: n.createdAt,
          type: n.type?.toLowerCase() ?? "system",
        }))
      : [];
  } catch {
    return [];
  }
}
