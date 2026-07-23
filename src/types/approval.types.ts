export interface Approval {
  id: string
  leaveRequestId: string
  approverId: string
  status: 'APPROVED' | 'REJECTED' | 'PENDING'
  comment?: string
  createdAt: string
  updatedAt: string
}
