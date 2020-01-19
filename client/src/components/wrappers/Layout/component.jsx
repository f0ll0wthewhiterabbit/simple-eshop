import React from 'react'
import PropTypes from 'prop-types'

import AdminLayout from '../../layouts/Admin'
import StandardLayout from '../../layouts/Standard'
import { ROLE_ADMIN } from '../../../constants'

const Layout = ({ isAuthenticated, userRole, children }) => {
  if (isAuthenticated && userRole === ROLE_ADMIN) {
    return <AdminLayout>{children}</AdminLayout>
  }

  return <StandardLayout>{children}</StandardLayout>
}

Layout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default Layout
