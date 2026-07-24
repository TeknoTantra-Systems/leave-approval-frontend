import {
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineExclamationTriangle,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineArrowPath,
  HiOutlineBell,
} from "react-icons/hi2";
import { NOTIFICATION_TYPES } from "@/constants/statuses";

export const NOTIFICATION_ICON_MAP = {
  [NOTIFICATION_TYPES.SUBMITTED]: HiOutlineDocumentText,
  [NOTIFICATION_TYPES.APPROVED]: HiOutlineCheckCircle,
  [NOTIFICATION_TYPES.REJECTED]: HiOutlineXCircle,
  [NOTIFICATION_TYPES.REMINDER]: HiOutlineClock,
  [NOTIFICATION_TYPES.ESCALATED]: HiOutlineExclamationTriangle,
  [NOTIFICATION_TYPES.CLARIFICATION]: HiOutlineChatBubbleLeftEllipsis,
  [NOTIFICATION_TYPES.BALANCE_UPDATED]: HiOutlineArrowPath,
};

export const NOTIFICATION_ICON_BG = {
  [NOTIFICATION_TYPES.SUBMITTED]: "bg-blue-50 dark:bg-blue-900/20",
  [NOTIFICATION_TYPES.APPROVED]: "bg-emerald-50 dark:bg-emerald-900/20",
  [NOTIFICATION_TYPES.REJECTED]: "bg-red-50 dark:bg-red-900/20",
  [NOTIFICATION_TYPES.REMINDER]: "bg-amber-50 dark:bg-amber-900/20",
  [NOTIFICATION_TYPES.ESCALATED]: "bg-violet-50 dark:bg-violet-900/20",
  [NOTIFICATION_TYPES.CLARIFICATION]: "bg-orange-50 dark:bg-orange-900/20",
  [NOTIFICATION_TYPES.BALANCE_UPDATED]: "bg-teal-50 dark:bg-teal-900/20",
};

export const NOTIFICATION_ICON_COLOR = {
  [NOTIFICATION_TYPES.SUBMITTED]: "text-blue-600 dark:text-blue-400",
  [NOTIFICATION_TYPES.APPROVED]: "text-emerald-600 dark:text-emerald-400",
  [NOTIFICATION_TYPES.REJECTED]: "text-red-600 dark:text-red-400",
  [NOTIFICATION_TYPES.REMINDER]: "text-amber-600 dark:text-amber-400",
  [NOTIFICATION_TYPES.ESCALATED]: "text-violet-600 dark:text-violet-400",
  [NOTIFICATION_TYPES.CLARIFICATION]: "text-orange-600 dark:text-orange-400",
  [NOTIFICATION_TYPES.BALANCE_UPDATED]: "text-teal-600 dark:text-teal-400",
};

export const FALLBACK_ICON = HiOutlineBell;
