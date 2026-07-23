export interface ProfileUpdatePayload {
  firstName?: string
  lastName?: string
  department?: string
  avatar?: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}
