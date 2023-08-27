import { Button } from '@/components/ui'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ProfileActions = () => {
  const { t } = useTranslation('profile')
  return (
    <div className="flex py-2 justify-end">
      <Link to={routes.profile.edit}>
        <Button>
          <span>{t('btn_profile_edit')}</span>
        </Button>
      </Link>
    </div>
  )
}

export { ProfileActions }
