export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
  totalPages: number
}
