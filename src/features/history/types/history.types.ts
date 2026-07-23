export interface HistoryFilters {
  startDate?: string
  endDate?: string
  leaveType?: string
  status?: string
}

export interface HistoryExportParams {
  format: 'csv' | 'pdf'
  startDate?: string
  endDate?: string
}
