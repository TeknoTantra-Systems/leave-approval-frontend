import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const leaveRequestService = {
  getAll: async (params?: { page?: number; pageSize?: number; status?: string }) => {
    const response = await axiosInstance.get(API_ENDPOINTS.LEAVE.BASE, { params })
    return response.data
  },

  getById: async (id: string) => {
    const response = await axiosInstance.get(API_ENDPOINTS.LEAVE.BY_ID(id))
    return response.data
  },

  create: async (data: { leaveType: string; startDate: string; endDate: string; reason: string }) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LEAVE.BASE, data)
    return response.data
  },

  cancel: async (id: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LEAVE.CANCEL(id))
    return response.data
  },

  getBalance: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.LEAVE.BALANCE)
    return response.data
  },
}

export default leaveRequestService
