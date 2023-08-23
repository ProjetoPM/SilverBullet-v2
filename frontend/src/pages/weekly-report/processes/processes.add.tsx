import { Button, Label } from '@/components/ui'
import { PlusCircle } from 'lucide-react'
import { UseFieldArrayAppend } from 'react-hook-form'
import { z } from 'zod'
import { WeeklyReportSchema } from '../weekly-report.schema'

type AddProcessProps = {
  title: string
  append: UseFieldArrayAppend<z.infer<typeof WeeklyReportSchema>, 'processes'>
}

const AddProcess = ({ title, append }: AddProcessProps) => {
  const addProcess = () => {
    append({ group: '', name: '', description: '', filesFolder: undefined })
  }

  return (
    <div className="flex items-center gap-1.5">
      <Label className="text-xl font-normal">{title}</Label>
      <Button
        type="button"
        variant={'ghost'}
        size={'icon'}
        className="text-green-700 rounded-full hover:text-green-600"
        onClick={addProcess}
      >
        <PlusCircle />
      </Button>
    </div>
  )
}

export { AddProcess }
