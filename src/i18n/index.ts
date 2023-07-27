import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import { languageDetector } from './language-detector'
import { zod } from './zod'

export const langs = ['en-US', 'pt-BR']

const i18n = i18next
  .use(HttpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    partialBundledLanguages: true,
    fallbackLng: 'en-US',
    ns: ['default'],
    defaultNS: 'default',
    supportedLngs: langs,
    backend: {
      loadPath: '../locales/{{lng}}/{{ns}}.json'
    },
    resources: zod
  })

z.setErrorMap(zodI18nMap)

export default i18n
