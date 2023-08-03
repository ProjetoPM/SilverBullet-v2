import { cn } from '@/lib/utils'
import { strengthColor, strengthIndicator } from '@/utils/password-checker'
import { useTranslation } from 'react-i18next'

type PasswordCheckerProps = {
  password: string
}

const PasswordChecker = ({ password }: PasswordCheckerProps) => {
  const { t } = useTranslation('auth')
  const strength = strengthIndicator(password)
  const color = strengthColor(strength)

  return (
    <div className="flex items-center gap-4">
      <span className={cn('h-2.5 w-16 rounded-full', color.color)} />
      <label className="text-sm">{t(color.label)}</label>
    </div>
  )
}

export { PasswordChecker }
