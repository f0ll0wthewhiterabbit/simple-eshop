import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Header from '../../global/Header'
import Footer from '../../global/Footer'
import AlertDialog from '../../global/AlertDialog'
import {
  SIGN_IN_PAGE_PATH,
  DATABASE_FIELD_ROLE_ADMIN,
  ERROR_PAGE_PATH,
  ADMIN_PRODUCTS_PAGE_PATH,
} from '../../../constants'
import { Root, Main } from './styles'

const UserLayout = ({ isAuthenticated, userRole, children }) => {
  if (!isAuthenticated) {
    return <Redirect to={SIGN_IN_PAGE_PATH} />
  }

  if (userRole === DATABASE_FIELD_ROLE_ADMIN) {
    return (
      <Redirect
        to={{
          pathname: ERROR_PAGE_PATH,
          state: {
            title: 'Forbidden',
            message: 'Sign in as user if you want to see catalog page',
            backTo: ADMIN_PRODUCTS_PAGE_PATH,
          },
        }}
      />
    )
  }

  return (
    <Root>
      <AlertDialog title="Delete your account?">
        The remove request will be sent to the administrator. Unfortunately, your account will be
        deleted soon.
      </AlertDialog>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Root>
  )
}

UserLayout.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
}

export default UserLayout
