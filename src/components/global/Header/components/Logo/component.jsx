import React from 'react'
import PropTypes from 'prop-types'

import { MAIN_PAGE_PATH } from '../../../../../constants'
import { Wrapper, SiteLink, LogoIcon, LogoTitle } from './styles'

const Logo = ({ isAdminMode }) => {
  return (
    <Wrapper data-justify={isAdminMode ? 'center' : 'flex-start'}>
      <SiteLink to={MAIN_PAGE_PATH}>
        <LogoIcon fontSize="large" />
        <LogoTitle variant="h6" component="h2">
          simple eShop
        </LogoTitle>
      </SiteLink>
    </Wrapper>
  )
}

Logo.propTypes = {
  isAdminMode: PropTypes.bool.isRequired,
}

export default Logo
