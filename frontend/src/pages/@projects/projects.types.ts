import { z } from 'zod'
import { ProjectSchema } from './projects.schema'

export type ProjectData = z.infer<typeof ProjectSchema> & {
  _id?: string
  tenant: string
  createdAt: string
  updatedAt: string
}

export type FormProject = Pick<ProjectData, '_id' | 'name' | 'description'>
export type DeleteProject = Pick<ProjectData, '_id'>
