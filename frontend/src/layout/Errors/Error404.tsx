import { Button } from '@/components/ui'
import { routes } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../MainLayout/Header'

const Error404 = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="grid grid-rows-[64px_1fr] h-screen">
      <Header />
      <section className="bg-background">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mx-5">
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {t('error_404')}
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              {t('page_not_found')}
            </h1>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              {t('page_not_found_description')}
            </p>

            <div className="flex items-center mt-6 gap-x-3">
              <Button
                variant={'secondary'}
                className="gap-2"
                onClick={() => navigate(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                  />
                </svg>

                <span>{t('btn.go_back')}</span>
              </Button>
              <Link to={routes.workspaces.index}>
                <Button>{t('btn.take_me_home')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export { Error404 }
