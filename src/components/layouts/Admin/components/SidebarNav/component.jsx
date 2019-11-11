import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import PeopleIcon from '@material-ui/icons/People'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

import { PagesList, PageIcon, PageText } from './styles'

const SidebarNav = () => {
  const pages = [
    {
      title: 'Users',
      href: '/admin/users',
      icon: <PeopleIcon />,
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: <ShoppingBasketIcon />,
    },
  ]

  return (
    <nav aria-label="navigation">
      <PagesList>
        {pages.map(page => (
          <ListItem key={page.title} button>
            <PageIcon>{page.icon}</PageIcon>
            <PageText primary={page.title} />
          </ListItem>
        ))}
      </PagesList>
    </nav>
  )
}

export default SidebarNav
