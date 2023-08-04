import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit, RotateCcw, Save } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Processes } from './processes/processes'
import { WeeklyReportSchema, defaultValues, max } from './weekly-report.schema'

type Form = z.infer<typeof WeeklyReportSchema>

interface WeeklyReportFormProps {
  data?: any
}

const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const [output, setOutput] = useState('')

  const form = useForm<Form>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data ?? defaultValues
  })

  const onSubmit = async (form: Form) => {
    console.table(form.processes)
    setOutput(JSON.stringify(form, null, 2))
  }

  return (
    <Form.Root {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 min-h-screen"
      >
        <Form.Field
          control={form.control}
          name="evaluationName"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{t('evaluation_name.label')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.evaluationName}
                  content={data?.evaluationName}
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
              <Form.Label>{t('tool_evaluation.label')}</Form.Label>
              <Form.Control>
                <Editor
                  limit={max.toolEvaluation}
                  content={data?.toolEvaluation}
                  placeholder={t('tool_evaluation.placeholder')}
                  as="textarea-3"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Processes
          form={form}
          control={form.control}
        />
        <pre>{output}</pre>
        <div className="space-y-2 space-x-2.5">
          <Button
            type="submit"
            className="w-30 gap-1 font-medium"
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
