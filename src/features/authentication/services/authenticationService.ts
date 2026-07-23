import axiosInstance from '@/api/axiosInstance'
import { API_ENDPOINTS } from '@/constants/apiEndpoints'

const authenticationService = {
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

  forgotPassword: async (email: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
    return response.data
  },

  resetPassword: async (token: string, password: string) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password })
    return response.data
  },
}

export default authenticationService
