import React from 'react'
import PropTypes from 'prop-types'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import { PAGE_PATHS } from '../../../../../constants'
import { PagesList, NavigationLink, NavigationItem, PageIcon, PageText } from './styles'

const SidebarNav = ({ isSidebarOpened, closeSidebar }) => {
  const pages = [
    {
      title: 'Users',
      href: PAGE_PATHS.ADMIN_USERS,
      icon: <PeopleIcon />,
    },
    {
      title: 'Products',
      href: PAGE_PATHS.ADMIN_PRODUCTS,
      icon: <ShoppingBasketIcon />,
    },
  ]

  const handleNavLinkClick = () => {
    if (isSidebarOpened) {
      closeSidebar()
    }
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
  isSidebarOpened: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
}

export default SidebarNav
