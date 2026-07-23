import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { usePermission } from '@/permissions/usePermission'

interface PermissionGuardProps {
  permission: string
}

export function PermissionGuard({ permission }: PermissionGuardProps) {
  const { isAuthenticated, loading } = useAuth()
  const { hasPermission } = usePermission()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!hasPermission(permission)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
