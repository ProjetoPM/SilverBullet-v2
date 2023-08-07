import { html, params } from '@/utils/replace-html-tags'
import { string, z } from 'zod'

export const max = {
  evaluationName: 50,
  toolEvaluation: 200,
  processes: {
    description: 1000
  }
}

export const WeeklyReportSchema = z.object({
  evaluationName: string()
    .refine((value) => html(value, 3, '>='), params('at_least', 3))
    .refine(
      (value) => html(value, max.evaluationName, '<='),
      params('at_most', max.evaluationName)
    ),
  toolEvaluation: string().refine(
    (value) => html(value, max.toolEvaluation, '<='),
    params('at_most', max.toolEvaluation)
  ),
  processes: z
    .array(
      z.object({
        group: string().refine((value) => value.length > 0, params('select_process_group')),
        name: string().refine((value) => value.length > 0, params('select_process_name')),
        description: string()
          .refine((value) => html(value, 3, '>='), params('at_least', 3))
          .refine(
            (value) => html(value, max.processes.description, '<='),
            params('at_most', max.processes.description)
          ),
        files: z.instanceof(FileList).optional()
      })
    )
    .optional()
})

export const defaultValues = {
  evaluationName: '',
  toolEvaluation: '',
  processes: undefined
}
