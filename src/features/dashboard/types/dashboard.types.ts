export interface DashboardStats {
  totalLeaveRequests: number
  pendingApprovals: number
  approvedLeaves: number
  rejectedLeaves: number
  leaveBalance: number
}

export interface RecentActivity {
  id: string
  type: string
  description: string
  createdAt: string
}
