import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

type TranslateTextProps = ComponentProps<'p'> & {
  text: string
  ns?: string
}

const TranslateText = ({ text, ns = 'sidebar', ...props }: TranslateTextProps) => {
  const { t } = useTranslation(ns)
  return <p {...props}>{t(text)}</p>
}

export default TranslateText
