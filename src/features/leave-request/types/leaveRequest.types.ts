export interface LeaveRequestPayload {
  leaveType: string
  startDate: string
  endDate: string
  reason: string
}

export interface LeaveRequestFilters {
  status?: string
  leaveType?: string
  startDate?: string
  endDate?: string
}
