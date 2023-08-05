import { Button, DropdownMenu } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { ArrowDown01, ArrowUp10, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
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
  const [order, setOrder] = useState('desc')

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'processes'
  })

  return (
    <>
      <div className="flex items-center justify-between bg-accent/60 dark:bg-accent/50 border rounded-md px-5 py-2">
        <AddProcess
          title={t('weekly-report:processes.label')}
          append={append}
        />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">{t('open_menu')}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            className="space-y-2"
          >
            <DropdownMenu.Label>{t('order')}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              className={cn('flex gap-3', order === 'desc' && 'bg-accent/70')}
              onClick={() => setOrder('desc')}
            >
              <ArrowUp10 size={18} />
              <span>{t('desc')}</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className={cn('flex gap-3', order === 'asc' && 'bg-accent/70')}
              onClick={() => setOrder('asc')}
            >
              <ArrowDown01 size={18} />
              <span>{t('asc')}</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div
        className={cn(
          'flex flex-col-reverse gap-3',
          order === 'asc' && 'flex-col'
        )}
      >
        {fields.map((field, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
              }}
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
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export { Processes }
