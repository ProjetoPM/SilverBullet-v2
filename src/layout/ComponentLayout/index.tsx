import { Separator } from '@/components/ui'
import { Outlet } from 'react-router-dom'
import { Header } from '../MainLayout/Header'
import { Sidebar } from '../MainLayout/Sidebar'

type ComponentLayoutProps = {
  layout?: 'blank' | 'simple'
}

const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {layout === 'simple' && (
        <>
          <div className="max-w-[1536px] mx-auto my-2">
            <div className="flex items-center py-1">
              <Header />
            </div>
          </div>
          <Separator />
          <div className="max-w-[1536px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0px,256px),minmax(0px,1fr)] h-screen">
              <div className="hidden lg:flex border-r">
                <Sidebar />
              </div>
              <div className="p-5 lg:px-10">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}

export { ComponentLayout }
