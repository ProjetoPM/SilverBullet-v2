import { useState } from 'react'

export const useLoading = () => {
  const [isLoading, setLoading] = useState(false)
  return { isLoading, setLoading }
}
