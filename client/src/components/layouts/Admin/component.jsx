import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { withTheme } from 'styled-components'
import { useMediaQuery, Divider } from '@material-ui/core'

import Header from '../../global/Header'
import Footer from '../../global/Footer'
import Profile from './components/Profile'
import SidebarNav from './components/SidebarNav'
import AlertDialog from '../../global/AlertDialog'
import { ERROR_PAGE_PATH, DATABASE_FIELD_ROLE_ADMIN } from '../../../constants'
import { Root, Wrapper, Sidebar, SidebarRoot, Main } from './styles'

const AdminLayout = ({
  isAuthenticated,
  isSidebarOpened,
  userRole,
  theme,
  closeSidebar,
  children,
}) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { defaultMatches: true })
  const shouldOpenSidebar = isDesktop ? true : isSidebarOpened

  const handleSidebarClose = () => {
    closeSidebar()
  }

  if (!isAuthenticated || userRole !== DATABASE_FIELD_ROLE_ADMIN) {
    return <Redirect to={ERROR_PAGE_PATH} />
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
  isAuthenticated: PropTypes.bool.isRequired,
  isSidebarOpened: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  theme: PropTypes.shape({ breakpoints: PropTypes.object.isRequired }).isRequired,
  closeSidebar: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default withRouter(withTheme(AdminLayout))
