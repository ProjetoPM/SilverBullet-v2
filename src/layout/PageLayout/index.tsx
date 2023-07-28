import { Breadcrumb } from '@/components/Breadcrumb'
import { Helmet } from 'react-helmet-async'
import { Footer } from '../MainLayout/Footer'
import { description } from './meta'

export type PageLayoutProps = {
  title: string
  breadcrumb?: string[][]
  children?: React.ReactNode
  footer?: boolean
}

const PageLayout = ({
  title,
  breadcrumb,
  footer = true,
  children
}: PageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>Silver Bullet {title && `| ${title}`}</title>
        <meta name="description" content={description} />
      </Helmet>
      {breadcrumb && <Breadcrumb title={title} items={breadcrumb} />}
      <div className={`min-h-screen ${footer ? 'mb-5 mt-5' : ''}`}>
        {children}
      </div>
      {footer && <Footer />}
    </>
  )
}

export { PageLayout }
