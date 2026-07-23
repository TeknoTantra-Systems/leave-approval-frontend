export interface ApprovalAction {
  leaveRequestId: string
  action: 'APPROVE' | 'REJECT'
  comment?: string
}

export interface ApprovalFilters {
  status?: string
  leaveType?: string
  department?: string
}
