import React from 'react'
import PropTypes from 'prop-types'
import { Toolbar, Container } from '@material-ui/core'

import Logo from './components/Logo'
import UserMenu from './components/UserMenu'
import Wrapper from './styles'

const Header = ({ handleModalOpen }) => {
  return (
    <Wrapper position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Logo />
          <UserMenu handleModalOpen={handleModalOpen} />
        </Toolbar>
      </Container>
    </Wrapper>
  )
}

Header.propTypes = {
  handleModalOpen: PropTypes.func.isRequired,
}

export default Header
