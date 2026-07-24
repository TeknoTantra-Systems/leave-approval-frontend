export const ROUTES = {
  LOGIN: "/login",

  EMPLOYEE_DASHBOARD: "/dashboard",
  MANAGER_DASHBOARD: "/dashboard/manager",
  HR_DASHBOARD: "/dashboard/hr",
  DIRECTOR_DASHBOARD: "/dashboard/director",

  APPLY_LEAVE: "/leave/apply",
  LEAVE_HISTORY: "/leave/history",
  LEAVE_DETAILS: "/leave/:id",

  PENDING_APPROVALS: "/approvals",
  MANAGER_APPROVAL: "/approvals/manager",
  HR_APPROVAL: "/approvals/hr",
  DIRECTOR_APPROVAL: "/approvals/director",

  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",

  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "*",
};

export const ROUTE_LABELS = {
  [ROUTES.LOGIN]: "Login",
  [ROUTES.EMPLOYEE_DASHBOARD]: "Dashboard",
  [ROUTES.MANAGER_DASHBOARD]: "Manager Dashboard",
  [ROUTES.HR_DASHBOARD]: "HR Dashboard",
  [ROUTES.DIRECTOR_DASHBOARD]: "Director Dashboard",
  [ROUTES.APPLY_LEAVE]: "Apply Leave",
  [ROUTES.LEAVE_HISTORY]: "Leave History",
  [ROUTES.LEAVE_DETAILS]: "Leave Details",
  [ROUTES.PENDING_APPROVALS]: "Pending Approvals",
  [ROUTES.MANAGER_APPROVAL]: "Manager Approvals",
  [ROUTES.HR_APPROVAL]: "HR Approvals",
  [ROUTES.DIRECTOR_APPROVAL]: "Director Approvals",
  [ROUTES.NOTIFICATIONS]: "Notifications",
  [ROUTES.PROFILE]: "Profile",
  [ROUTES.UNAUTHORIZED]: "Unauthorized",
  [ROUTES.NOT_FOUND]: "Not Found",
};
