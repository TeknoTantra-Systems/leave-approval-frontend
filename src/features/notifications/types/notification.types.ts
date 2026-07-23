export interface NotificationPayload {
  title: string
  message: string
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'
  link?: string
}

export interface NotificationFilters {
  read?: boolean
  type?: string
}
