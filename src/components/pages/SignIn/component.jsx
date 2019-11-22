import React from 'react'
import { Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import { SING_UP_PAGE_PATH } from '../../../constants'
import SignInForm from '../../forms/SignIn'
import { Wrapper, IconWrapper, SignUpLink } from './styles'

const SingInPage = () => {
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

export default SingInPage
