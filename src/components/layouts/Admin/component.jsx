import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { useMediaQuery, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Header from '../../global/Header'
import Footer from '../../global/Footer'
import Profile from './components/Profile/component'
import SidebarNav from './components/SidebarNav'
import AlertDialog from '../../global/AlertDialog'
import { Root, Wrapper, MenuButton, Sidebar, SidebarRoot, Main } from './styles'

const AdminLayout = ({ theme, children }) => {
  const [openSidebar, setOpenSidebar] = useState(false)

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { defaultMatches: true })
  const shouldOpenSidebar = isDesktop ? true : openSidebar

  const handleSidebarOpen = () => {
    setOpenSidebar(true)
  }

  const handleSidebarClose = () => {
    setOpenSidebar(false)
  }

  return (
    <Root>
      <AlertDialog title="Do you really want to delete selected items from database?" />
      <Header />
      <Wrapper>
        <MenuButton color="secondary" aria-label="open sidebar" onClick={handleSidebarOpen}>
          <MenuIcon />
        </MenuButton>

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
  theme: PropTypes.shape({ breakpoints: PropTypes.object.isRequired }).isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default withTheme(AdminLayout)
