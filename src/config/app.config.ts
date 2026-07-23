export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_TITLE || 'Employee Leave Approval System',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
} as const
