/* eslint-disable react/jsx-curly-newline */
import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { ROLES, PAGE_PATHS } from '../../../constants'

const PrivateRoute = ({ isAuthenticated, userRole, component: Component, location, ...rest }) => {
  if (
    isAuthenticated &&
    userRole === ROLES.ADMIN &&
    location.pathname !== PAGE_PATHS.PROFILE &&
    location.pathname.indexOf(PAGE_PATHS.ADMIN) === -1
  ) {
    return (
      <Redirect
        to={{
          pathname: PAGE_PATHS.ERROR,
          state: {
            title: 'Forbidden',
            message: 'Sign in as user if you want to see content pages',
            backTo: PAGE_PATHS.ADMIN_PRODUCTS,
          },
        }}
      />
    )
  }

  if (
    isAuthenticated &&
    userRole === ROLES.USER &&
    location.pathname.indexOf(PAGE_PATHS.ADMIN) !== -1
  ) {
    return (
      <Redirect
        to={{
          pathname: PAGE_PATHS.ERROR,
          state: {
            title: 'Forbidden',
            message: '',
            backTo: PAGE_PATHS.HOME,
          },
        }}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={PAGE_PATHS.SIGN_IN} />
      }
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
