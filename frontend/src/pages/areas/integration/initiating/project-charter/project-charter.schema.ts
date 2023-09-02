import { z } from 'zod'

export const max = {
  highLevelProjectDescription: 1000
}

export const ProjectCharterSchema = z.object({
  highLevelProjectDescription: z.string(),
  startDate: z.coerce.string(),
  endDate: z.coerce.string(),
  projectPurpose: z.string(),
  measurableProjectObjectives: z.string(),
  keyBenefits: z.string(),
  highLevelRequirements: z.string(),
  boundaries: z.string(),
  overallProjectRisk: z.string(),
  summaryMilestoneSchedule: z.string(),
  preApprovedFinancialResources: z.string(),
  projectApprovalRequirements: z.string(),
  successCriteria: z.string(),
  projectExitCriteria: z.string()
})

export const defaultValues: ProjectCharter = {
  highLevelProjectDescription: '',
  startDate: '',
  endDate: '',
  projectPurpose: '',
  measurableProjectObjectives: '',
  keyBenefits: '',
  highLevelRequirements: '',
  boundaries: '',
  overallProjectRisk: '',
  summaryMilestoneSchedule: '',
  preApprovedFinancialResources: '',
  projectApprovalRequirements: '',
  successCriteria: '',
  projectExitCriteria: ''
}

export type ProjectCharter = z.infer<typeof ProjectCharterSchema>
