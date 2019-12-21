import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {
  SIGN_UP_PAGE_PATH,
  MAIN_PAGE_PATH,
  ROLE_ADMIN,
  ADMIN_PRODUCTS_PAGE_PATH,
  ROLE_GUEST,
} from '../../../constants'
import SignInForm from './components/SignInForm'
import { Wrapper, IconWrapper, SignUpLink } from './styles'

const SingInPage = ({ isAuthenticated, userRole }) => {
  if (isAuthenticated && userRole !== ROLE_GUEST) {
    return <Redirect to={userRole === ROLE_ADMIN ? ADMIN_PRODUCTS_PAGE_PATH : MAIN_PAGE_PATH} />
  }

  return (
    <Container maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <LockOutlinedIcon />
        </IconWrapper>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <SignInForm />
        <Typography color="textSecondary" variant="body2" align="center">
          Don&apos;t have an account? <SignUpLink to={SIGN_UP_PAGE_PATH}>Sign Up</SignUpLink>
        </Typography>
      </Wrapper>
    </Container>
  )
}

SingInPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
}

export default SingInPage
