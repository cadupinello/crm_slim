import { HeaderComponent, NavItem } from '@/components/header'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'


export const Route = createRootRoute({
  component: () => (
    <>
      <HeaderComponent>
        <NavItem to="/">Dashboard</NavItem>
        <NavItem to="/tasks">Tasks</NavItem>
        <NavItem to="/opportunities">Opportunities</NavItem>
        <NavItem to="/clients">Clients</NavItem>
      </HeaderComponent>
      <Outlet />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
})
