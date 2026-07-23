import { createContext } from 'react'
import { Notification } from '@/types/notification.types'

export interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearNotifications: () => void
}

export const NotificationContext = createContext<NotificationContextType | null>(null)
