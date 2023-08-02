import { params, html } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  name: 50
}

export const WorkspaceSchema = z.object({
  name: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine((value) => html(value, 50, '<='), params('at_most', 50))
})

export const defaultValues = {
  name: ''
}
