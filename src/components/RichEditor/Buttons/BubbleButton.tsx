import { ComponentProps } from 'react'

interface BubbleButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
}

export const BubbleButton = ({
  type = 'button',
  ...props
}: BubbleButtonProps) => {
  return (
    <button
      type={type}
      className="p-2 flex items-center text-sm font-medium leading-none text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200 dark:text-neutral-300 dark:hover:text-neutral-200 dark:hover:bg-neutral-900 rounded-lg data-[active=true]:text-blue-600 dark:data-[active=true]:text-blue-600"
      {...props}
    />
  )
}
