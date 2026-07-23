import axiosInstance from '@/api/axiosInstance'

const historyService = {
  getLeaveHistory: async (params?: { page?: number; pageSize?: number; startDate?: string; endDate?: string }) => {
    const response = await axiosInstance.get('/leaves/history', { params })
    return response.data
  },

  getTeamHistory: async (params?: { page?: number; pageSize?: number; userId?: string }) => {
    const response = await axiosInstance.get('/leaves/team-history', { params })
    return response.data
  },

  exportHistory: async (params?: { format: 'csv' | 'pdf'; startDate?: string; endDate?: string }) => {
    const response = await axiosInstance.get('/leaves/history/export', { params, responseType: 'blob' })
    return response.data
  },
}

export default historyService
