import React from 'react'

import { Wrapper, NavigationList, NavigationItem, NavigationLink } from './styles'
import { PAGE_PATHS } from '../../../../../constants'

const MainNavigation = () => {
  return (
    <Wrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink to={PAGE_PATHS.HOME} exact>
            Home
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={PAGE_PATHS.CATALOG} exact>
            Shop
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={PAGE_PATHS.ABOUT} exact>
            About
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={PAGE_PATHS.BLOG} exact>
            Blog
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={PAGE_PATHS.CONTACT} exact>
            Contact
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
    </Wrapper>
  )
}

export default MainNavigation
