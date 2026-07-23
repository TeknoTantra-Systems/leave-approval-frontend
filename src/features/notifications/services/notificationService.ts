import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const notificationService = {
  getAll: async (params?: { page?: number; pageSize?: number; read?: boolean }) => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.BASE, { params })
    return response.data
  },

  markAsRead: async (id: string) => {
    const response = await axiosInstance.put(API_ENDPOINTS.NOTIFICATIONS.READ(id))
    return response.data
  },

  markAllAsRead: async () => {
    const response = await axiosInstance.put(API_ENDPOINTS.NOTIFICATIONS.READ_ALL)
    return response.data
  },
}

export default notificationService
