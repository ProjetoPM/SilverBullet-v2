import { Label } from '@radix-ui/react-label'
import { t } from 'i18next'
import { Control, UseFormReturn, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { WeeklyReportSchema } from '../weekly-report.schema'
import { AddProcess } from './processes.add'
import { Items } from './processes.items'

type ProcessesProps = {
  form: UseFormReturn<z.infer<typeof WeeklyReportSchema>>
  control: Control<z.infer<typeof WeeklyReportSchema>>
}

const LabelProcess = ({ index }: { index: number }) => {
  return (
    <Label className="absolute text-xs bg-green-600/90 dark:bg-green-900 text-white px-4 rounded-full top-4 right-5">
      {t('weekly-report:process.label', { value: index })}
    </Label>
  )
}

const Processes = ({ form, control }: ProcessesProps) => {
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'processes'
  })

  return (
    <>
      <AddProcess
        title={t('weekly-report:processes.label')}
        append={append}
      />
      {fields.map((field, index) => {
        return (
          <div
            key={field.id}
            className="relative flex flex-col gap-2 border border-dashed border-foreground/20  dark:border-green-900 dark:bg-green-950/5 rounded-md px-5 pt-11 pb-8"
          >
            <LabelProcess index={index} />
            <Items
              form={form}
              index={index}
              control={control}
              remove={remove}
            />
          </div>
        )
      })}
    </>
  )
}

export { Processes }
