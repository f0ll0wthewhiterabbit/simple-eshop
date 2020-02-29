import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'

import { ROLES, PAGE_PATHS } from '../../constants'
import SignUpFormContainer from './components/SignUpForm'
import { Wrapper, IconWrapper, SignInLink, Heading, LinkInfo } from './styles'

const SignUpPage = ({ isAuthenticated, userRole }) => {
  if (isAuthenticated && userRole !== ROLES.GUEST) {
    return (
      <Redirect
        to={userRole === ROLES.ADMIN ? PAGE_PATHS.ADMIN_PRODUCTS : PAGE_PATHS.HOME}
        data-test="redirect"
      />
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <PersonAddRoundedIcon />
        </IconWrapper>
        <Heading component="h1" variant="h5">
          Sign up
        </Heading>
        <SignUpFormContainer />
        <LinkInfo color="textSecondary" variant="body2" align="center">
          Already have an account? <SignInLink to={PAGE_PATHS.SIGN_IN}>Sign In</SignInLink>
        </LinkInfo>
      </Wrapper>
    </Container>
  )
}

SignUpPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
}

export default SignUpPage
