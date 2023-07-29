import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

type TranslateTextProps = ComponentProps<'p'> & {
  text: string
  ns?: string
}

const TranslateText = ({
  text,
  ns = 'sidebar',
  className,
  ...props
}: TranslateTextProps) => {
  const { t } = useTranslation(ns)

  return (
    <p className={cn('text-md', className)} {...props}>
      {t(text)}
    </p>
  )
}

export default TranslateText
