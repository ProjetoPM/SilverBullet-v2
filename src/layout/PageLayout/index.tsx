import { Breadcrumb } from '@/components/Breadcrumb'
import { useEffect } from 'react'

export type PageLayoutProps = {
  title: string
  breadcrumb?: string[][]
  children?: React.ReactNode
}

const PageLayout = ({ title, breadcrumb, children }: PageLayoutProps) => {
  useEffect(() => {
    document.title = `Silver Bullet ${title && ` | ${title}`}`
  }, [title])

  return (
    <>
      {breadcrumb && <Breadcrumb title={title} items={breadcrumb} />}
      {children}
    </>
  )
}

export { PageLayout }
