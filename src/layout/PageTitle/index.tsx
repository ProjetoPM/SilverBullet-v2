import { useEffect } from 'react'

export type PageTitleProps = {
  title?: string | null
  children?: React.ReactNode
}

const PageTitle = ({ title = null, children }: PageTitleProps) => {
  useEffect(() => {
    document.title = `Silver Bullet ${title && ` | ${title}`}`
  }, [title])

  return <>{children}</>
}

export { PageTitle }
