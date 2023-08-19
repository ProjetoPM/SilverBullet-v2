import i18next, { TOptions } from 'i18next'

export const t = (key: string, ns?: TOptions) => {
  return () => i18next.t(key, { ns: ['areas', 'phases'], ...ns })
}
