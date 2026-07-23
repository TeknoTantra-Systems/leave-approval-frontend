import { LEAVE_STATUS } from '@/constants/leaveStatus'
import { User } from './user.types'

export type LeaveStatus = (typeof LEAVE_STATUS)[keyof typeof LEAVE_STATUS]

export interface LeaveRequest {
  id: string
  userId: string
  user?: User
  leaveType: string
  startDate: string
  endDate: string
  reason: string
  status: LeaveStatus
  days: number
  managerComment?: string
  createdAt: string
  updatedAt: string
}

export interface LeaveBalance {
  userId: string
  leaveType: string
  totalDays: number
  usedDays: number
  remainingDays: number
  year: number
}
