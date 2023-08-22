import { html, params } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  toolEvaluation: 200,
  processes: {
    description: 1000
  }
}

export const WeeklyReportSchema = z.object({
  projectId: string().refine(
    (value) => value.length > 0,
    params('select_project')
  ),
  weeklyEvaluationId: string().refine(
    (value) => value.length > 0,
    params('select_weekly_evaluation')
  ),
  toolEvaluation: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine(
      (value) => html(value, max.toolEvaluation, '<='),
      params('at_most', max.toolEvaluation)
    ),
  processes: z
    .array(
      z.object({
        group: string().refine(
          (value) => value.length > 0,
          params('select_process_group')
        ),
        name: string().refine(
          (value) => value.length > 0,
          params('select_process_name')
        ),
        description: string()
          .refine((value) => html(value, 3, '>='), params('at_least', 3))
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
  weeklyEvaluationId: '',
  toolEvaluation: '',
  processes: undefined
}

export type WeeklyReport = z.infer<typeof WeeklyReportSchema>
