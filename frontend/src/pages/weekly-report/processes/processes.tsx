import { Button, DropdownMenu } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { motion } from 'framer-motion'
import { t } from 'i18next'
import { ArrowDown01, ArrowUp10, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { Control, UseFormReturn, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { useLength } from '../hooks/useLength'
import { WeeklyReportSchema } from '../weekly-report.schema'
import { AddProcess } from './processes.add'
import { Items } from './processes.items'

type ProcessesProps = {
  form: UseFormReturn<z.infer<typeof WeeklyReportSchema>>
  control: Control<z.infer<typeof WeeklyReportSchema>>
}

const Processes = ({ form, control }: ProcessesProps) => {
  const [order, setOrder] = useState('desc')
  const length = useLength((state) => state.length)

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'processes'
  })

  return (
    <>
      <div className="flex items-center justify-between bg-accent dark:bg-accent/50 border rounded-md px-5 py-2">
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
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>{t('order')}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              className={cn('flex gap-3 mb-1', order === 'desc' && 'bg-accent/70')}
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
      <div className={cn('flex flex-col-reverse gap-3', order === 'asc' && 'flex-col')}>
        {fields.map((field, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2
              }}
              key={field.id}
              className={cn(
                'relative gap-2 border border-dashed rounded-md px-5 pt-11 pb-8',
                { 'border-blue-800/60 dark:bg-gray-900/5 border-solid': length > index },
                { 'border-green-900 dark:bg-green-950/5': length <= index }
              )}
            >
              <Label
                className={cn(
                  'absolute text-xs text-white px-4 rounded-full top-4 right-5',
                  { 'bg-blue-600/90 dark:bg-blue-800/90': length > index },
                  { 'bg-green-600/90 dark:bg-green-900': length <= index }
                )}
              >
                {t('weekly-report:process.label', { value: index })}
              </Label>
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
