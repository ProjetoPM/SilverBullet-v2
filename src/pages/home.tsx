import { Breadcrumb } from '@/components/Breadcrumb'
import { PageTitle } from '@/layout'

const HomePage = () => {
  return (
    <PageTitle title="Project Charter">
      <Breadcrumb
        title="Project Charter"
        className="mb-5"
        items={[['Home', '/home'], ['Project Charter']]}
      />
      {/* Form here. */}
    </PageTitle>
  )
}

export default HomePage
