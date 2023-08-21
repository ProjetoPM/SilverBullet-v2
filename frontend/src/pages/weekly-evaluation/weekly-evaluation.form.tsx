import { Button, Form, Input, Popover } from '@/components/ui'
import { Calendar } from '@/components/ui/Calendar'
import { useRedirect } from '@/hooks/useRedirect'
import { cn } from '@/lib/utils'
import { getWorkspaceId } from '@/stores/useWorkspaceStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { enUS, ptBR } from 'date-fns/locale'
import i18next from 'i18next'
import { CalendarIcon, Edit, RotateCcw, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  WeeklyReport,
  WeeklyReportSchema,
  defaultValues
} from './weekly-evaluation.schema'

interface WeeklyReportFormProps {
  data?: WeeklyReport
}

export const WeeklyEvaluationForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const { redirect } = useRedirect()

  const form = useForm<WeeklyReport>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: WeeklyReport) => {
    console.table(form)
  }

  useEffect(() => {
    if (!getWorkspaceId()) {
      redirect()
    }
  }, [])

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
              <Form.Label required>{t('tool_evaluation.label')}</Form.Label>
              <Form.Control>
                <Input
                  placeholder={t('tool_evaluation.placeholder')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="flex gap-3">
          <Form.Field
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <Form.Item className="flex flex-col">
                <Form.Label>Start Date</Form.Label>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'justify-normal pl-3 text-left font-normal md:w-[240px]',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'P', {
                            locale: i18next.language === 'en-US' ? enUS : ptBR
                          })
                        ) : (
                          <span>Pick a date</span>
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
            name="endDate"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>End Date</Form.Label>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'justify-normal pl-3 text-left font-normal md:w-[240px]',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'P', {
                            locale: i18next.language === 'en-US' ? enUS : ptBR
                          })
                        ) : (
                          <span>Pick a date</span>
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
            name="endDate"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>End Date</Form.Label>
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Form.Control>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'justify-normal pl-3 text-left font-normal md:w-[240px]',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'P', {
                            locale: i18next.language === 'en-US' ? enUS : ptBR
                          })
                        ) : (
                          <span>Pick a date</span>
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
        </div>
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
