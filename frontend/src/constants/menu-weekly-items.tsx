import { routes } from '@/routes/routes'
import { t } from '@/utils/translate-text'
import { CalendarCheck2, CalendarPlus } from 'lucide-react'

type fn = () => string

export type Weekly = {
  id: string
  icon: JSX.Element
  name: fn
  description: fn
  background?: string
  border?: string
  to: string
}

export const weekly: Weekly[] = [
  {
    id: 'weekly-report',
    icon: <CalendarCheck2 className="w-6 h-6" />,
    name: t('weekly_report'),
    description: t('weekly_report_description'),
    background: 'bg-foreground/10',
    border: 'border-l-rose-900',
    to: routes.weekly_report.index
  },
  {
    id: 'weekly-evaluation',
    icon: <CalendarPlus className="w-6 h-6" />,
    name: t('weekly_evaluation'),
    description: t('weekly_evaluation_description'),
    background: 'bg-foreground/10',
    border: 'border-l-lime-900',
    to: routes.weekly_evaluation.index
  }
]
