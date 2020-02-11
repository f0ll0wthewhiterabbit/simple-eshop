import React from 'react'

import { Wrapper, NavigationList, NavigationItem, NavigationLink } from './styles'
import {
  HOME_PAGE_PATH,
  CATALOG_PAGE_PATH,
  ABOUT_PAGE_PATH,
  BLOG_PAGE_PATH,
  CONTACT_PAGE_PATH,
} from '../../../../../constants'

const MainNavigation = () => {
  return (
    <Wrapper>
      <NavigationList>
        <NavigationItem>
          <NavigationLink to={HOME_PAGE_PATH} exact>
            Home
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={CATALOG_PAGE_PATH} exact>
            Shop
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={ABOUT_PAGE_PATH} exact>
            About
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={BLOG_PAGE_PATH} exact>
            Blog
          </NavigationLink>
        </NavigationItem>
        <NavigationItem>
          <NavigationLink to={CONTACT_PAGE_PATH} exact>
            Contact
          </NavigationLink>
        </NavigationItem>
      </NavigationList>
    </Wrapper>
  )
}

export default MainNavigation
