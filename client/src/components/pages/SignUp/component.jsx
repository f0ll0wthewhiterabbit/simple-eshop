import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { Typography, Container } from '@material-ui/core'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'

import {
  SING_IN_PAGE_PATH,
  DATABASE_FIELD_ROLE_ADMIN,
  MAIN_PAGE_PATH,
  ADMIN_PRODUCTS_PAGE_PATH,
} from '../../../constants'
import SignUpForm from './components/SignUpForm'
import { Wrapper, IconWrapper, SignInLink } from './styles'

const SignUpPage = ({ isUserAdded, userRole, signOut, history, location }) => {
  useEffect(() => {
    signOut(history, location)
  }, [history, location, signOut])

  if (isUserAdded) {
    return (
      <Redirect
        to={userRole === DATABASE_FIELD_ROLE_ADMIN ? ADMIN_PRODUCTS_PAGE_PATH : MAIN_PAGE_PATH}
      />
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <PersonAddRoundedIcon />
        </IconWrapper>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <SignUpForm />
        <Typography color="textSecondary" variant="body2" align="center">
          Already have an account? <SignInLink to={SING_IN_PAGE_PATH}>Sign In</SignInLink>
        </Typography>
      </Wrapper>
    </Container>
  )
}

SignUpPage.propTypes = {
  isUserAdded: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
}

export default withRouter(SignUpPage)