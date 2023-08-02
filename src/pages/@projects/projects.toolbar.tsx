import { Button } from '@/components/ui'
import { routes } from '@/routes/routes'
import { FolderPlus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ProjectToolbar = () => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between">
      <Link to={routes.projects.new}>
        <Button className="w-28 gap-2">
          <FolderPlus size={20} />
          <span className="text-base">{t('btn.new')}</span>
        </Button>
      </Link>
    </div>
  )
}

export { ProjectToolbar }
