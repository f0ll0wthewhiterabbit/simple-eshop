import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useMediaQuery, Divider } from '@material-ui/core'

import HeaderContainer from '../../global/Header'
import Footer from '../../global/Footer'
import ProfileContainer from './components/Profile'
import SidebarNavContainer from './components/SidebarNav'
import AlertDialogContainer from '../../global/AlertDialog'
import { FIELDS } from '../../../constants'
import { Root, Wrapper, Sidebar, SidebarRoot, Main } from './styles'

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

  if (storeFieldName === FIELDS.STORE_PRODUCTS) {
    confirmMethod = deleteProducts
  } else if (storeFieldName === FIELDS.STORE_USERS) {
    confirmMethod = deleteUsers
  }

  const handleSidebarClose = () => {
    closeSidebar()
  }

  return (
    <Root>
      <AlertDialogContainer
        title="Do you really want to delete selected items from database?"
        confirmMethod={confirmMethod}
      />
      <HeaderContainer />
      <Wrapper>
        <Sidebar
          variant={isDesktop ? 'persistent' : 'temporary'}
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          ModalProps={isDesktop ? {} : { keepMounted: true }} // Better open performance on mobile.
          data-test="sidebar"
        >
          <SidebarRoot>
            <ProfileContainer />
            <Divider />
            <SidebarNavContainer />
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
  children: PropTypes.node.isRequired,
}

export default withTheme(AdminLayout)
