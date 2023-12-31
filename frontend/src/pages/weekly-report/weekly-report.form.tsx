import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { useRedirect } from '@/hooks/useRedirect'
import { routes } from '@/routes/routes'
import { useWorkspaceStore } from '@/stores/useWorkspaceStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useWeeklyReport } from './hooks'
import { Processes } from './processes/processes'
import { MainSelect } from './weekly-report.form.select'
import {
  WeeklyReport,
  WeeklyReportSchema,
  defaultValues,
  max
} from './weekly-report.schema'

interface WeeklyReportFormProps {
  data?: WeeklyReport & {
    id: string
  }
}

const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const projectId = useWorkspaceStore((state) => state.project?._id)
  const { redirect } = useRedirect()
  const { create, update } = useWeeklyReport()

  const form = useForm<WeeklyReport>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data ?? defaultValues
  })

  useEffect(() => {
    if (!projectId) {
      redirect({
        route: routes.projects.index,
        message: t('no_project_detected.label')
      })
    }
  }, [projectId, redirect, t])

  const onSubmit = async (form: WeeklyReport) => {
    if (data) {
      await update.mutateAsync({
        ...form,
        id: data.id
      })
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
        <MainSelect form={form} data={data} />
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
            isLoading={create.isLoading || update.isLoading}
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
