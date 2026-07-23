import { createContext } from 'react'
import { Role } from '@/types/user.types'

export interface PermissionContextType {
  role: Role | null
  hasPermission: (permission: string) => boolean
  hasRole: (role: Role) => boolean
}

export const PermissionContext = createContext<PermissionContextType | null>(null)
