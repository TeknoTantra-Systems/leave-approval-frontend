import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const profileService = {
  getProfile: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.USER.PROFILE)
    return response.data
  },

  updateProfile: async (data: { firstName?: string; lastName?: string; department?: string; avatar?: string }) => {
    const response = await axiosInstance.put(API_ENDPOINTS.USER.UPDATE, data)
    return response.data
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }) => {
    const response = await axiosInstance.post(API_ENDPOINTS.USER.CHANGE_PASSWORD, data)
    return response.data
  },
}

export default profileService
