export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  LEAVE: {
    BASE: '/leaves',
    BY_ID: (id: string) => `/leaves/${id}`,
    APPROVE: (id: string) => `/leaves/${id}/approve`,
    REJECT: (id: string) => `/leaves/${id}/reject`,
    CANCEL: (id: string) => `/leaves/${id}/cancel`,
    BALANCE: '/leaves/balance',
  },
  APPROVALS: {
    BASE: '/approvals',
    PENDING: '/approvals/pending',
    BY_ID: (id: string) => `/approvals/${id}`,
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    CHANGE_PASSWORD: '/user/change-password',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    READ: (id: string) => `/notifications/${id}/read`,
    READ_ALL: '/notifications/read-all',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/recent-activity',
  },
} as const
