import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import {
  SIGN_IN_PAGE_PATH,
  ROLE_ADMIN,
  ROLE_USER,
  HOME_PAGE_PATH,
  ERROR_PAGE_PATH,
  ADMIN_PRODUCTS_PAGE_PATH,
  ADMIN_PAGE_PATH,
} from '../../../constants'

const PrivateRoute = ({ isAuthenticated, userRole, component: Component, location, ...rest }) => {
  if (
    isAuthenticated &&
    userRole === ROLE_ADMIN &&
    location.pathname.indexOf(ADMIN_PAGE_PATH) === -1
  ) {
    return (
      <Redirect
        to={{
          pathname: ERROR_PAGE_PATH,
          state: {
            title: 'Forbidden',
            message: 'Sign in as user if you want to see content pages',
            backTo: ADMIN_PRODUCTS_PAGE_PATH,
          },
        }}
      />
    )
  }

  if (
    isAuthenticated &&
    userRole === ROLE_USER &&
    location.pathname.indexOf(ADMIN_PAGE_PATH) !== -1
  ) {
    return (
      <Redirect
        to={{
          pathname: ERROR_PAGE_PATH,
          state: {
            title: 'Forbidden',
            message: '',
            backTo: HOME_PAGE_PATH,
          },
        }}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={SIGN_IN_PAGE_PATH} />}
    />
  )
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.element]).isRequired,
}

export default withRouter(PrivateRoute)
