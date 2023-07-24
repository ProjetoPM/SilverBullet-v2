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
        <div className="grid grid-rows-[64px,_1fr] h-screen">
          <div className="bg-background flex items-center px-5 border border-b-1 py-1">
            <Header />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0px,256px),_1fr]">
            <div className="hidden xl:flex border border-t-0 border-r-1">
              <Sidebar />
            </div>
            {/* <div className=" bg-blue-900" /> */}
          </div>
        </div>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}

export { ComponentLayout }
