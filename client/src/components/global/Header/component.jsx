import React from 'react'
import PropTypes from 'prop-types'
import MenuIcon from '@material-ui/icons/Menu'

import LogoContainer from './components/Logo'
import UserMenuContainer from './components/UserMenu'
import InfoSection from './components/InfoSection'
import MainNavigation from './components/MainNavigation/component'
import { Wrapper, MainSection, MenuButton, WarningMessage } from './styles'

const Header = ({ openSidebar, isAdmin, isAuthenticated, isDeleteRequestSent }) => {
  const handleMenuButtonClick = () => {
    openSidebar()
  }

  return (
    <Wrapper>
      <MainSection>
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
        <MainNavigation />
        {isAuthenticated && isDeleteRequestSent && (
          <WarningMessage data-test="warningMessage">
            Unfortunately, your account will be deleted soon.
          </WarningMessage>
        )}
        {isAuthenticated && <UserMenuContainer data-test="userMenu" />}
      </MainSection>
      <InfoSection />
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
