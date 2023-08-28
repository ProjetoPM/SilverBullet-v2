import { ProjectData } from '../@projects/projects.types'
import { Workspace } from '../@workspace/workspace.types'

export interface User {
  _id?: string
  emailVerified?: Boolean
  email?: string
  password?: string
  firstName?: string
  lastName?: string
  fullName?: string
  phoneNumber?: string
  avatars?: string[]
  tenants?: Workspace[]
  projects?: ProjectData[]
  createdAt?: string
  updatedAt?: string
  __v?: number
  id?: string
}

export interface PasswordChange {
  currentPassword: string
  newPassword: string
}
