import React from 'react'

import { MAIN_PAGE_PATH } from '../../../../../constants'
import { SiteLink, LogoIcon, LogoTitle } from './styles'

const Logo = () => {
  return (
    <SiteLink to={MAIN_PAGE_PATH}>
      <LogoIcon fontSize="large" />
      <LogoTitle variant="h6" component="h2">
        simple eShop
      </LogoTitle>
    </SiteLink>
  )
}

export default Logo
