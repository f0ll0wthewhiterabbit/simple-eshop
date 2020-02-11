import React from 'react'

import { Wrapper, NavigationList, NavigationItem, NavigationLink } from './styles'
import { MAIN_PAGE_PATH } from '../../../../../constants'

const MainNavigation = () => {
  return (
    <Wrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink to="/home">Home</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={MAIN_PAGE_PATH}>Shop</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/about">About</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/blog">Blog</NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to="/contact">Contact</NavigationLink>
        </NavigationItem>
      </NavigationList>
    </Wrapper>
  )
}

export default MainNavigation
