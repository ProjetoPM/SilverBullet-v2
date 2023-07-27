import { string, z } from 'zod'

export const WorkspaceSchema = z.object({
  name: string().min(3).max(50)
})

export const defaultValues = {
  name: ''
}
