export const LEAVE_TYPES = {
  ANNUAL: "annual",
  SICK: "sick",
  PERSONAL: "personal",
  MATERNITY: "maternity",
  PATERNITY: "paternity",
  BEREAVEMENT: "bereavement",
  UNPAID: "unpaid",
  WORK_FROM_HOME: "work_from_home",
};

export const LEAVE_TYPE_LABELS = {
  [LEAVE_TYPES.ANNUAL]: "Annual Leave",
  [LEAVE_TYPES.SICK]: "Sick Leave",
  [LEAVE_TYPES.PERSONAL]: "Personal Leave",
  [LEAVE_TYPES.MATERNITY]: "Maternity Leave",
  [LEAVE_TYPES.PATERNITY]: "Paternity Leave",
  [LEAVE_TYPES.BEREAVEMENT]: "Bereavement Leave",
  [LEAVE_TYPES.UNPAID]: "Unpaid Leave",
  [LEAVE_TYPES.WORK_FROM_HOME]: "Work From Home",
};

export const LEAVE_TYPE_OPTIONS = Object.values(LEAVE_TYPES).map((type) => ({
  value: type,
  label: LEAVE_TYPE_LABELS[type],
}));

export const MAX_LEAVE_DAYS = {
  [LEAVE_TYPES.ANNUAL]: 20,
  [LEAVE_TYPES.SICK]: 10,
  [LEAVE_TYPES.PERSONAL]: 5,
  [LEAVE_TYPES.MATERNITY]: 180,
  [LEAVE_TYPES.PATERNITY]: 15,
  [LEAVE_TYPES.BEREAVEMENT]: 5,
  [LEAVE_TYPES.UNPAID]: 30,
  [LEAVE_TYPES.WORK_FROM_HOME]: 30,
};
