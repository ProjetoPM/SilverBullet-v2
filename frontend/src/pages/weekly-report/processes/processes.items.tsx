import { Editor } from '@/components/Editor/Editor'
import { Button, Form } from '@/components/ui'
import { Label } from '@radix-ui/react-label'
import { Upload } from 'lucide-react'
import { Control, UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { WeeklyReportSchema, max } from '../weekly-report.schema'
import { RemoveProcess } from './processes.remove'
import { SelectProcess } from './processes.select'
import { ViewFileList } from './processes.files'

export type FieldsProcessProps = {
  index: number
  form: UseFormReturn<z.infer<typeof WeeklyReportSchema>>
  control: Control<z.infer<typeof WeeklyReportSchema>>
  remove: UseFieldArrayRemove
}

export const Items = ({ index, form, control, remove }: FieldsProcessProps) => {
  const { t } = useTranslation('weekly-report')

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectProcess
          index={index}
          form={form}
          control={control}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-6 md:gap-4">
        <div className="col-span-5">
          <Form.Field
            control={form.control}
            name={`processes.${index}.description`}
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{t('process_description.label')}</Form.Label>
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
        <div>
          <Label className="text-sm font-medium">{t('actions')}</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            <Button
              type="button"
              variant={'outline'}
              size={'icon'}
              id={`upload-files-${index}`}
              onClick={() => document.getElementById(`files-${index}`)?.click()}
            >
              <Upload className="w-5 h-5" />
            </Button>
            <RemoveProcess
              index={index}
              remove={remove}
            />
          </div>
        </div>
      </div>
      <div>
        <ViewFileList
          index={index}
          form={form}
        />
      </div>
    </div>
  )
}
