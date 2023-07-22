import { Outlet } from 'react-router-dom'

type ComponentLayoutProps = {
  layout?: 'blank' | 'landing' | 'simple'
}

const ComponentLayout = ({ layout = 'blank' }: ComponentLayoutProps) => {
  return (
    <>
      {(layout === 'landing' || layout === 'simple') && (
        <>
          {/* Header. */}
          {/* Outros componentes aqui. */}
          <h1>Teste!!!!</h1>
          <Outlet />
          {/* Footer. */}
        </>
      )}

      {layout === 'blank' && <Outlet />}
    </>
  )
}

export { ComponentLayout }
