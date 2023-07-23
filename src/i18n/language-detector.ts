import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector'

const options: DetectorOptions = {
  /**
   * Order and from where user language should be detected
   */
  order: ['localStorage', 'cookie'],

  /**
   * Keys or params to lookup language from
   */
  lookupLocalStorage: 'lang',
  lookupCookie: 'lang',

  /**
   * Cache user language on
   */
  caches: ['localStorage', 'cookie']
}

export const languageDetector = new LanguageDetector(null, options)
