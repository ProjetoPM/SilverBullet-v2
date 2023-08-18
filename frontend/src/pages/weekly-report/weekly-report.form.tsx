import { Editor } from '@/components/Editor/Editor'
import { Button, Command, Form, Popover, ScrollArea } from '@/components/ui'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown, Edit, RotateCcw, Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useWeeklyEvaluation } from './hooks/useWeeklyEvaluation'
import { useWeeklyReport } from './hooks/useWeeklyReport'
import { Processes } from './processes/processes'
import {
  WeeklyReport,
  WeeklyReportSchema,
  defaultValues,
  max
} from './weekly-report.schema'

interface WeeklyReportFormProps {
  data?: WeeklyReport
}

const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const [open, setOpen] = useState(false)
  const { data: weList } = useWeeklyEvaluation()
  const { create } = useWeeklyReport()

  const form = useForm<WeeklyReport>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: WeeklyReport) => {
    await create.mutateAsync(form)
  }

  return (
    <Form.Root {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 min-h-screen"
      >
        <Form.Field
          control={form.control}
          name="weeklyEvaluationId"
          render={({ field }) => (
            <Form.Item>
              <Form.Label hint={t('description:project_charter')} required>
                {t('evaluation_name.label')}
              </Form.Label>
              <div className="flex flex-col gap-1">
                <Popover.Root open={open} onOpenChange={setOpen}>
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
                          weList?.rows?.find((name) => name.id === field.value)
                            ?.name ?? 'select_weekly_evaluation'
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </Form.Control>
                  </Popover.Trigger>
                  <Popover.Content className="p-0">
                    <Command.Root>
                      {weList && weList.count > 0 && (
                        <>
                          <Command.Input
                            placeholder={t('search_weekly_evaluation')}
                          />
                          <Command.Empty>
                            {t('weekly-report:no_results_found')}
                          </Command.Empty>
                          <ScrollArea className="max-h-[300px]">
                            <Command.Group>
                              {weList.rows.map((data) => (
                                <Command.Item
                                  value={data.id}
                                  key={data.id}
                                  onSelect={() => {
                                    form.setValue('weeklyEvaluationId', data.id)
                                    form.clearErrors('weeklyEvaluationId')
                                    setOpen(false)
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
                      {!weList ||
                        (weList?.count === 0 && (
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
          name="toolEvaluation"
          render={({ field }) => (
            <Form.Item>
              <Form.Label required>{t('tool_evaluation.label')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.toolEvaluation}
                  placeholder={t('tool_evaluation.placeholder')}
                  as="textarea-3"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Processes form={form} control={form.control} />
        <div className="space-y-2 space-x-2.5">
          <Button
            type="submit"
            className="w-30 gap-1 font-medium"
            isLoading={create.isLoading}
          >
            {data && (
              <>
                <Edit size={20} />
                {t('default:btn.edit')}
              </>
            )}
            {!data && (
              <>
                <Save size={20} />
                {t('default:btn.save')}
              </>
            )}
          </Button>
          <Button
            type="button"
            className="w-30 gap-1"
            variant={'secondary'}
            onClick={() => form.reset()}
          >
            <RotateCcw size={20} /> {t('default:btn.reset')}
          </Button>
        </div>
      </form>
    </Form.Root>
  )
}

export default WeeklyReportForm
