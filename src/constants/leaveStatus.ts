export const LEAVE_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  WITHDRAWN: 'WITHDRAWN',
} as const

export const LEAVE_STATUS_LABELS: Record<string, string> = {
  [LEAVE_STATUS.PENDING]: 'Pending',
  [LEAVE_STATUS.APPROVED]: 'Approved',
  [LEAVE_STATUS.REJECTED]: 'Rejected',
  [LEAVE_STATUS.CANCELLED]: 'Cancelled',
  [LEAVE_STATUS.WITHDRAWN]: 'Withdrawn',
}
