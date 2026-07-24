import { ROUTES } from "@/constants/routes";
import { ROLES } from "@/constants/roles";
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineClipboardDocumentCheck,
  HiOutlineBell,
  HiOutlineUserCircle,
} from "react-icons/hi2";

export const NAV_ITEMS = {
  [ROLES.EMPLOYEE]: [
    { label: "Dashboard", path: ROUTES.EMPLOYEE_DASHBOARD, icon: HiOutlineHome },
    { label: "Apply Leave", path: ROUTES.APPLY_LEAVE, icon: HiOutlineDocumentText },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
    { label: "Profile", path: ROUTES.PROFILE, icon: HiOutlineUserCircle },
  ],
  [ROLES.MANAGER]: [
    { label: "Dashboard", path: ROUTES.MANAGER_DASHBOARD, icon: HiOutlineHome },
    { label: "Team Approvals", path: ROUTES.MANAGER_APPROVAL, icon: HiOutlineClipboardDocumentCheck },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
    { label: "Profile", path: ROUTES.PROFILE, icon: HiOutlineUserCircle },
  ],
  [ROLES.HR]: [
    { label: "Dashboard", path: ROUTES.HR_DASHBOARD, icon: HiOutlineHome },
    { label: "HR Approvals", path: ROUTES.HR_APPROVAL, icon: HiOutlineClipboardDocumentCheck },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
    { label: "Profile", path: ROUTES.PROFILE, icon: HiOutlineUserCircle },
  ],
  [ROLES.DIRECTOR]: [
    { label: "Dashboard", path: ROUTES.DIRECTOR_DASHBOARD, icon: HiOutlineHome },
    { label: "Director Approvals", path: ROUTES.DIRECTOR_APPROVAL, icon: HiOutlineClipboardDocumentCheck },
    { label: "Leave History", path: ROUTES.LEAVE_HISTORY, icon: HiOutlineClock },
    { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: HiOutlineBell },
    { label: "Profile", path: ROUTES.PROFILE, icon: HiOutlineUserCircle },
  ],
};
