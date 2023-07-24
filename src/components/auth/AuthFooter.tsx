import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const AuthFooter = () => {
  const { t } = useTranslation('login')

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between mx-10 mt-2">
      <div className="dark:text-neutral-100 text-neutral-800 text-sm">
        {t('privacy-policy')}
      </div>
      <div className="hidden sm:flex gap-0 sm:flex-row sm:gap-4 mb-12 md:mb-0">
        <Link to="#" className="dark:text-neutral-100 text-neutral-800 text-sm">
          Terms and Conditions
        </Link>
        <Link to="#" className="dark:text-neutral-100 text-neutral-800 text-sm">
          Privacy Policy
        </Link>
        <Link to="#" className="dark:text-neutral-100 text-neutral-800 text-sm">
          CA Privacy Notice
        </Link>
      </div>
    </div>
  )
}

export { AuthFooter }
