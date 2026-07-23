import { ROLES } from '@/constants/roles'

export type Role = (typeof ROLES)[keyof typeof ROLES]

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: Role
  department: string
  managerId?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export interface AuthUser extends User {
  token: string
  refreshToken: string
}
