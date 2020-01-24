import React from 'react'
import PropTypes from 'prop-types'

import AdminLayout from '../../layouts/Admin'
import StandardLayout from '../../layouts/Standard'
import { ROLE_ADMIN } from '../../../constants'

const Layout = ({ isAuthenticated, userRole, children }) => {
  if (isAuthenticated && userRole === ROLE_ADMIN) {
    return <AdminLayout data-test="adminLayout">{children}</AdminLayout>
  }

  return <StandardLayout data-test="standardLayout">{children}</StandardLayout>
}

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Layout
