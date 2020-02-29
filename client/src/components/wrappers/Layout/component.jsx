import React from 'react'
import PropTypes from 'prop-types'

import AdminLayoutContainer from '../../layouts/Admin'
import StandardLayoutContainer from '../../layouts/Standard'
import { ROLES } from '../../../constants'

const Layout = ({ isAuthenticated, userRole, children }) => {
  if (isAuthenticated && userRole === ROLES.ADMIN) {
    return <AdminLayoutContainer data-test="adminLayout">{children}</AdminLayoutContainer>
  }

  return <StandardLayoutContainer data-test="standardLayout">{children}</StandardLayoutContainer>
}

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
