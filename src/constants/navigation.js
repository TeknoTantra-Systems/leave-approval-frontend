import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineClipboardDocumentCheck,
  HiOutlineBell,
  HiOutlineUsers,
  HiOutlineBuildingOffice2,
  HiOutlineClipboardDocumentList,
  HiOutlineShieldCheck,
  HiOutlineDocumentDuplicate,
  HiOutlineChartBar,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

export const NAV_ITEMS = {
  [ROLES.EMPLOYEE]: [
    { label: "Dashboard", path: ROUTES.EMPLOYEE_DASHBOARD, icon: HiOutlineHome },
    { label: "Apply Leave", path: ROUTES.APPLY_LEAVE, icon: HiOutlineDocumentText },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
  ],
  [ROLES.MANAGER]: [
    { label: "Dashboard", path: ROUTES.MANAGER_DASHBOARD, icon: HiOutlineHome },
    { label: "Team Approvals", path: ROUTES.MANAGER_APPROVAL, icon: HiOutlineClipboardDocumentCheck },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
  ],
  [ROLES.HR]: [
    { label: "Dashboard", path: ROUTES.HR_DASHBOARD, icon: HiOutlineHome },
    { label: "HR Approvals", path: ROUTES.HR_APPROVAL, icon: HiOutlineClipboardDocumentCheck },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
  ],
  [ROLES.DIRECTOR]: [
    { label: "Dashboard", path: ROUTES.DIRECTOR_DASHBOARD, icon: HiOutlineHome },
    { label: "Director Approvals", path: ROUTES.DIRECTOR_APPROVAL, icon: HiOutlineClipboardDocumentCheck },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
  ],
  [ROLES.APP_ADMIN]: [
    { label: "Dashboard", path: ROUTES.ADMIN_DASHBOARD, icon: HiOutlineHome },
    { label: "Users", path: ROUTES.ADMIN_USERS, icon: HiOutlineUsers },
    { label: "Departments", path: ROUTES.ADMIN_DEPARTMENTS, icon: HiOutlineBuildingOffice2 },
    { label: "Leave Types", path: ROUTES.ADMIN_LEAVE_TYPES, icon: HiOutlineClipboardDocumentList },
    { label: "Approval Matrix", path: ROUTES.ADMIN_APPROVAL_MATRIX, icon: HiOutlineShieldCheck },
    { label: "Leave Requests", path: ROUTES.ADMIN_LEAVE_REQUESTS, icon: HiOutlineDocumentDuplicate },
    { label: "Reports", path: ROUTES.ADMIN_REPORTS, icon: HiOutlineChartBar },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
    { label: "Settings", path: ROUTES.SETTINGS, icon: HiOutlineCog6Tooth },
  ],
};
