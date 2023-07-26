import { LocaleSwitch, ThemeSwitch } from '../Features'
import { Logo } from '../Logo'

const AuthHeader = () => {
  return (
    <div className="flex items-end justify-between mx-6 sm:mx-10">
      <div className="h-full flex items-end">
        <Logo />
      </div>
      <div className="flex gap-1">
        <LocaleSwitch />
        <ThemeSwitch />
      </div>
    </div>
  )
}

export { AuthHeader }
