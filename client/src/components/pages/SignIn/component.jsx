import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import {
  SING_UP_PAGE_PATH,
  MAIN_PAGE_PATH,
  DATABASE_FIELD_ROLE_ADMIN,
  ADMIN_PRODUCTS_PAGE_PATH,
} from '../../../constants'
import SignInForm from './components/SignInForm'
import { Wrapper, IconWrapper, SignUpLink } from './styles'

const SingInPage = ({ isUserSignedUp, userRole, signOut, history, location }) => {
  useEffect(() => {
    signOut(history, location)
  }, [history, location, signOut])

  if (isUserSignedUp) {
    return (
      <Redirect
        to={userRole === DATABASE_FIELD_ROLE_ADMIN ? ADMIN_PRODUCTS_PAGE_PATH : MAIN_PAGE_PATH}
      />
    )
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
          Don&apos;t have an account? <SignUpLink to={SING_UP_PAGE_PATH}>Sign Up</SignUpLink>
        </Typography>
      </Wrapper>
    </Container>
  )
}

SingInPage.propTypes = {
  isUserSignedUp: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(SingInPage)
