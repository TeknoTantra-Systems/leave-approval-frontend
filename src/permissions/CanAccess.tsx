import { ReactNode } from 'react'
import { usePermission } from './usePermission'

interface CanAccessProps {
  permission: string
  children: ReactNode
  fallback?: ReactNode
}

export function CanAccess({ permission, children, fallback = null }: CanAccessProps) {
  const { hasPermission } = usePermission()

  if (!hasPermission(permission)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
