import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const authService = {
  login: async (email: string, password: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, { email, password })
    return response.data
  },

  register: async (data: { email: string; password: string; firstName: string; lastName: string; department: string }) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, data)
    return response.data
  },

  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT)
    return response.data
  },

  refreshToken: async (refreshToken: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken })
    return response.data
  },
}

export default authService
