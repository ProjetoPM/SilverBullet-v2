import { Button } from '@/components/ui'
import { routes } from '@/routes/routes'
import { FolderPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const WeeklyReportToolbar = () => {
  const { t } = useTranslation('weekly-report')

  return (
    <div className="flex justify-between">
      <Link to={routes.weekly_report.new}>
        <Button className="gap-2">
          <FolderPlus size={20} />
          <span className="text-base">{t('new_submission')}</span>
        </Button>
      </Link>
    </div>
  )
}

export { WeeklyReportToolbar }
