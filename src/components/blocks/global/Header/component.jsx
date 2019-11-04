import React from 'react'
import { AppBar, Toolbar, Container } from '@material-ui/core'

import { LogoWrapper, LogoIcon, LogoTitle } from './styles'
import UserMenu from '../../UserMenu'

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <LogoWrapper>
            <LogoIcon />
            <LogoTitle variant="h6" component="h2">
              simple eShop
            </LogoTitle>
          </LogoWrapper>
          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
