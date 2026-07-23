import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const approvalService = {
  getPending: async (params?: { page?: number; pageSize?: number }) => {
    const response = await axiosInstance.get(API_ENDPOINTS.APPROVALS.PENDING, { params })
    return response.data
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(API_ENDPOINTS.APPROVALS.BY_ID(id))
    return response.data
  },

  approve: async (id: string, comment?: string) => {
    const response = await axiosInstance.post(`${API_ENDPOINTS.APPROVALS.BY_ID(id)}/approve`, { comment })
    return response.data
  },

  reject: async (id: string, comment: string) => {
    const response = await axiosInstance.post(`${API_ENDPOINTS.APPROVALS.BY_ID(id)}/reject`, { comment })
    return response.data
  },
}

export default approvalService
