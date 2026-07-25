import { ROLES } from "@/constants/roles";
import { LEAVE_TYPES } from "@/constants/leaveTypes";
import { LEAVE_STATUSES } from "@/constants/statuses";

const now = Date.now();
const days = (n) => new Date(now - n * 86400000).toISOString();

export const MOCK_USERS = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "employee@company.com",
    role: ROLES.EMPLOYEE,
    department: "Engineering",
    employeeId: "EMP001",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2023-06-15",
    phone: "+91 98765 43210",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "manager@company.com",
    role: ROLES.MANAGER,
    department: "Engineering",
    employeeId: "MGR001",
    managerName: "Vikram Singh",
    status: "active",
    joinDate: "2021-03-10",
    phone: "+91 98765 43211",
  },
  {
    id: "3",
    name: "Anjali Gupta",
    email: "hr@company.com",
    role: ROLES.HR,
    department: "Human Resources",
    employeeId: "HR001",
    managerName: "Vikram Singh",
    status: "active",
    joinDate: "2020-01-20",
    phone: "+91 98765 43212",
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "director@company.com",
    role: ROLES.DIRECTOR,
    department: "Executive",
    employeeId: "DIR001",
    managerName: null,
    status: "active",
    joinDate: "2018-07-01",
    phone: "+91 98765 43213",
  },
  {
    id: "5",
    name: "System Admin",
    email: "admin@company.com",
    role: ROLES.APP_ADMIN,
    department: "IT",
    employeeId: "ADM001",
    managerName: null,
    status: "active",
    joinDate: "2022-11-01",
    phone: "+91 98765 43214",
  },
  {
    id: "6",
    name: "Amit Kumar",
    email: "amit@company.com",
    role: ROLES.EMPLOYEE,
    department: "Engineering",
    employeeId: "EMP002",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2024-01-10",
    phone: "+91 98765 43215",
  },
  {
    id: "7",
    name: "Sneha Reddy",
    email: "sneha@company.com",
    role: ROLES.EMPLOYEE,
    department: "Engineering",
    employeeId: "EMP003",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2023-08-22",
    phone: "+91 98765 43216",
  },
  {
    id: "8",
    name: "Ravi Teja",
    email: "ravi@company.com",
    role: ROLES.EMPLOYEE,
    department: "Design",
    employeeId: "EMP004",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2023-05-15",
    phone: "+91 98765 43217",
  },
  {
    id: "9",
    name: "Deepa Nair",
    email: "deepa@company.com",
    role: ROLES.EMPLOYEE,
    department: "Marketing",
    employeeId: "EMP005",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2024-02-01",
    phone: "+91 98765 43218",
  },
  {
    id: "10",
    name: "Kavitha Menon",
    email: "kavitha@company.com",
    role: ROLES.EMPLOYEE,
    department: "Finance",
    employeeId: "EMP006",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2022-09-10",
    phone: "+91 98765 43219",
  },
  {
    id: "11",
    name: "Ananya Das",
    email: "ananya@company.com",
    role: ROLES.EMPLOYEE,
    department: "Engineering",
    employeeId: "EMP007",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2024-03-15",
    phone: "+91 98765 43220",
  },
  {
    id: "12",
    name: "Sanjay Mehta",
    email: "sanjay@company.com",
    role: ROLES.EMPLOYEE,
    department: "Product",
    employeeId: "EMP008",
    managerName: "Priya Patel",
    status: "active",
    joinDate: "2023-11-20",
    phone: "+91 98765 43221",
  },
  {
    id: "13",
    name: "Priya Kapoor",
    email: "priya.k@company.com",
    role: ROLES.EMPLOYEE,
    department: "HR",
    employeeId: "EMP009",
    managerName: "Anjali Gupta",
    status: "active",
    joinDate: "2024-04-01",
    phone: "+91 98765 43222",
  },
  {
    id: "14",
    name: "Vikash Singh",
    email: "vikash@company.com",
    role: ROLES.MANAGER,
    department: "Marketing",
    employeeId: "MGR002",
    managerName: "Vikram Singh",
    status: "active",
    joinDate: "2021-07-15",
    phone: "+91 98765 43223",
  },
  {
    id: "15",
    name: "Neha Sharma",
    email: "neha@company.com",
    role: ROLES.EMPLOYEE,
    department: "Marketing",
    employeeId: "EMP010",
    managerName: "Vikash Singh",
    status: "inactive",
    joinDate: "2023-01-10",
    phone: "+91 98765 43224",
  },
];

export const MOCK_DEPARTMENTS = [
  { id: "D001", name: "Engineering", head: "Priya Patel", headId: "2", employeeCount: 12, status: "active" },
  { id: "D002", name: "Human Resources", head: "Anjali Gupta", headId: "3", employeeCount: 5, status: "active" },
  { id: "D003", name: "Marketing", head: "Vikash Singh", headId: "14", employeeCount: 8, status: "active" },
  { id: "D004", name: "Finance", head: "Rajesh Kumar", headId: null, employeeCount: 6, status: "active" },
  { id: "D005", name: "Design", head: "Meera Iyer", headId: null, employeeCount: 4, status: "active" },
  { id: "D006", name: "Product", head: "Arun Nair", headId: null, employeeCount: 5, status: "active" },
  { id: "D007", name: "Executive", head: "Vikram Singh", headId: "4", employeeCount: 2, status: "active" },
  { id: "D008", name: "IT", head: "System Admin", headId: "5", employeeCount: 3, status: "active" },
];

export const MOCK_LEAVE_TYPES = [
  { id: "LT001", type: LEAVE_TYPES.ANNUAL, name: "Annual Leave", maxDays: 20, isPaid: true, carryForward: true, status: "active" },
  { id: "LT002", type: LEAVE_TYPES.SICK, name: "Sick Leave", maxDays: 10, isPaid: true, carryForward: false, status: "active" },
  { id: "LT003", type: LEAVE_TYPES.PERSONAL, name: "Personal Leave", maxDays: 5, isPaid: true, carryForward: false, status: "active" },
  { id: "LT004", type: LEAVE_TYPES.MATERNITY, name: "Maternity Leave", maxDays: 180, isPaid: true, carryForward: false, status: "active" },
  { id: "LT005", type: LEAVE_TYPES.PATERNITY, name: "Paternity Leave", maxDays: 15, isPaid: true, carryForward: false, status: "active" },
  { id: "LT006", type: LEAVE_TYPES.BEREAVEMENT, name: "Bereavement Leave", maxDays: 5, isPaid: true, carryForward: false, status: "active" },
  { id: "LT007", type: LEAVE_TYPES.UNPAID, name: "Unpaid Leave", maxDays: 30, isPaid: false, carryForward: false, status: "active" },
  { id: "LT008", type: LEAVE_TYPES.WORK_FROM_HOME, name: "Work From Home", maxDays: 30, isPaid: true, carryForward: false, status: "active" },
];

export let MOCK_APPROVAL_MATRIX = [
  { id: "AM001", maxDays: 3, approvers: ["manager"], description: "Leave requests up to 3 days" },
  { id: "AM002", maxDays: 10, approvers: ["manager", "hr"], description: "Leave requests 4-10 days" },
  { id: "AM003", maxDays: null, approvers: ["manager", "hr", "director"], description: "Leave requests over 10 days" },
];

export const MOCK_ADMIN_LEAVE_REQUESTS = [
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
    reason: "Not feeling well",
    status: LEAVE_STATUSES.APPROVED,
    appliedOn: "2025-12-17T08:30:00Z",
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
    reason: "Personal work",
    status: LEAVE_STATUSES.REJECTED,
    appliedOn: "2025-12-11T14:00:00Z",
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
    reason: "Extended family visit",
    status: LEAVE_STATUSES.ESCALATED,
    appliedOn: "2025-12-08T09:00:00Z",
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
    reason: "Year-end vacation",
    status: LEAVE_STATUSES.PENDING,
    appliedOn: "2025-12-20T11:00:00Z",
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
    reason: "Fever and cold",
    status: LEAVE_STATUSES.CLARIFICATION,
    appliedOn: "2025-12-21T09:00:00Z",
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
    reason: "New year celebrations",
    status: LEAVE_STATUSES.ESCALATED,
    appliedOn: "2025-12-19T11:00:00Z",
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
  },
];

export const MOCK_SYSTEM_ACTIVITY = [
  { id: "SA001", action: "User Login", user: "System Admin", timestamp: days(0), type: "system" },
  { id: "SA002", action: "Department 'Design' created", user: "System Admin", timestamp: days(1), type: "admin" },
  { id: "SA003", action: "Leave type 'Work From Home' added", user: "System Admin", timestamp: days(2), type: "admin" },
  { id: "SA004", action: "Approval matrix updated", user: "System Admin", timestamp: days(3), type: "admin" },
  { id: "SA005", action: "Bulk user import completed", user: "System Admin", timestamp: days(5), type: "system" },
];

let nextUserId = 16;
let nextDeptId = 9;
let nextLeaveTypeId = 9;

export async function fetchAllUsers() {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_USERS.map((u) => ({ ...u }));
}

export async function fetchUserById(id) {
  await new Promise((r) => setTimeout(r, 200));
  const found = MOCK_USERS.find((u) => u.id === id);
  return found ? { ...found } : null;
}

export async function createUser(data) {
  await new Promise((r) => setTimeout(r, 500));
  nextUserId += 1;
  const newUser = {
    id: String(nextUserId),
    ...data,
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
  };
  MOCK_USERS.push(newUser);
  return { ...newUser };
}

export async function updateUser(id, data) {
  await new Promise((r) => setTimeout(r, 400));
  const idx = MOCK_USERS.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  MOCK_USERS[idx] = { ...MOCK_USERS[idx], ...data };
  return { ...MOCK_USERS[idx] };
}

export async function deleteUser(id) {
  await new Promise((r) => setTimeout(r, 300));
  const idx = MOCK_USERS.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  MOCK_USERS.splice(idx, 1);
  return true;
}

export async function deactivateUser(id) {
  await new Promise((r) => setTimeout(r, 300));
  const user = MOCK_USERS.find((u) => u.id === id);
  if (!user) throw new Error("User not found");
  user.status = user.status === "active" ? "inactive" : "active";
  return { ...user };
}

export async function fetchDepartments() {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_DEPARTMENTS.map((d) => ({ ...d }));
}

export async function createDepartment(data) {
  await new Promise((r) => setTimeout(r, 400));
  nextDeptId += 1;
  const newDept = {
    id: `D${String(nextDeptId).padStart(3, "0")}`,
    ...data,
    employeeCount: 0,
    status: "active",
  };
  MOCK_DEPARTMENTS.push(newDept);
  return { ...newDept };
}

export async function updateDepartment(id, data) {
  await new Promise((r) => setTimeout(r, 300));
  const idx = MOCK_DEPARTMENTS.findIndex((d) => d.id === id);
  if (idx === -1) throw new Error("Department not found");
  MOCK_DEPARTMENTS[idx] = { ...MOCK_DEPARTMENTS[idx], ...data };
  return { ...MOCK_DEPARTMENTS[idx] };
}

export async function deleteDepartment(id) {
  await new Promise((r) => setTimeout(r, 300));
  const idx = MOCK_DEPARTMENTS.findIndex((d) => d.id === id);
  if (idx === -1) throw new Error("Department not found");
  MOCK_DEPARTMENTS.splice(idx, 1);
  return true;
}

export async function fetchLeaveTypes() {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_LEAVE_TYPES.map((lt) => ({ ...lt }));
}

export async function createLeaveType(data) {
  await new Promise((r) => setTimeout(r, 400));
  nextLeaveTypeId += 1;
  const newType = {
    id: `LT${String(nextLeaveTypeId).padStart(3, "0")}`,
    ...data,
    status: "active",
  };
  MOCK_LEAVE_TYPES.push(newType);
  return { ...newType };
}

export async function updateLeaveType(id, data) {
  await new Promise((r) => setTimeout(r, 300));
  const idx = MOCK_LEAVE_TYPES.findIndex((lt) => lt.id === id);
  if (idx === -1) throw new Error("Leave type not found");
  MOCK_LEAVE_TYPES[idx] = { ...MOCK_LEAVE_TYPES[idx], ...data };
  return { ...MOCK_LEAVE_TYPES[idx] };
}

export async function deleteLeaveType(id) {
  await new Promise((r) => setTimeout(r, 300));
  const idx = MOCK_LEAVE_TYPES.findIndex((lt) => lt.id === id);
  if (idx === -1) throw new Error("Leave type not found");
  MOCK_LEAVE_TYPES.splice(idx, 1);
  return true;
}

export async function fetchApprovalMatrix() {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_APPROVAL_MATRIX.map((am) => ({ ...am }));
}

export async function updateApprovalMatrix(matrix) {
  await new Promise((r) => setTimeout(r, 400));
  MOCK_APPROVAL_MATRIX = matrix.map((am, idx) => ({
    ...am,
    id: am.id || `AM${String(idx + 1).padStart(3, "0")}`,
  }));
  return MOCK_APPROVAL_MATRIX.map((am) => ({ ...am }));
}

export async function fetchAdminLeaveRequests() {
  await new Promise((r) => setTimeout(r, 400));
  return MOCK_ADMIN_LEAVE_REQUESTS.map((r) => ({ ...r }));
}

export async function fetchSystemActivity() {
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_SYSTEM_ACTIVITY];
}

export async function fetchAdminNotifications() {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_SYSTEM_ACTIVITY.map((a) => ({
    id: a.id,
    title: a.action,
    subtitle: a.user,
    date: a.timestamp,
    status: "approved",
  }));
}
