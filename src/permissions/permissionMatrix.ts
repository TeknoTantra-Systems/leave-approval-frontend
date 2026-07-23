import { ROLE_PERMISSIONS } from './rbac'
import { Role } from '@/types/user.types'

export function hasPermission(role: Role | null, permission: string): boolean {
  if (!role) return false
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: Role | null, permissions: string[]): boolean {
  return permissions.some((p) => hasPermission(role, p))
}

export function hasAllPermissions(role: Role | null, permissions: string[]): boolean {
  return permissions.every((p) => hasPermission(role, p))
}
