import { Crosshair } from 'lucide-react'

const AuthNavbar = () => {
  return (
    <div>
      <div className="h-full flex items-end">
        <div className="flex items-center gap-3 mb-1 ml-3 sm:ml-10">
          <div>
            <Crosshair strokeWidth={3} />
          </div>
          <label className="text-2xl font-bold dark:text-neutral-50 text-neutral-800">
            Silver Bullet
          </label>
        </div>
      </div>
    </div>
  )
}

export { AuthNavbar }
