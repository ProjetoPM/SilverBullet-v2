import { Editor } from '@/components/Editor/Editor'
import { Button, Form, Popover, Select } from '@/components/ui'
import { Calendar } from '@/components/ui/Calendar'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/date-format'
import { zodResolver } from '@hookform/resolvers/zod'
import { enUS, ptBR } from 'date-fns/locale'
import i18next from 'i18next'
import { CalendarIcon, Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useMetrics } from './hooks/useMetrics'
import { useWeeklyEvaluation } from './hooks/useWeeklyEvaluation'
import {
  WeeklyEvaluation,
  WeeklyEvaluationSchema,
  defaultValues,
  max
} from './weekly-evaluation.schema'

interface WeeklyReportFormProps {
  data?: WeeklyEvaluation & {
    id: string
  }
}

export const WeeklyEvaluationForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-evaluation')
  const { metrics } = useMetrics()
  const { create, update } = useWeeklyEvaluation({})

  const form = useForm<WeeklyEvaluation>({
    mode: 'all',
    resolver: zodResolver(WeeklyEvaluationSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: WeeklyEvaluation) => {
    if (form.dates.startDate > form.dates.endDate) {
      toast.error(t('end_date_gt_start_date'), {
        autoClose: 4000
      })
      return
    }

    if (data) {
      await update.mutateAsync({ id: data.id, ...form })
      return
    }
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
          name="name"
          render={({ field }) => (
            <Form.Item className="flex-grow">
              <Form.Label required>{t('evaluation_name')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.name}
                  placeholder={t('evaluation_name_placeholder')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3">
          <Form.Field
            control={form.control}
            name="dates.startDate"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{t('start_date')}</Form.Label>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Form.Control className="w-full">
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-between pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>{t('pick_a_date')}</span>
                        )}
                        <CalendarIcon className="ml-3 h-4 w-4 opacity-50" />
                      </Button>
                    </Form.Control>
                  </Popover.Trigger>
                  <Popover.Content className="p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      locale={i18next.language === 'en-US' ? enUS : ptBR}
                    />
                  </Popover.Content>
                </Popover.Root>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="dates.endDate"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{t('end_date')}</Form.Label>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-between pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value)
                        ) : (
                          <span>{t('pick_a_date')}</span>
                        )}
                        <CalendarIcon className="ml-3 h-4 w-4 opacity-50" />
                      </Button>
                    </Form.Control>
                  </Popover.Trigger>
                  <Popover.Content className="p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      locale={i18next.language === 'en-US' ? enUS : ptBR}
                    />
                  </Popover.Content>
                </Popover.Root>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="type"
            render={({ field }) => (
              <Form.Item className="col-span-full md:col-auto">
                <Form.Label>{t('report_type')}</Form.Label>
                <Select.Root
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <Form.Control>
                    <Select.Trigger>
                      <Select.Value placeholder={t('select_type')} />
                    </Select.Trigger>
                  </Form.Control>
                  <Select.Content>
                    {[
                      { value: 'Individual Report', key: 'individual_report' },
                      { value: 'Group Report', key: 'group_report' }
                    ].map((item) => (
                      <Select.Item key={item.value} value={item.value}>
                        {t(item.key)}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>
        <Form.Field
          control={form.control}
          name="metricGroupId"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{t('score_metric')}</Form.Label>
              <Select.Root
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <Form.Control>
                  <Select.Trigger>
                    <Select.Value placeholder={t('select_type')} />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  {metrics?.map((item) => (
                    <Select.Item
                      key={item.metricGroupId}
                      value={item.metricGroupId}
                    >
                      {item.metrics.map((metric) => metric.name).join(' - ')}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="space-y-2 space-x-2.5">
          <Button type="submit" className="w-30 gap-1 font-medium">
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
