import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import LogoContainer from './components/Logo'
import UserMenuContainer from './components/UserMenu'
import { Wrapper, MenuButton, WarningMessage } from './styles'

const Header = ({ openSidebar, isAdmin, isAuthenticated, isDeleteRequestSent }) => {
  const handleMenuButtonClick = () => {
    openSidebar()
  }

  return (
    <Wrapper position="static">
      <Container maxWidth="lg">
        <Toolbar>
          {isAdmin && (
            <MenuButton
              color="secondary"
              aria-label="open sidebar"
              onClick={handleMenuButtonClick}
              data-test="menuButton"
            >
              <MenuIcon />
            </MenuButton>
          )}
          <LogoContainer />
          {isAuthenticated && isDeleteRequestSent && (
            <WarningMessage variant="body2" color="error" data-test="warningMessage">
              Unfortunately, your account will be deleted soon.
            </WarningMessage>
          )}
          {isAuthenticated && <UserMenuContainer data-test="userMenu" />}
        </Toolbar>
      </Container>
    </Wrapper>
  )
}

Header.propTypes = {
  openSidebar: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isDeleteRequestSent: PropTypes.bool.isRequired,
}

export default Header
