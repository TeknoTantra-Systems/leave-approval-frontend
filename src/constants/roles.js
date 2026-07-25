export const ROLES = {
  EMPLOYEE: "employee",
  MANAGER: "manager",
  HR: "hr",
  DIRECTOR: "director",
  APP_ADMIN: "app_admin",
};

export const ROLE_LABELS = {
  [ROLES.EMPLOYEE]: "Employee",
  [ROLES.MANAGER]: "Manager",
  [ROLES.HR]: "HR",
  [ROLES.DIRECTOR]: "Director",
  [ROLES.APP_ADMIN]: "App Admin",
};

export const ROLE_COLORS = {
  [ROLES.EMPLOYEE]: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  [ROLES.MANAGER]: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  [ROLES.HR]: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
  [ROLES.DIRECTOR]: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
  [ROLES.APP_ADMIN]: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
};
