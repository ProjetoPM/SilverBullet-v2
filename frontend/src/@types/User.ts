import { Project } from './Project'
import { Workspace } from './Workspace'

export type User = {
  _id: string
  emailVerified: Boolean
  email: string
  password: string
  firstName: string
  lastName?: string
  fullName: string
  phoneNumber?: string
  avatars?: string[]
  tenants?: Workspace[]
  projects?: Project[]
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}
