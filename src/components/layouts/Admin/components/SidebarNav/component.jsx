import React from 'react'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import { ADMIN_USERS_PAGE_PATH, ADMIN_PRODUCTS_PAGE_PATH } from '../../../../../constants'
import { PagesList, NavigationLink, NavigationItem, PageIcon, PageText } from './styles'

const SidebarNav = () => {
  const pages = [
    {
      title: 'Users',
      href: ADMIN_USERS_PAGE_PATH,
      icon: <PeopleIcon />,
    },
    {
      title: 'Products',
      href: ADMIN_PRODUCTS_PAGE_PATH,
      icon: <ShoppingBasketIcon />,
    },
  ]

  return (
    <nav aria-label="navigation">
      <PagesList>
        {pages.map(page => (
          <NavigationItem key={page.title} button>
            <NavigationLink to={page.href}>
              <PageIcon>{page.icon}</PageIcon>
              <PageText primary={page.title} />
            </NavigationLink>
          </NavigationItem>
        ))}
      </PagesList>
    </nav>
  )
}

export default SidebarNav
