import { html, params } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  name: 200
}

export const WeeklyReportSchema = z.object({
  name: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine(
      (value) => html(value, max.name, '<='),
      params('at_most', max.name)
    ),
  startDate: z.date(),
  endDate: z.date()
})

export const defaultValues = {
  name: '',
  startDate: undefined,
  endDate: undefined
}

export type WeeklyReport = z.infer<typeof WeeklyReportSchema>
