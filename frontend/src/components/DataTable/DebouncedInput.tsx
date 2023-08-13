import { InputHTMLAttributes, useEffect, useState } from 'react'
import { Input } from '../ui'

type DebouncedInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
}

export const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
