import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useMediaQuery, Divider } from '@material-ui/core'

import Header from '../../global/Header'
import Footer from '../../global/Footer'
import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import AlertDialog from '../../global/AlertDialog'
import { Root, Wrapper, Sidebar, SidebarRoot, Main } from './styles'

const AdminLayout = ({ isSidebarOpened, theme, closeSidebar, children }) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { defaultMatches: true })
  const shouldOpenSidebar = isDesktop ? true : isSidebarOpened

  const handleSidebarClose = () => {
    closeSidebar()
  }

  return (
    <Root>
      <AlertDialog title="Do you really want to delete selected items from database?" />
      <Header />
      <Wrapper>
        <Sidebar
          variant={isDesktop ? 'persistent' : 'temporary'}
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          ModalProps={isDesktop ? {} : { keepMounted: true }} // Better open performance on mobile.
        >
          <SidebarRoot>
            <Profile />
            <Divider />
            <SidebarNav />
          </SidebarRoot>
        </Sidebar>
        <Main>{children}</Main>
      </Wrapper>
      <Footer />
    </Root>
  )
}

AdminLayout.propTypes = {
  isSidebarOpened: PropTypes.bool.isRequired,
  theme: PropTypes.shape({ breakpoints: PropTypes.object.isRequired }).isRequired,
  closeSidebar: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default withTheme(AdminLayout)
