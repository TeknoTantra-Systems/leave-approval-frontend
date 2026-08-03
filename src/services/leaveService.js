import api from "./api";
import {
  mapBackendLeaveRequest,
  mapBackendLeaveWithHistory,
  mapActionToBackend,
} from "@/utils/transformers";

const MOCK_LEAVE_BALANCE = {
  annual: { total: 20, used: 8, pending: 3 },
  sick: { total: 10, used: 2, pending: 0 },
  personal: { total: 5, used: 1, pending: 0 },
};

async function fetchUsersMap() {
  try {
    const { data } = await api.get("/users");
    const users = data.data?.data ?? data.data ?? [];
    const map = {};
    const arr = Array.isArray(users) ? users : [];
    for (const u of arr) {
      map[u.id] = {
        name: u.name,
        employeeId: u.employeeId,
        department: u.department,
        role: u.role,
      };
    }
    return map;
  } catch {
    return {};
  }
}

async function fetchLeaveTypesMap() {
  try {
    const { data } = await api.get("/leave-types");
    const types = data.data?.data ?? data.data ?? [];
    const map = {};
    const arr = Array.isArray(types) ? types : [];
    for (const lt of arr) {
      map[lt.id] = lt.name?.toLowerCase().replace(/\s+/g, "_") ?? "";
    }
    return map;
  } catch {
    return {};
  }
}

async function getLookups() {
  const [usersMap, leaveTypesMap] = await Promise.all([
    fetchUsersMap(),
    fetchLeaveTypesMap(),
  ]);
  return { usersMap, leaveTypesMap };
}

function unwrapData(response) {
  const body = response.data;
  if (body?.data?.data) return body.data.data;
  if (body?.data && Array.isArray(body.data)) return body.data;
  if (Array.isArray(body)) return body;
  return body?.data ?? body ?? [];
}

export async function getLeaveRequests() {
  const { usersMap, leaveTypesMap } = await getLookups();
  const { data: response } = await api.get("/leave-requests/my");
  const raw = unwrapData(response);
  return (Array.isArray(raw) ? raw : []).map((r) =>
    mapBackendLeaveRequest(r, { usersMap, leaveTypesMap })
  );
}

export async function getLeaveRequestById(id) {
  const { usersMap, leaveTypesMap } = await getLookups();
  const { data: response } = await api.get(`/leave-requests/${id}`);
  const raw = response.data ?? response;
  const { data: historyResponse } = await api
    .get(`/leave-requests/${id}/history`)
    .catch(() => ({ data: { data: [] } }));
  const historyRaw = historyResponse?.data ?? historyResponse ?? [];
  return mapBackendLeaveWithHistory(raw, historyRaw, {
    usersMap,
    leaveTypesMap,
  });
}

export async function getMyLeaveRequests() {
  return getLeaveRequests();
}

export async function submitNewLeaveRequest(data) {
  const leaveTypes = await fetchLeaveTypesMap();
  const reverseMap = {};
  for (const [k, v] of Object.entries(leaveTypes)) {
    reverseMap[v] = Number(k);
  }
  const payload = {
    leaveTypeId: reverseMap[data.leaveType],
    fromDate: data.startDate,
    toDate: data.endDate,
    reason: data.reason,
  };
  const { data: response } = await api.post("/leave-requests", payload);
  return response.data ?? response;
}

export async function getLeaveBalance() {
  return { ...MOCK_LEAVE_BALANCE };
}

export async function getPendingApprovalsForRole(role) {
  const endpointMap = {
    manager: "/manager/pending",
    hr: "/hr/pending",
    director: "/director/pending",
  };
  const endpoint = endpointMap[role];
  if (!endpoint) return [];

  const { usersMap, leaveTypesMap } = await getLookups();
  const { data: response } = await api.get(endpoint);
  const raw = unwrapData(response);
  return (Array.isArray(raw) ? raw : []).map((r) =>
    mapBackendLeaveRequest(r, { usersMap, leaveTypesMap })
  );
}

async function postDecision(id, role, action, remarks) {
  const endpointMap = {
    manager: "/manager/approve",
    hr: "/hr/approve",
    director: "/director/approve",
  };
  const endpoint = endpointMap[role];
  if (!endpoint) throw new Error(`Unknown role: ${role}`);

  const payload = {
    leaveRequestId: Number(id),
    action: mapActionToBackend(action),
    comments: remarks || "",
  };

  const { data: response } = await api.post(endpoint, payload);
  return response.data ?? response;
}

export async function approveLeaveRequest(id, role, remarks) {
  return postDecision(id, role, "approved", remarks);
}

export async function rejectLeaveRequest(id, role, remarks) {
  return postDecision(id, role, "rejected", remarks);
}

export async function requestClarificationOnLeave(id, role, remarks) {
  return postDecision(id, role, "clarify", remarks);
}
