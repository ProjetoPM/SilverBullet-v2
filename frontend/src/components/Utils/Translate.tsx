import { useTranslation } from 'react-i18next'

type TranslateProps = {
  text: string
  ns?: string[] | string
}

const Translate = ({ text, ns = 'sidebar' }: TranslateProps) => {
  const { t } = useTranslation(ns)
  return t(text)
}

export { Translate }
