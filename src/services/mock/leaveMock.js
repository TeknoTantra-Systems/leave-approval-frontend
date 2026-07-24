import { LEAVE_TYPES } from "@/constants/leaveTypes";
import { LEAVE_STATUSES } from "@/constants/statuses";

export const MOCK_LEAVE_REQUESTS = [
  {
    id: "LR001",
    employeeName: "Amit Kumar",
    employeeId: "EMP002",
    department: "Engineering",
    leaveType: LEAVE_TYPES.ANNUAL,
    startDate: "2025-12-23",
    endDate: "2025-12-27",
    totalDays: 5,
    reason: "Family vacation during Christmas holidays",
    status: LEAVE_STATUSES.PENDING,
    appliedOn: "2025-12-20T10:00:00Z",
    managerName: "Priya Patel",
    managerDecision: null,
    managerRemarks: null,
    managerDecidedOn: null,
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Amit Kumar", date: "2025-12-20T10:00:00Z", remarks: "" },
    ],
  },
  {
    id: "LR002",
    employeeName: "Sneha Reddy",
    employeeId: "EMP003",
    department: "Engineering",
    leaveType: LEAVE_TYPES.SICK,
    startDate: "2025-12-18",
    endDate: "2025-12-19",
    totalDays: 2,
    reason: "Not feeling well, doctor appointment",
    status: LEAVE_STATUSES.APPROVED,
    appliedOn: "2025-12-17T08:30:00Z",
    managerName: "Priya Patel",
    managerDecision: "approved",
    managerRemarks: "Approved. Take care.",
    managerDecidedOn: "2025-12-17T09:15:00Z",
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Sneha Reddy", date: "2025-12-17T08:30:00Z", remarks: "" },
      { action: "Manager Approved", by: "Priya Patel", date: "2025-12-17T09:15:00Z", remarks: "Approved. Take care." },
    ],
  },
  {
    id: "LR003",
    employeeName: "Ravi Teja",
    employeeId: "EMP004",
    department: "Design",
    leaveType: LEAVE_TYPES.PERSONAL,
    startDate: "2025-12-12",
    endDate: "2025-12-12",
    totalDays: 1,
    reason: "Personal work at home",
    status: LEAVE_STATUSES.REJECTED,
    appliedOn: "2025-12-11T14:00:00Z",
    managerName: "Priya Patel",
    managerDecision: "rejected",
    managerRemarks: "Too many pending tasks. Please reschedule.",
    managerDecidedOn: "2025-12-11T16:00:00Z",
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Ravi Teja", date: "2025-12-11T14:00:00Z", remarks: "" },
      { action: "Manager Rejected", by: "Priya Patel", date: "2025-12-11T16:00:00Z", remarks: "Too many pending tasks. Please reschedule." },
    ],
  },
  {
    id: "LR004",
    employeeName: "Deepa Nair",
    employeeId: "EMP005",
    department: "Marketing",
    leaveType: LEAVE_TYPES.ANNUAL,
    startDate: "2025-12-10",
    endDate: "2025-12-20",
    totalDays: 11,
    reason: "Extended family visit to hometown",
    status: LEAVE_STATUSES.ESCALATED,
    appliedOn: "2025-12-08T09:00:00Z",
    managerName: "Priya Patel",
    managerDecision: "approved",
    managerRemarks: "Recommended for approval.",
    managerDecidedOn: "2025-12-09T10:00:00Z",
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Deepa Nair", date: "2025-12-08T09:00:00Z", remarks: "" },
      { action: "Manager Approved", by: "Priya Patel", date: "2025-12-09T10:00:00Z", remarks: "Recommended for approval." },
      { action: "Escalated to HR", by: "System", date: "2025-12-09T10:00:01Z", remarks: "Leave exceeds 10 days threshold." },
    ],
  },
  {
    id: "LR005",
    employeeName: "Rahul Sharma",
    employeeId: "EMP001",
    department: "Engineering",
    leaveType: LEAVE_TYPES.ANNUAL,
    startDate: "2025-12-23",
    endDate: "2025-12-27",
    totalDays: 5,
    reason: "Year-end vacation with family",
    status: LEAVE_STATUSES.PENDING,
    appliedOn: "2025-12-20T11:00:00Z",
    managerName: "Priya Patel",
    managerDecision: null,
    managerRemarks: null,
    managerDecidedOn: null,
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Rahul Sharma", date: "2025-12-20T11:00:00Z", remarks: "" },
    ],
  },
  {
    id: "LR006",
    employeeName: "Kavitha Menon",
    employeeId: "EMP006",
    department: "Finance",
    leaveType: LEAVE_TYPES.MATERNITY,
    startDate: "2026-01-15",
    endDate: "2026-07-15",
    totalDays: 180,
    reason: "Maternity leave",
    status: LEAVE_STATUSES.APPROVED,
    appliedOn: "2025-12-15T10:00:00Z",
    managerName: "Priya Patel",
    managerDecision: "approved",
    managerRemarks: "Approved with best wishes.",
    managerDecidedOn: "2025-12-15T11:00:00Z",
    hrDecision: "approved",
    hrRemarks: "All documentation verified.",
    hrDecidedOn: "2025-12-16T09:00:00Z",
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Kavitha Menon", date: "2025-12-15T10:00:00Z", remarks: "" },
      { action: "Manager Approved", by: "Priya Patel", date: "2025-12-15T11:00:00Z", remarks: "Approved with best wishes." },
      { action: "HR Approved", by: "Anjali Gupta", date: "2025-12-16T09:00:00Z", remarks: "All documentation verified." },
    ],
  },
  {
    id: "LR007",
    employeeName: "Vikram Singh",
    employeeId: "DIR001",
    department: "Executive",
    leaveType: LEAVE_TYPES.ANNUAL,
    startDate: "2026-01-05",
    endDate: "2026-01-30",
    totalDays: 26,
    reason: "Annual extended break",
    status: LEAVE_STATUSES.ESCALATED,
    appliedOn: "2025-12-20T07:00:00Z",
    managerName: null,
    managerDecision: null,
    managerRemarks: null,
    managerDecidedOn: null,
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Vikram Singh", date: "2025-12-20T07:00:00Z", remarks: "" },
    ],
  },
  {
    id: "LR008",
    employeeName: "Ananya Das",
    employeeId: "EMP007",
    department: "Engineering",
    leaveType: LEAVE_TYPES.SICK,
    startDate: "2025-12-22",
    endDate: "2025-12-23",
    totalDays: 2,
    reason: "Fever and cold, need rest",
    status: LEAVE_STATUSES.CLARIFICATION,
    appliedOn: "2025-12-21T09:00:00Z",
    managerName: "Priya Patel",
    managerDecision: null,
    managerRemarks: "Please provide medical certificate.",
    managerDecidedOn: "2025-12-21T10:30:00Z",
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Ananya Das", date: "2025-12-21T09:00:00Z", remarks: "" },
      { action: "Clarification Requested", by: "Priya Patel", date: "2025-12-21T10:30:00Z", remarks: "Please provide medical certificate." },
    ],
  },
  {
    id: "LR009",
    employeeName: "Sanjay Mehta",
    employeeId: "EMP008",
    department: "Product",
    leaveType: LEAVE_TYPES.ANNUAL,
    startDate: "2025-12-26",
    endDate: "2026-01-02",
    totalDays: 8,
    reason: "New year celebrations with family",
    status: LEAVE_STATUSES.ESCALATED,
    appliedOn: "2025-12-19T11:00:00Z",
    managerName: "Priya Patel",
    managerDecision: "approved",
    managerRemarks: "Approved, team capacity is sufficient.",
    managerDecidedOn: "2025-12-19T14:00:00Z",
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Sanjay Mehta", date: "2025-12-19T11:00:00Z", remarks: "" },
      { action: "Manager Approved", by: "Priya Patel", date: "2025-12-19T14:00:00Z", remarks: "Approved, team capacity is sufficient." },
      { action: "Escalated to HR", by: "System", date: "2025-12-19T14:00:01Z", remarks: "Leave exceeds 3 days. HR approval required." },
    ],
  },
  {
    id: "LR010",
    employeeName: "Priya Kapoor",
    employeeId: "EMP009",
    department: "HR",
    leaveType: LEAVE_TYPES.PERSONAL,
    startDate: "2025-12-24",
    endDate: "2025-12-24",
    totalDays: 1,
    reason: "Personal appointment",
    status: LEAVE_STATUSES.CLARIFICATION,
    appliedOn: "2025-12-20T15:00:00Z",
    managerName: "Priya Patel",
    managerDecision: null,
    managerRemarks: "Need more details about the appointment.",
    managerDecidedOn: "2025-12-20T16:00:00Z",
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: "Priya Kapoor", date: "2025-12-20T15:00:00Z", remarks: "" },
      { action: "Clarification Requested", by: "Priya Patel", date: "2025-12-20T16:00:00Z", remarks: "Need more details about the appointment." },
    ],
  },
];

const MOCK_LEAVE_BALANCE = {
  annual: { total: 20, used: 8, pending: 3 },
  sick: { total: 10, used: 2, pending: 0 },
  personal: { total: 5, used: 1, pending: 0 },
};

let nextId = 11;

export async function fetchLeaveRequests() {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_LEAVE_REQUESTS.map((r) => ({ ...r, timeline: [...r.timeline] }));
}

export async function fetchLeaveRequestById(id) {
  await new Promise((r) => setTimeout(r, 200));
  const found = MOCK_LEAVE_REQUESTS.find((r) => r.id === id);
  return found ? { ...found, timeline: [...found.timeline] } : null;
}

export async function fetchLeaveBalance() {
  await new Promise((r) => setTimeout(r, 200));
  return { ...MOCK_LEAVE_BALANCE };
}

export async function submitLeaveRequest(data) {
  await new Promise((r) => setTimeout(r, 600));
  nextId += 1;
  const newRequest = {
    id: `LR${String(nextId).padStart(3, "0")}`,
    ...data,
    status: LEAVE_STATUSES.PENDING,
    appliedOn: new Date().toISOString(),
    managerDecision: null,
    managerRemarks: null,
    managerDecidedOn: null,
    hrDecision: null,
    hrRemarks: null,
    hrDecidedOn: null,
    directorDecision: null,
    directorRemarks: null,
    directorDecidedOn: null,
    timeline: [
      { action: "Applied", by: data.employeeName, date: new Date().toISOString(), remarks: "" },
    ],
  };
  MOCK_LEAVE_REQUESTS.unshift(newRequest);
  return newRequest;
}

export async function fetchPendingApprovals(role) {
  await new Promise((r) => setTimeout(r, 400));

  return MOCK_LEAVE_REQUESTS.filter((req) => {
    if (role === "manager") {
      return (
        (req.status === LEAVE_STATUSES.PENDING || req.status === LEAVE_STATUSES.CLARIFICATION) &&
        req.managerDecision === null
      );
    }
    if (role === "hr") {
      return (
        req.status === LEAVE_STATUSES.ESCALATED &&
        req.managerDecision === "approved" &&
        req.hrDecision === null
      );
    }
    if (role === "director") {
      return (
        req.status === LEAVE_STATUSES.ESCALATED &&
        req.hrDecision === "approved" &&
        req.directorDecision === null
      );
    }
    return false;
  }).map((r) => ({ ...r, timeline: [...r.timeline] }));
}

function determineNextStatus(request, approvingRole, decision) {
  if (decision === "rejected") return LEAVE_STATUSES.REJECTED;

  if (approvingRole === "manager") {
    if (request.totalDays > 10) return LEAVE_STATUSES.ESCALATED;
    if (request.totalDays > 3) return LEAVE_STATUSES.ESCALATED;
    return LEAVE_STATUSES.APPROVED;
  }
  if (approvingRole === "hr") {
    if (request.totalDays > 10) return LEAVE_STATUSES.ESCALATED;
    return LEAVE_STATUSES.APPROVED;
  }
  if (approvingRole === "director") {
    return LEAVE_STATUSES.APPROVED;
  }
  return LEAVE_STATUSES.APPROVED;
}

export async function updateDecision(id, role, decision, remarks) {
  await new Promise((r) => setTimeout(r, 500));
  const req = MOCK_LEAVE_REQUESTS.find((r) => r.id === id);
  if (!req) throw new Error("Request not found");

  const now = new Date().toISOString();
  const roleField = role === "hr" ? "hr" : role;
  req[`${roleField}Decision`] = decision;
  req[`${roleField}Remarks`] = remarks;
  req[`${roleField}DecidedOn`] = now;

  const actionLabel = decision === "approved"
    ? `${role.charAt(0).toUpperCase() + role.slice(1)} Approved`
    : `${role.charAt(0).toUpperCase() + role.slice(1)} Rejected`;

  req.timeline.push({ action: actionLabel, by: remarks || "Approver", date: now, remarks });

  const newStatus = determineNextStatus(req, role, decision);
  req.status = newStatus;

  if (decision === "approved" && newStatus === LEAVE_STATUSES.ESCALATED) {
    const nextRole = role === "manager" ? "HR" : "Director";
    req.timeline.push({
      action: `Escalated to ${nextRole}`,
      by: "System",
      date: now,
      remarks: `Approved by ${role}. Escalated to ${nextRole} for further review.`,
    });
  }

  return { ...req, timeline: [...req.timeline] };
}

export async function requestClarification(id, role, remarks) {
  await new Promise((r) => setTimeout(r, 500));
  const req = MOCK_LEAVE_REQUESTS.find((r) => r.id === id);
  if (!req) throw new Error("Request not found");

  const now = new Date().toISOString();
  const roleField = role === "hr" ? "hr" : role;
  req[`${roleField}Remarks`] = remarks;
  req[`${roleField}DecidedOn`] = now;
  req.status = LEAVE_STATUSES.CLARIFICATION;

  req.timeline.push({
    action: "Clarification Requested",
    by: role === "manager" ? "Priya Patel" : role === "hr" ? "Anjali Gupta" : "Vikram Singh",
    date: now,
    remarks,
  });

  return { ...req, timeline: [...req.timeline] };
}
