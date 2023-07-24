import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import { languageDetector } from './language-detector'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import { zod } from './zod'

const API_KEY = 'ukfs6l_hscV-fNJX02_I0Q'
const API_URL = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${API_KEY}`

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
      loadPath: API_URL
    },
    resources: zod
  })

z.setErrorMap(zodI18nMap)

export default i18n
