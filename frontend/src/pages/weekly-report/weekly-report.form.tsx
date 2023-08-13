import { Editor } from '@/components/Editor/Editor'
import { Button, Form, Input } from '@/components/ui'
import { routes } from '@/routes/routes'
import WeeklyReportService, {
  WeeklyReportData
} from '@/services/modules/WeeklyReportService'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosResponse } from 'axios'
import { StatusCodes } from 'http-status-codes'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Processes } from './processes/processes'
import {
  WeeklyReport,
  WeeklyReportSchema,
  defaultValues,
  max
} from './weekly-report.schema'

interface WeeklyReportFormProps {
  data?: WeeklyReportData
}

const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const navigate = useNavigate()

  const form = useForm<WeeklyReport>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: WeeklyReport) => {
    let response: AxiosResponse | undefined

    if (data) {
      // response = await WeeklyReportService.edit(data._id, form) // TODO
    } else {
      response = await WeeklyReportService.create(form)
    }

    if (response?.status === StatusCodes.OK) {
      navigate(routes.weekly_report.index)
    }
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
              <Form.Label required>{t('evaluation_name.label')}</Form.Label>
              <Form.Control>
                <Input
                  readOnly={!!data}
                  placeholder={t('evaluation_name.placeholder')}
                  {...field}
                />
              </Form.Control>
              <Form.Message />
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

export default WeeklyReportForm
