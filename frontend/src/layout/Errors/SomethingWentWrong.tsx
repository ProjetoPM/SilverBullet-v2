import { useTranslation } from 'react-i18next'

const SomethingWentWrong = () => {
  const { t } = useTranslation()

  return (
    <div className="grid grid-rows-[64px_1fr] h-screen">
      <section className="bg-background">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mx-5">
            <p className="text-sm font-medium text-red-500 dark:text-red-400">
              {t('default:unknown_error')}
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              {t('default:something_went_wrong')}
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}

export { SomethingWentWrong }
