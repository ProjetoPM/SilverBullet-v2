import { Breadcrumb } from '@/components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  breadcrumb?: string[][]
  children?: React.ReactNode
}

const PageLayout = ({ title, breadcrumb, children }: PageLayoutProps) => {
  return (
    <div>
      <Helmet>
        <title>Silver Bullet {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {breadcrumb && <Breadcrumb title={title} items={breadcrumb} />}
      {children}
    </div>
  )
}

export { PageLayout }
