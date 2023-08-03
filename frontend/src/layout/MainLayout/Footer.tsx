import { Separator } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Footer = () => {
  const { t } = useTranslation('login')

  return (
    <>
      <Separator />
      <div className="flex items-center justify-center my-4 mx-10">
        <small className="text-center text-xs">
          <span>{t('copyright')} &copy; </span>
          <Link to="https://lesse.com.br/site/">
            Silver Bullet, {new Date().getFullYear()}.{' '}
          </Link>
          <span>{t('all_rights_reserved')}.</span>
        </small>
      </div>
    </>
  )
}

export { Footer }
