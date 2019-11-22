import React from 'react'
import { Typography, Container } from '@material-ui/core'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded'

import { SING_IN_PAGE_PATH } from '../../../constants'
import SignUpForm from '../../forms/SignUp'
import { Wrapper, IconWrapper, SignInLink } from './styles'

const SignUpPage = () => {
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

export default SignUpPage
