import { Crosshair } from 'lucide-react'
import LanguageSwitcher from '../switchers/LanguageSwitcher'
import { ThemeSwitcher } from '../switchers/ThemeSwitcher'

const AuthNavbar = () => {
  return (
    <div className="flex items-end justify-between mx-2 sm:mx-10">
      <div className="h-full flex items-end">
        <div className="flex items-center gap-3 mb-1">
          <div>
            <Crosshair strokeWidth={3} />
          </div>
          <label className="text-2xl font-bold dark:text-neutral-50 text-neutral-800">
            Silver Bullet
          </label>
        </div>
      </div>
      <div className="flex gap-1">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export { AuthNavbar }
