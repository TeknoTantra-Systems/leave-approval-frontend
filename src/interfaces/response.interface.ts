import { AxiosResponse } from 'axios'

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  statusCode: number
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}
