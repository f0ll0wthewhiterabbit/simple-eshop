import React from 'react'

import { LogoWrapper, LogoIcon, LogoTitle } from './styles'

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoIcon />
      <LogoTitle variant="h6" component="h2">
        simple eShop
      </LogoTitle>
    </LogoWrapper>
  )
}

export default Logo
