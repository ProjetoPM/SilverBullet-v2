import { Editor } from '@/components/Editor/Editor'
import { Button, Form, Label } from '@/components/ui'
import { Upload } from 'lucide-react'
import { Control, UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { WeeklyReportSchema, max } from '../weekly-report.schema'
import { ViewFileList } from './processes.files'
import { RemoveProcess } from './processes.remove'
import { SelectProcess } from './processes.select'

export type FieldsProcessProps = {
  index: number
  form: UseFormReturn<z.infer<typeof WeeklyReportSchema>>
  control: Control<z.infer<typeof WeeklyReportSchema>>
  remove: UseFieldArrayRemove
}

export const Items = ({ index, form, control, remove }: FieldsProcessProps) => {
  const { t } = useTranslation('weekly-report')

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectProcess index={index} form={form} control={control} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 max-w-full md:max-w-[calc(100%-6.50rem)]">
          <Form.Field
            control={form.control}
            name={`processes.${index}.description`}
            render={({ field }) => (
              <Form.Item>
                <Form.Label required>
                  {t('process_description.label')}
                </Form.Label>
                <Form.Control>
                  <Editor
                    limit={max.processes.description}
                    placeholder={t('process_description.placeholder')}
                    as="textarea-4"
                    {...field}
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>{t('default:actions')}</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={'outline'}
              size={'icon'}
              id={`upload-files-${index}`}
              onClick={() => document.getElementById(`files-${index}`)?.click()}
            >
              <Upload className="w-5 h-5" />
            </Button>
            <RemoveProcess index={index} remove={remove} />
          </div>
        </div>
      </div>
      <div>
        <ViewFileList index={index} form={form} />
      </div>
    </div>
  )
}
