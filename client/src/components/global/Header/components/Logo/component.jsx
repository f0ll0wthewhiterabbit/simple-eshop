import React from 'react'
import PropTypes from 'prop-types'

import { MAIN_PAGE_PATH } from '../../../../../constants'
import { Wrapper, SiteLink, LogoImg } from './styles'

const Logo = ({ isAdmin }) => {
  return (
    <Wrapper justify={isAdmin ? 'center' : 'flex-start'}>
      <SiteLink to={MAIN_PAGE_PATH}>
        <LogoImg src="/logo.png" alt="Logo" />
      </SiteLink>
    </Wrapper>
  )
}

Logo.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
}

export default Logo
