import { Editor } from '@/components/Editor/Editor'
import { Button, Command, Form, Popover } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { Check, ChevronsUpDown, Upload, XCircle } from 'lucide-react'
import { memo, useState } from 'react'
import { Control, UseFieldArrayRemove, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { WeeklyReportSchema, max } from '../weekly-report.schema'
import { Phases, phases } from './mock/phases'
import { RemoveProcess } from './processes.remove'

type FieldsProcessProps = {
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
          <Label className="text-sm font-medium">Actions</Label>
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
            <input
              className="hidden"
              type="file"
              multiple
              accept="image/*, application/pdf"
              id={`files-${index}`}
              {...form.register(`processes.${index}.files`)}
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

const SelectProcess = memo(
  ({ index, form, control }: Pick<FieldsProcessProps, 'index' | 'form' | 'control'>) => {
    const { t } = useTranslation(['phases', 'weekly-report'])
    const [isGroupOpen, setGroupOpen] = useState(false)
    const [isNameOpen, setNameOpen] = useState(false)

    const [group, setGroup] = useState(form.getValues(`processes.${index}.group`) || '-1')

    const onSelect = (data: Pick<Phases, 'id' | 'key'>, type: 'group' | 'name') => {
      form.setValue(`processes.${index}.${type}`, data.id)
      form.clearErrors(`processes.${index}.${type}`)

      switch (type) {
        case 'group':
          setGroup(data.id)
          form.setValue(`processes.${index}.name`, '')
          setGroupOpen(false)
          break
        case 'name':
          setNameOpen(false)
          break
      }
    }

    return (
      <>
        <Form.Field
          control={control}
          name={`processes.${index}.group`}
          render={({ field }) => (
            <Form.Item className="flex flex-col gap-1">
              <Form.Label>{t('weekly-report:process_group.label')}</Form.Label>
              <Popover.Root
                open={isGroupOpen}
                onOpenChange={setGroupOpen}
              >
                <Popover.Trigger asChild>
                  <Form.Control>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {t(
                        phases.find((group) => group.id === field.value)?.key ??
                          'weekly-report:process_group.placeholder'
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </Form.Control>
                </Popover.Trigger>
                <Popover.Content className="p-0">
                  <Command.Root>
                    <Command.Input placeholder={t('weekly-report:search_process_group')} />
                    <Command.Empty>{t('weekly-report:no_results_found')}</Command.Empty>
                    <Command.Group>
                      {phases.map((group) => (
                        <Command.Item
                          value={t(group.key)}
                          key={group.id}
                          onSelect={() => onSelect(group, 'group')}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              group.id === field.value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {t(group.key)}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  </Command.Root>
                </Popover.Content>
              </Popover.Root>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={control}
          name={`processes.${index}.name`}
          render={({ field }) => (
            <Form.Item className="flex flex-col gap-1">
              <Form.Label>{t('weekly-report:process_name.label')}</Form.Label>
              <Popover.Root
                open={isNameOpen}
                onOpenChange={setNameOpen}
              >
                <Popover.Trigger asChild>
                  <Form.Control>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn('justify-between', !field.value && 'text-muted-foreground')}
                    >
                      {t(
                        phases.at(+group - 1)?.entities.find((name) => name.id === field.value)
                          ?.key ?? 'weekly-report:process_name.placeholder'
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </Form.Control>
                </Popover.Trigger>
                <Popover.Content className="p-0">
                  <Command.Root>
                    {group !== '-1' && (
                      <>
                        <Command.Input placeholder={t('weekly-report:search_process_name')} />
                        <Command.Empty>{t('weekly-report:no_results_found')}</Command.Empty>
                        <Command.Group>
                          {phases.at(+group - 1)?.entities.map((name) => (
                            <Command.Item
                              value={t(name.key)}
                              key={name.id}
                              onSelect={() => onSelect(name, 'name')}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  name.id === field.value ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              {t(name.key)}
                            </Command.Item>
                          ))}
                        </Command.Group>
                      </>
                    )}
                    {group === '-1' && (
                      <Command.Item>{t('weekly-report:select_process_group_first')}</Command.Item>
                    )}
                  </Command.Root>
                </Popover.Content>
              </Popover.Root>
              <Form.Message />
            </Form.Item>
          )}
        />
      </>
    )
  }
)

const ViewFileList = ({ index, form }: Pick<FieldsProcessProps, 'index' | 'form'>) => {
  const { t } = useTranslation('weekly-report')
  const files = form.watch(`processes.${index}.files`) ?? []

  const onRemove = (fileIndex: number) => {
    const updatedFiles = new DataTransfer()

    for (let i = 0; i < files.length; i++) {
      if (i !== fileIndex) {
        updatedFiles.items.add(files[i])
      }
    }
    form.setValue(`processes.${index}.files`, updatedFiles.files)
  }

  return (
    files.length > 0 && (
      <>
        <Label className="text-sm font-medium">{t('files_to_upload')}</Label>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {Array.from(files).map((file, index) => {
            return (
              <span
                key={index}
                className="flex items-center border border-foreground/10 dark:border-accent rounded-full px-2 py-1 gap-1"
              >
                <span className="text-sm">{file.name}</span>
                <XCircle
                  size={17}
                  onClick={() => onRemove(index)}
                  className="cursor-pointer text-neutral-300 dark:text-neutral-600 hover:text-red-500 dark:hover:text-destructive transition-colors duration-300"
                />
              </span>
            )
          })}
        </div>
      </>
    )
  )
}
