import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const dashboardService = {
  getStats: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.STATS)
    return response.data
  },

  getRecentActivity: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITY)
    return response.data
  },
}

export default dashboardService
