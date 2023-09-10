import { z } from 'zod'
import { WorkspaceSchema } from './workspace.schema'

export type Workspace = {
  roles: string[]
  status: string
  tenant: {
    _id: string
    name: string
    planStatus: string
    createdAt: string
    updatedAt: string
  }
}

export type WorkspaceList = {
  tenants: Workspace[]
}

export type WorkspaceData = z.infer<typeof WorkspaceSchema> & {
  _id?: string
  planStatus: string
  createdAt: string
  updatedAt: string
}

export type FormWorkspace = Pick<WorkspaceData, '_id' | 'name'>
export type DeleteWorkspace = Pick<WorkspaceData, '_id'>
