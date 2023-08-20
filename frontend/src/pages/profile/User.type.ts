import { ProjectData } from "../@projects/projects.types"
import { Workspace } from "../@workspace/workspace.types"

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
  projects?: ProjectData[]
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}
