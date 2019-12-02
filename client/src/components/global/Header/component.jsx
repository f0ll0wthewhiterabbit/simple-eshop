import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Container } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import { Wrapper, MenuButton } from './styles'

const Header = ({ openSidebar, isAdminMode, isUserSignedUp }) => {
  const handleMenuButtonClick = () => {
    openSidebar()
  }

  return (
    <Wrapper position="static">
      <Container maxWidth="lg">
        <Toolbar>
          {isAdminMode && (
            <MenuButton color="secondary" aria-label="open sidebar" onClick={handleMenuButtonClick}>
              <MenuIcon />
            </MenuButton>
          )}
          <Logo />
          {isUserSignedUp && <UserMenu />}
        </Toolbar>
      </Container>
    </Wrapper>
  )
}

Header.propTypes = {
  openSidebar: PropTypes.func.isRequired,
  isAdminMode: PropTypes.bool.isRequired,
  isUserSignedUp: PropTypes.bool.isRequired,
}

export default Header
