import {
  Button,
  Command,
  Form,
  Input,
  Popover,
  ScrollArea
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { replaceHtmlTags } from '@/utils/replace-html-tags'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { useWeeklyReport } from './hooks/useWeeklyReport'
import { WeeklyReport, WeeklyReportSchema } from './weekly-report.schema'

type MainSelectProps = {
  form: UseFormReturn<z.infer<typeof WeeklyReportSchema>>
  data?: WeeklyReport
}

type Select = {
  weeklyEvaluation: boolean
}

const initialState = {
  weeklyEvaluation: false
}

export const MainSelect = ({ form, data }: MainSelectProps) => {
  const { t } = useTranslation('weekly-report')
  const { weeklyEvaluation } = useWeeklyReport({
    useWeeklyEvaluation: true
  })
  const [open, setOpen] = useState<Select>(initialState)

  const projectName = useWorkspaceStore((state) =>
    replaceHtmlTags(state.project?.name ?? 'error')
  )

  if (!form.getValues('projectName')) {
    form.setValue('projectName', projectName)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Form.Field
        control={form.control}
        name="weeklyEvaluationId"
        render={({ field }) => (
          <Form.Item className="flex-grow">
            <Form.Label required>{t('evaluation_name.label')}</Form.Label>
            <div className="flex flex-col gap-2">
              <Popover.Root
                open={open.weeklyEvaluation}
                onOpenChange={() =>
                  setOpen({
                    ...initialState,
                    weeklyEvaluation: !open.weeklyEvaluation
                  })
                }
              >
                <Popover.Trigger
                  asChild
                  disabled={!!data}
                  aria-disabled={!!data}
                >
                  <Form.Control>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {t(
                        weeklyEvaluation?.data?.rows?.find(
                          (name) => name.id === field.value
                        )?.name ?? 'select_weekly_evaluation'
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </Form.Control>
                </Popover.Trigger>
                <Popover.Content className="p-0">
                  <Command.Root>
                    {weeklyEvaluation?.data &&
                      weeklyEvaluation?.data?.count > 0 && (
                        <>
                          <Command.Input
                            className="w-72 xs:w-80 md:w-96"
                            placeholder={t('search_weekly_evaluation')}
                          />
                          <Command.Empty>
                            {t('weekly-report:no_results_found')}
                          </Command.Empty>
                          <ScrollArea className="max-h-[300px]">
                            <Command.Group>
                              {weeklyEvaluation?.data?.rows.map((data) => (
                                <Command.Item
                                  value={data.id}
                                  key={data.id}
                                  onSelect={() => {
                                    form.setValue('weeklyEvaluationId', data.id)
                                    form.clearErrors('weeklyEvaluationId')
                                    setOpen(initialState)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      data.id === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )}
                                  />
                                  {data.name}
                                </Command.Item>
                              ))}
                            </Command.Group>
                          </ScrollArea>
                        </>
                      )}
                    {!weeklyEvaluation?.data ||
                      (weeklyEvaluation?.data?.count === 0 && (
                        <Command.Item>
                          {t('weekly-report:no_weekly_evaluation_exists')}
                        </Command.Item>
                      ))}
                  </Command.Root>
                </Popover.Content>
              </Popover.Root>
              <Form.Message />
            </div>
          </Form.Item>
        )}
      />
      <Form.Field
        control={form.control}
        name="projectName"
        render={({ field }) => (
          <Form.Item className="flex-grow">
            <Form.Label required>{t('project_name.label')}</Form.Label>
            <Form.Control>
              <Input readOnly {...field} />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </div>
  )
}
