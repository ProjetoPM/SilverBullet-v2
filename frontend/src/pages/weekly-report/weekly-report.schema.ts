import { html, params } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const max = {
  toolEvaluation: 200,
  processes: {
    description: 1000
  }
}

export const WeeklyReportSchema = z.object({
  weeklyEvaluationId: z
    .string()
    .refine((value) => value.length > 0, params('select_weekly_evaluation')),
  toolEvaluation: z
    .string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine(
      (value) => html(value, max.toolEvaluation, '<='),
      params('at_most', max.toolEvaluation)
    ),
  processes: z
    .array(
      z.object({
        group: z
          .string()
          .refine((value) => value.length > 0, params('select_process_group')),
        name: z
          .string()
          .refine((value) => value.length > 0, params('select_process_name')),
        description: z
          .string()
          .refine((value) => html(value, 3, '>='), params('at_most', 3))
          .refine(
            (value) => html(value, max.processes.description, '<='),
            params('at_most', max.processes.description)
          ),
        filesFolder: z.string().optional()
      })
    )
    .optional()
})

export const defaultValues = {
  project: undefined,
  weeklyEvaluationId: '',
  toolEvaluation: '',
  processes: undefined
}

export type WeeklyReport = z.infer<typeof WeeklyReportSchema>
