import React from 'react'
import PropTypes from 'prop-types'

import { MAIN_PAGE_PATH } from '../../../../../constants'
import { Wrapper, SiteLink, LogoIcon, LogoTitle } from './styles'

const Logo = ({ isAdmin }) => {
  return (
    <Wrapper data-justify={isAdmin ? 'center' : 'flex-start'}>
      <SiteLink to={MAIN_PAGE_PATH}>
        <LogoIcon fontSize="large" />
        <LogoTitle variant="h6" component="h2" data-test="LogoTitle">
          simple eShop
        </LogoTitle>
      </SiteLink>
    </Wrapper>
  )
}

Logo.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
}

export default Logo
