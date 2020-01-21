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
import { STORE_FIELD_USERS, STORE_FIELD_PRODUCTS } from '../../../constants'

export const AdminLayout = ({
  isSidebarOpened,
  storeFieldName,
  theme,
  closeSidebar,
  deleteUsers,
  deleteProducts,
  children,
}) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { defaultMatches: true })
  const shouldOpenSidebar = isDesktop ? true : isSidebarOpened
  let confirmMethod

  if (storeFieldName === STORE_FIELD_PRODUCTS) {
    confirmMethod = deleteProducts
  } else if (storeFieldName === STORE_FIELD_USERS) {
    confirmMethod = deleteUsers
  }

  const handleSidebarClose = () => {
    closeSidebar()
  }

  return (
    <Root>
      <AlertDialog
        title="Do you really want to delete selected items from database?"
        confirmMethod={confirmMethod}
      />
      <Header />
      <Wrapper>
        <Sidebar
          variant={isDesktop ? 'persistent' : 'temporary'}
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          ModalProps={isDesktop ? {} : { keepMounted: true }} // Better open performance on mobile.
          data-test="sidebar"
        >
          <SidebarRoot>
            <Profile />
            <Divider />
            <SidebarNav />
          </SidebarRoot>
        </Sidebar>
        <Main data-test="main">{children}</Main>
      </Wrapper>
      <Footer />
    </Root>
  )
}

AdminLayout.defaultProps = {
  storeFieldName: '',
}

AdminLayout.propTypes = {
  isSidebarOpened: PropTypes.bool.isRequired,
  storeFieldName: PropTypes.string,
  theme: PropTypes.shape({ breakpoints: PropTypes.object.isRequired }).isRequired,
  closeSidebar: PropTypes.func.isRequired,
  deleteUsers: PropTypes.func.isRequired,
  deleteProducts: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default withTheme(AdminLayout)
