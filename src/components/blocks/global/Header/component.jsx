import React from 'react'
import { Toolbar, Container } from '@material-ui/core'

import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import Wrapper from './styles'

const Header = () => {
  return (
    <Wrapper position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Logo />
          <UserMenu />
        </Toolbar>
      </Container>
    </Wrapper>
  )
}

export default Header
