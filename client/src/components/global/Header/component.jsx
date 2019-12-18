import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
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
            <MenuButton color="secondary" aria-label="open sidebar" onClick={handleMenuButtonClick}>
              <MenuIcon />
            </MenuButton>
          )}
          <Logo />
          {isAuthenticated && isDeleteRequestSent && (
            <WarningMessage variant="body2" color="error">
              Unfortunately, your account will be deleted soon.
            </WarningMessage>
          )}
          {isAuthenticated && <UserMenu />}
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
