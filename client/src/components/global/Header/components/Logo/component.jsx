import React from 'react'
import PropTypes from 'prop-types'

import { PAGE_PATHS } from '../../../../../constants'
import { Wrapper, SiteLink, LogoImg } from './styles'

const Logo = ({ isAdmin, isDarkTheme }) => {
  return (
    <Wrapper justify={isAdmin ? 'center' : 'flex-start'}>
      <SiteLink to={PAGE_PATHS.HOME}>
        <LogoImg src="/logo.png" alt="Logo" isDarkTheme={isDarkTheme} />
      </SiteLink>
    </Wrapper>
  )
}

Logo.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
}

export default Logo
