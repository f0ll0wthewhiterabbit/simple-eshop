import React from 'react'
import PropTypes from 'prop-types'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import { ADMIN_USERS_PAGE_PATH, ADMIN_PRODUCTS_PAGE_PATH } from '../../../../../constants'
import { PagesList, NavigationLink, NavigationItem, PageIcon, PageText } from './styles'

const SidebarNav = ({ closeSidebar }) => {
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

  const handleNavLinkClick = () => {
    closeSidebar()
  }

  return (
    <nav aria-label="navigation">
      <PagesList>
        {pages.map(page => (
          <NavigationItem key={page.title} button>
            <NavigationLink to={page.href} onClick={handleNavLinkClick} data-test="navigationLink">
              <PageIcon>{page.icon}</PageIcon>
              <PageText primary={page.title} />
            </NavigationLink>
          </NavigationItem>
        ))}
      </PagesList>
    </nav>
  )
}

SidebarNav.propTypes = {
  closeSidebar: PropTypes.func.isRequired,
}

export default SidebarNav
