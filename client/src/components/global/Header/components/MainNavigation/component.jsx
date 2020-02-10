import React from 'react'

import { Wrapper, NavigationList, NavigationItem, NavigationLink } from './styles'

const MainNavigation = () => {
  return (
    <Wrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink href="!#">Home</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink href="!#">Shop</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink href="!#">About</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink href="!#">Blog</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink href="!#">Contact</NavigationLink>
        </NavigationItem>
      </NavigationList>
    </Wrapper>
  )
}

export default MainNavigation
