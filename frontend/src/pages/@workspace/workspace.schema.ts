import { html, params } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  name: 50
}

export const WorkspaceSchema = z.object({
  name: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine((value) => html(value, max.name, '<='), params('at_most', max.name))
})

export const defaultValues = {
  name: ''
}

export type Workspace = z.infer<typeof WorkspaceSchema>
