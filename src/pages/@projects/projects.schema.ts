import { html, params } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  name: 50,
  description: 150
}

export const ProjectSchema = z.object({
  name: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine((value) => html(value, max.name, '<='), params('at_most', max.name)),
  description: string()
})

export const defaultValues = {
  name: '',
  description: ''
}
