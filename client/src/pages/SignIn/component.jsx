import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { ROLES, PAGE_PATHS } from '../../constants'
import SignInFormContainer from './components/SignInForm'
import { Wrapper, IconWrapper, SignUpLink, Heading, LinkInfo } from './styles'

const SingInPage = ({ isAuthenticated, userRole }) => {
  if (isAuthenticated && userRole !== ROLES.GUEST) {
    return (
      <Redirect
        to={userRole === ROLES.ADMIN ? PAGE_PATHS.ADMIN_PRODUCTS : PAGE_PATHS.HOME}
        data-test="redirect"
      />
    )
  }

  return (
    <Container maxWidth="xs">
      <Wrapper>
        <IconWrapper>
          <LockOutlinedIcon />
        </IconWrapper>
        <Heading component="h1" variant="h5">
          Sign in
        </Heading>
        <SignInFormContainer />
        <LinkInfo color="textSecondary" variant="body2" align="center">
          Don&apos;t have an account? <SignUpLink to={PAGE_PATHS.SIGN_UP}>Sign Up</SignUpLink>
        </LinkInfo>
      </Wrapper>
    </Container>
  )
}

SingInPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userRole: PropTypes.string.isRequired,
}

export default SingInPage
