import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '.'
import { forwardRef, useState } from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative flex items-center">
        <input
          id={id}
          type={showPassword ? 'text' : type}
          data-is-password={type === 'password'}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[is-password=true]:pr-10`,
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <Button
            id={`${id}-toggle-password`}
            type="button"
            variant="ghost"
            className="absolute top-1 right-1 h-8 w-8 opacity-50 hover:opacity-100"
            size="icon"
            onClick={() => setShowPassword((previous) => !previous)}
          >
            {showPassword && <Eye size={18} />}
            {!showPassword && <EyeOff size={18} />}
          </Button>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
