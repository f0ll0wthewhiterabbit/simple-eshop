import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import { Wrapper, MenuButton } from './styles'

const Header = ({ openSidebar, isAdmin, isAuthenticated }) => {
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
}

export default Header
