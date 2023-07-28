import { Button } from '@/components/ui'
import { routes } from '@/routes/routes'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const WorkspaceToolbar = () => {
  const { t } = useTranslation('workspace')

  return (
    <div className="flex justify-between">
      <Link to={routes.workspaces.new}>
        <Button className="w-28 gap-1">
          <Plus size={20} />
          <span className="text-md">{t('btn.new')}</span>
        </Button>
      </Link>
    </div>
  )
}

export { WorkspaceToolbar }
